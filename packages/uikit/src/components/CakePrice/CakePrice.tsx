import React from "react";
import styled from "styled-components";
import LogoRound from "../Svg/Icons/LogoRound";
import Text from "../Text/Text";
import Skeleton from "../Skeleton/Skeleton";
import { Colors } from "../../theme";
import { formatAmount, formatAmountNotation } from "../../util/formatInfoNumbers";

export interface Props {
  color?: keyof Colors;
  cakePriceUsd?: number;
  showSkeleton?: boolean;
  chainId: number;
}

const formatOptions = {
  notation: 'standard' as formatAmountNotation,
  displayThreshold: 0.001,
  tokenPrecision: true,
}

const PriceLink = styled.a`
  display: flex;
  align-items: center;
  svg {
    transition: transform 0.3s;
  }
  :hover {
    svg {
      transform: scale(1.2);
    }
  }
`;

const CakePrice: React.FC<React.PropsWithChildren<Props>> = ({
  cakePriceUsd,
  chainId,
  color = "textHighlight",
  showSkeleton = true,
}) => {
  const _chainId = chainId ?? 1
  const outputCurrency = _chainId === 5 ? '0x927389C5890Dc1C9b1b61AEB3cbe64D1Bfb7bD5f' : ''
  return cakePriceUsd ? (
    <PriceLink
      href={`/trade?outputCurrency=${outputCurrency}&chainId=${_chainId}`}
      target="_blank"
    >
      <LogoRound width="24px" mr="8px" />
      <Text color={color} bold small>{formatAmount(cakePriceUsd, formatOptions)}</Text>
    </PriceLink>
  ) : showSkeleton ? (
    <Skeleton width={80} height={24} />
  ) : null;
};

export default React.memo(CakePrice);
