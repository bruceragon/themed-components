import React from "react";
import { Story, Meta } from "@storybook/react";
import { Input, InputProps } from "@themed-components/core";
import { getMeta } from "../utils/meta"

export default {
  title: "Primitives/Input",
  component: Input,
  ...getMeta<InputProps>(Input)
} as Meta;

const Template: Story<InputProps> = (args) => (
  <Input {...args} />
);

export const Vanilla = Template.bind({});
Vanilla.args = {
  placeholder: "input"
}

export const WithVariant = Template.bind({});
WithVariant.args = {
  ...Vanilla.args,
  variant: "primary"
}

export const WithSystemProps = Template.bind({});
WithSystemProps.args = {
  ...Vanilla.args,
  py: [1, 2, 3],
  px: 2,
  border: "none",
  bg: "primary",
  fontFamily: "monospace",
  color: "white"
}