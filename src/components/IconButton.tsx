import { styled } from "../utils/stitches.config";

const IconButton = styled("button", {
  fontSize: "13px",
  lineHeight: "1",
  fontWeight: 500,
  border: "0",
  borderRadius: 3,
  paddingTop: "0.2rem",
  paddingBottom: "0.2rem",
  paddingLeft: "3px",
  paddingRight: "3px",
  cursor: "pointer",
  transition: "color 0.1s, background-color 0.2s",

  variants: {
    color: {
      inactiveBlue: {
        backgroundColor: "$transparent",
        color: "rgb(170,170,170)",
        ":hover": {
          backgroundColor: "$blue100",
          color: "rgb(50,50,50)",
        },
      },
      blue: {
        backgroundColor: "$blue600",
        color: "$white",
        ":hover": {
          backgroundColor: "$blue700",
        },
      },
      gray: {
        backgroundColor: "$gray200",
        color: "$black",
        ":hover": {
          backgroundColor: "$gray300",
        },
      },
    },
  },
});

export default IconButton;
