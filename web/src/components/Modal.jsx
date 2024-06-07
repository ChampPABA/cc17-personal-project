import { useEffect } from "react";

export default function Modal({ width = 30, title, children, open, onClose }) {
  useEffect(() => {
    const handlePressEsc = (event) => {
      if (event.keyCode === 27) {
        onClose?.();
      }
    };
    document.addEventListener("keydown", handlePressEsc);
    return () => document.removeEventListener("keydown", handlePressEsc);
  }, [onClose]);
  return (
    <>
      {open ? (
        <>
          <div className="fixed inset-0 bg-gray-500 opacity-40 z-10"></div>
          <div className="fixed inset-0 z-20" onMouseDown={onClose}>
            <div className="flex justify-center items-center min-h-screen">
              <div
                className="bg-white rounded-lg shadow-lg"
                style={{ width: `${width}rem` }}
                onMouseDown={(event) => event.stopPropagation()}
              >
                <div className="flex justify-between items-center p-4 border-b">
                  <button className="invisible">&#10005;</button>
                  <h5 className="text-2xl font-medium">{title}</h5>
                  <button onClick={onClose}>&#10005;</button>
                </div>
                <div className="p-4">{children}</div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
