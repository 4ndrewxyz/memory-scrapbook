import { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import memoriesData from '../data/memories.json';

interface Memory {
  date: string;
  image: string;
  description: string;
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  /* Force grid items to maintain square aspect ratio */
  > * {
    aspect-ratio: 1;
  }
`;

const MemoryCard = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  perspective: 1000px;
  cursor: pointer;
  display: flex;
  align-items: stretch;
`;

const CardInner = styled(motion.div)<{ isFlipped: boolean }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  transform: ${props => props.isFlipped ? 'rotateY(180deg)' : 'none'};
  display: flex;
`;

const CardFront = styled(motion.div)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
`;

const CardBack = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const MemoryImage = styled.img`
  display: block;
  min-width: 100%;
  min-height: 100%;
  width: 100%;
  height: 100%;
  object-fit: fill;
  flex: 1;
`;

const DateText = styled.div`
  font-family: 'Quicksand', sans-serif;
  color: #ff6b9c;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const Description = styled.div`
  font-family: 'Quicksand', sans-serif;
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const MemoryGrid = () => {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const generateMemories = () => {
    const memories: Memory[] = [];
    const years = [2021, 2022, 2023, 2024];
    
    years.forEach(year => {
      // For 2021, only include December
      const startMonth = year === 2021 ? 12 : 1;
      const endMonth = 12;
      
      for (let month = startMonth; month <= endMonth; month++) {
        const date = new Date(year, month - 1, 6);
        // Only add future dates if they're in 2024
        if (year === 2024 && date > new Date()) continue;
        
        const dateKey = `${year}-${month.toString().padStart(2, '0')}-06`;
        const imageKey = `${year}${month.toString().padStart(2, '0')}`;
        memories.push({
          date: format(date, "d 'de' MMMM 'de' yyyy", { locale: es }),
          image: `/memories/${imageKey}.jpg`,
          description: memoriesData.memories[dateKey as keyof typeof memoriesData.memories] || `Día especial del ${format(date, "d 'de' MMMM", { locale: es })}`
        });
      }
    });

    return memories;
  };

  const memories = generateMemories();

  return (
    <GridContainer>
      {memories.map((memory, index) => (
        <MemoryCard
          key={index}
          onClick={() => setFlippedCard(flippedCard === index ? null : index)}
        >
          <CardInner isFlipped={flippedCard === index}>
            <CardFront>
              <MemoryImage 
                src={memory.image} 
                alt={memory.date}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  // Try PNG if JPG fails
                  const pngSrc = memory.image.replace('.jpg', '.png');
                  target.src = pngSrc;
                  target.onerror = () => {
                    target.src = '/placeholder.jpg';
                  };
                }}
              />
            </CardFront>
            <CardBack>
              <DateText>{memory.date}</DateText>
              <Description>{memory.description}</Description>
            </CardBack>
          </CardInner>
        </MemoryCard>
      ))}
    </GridContainer>
  );
};

export default MemoryGrid; 