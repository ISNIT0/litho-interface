
export interface LFunction<T> {
    state: T,
    onSelect(): void;
    onSwipe(direction): Promise<void>;
    onTouchDrag(touchStart, touchNow): Promise<void>;
    onTap(): Promise<void>;

    render(): string;
}
