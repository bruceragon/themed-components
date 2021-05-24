import React from "react";
import { Story, Meta } from "@storybook/react";
import {
  Text,
  Heading,
  Icon,
  Container,
  Image,
  withCover,
  ImageProps,
  CoverProps
} from "@themed-components/core"
import { Warning } from "@styled-icons/entypo/Warning";

export default {
  title: "HOCs/withCover",
  component: withCover(Image),
} as Meta;

const ImageWithCover = withCover(Image);

const Template: Story<CoverProps<ImageProps>> = (args) => (
  <ImageWithCover {...args} />
);

export const ExampleWithAnImage = Template.bind({});
ExampleWithAnImage.args = {
  src: "https://pngimage.net/wp-content/uploads/2018/06/sample-logo-png-transparent-background-1.png",
  width: ["75%", "75%", "50%"],
  style: { boxSizing: "border-box" },
  _popoverProps: {
    timeout: 300,
    containerProps: (state) => ({
      style: {
        transition: "opacity 500ms",
        opacity: state === "entered" ? 1 : 0
      }
    })
  },
  _cover: (
    <Container
      width="100%"
      height="100%"
      position="relative"
    >
      <Icon position="absolute" top="5px" right="5px" iconType={Warning} size={24} color="primary" />
      <Container width="100%" height="65%" bg="black" opacity={0.1}>
      </Container>
      <Container width="100%" height="35%" bg="grey-100" py={1} px={3}>
        <Heading variant="small" as="h4">Card Heading</Heading>
        <Text fontSize="10px">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
      </Container>
    </Container>
  ),
}
