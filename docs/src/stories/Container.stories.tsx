import React from 'react';
import { Story, Meta } from '@storybook/react';
import { getMeta } from "../utils/meta"
import { Label, Input, Container, ContainerProps  } from "@themed-components/core"

export default {
  title: 'Primitives/Container',
  component: Container,
  ...getMeta<ContainerProps>(Container),
} as Meta;

const Template: Story<ContainerProps> = (args) => (
  <Container {...args} />
);

export const Vanilla = Template.bind({});
Vanilla.args = {
  children: "Container",
};

export const WithSystemProps = Template.bind({});
WithSystemProps.args = {
  ...Vanilla.args,
  py: [1, 2, 4],
  px: 3,
  bg: "light",
  color: "primary",
  fontWeight: 600,
};


export const FormGroup = Template.bind({});
FormGroup.args = {
  variant: "formGroup",
  children: [
    <Label htmlFor="input-id">a label</Label>,
    <Input id="input-id" variant="primary"/>
  ]
}

export const FormGroupInline = Template.bind({});
FormGroupInline.args = {
  ...FormGroup.args,
  variant: "formGroupInline",
}
