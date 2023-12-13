import styled from 'styled-components';

export const GlobalStyles = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    min-height: 100vh;
    max-width: 100vw;
    margin: 0;
    overflow: hidden;
    font-family: 'Roboto', sans-serif;
  }

  @media (max-width: 1500px) {
    .header {
      width: 100%;
    }

    #main {
      width: 100%;
      margin-left: 0;
      margin-right: 10%;
    }

    #left.open .sidebar,
    #right.open .sidebar {
      transform: translateX(0);
    }

    .icon {
      color: aliceblue;
      margin-bottom: 0;
    }
  }

  img {
    display: block;
    margin: 0 auto;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .content {
    width: 100%;
    padding: 1rem;
  }
`;

export const Header = styled.div`
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  border: 3px solid rgb(185, 179, 179);
  border-radius: 15px;
  backdrop-filter: blur(8px);
  border-style: solid;
  border-color: rgba(194, 224, 255, 0.08);
  border-width: 0px 0px thin;
  background-color: rgba(16, 20, 24, 0.8);
  color: rgb(157, 168, 183);
  transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: none;
`;

export const LogoHeader = styled.img`
  margin-top: 20px;
  margin-left: 10px;
  border-radius: 50%;
`;

export const LogoutButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  margin: 10px 20px;
  border-radius: 10px;
`;

export const Icon = styled.div`
  margin-top: 20px;
  margin-left:  'var(--icon-left-closed)' : 'var(--icon-left)')};
  margin-bottom: 100px;
  color: white;
  cursor: pointer;
  user-select: none;

  p {
    margin: 0;
    font-size: 40px;
  }
`;

export const Sheet = styled.div`
  background: var(--bg-main);
  display: flex;
  overflow: hidden;

  .header-left {
    position: relative;
    height: var(--header-height);
    text-align: center;

    .title {
      position: absolute;
      left: 0;
      right: 0;
    }
  }

  .content {
    padding: 1rem;
    overflow: auto;
    box-sizing: border-box;
    height: calc(100vh - var(--header-height));
  }
`;

export const Main = styled.div`
  width: 100%;
  background: var(--bg-main);
  flex-grow: 1;

  .header {
    background: linear-gradient(to right, var(--bg-left), var(--bg-right));

    @media (orientation: landscape) {
      .title {
        transition: left var(--secs), right var(--secs);

        &.left-closed {
          left: var(--header-height);
        }
      }
    }
  }
`;

export const LeftRight = styled.div`
  transition: width var(--secs);
  width: 0;
  margin-right: 10px;

  @media (orientation: landscape) {
    &.open {
      width: calc(1% * var(--landscape-width));
    }
  }

  .icon {
    position: fixed;
    z-index: 10;
    width: var(--header-height);
    height: var(--header-height);
    line-height: var(--header-height);
    font-size: var(--header-height);
    text-align: center;
    user-select: none;
    cursor: pointer;
    top: -6px;
    left:'var(--icon-left-open)' : 'var(--icon-left)')};
    transition: left var(--secs);
  }

  .sidebar {
    transition: transform var(--secs);

    @media (orientation: portrait) {
      width: var(--portrait-width);
    }

    @media (orientation: landscape) {
      width: calc(1vw * var(--landscape-width));
    }

    .header-left {
      width: calc(50% - var(--header-height));
    }
  }
`;

export const Left = styled.div`
  padding: 10px;
  z-index: 5;
  width: var(--left-width);

  .icon {
    position: fixed;
    z-index: 10;
    width: var(--header-height);
    height: var(--header-height);
    line-height: var(--header-height);
    font-size: var(--header-height);
    text-align: center;
    user-select: none;
    cursor: pointer;
    top: -6px;
    left: var(--icon-left);
    transition: 0.4s;
  }

  .sidebar {
    border-radius: 20px;
    background-color: #212b36;

    &.closed {
      transform: translateX(-97%);

      .icon {
        left: 20px;
      }
    }

    .header-left {
      left: var(--header-height);
    }
  }
`;

export const ProfileRight = styled.div`
  margin-right: 10px;
  margin-left: 100px;
`;
export const StyledImage = styled.img`
  display: block;
  margin: 0 auto;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

// Usage