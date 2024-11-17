import { useEffect, useLayoutEffect, useMemo, useState } from "react";

interface Options {
  itemsCount: number;
  itemHeight: number;
  listHeight: number;
  offset?: number;
  scrollingDelay?: number;
  getScrollElement: () => HTMLBRElement | null;
}

export function useVirtualization({
  itemsCount,
  itemHeight,
  listHeight,
  offset = 0,
  scrollingDelay = 100,
  getScrollElement,
}: Options) {
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  useLayoutEffect(() => {
    const scrollElement = getScrollElement();

    if (!scrollElement) return;

    const handleScroll = () => {
      setScrollTop(scrollElement.scrollTop ?? 0);
    };

    handleScroll();

    scrollElement.addEventListener("scroll", handleScroll);

    return () => scrollElement.removeEventListener("scroll", handleScroll);
  }, [getScrollElement]);

  useEffect(() => {
    const scrollElement = getScrollElement();

    if (!scrollElement) return;

    let timeoutId: number | null = null;

    const handleScroll = () => {
      setIsScrolling(true);

      if (typeof timeoutId === "number") clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, scrollingDelay);
    };

    scrollElement.addEventListener("scroll", handleScroll);

    return () => {
      if (typeof timeoutId === "number") clearTimeout(timeoutId);
      scrollElement.removeEventListener("scroll", handleScroll);
    };
  }, [getScrollElement]);

  const { virtualItems, startIndex, endIndex } = useMemo(() => {
    const rangeStart = scrollTop;
    const rangeEnd = scrollTop + listHeight;

    let startIndex = Math.floor(rangeStart / itemHeight);
    let endIndex = Math.floor(rangeEnd / itemHeight);

    startIndex = Math.max(0, startIndex - offset);
    endIndex = Math.min(itemsCount, endIndex + offset);

    const virtualItems = [];

    for (let index = startIndex; index <= endIndex; index++) {
      virtualItems.push({
        index,
        offsetTop: index * itemHeight,
      });
    }

    return { virtualItems, startIndex, endIndex };
  }, [scrollTop, itemHeight, listHeight]);

  const totalHeight = itemHeight * itemsCount;

  return {
    endIndex,
    startIndex,
    totalHeight,
    isScrolling,
    virtualItems,
  };
}
