import React from "react";
import styled from "styled-components"
import { StyledIconProps, StyledIcon } from '@styled-icons/styled-icon'
import { defineWithTheme } from "../themed-components";
import type { LibBaseProps } from "../themed-components";
import { compose, layout, color, position, display, space, LayoutProps, ColorProps, PositionProps, DisplayProps, SpaceProps } from "styled-system";
import { omit } from '@styled-system/props';

const scale = "icons";

type IconProps =
    LibBaseProps &
    LayoutProps &
    ColorProps &
    PositionProps &
    DisplayProps &
    SpaceProps &
    Omit<StyledIconProps, "display"> &
    {
        iconType: StyledIcon,
    }

const IconWrapper = React.forwardRef<SVGElement, IconProps>(({
    iconType,
    ...iconProps
}, ref) => {
    return React.createElement(iconType, {...omit(iconProps), ref})
})

const Icon = styled(IconWrapper)(
    defineWithTheme(scale),
    compose(
        layout,
        color,
        position,
        display,
        space
    )
) 

export { Icon };

export type {
    IconProps
}