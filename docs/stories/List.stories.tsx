import React from "react";
import { Story, Meta } from "@storybook/react";
import { Link, List, ListItem, ListProps } from "@themed-components/core"
import { getMeta } from "../utils/meta"

export default {
  title: "Primitives/List",
  component: List,
  ...getMeta<ListProps>(List)
} as Meta;

const Template: Story<ListProps> = (args) => (
  <List {...args}>
    <ListItem variant="primary"><Link href="https://google.com">Item 1</Link></ListItem>
    <ListItem variant="primary"><Link href="https://google.com">Item 2</Link></ListItem>
  </List>
);

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
  orientation: "vertical"
}