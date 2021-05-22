import React, { useState } from "react";
import { Button, ButtonProps, ModalWithTransition, ModalWithTransitionProps } from "@themed-components/primitives";

type ModalButtonProps = ButtonProps
    & {
        content: (setShow: (show: boolean) => void) => React.ReactNode,
        contentPosition?: ModalWithTransitionProps["contentPosition"],
        modalProps?: Omit<ModalWithTransitionProps, "children">
    }

function ModalButton({
    content,
    contentPosition,
    modalProps,
    ...buttonProps
}: ModalButtonProps) {
    const [show, setShow] = useState(modalProps && modalProps.show ? modalProps.show : false)
    const _modalProps: ModalWithTransitionProps = {
        show,
        children: content(setShow),
        contentPosition: contentPosition ?? "centered",
        ...modalProps,
    }
    return (
        <>
            <Button {...buttonProps}
                onClick={(e) => {
                    setShow(!show);
                    if (buttonProps.onClick) buttonProps.onClick(e);
                }}
            />
            <ModalWithTransition {..._modalProps} />
        </>
    )
}

export default ModalButton;

export type {
    ModalButtonProps
}