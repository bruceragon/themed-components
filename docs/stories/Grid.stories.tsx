import { Story, Meta } from "@storybook/react";
import { Grid, Row, Cell, GridProps, useScreenSize, getResponsiveValue } from "@themed-components/core";
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { getMeta } from "../utils/meta"

export default {
  title: "Grid/Grid",
  component: Grid,
  subcomponents: {
    Row,
    Cell
  },
  ...getMeta<GridProps>(Grid)
} as Meta;

const Template: Story<GridProps> = (args) => {
  const { width } = useScreenSize();
  const theme = useContext(ThemeContext);
  const breakpoints = theme ? theme.breakpoints : undefined;
  return (
    <Grid {...args}>
      <Row>
        <Cell textAlign="center" span={[4, 8, 12]}>cols: {getResponsiveValue(args.cols, width, breakpoints)}</Cell>
      </Row>
      <Row>
        <Cell bg="#E40C2B" span={[2, 6, 6]}>span: {getResponsiveValue([2, 6, 6], width, breakpoints)}</Cell>
        <Cell bg="#DEB992" span={[2, 2, 4]}>span: {getResponsiveValue([2, 2, 4], width, breakpoints)}</Cell>
        <Cell bg="#F7F4E9" span={[4, 8, 2]}>span: {getResponsiveValue([4, 8, 2], width, breakpoints)}</Cell>
      </Row>
      <Row>
        <Cell bg="#3CBCC3" span={[1, 2, 4]}>span: {getResponsiveValue([1, 2, 4], width, breakpoints)}</Cell>
        <Cell bg="#EBA63F" span={[2, 2, 3]}>span: {getResponsiveValue([2, 2, 3], width, breakpoints)}</Cell>
        <Cell bg="#438945" span={[1, 4, 5]}>span: {getResponsiveValue([1, 4, 5], width, breakpoints)}</Cell>
      </Row>
    </Grid>
  )
};

export const WithRowsAndCells = Template.bind({});
WithRowsAndCells.args = {
  cols: [4, 8, 12],
  css: {
    [Cell]: {
      height: 30,
      fontWeight: 600,
      py: 2,
      px: 1
    }
  }
}
