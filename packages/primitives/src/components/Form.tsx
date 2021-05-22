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
import {
    LibBaseProps,
    FlexProps,
    StyledComponentHelper,
} from "../types/common"

type BaseFormProps = 
    SpaceProps &
    PositionProps &
    BorderProps &
    BackgroundProps &
    TypographyProps &
    LayoutProps &
    ColorProps &
    FlexProps &
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

export default Form;
export {
    Form
}
export type {
    FormProps
}