import { FlexProps, FlexItem } from "./Container";
import { Portal, PortalProps } from "react-portal";
import { useMemo, useCallback } from "react";
import React from "react";
import { styleFn } from "styled-system";
import styled from "styled-components";

import { Transition } from "react-transition-group";
import { TransitionProps, TransitionStatus, TransitionChildren } from "react-transition-group/Transition";

type ModalProps = PortalProps & {
    containerProps?: FlexProps,
    show?: boolean,
    contentPosition?: "centered" | "top" | "right" | "bottom" | "left"
}

const defaultContainerProps: FlexProps = {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 9,
}

const getContentPosition: styleFn = ({ contentPosition }: ModalProps) => {
    if (!contentPosition) return ""
    const style: Partial<FlexProps> = {
        display: "flex"
    }
    switch (contentPosition) {
        case "centered":
            style.alignItems = "center"
            style.justifyContent = "center"
            break
        case "top":
            style.alignItems = "flex-start"
            break
        case "right":
            style.justifyContent = "flex-end"
            break
        case "bottom":
            style.alignItems = "flex-end"
            break
        case "left":
            style.justifyContent = "flex-start"
            break;
    }
    return style;
}

const ModalContainer = styled(FlexItem)<ModalProps>(
    getContentPosition
)

function Modal({
    containerProps,
    children,
    contentPosition = "centered",
    show = false,
    ...portalProps
}: ModalProps) {
    const _containerProps = useMemo(() =>
        ({ ...defaultContainerProps, contentPosition, ...containerProps })
        , [containerProps, contentPosition]);
    return (
        <>
            {show && children &&
                <Portal {...portalProps}>
                    <ModalContainer {..._containerProps}>
                        {children}
                    </ModalContainer>
                </Portal>
            }
        </>
    )
}

type ModalWithTransitionProps =
    (
        Omit<TransitionProps, "timeout" | "addEndListener" | "ref"> &
        Omit<ModalProps, "containerProps" | "ref"> & {
            timeout?: TransitionProps["timeout"],
            addEndListener: TransitionProps["addEndListener"],
            containerProps?: ((state: TransitionStatus) => FlexProps),
        }
    ) |
    (
        Omit<TransitionProps, "timeout" | "addEndListener" | "ref"> &
        Omit<ModalProps, "containerProps" | "ref"> & {
            timeout: TransitionProps["timeout"],
            addEndListener?: TransitionProps["addEndListener"],
            containerProps?: ((state: TransitionStatus) => FlexProps),
        }
    ) |
    (
        Omit<ModalProps, "ref"> & {
            timeout?: TransitionProps["timeout"],
            addEndListener?: TransitionProps["addEndListener"],
        }
    )

function _ModalWithTransition({
    node,
    containerProps,
    children,
    contentPosition,
    show = false,
    ...transitionProps
}: ModalWithTransitionProps) {
    const modalProps = {
        node,
        containerProps,
        children,
        contentPosition,
        show,
    }
    if (!transitionProps.addEndListener && !transitionProps.timeout) {
        return <Modal {...modalProps} />
    }
    const _children = (state: TransitionStatus) => children instanceof Function ? children(state) : children;
    const _containerProps = (state: TransitionStatus) => containerProps instanceof Function ? containerProps(state) : containerProps;
    return (
        //@ts-ignore
        <Transition in={show} {...transitionProps}>
            {state =>
                <Modal
                    node={node}
                    show={state !== "exited"}
                    contentPosition={contentPosition}
                    containerProps={_containerProps(state)}
                >
                    {_children(state)}
                </Modal>
            }
        </Transition>
    )
}

const ModalWithTransition = React.memo<React.FC<ModalWithTransitionProps>>(_ModalWithTransition);

export default ModalWithTransition;
export {
    Modal,
    ModalWithTransition
};
export type {
    ModalProps,
    ModalWithTransitionProps
}