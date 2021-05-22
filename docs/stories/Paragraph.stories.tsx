import React from "react";
import { Story, Meta } from "@storybook/react";
import { Paragraph, ParagraphProps } from "@themed-components/core";
import { getMeta } from "../utils/meta"

export default {
  title: "Primitives/Paragraph",
  component: Paragraph,
  ...getMeta<ParagraphProps>(Paragraph)
} as Meta;

const Template: Story<ParagraphProps> = (args) => (
  <Paragraph {...args} />
);

export const Vanilla = Template.bind({});
Vanilla.args = {
  children: "Paragraph",
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
  px: 3,
  bg: "secondary",
  fontFamily: "monospace"
}