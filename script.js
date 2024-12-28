document.addEventListener("DOMContentLoaded", () => {
    let currentQuestionIndex = 0;
    let questions = [];
    let score = 0;
  
    const questionElement = document.querySelector(".question");
    const answerElements = document.querySelectorAll(".answers_top div");
    const scoreElements = document.querySelectorAll(".right_side li");
  
    // fetch questions from the json file
    async function loadQuestions() {
      try {
        const response = await fetch("questions.json");
        questions = await response.json();
       
        displayQuestion();
      } catch (error) {
        console.error("Error loading questions:", error);
      }
    }
  
    // Display current question
    function displayQuestion() {
      const currentQuestion = questions[currentQuestionIndex];
      if (!currentQuestion) return;
      answerElements.forEach((element) => {
        element.classList.remove("correct", "wrong", "twinkle-correct", "twinkle-wrong");
    });
      questionElement.textContent = currentQuestion.question;
      answerElements.forEach((element, index) => {
        
        element.textContent = `${String.fromCharCode(65 + index)} - ${currentQuestion.options[index]}`;
        element.onclick = () => checkAnswer(element,index);
      });
    }
  
    // Check the answer
    function checkAnswer(selectedElement,selectedIndex) {
      const currentQuestion = questions[currentQuestionIndex];
      const previousActiveElement = document.querySelector(".active_list");
    
      // Remove the active class from the previous element
      if (previousActiveElement) {
        previousActiveElement.classList.remove("active_list");
      }

      if (selectedIndex === currentQuestion.correct) {
        selectedElement.classList.add("twinkle-correct");
        score += 1;
        
        scoreElements[score - 1].classList.add("active_list");
        currentQuestionIndex += 1;
  
       setTimeout(() => {
                if (currentQuestionIndex >= questions.length) {
                    alert("تهانينا! ربحت المليون!");
                } else {
                    displayQuestion();
                }
            }, 2000); // Delay to allow animation
        } else {
            // Wrong answer: Twinkle with red
            selectedElement.classList.add("twinkle-wrong");

            setTimeout(() => {
                alert("إجابة خاطئة! اللعبة انتهت.");
                resetGame();
            }, 2000); // Delay to allow animation
    }}
    
  
    // Reset the game
    function resetGame() {
      currentQuestionIndex = 0;
      score = 0;
      scoreElements.forEach((element) => element.classList.remove("active_list"));
      displayQuestion();
    }
  
    // Start the game
    loadQuestions();
  });
  