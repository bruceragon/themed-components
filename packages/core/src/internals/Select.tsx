import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { Container, FlexItem } from "@themed-components/primitives";
import { List, ListProps, ListItem, } from "@themed-components/primitives";
import { ChevronDown } from "@styled-icons/feather/ChevronDown";
import { StyledIcon } from '@styled-icons/styled-icon';
import { X } from '@styled-icons/feather/X';
import { CheckCircle } from '@styled-icons/feather/CheckCircle';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import Downshift, { useCombobox, useMultipleSelection } from 'downshift';
import Fuse from "fuse.js";
import { IconInputProps, IconInput } from "@themed-components/primitives";
import { Label, LabelProps } from "@themed-components/primitives";

type Option = { label: string, value: any };

type SelectProps = Omit<IconInputProps, "icon" | "children"> & {
    options?: Option[],
    searchable?: boolean,
    icon?: StyledIcon | null,
    Row?: (rowProps: ListChildComponentProps) => JSX.Element,
    listProps?: ListProps,
    isOpen?: boolean,
    emptyList?: React.ReactNode,
    listHeight?: number,
    onItemSelect?: (selectedItem: Option | null, selectedItems?: Option[]) => void,
    label?: React.ReactNode,
    labelProps?: LabelProps
}

const selectContainerProps: any = {
    position: "relative",
    style: { cursor: "pointer" },
    display: "inline-block"
}

const itemToString = (item: Option | null) => item ? item.label : "";

const DefaultRow = ({ data, index, style, }: ListChildComponentProps) => {
    const {
        options,
        getItemProps,
        highlightedIndex,
        selectedItem,
        selectedItems,
    } = data;
    const item = useMemo(() => options[index], [options, index]);
    const isSelected = useMemo(() =>
    (selectedItems
        ? selectedItems.findIndex((i: Option) => i === item) > -1
        : selectedItem === item
    ), [selectedItems, selectedItem, item])
    const listItemProps = {
        style,
        item,
        index,
        // bg: index % 2 === 0 ? "primary" : "secondary"
        // bg: highlightedIndex === index ? "primary" : "inherit",
        className: highlightedIndex === index ? "highlighted" : "",
        display: "flex",
        alignItems: "center"
    }
    return (
        <ListItem as="div" {...getItemProps(listItemProps)}>
            <FlexItem flexGrow={1}>{item.label}</FlexItem>
            {isSelected &&
                <FlexItem flexShrink={1}><CheckCircle size={12} /></FlexItem>
            }
        </ListItem>
    )
}

const OptionContainer = styled(List) <ListProps>`
    width: 100%;
    box-sizing: border-box;
    &:focus {
        outline: none;
    }
`

function Select({
    height,
    listProps,
    onItemSelect,
    label,
    labelProps,
    listHeight = 150,
    Row = DefaultRow,
    searchable = false,
    options = [],
    iconPosition = "right",
    icon = ChevronDown,
    cursor = "pointer",
    emptyList,
    ...props
}: SelectProps) {
    const iconInputProps: IconInputProps = useMemo(() => ({
        icon,
        iconPosition,
        cursor,
        readOnly: !searchable,
        height,
        ...props
    }), [searchable, icon, iconPosition, cursor, height, props]);
    const _listProps: ListProps = useMemo(() => ({
        top: height,
        position: "absolute",
        ...listProps
    }), [height, listProps]);
    const _options = useMemo(() => searchable ? new Fuse(options, { keys: ["label"] }) : options, [options, searchable]);
    return (
        <Downshift
            onSelect={(item) => onItemSelect && onItemSelect(item)}
            isOpen={props.isOpen}
            itemToString={itemToString}
            itemCount={options.length}
            defaultHighlightedIndex={0}
            id={props.id}
            inputId={props.id}
        >
            {({
                getRootProps,
                getInputProps,
                getLabelProps,
                getItemProps,
                isOpen,
                selectedItem,
                highlightedIndex,
                openMenu,
                inputValue
            }) => {
                const filteredOptions = !inputValue || !searchable
                    ? options
                    : (_options as Fuse<Option>).search(inputValue).map(o => o.item);
                return (
                    <>
                        {label &&
                            // @ts-ignore
                            <Label {...getLabelProps(labelProps)}>{label}</Label>
                        }
                        <Container {...getRootProps(selectContainerProps, { suppressRefError: true })}>
                            {/* @ts-ignore */}
                            <IconInput width="100%" {...getInputProps({ ...iconInputProps, onClick: openMenu })} />
                            {filteredOptions.length > 0 &&
                                <OptionContainer as="div" display={isOpen ? "block" : "none"} {..._listProps}>
                                    {isOpen &&
                                        <FixedSizeList
                                            height={filteredOptions.length > 0 ? 150 : 0}
                                            itemCount={filteredOptions.length}
                                            itemSize={35}
                                            width="100%"
                                            itemData={{
                                                options: filteredOptions,
                                                getItemProps,
                                                highlightedIndex,
                                                selectedItem,
                                            }}
                                        >
                                            {Row}
                                        </FixedSizeList>
                                    }
                                </OptionContainer>
                            }
                            {
                                filteredOptions.length < 1 && searchable && emptyList &&
                                <OptionContainer as="div" display={isOpen ? "block" : "none"} {..._listProps}>
                                    {emptyList}
                                </OptionContainer>
                            }
                        </Container>
                    </>
                )
            }}
        </Downshift>
    )
}

type SelectedItemViewProps = {
    getSelectedItemProps: (props: any) => any,
    removeSelectedItem: (selectedItem: Option) => void
    selectedItems: Option[],
}

