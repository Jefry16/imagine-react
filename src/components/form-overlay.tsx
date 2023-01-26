import { ReactNode } from "react";
import { createPortal } from "react-dom";

export default function FormOverlay(props: {
  title: string;
  open: boolean;
  onClose: Function;
  children: ReactNode;
}) {
  if (!props.open) return null;
  return createPortal(<div></div>, document.getElementById("form")!);
}
