import React from "react";
import { Story, Meta } from "@storybook/react";
import { Heading, HeadingProps } from "@themed-components/core";
import { getMeta } from "../utils/meta"

export default {
  title: "Primitives/Heading",
  component: Heading,
  ...getMeta<HeadingProps>(Heading)
} as Meta;

const Template: Story<HeadingProps> = (args) => (
  <Heading {...args} />
);

export const Vanilla = Template.bind({});
Vanilla.args = {
  children: "Heading"
}

export const WithVariant = Template.bind({});
WithVariant.args = {
  ...Vanilla.args,
  variant: "large",
  as: "h1",
  color: "primary"
}

export const WithSystemProps = Template.bind({});
WithSystemProps.args = {
  ...Vanilla.args,
  py: [1, 2, 3],
  px: 3,
  bg: "secondary",
  fontFamily: "monospace"
}