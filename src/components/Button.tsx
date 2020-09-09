import { styled } from "../utils/stitches.config";

const Button = styled("button", {
  fontSize: "13px",
  lineHeight: "1",
  fontWeight: 500,
  border: "0",
  borderRadius: 3,
  paddingTop: "0.75rem",
  paddingBottom: "0.75rem",
  paddingLeft: "15px",
  paddingRight: "15px",
  cursor: "pointer",

  variants: {
    color: {
      blue: {
        backgroundColor: "$blue700",
        color: "$white",
        ":hover": {
          backgroundColor: "$blue800",
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

export default Button;
