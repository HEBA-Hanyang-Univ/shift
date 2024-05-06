import { useEffect } from "react";

function UseOutsideClick(ref, callback) {
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }

      e.stopPropagation();

      const { pageX, pageY } = e;
      const { top, bottom, left, right } = ref.current.getBoundingClientRect();

      if (pageX < left || pageX > right || pageY < top || pageY > bottom) {
        callback?.();
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);

    return () => 
      window.removeEventListener("mousedown", handleOutsideClick);
    }, [ref, callback]);
}

export default UseOutsideClick;