import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // This scrolls the window to the top on every route change
    // Using 'behavior: "auto"' ensures it's an *instant* scroll
    // and overrides any 'scroll-behavior: smooth' in your CSS.
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    } catch (e) {
      // Fallback for older browsers
      window.scrollTo(0, 0);
    }
  }, [pathname]); // The effect runs every time the 'pathname' changes

  return null; // This component doesn't render any visible UI
};

export default ScrollToTop;