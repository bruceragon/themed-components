import styled from "styled-components";

import {
    layout,
    color,
    space,
    position,
    border,
    background,
    typography,
    LayoutProps,
    ColorProps,
    SpaceProps,
    PositionProps,
    BorderProps,
    BackgroundProps,
    TypographyProps,
    compose,
} from "styled-system";
import { defineWithTheme, shouldNotForward } from "../themed-components";
import type { LibBaseProps, StyledComponentHelper } from "../themed-components";

type BaseParagraphProps =
    LayoutProps &
    ColorProps &
    SpaceProps &
    PositionProps &
    BorderProps &
    BackgroundProps &
    TypographyProps &
    LibBaseProps;

type ParagraphHelper = StyledComponentHelper<BaseParagraphProps, "p">
type ParagraphStyledProps = ParagraphHelper['WithoutCollidingProps']
type ParagraphCollidingProps = ParagraphHelper['CollidingProps']
type ParagraphComponent = ParagraphHelper['StyledComponentWrapper']
type ParagraphProps = ParagraphHelper['FinalProps']

const scale = "paragraphs";
const notForwarded: ParagraphCollidingProps[] = [
    "color"
]
const Paragraph = styled("p")
    .withConfig<ParagraphStyledProps>({
        shouldForwardProp: shouldNotForward<ParagraphStyledProps>(notForwarded)
    }) <ParagraphStyledProps>`
    font: inherit;
    box-sizing: border-box;
    ${defineWithTheme(scale)}
    ${compose(
        color,
        layout,
        space,
        position,
        border,
        background,
        typography,
    )}
` as ParagraphComponent;

export { Paragraph };

export type {
    ParagraphProps,
}