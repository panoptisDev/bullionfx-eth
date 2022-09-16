import React from "react";
import styled from "styled-components";
import EXTERNAL_LINK_PROPS from "../../util/externalLinkProps";
import Text from "../Text/Text";
import { LinkProps } from "./types";
import { darkColors } from "../../theme/colors";

const StyledLink = styled(Text) <LinkProps>`
  display: flex;
  align-items: center;
  width: fit-content;
  font-size: 14px;
  color: ${darkColors.textSubtle};
  &:hover {
    text-decoration: underline;
    text-decoration-color: ${darkColors.textSubtle};
  }
`;

const Link: React.FC<React.PropsWithChildren<LinkProps>> = ({ external, ...props }) => {
  const internalProps = external ? EXTERNAL_LINK_PROPS : {};
  return <StyledLink as="a" bold {...internalProps} {...props} />;
};

/* eslint-disable react/default-props-match-prop-types */
Link.defaultProps = {
  color: "#837144",
};

export default Link;
