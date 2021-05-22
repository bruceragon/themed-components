import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Container, SearchableList, SearchableListProps } from "@themed-components/core"
import { getMeta } from "../utils/meta"

export default {
  title: 'SearchableList/SearchableList',
  component: SearchableList,
  ...getMeta<SearchableListProps>(SearchableList)
} as Meta;

const Template: Story<SearchableListProps> = (args) => (
  <SearchableList {...args} />
);

const options = Array.from({ length: 10 }, (_, i) => i).map((n) => ({ label: "Row" + n, value: n }));

export const Vanilla = Template.bind({});
Vanilla.args = {
  options,
  icon: null,
  width: "200px",
  onItemSelect: (s, ss) => console.log(s, ss),
}

const emptyList = <Container color="primary" textAlign="center" fontStyle="italic" py={2}>Oops!</Container>;

export const WithInputAndListVariant = Template.bind({});
WithInputAndListVariant.args = {
  ...Vanilla.args,
  variant: "searchableList",
  listProps: { variant: "searchableList" },
  emptyList
}