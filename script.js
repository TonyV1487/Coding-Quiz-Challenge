// global variables
var questionDiv = document.getElementById('question');
var choicesDiv = document.getElementById('choices');
var questionBtn = document.getElementById('questionBtn');
var selectionResult = document.getElementById('result');
var timerEl = document.getElementById('time');
var questionAnswer = '';
var answerChoice = '';
var questionIndex = 0;
var time = questions.length * 15;
var timerId;

// align questions and choices to the left
function alignLeft() {
  var alignment = document.getElementById('content');
  alignment.setAttribute('class', 'col-8 during');
}
// takes in index, uses this index to compare answer to current selection
function checkAnswer() {
  var selectionResult = document.getElementById('result');
  console.log(selectionResult);
  console.log(answerChoice);
  console.log(questionAnswer);
  if (answerChoice === questionAnswer) {
    // Display"correct"
    selectionResult.textContent = 'Correct';
    // Fade out text
    hideNotification();
    // Move to next question
    displayQuestion();
  } else {
    // Display "wrong"
    selectionResult.textContent = 'Wrong';
    // penalize time
    time -= 10;
    if (time < 0) {
      time = 0;
    }
    // display new time
    timerEl.textContent = time;
    // Fade out text
    hideNotification();
    // move to next question
    displayQuestion();
  }
}
// reduce timer over time and display
function clockTick() {
  time--;
  timerEl.textContent = time;

  if (time <= 0) {
    endQuiz();
  }
}
function displayQuestion() {
  // call render question
  if (questionIndex < questions.length) {
    questionDiv.innerHTML = renderQuestion(questionIndex);
    questionAnswer = setAnswer(questionIndex);
    renderChoices(questionIndex);
  } else {
    endQuiz();
  }
  questionIndex++;
}
// remove results of answer selection
function doHide() {
  document.getElementById('result').textContent = '';
}
// setup end quiz screen
function endQuiz() {
  // stops timer
  clearInterval(timerId);
  // Setup text
  questionDiv.innerHTML = 'All done!';
  choicesDiv.innerHTML = 'Your score is ' + time;
  // new line for inputs
  var br = document.createElement('br');
  // input for initials
  var initialsInput = document.createElement('INPUT');
  initialsInput.setAttribute('type', 'text');
  initialsInput.setAttribute('placeholder', 'Type initials here');
  initialsInput.setAttribute('id', 'initialsInput');
  // submit button
  var submitInit = document.createElement('button');
  submitInit.textContent = 'Submit';
  submitInit.className = 'btn btn-success margin5';
  submitInit.setAttribute = ('id', 'submitInit');
  // add elements to HTML
  choicesDiv.appendChild(br);
  choicesDiv.appendChild(initialsInput);
  choicesDiv.appendChild(submitInit);
}
// add 2 second delay to "doHide()"
function hideNotification() {
  setTimeout('doHide()', 2000);
}
// takes in index, uses this index to return the choices from the db
function renderChoices(index) {
  choicesDiv.innerHTML = '';
  for (i = 0; i < questions[index].choices.length; i++) {
    var choiceBtn = document.createElement('button');
    choiceBtn.setAttribute('id', 'choiceBtn');
    var br = document.createElement('br');
    choiceBtn.textContent = questions[index].choices[i];
    choiceBtn.className = 'btn btn-success margin5';
    choicesDiv.appendChild(choiceBtn);
    choicesDiv.appendChild(br);
  }
}
// helpers
// takes in index, uses that index to find question in db to return the title
function renderQuestion(index) {
  return questions[index].title;
}
// save high score to local storage
function saveHighscore() {
  var initials = initialsInput.value.trim();

  if (initials !== '') {
    localStorage.setItem('highscores', JSON.stringify(initials));
  }
}

// takes in index, uses this index to return answer from db
function setAnswer(index) {
  return questions[index].answer;
}

// start timer
function startTimer() {
  timerId = setInterval(clockTick, 1000);
  timerEl.textContent = time;
}
// remove the question button
function removeQuestionBtn() {
  if (document.contains(document.getElementById('questionBtn'))) {
    document.getElementById('questionBtn').remove();
  }
}

// Create 'on click' event to begin quiz
questionBtn.addEventListener('click', function() {
  alignLeft();
  displayQuestion();
  startTimer();
  removeQuestionBtn();
});

// 'on click' even listener for multiple choice
// 'on click' event listender for submitting initials
// I wasn't able to get the submitting initials button to work
choicesDiv.addEventListener('click', function(event) {
  event.preventDefault();
  if (event.target.matches('#choiceBtn')) {
    // Get text of selection
    answerChoice = event.target.textContent;
    console.log(answerChoice);
    checkAnswer();
  } else if (event.target.matches('#submitInit')) {
    alert(alert);
    console.log(confirm);
  }
});
