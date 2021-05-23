import React from "react";
import { Story, Meta } from "@storybook/react";
import { Input, Label, LabelProps } from "@themed-components/core"
import { getMeta } from "../utils/meta"

export default {
  title: "Primitives/Label",
  component: Label,
  ...getMeta<LabelProps>(Label),
  excludeStories: /.*Template$/,
} as Meta;

const inputId = "input-id";

export const Template: Story<LabelProps> = (args) => (
  <>
    <Label {...args} />
    <Input id={inputId} variant="primary" />
  </>
);

export const WithAnInput = Template.bind({});
WithAnInput.args = {
  htmlFor: inputId,
  variant: "primary",
  children: "a label",
  mr: 2
}
