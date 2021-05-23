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
import type { LibBaseProps, StyledComponentHelper } from "../themed-components";

type BaseLinkProps =
    SpaceProps &
    ColorProps &
    TypographyProps &
    LibBaseProps;

type LinkHelper = StyledComponentHelper<BaseLinkProps, "a">
type LinkStyledProps = LinkHelper['WithoutCollidingProps']
type LinkCollidingProps = LinkHelper['CollidingProps']
type LinkComponent = LinkHelper['StyledComponentWrapper']
type LinkProps = LinkHelper['FinalProps']

const notForwarded: Array<LinkCollidingProps> = [
    "color",
]

const scale = "links";

const Link = styled('a').withConfig<LinkStyledProps>({
    shouldForwardProp: shouldNotForward<LinkStyledProps>(notForwarded)
}) <LinkStyledProps>`
    font: inherit;
    ${defineWithTheme(scale)}
    ${compose(
        space,
        color,
        typography,
    )}
` as LinkComponent;

export { Link };

export type {
    LinkProps
}