import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 40 40" {...props}>
      {/* <circle cx="20" cy="20" r="20" fill="#15181B"/> */}
      <path d="M17.0543 27.5L12.1353 22.5809" stroke={props.color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M17.0547 10.8334V27.5" stroke={props.color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M22.9453 10.8334L27.8644 15.7525" stroke={props.color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M22.9453 27.5V10.8334" stroke={props.color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>
  );
};

export default Icon;
