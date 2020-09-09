import { styled } from "../utils/stitches.config";

const Flex = styled("div", {
  display: "flex",
  variants: {
    direction: {
      column: {
        flexDirection: "column",
      },
      row: {
        flexDirection: "row",
      },
    },
    alignItems: {
      center: {
        alignItems: "center",
      },
      start: {
        alignItems: "flex-start",
      },
      end: {
        alignItems: "flex-end",
      },
      baseline: {
        alignItems: "baseline",
      },
    },
    justifyContent: {
      center: {
        justifyContent: "center",
      },
      start: {
        justifyContent: "flex-start",
      },
      end: {
        justifyContent: "flex-end",
      },
    },
  },
});

export default Flex;
