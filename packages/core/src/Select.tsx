import React, { ChangeEvent, useMemo, useRef, useState } from "react";
import { ChevronDown } from "@styled-icons/feather/ChevronDown";
import { CheckCircle } from '@styled-icons/feather/CheckCircle';
import { StyledIcon } from '@styled-icons/styled-icon';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import Fuse from "fuse.js";
import { IconInputProps, IconInput } from "@themed-components/primitives";
import { Popover, PopoverWithTransitionProps } from "@themed-components/primitives";
import { Flex, FlexItem, FlexProps } from "@themed-components/primitives";
import { List, ListItem } from "@themed-components/primitives";

type Option<ValueType = any> = { label: string, value: ValueType };
type CommonSelectProps<ValueType = any> =
    & Omit<IconInputProps, "icon">
    & {
        options: Option<ValueType>[]
        value?: ValueType
        searchable?: boolean
        Row?: React.ComponentType<ListChildComponentProps>
        emptyList?: React.ReactNode
        popoverProps?: PopoverWithTransitionProps
        listHeight?: number;
        icon?: StyledIcon;
        containerProps?: FlexProps;
    }
type BaseSelectProps<ValueType = any> =
    CommonSelectProps
    & {
        onSelect: (item: Option<ValueType>) => void
        selectedItems: Option<ValueType>[]
    }

const scale = "selects";

const DefaultRow: React.ComponentType<ListChildComponentProps> = ({
    data,
    index,
    style,
}) => {
    const {
        options,
        selectedItems,
        onSelect
    } = data;
    const item = useMemo(() => options[index], [options, index]);
    const isSelected = useMemo(() =>
        selectedItems.findIndex((i: Option) => i === item) > -1, [selectedItems, item])
    const containerProps = {
        style: {
            display: "flex",
            cursor: "pointer",
            justifyContent: "center",
            alignItems: "center",
            ...style
        },
        onClick: () => onSelect(item)
    }
    return (
        <ListItem {...containerProps}>
            <FlexItem flexGrow={1}>{item.label}</FlexItem>
            {isSelected &&
                <FlexItem flexShrink={1}><CheckCircle size={12} /></FlexItem>
            }
        </ListItem>
    )
}

const BaseSelect = React.memo<BaseSelectProps>(({
    options = [],
    searchable = false,
    value,
    height,
    id,
    theme,
    Row = DefaultRow,
    emptyList = (<Flex alignItems="center" justifyContent="center">no results</Flex>),
    onSelect = (item) => { },
    popoverProps,
    selectedItems,
    containerProps,
    listHeight = 150,
    icon = ChevronDown,
    ...iconInputProps
}) => {
    const _options = useMemo(() => searchable ? new Fuse(options, { keys: ["label"] }) : options, [options, searchable]);
    const filteredOptions = useMemo(() => !value || !searchable
        ? options
        : (_options as Fuse<Option>).search(value).map(o => o.item),
        [value, searchable, options, _options]);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const _iconInputProps: IconInputProps = useMemo(() => ({
        icon,
        scale,
        ...iconInputProps,
        // disabled: !searchable,
        readOnly: !searchable,
        cursor: !searchable ? "pointer" : "initial",
        value: value,
        iconPosition: "right",
        onClick: () => setIsOpen(!isOpen),
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
            if (iconInputProps.onChange) {
                iconInputProps.onChange(e)
            }
            if (!isOpen) setIsOpen(true)
        },
    }), [iconInputProps, icon, isOpen, searchable, value]);
    const containerVariant = scale + ".containers." + iconInputProps.variant;
    const _popoverProps = useMemo<Partial<PopoverWithTransitionProps>>(() => ({
        containerProps: {
            variant: containerVariant,
            ...containerProps,
            ...popoverProps?.containerProps
        },
        ...popoverProps
    }), [popoverProps, containerProps, containerVariant]);
    return (
        <>
            <IconInput
                {..._iconInputProps}
                ref={inputRef}
            />
            <Popover
                onOutsideClick={() => setIsOpen(false)}
                attachTo={inputRef}
                show={isOpen}
                {..._popoverProps}
            >
                {
                    filteredOptions.length > 0 &&
                    <FixedSizeList
                        outerElementType={List}
                        height={filteredOptions.length > 0 ? listHeight : 0}
                        itemCount={filteredOptions.length}
                        itemSize={35}
                        width="100%"
                        itemData={{
                            options: filteredOptions,
                            onSelect: onSelect,
                            selectedItems,
                        }}
                    >
                        {Row}
                    </FixedSizeList>
                }
                {
                    filteredOptions.length < 1 && searchable && emptyList
                }
            </Popover>
        </>
    )
})

type SelectProps<ValueType = any> =
    CommonSelectProps
    & {
        selectedItem?: Option<ValueType>
        onSelect?: (item: Option<ValueType> | undefined) => void
    }

export const Select: React.FC<SelectProps> = ({
    selectedItem,
    ...props
}) => {
    const [inputValue, setInputValue] = useState(props.value ?? "")
    const [_selectedItem, setSelectedItem] = useState<Option | undefined>(selectedItem);
    const _props: BaseSelectProps = useMemo(() => ({
        ...props,
        value: inputValue,
        selectedItems: _selectedItem ? [_selectedItem] : [],
        onSelect: (item) => {
            const newSelectedItem = item.value === _selectedItem?.value ? undefined : item;
            const newInputValue = newSelectedItem?.label ?? "";
            setSelectedItem(newSelectedItem)
            setInputValue(newInputValue)
            if (props.onSelect) props.onSelect(newSelectedItem)
        },
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
            e.persist()
            setInputValue(e.target.value ?? "");
            if (props.onChange) {
                props.onChange(e);
            }
        }
    }), [props, inputValue, _selectedItem])
    return React.createElement(BaseSelect, _props);
}

type MultiSelectProps<ValueType = any> =
    CommonSelectProps
    & {
        onSelect?: (items: Option<ValueType>[]) => void
        selectedItems?: Option<ValueType>[]
    }

export const MultiSelect: React.FC<MultiSelectProps> = ({
    selectedItems,
    ...props
}) => {
    const [inputValue, setInputValue] = useState(props.value ?? "")
    const [_selectedItems, setSelectedItems] = useState<Option[]>(selectedItems ?? []);
    const _props: BaseSelectProps = useMemo(() => ({
        ...props,
        value: inputValue,
        selectedItems: _selectedItems,
        onSelect: (item) => {
            const index = _selectedItems.findIndex(i => i.value === item.value)
            const newSelectedItems = [..._selectedItems]
            if (index > -1) {
                newSelectedItems.splice(index)
            } else {
                newSelectedItems.push(item)
            }
            setSelectedItems(newSelectedItems);
            if (props.onSelect) {
                props.onSelect(newSelectedItems)
            }
        },
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
            e.persist()
            if (e.target.value) {
                setInputValue(e.target.value);
            }
            if (props.onChange) {
                props.onChange(e);
            }
        }
    }), [props, inputValue, _selectedItems])
    return React.createElement(BaseSelect, _props);
}

export type {
    SelectProps,
    MultiSelectProps
}