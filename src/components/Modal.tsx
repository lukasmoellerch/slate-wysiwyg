import React from "react";
import { styled } from "../utils/stitches.config";

const ModalContainer = styled("div", {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflow: "auto",
  padding: "1em",
  boxSizing: "border-box",
});

const ModalContent = styled("div", {
  width: "90%",
  maxWidth: "700px",
  padding: "1rem",
  backgroundColor: "white",
  borderRadius: 2,
  zIndex: 1000,
});

interface Props {
  isOpen: boolean;
}

const Modal: React.FC<Props> = ({ isOpen, children }) => {
  return isOpen ? (
    <ModalContainer>
      <ModalContent>{children}</ModalContent>
    </ModalContainer>
  ) : null;
};

export default Modal;
