import React from "react";
import { Story, Meta } from "@storybook/react";
import { Flex, FlexItem, FlexProps } from "@themed-components/core";
import { getMeta } from "../utils/meta"

export default {
  title: "Primitives/Flex",
  component: Flex,
  ...getMeta<FlexProps>(Flex),
  subcomponents: {
    FlexItem
  }
} as Meta;

const flexItemProps = {
  bg: "dark",
  color: "primary",
  p: 4
}

const Template: Story<FlexProps> = (args) => (
  <Flex {...args}>
    <FlexItem {...flexItemProps}>Flex Item 1</FlexItem>
    <FlexItem {...flexItemProps}>Flex Item 2</FlexItem>
    <FlexItem {...flexItemProps}>Flex Item 3</FlexItem>
  </Flex>
);

export const WithFlexComponent = Template.bind({});
WithFlexComponent.args = {
  justifyContent: "space-between",
  bg: "light",
  py: 2,
  px: 3
}
