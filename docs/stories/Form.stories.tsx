import React from "react";
import { Story, Meta } from "@storybook/react";
import { Label, Input, Select, Form, Container, Flex, FlexProps, FormProps } from "@themed-components/core"
import { getMeta } from "../utils/meta"

export default {
  title: "Primitives/Form",
  component: Form,
  parameters: {
    componentSubtitle: "theme aware HTML Form Element",
  },
  subcomponents: {
    Flex,
    Label,
    Input,
    Select,
  },
  ...getMeta<FormProps>(Form)
} as Meta;

const Template: Story<FormProps> = (args) => (
  <Form {...args} />
);

const getChildren = (inline: boolean) => {
  return [
    <Flex variant={inline ? "formGroupInline" : "formGroup"}>
      <Label>First name</Label>
      <Input variant="primary" />
    </Flex>,
    <Flex variant={inline ? "formGroupInline" : "formGroup"}>
      <Label>Last name</Label>
      <Input variant="primary" />
    </Flex>,
    <Flex variant={inline ? "formGroupInline" : "formGroup"}>
      <Label>Email</Label>
      <Input type="email" variant="primary" />
    </Flex>,
    <Flex variant={inline ? "formGroupInline" : "formGroup"}>
      <Label>Password</Label>
      <Input type="password" variant="primary" />
    </Flex>,
    <Flex variant={inline ? "formGroupInline" : "formGroup"}>
      <Label>Select</Label>
      <Select variant="primary" options={[
        { label: "option 1", value: 1 },
        { label: "option 2", value: 2 },
        { label: "option 3", value: 3 },
      ]}
      />
    </Flex>
  ]
}

export const WithFormGroup = Template.bind({});
WithFormGroup.args = {
  width: "75%",
  maxWidth: "100%",
  // overflowX: "hidden",
  variant: "bordered",
  children: getChildren(false)
}
WithFormGroup.parameters = {
  docs: {
    storyDescription: "This example uses Containers with a variant to group Labels and Inputs within a Form",
  },
}

export const WithFormGroupInline = Template.bind({});
WithFormGroupInline.args = {
  ...WithFormGroup.args,
  children: getChildren(true)
}
WithFormGroupInline.parameters = {
  docs: {
    storyDescription: "This example uses Containers with a variant to group Labels and Inputs within a Form",
  },
}