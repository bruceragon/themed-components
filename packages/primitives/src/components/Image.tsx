import styled from "styled-components";
import {
    compose,
    layout,
    border,
    position,
    space,
    LayoutProps,
    BorderProps,
    PositionProps,
    SpaceProps,
} from "styled-system";
import { defineWithTheme, shouldNotForward } from "../themed-components";
import type { LibBaseProps, StyledComponentHelper } from "../themed-components";

type BaseImageProps =
    LayoutProps &
    BorderProps &
    PositionProps &
    SpaceProps &
    LibBaseProps;

type ImageHelper = StyledComponentHelper<BaseImageProps, "img">
type ImageStyledProps = ImageHelper['WithoutCollidingProps']
type ImageCollidingProps = ImageHelper['CollidingProps']
type ImageComponent = ImageHelper['StyledComponentWrapper']
type ImageProps = ImageHelper['FinalProps']

const notForwarded: Array<ImageCollidingProps> = [
    "width",
    "height",
]

const scale = "images";

const Image = styled('img').withConfig<ImageStyledProps>({
    shouldForwardProp: shouldNotForward<ImageStyledProps>(notForwarded)
}) <ImageStyledProps>`
    ${defineWithTheme(scale)}
    ${compose(
        layout,
        border,
        position,
        space,
    )}
` as ImageComponent;

export { Image };

export type {
    ImageProps
}