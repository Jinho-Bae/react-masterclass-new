import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
  position: relative;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)<{ isSelected: boolean }>`
  width: 300px;
  height: 200px;
  background-color: white;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
  ${({ isSelected }) =>
    !isSelected &&
    `
    &:nth-child(1):hover {
      transform: scale(1.05) translate(-5px, -5px);
    }
    &:nth-child(2):hover {
      transform: scale(1.05) translate(5px, -5px);
    }
    &:nth-child(3):hover {
      transform: scale(1.05) translate(-5px, 5px);
    }
    &:nth-child(4):hover {
      transform: scale(1.05) translate(5px, 5px);
    }
  `}
`;

const Circle = styled(motion.div)`
  background-color: #00a5ff;
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

const Button = styled.button`
  margin-top: 30px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #0077ff;
  color: white;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #0055cc;
  }
`;

function App() {
  const [switched, setSwitched] = useState(false);
  const [selectedBox, setSelectedBox] = useState<number | null>(null);

  const toggleSwitch = () => setSwitched((prev) => !prev);
  const selectBox = (index: number) => setSelectedBox(index);
  const closeOverlay = () => setSelectedBox(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeOverlay();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Wrapper>
      <Grid>
        {[0, 1, 2, 3].map((index) => (
          <Box
            key={index}
            onClick={() => selectBox(index)}
            layoutId={`box-${index}`}
            isSelected={selectedBox !== null}
          >
            {(index === 1 && !switched) || (index === 2 && switched) ? (
              <Circle layoutId="circle" />
            ) : null}
          </Box>
        ))}
      </Grid>
      <Button onClick={toggleSwitch}>Switch</Button>
      <AnimatePresence>
        {selectedBox !== null && (
          <Overlay
            onClick={closeOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Box
              layoutId={`box-${selectedBox}`}
              style={{ width: "400px", height: "300px" }}
              isSelected={false}
            />
          </Overlay>
        )}
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;
