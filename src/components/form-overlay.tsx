import { ReactNode } from "react";
import { createPortal } from "react-dom";

export default function FormOverlay(props: {
  title: string;
  open: boolean;
  onClose: Function;
  children: ReactNode;
}) {
  if (!props.open) return null;
  return createPortal(
    <div
      style={{
        position: "absolute",
        width: "100%",
        backgroundColor: "rgba(141, 145, 160, 0.46)",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: "auto",
        height: "100vh",
        padding: "60px 40px",
        color: "#fff",
      }}
    >
      <div
        style={{
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          margin: "auto",
          width: "420px",
          backgroundColor: "#161819",
          position: "absolute",
          padding: "60px 40px",
          height: "max-content",
        }}
      >
        <h2 style={{ fontWeight: "bold", fontSize: "24px" }}>{props.title}</h2>
        {props.children}
      </div>
    </div>,
    document.getElementById("form")!
  );
}