type MultiSelectProps = SelectProps & {
    onInputValueChange?: (inputValue: string | undefined, setInputValue: (value: string) => void) => void
    children?: (selectedItemViewProps: SelectedItemViewProps) => JSX.Element
}

const defaultSelectedItemView = ({
    getSelectedItemProps,
    removeSelectedItem,
    selectedItems
}: SelectedItemViewProps) => {
    return (
        <Container
            style={{ boxSizing: "border-box" }}
            p={1}
            position="absolute"
            height="100%"
            overflow="hidden"
        >
            {selectedItems.map((selectedItem, index) => (
                <Container
                    maxHeight="100%"
                    display="inline-block"
                    pointerEvents="auto"
                    bg="primary"
                    color="white"
                    mr={1}
                    borderRadius={2}
                    fontSize={1}
                    key={`selected-item-${index}`}
                    {...getSelectedItemProps({ selectedItem, index })}
                >
                    <span>{selectedItem.label} <X onClick={() => removeSelectedItem(selectedItem)} color="white" size={13} /></span>
                </Container>
            ))}
        </Container>
    )
}

function MultiSelect({
    children,
    listProps,
    emptyList,
    height,
    label,
    labelProps,
    listHeight = 150,
    value = "",
    onInputValueChange = (value, setter) => setter(value ?? ""),
    onItemSelect = (selectedItem, selectedItems) => { },
    Row = DefaultRow,
    // children = defaultSelectedItemView,
    searchable = false,
    options = [],
    iconPosition = "right",
    icon = ChevronDown,
    cursor = "pointer",
    ...props
}: MultiSelectProps) {
    const _options = useMemo(() => searchable ? new Fuse(options, { keys: ["label"] }) : options, [options, searchable]);
    const [inputValue, setInputValue] = useState<string>(value)
    const {
        getSelectedItemProps,
        getDropdownProps,
        addSelectedItem,
        removeSelectedItem,
        selectedItems,
    } = useMultipleSelection<Option>();
    const filteredOptions = useMemo(() => !inputValue || !searchable
        ? options
        : (_options as Fuse<Option>).search(inputValue).map(o => o.item),
        [inputValue, searchable, options, _options]);
    const {
        isOpen,
        getLabelProps,
        getMenuProps,
        getInputProps,
        getComboboxProps,
        highlightedIndex,
        getItemProps,
        openMenu,
        selectItem
    } = useCombobox({
        inputValue,
        id: props.id,
        inputId: props.id,
        isOpen: props.isOpen,
        items: filteredOptions,
        itemToString: (item) => item ? item.label : "",
        stateReducer: (state, actionAndChanges) => {
            const { changes, type } = actionAndChanges
            switch (type) {
                case useCombobox.stateChangeTypes.InputKeyDownEnter:
                case useCombobox.stateChangeTypes.ItemClick:
                    return {
                        ...changes,
                        highlightedIndex: state.highlightedIndex, // keep selected item highlighted
                        isOpen: true, // keep the menu open after selection.
                    }
            }
            return changes
        },
        onStateChange: ({ inputValue, type, selectedItem }) => {
            switch (type) {
                case useCombobox.stateChangeTypes.InputChange:
                    onInputValueChange(inputValue, setInputValue)
                    break
                case useCombobox.stateChangeTypes.InputKeyDownEnter:
                case useCombobox.stateChangeTypes.ItemClick:
                    // case useCombobox.stateChangeTypes.InputBlur:
                    if (selectedItem) {
                        if (selectedItems.indexOf(selectedItem) === -1)
                            addSelectedItem(selectedItem)
                        else
                            removeSelectedItem(selectedItem)
                        onItemSelect(selectedItem, selectedItems)
                        //@ts-ignore
                        selectItem(null) // trigger the state change even if selectedItem is reselected right afterwards
                    }
                    break
                default:
                    break
            }
        },
    })
    const _listProps: ListProps = useMemo(() => ({
        top: height,
        position: "absolute",
        ...listProps
    }), [height, listProps]);
    const iconInputProps: IconInputProps = useMemo(() => ({
        icon,
        iconPosition,
        cursor,
        readOnly: !searchable,
        onClick: openMenu,
        height,
        ...props
    }), [searchable, icon, iconPosition, cursor, openMenu, height, props]);
    return (
        <>
            {label &&
                //@ts-ignore
                <Label {...getLabelProps(labelProps)}>{label}</Label>
            }
            <Container {...getComboboxProps(selectContainerProps, { suppressRefError: true })}>
                <IconInput
                    //@ts-ignore
                    {...getInputProps(getDropdownProps({
                        ...iconInputProps,
                        preventKeyAction: isOpen
                    }))}
                >
                    {children && children({
                        getSelectedItemProps,
                        removeSelectedItem,
                        selectedItems
                    })}
                </IconInput>
                {/* @ts-ignore */}
                <OptionContainer as="div" {...getMenuProps(_listProps)} display={isOpen ? "block" : "none"}>
                    {filteredOptions.length < 1 &&
                        emptyList
                    }
                    {filteredOptions.length > 0 &&
                        <FixedSizeList
                            height={filteredOptions.length > 0 ? listHeight : 0}
                            itemCount={filteredOptions.length}
                            itemSize={35}
                            width="100%"
                            itemData={{
                                options: filteredOptions,
                                getItemProps,
                                highlightedIndex,
                                selectedItems,
                            }}
                        >
                            {Row}
                        </FixedSizeList>
                    }
                </OptionContainer>
            </Container>
        </>
    )
}

export {
    Select,
    MultiSelect
}

export type {
    Option,
    SelectProps,
    MultiSelectProps
}