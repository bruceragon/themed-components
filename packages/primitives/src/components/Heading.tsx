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
    BorderProps,
} from "styled-system";
import { defineWithTheme, shouldNotForward } from "../themed-components";
import type { LibBaseProps, StyledComponentHelper } from "../themed-components";

type BaseHeadingProps =
    SpaceProps &
    ColorProps &
    TypographyProps &
    LayoutProps &
    BorderProps &
    LibBaseProps;

type HeadingHelper = StyledComponentHelper<BaseHeadingProps, "h1">
type HeadingStyledProps = HeadingHelper['WithoutCollidingProps']
type HeadingCollidingProps = HeadingHelper['CollidingProps']
type HeadingComponent = HeadingHelper['StyledComponentWrapper']
type HeadingProps = HeadingHelper['FinalProps']

const notForwarded: Array<HeadingCollidingProps> = [
    "color"
]
const scale = "headings";

const Heading = styled('h1')
    .withConfig({
        shouldForwardProp: shouldNotForward<HeadingStyledProps>(notForwarded)
    }) <HeadingStyledProps>`
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
` as HeadingComponent

export { Heading };

export type {
    HeadingProps
}