import { styled } from "../utils/stitches.config";
import IconButton from "./IconButton";

const Toolbar = styled("div", {
  display: "flex",
  flexDirection: "row",
  paddingTop: "0.3rem",
  paddingBottom: "0.3rem",
  alignItems: "baseline",
  flexWrap: "wrap",
});

export const ToolbarButton = IconButton;

export const ToolbarDivider = styled("div", {
  height: "1em",
  borderLeft: "1.5px solid rgba(0,0,0, 0.2)",
  marginLeft: "0.8rem",
  marginRight: "0.8rem",
});

export default Toolbar;
