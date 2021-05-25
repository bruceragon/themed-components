import React, { useRef, useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { Link, Container, Button, Popover, PopoverWithTransitionProps } from "@themed-components/core"

export const PopoverWrapper = (
  props: PopoverWithTransitionProps, 
  ref: any
) => (
  <Popover {...props} ref={ref}/>
)

export default {
  title: 'Primitives/Popover',
  component: PopoverWrapper,
  excludeStories: /.*Wrapper$/,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      }
    }
  },
} as Meta;

const Template: Story<PopoverWithTransitionProps> = (args) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [show, setShow] = useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setShow(!show)} ref={buttonRef} children="Click Me!"/>
      <Popover
        {...args}
        show={show}
        attachTo={buttonRef.current}
        onOutsideClick={() => setShow(false)}
      >
        <Container bg="white" variant="primary" border="1px solid black" width="400px" minHeight="100px" mb={1}>
          This is basically how the <Link href="/?path=/story/buttons-popoverbutton--with-searchable-list-and-variants">PopoverButton</Link> is implemented :)
        </Container>
      </Popover>
    </>
  )
};

export const Vanilla = Template.bind({});
Vanilla.args = {
  position: "top",
  containerProps: {
    zIndex: 9
  }
};
