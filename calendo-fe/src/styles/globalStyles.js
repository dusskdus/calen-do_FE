import { createGlobalStyle } from "styled-components";


export const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Pretendard';
        font-weight: 300;
        src: url('/fonts/Pretendard-Light.woff') format('woff');
    }
    @font-face {
        font-family: 'Pretendard';
        font-weight: 400;
        src: url('/fonts/Pretendard-Regular.woff') format('woff');
    }
    @font-face {
        font-family: 'Pretendard';
        font-weight: 500;
        src: url('/fonts/Pretendard-Medium.woff') format('woff');
    }
    @font-face {
        font-family: 'Pretendard';
        font-weight: 600;
        src: url('/fonts/Pretendard-Bold.woff') format('woff');
    }
    @font-face {
        font-family: 'Pretendard';
        font-weight: 800;
        src: url('/fonts/Pretendard-ExtraBold.woff') format('woff');
    }
    @font-face {
        font-family: 'Pretendard';
        font-weight: 900;
        src: url('/fonts/Pretendard-Black.woff') format('woff');
    }

    * {
        font-family: 'Pretendard', sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`;
