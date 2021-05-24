import React from 'react';
import { Story, Meta } from '@storybook/react';
import {
  SearchableList,
  PopoverButton,
  Flex,
  List,
  ListItem,
  Icon,
  Text,
  PopoverButtonProps
} from "@themed-components/core"
import { Monitor } from 'styled-icons/feather';
import { getMeta } from "../utils/meta"

export default {
  title: 'Buttons/PopoverButton',
  component: PopoverButton,
  parameters: {
    layout: 'centered',
  },
  ...getMeta<PopoverButtonProps>(PopoverButton)
} as Meta;

const Template: Story<PopoverButtonProps> = (args) => (
    <PopoverButton {...args} children={args.popTo} />
);

export const Vanilla = Template.bind({});
Vanilla.args = {
  popTo: "top",
  content: "some content",
  minWidth: 120
};

const options = Array.from({ length: 10 }, (_, i) => i).map((n) => ({ label: "Row" + n, value: n }));

export const WithSearchableListAndVariants = Template.bind({});
WithSearchableListAndVariants.args = {
  ...Vanilla.args,
  variant: "primary",
  popTo: "left-top",
  content: (<SearchableList
    variant="searchableList"
    listHeight={150}
    options={options}
    width="200px"
    listProps={{ variant: "searchableList" }}
    onItemSelect={(s, ss) => console.log(s, ss)}
  />)
};

export const WithTransition = Template.bind({});
WithTransition.args = {
  ...WithSearchableListAndVariants.args,
  popTo: "bottom-right",
  content: (
    <List variant="popUp">
      <ListItem>
        <Icon mr={3} variant="primary" iconType={Monitor} size={24} /><Text>Item 1</Text>
      </ListItem>
      <ListItem>
        <Icon mr={3} variant="primary" iconType={Monitor} size={24} /><Text>Item 2</Text>
      </ListItem>
      <ListItem>
        <Icon mr={3} variant="primary" iconType={Monitor} size={24} /><Text>Item 3</Text>
      </ListItem>
    </List>
  ),
  popoverProps: {
    timeout: 300,
    containerProps: (state) => ({
      style: {
        transition: "opacity 500ms",
        opacity: state === "entered" ? 1 : 0
      }
    })
  }
};
