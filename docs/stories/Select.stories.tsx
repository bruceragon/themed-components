import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Container, Select, SelectProps } from "@themed-components/core"
import { getMeta } from "../utils/meta"

//fixes React.forwardRef issue with Doc Gen
export const SelectWrapper = (props: SelectProps) => (
  <Select {...props} />
);

export default {
  title: 'Inputs/Select',
  component: SelectWrapper,
  excludeStories: /.*Wrapper$/,
  ...getMeta<SelectProps>(SelectWrapper)
} as Meta;

const Template: Story<SelectProps> = (args) => (
  <Select {...args} />
);
export const Vanilla = Template.bind({});
Vanilla.args = {
  placeholder: "Select",
  options: Array.from({ length: 100 }, (_, i) => i).map((n) => ({ label: "Row" + n, value: n })),
}

const emptyList = <Container textAlign="center" fontStyle="italic" py={2}>no results</Container>;

export const Searchable = Template.bind({});
Searchable.args = {
  ...Vanilla.args,
  searchable: true,
  emptyList,
}

export const WithVariant = Template.bind({});
WithVariant.args = {
  ...Searchable.args,
  variant: "primary"
}
