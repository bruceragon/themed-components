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

type BaseTextProps =
    SpaceProps &
    ColorProps &
    TypographyProps &
    LibBaseProps;

type TextHelper = StyledComponentHelper<BaseTextProps, "span">
type TextStyledProps = TextHelper['WithoutCollidingProps']
type TextCollidingProps = TextHelper['CollidingProps']
type TextComponent = TextHelper['StyledComponentWrapper']
type TextProps = TextHelper['FinalProps']

const notForwarded: Array<TextCollidingProps> = [
    "color"
]

const scale = "texts";

const Text = styled('span')
.withConfig<TextStyledProps>({
    shouldForwardProp: shouldNotForward<TextStyledProps>(notForwarded)
}) <TextStyledProps>`
    font: inherit;
    ${defineWithTheme(scale)}
    ${compose(
        space,
        color,
        typography
    )}
` as TextComponent;

export default Text;

export type {
    TextProps
};