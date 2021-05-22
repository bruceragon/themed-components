import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Container, MultiSelect, MultiSelectProps } from "@themed-components/core"
import { getMeta } from "../utils/meta"

//fixes React.forwardRef issue with Doc Gen
export const MultiSelectWrapper = (props: MultiSelectProps) => (
  <MultiSelect {...props} />
);

export default {
  title: 'MultiSelect/MultiSelect',
  component: MultiSelectWrapper,
  excludeStories: /.*Wrapper$/,
  ...getMeta<MultiSelectProps>(MultiSelectWrapper)
} as Meta;

const Template: Story<MultiSelectProps> = (args) => (
  <MultiSelect {...args} />
);
export const Vanilla = Template.bind({});
Vanilla.args = {
  placeholder: "MultiSelect",
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
