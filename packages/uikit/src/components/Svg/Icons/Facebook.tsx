import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 32 32" {...props}>
      <circle cx="16" cy="16" r="16" fill="#282827" />
      <path d="M23.1996 11.0549C23.1996 9.85698 22.1426 8.79999 20.9447 8.79999H11.8545C10.6566 8.79999 9.59961 9.85698 9.59961 11.0549V20.1451C9.59961 21.343 10.6566 22.4 11.8545 22.4H16.4348V17.2559H14.7437V15.001H16.4348V14.085C16.4348 12.5347 17.5623 11.1958 18.9716 11.1958H20.8038V13.4508H18.9716C18.7602 13.4508 18.5488 13.6622 18.5488 14.085V15.001H20.8038V17.2559H18.5488V22.4H20.9447C22.1426 22.4 23.1996 21.343 23.1996 20.1451V11.0549Z" fill="#9E9C9C" />
    </Svg>
  );
};

export default Icon;
