import React, { MutableRefObject, useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Popover, PopoverWithTransitionProps } from "@themed-components/primitives";

export type CoverProps<P> = P & {
    _cover: PopoverWithTransitionProps["children"]
    _popoverProps?: Omit<PopoverWithTransitionProps, "position" | "children" | "popTo" | "attachTo">
    forwardedRef?: MutableRefObject<unknown> | ((instance: unknown) => void)
}

export default function withCover<P, RefType = any>(
    Component: React.ComponentType<P>,
) {
    const WithCover = ({
        _cover,
        _popoverProps,
        forwardedRef,
        ...ogProps
    }: CoverProps<P>) => {
        const [overlayRef, setOverlayRef] = useState<HTMLDivElement | null>(null);
        const wrappedComponentRef = useRef<HTMLElement | null>(null);
        const [_show, setShow] = useState(_popoverProps?.show ?? false)

        const mouseOut = useCallback(() => {
            if (_show === true) setShow(false)
        }, [_show]);
        const mouseOver = useCallback(() => {
            if (_show === false) setShow(true)
        }, [_show]);

        useLayoutEffect(() => {
            if (wrappedComponentRef && wrappedComponentRef.current) {
                wrappedComponentRef.current.addEventListener("mouseenter", mouseOver)
            }
            return () => {
                if (wrappedComponentRef && wrappedComponentRef.current) {
                    wrappedComponentRef.current.removeEventListener("mouseenter", mouseOver)
                }
            }
        }, [])
        useLayoutEffect(() => {
            if (overlayRef) {
                overlayRef.addEventListener("mouseleave", mouseOut)
            }
            return () => {
                if (overlayRef) {
                    overlayRef.removeEventListener("mouseleave", mouseOut)
                }
            }
        }, [overlayRef])
        const overlayRefCallback = useCallback((node) => {
            if (node && node !== overlayRef) {
                if (overlayRef) {
                    overlayRef.removeEventListener("mouseleave", mouseOut)
                }
                setOverlayRef(node)
            }
        }, [])
        const refs = useCallback((r) => {
            wrappedComponentRef.current = r;
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
                    show={_show}
                    {..._popoverProps}
                    attachTo={wrappedComponentRef}
                    ref={overlayRefCallback}
                    position="cover"
                >
                    {_cover}
                </Popover>
            </>
        )
    }

    return React.forwardRef<RefType, CoverProps<P>>((props, ref) => {
        return <WithCover {...props} forwardedRef={ref} />;
    });
}