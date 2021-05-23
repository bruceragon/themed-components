import { get, Theme as SystemTheme, styleFn, FlexProps as SSFlexProps, ResponsiveValue } from "styled-system";
import _css, { SystemStyleObject } from "@styled-system/css";
import { StyledConfig } from "styled-components";
import { useState, useLayoutEffect } from "react";
import type { Property, Globals } from "csstype";
import type { StyledComponent, StyledComponentProps } from "styled-components";

interface Theme extends Omit<SystemTheme, 'mediaQueries' | 'breakpoints'> {
    mediaQueries: string[];
    breakpoints: number[];
    global: SystemStyleObject;
    fontFaces: string[];
}

type LibBaseProps = {
    variant?: string;
    scale?: string;
    css?: SystemStyleObject;
}

// missing Flex Props from styled-system types
type LibFlexProps = SSFlexProps & {
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
    Theme,
    LibBaseProps,
    LibFlexProps,
    CollidingProps,
    WithoutCollidingProps,
    StyledComponentHelper
}

interface Config {
    defaultVariantKey?: string;
    variantsGlobalStyleKey?: string;
}

const defaultConfig: Config = {
    defaultVariantKey: "_default",
    variantsGlobalStyleKey: "_all"
}

export function shouldForwardProp<ComponentProps extends object>(
    customValidator: ((prop: keyof ComponentProps) => boolean),
    useDefaultValidator = true
): StyledConfig<ComponentProps>['shouldForwardProp'] {
    return (prop, validator) => {
        let defaultValidatorResult = true;
        let customValidatorResult = true;
        if (useDefaultValidator) defaultValidatorResult = validator(prop);
        if (customValidator) customValidatorResult = customValidator(prop);
        return defaultValidatorResult && customValidatorResult;
    }
}

export function shouldNotForward<ComponentProps extends object>(
    keys: (keyof ComponentProps)[],
    useDefaultValidator = true
) {
    const defaultKeys: any[] = ["scale", "css", "variant"];
    keys = [...keys, ...defaultKeys]
    return shouldForwardProp<ComponentProps>((prop) => !keys.includes(prop), useDefaultValidator)
}

//must be place ABOVE the call to the styled system functions, so that the props passed to the components take precedence over the variant definition  
export function defineWithTheme(scale: string, config?: Config) {
    return ({ css, theme, variant, ...rest }: any) => {
        if (!theme)
            return "";
        config = { ...defaultConfig, ...config };
        const { defaultVariantKey, variantsGlobalStyleKey } = config;
     
        const variantAsArray: string[] = variant ? variant.split(".") : [];
        const scaleIsInVariant = variantAsArray.length > 1;
        const _scale = scaleIsInVariant ? variantAsArray[0] : scale;
        const variantWithoutScale: string | undefined = scaleIsInVariant ? variantAsArray.slice(1).join(".") : variant;

        // if variant is empty => use _default
        const _variant = variantWithoutScale ?? defaultVariantKey;
        const variantsGlobalStyle = get(theme, `${_scale}.${variantsGlobalStyleKey}`) ?? {};
        const styleObject = get(theme, `${_scale}.${_variant}`) ?? {};
        return _css({ ...variantsGlobalStyle, ...styleObject, ...css }) as styleFn;
    }
}

export function useScreenSize() {
    const [screenSize, setScreenSize] = useState<{
        width: number,
        height: number,
    }>({
        height: window.document.body.clientHeight,
        width: window.document.body.clientWidth,
    });
    useLayoutEffect(() => {
        const setSizes = () => {
            setScreenSize({
                height: window.document.body.clientHeight,
                width: window.document.body.clientWidth,
            })
        }
        const onResize: EventListener = (e) => setSizes()
        window.addEventListener("resize", onResize)
        return () => {
            window.removeEventListener("resize", onResize)
        }
    }, []);
    return screenSize;
}

export function getResponsiveValue(value: any, screenWidth: number, breakpoints: any[] | undefined) {
    if (!Array.isArray(value)) return value;
    if (!breakpoints) breakpoints = [40, 52, 64].map(x => x * 16);
    breakpoints = breakpoints.map((x: any) => parseInt(x));
    let currentBreakpoint = 0;
    for (let i = 0; i < breakpoints.length; i++) {
        if (screenWidth > breakpoints[i]) currentBreakpoint = i + 1;
    }
    if (currentBreakpoint > value.length - 1)
        currentBreakpoint = value.length - 1;
    return value[currentBreakpoint];
}