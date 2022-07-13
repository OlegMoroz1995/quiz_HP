 const quiz = [{
     question: "When Harry used a magic firstly?",
     answers: ["In dream", "In zoo", "In the car"],
     correct: 2,
   },
   {
     question: "Where did Harry get the letter from Hogwarts?",
     answers: ["On the lighthouse", "At home", "In the car"],
     correct: 1,
   },
   {
     question: "What was the core of Harry's wand?",
     answers: ["From a unicorn", "From a fenix", "From a dragon heart"],
     correct: 2,
   },
   {
     question: "Who was on Harry's first card from the box of chocolate frogs?",
     answers: ["Snape", "Dumbledore", "Volandemort"],
     correct: 2,
   },
   {
     question: "Where did Harry first meet Draco Malfoy?",
     answers: ["In the train", "In Hogwarts", "In a crooked alley"],
     correct: 3,
   },
   {
     question: "What kind of dragon did Hagrid have?",
     answers: ["Hungarian Horntail", "Norwegian humpback dragon", "Ukrainian iron-bellied dragon"],
     correct: 2,
   },
   {
     question: "What instrument was used to put the three-headed dog to sleep?",
     answers: ["A violin", "A flute", "A harp"],
     correct: 3,
   },
   {
     question: "What is the make of the Weasley family car?",
     answers: ["Ford", "BMW", "Audi", "Volkswagen"],
     correct: 1,
   },
   {
     question: "How many secret passages are there from Hogwarts?",
     answers: ["7", "3", "11", "22"],
     correct: 1,
   },
   {
     question: "How many deathly gifts are there?",
     answers: ["2", "4", "1", "3"],
     correct: 4,
   }

 ];


 // Search items
 const headerQuizContainer = document.querySelector("#header"),
   listQuizContainer = document.querySelector("#list"),
   submitButton = document.querySelector("#submit");


 // Game variables
 let score = 0,
   questionIndex = 0;

 // Cleaning the elements
 function clearPage() {
   headerQuizContainer.innerHTML = '';
   listQuizContainer.innerHTML = '';
 }



 function showQuestion() {

   clearPage();

   // Displaying the question
   headerQuizContainer.innerHTML = `<h2 class="title">${quiz[questionIndex].question}</h2>`;

   for (let [indexQuestion, item] of quiz[questionIndex].answers.entries()) {

     const answersTemplate = `<li>
     <label>
       <input value = ${indexQuestion+1} type="radio" class="answer" name="answer" />
       <span>${item}</span>
     </label>
   </li>`;

     listQuizContainer.innerHTML += answersTemplate;
   }
 }

 function checkAnswer() {

   const checkedRadio = listQuizContainer.querySelector('input[type="radio"]:checked');

   if (!checkedRadio) {
     submitButton.blur();
     return;
   }

   const userAnswer = parseInt(checkedRadio.value);

   if (userAnswer === quiz[questionIndex].correct) {

     score++;
    
    checkedRadio.parentNode.parentNode.style.background = 'Lightgreen';
   } else {
    checkedRadio.parentNode.parentNode.style.background = 'Salmon';
   }

   if (questionIndex !== (quiz.length - 1)) {

     questionIndex++;
     return;

   } else {

     showResults();

   }

 }


 function showResults() {

   clearPage();

   let title,
     message;

   if (score === quiz.length) {
     title = `Congratulations!`;
     message = `You answered all the questions correctly! Could you be the next Minister of Magic?`;
   } else if ((score * 100) / quiz.length >= 80) {
     title = `Good result!`;
     message = `You answered almost all the questions correctly! Maybe you need more time?`;
   } else if ((score * 100) / quiz.length >= 50) {
     title = `Nice result!`;
     message = `You know enough, but you can do better! Try again!`;
   } else {
     title = `This result also result!`;
     message = `Try again! But remember, the Weasley twins are watching you!`;
   }

   headerQuizContainer.innerHTML = `
      <h2 class="title">${title}</h2>
			<h3 class="summary">${message}</h3>
			<p class="result">${score} out of ${quiz.length}</p>
      `;

   // Start first after ending
   submitButton.blur();
   submitButton.textContent = `Begin again`;
   submitButton.onclick = () => {
     history.go();
   };
 }

 clearPage();
 startQuiz();

 function startQuiz() {
   headerQuizContainer.innerHTML = `<h2 class="title"> Harry Potter Quiz</h2>`;
   submitButton.textContent = `Start`;
   score = 0;
   questionIndex = 0;
 }

 submitButton.addEventListener('click', () => {

   if (submitButton.textContent === 'Start' || submitButton.textContent === 'Next') {
     submitButton.textContent = `Give answer`;
     showQuestion();
   } else if (submitButton.textContent === 'Begin again') {
     startQuiz();
   } else  if(submitButton.textContent === 'Give answer'){
    submitButton.textContent = `Next`;
   }

   submitButton.onclick = checkAnswer;
 });