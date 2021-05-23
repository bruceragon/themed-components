import React from "react";
import { Story, Meta } from "@storybook/react";
import { Image, ImageProps } from "@themed-components/core";
import { getMeta } from "../utils/meta"

export default {
  title: "Primitives/Image",
  component: Image,
  ...getMeta<ImageProps>(Image)
} as Meta;

const Template: Story<ImageProps> = (args) => (
  <Image {...args} />
);

export const WithSystemProps = Template.bind({});
WithSystemProps.args = {
  src: "https://pngimage.net/wp-content/uploads/2018/06/sample-logo-png-transparent-background-1.png",
  py: [1, 2, 3],
  px: 3,
  width: ["100%", "75%", "50%"],
  style: { boxSizing: "border-box" }
}