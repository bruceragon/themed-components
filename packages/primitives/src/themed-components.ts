import { get, Theme as SystemTheme, styleFn } from "styled-system";
import _css, { SystemStyleObject } from "@styled-system/css";
import { StyledConfig } from "styled-components";
import { useState, useLayoutEffect } from "react";

interface Theme extends Omit<SystemTheme, 'mediaQueries' | 'breakpoints'> {
    mediaQueries: string[];
    breakpoints: number[];
    global: SystemStyleObject;
    fontFaces: string[];
}

export type {
    Theme
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