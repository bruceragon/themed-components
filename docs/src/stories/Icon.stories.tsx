import React from "react";
import { Story, Meta } from "@storybook/react";
import { Feather } from "styled-icons/feather";
import { Paragraph as P, Link, Container, Icon, IconProps } from "@themed-components/core"
import { getMeta } from "../utils/meta"

export default {
  title: "Primitives/Icon",
  component: Icon,
  ...getMeta<IconProps>(Icon)
} as Meta;

const Template: Story<IconProps> = (args) => (
  <Container>
    <Icon {...args} />
    <P>
      The Icon component is basically a wrapper around <Link target="_blank" href="https://styled-icons.js.org/">Styled Icons</Link> allowing to style the icons from the Theme. Just pass a StyledIcon as the iconType parameter.
    </P>
  </Container>
);

export const Vanilla = Template.bind({});
Vanilla.args = {
  iconType: Feather,
  size: 42
}

export const WithVariant = Template.bind({});
WithVariant.args = {
  ...Vanilla.args,
  variant: "primary"
}

export const WithSystemProps = Template.bind({});
WithSystemProps.args = {
  ...Vanilla.args,
  color: "light-accent",
  bg: "dark",
}