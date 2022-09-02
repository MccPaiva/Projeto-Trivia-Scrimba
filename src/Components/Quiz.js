import React from "react";
import {nanoid} from 'nanoid'

export default function Quiz(props){

    const [answers, setAnswers] = React.useState([]);

    props.incorrectAnswer.splice(Math.floor(Math.random() * 4), 0, props.correctAnswer);
    const dedupedAnswers = Array.from(new Set(props.incorrectAnswer));

    React.useEffect(() =>{
        setAnswers(
            dedupedAnswers.map(item => ({
                answer: item,
                isSelected: false,
                id: nanoid()
            }))
        )
    }, [])


    function toggleSelection(id){

        setAnswers(prevAnswers => {

            const newAnswers = [];

            for(let i = 0; i < answers.length; i++){
                if(answers[i].id === id){
                    newAnswers.push({
                        ...answers[i],
                        isSelected: true
                    })

                    answers[i].answer === props.correctAnswer 
                    ? props.toggleRight() : props.toggleWrong()
                }else{
                    newAnswers.push({
                        ...answers[i],
                        isSelected: false
                    })
                }
            }
            return newAnswers
        })
    }

    const randomAnswers = answers.map(item =>
        <button
        key={item.id}
        //Possível usar o NPM dynamic-class-list para facilitar as classes abaixo
        className={
            props.quizWon ?
            item.answer == props.correctAnswer ? "right-answer"
            :
            item.isSelected ? "wrong-answer" : undefined
            :
            item.isSelected ? "selected" : undefined

        }
        onClick={props.quizWon ? null : () => toggleSelection(item.id)}
        >{item.answer}</button>
    )

	return(
		<div className="question-container">
            <h2 className="question">{props.question}</h2>
            <div className="answers">
                {randomAnswers}
        	</div>
        </div>
	)
}



// const [answers, setAnswers] = React.useState([]);
// 
//     props.incorrectAnswer.splice(Math.floor(Math.random() * 4), 0, props.correctAnswer);
//     const dedupedAnswers = Array.from(new Set(props.incorrectAnswer));
// 
//     React.useEffect(() =>{
//         setAnswers(
//             dedupedAnswers.map(item => ({
//                 answer: item,
//                 isSelected: false,
//                 id: nanoid()
//             }))
//         )
//     }, [])
// 
// 
//     function toggleSelection(id){
//         setAnswers(prevAnswers => {
// 
//             const newAnswers = [];
// 
//             for(let i = 0; i < answers.length; i++){
//                 if(answers[i].id === id){
//                     newAnswers.push({
//                         ...answers[i],
//                         isSelected: !answers[i].isSelected
//                     })
//                 }else{
//                     newAnswers.push({
//                         ...answers[i],
//                         isSelected: false
//                     })
//                 }
//             }
//             return newAnswers
//         })
//     }
//     // console.log(answers)
// 
//     const randomAnswers = answers.map(item =>
//         <button
//         key={item.id}
//         className={item.isSelected ? "selected" : undefined}
//         onClick={() => toggleSelection(item.id)}
//         >{item.answer}</button>
//     )