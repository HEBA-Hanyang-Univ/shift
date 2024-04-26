import { useEffect } from "react";

function UseOutsideClick(ref, callback) {
  useEffect(() => {
    const handleClick = (e) => {
      if(ref.current && !ref.current.contains(e.target)) {
        callback?.();
      }
    };

    const handleOutsideClick = (e) => {
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }

      e.stopPropagation();

      const { PageX, PageY } = e;
      const { top, bottom, left, right} = ref.current.getBoundingClientRect();

      if (PageX < left || PageX > right || PageY < top || PageY > bottom) {
        callback?.();
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);

    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, [ref, callback]);
};

export default UseOutsideClick;
