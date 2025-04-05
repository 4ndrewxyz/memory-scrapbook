import { useEffect, useState } from 'react';    
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';

const TimerContainer = styled(motion.div)`
  text-align: center;       
  padding: 2rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin: 2rem auto;
  max-width: 800px;
`;

const TimerTitle = styled.h2`
  font-family: 'Quicksand', sans-serif;
  color: #ff6b9c;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  font-weight: 500;
`;

const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 1rem;
`;

const TimeBlock = styled(motion.div)`
  background: #fff;
  padding: 1rem;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
`;

const Number = styled(motion.div)`
  font-size: 2.5rem;
  font-weight: bold;
  color: #ff6b9c;
  font-family: 'Quicksand', sans-serif;
`;

const Label = styled(motion.div)`
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.5rem;
`;

const Sparkle = styled(motion.div)`
  position: absolute;
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, #ff6b9c 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
`;

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    const targetDate = new Date('2025-12-06T00:00:00');

    const updateTimer = () => {
      const now = new Date();
      const newTimeLeft = {
        days: differenceInDays(targetDate, now),
        hours: differenceInHours(targetDate, now) % 24,
        minutes: differenceInMinutes(targetDate, now) % 60,
        seconds: differenceInSeconds(targetDate, now) % 60
      };

      // Check if any number changed
      Object.entries(newTimeLeft).forEach(([key, value]) => {
        if (value !== timeLeft[key as keyof typeof timeLeft]) {
          // Add sparkle effect
          setSparkles(prev => [
            ...prev,
            {
              id: Date.now(),
              x: Math.random() * 100,
              y: Math.random() * 100
            }
          ]);
        }
      });

      setTimeLeft(newTimeLeft);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  // Clean up sparkles after animation
  useEffect(() => {
    const cleanup = setInterval(() => {
      setSparkles(prev => prev.filter(sparkle => Date.now() - sparkle.id < 1000));
    }, 1000);
    return () => clearInterval(cleanup);
  }, []);

  return (
    <TimerContainer
      animate={{
        y: [0, -5, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <TimerTitle>
        Proximo Aniversario
      </TimerTitle>
      <TimeGrid>
        {Object.entries(timeLeft).map(([key, value]) => (
          <TimeBlock
            key={key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              <Number
                key={value}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {value}
              </Number>
            </AnimatePresence>
            <Label
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Label>
            {sparkles.map(sparkle => (
              <Sparkle
                key={sparkle.id}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ 
                  scale: [0, 1, 0],
                  opacity: [1, 1, 0],
                  x: [sparkle.x, sparkle.x + 20, sparkle.x + 40],
                  y: [sparkle.y, sparkle.y - 20, sparkle.y - 40]
                }}
                transition={{ duration: 1 }}
              />
            ))}
          </TimeBlock>
        ))}
      </TimeGrid>
    </TimerContainer>
  );
};

export default CountdownTimer; 