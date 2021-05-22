import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Button, Flex, ButtonProps } from "@themed-components/core";
import { getMeta } from "../utils/meta"

export default {
  title: 'Primitives/Button',
  ...getMeta<ButtonProps>(Button)
} as Meta;

const Template: Story<ButtonProps> = (args) => (
  <Flex justifyContent="space-evenly">
    <Button {...args} />
    <Button {...args} variant="success">success</Button>
    <Button {...args} variant="info">info</Button>
    <Button {...args} variant="warning">warning</Button>
    <Button {...args} variant="danger">danger</Button>
  </Flex>
);

export const WithVariant = Template.bind({});
WithVariant.args = {
  variant: "primary",
  children: "primary",
};

export const WithSystemProps = Template.bind({});
WithSystemProps.args = {
  py: [1, 2, 3],
  px: 3,
  bg: "secondary",
  fontFamily: "monospace",
  children: "button",
};
