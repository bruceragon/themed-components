import css from "@styled-system/css";
import styled from "styled-components";
import {
    compose,
    position,
    space,
    color,
    typography,
    layout,
    border,
    PositionProps,
    SpaceProps,
    ColorProps,
    TypographyProps,
    LayoutProps,
    BorderProps,
    flexbox,
    ResponsiveValue,
    styleFn,
    system
} from "styled-system";
import { defineWithTheme, shouldNotForward } from "../themed-components";
import { LibBaseProps, FlexProps, StyledComponentHelper } from "../types/common";
import * as CSS from "csstype";

type SharedListProps =
    SpaceProps &
    ColorProps &
    TypographyProps &
    LayoutProps &
    BorderProps &
    FlexProps &
    LibBaseProps;
type OrientationString = 'horizontal' | 'vertical' | 'x' | 'y';
type Orientation = ResponsiveValue<OrientationString>;

type BaseListProps =
    PositionProps &
    SharedListProps
    & {
        orientation?: Orientation
    };
type ListHelper = StyledComponentHelper<BaseListProps, "ul">
type ListStyledProps = ListHelper['WithoutCollidingProps']
type ListCollidingProps = ListHelper['CollidingProps']
type ListComponent = ListHelper['StyledComponentWrapper']
type ListProps = ListHelper['FinalProps']
const listNotForwarded: Array<ListCollidingProps | keyof ListStyledProps> = [
    "color",
    "orientation",
]

type BaseListItemProps = SharedListProps;
type ListItemHelper = StyledComponentHelper<BaseListItemProps, "li">
type ListItemStyledProps = ListItemHelper['WithoutCollidingProps']
type ListItemCollidingProps = ListItemHelper['CollidingProps']
type ListItemComponent = ListItemHelper['StyledComponentWrapper']
type ListItemProps = ListItemHelper['FinalProps']
const listItemNotForwarded: Array<ListItemCollidingProps> = [
    "color",
]

const listScale = "lists";
const itemScale = "listItems";

const ListItem = styled('li')
.withConfig<ListItemStyledProps>({
    shouldForwardProp: shouldNotForward<ListItemStyledProps>(listItemNotForwarded)
})<ListItemStyledProps>`
    ${defineWithTheme(itemScale)}
    ${compose(
        space,
        color,
        typography,
        layout,
        border,
        flexbox,
    )}
    font: inherit;
` as ListItemComponent;

const List = styled('ul')
    .withConfig<ListStyledProps>({
        shouldForwardProp: shouldNotForward<ListStyledProps>(listNotForwarded)
    }) <ListStyledProps>`
    list-style: none;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    font: inherit;
    display: flex;
    flex-wrap: wrap;
    ${system({
        orientation: {
            property: ("flex-direction" as keyof CSS.Properties),
            transform: (o: string) => o === "horizontal" || o === "x" ? "row" : "column",
        },
    })}
    ${ListItem} {
        ${({ orientation }) => css({ width: getListItemWidth(orientation) }) as styleFn}
    }
    ${defineWithTheme(listScale)}
    ${compose(
        position,
        space,
        color,
        typography,
        layout,
        border,
        flexbox,
    )}
` as ListComponent;

function getListItemWidth(orientation?: Orientation) {
    if (Array.isArray(orientation)) {
        orientation.map(o => isHorizontal(o) ? "auto" : "100%")
    } else {
        return getWidthIfHorizontal(orientation)
    }
}

const getWidthIfHorizontal = (o?: Orientation) => isHorizontal(o) ? "auto" : "100%";
const isHorizontal = (orientation?: Orientation) => orientation === "horizontal" || orientation === "x";

export default List;
export {
    ListItem
};
export type {
    ListProps,
    ListItemProps,
}