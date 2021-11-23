import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";

const CancelBookingConfirmationContext = React.createContext();

export function CancelBookingConfirmationProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <CancelBookingConfirmationContext.Provider value={value}>
        {children}
      </CancelBookingConfirmationContext.Provider>
      
      <div ref={modalRef} />
    </>
  );
}

export function MySecondModal({ onClose, children }) {
  const modalNode = useContext(CancelBookingConfirmationContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={onClose} />

      <div id="modal-content">{children}</div>
    </div>,
    modalNode
  );
}
