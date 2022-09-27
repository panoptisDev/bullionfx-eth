import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 16 16" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M8 0C8.26521 0 8.51957 0.105357 8.7071 0.292893C8.89464 0.48043 9 0.734783 9 1V2C9 2.26522 8.89464 2.51957 8.7071 2.70711C8.51957 2.89464 8.26521 3 8 3C7.73478 3 7.48043 2.89464 7.29289 2.70711C7.10536 2.51957 7 2.26522 7 2V1C7 0.734783 7.10536 0.48043 7.29289 0.292893C7.48043 0.105357 7.73478 0 8 0ZM12 8C12 9.06086 11.5786 10.0783 10.8284 10.8284C10.0783 11.5786 9.06086 12 8 12C6.93913 12 5.92172 11.5786 5.17157 10.8284C4.42143 10.0783 4 9.06086 4 8C4 6.93913 4.42143 5.92172 5.17157 5.17157C5.92172 4.42143 6.93913 4 8 4C9.06086 4 10.0783 4.42143 10.8284 5.17157C11.5786 5.92172 12 6.93913 12 8ZM11.536 12.95L12.243 13.657C12.4316 13.8392 12.6842 13.9399 12.9464 13.9377C13.2086 13.9354 13.4594 13.8302 13.6448 13.6448C13.8302 13.4594 13.9354 13.2086 13.9377 12.9464C13.9399 12.6842 13.8392 12.4316 13.657 12.243L12.95 11.536C12.7614 11.3538 12.5088 11.253 12.2466 11.2553C11.9844 11.2576 11.7336 11.3628 11.5482 11.5482C11.3628 11.7336 11.2576 11.9844 11.2553 12.2466C11.253 12.5088 11.3538 12.7614 11.536 12.95ZM13.656 2.343C13.8435 2.53053 13.9488 2.78484 13.9488 3.05C13.9488 3.31516 13.8435 3.56947 13.656 3.757L12.95 4.464C12.8578 4.55951 12.7474 4.63569 12.6254 4.6881C12.5034 4.74051 12.3722 4.7681 12.2394 4.76925C12.1066 4.7704 11.9749 4.7451 11.852 4.69482C11.7291 4.64454 11.6175 4.57029 11.5236 4.47639C11.4297 4.3825 11.3555 4.27085 11.3052 4.14795C11.2549 4.02506 11.2296 3.89338 11.2307 3.7606C11.2319 3.62782 11.2595 3.4966 11.3119 3.3746C11.3643 3.25259 11.4405 3.14225 11.536 3.05L12.243 2.343C12.4305 2.15553 12.6848 2.05021 12.95 2.05021C13.2152 2.05021 13.4695 2.15553 13.657 2.343H13.656ZM15 9C15.2652 9 15.5196 8.89464 15.7071 8.70711C15.8946 8.51957 16 8.26522 16 8C16 7.73478 15.8946 7.48043 15.7071 7.29289C15.5196 7.10536 15.2652 7 15 7H14C13.7348 7 13.4804 7.10536 13.2929 7.29289C13.1054 7.48043 13 7.73478 13 8C13 8.26522 13.1054 8.51957 13.2929 8.70711C13.4804 8.89464 13.7348 9 14 9H15ZM8 13C8.26521 13 8.51957 13.1054 8.7071 13.2929C8.89464 13.4804 9 13.7348 9 14V15C9 15.2652 8.89464 15.5196 8.7071 15.7071C8.51957 15.8946 8.26521 16 8 16C7.73478 16 7.48043 15.8946 7.29289 15.7071C7.10536 15.5196 7 15.2652 7 15V14C7 13.7348 7.10536 13.4804 7.29289 13.2929C7.48043 13.1054 7.73478 13 8 13ZM3.05 4.464C3.14284 4.55691 3.25308 4.63062 3.37441 4.68093C3.49574 4.73124 3.6258 4.75716 3.75715 4.7572C3.88849 4.75725 4.01857 4.73142 4.13993 4.6812C4.2613 4.63098 4.37159 4.55734 4.4645 4.4645C4.55741 4.37165 4.63112 4.26142 4.68143 4.14009C4.73174 4.01875 4.75766 3.8887 4.7577 3.75735C4.75775 3.626 4.73192 3.49593 4.6817 3.37457C4.63148 3.2532 4.55784 3.14291 4.465 3.05L3.757 2.343C3.5684 2.16084 3.3158 2.06005 3.0536 2.06233C2.7914 2.0646 2.54059 2.16977 2.35518 2.35518C2.16977 2.54059 2.0646 2.7914 2.06233 3.0536C2.06005 3.3158 2.16084 3.5684 2.343 3.757L3.05 4.464ZM4.464 12.95L3.757 13.657C3.5684 13.8392 3.3158 13.9399 3.0536 13.9377C2.7914 13.9354 2.54059 13.8302 2.35518 13.6448C2.16977 13.4594 2.0646 13.2086 2.06233 12.9464C2.06005 12.6842 2.16084 12.4316 2.343 12.243L3.05 11.536C3.2386 11.3538 3.4912 11.253 3.7534 11.2553C4.0156 11.2576 4.26641 11.3628 4.45182 11.5482C4.63723 11.7336 4.74239 11.9844 4.74467 12.2466C4.74695 12.5088 4.64616 12.7614 4.464 12.95ZM2 9C2.26522 9 2.51957 8.89464 2.70711 8.70711C2.89464 8.51957 3 8.26522 3 8C3 7.73478 2.89464 7.48043 2.70711 7.29289C2.51957 7.10536 2.26522 7 2 7H1C0.734783 7 0.480429 7.10536 0.292893 7.29289C0.105357 7.48043 0 7.73478 0 8C0 8.26522 0.105357 8.51957 0.292893 8.70711C0.480429 8.89464 0.734783 9 1 9H2Z" />
    </Svg>
  );
};

export default Icon;
