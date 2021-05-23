import styled from "styled-components"
import {
    layout,
    color,
    space,
    flexbox,
    position,
    border,
    background,
    typography,
    SpaceProps,
    PositionProps,
    BorderProps,
    BackgroundProps,
    TypographyProps,
    LayoutProps,
    ColorProps,
    compose,
} from "styled-system";
import { defineWithTheme, shouldNotForward } from "../themed-components";
import type { LibBaseProps, LibFlexProps, StyledComponentHelper } from "../themed-components";

type BaseFormProps = 
    SpaceProps &
    PositionProps &
    BorderProps &
    BackgroundProps &
    TypographyProps &
    LayoutProps &
    ColorProps &
    LibFlexProps &
    LibBaseProps & {
}

type FormHelper = StyledComponentHelper<BaseFormProps, "form">
type FormStyledProps = FormHelper['WithoutCollidingProps']
type FormCollidingProps = FormHelper['CollidingProps']
type FormComponent = FormHelper['StyledComponentWrapper']
type FormProps = FormHelper['FinalProps']

const notForwarded: Array<FormCollidingProps> = [
    "color"
];
const scale = "forms";

const Form = styled("form").withConfig<FormStyledProps>({
    shouldForwardProp: shouldNotForward<FormStyledProps>(notForwarded)
}) <FormStyledProps>`
    ${defineWithTheme(scale)}
    ${compose(
        layout,
        color,
        space,
        flexbox,
        position,
        border,
        background,
        typography,
    )}
` as FormComponent;

export { Form };

export type {
    FormProps
}