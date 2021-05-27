import React, { useState } from "react";
import { Story, Meta } from "@storybook/react";
import { 
  Link, 
  Icon, 
  Container, 
  Flex,
  FlexItem,
  Heading, 
  Button, 
  ModalWithTransition as Modal, 
  ModalWithTransitionProps  
} from "@themed-components/core"
import { X } from "styled-icons/feather";

//fixes React.memo issue with Doc Gen
export const ModalWrapper = (props: ModalWithTransitionProps) => (
  <Modal {...props} />
)

export default {
  title: "Primitives/Modal",
  component: ModalWrapper,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      }
    }
  },
  excludeStories: /.*Wrapper$/,
} as Meta;

const buttonProps = {
  variant: "primary",
  minWidth: 120
}

const modalContent: (setShow: (show: boolean) => void) => ModalWithTransitionProps["children"] = (setShow) => (
  <Flex justifyContent="space-between" flexDirection="column" bg="white" width="70%" maxHeight="50%" overflow="auto">
      <Flex justifyContent="flex-end"><Icon cursor="pointer" color="primary" iconType={X} size={24} onClick={e => setShow(false)}/></Flex>
      <Heading my={2} color="primary" textAlign="center">Heading</Heading>
      <Container px={3} py={2}>
        This is just an example of how the Modal Component can be used but if you just need a button that opens a modal
        check the <Link href="?path=/story/buttons-modalbutton--with-transition">ModalButton</Link> Component.
        The ModalButton Component has a "modalProps" property that corresponds to the props of this Modal Component.
      </Container>
      <FlexItem alignSelf="flex-end" justifyContent="flex-end" px={3} py={2}>
        <Button variant="primary" onClick={e => setShow(false)}>
          Cancel
        </Button>
      </FlexItem>
    </Flex>
)

const Template: Story<ModalWithTransitionProps> = ({show, children, ...modalProps}) => {
  const [_show, setShow] = useState(show ?? false)
    const _modalProps: ModalWithTransitionProps = {
        show: _show,
        children: modalContent(setShow),
        ...modalProps,
    }
    return (
        <>
            <Button {...buttonProps} onClick={(e) => setShow(!show)}>Toggle Modal</Button>
            <Modal {..._modalProps}/>
        </>
    )
};

export const WithoutTransition = Template.bind({});
WithoutTransition.args = {
  contentPosition: "centered",
  containerProps: {
    bg: "rgba(0,0,0,.1)",
  }
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
export const WithTransition = Template.bind({});
WithTransition.args = {
  ...WithoutTransition.args,
  timeout: transitionDuration,
  containerProps: (state) => ({
    style: { ...modalStyle, ...transitionStyles[state] },
  }),
};

