import { useEffect, useRef, useState } from "react";

const Marquee = ({
  direction = "left",
  speed = 20,
  delay = "",
  startPlay = true,
  pauseOnHover = false,
  gradientColor,
  gradientWidth = 100,
  children,
  ...props
}) => {
  const contentRef = useRef(null);
  const [contentWidth, setContentWidth] = useState(0);

  // 计算内容宽度（子组件加载完成后）
  useEffect(() => {
    if (startPlay && contentRef.current) {
      setContentWidth(contentRef.current.getBoundingClientRect().width);
    }
  }, [startPlay]);

  // 动画方向处理
  const animationDirection = direction === "right" ? "reverse" : "normal";

  return (
    <div
      className="marquee-container"
      style={{ ...props.style, overflow: "hidden", position: "relative", height: "100%" }}
    >
      {/* 左侧渐变遮罩 */}
      {gradientColor && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: `${gradientWidth}px`,
            height: "100%",
            background: `linear-gradient(90deg, #F8FBFD 0%, rgba(255,255,255,0) 100%)！important`,
            pointerEvents: "none", 
          }}
        />
      )}

      {/* 右侧渐变遮罩 */}
      {gradientColor && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: `${gradientWidth}px`,
            height: "100%",
            background: `linear-gradient(270deg, #F8FBFD 0%, rgba(255,255,255,0) 100%)！important`,
            pointerEvents: "none",
          }}
        />
      )}

      <div
        ref={contentRef}
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          animation: `marquee ${contentWidth / speed}s linear infinite ${animationDirection}`,
          animationDelay: delay,
          ...(pauseOnHover ? { animationPlayState: "running" } : {}),
          willChange: "transform",
        }}
        onMouseEnter={() => pauseOnHover && setContentWidth((prev) => prev)} // 暂停动画
        onMouseLeave={() => pauseOnHover && setContentWidth((prev) => prev)} // 恢复动画
      >
        {children}
        {children} 
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-container * { animation: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Marquee;