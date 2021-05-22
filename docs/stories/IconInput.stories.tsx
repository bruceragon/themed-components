import React from "react";
import { Story, Meta } from "@storybook/react";
import { IconInput, IconInputProps } from "@themed-components/core";
import { getMeta } from "../utils/meta";
import { Search } from "@styled-icons/feather";
import { ChevronWithCircleDown } from "styled-icons/entypo";

//fixes React.forwardRef issue with Doc Gen
export const IconInputWrapper = (props: IconInputProps) => (
  <IconInput {...props} />
);

export default {
  title: "Inputs/IconInput",
  // component: IconInput,
  // excludeStories: /.*Wrapper$/,
  // ...getMeta<IconInputProps>(IconInput),
  component: IconInputWrapper,
  excludeStories: /.*Wrapper$/,
  ...getMeta<IconInputProps>(IconInputWrapper),
} as Meta;

const Template: Story<IconInputProps> = (args) => (
  <IconInput {...args} />
);

export const WithSearchIcon = Template.bind({});
WithSearchIcon.args = {
  iconPosition: "left",
  icon: Search
}

export const WithChevronIcon = Template.bind({});
WithChevronIcon.args = {
  iconPosition: "right",
  icon: ChevronWithCircleDown
}

export const WithVariant = Template.bind({});
WithVariant.args = {
  ...WithSearchIcon.args,
  variant: "primary",
}
