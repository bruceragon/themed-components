import React from "react";
import { Story, Meta } from "@storybook/react";
import { Text, TextProps } from "@themed-components/core";
import { getMeta } from "../utils/meta"

export default {
  title: "Primitives/Text",
  component: Text,
  ...getMeta<TextProps>(Text)
} as Meta;

const Template: Story<TextProps> = (args) => (
  <Text {...args} />
);

export const Vanilla = Template.bind({});
Vanilla.args = {
  children: "Text",
}

export const WithVariant = Template.bind({});
WithVariant.args = {
  ...Vanilla.args,
  variant: "buttons.primary"
}

export const WithSystemProps = Template.bind({});
WithSystemProps.args = {
  ...Vanilla.args,
  py: [1, 2, 3],
  px: 3,
  bg: "secondary",
  fontFamily: "monospace"
}