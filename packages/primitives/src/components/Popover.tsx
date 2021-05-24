import React, { MutableRefObject, RefObject, useMemo, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Portal } from 'react-portal';
import { Flex, FlexProps } from './Container';
import { Transition } from "react-transition-group";
import { TransitionProps, TransitionStatus } from "react-transition-group/Transition";

type PopoverProps = {
    attachTo: MutableRefObject<HTMLElement> | RefObject<HTMLElement>
    containerRef?: RefObject<HTMLDivElement>
    children: React.ReactNode
    show?: boolean
    containerProps?: FlexProps
    position?: "top" | "right" | "bottom" | "left" | "top-left" | "top-right" | "right-top" | "right-bottom" | "bottom-left" | "bottom-right" | "left-top" | "left-bottom" | "left-bottom-down" | "right-bottom-down" | "left-top-up" | "right-top-up" | "cover"
    allowOverflow?: boolean
    onOutsideClick?: () => void
}

const defaultContainerProps: FlexProps = {
    position: "fixed",
    overflow: "visible",
}

function combinePositions(mainPosition: string, secondPosition: string, targetRect: DOMRect) {
    const { height, width, x, y } = targetRect;
    const positions: Partial<FlexProps> = {};
    if (mainPosition === "top" || mainPosition === "bottom") {
        switch (secondPosition) {
            case "left": // should grow right (top-left, bottom-left)
                positions.left = x
                break;
            case "right": // should grow left (top-right, bottom-right)
                positions.right = window.document.body.clientWidth - (x + width)
                break;
            default: // center
                positions.left = x
                positions.right = window.document.body.clientWidth - (x + width)
                positions.justifyContent = "center"
                break;
        }
    } else { // mainPosition === 'left' | 'right'
        switch (secondPosition) {
            case "top": // should grow down (left-top, right-top)
                positions.top = y
                break;
            case "top-up": // should grow up (left-top-up, right-top-up)
                positions.bottom = window.innerHeight - y
                break;
            case "bottom": // should grow up (left-bottom, right-bottom)
                positions.bottom = window.innerHeight - (y + height)
                break;
            case "bottom-down": // should grow down (left-bottom-down, right-bottom-down)
                positions.top = y + height
                break;
            default: // center
                positions.top = y
                positions.bottom = window.innerHeight - y
                positions.alignItems = "center"
                positions.minHeight = height
                break;
        }
    }
    return positions;
}

function getContainerPositions({ position, attachTo }: Partial<PopoverProps>) {
    const targetRect = attachTo!.current!.getBoundingClientRect();
    const { height, width, x, y } = targetRect;
    let positions: Partial<FlexProps> = {};
    const arrayPosition = (position as string).split("-");
    const mainPosition = arrayPosition[0];
    const secondPosition = arrayPosition.length > 1
        ? arrayPosition.slice(1, arrayPosition.length).join("-")
        : "center";
    switch (mainPosition) {
        case "cover":
            return {
                left: x,
                top: y,
                width: attachTo!.current!.clientWidth,
                height: attachTo!.current!.clientHeight,
                overflow: "hidden"
            }
        case "top":
            positions.bottom = window.innerHeight - y
            break;
        case "right":
            positions.left = x + width
            break;
        case "bottom":
            positions.top = y + height
            break;
        case "left":
            positions.right = window.document.body.clientWidth - x
            break;
    }
    positions = {
        ...positions,
        ...combinePositions(mainPosition, secondPosition, targetRect)
    }
    for (let key in positions) {
        if (typeof positions[key] === "number")
            positions[key] = Math.round(positions[key]);
    }
    return positions;
}

