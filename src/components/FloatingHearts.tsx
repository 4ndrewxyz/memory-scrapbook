import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const HeartContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
`;

const Heart = styled(motion.div)`
  position: absolute;
  width: 30px;
  height: 30px;
  background: rgba(255, 107, 156, 0.15);
  transform: rotate(45deg);
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    background: rgba(255, 107, 156, 0.15);
    border-radius: 50%;
  }
  
  &::before {
    left: -15px;
  }
  
  &::after {
    top: -15px;
  }
`;

const FloatingHearts = () => {
  const hearts = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 15 + Math.random() * 10,
    delay: Math.random() * 5,
  }));

  return (
    <HeartContainer>
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          initial={{ 
            x: `${heart.x}vw`,
            y: '100vh',
            opacity: 0,
            scale: 0.5
          }}
          animate={{ 
            x: `${heart.x}vw`,
            y: '-100px',
            opacity: [0, 0.5, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </HeartContainer>
  );
};

export default FloatingHearts; 