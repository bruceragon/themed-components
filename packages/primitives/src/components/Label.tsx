import styled from "styled-components";
import {
    compose,
    space,
    color,
    typography,
    SpaceProps,
    ColorProps,
    TypographyProps,
} from "styled-system";
import { defineWithTheme, shouldNotForward } from "../themed-components";
import { LibBaseProps, StyledComponentHelper } from "../types/common";

type BaseLabelProps =
    SpaceProps &
    ColorProps &
    TypographyProps &
    LibBaseProps;

type LabelHelper = StyledComponentHelper<BaseLabelProps, "label">
type LabelStyledProps = LabelHelper['WithoutCollidingProps']
type LabelCollidingProps = LabelHelper['CollidingProps']
type LabelComponent = LabelHelper['StyledComponentWrapper']
type LabelProps = LabelHelper['FinalProps']

const notForwarded: Array<LabelCollidingProps> = [
    "color"
]

const scale = "labels";

const Label = styled('label')
.withConfig<LabelStyledProps>({
    shouldForwardProp: shouldNotForward<LabelStyledProps>(notForwarded)
}) <LabelStyledProps>`
    font: inherit;
    ${defineWithTheme(scale)}
    ${compose(
        space,
        color,
        typography
    )}
` as LabelComponent;

export default Label;

export type {
    LabelProps
};