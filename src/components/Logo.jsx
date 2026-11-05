import { LOGO_SRC } from "../theme";

export function Logo({ size = 30, style = {} }) {
  return (
    <img
      src={LOGO_SRC}
      alt="SW3"
      style={{ width: size, height: size, objectFit: "contain", ...style }}
    />
  );
}
