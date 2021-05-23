import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Container, MultiSearchableList, MultiSearchableListProps } from "@themed-components/core"
import { getMeta } from "../utils/meta"

export default {
  title: 'SearchableList/MultiSearchableList',
  component: MultiSearchableList,
  ...getMeta<MultiSearchableListProps>(MultiSearchableList)
} as Meta;

const Template: Story<MultiSearchableListProps> = (args) => (
  <MultiSearchableList {...args} />
);

const options = Array.from({length: 10}, (_, i) => i).map((n) => ({ label: "Row" + n, value: n }));

export const Vanilla = Template.bind({});
Vanilla.args = {
  options,
  icon: null,
  width: "200px",
  onItemSelect: (s, ss) => console.log(s, ss),
  onInputValueChange: (value, setter) => setter(value ?? ""),
}

const emptyList = <Container color="primary" textAlign="center" fontStyle="italic" py={2}>Oops!</Container>;

export const WithInputAndListVariant = Template.bind({});
WithInputAndListVariant.args = {
  ...Vanilla.args,
  variant: "searchableList",
  listProps: { variant: "searchableList" },
  emptyList
}