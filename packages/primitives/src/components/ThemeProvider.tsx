import { ThemeProvider, createGlobalStyle } from "styled-components";
import { Theme } from "./themed-components";
import React from "react";
import normalize from './css/normalize.module.css'
import css, { SystemStyleObject } from "@styled-system/css";
import { styleFn } from "styled-system";

type ThemeProviderWrapperProps = {
    theme: Theme
} & React.ComponentPropsWithRef<any>;

type GlobalStyle = {
    body: SystemStyleObject,
    fonts: string[]
}

export const GlobalStyle = createGlobalStyle<GlobalStyle>`
    ${normalize}
    ${({fonts}) => fonts && fonts.join("\n")}
    body {
        ${({body}) => css(body) as styleFn}
    }
`

function ThemeProviderWrapper({theme = {}, children}: ThemeProviderWrapperProps) {
    const {global, fontFaces, ..._theme} = theme;
    return (
        <ThemeProvider theme={_theme}>
            <GlobalStyle 
                body={global}
                fonts={fontFaces}
            />
            {children}
        </ThemeProvider>
    )
}

export default React.memo(ThemeProviderWrapper);