const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(({
    attachTo,
    children,
    onOutsideClick,
    show = false,
    containerProps,
    position = "bottom",
    allowOverflow = false
}, containerRef) => {
    const _containerRef = useRef<HTMLDivElement | null>(null);
    const { style, ...containerPropsWithoutStyle } = containerProps as FlexProps;
    const _containerProps = useMemo(() => ({
        ...defaultContainerProps,
        ...containerPropsWithoutStyle
    }), [containerPropsWithoutStyle]);
    const [positionProps, setPositionProps] = useState<FlexProps>();
    useLayoutEffect(() => {
        const setPositions = () => {
            if (attachTo && attachTo.current) {
                const positions = getContainerPositions({ position, attachTo });
                setPositionProps(positions);
            }
        }
        setPositions();
        window.addEventListener("resize", setPositions);
        window.addEventListener("scroll", setPositions);
        return () => {
            window.removeEventListener("resize", setPositions);
            window.removeEventListener("scroll", setPositions);
        }
    }, [attachTo.current, position, attachTo]);
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                onOutsideClick &&
                attachTo.current &&
                _containerRef.current &&
                !attachTo.current.contains(event.target as Node) &&
                !_containerRef.current.contains(event.target as Node)
            ) {
                onOutsideClick();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [attachTo.current, attachTo, onOutsideClick])
    const handleContainerRef = useCallback((ref) => {
        _containerRef.current = ref;
        if (containerRef) {
            if (containerRef instanceof Function) {
                containerRef(ref)
            } else {
                containerRef.current = ref;
            }
        }
    }, [containerRef])
    return (
        <>
            {
                show && (attachTo && attachTo.current) && children &&
                <Portal>
                    <Flex
                        ref={handleContainerRef}
                        {..._containerProps}
                        style={{...style, ...positionProps}}
                    >
                        {children}
                    </Flex>
                </Portal>
            }
        </>
    )
})

type PopoverWithTransitionProps =
    (
        Omit<TransitionProps, "timeout" | "addEndListener"> &
        Omit<PopoverProps, 'containerProps'> & {
            timeout?: TransitionProps['timeout'],
            addEndListener: TransitionProps['addEndListener'],
            containerProps?: ((state: TransitionStatus) => FlexProps),
        }
    ) |
    (
        Omit<TransitionProps, "timeout" | "addEndListener"> &
        Omit<PopoverProps, 'containerProps'> & {
            timeout: TransitionProps['timeout'],
            addEndListener?: TransitionProps['addEndListener'],
            containerProps?: ((state: TransitionStatus) => FlexProps),
        }
    ) |
    (
        PopoverProps & {
            timeout?: TransitionProps['timeout'],
            addEndListener?: TransitionProps['addEndListener'],
        }
    )

const _PopoverWithTransition = React.forwardRef<HTMLDivElement, PopoverWithTransitionProps>(({
    attachTo,
    children,
    onOutsideClick,
    show = false,
    containerProps = {},
    position = "bottom",
    allowOverflow = false,
    ...transitionProps
}, forwardedRef) => {
    const popoverProps = {
        attachTo,
        children,
        onOutsideClick,
        containerProps,
        position,
        allowOverflow
    }
    if (!transitionProps.addEndListener && !transitionProps.timeout) {
        //@ts-ignore
        return <Popover show={show} ref={forwardedRef} {...popoverProps} />
    }
    const _children = (state: TransitionStatus) => children instanceof Function ? children(state) : children;
    const _containerProps = (state: TransitionStatus) => containerProps instanceof Function ? containerProps(state) : containerProps;
    return (
        //@ts-ignore
        <Transition in={show} {...transitionProps}>
            {state =>
                <Popover
                    {...popoverProps}
                    show={state !== "exited"}
                    containerProps={_containerProps(state)}
                    ref={forwardedRef}
                >
                    {_children(state)}
                </Popover>
            }
        </Transition>
    )
})

const PopoverWithTransition = React.memo<React.FC<PopoverWithTransitionProps>>(_PopoverWithTransition);

export {
    Popover,
    PopoverWithTransition
}
export type {
    PopoverProps,
    PopoverWithTransitionProps
};
