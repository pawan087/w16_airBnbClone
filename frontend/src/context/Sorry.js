import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";

const SorryContext = React.createContext();

export function SorryProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <SorryContext.Provider value={value}>
        {children}
      </SorryContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function MyFourthModal({ onClose, children }) {
  const modalNode = useContext(SorryContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" />
      <div onClick={onClose} id="modal-content">{children}</div>
    </div>,
    modalNode
  );
}
