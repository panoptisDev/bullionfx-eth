import React from "react";
import styled from "styled-components";
import LogoRoundGold from "../Svg/Icons/LogoRoundGold";
import Text from "../Text/Text";
import Skeleton from "../Skeleton/Skeleton";
import { Colors } from "../../theme";
import { formatAmount, formatAmountNotation } from "../../util/formatInfoNumbers";

export interface Props {
  chainId: number;
  color?: keyof Colors;
  goldPriceUsd?: number;
  showSkeleton?: boolean;
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

const GoldPrice: React.FC<React.PropsWithChildren<Props>> = ({
  goldPriceUsd,
  chainId,
  color = "textHighlight",
  showSkeleton = true,
}) => {
  const _chainId = chainId ?? 1
  const outputCurrency = _chainId === 5 ? '0xa782EFE83e99271de6264764c9Cd05F58D68A4cD' : ''
  return goldPriceUsd ? (
    <PriceLink
      href={`/trade?outputCurrency=${outputCurrency}&chainId=${_chainId}`}
      target="_blank"
    >
      <LogoRoundGold width="24px" mr="8px" />
      <Text color={color} bold small>{formatAmount(goldPriceUsd, formatOptions)}</Text>
    </PriceLink>
  ) : showSkeleton ? (
    <Skeleton width={80} height={24} />
  ) : null;
};

export default React.memo(GoldPrice);
