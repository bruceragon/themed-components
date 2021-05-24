import React from "react";
import { Story, Meta } from "@storybook/react";
import { Monitor, X } from "styled-icons/feather";
import {
  Button,
  Icon,
  Heading,
  Container,
  Flex,
  FlexItem,
  ModalButton,
  ModalButtonProps
} from "@themed-components/core"
import { getMeta } from "../utils/meta"

export default {
  title: "Buttons/ModalButton",
  component: ModalButton,
  parameters: {
    layout: 'centered',
  },
  ...getMeta<ModalButtonProps>(ModalButton)
} as Meta;

const Template: Story<ModalButtonProps> = (args) => {
  return (
    <ModalButton {...args} />
  )
};
const transitionDuration = 200;
const modalStyle = {
  transition: `opacity ${transitionDuration}ms ease-in-out`,
  background: "rgba(0,0,0,.1)",
  opacity: 0
};
const transitionStyles: any = {
  entered: { opacity: 1, },
  exiting: { opacity: 0, },
};

export const WithoutTransition = Template.bind({});
WithoutTransition.args = {
  minWidth: 120,
  children: (<Icon iconType={Monitor} size={24} />),
  variant: "primary",
  content: (setShow) => (
    <Flex justifyContent="space-between" flexDirection="column" bg="white" width="70%" maxHeight="50%" overflow="auto">
      <Flex justifyContent="flex-end"><Icon cursor="pointer" color="primary" iconType={X} size={24} onClick={e => setShow(false)} /></Flex>
      <Heading my={2} color="primary" textAlign="center">Heading</Heading>
      <Container px={3} py={2}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Container>
      <FlexItem alignSelf="flex-end" justifyContent="flex-end" px={3} py={2}>
        <Button variant="primary" onClick={e => setShow(false)}>
          Cancel
        </Button>
      </FlexItem>
    </Flex>
  ),
  modalProps: {
    containerProps: {
      bg: "rgba(0,0,0,.1)",
    }
  }
};

export const WithTransition = Template.bind({});
WithTransition.args = {
  ...WithoutTransition.args,
  modalProps: {
    timeout: transitionDuration,
    containerProps: (state) => ({
      style: { ...modalStyle, ...transitionStyles[state] },
    }),
  },
};
