//Create trivia game
// Player will press button on start screen that begins Game
//Ask player timed questions with JavaScript timed events (30 seconds)
    //Question is shown until user answers or time runs out
    //IF player selects correct answer, congratulations screen for several seconds
    // after which the next question will be displayed w/o user input
// IF player runs out of time during question, inform player that time is up and display correct answer for
// several seconds
// IF player chooses incorrect answer, inform player that answer was wrong AND display correct answer for several
// seconds
// On FINAL SCREEN show player the number of correct and incorrect answers, AND option to restart game
$(document).ready(function(){

    $("#start").click(function(){
    trivia.startGame});
    })

    //Variables
    var score = 0;
    var time = 20;

    //select all elements
    const start = document.getElementById("start"); 
    const quiz = document.getElementById("quiz");
    const question = document.getElementById("question");
    const choiceA = document.getElementById("A"); 
    const choiceB = document.getElementById("B"); 
    const choiceC = document.getElementById("C"); 
    const choiceD = document.getElementById("D"); 
    const counter = document.getElementById("counter"); 
    const timeGauge = document.getElementById("timeGauge"); 
    const progress = document.getElementById("progress");   
    const scoreDiv = document.getElementById("score");

    //questions and answers data
    let questions = 
    {
        q1: ["In what year did The Transformers cartoon premier?"],
        choices1:
                [{
                A: '1989',
                B: '1984',
                C: '1980',
                D: '1985',
                answer: 'B',
                }],
        q2: ["Who provided the voice for Arcee, the first female Transformer in the 1986 movie?"],
        choices2:
                [{
                A: 'Tress MacNeille',
                B: 'June Foray',
                C: 'Susan Blu',
                D: 'Lucille Bliss',
                answer: 'C',
                }], 
    };

    let lastQuestionIndex = questions.length - 1;
    let runningQuestionIndex = 0;

    function renderQuestion(){
        let q = questions[runningQuestionIndex];
        question.innerHTML = "<p>" + q.question + "</p>";
        choiceA.innerHTML = q1.choices1.A;
        choiceB.innerHTML = q1.choices1.B;
        choiceC.innerHTML = q1.choices1.C;
        choiceD.innerHTML = q1.choices1.D;
    }

    //counter render
    const questionTime = 20;
    const gaugeWidth = 150
    let count = 0;
    const gaugeProgressUnit = gaugeWidth/questionTime;

    function counterRender(){
        if( count <= questionTime){
            counterRender.innerHTML = count;
            timeGauge.style.width = gaugeProgressUnit * count + "px";
            count++;
        } else{
            count = 0;
            answerIsWrong();
            if (runningQuestionIndex < lastQuestionIndex){
                runningQuestionIndex++;
                questionRender();
            }else{ clearInterval(TIMER);
            }
        }
    }

    function checkAnswer(answer){
        if(questions[runningQuestionIndex].correct == answer){
            score++;
            answerIsCorrect();
        }else{
            answerIsWrong();
        }
        if(runningQuestionIndex < lastQuestionIndex){
            count = 0;
            runningQuestionIndex++;
            questionRender();
        }else{
            clearInterval(TIMER);
            scoreRender();
            }
        }

//Start Quiz

const start = document.getElementById("#start");
start.addEventListener("click", startQuiz );

function startQuiz(){
    start.style.display = "none";
    counterRender();
    TIMER = setInterval(counterRender,2*1000);
    progressRender();
    questionRender();
    quiz.style.display = "block";
}

//Score Render
function scoreRender(){
    ServiceWorkerContainer.style.display = "block";
    let scorePerCent = Math.round(100 * score / questions.length);
    scoreContainer.innerHTML = "<p>"+ scorePerCent +"</p>"
}