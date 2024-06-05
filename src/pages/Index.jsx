import React, { useState } from "react";
import { Container, VStack, Text, Button, Radio, RadioGroup, Stack, Box, Heading, IconButton } from "@chakra-ui/react";
import { FaCheck, FaTimes } from "react-icons/fa";

const quizQuestions = [
  {
    question: "What is the capital of Italy?",
    options: ["Berlin", "Madrid", "Rome", "Lisbon"],
    answer: "Rome",
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"],
    answer: "Harper Lee",
  },
];

const Index = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const handleNextQuestion = () => {
    if (selectedOption === quizQuestions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    setSelectedOption("");

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowScore(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption("");
    setScore(0);
    setShowScore(false);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={8}>
        <Heading as="h1" size="xl">
          Quiz Time!
        </Heading>
        {showScore ? (
          <Box textAlign="center">
            <Text fontSize="2xl">
              Your Score: {score} / {quizQuestions.length}
            </Text>
            <IconButton aria-label="Restart Quiz" icon={<FaCheck />} size="lg" mt={4} onClick={handleRestartQuiz} />
          </Box>
        ) : (
          <Box>
            <Text fontSize="xl">{quizQuestions[currentQuestionIndex].question}</Text>
            <RadioGroup onChange={handleOptionChange} value={selectedOption} mt={4}>
              <Stack direction="column">
                {quizQuestions[currentQuestionIndex].options.map((option, index) => (
                  <Radio key={index} value={option}>
                    {option}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
            <Button mt={4} onClick={handleNextQuestion} isDisabled={!selectedOption}>
              Next
            </Button>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
