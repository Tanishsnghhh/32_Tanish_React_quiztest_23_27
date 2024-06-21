import React, { useState, useEffect } from 'react';
import './App.css';

const questions = [
  {
    questionText: 'Which Indian company is known for its digital payments platform?',
    answerOptions: [
      { answerText: 'Paytm', isCorrect: true },
      { answerText: 'Flipkart', isCorrect: false },
      { answerText: 'Ola', isCorrect: false },
      { answerText: 'Zomato', isCorrect: false },
    ],
  },
  {
    questionText: 'Which Indian startup is known for its food delivery service?',
    answerOptions: [
      { answerText: 'Swiggy', isCorrect: true },
      { answerText: 'UrbanClap', isCorrect: false },
      { answerText: 'BigBasket', isCorrect: false },
      { answerText: 'Oyo', isCorrect: false },
    ],
  },
  {
    questionText: 'Which company was co-founded by Bhavish Aggarwal?',
    answerOptions: [
      { answerText: 'Ola', isCorrect: true },
      { answerText: 'Zomato', isCorrect: false },
      { answerText: 'Flipkart', isCorrect: false },
      { answerText: 'Byju\'s', isCorrect: false },
    ],
  },
  {
    questionText: 'Which company is known for its online fashion and lifestyle retail?',
    answerOptions: [
      { answerText: 'Myntra', isCorrect: true },
      { answerText: 'Nykaa', isCorrect: false },
      { answerText: 'Swiggy', isCorrect: false },
      { answerText: 'Ola', isCorrect: false },
    ],
  },
  {
    questionText: 'Which company is famous for its co-working spaces in India?',
    answerOptions: [
      { answerText: 'WeWork', isCorrect: false },
      { answerText: 'Oyo Workspaces', isCorrect: true },
      { answerText: 'Furlenco', isCorrect: false },
      { answerText: 'CureFit', isCorrect: false },
    ],
  },
  {
    questionText: 'Which Indian company is a leading online pharmacy and healthcare platform?',
    answerOptions: [
      { answerText: 'Netmeds', isCorrect: false },
      { answerText: '1mg', isCorrect: true },
      { answerText: 'CureFit', isCorrect: false },
      { answerText: 'HealthKart', isCorrect: false },
    ],
  },
  {
    questionText: 'Which Indian startup is known for its online furniture rental service?',
    answerOptions: [
      { answerText: 'Rentomojo', isCorrect: false },
      { answerText: 'Furlenco', isCorrect: true },
      { answerText: 'Pepperfry', isCorrect: false },
      { answerText: 'Urban Ladder', isCorrect: false },
    ],
  },
  {
    questionText: 'Which company is known for its online education platform in India?',
    answerOptions: [
      { answerText: 'Unacademy', isCorrect: true },
      { answerText: 'Vedantu', isCorrect: false },
      { answerText: 'Toppr', isCorrect: false },
      { answerText: 'Simplilearn', isCorrect: false },
    ],
  },
  {
    questionText: 'Which Indian company is known for its grocery delivery service?',
    answerOptions: [
      { answerText: 'BigBasket', isCorrect: true },
      { answerText: 'Grofers', isCorrect: false },
      { answerText: 'Amazon Pantry', isCorrect: false },
      { answerText: 'Flipkart Supermart', isCorrect: false },
    ],
  },
  {
    questionText: 'Which Indian startup is known for its online beauty and wellness products?',
    answerOptions: [
      { answerText: 'Nykaa', isCorrect: true },
      { answerText: 'Myntra', isCorrect: false },
      { answerText: 'Purplle', isCorrect: false },
      { answerText: 'Fabindia', isCorrect: false },
    ],
  },
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (selectedAnswer === null) {
        switch (event.key) {
          case '1':
            handleAnswerOptionClick(questions[currentQuestion].answerOptions[0].isCorrect, 0);
            break;
          case '2':
            handleAnswerOptionClick(questions[currentQuestion].answerOptions[1].isCorrect, 1);
            break;
          case '3':
            handleAnswerOptionClick(questions[currentQuestion].answerOptions[2].isCorrect, 2);
            break;
          case '4':
            handleAnswerOptionClick(questions[currentQuestion].answerOptions[3].isCorrect, 3);
            break;
          default:
            break;
        }
      } else if (event.key === 'Enter') {
        handleNextQuestion();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedAnswer, currentQuestion]);

  const handleAnswerOptionClick = (isCorrect, index) => {
    setSelectedAnswer(index);
    setIsCorrect(isCorrect);

    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className='app'>
      {showScore ? (
        <div className='score-section'>
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <div className="container-box">
          <div className='question-section'>
            <div className='question-count'>
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className='question-text'>{questions[currentQuestion].questionText}</div>
          </div>
          <div className='answer-section'>
            {questions[currentQuestion].answerOptions.map((answerOption, index) => (
              <button
                key={index}
                onClick={() => handleAnswerOptionClick(answerOption.isCorrect, index)}
                className={
                  selectedAnswer === index
                    ? isCorrect
                      ? 'correct'
                      : 'incorrect'
                    : ''
                }
                disabled={selectedAnswer !== null}
              >
                {answerOption.answerText}
              </button>
            ))}
          </div>
          {selectedAnswer !== null && (
            <button className='next-button' onClick={handleNextQuestion}>
              Next Question ➡︎
            </button>
          )}
          <div className='score-display'>Score: {score}</div>
        </div>
      )}
    </div>
  );
}

export default App;
