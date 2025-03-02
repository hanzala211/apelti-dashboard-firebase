import { ComponentType, ReactElement, useRef, useState } from "react";
import { COLORS, iconsPath } from "@constants";
import { useMessage } from "@context";
import { useLocation } from "react-router-dom";

interface ResizableSliderProps {
  Left: ComponentType;
  Right: ReactElement;
  initialLeftWidth?: number;
  minLeftWidth?: number;
  minRightWidth?: number;
}

export const ResizableSlider: React.FC<ResizableSliderProps> = ({ Left, Right, initialLeftWidth = window.innerWidth > 1024 ? 900 : 500, minLeftWidth = 600, minRightWidth = 200, }) => {
  const { selectedMessage } = useMessage()
  const [leftWidth, setLeftWidth] = useState<number>(initialLeftWidth);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const initialWidthRef = useRef(0);
  const location = useLocation()

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    startXRef.current = e.clientX;
    initialWidthRef.current = leftWidth;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const maxWidth = containerRect.width - minRightWidth;
    let newWidth = initialWidthRef.current + (e.clientX - startXRef.current);
    newWidth = Math.max(minLeftWidth, Math.min(newWidth, maxWidth));
    setLeftWidth(newWidth);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div ref={containerRef} className="flex w-full h-full">
      <div style={{
        flexBasis: location.pathname.includes("messages") ? window.innerWidth < 768 ? selectedMessage === null ? leftWidth : 0 : leftWidth : window.innerWidth > 768 ? leftWidth : 0
      }} className={`flex-shrink-[0.5]`}>
        <Left />
      </div>
      <div
        className="relative md:block hidden w-2 bg-basicGreen cursor-col-resize"
        onMouseDown={handleMouseDown}
      >
        <div className="absolute shadow-xl shadow-silverGray py-2 top-1/2 z-10 -translate-y-1/2 bg-basicWhite border-[2px] border-basicGreen left-1/2 -translate-x-1/2 flex">
          <iconsPath.leftArrowSlider color={COLORS.basicGreen} />
          <iconsPath.rightArrowSlider color={COLORS.basicGreen} />
        </div>
      </div>
      {Right}
    </div>
  );
};

export default ResizableSlider;
