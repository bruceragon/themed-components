import styled from "styled-components";
import { system, ResponsiveValue, styleFn, } from "styled-system";
import Container, {BaseContainerProps, ContainerComponent} from "./primitives/Container";
import css from "@styled-system/css";
import * as CSS from "csstype";

import {
  StyledComponentHelper
} from "./primitives/common.types";

const shouldNotForward = ["span", "cols"];

const Row = styled(Container)`
  grid-template-columns: inherit;
  grid-auto-rows: auto;
  // display: grid;
` as ContainerComponent;

Row.displayName = "Row";
Row.defaultProps = {
  display: "grid"
}

type BaseGridProps = BaseContainerProps & {
  cols?: ResponsiveValue<number>;
};
type GridHelper = StyledComponentHelper<BaseGridProps, "div">
type GridStyledProps = GridHelper['WithoutCollidingProps']
type GridComponent = GridHelper['StyledComponentWrapper']
type GridProps = GridHelper['FinalProps']

const gridDefaultProps = {
  cols: [4, 8, 12],
  display: "grid"
  // gridAutoRows: "max-content",
};
const Grid = styled(Container).withConfig<GridStyledProps>({
  shouldForwardProp: (prop) => !shouldNotForward.includes(prop)
})<GridStyledProps>`
  ${system({
    cols: {
      property: ("grid-template-columns" as keyof CSS.Properties),
      transform: (col: string | number) => `repeat(${col}, 1fr)`,
    },
  })}
  & > ${Row} {
    ${({cols}) => css({gridColumn: Array.isArray(cols) ? cols.map(c => "span " + c) : "span " + cols}) as styleFn}
  }
` as GridComponent;

Grid.defaultProps = gridDefaultProps;
Grid.displayName = "Grid";

type BaseCellProps = BaseContainerProps & {
  span?: ResponsiveValue<number>;
}

type CellHelper = StyledComponentHelper<BaseCellProps, "div">
type CellStyledProps = CellHelper['WithoutCollidingProps']
type CellComponent = CellHelper['StyledComponentWrapper']
type CellProps = CellHelper['FinalProps']

const Cell = styled(Container).withConfig<CellStyledProps>({
  shouldForwardProp: (prop) => !shouldNotForward.includes(prop)
})<CellStyledProps>`
  ${system({
  span: {
    property: ("grid-column" as keyof CSS.Properties),
    transform: (s: number) => `span ${s}`,
  },
})}
` as CellComponent;

Cell.defaultProps = {
  span: [1],
  // cols: [1],
};
Cell.displayName = "Cell";

export { Grid, Row, Cell };

export type {
  CellProps,
  GridProps,
}
