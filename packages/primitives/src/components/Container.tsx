import styled from "styled-components";

import {
    layout,
    color,
    space,
    flexbox,
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

import {
    LibBaseProps,
    FlexProps,
    StyledComponentHelper
} from "../types/common";

type BaseContainerProps =
    LayoutProps &
    ColorProps &
    SpaceProps &
    PositionProps &
    BorderProps &
    BackgroundProps &
    TypographyProps &
    LibBaseProps & {
        pointerEvents?: string;
    };

type ContainerHelper = StyledComponentHelper<BaseContainerProps, "div">
type ContainerStyledProps = ContainerHelper['WithoutCollidingProps']
type ContainerCollidingProps = ContainerHelper['CollidingProps']
type ContainerComponent = ContainerHelper['StyledComponentWrapper']
type ContainerProps = ContainerHelper['FinalProps']

const scale = "containers";
const notForwarded: ContainerCollidingProps[] = [
    "color"
]
export const Container = styled("div")
    .withConfig<ContainerStyledProps>({
        shouldForwardProp: shouldNotForward<ContainerStyledProps>(notForwarded)
    }) <ContainerStyledProps>`
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
    ${({ pointerEvents }) => pointerEvents ? `pointer-events: ${pointerEvents};` : ""}
` as ContainerComponent;

export default Container;

type BaseFlexProps = BaseContainerProps & FlexProps;
type FlexHelper = StyledComponentHelper<BaseFlexProps, "div">
type StyledFlexProps = FlexHelper['WithoutCollidingProps']
type FlexComponent = FlexHelper['StyledComponentWrapper']
type FlexComponentProps = FlexHelper['FinalProps']

const FlexItem = styled(Container) <StyledFlexProps>`
    ${flexbox}
` as FlexComponent

const Flex = styled(FlexItem)`
    display: flex
` as FlexComponent

export {
    Flex,
    FlexItem,
}

export type {
    FlexComponentProps as FlexProps,
    ContainerProps,
    BaseContainerProps,
    ContainerComponent
}