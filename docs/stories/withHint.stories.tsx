import React from "react";
import { Story, Meta } from "@storybook/react";
import {
  Paragraph as P,
  Link,
  Text,
  Container,
  withHint,
  HintProps,
  ContainerProps,
  TextProps,
  LinkProps
} from "@themed-components/core"

export default {
  title: "HOCs/withHint",
  component: withHint(Text),
  parameters: {
    layout: 'centered',
  },
} as Meta;

const TextWithHint = withHint(Text);
const LinkWithHint = withHint(Link);

const hintContainerProps: ContainerProps = {
  minWidth: "200px",
  textAlign: "center",
  color: "white",
  bg: "black"
}
const linkProps: HintProps<LinkProps> = {
  href: "?path=/story/primitives-link",
  _popTo: "bottom",
  _popoverProps: {
    timeout: 300,
    containerProps: (state) => ({
      style: {
        transition: "opacity 500ms",
        opacity: state === "entered" ? 1 : 0
      }
    })
  },
  _hint: (
    <Container {...hintContainerProps} mt={1} px={2}>
      click to go to the Link Component page 
    </Container>
  ),
  children: "Link"
}
const Template: Story<HintProps<TextProps>> = (args) => (
  <P py={1}>wrap a component like <LinkWithHint {...linkProps} /> or Text using the <TextWithHint {...args}>withHint</TextWithHint> HOC</P>
);

export const ExampleWithAText = Template.bind({});
ExampleWithAText.args = {
  style: { boxSizing: "border-box" },
  color: "primary",
  _popTo: "top",
  _hint: (
    <Container {...hintContainerProps} mb={1}>
      some useful piece of information...
    </Container>
  ),
  _popoverProps: {
    timeout: 300,
    containerProps: (state) => ({
      style: {
        transition: "opacity 500ms",
        opacity: state === "entered" ? 1 : 0
      }
    })
  },
  // _popoverProps: {
  //   show: true
  // }
}
