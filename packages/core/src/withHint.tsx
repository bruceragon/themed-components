import React, { MutableRefObject, useCallback, useLayoutEffect, useRef, useState } from "react";
import { Popover, PopoverWithTransitionProps } from "@themed-components/primitives";

export type HintProps<P> = P & {
    _hint: React.ReactNode
    _popTo?: PopoverWithTransitionProps['position']
    _popoverProps?: Partial<PopoverWithTransitionProps>
    forwardedRef?: MutableRefObject<unknown> | ((instance: unknown) => void)
}

export function withHint<P, RefType = any>(Component: React.ComponentType<P>) {
    const WithHint = ({
        _hint,
        _popoverProps,
        forwardedRef,
        _popTo = "top",
        ...ogProps
    }: HintProps<P>) => {
        const ref = useRef<HTMLElement | null>(null);
        const [_show, setShow] = useState(_popoverProps?.show ?? false)
        useLayoutEffect(() => {
            const mouseOver = () => {
                setShow(true)
            };
            const mouseOut = () => {
                setShow(false)
            };
            if (ref && ref.current) {
                ref.current.addEventListener("mouseover", mouseOver)
                ref.current.addEventListener("mouseout", mouseOut)
            }
            return () => {
                if (ref && ref.current) {
                    ref.current.removeEventListener("mouseover", mouseOver)
                    ref.current.removeEventListener("mouseout", mouseOut)
                }
            }
        }, [ref.current])
        const refs = useCallback((r) => {
            ref.current = r;
            if (forwardedRef) {
                if (typeof forwardedRef === "function") {
                    forwardedRef(r)
                } else {
                    forwardedRef.current = r
                }
            }
        }, [forwardedRef])
        return (
            <>
                <Component ref={refs} {...(ogProps as unknown as P)} />
                <Popover
                    position={_popTo}
                    show={_show}
                    {..._popoverProps}
                    attachTo={ref}
                >
                    {_hint}
                </Popover>
            </>
        )
    }

    return React.forwardRef<RefType, HintProps<P>>((props, ref) => {
        return <WithHint {...props} forwardedRef={ref} />;
    });
}