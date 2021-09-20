import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";

const BookingConfirmationContext = React.createContext();

export function BookingConfirmationProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <BookingConfirmationContext.Provider value={value}>
        {children}
      </BookingConfirmationContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function MyModal({ onClose, children }) {
  const modalNode = useContext(BookingConfirmationContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={onClose} />
      <div id="modal-content">{children}</div>
    </div>,
    modalNode
  );
}
