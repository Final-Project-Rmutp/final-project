import React, { MouseEvent } from 'react';
import styled, { css } from 'styled-components';

const hPadding = '15px';
const hWidth = '25px';
const hHeight = '25px';
const hBackgroundColor = 'transparent';
const hLineColor = '#7A82E4';
const hHoverLineColor = '#9A9EEC';
const hLineHeight = '2px';
const hBorderRadius = '4px';
const hTransitionTime = '0.4s';
const hTransitionFunction = 'ease';
const hTransitionOpacity = '0';
const hVerticalGap = '13px';
const hInitialOpposition = '5px';
const hHideDistance = parseInt(hWidth) + parseInt(hPadding);

const lineProps = css`
  width: 100%;
  height: ${hLineHeight};
  background-color: ${hLineColor};
  border-radius: ${hBorderRadius};
  position: absolute;
  transition: transform ${hTransitionTime} ${hTransitionFunction}, opacity ${hTransitionTime} ${hTransitionFunction};
`;

const HamburgerContainer = styled.div`
  width: ${hWidth};
  height: ${hHeight};
  position: relative;
`;

const HamburgerInner = styled.div`
  ${lineProps};
  top: 50%;
  transform: translate(${hInitialOpposition}, -50%);
  opacity: 1;

  &::before,
  &::after {
    ${lineProps};
    content: '';
    opacity: 1;
    transform: translate(-${hInitialOpposition}, 0);
  }

  &::before {
    top: -${hVerticalGap};
  }

  &::after {
    top: ${hVerticalGap};
  }
`;

const HamburgerHidden = styled.div`
  ${lineProps};
  background-color: ${hHoverLineColor};
  top: 50%;
  transform: translate(${hHideDistance}px, -50%);
  opacity: 0;

  &::before,
  &::after {
    ${lineProps};
    background-color: ${hHoverLineColor};
    content: '';
    transform: translate(${hHideDistance * 2}px, 0);
  }

  &::before {
    top: -${hVerticalGap};
  }

  &::after {
    top: ${hVerticalGap};
  }
`;

interface HamburgerStyledProps {
  isActive: boolean;
}

const HamburgerStyled = styled.div<HamburgerStyledProps>`
  padding: ${hPadding};
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  background-color: ${hBackgroundColor};

  &:hover ${HamburgerInner} {
    transform: translate(calc(-${hHideDistance}px), 50%);
    opacity: ${hTransitionOpacity};
  }

  &:hover ${HamburgerInner}::before,
  &:hover ${HamburgerInner}::after {
    transform: translate(${hHideDistance * 2}px, 0);
    opacity: ${hTransitionOpacity};
  }

  &.is-active ${HamburgerInner} {
    display: none;
  }

  &:hover ${HamburgerHidden} {
    opacity: 1;
    transform: translate(0, -50%);
  }

  &:hover ${HamburgerHidden}::before,
  &:hover ${HamburgerHidden}::after {
    opacity: 1;
    transform: translate(0, 0);
  }

  &.is-active ${HamburgerHidden} {
    opacity: 1;
    transform: rotate(45deg);
  }

  &.is-active ${HamburgerHidden}::before {
    transform: translate(0, ${hVerticalGap}) rotate(90deg);
    transform-origin: center;
  }

  &.is-active ${HamburgerHidden}::after {
    transform-origin: center;
    transform: translate(0, -${hVerticalGap}) rotate(0);
  }
`;

interface HamburgerProps {
  isActive: boolean;
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
}

const Hamburger: React.FC<HamburgerProps> = ({ isActive, onClick }) => {
  return (
    <HamburgerStyled isActive={isActive} onClick={onClick}>
      <HamburgerContainer>
        <HamburgerInner />
        <HamburgerHidden />
      </HamburgerContainer>
    </HamburgerStyled>
  );
};

export default Hamburger;
