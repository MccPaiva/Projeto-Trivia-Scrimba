import React from "react";
import "./style.css";
import Quiz from "./Components/Quiz.js"
import he from "he"
import {nanoid} from 'nanoid'

export default function App() {

  const [quizStarted, setQuizStarted] = React.useState(false);

  const [quizData, setQuizData] = React.useState([]);

  const [quizWon, setQuizWon] = React.useState(false);

  const [rightAnswers, setRightAnswers] = React.useState(0);

  const transformData = React.useCallback(data => data.map(item => {
      return {
        ...item,
        isRight: false,
        id: nanoid()
      }
  }), []);

  React.useEffect(()=>{
    fetch("https://opentdb.com/api.php?amount=5")
      .then(res => res.json())
      .then(data => setQuizData(transformData ? transformData(data.results) : data.results))
  }, [transformData])

  function handleQuizStart(){
    setQuizStarted((prev) => !quizStarted)
  }

  function toggleRight(id){
    setQuizData(prev => {

      const newAnswers = [];

      for(let i = 0; i < 5; i++){
        if (quizData[i].id === id ) {
            newAnswers.push({
            ...quizData[i],
            isRight: true
          })
        } else {
          newAnswers.push(quizData[i])
        }
      }
      return newAnswers;
      
    })
  }

  function toggleWrong(id){
    setQuizData(prev => {

      const newAnswers = [];

      for(let i = 0; i < 5; i++){
        if (quizData[i].id === id ) {
            newAnswers.push({
            ...quizData[i],
            isRight: false
        })
        } else {
          newAnswers.push(quizData[i])
        }
      }
      return newAnswers;
    })
  }

  function checkAnswers(){
      setQuizWon(true);

      let tempAnswers = 0;

      for(let i = 0; i < 5; i++){
        quizData[i].isRight && tempAnswers++
      }

      setRightAnswers(tempAnswers);
  }

  function resetQuiz(){
      setQuizStarted(false);
  }

  const quizList = quizData?.map(result => 
      <Quiz
      question = {he.decode(result.question)}
      correctAnswer = {he.decode(result.correct_answer)}
      incorrectAnswer = {result.incorrect_answers.map(incorrect => he.decode(incorrect))}
      toggleRight = {() => toggleRight(result.id)}
      toggleWrong = {() => toggleWrong(result.id)}
      checkAnswers = {checkAnswers}
      quizWon = {quizWon}
      key = {result.id}
      />
  );

  return (
    <div className="App">
        {
          !quizStarted ?
          <main className="start-screen">
            <div>
              <h1>Quizzical</h1>
              <button className="page-button" onClick={handleQuizStart}>Start Quiz</button>
            </div>
          </main>
          :
          <main className="quiz-screen">
            <div>
              {quizList}

              {!quizWon ?
                <button onClick={checkAnswers} className="page-button">Check answers</button>
                :
                <div>
                  <span>You scored {rightAnswers}/5 correct answers</span> 
                  <button onClick={() => window.location.reload(false)} className="page-button">Play again</button>
                </div>
              }
            </div>
          </main>
        }
    </div>
  );
}