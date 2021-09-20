import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";

const EditBookingContext = React.createContext();

export function EditBookingProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <EditBookingContext.Provider value={value}>
        {children}
      </EditBookingContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function MyThirdModal({ onClose, children }) {
  const modalNode = useContext(EditBookingContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={onClose} />
      <div id="modal-content">{children}</div>
    </div>,
    modalNode
  );
}
