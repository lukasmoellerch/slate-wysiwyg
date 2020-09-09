import { styled } from "../utils/stitches.config";

const Textarea = styled("textarea", {
  width: "100%",
  border: "1px solid rgba(0,0,0,0.15)",
  borderRadius: 2,
  resize: "none",
  boxSizing: "border-box",
  paddingLeft: "0.8rem",
  paddingRight: "0.8rem",
  paddingTop: "0.8rem",
  paddingBottom: "0.8rem",
});

export default Textarea;
