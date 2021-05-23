import React, { useRef, useState } from "react";
import { Button, ButtonProps, PopoverWithTransition, PopoverWithTransitionProps } from "@themed-components/primitives";

type PopoverButtonProps = ButtonProps & {
    content: React.ReactNode,
    popTo?: PopoverWithTransitionProps["position"],
    popoverProps?: Omit<PopoverWithTransitionProps, "attachTo" | "position" | "children">
}

function PopoverButton({
    content,
    popoverProps,
    popTo = "bottom",
    ...buttonProps
}: PopoverButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [show, setShow] = useState(false);
    return (
        <>
            <Button {...buttonProps} onClick={() => setShow(!show)} ref={buttonRef} />
            <PopoverWithTransition
                position={popTo}
                show={show}
                attachTo={buttonRef}
                onOutsideClick={() => setShow(false)}
                {...popoverProps}
            >
                {content}
            </PopoverWithTransition>
        </>
    )
}

export { PopoverButton };
export type {
    PopoverButtonProps
};