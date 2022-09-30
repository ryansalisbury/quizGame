/**Remember that questions is an object as there are {}
 * when there is [] it is an array!
 */

let questions =[{
    question: "what is the baby of a moth know as?",
    choices: ["baby","infant", "kit", "larva"],
    correctAnswer: 3
},{
    question: "what is the adult of a kid know as?",
    choices: ["baby","infant", "goat", "larva"],
    correctAnswer: 2
},{
    question: "what is the young of buffalo know as?",
    choices: ["calf","infant", "kit", "larva"],
    correctAnswer: 0
},{
    question: "what is a baby aligator know as?",
    choices: ["baby","infant", "hatchling", "larva"],
    correctAnswer: 2
},{
    question: "what is a baby goose know as?",
    choices: ["baby","gosling", "kit", "larva"],
    correctAnswer: 1
}]

let currentQuestion = 0;
let correctAnswers = 0;
let quizOver = false;

/**This function just checks that the page is fully loaded before executing anything */
/**With a diollar sign you are referncing a jquery library */
$(document).ready(function() {
    /*Will display the very first Question and then after that the current question the player is on*/
    displayCurrentQuestion();
    /**The 'this' in brackets is referring to the current element
     * will find the .quizMessage for the current element (objects defined above), and hides the others
     */
    $(this).find(".quizMessage").hide();
    /**Will pick out the Next question using the next button. Same as line above but with the .on
     * it takes 2 parameters the event which is "click" and the function 
      */
    $(this).find(".nextButton").on("click", function() {
        /**This is the function that gets called when next button is clicked */
        if(!quizOver){ /*If quiz is not over then:*/
            value = $("input[type='radio']:checked").val(); 
            /**"Value is equal to dollar which is the jquery input, type radio button
             and the radio buttion is checked" - that's what the guy said exactly for this line so it's assigning a jquery checking value to a var */
            if(value == undefined){
                /**If the value of the radio button is checked and is not undefined, basically if user has not selected an answer */
                $(document).find(".quizMessage").text("Please select an answer");/**Prompts the user for an answer (text message appears) */
                
                $(document).find(".quizMessage").show(); /**Shows quiz message on screen */
            }
            else{ /**if answer is defined and user has picked there answer */
                $(document).find(".quizMessage").hide(); /**Hides quiz message once answer is selected */
                if(value == questions[currentQuestion].correctAnswer){ /**if value variable (jquery input) is equal to the correct answer then correct answer++ */
                    correctAnswers++;
                }
                currentQuestion++;  /** Increments current question to move us along the array of questions (objects) */
                if(currentQuestion < questions.length) {
                    displayCurrentQuestion();
                }
                else{ /**If we have reached the end of the quiz */
                    displayScore();
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }

            }

        }else{
            quizOver = false;
            $(document).find("nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }

    });
});


function displayCurrentQuestion(){

    console.log("In current Question");

    /**Gets current question from the object array*/
    let question = questions[currentQuestion].question;
    /**These 2 lines below sound like they mean this: So the jquery $ sign means that if the 
     * .quizContainer is greater than the opposing arguments then this is what the variables 
     * questionClass and choiceList are being defined as.
     */
    let questionClass = $(document).find(".quizContainer > .question");
    let choiceList = $(document).find(".quizContainer > .choiceList");
    /**Number of choices player can make based on number of questions */
    let numChoices = questions[currentQuestion].choices.length;

    /**Sets the question class*/
    $(questionClass).text(question);

    $(choiceList).find("li").remove();

    let choice;
    for(i = 0; i < numChoices; i++){
        choice = questions[currentQuestion].choices[i];
        /**dollar sign again and using <li> list to input a radio button and it uses the i as a 
         * counter which I assume will go before the question and then it appends it to the list*/
        $('<li> <input type ="radio" value '+ i + ' name="dynradio /> ' + choice + '</li>').appendto(choiceList);
        
    }
}
function resetQuiz(){
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();

}

function displayScore(){
    $(document).find(".quizConatiner > .result").text("Yopu scored: " + correctAnswers + " out of " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore(){
    $(document).find(".result").hide();
}

