import { Global, css } from '@emotion/react';
import CountdownTimer from './components/CountdownTimer';
import MemoryGrid from './components/MemoryGrid';
import FloatingHearts from './components/FloatingHearts';

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Quicksand', sans-serif;
    background: linear-gradient(135deg, #ffe6e6 0%, #ffb3b3 100%);
    min-height: 100vh;
    color: #333;
  }

  h1 {
    text-align: center;
    color: #ff6b9c;
    font-size: 3.5rem;
    margin: 2rem 0;
    font-weight: 700;
    letter-spacing: 2px;
    text-shadow: 
      2px 2px 0 #fff,
      4px 4px 0 rgba(255, 107, 156, 0.2),
      6px 6px 0 rgba(255, 107, 156, 0.1);
    position: relative;
    display: inline-block;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(45deg, #ff6b9c, #ff8fab);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: titleFloat 3s ease-in-out infinite;
    z-index: 1;
  }

  @keyframes titleFloat {
    0%, 100% {
      transform: translateX(-50%) translateY(0);
    }
    50% {
      transform: translateX(-50%) translateY(-5px);
    }
  }

  .content {
    position: relative;
    z-index: 1;
  }
`;

function App() {
  return (
    <>
      <Global styles={globalStyles} />
      <FloatingHearts />
      <div className="content">
        <h1>Nuestra historia juntos ♥️</h1>
        <CountdownTimer />
        <MemoryGrid />
      </div>
    </>
  );
}

export default App; 