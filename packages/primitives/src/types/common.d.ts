
import {
    FlexProps as SSFlexProps,
    ResponsiveValue,
} from "styled-system";
import { Property, Globals } from "csstype";
import { StyledComponent, StyledComponentProps } from "styled-components";
import { SystemStyleObject } from "@styled-system/css";
import { Theme } from "../themed-components";

type LibBaseProps = {
    variant?: string;
    scale?: string;
    css?: SystemStyleObject;
}

// missing Flex Props from styled-system types
type FlexProps = SSFlexProps & {
    flexShrink?: ResponsiveValue<Globals | number>
    flexGrow?: ResponsiveValue<Globals | number>
    justifyContent?: ResponsiveValue<Property.JustifyContent>
    alignItems?: ResponsiveValue<Property.AlignItems>
    flexFlow?: ResponsiveValue<Property.FlexFlow>
    flexWrap?: ResponsiveValue<Property.FlexWrap>
    flexBasis?: ResponsiveValue<Property.FlexBasis>
    flexDirection?: ResponsiveValue<Property.FlexDirection>
    alignSelf?: ResponsiveValue<Property.AlignSelf>
    justifySelf?: ResponsiveValue<Property.JustifySelf>
};

type CollidingProps<Props, E extends keyof JSX.IntrinsicElements> = keyof Props & keyof JSX.IntrinsicElements[E]

// take all attributes from the intrinsic element
// BUT omit the ones that are present in BaseProps
// then merge them to the BaseProps
type WithoutCollidingProps<BaseProps, E extends keyof JSX.IntrinsicElements> =
    & Omit<JSX.IntrinsicElements[E], CollidingProps<BaseProps, E>>
    & BaseProps

interface StyledComponentHelper<Props extends object, E extends keyof JSX.IntrinsicElements & keyof HTMLElementTagNameMap> {
    CollidingProps: CollidingProps<Props, E>,
    WithoutCollidingProps: WithoutCollidingProps<Props, E>,
    StyledComponentWrapper: StyledComponent<E, Theme, Props>,
    FinalProps: StyledComponentProps<React.ComponentType<Props>, Theme, {}, any>
}

export type {
    LibBaseProps,
    FlexProps,
    CollidingProps,
    WithoutCollidingProps,
    StyledComponentHelper,
}