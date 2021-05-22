import styled from "styled-components";
import {
    compose,
    space,
    color,
    typography,
    layout,
    border,
    SpaceProps,
    TypographyProps,
    BorderProps,
    ColorProps,
    LayoutProps,
    ResponsiveValue,
    TLengthStyledSystem
} from "styled-system";
import { defineWithTheme, shouldNotForward } from "../themed-components";
import Container, { ContainerProps } from "./Container";
import Icon, { IconProps } from "./Icon";
import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { StyledIcon } from '@styled-icons/styled-icon';
import {
    LibBaseProps,
    StyledComponentHelper
} from "../types/common";

const scale = "inputs";

interface BaseInputProps extends
    SpaceProps,
    ColorProps,
    TypographyProps,
    LayoutProps,
    BorderProps,
    LibBaseProps {
    cursor?: string
}
type InputHelper = StyledComponentHelper<BaseInputProps, "input">;
type InputStyledProps = InputHelper["StyledComponentProps"];
type InputCollidingProps = InputHelper["CollidingProps"];

const notForwarded: Array<InputCollidingProps> = [
    "color",
    "width",
    "height",
    "size",
];
const Input = styled("input").withConfig<InputStyledProps>({
    shouldForwardProp: shouldNotForward<InputStyledProps>(notForwarded)
}) <InputStyledProps>`
    margin: 0; 
    
    &:focus {
        outline: none;
    }

    &[type="button"],
    &[type="reset"],
    &[type="submit"] {
        -webkit-appearance: button;
    }

    &[type="button"]::-moz-focus-inner,
    &[type="reset"]::-moz-focus-inner,
    &[type="submit"]::-moz-focus-inner {
        border-style: none;
        padding: 0;
    }

    &[type="button"]:-moz-focusring,
    &[type="reset"]:-moz-focusring,
    &[type="submit"]:-moz-focusring {
        outline: none;
    }

    
    &[type="checkbox"],
    &[type="radio"] {
        box-sizing: border-box; 
        padding: 0;
    }

    &[type="number"]::-webkit-inner-spin-button,
    &[type="number"]::-webkit-outer-spin-button {
        height: auto;
    }
    &[type="search"] {
        -webkit-appearance: textfield;
        outline-offset: -2px; 
    }
     
    &[type="search"]::-webkit-search-decoration {
        -webkit-appearance: none;
    }
    font: inherit;
    box-sizing: border-box;
    ${props => ({
        cursor: props.cursor || "text"
    })}
    ${defineWithTheme(scale)}
    ${compose(
        space,
        color,
        typography,
        layout,
        border,
    )}
` as InputHelper["StyledComponentWrapper"]

type InputProps = InputHelper["FinalProps"]
// type InputProps = StyledComponentPropsWithRef<React.ComponentType<BaseInputProps>>

export default Input;

type CustomInputProps = InputProps & {
    children?: React.ReactNode;
};

const _CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(({
    children,
    height,
    ...inputProps
}, ref) => {
    const { 
        width, 
        ...otherInputProps 
    } = inputProps;
    const containerProps: ContainerProps = {
        position: "relative",
        display: "inline-block",
        width,
        height,
    }
    return (
        <Container {...containerProps}>
            <Input {...otherInputProps}
                width="100%"
                height="100%"
                ref={ref}
            />
            {children}
        </Container>
    )
})

export const CustomInput = React.memo<React.ComponentType<CustomInputProps>>(_CustomInput);

type IconInputProps = CustomInputProps & {
    icon: StyledIcon | null
    iconPosition?: "left" | "right"
    iconWidth?: ResponsiveValue<string | number>
    iconProps?: Partial<IconProps>
};

export const IconInput = React.forwardRef<HTMLInputElement, IconInputProps>(({
    children,
    icon,
    height,
    iconWidth = 0,
    iconPosition = "left",
    iconProps,
    ...inputProps
}, forwardedRef) => {
    const [padding, setPadding] = useState<{ [key: string]: ResponsiveValue<TLengthStyledSystem> }>({});
    const [_iconWidth, setIconWidth] = useState(iconWidth);
    const iconContainerRef = useRef(null);
    const capitalizedPosition = useMemo(() => iconPosition.charAt(0).toUpperCase() + iconPosition.slice(1), [iconPosition]);
    useLayoutEffect(() => {
        if (iconContainerRef && iconContainerRef.current) {
            const paddingProp = `padding${capitalizedPosition}`;
            //@ts-ignore
            const clientHeight = iconContainerRef.current.clientHeight;
            //@ts-ignore
            const clientWidth = iconContainerRef.current.clientWidth;
            if (typeof clientHeight === "number"  
                && (!(padding.hasOwnProperty(paddingProp)) || padding[paddingProp] !== (clientWidth + 2)))
                //@ts-ignore
                setPadding({ [paddingProp]: clientWidth + 2 })
            if (!_iconWidth)
                setIconWidth(clientHeight)
        }
    }, [inputProps, height, capitalizedPosition, iconContainerRef, iconContainerRef.current])
    const _inputProps = useMemo(() => ({
        ...inputProps,
        ...padding,
        height
    }), [inputProps, height, padding]);
    const iconContainerProps: any = useMemo(() => ({
        width: _iconWidth,
        height: "100%",
        [iconPosition]: 0,
        position: "absolute"
    }), [_iconWidth, iconPosition]);
    return (
        <CustomInput {..._inputProps} ref={forwardedRef}>
            {children}
            {icon &&
                <Icon
                    variant={scale + ".icons." + inputProps.variant}
                    {...iconContainerProps}
                    {...iconProps}
                    iconType={icon}
                    ref={iconContainerRef}
                />
            }
        </CustomInput>
    )
})

IconInput.displayName = "IconInput";

export type {
    InputProps,
    CustomInputProps,
    IconInputProps,
}
