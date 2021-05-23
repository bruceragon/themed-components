import styled from "styled-components";
import {
    compose,
    space,
    color,
    typography,
    layout,
    border,
    SpaceProps,
    ColorProps,
    TypographyProps,
    LayoutProps,
    BorderProps
} from "styled-system";
import { defineWithTheme, shouldNotForward } from "../themed-components";
import type { LibBaseProps, StyledComponentHelper } from "../themed-components";

type BaseButtonProps =
    SpaceProps &
    ColorProps &
    TypographyProps &
    LayoutProps &
    BorderProps &
    LibBaseProps;

type ButtonHelper = StyledComponentHelper<BaseButtonProps, "button">
type ButtonStyledProps = ButtonHelper['WithoutCollidingProps']
type ButtonCollidingProps = ButtonHelper['CollidingProps']
type ButtonComponent = ButtonHelper['StyledComponentWrapper']
type ButtonProps = ButtonHelper['FinalProps']

const scale = "buttons";
const notForwarded: Array<ButtonCollidingProps> = [
    "color"
]
const Button = styled('button')
    .withConfig({
        shouldForwardProp: shouldNotForward<ButtonStyledProps>(notForwarded)
    }) <ButtonStyledProps>`
    margin: 0; 
    text-transform: none;
    border-style: none;
    -webkit-appearance: button;
    &::-moz-focus-inner {
        border-style: none;
        padding: 0;
    }
    &:-moz-focusring {
        outline: 1px dotted ButtonText;
    }
    &:focus {
        outline: none;
    }
    cursor: pointer;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    font: inherit;
    ${defineWithTheme(scale)}
    ${compose(
        space,
        color,
        typography,
        layout,
        border,
    )}
` as ButtonComponent;

export { Button };

export type {
    ButtonProps
}