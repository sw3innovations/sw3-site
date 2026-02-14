import { LOGO_SRC, SOLW3_LOGO } from "../theme";

export function Logo({ size = 32, style = {} }) {
  return <img src={LOGO_SRC} alt="SOLW3" style={{ width: size, height: size, borderRadius: size * 0.15, objectFit: "contain", ...style }} />;
}

export function SolweLogo({ size = 32, style = {} }) {
  return <img src={SOLW3_LOGO} alt="SOLW3 IA" style={{ width: size, height: size, borderRadius: size * 0.2, objectFit: "cover", ...style }} />;
}
