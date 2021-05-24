import React from "react";
import { Story, Meta } from "@storybook/react";
import { Link, LinkProps } from "@themed-components/core";
import { getMeta } from "../utils/meta"

export default {
  title: "Primitives/Link",
  component: Link,
  ...getMeta<LinkProps>(Link)
} as Meta;

const Template: Story<LinkProps> = (args) => (
  <Link {...args} />
);

export const Vanilla = Template.bind({});
Vanilla.args = {
  children: "Link",
  href: "https://google.com"
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
  bg: "dark",
  fontFamily: "monospace"
}