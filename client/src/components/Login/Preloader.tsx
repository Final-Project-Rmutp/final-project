import styled, { keyframes } from 'styled-components';

// Keyframes
const spinnerC601d3 = keyframes`
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1.25);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const spinnerCircle = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-100px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const moveText = keyframes`
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(20px);
  }
  100% {
    transform: translateX(0);
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
`;

const shimmer = keyframes`
  0% {
    box-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff;
  }
  50% {
    box-shadow: 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #fff;
  }
  100% {
    box-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff;
  }
`;

// Styled Components
const SpinnerContainer = styled.div`
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap:10px
`;

const SpinnerCircle = styled.div`
  width: 56px;
  height: 56px;
  background: linear-gradient(to right, #dd5ae399, #8743e6c7);
  border-radius: 50%;
  margin-right: 10px;
  animation: ${spinnerCircle} 1s ease-out forwards, ${bounce} 1.2s infinite, ${shimmer} 1s infinite;
`;

const SpinnerText = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 50%;
  border:none;
  padding: 10px;

`;

const SpinnerTextSpan = styled.span`
  width: 100%;
  min-width: 50px;
  height: 50px;
  animation: ${spinnerC601d3} 1.2s 0.5s ease-out forwards, ${moveText} 2s infinite, ${bounce} 1s infinite, ${shimmer} 1s infinite;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 30px;
  color: white;
  margin-right:10px;
`;
const Preloader = () => (
  <SpinnerContainer>
    <SpinnerCircle />
    <SpinnerText>
      <SpinnerTextSpan>R</SpinnerTextSpan>
      <SpinnerTextSpan>M</SpinnerTextSpan>
      <SpinnerTextSpan>U</SpinnerTextSpan>
      <SpinnerTextSpan>T</SpinnerTextSpan>
      <SpinnerTextSpan>P</SpinnerTextSpan>
    </SpinnerText>
  </SpinnerContainer>
);

export default Preloader;
