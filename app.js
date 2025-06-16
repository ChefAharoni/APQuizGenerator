class QuizApp {
  constructor() {
    this.quizGenerator = new QuizGenerator();
    this.currentQuiz = null;
    this.currentQuestionIndex = 0;
    this.userAnswers = [];
    this.startTime = null;
    this.endTime = null;

    // DOM Elements
    this.quizSelectionContainer = document.getElementById("quiz-selection");
    this.quizContainer = document.getElementById("quiz-container");
    this.resultsContainer = document.getElementById("results-container");
    this.progressBar = document.getElementById("progress-bar");
    this.questionText = document.getElementById("question-text");
    this.codeBlock = document.getElementById("code-block");
    this.answerInput = document.getElementById("answer-input");
    this.prevButton = document.getElementById("prev-button");
    this.nextButton = document.getElementById("next-button");
    this.submitButton = document.getElementById("submit-button");
    this.scoreDisplay = document.getElementById("score");
    this.timeDisplay = document.getElementById("time");
    this.newQuizButton = document.getElementById("new-quiz-button");
    this.currentQuestionSpan = document.getElementById("current-question");
    this.questionNumberSpan = document.getElementById("question-number");
    this.bitwiseSection = document.getElementById("bitwise-section");
    this.bitwiseQuestion = document.getElementById("bitwise-question");
    this.bitwiseForm = document.getElementById("bitwise-form");
    this.bitwiseInput1 = document.getElementById("bitwise-input-1");
    this.bitwiseInput2 = document.getElementById("bitwise-input-2");
    this.bitwiseAnswer = document.getElementById("bitwise-answer");
    this.bitwiseNewQuestion = document.getElementById("bitwise-new-question");

    // Bind event listeners
    this.bindEventListeners();

    // Add a button to show Bitwise Shifting Practice (add to nav or top)
    let bitwiseNavBtn = document.getElementById("bitwise-nav-btn");
    if (!bitwiseNavBtn) {
      bitwiseNavBtn = document.createElement("button");
      bitwiseNavBtn.id = "bitwise-nav-btn";
      bitwiseNavBtn.textContent = "Bitwise Shifting Practice";
      bitwiseNavBtn.className =
        "ml-4 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold py-2 px-4 rounded-lg transition duration-200";
      document.querySelector("nav .flex").appendChild(bitwiseNavBtn);
    }
    bitwiseNavBtn.addEventListener("click", () => this.showBitwiseSection());

    if (this.bitwiseForm) {
      this.bitwiseForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.checkBitwiseAnswer();
      });
    }
    if (this.bitwiseNewQuestion) {
      this.bitwiseNewQuestion.addEventListener("click", () =>
        this.generateBitwiseQuestion()
      );
    }
  }

  bindEventListeners() {
    // Quiz type selection
    document.querySelectorAll(".quiz-type-button").forEach((button) => {
      button.addEventListener("click", () =>
        this.startQuiz(button.dataset.quizType)
      );
    });

    // Navigation buttons
    this.prevButton.addEventListener("click", () =>
      this.showPreviousQuestion()
    );
    this.nextButton.addEventListener("click", () => this.showNextQuestion());
    this.submitButton.addEventListener("click", () => this.submitQuiz());
    this.newQuizButton.addEventListener("click", () =>
      this.showQuizSelection()
    );

    // Answer input
    this.answerInput.addEventListener("input", () => {
      this.saveAnswer();
      this.updateNavigationButtons();
    });
  }

  startQuiz(quizType) {
    this.currentQuiz = this.quizGenerator.generateQuiz(quizType);
    this.currentQuestionIndex = 0;
    this.userAnswers = new Array(this.currentQuiz.length).fill("");
    this.startTime = new Date();

    this.quizSelectionContainer.classList.add("hidden");
    this.quizContainer.classList.remove("hidden");
    this.resultsContainer.classList.add("hidden");

    this.showCurrentQuestion();
    this.updateProgressBar();
  }

  showCurrentQuestion() {
    const question = this.currentQuiz[this.currentQuestionIndex];

    // Update question text and code
    this.questionText.textContent = question.text;
    this.codeBlock.textContent = question.code;

    // Restore user's previous answer if exists
    this.answerInput.value = this.userAnswers[this.currentQuestionIndex];

    // Update question number in UI
    if (this.currentQuestionSpan) {
      this.currentQuestionSpan.textContent = this.currentQuestionIndex + 1;
    }
    if (this.questionNumberSpan) {
      this.questionNumberSpan.textContent = this.currentQuestionIndex + 1;
    }

    // Update navigation buttons
    this.updateNavigationButtons();
  }

  showPreviousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.showCurrentQuestion();
      this.updateProgressBar();
    }
  }

  showNextQuestion() {
    if (this.currentQuestionIndex < this.currentQuiz.length - 1) {
      this.currentQuestionIndex++;
      this.showCurrentQuestion();
      this.updateProgressBar();
    }
  }

  saveAnswer() {
    this.userAnswers[this.currentQuestionIndex] = this.answerInput.value;
  }

  updateNavigationButtons() {
    this.prevButton.disabled = this.currentQuestionIndex === 0;
    this.nextButton.disabled =
      this.currentQuestionIndex === this.currentQuiz.length - 1;
    this.submitButton.disabled = !this.areAllQuestionsAnswered();
  }

  areAllQuestionsAnswered() {
    return this.userAnswers.every((answer) => answer.trim() !== "");
  }

  updateProgressBar() {
    const progress =
      ((this.currentQuestionIndex + 1) / this.currentQuiz.length) * 100;
    this.progressBar.style.width = `${progress}%`;
    // Also update the current question number in the progress bar
    if (this.currentQuestionSpan) {
      this.currentQuestionSpan.textContent = this.currentQuestionIndex + 1;
    }
  }

  submitQuiz() {
    this.endTime = new Date();
    const timeTaken = (this.endTime - this.startTime) / 1000; // in seconds

    let score = 0;
    const results = this.currentQuiz.map((question, index) => {
      const isCorrect = this.quizGenerator.validateAnswer(
        question,
        this.userAnswers[index]
      );
      if (isCorrect) score++;
      return {
        question: question.text,
        userAnswer: this.userAnswers[index],
        correctAnswer: question.answer,
        explanation: question.explanation,
        isCorrect,
      };
    });

    this.showResults(score, timeTaken, results);
  }

  showResults(score, timeTaken, results) {
    this.quizContainer.classList.add("hidden");
    this.resultsContainer.classList.remove("hidden");

    // Update score and time
    this.scoreDisplay.textContent = `${score}/${this.currentQuiz.length}`;
    this.timeDisplay.textContent = `${Math.floor(timeTaken / 60)}:${(
      timeTaken % 60
    )
      .toFixed(0)
      .padStart(2, "0")}`;

    // Create results list
    const resultsList = document.getElementById("results-list");
    resultsList.innerHTML = "";

    results.forEach((result, index) => {
      const resultItem = document.createElement("div");
      resultItem.className = `result-item ${
        result.isCorrect ? "correct" : "incorrect"
      }`;

      resultItem.innerHTML = `
                <div class="result-header">
                    <span class="question-number">Question ${index + 1}</span>
                    <span class="result-status">${
                      result.isCorrect ? "✓" : "✗"
                    }</span>
                </div>
                <div class="question-text">${result.question}</div>
                <div class="code-block">${result.question.code}</div>
                <div class="answer-section">
                    <div class="user-answer">
                        <strong>Your answer:</strong> ${result.userAnswer}
                    </div>
                    <div class="correct-answer">
                        <strong>Correct answer:</strong> ${result.correctAnswer}
                    </div>
                    <div class="explanation">
                        <strong>Explanation:</strong> ${result.explanation}
                    </div>
                </div>
            `;

      resultsList.appendChild(resultItem);
    });
  }

  showQuizSelection() {
    this.resultsContainer.classList.add("hidden");
    this.quizSelectionContainer.classList.remove("hidden");
  }

  showBitwiseSection() {
    this.quizSelectionContainer.classList.add("hidden");
    this.quizContainer.classList.add("hidden");
    this.resultsContainer.classList.add("hidden");
    this.bitwiseSection.classList.remove("hidden");
    this.generateBitwiseQuestion();
  }

  generateBitwiseQuestion() {
    // Random variable name
    const varNames = ["a", "b", "x", "num", "val", "data"];
    const varName = varNames[Math.floor(Math.random() * varNames.length)];
    // Random multiply-by value (between 3 and 20, not a power of 2)
    let multiplier;
    do {
      multiplier = Math.floor(Math.random() * 18) + 3;
    } while ((multiplier & (multiplier - 1)) === 0); // skip powers of 2
    // Find two shifts that sum to multiplier (largest first)
    let shifts = [];
    for (let i = 4; i >= 1; i--) {
      for (let j = i - 1; j >= 0; j--) {
        if ((1 << i) + (1 << j) === multiplier) {
          shifts = [i, j];
          break;
        }
      }
      if (shifts.length) break;
    }
    if (!shifts.length) {
      // fallback: 8+2=10, 16+4=20, etc.
      if (multiplier === 10) shifts = [3, 1];
      else if (multiplier === 12) shifts = [3, 2];
      else if (multiplier === 18) shifts = [4, 1];
      else shifts = [Math.floor(Math.log2(multiplier)), 0];
    }
    this._bitwiseVarName = varName;
    this._bitwiseMultiplier = multiplier;
    this._bitwiseShifts = shifts;
    // Pick a random value for the variable (between 2 and 10)
    const varValue = Math.floor(Math.random() * 9) + 2;
    this._bitwiseVarValue = varValue;
    this.bitwiseQuestion.innerHTML = `Fill in the blanks to multiply <span class="font-bold">${varName}</span> by <span class="font-bold">${multiplier}</span> using only bitshift operators.<br>Enter two shift expressions (e.g., <span class='font-mono'>${varName}<<3</span>) that add up to the result. <br><span class='text-sm text-yellow-700'>Hint: Use two shifts and addition. The larger shift must be first.</span><br><br><pre class='bg-gray-100 p-2 rounded'>int ${varName} = ${varValue};\n${varName} = _____ + _____;</pre>`;
    this.bitwiseInput1.value = "";
    this.bitwiseInput2.value = "";
    this.bitwiseAnswer.textContent = "";
  }

  checkBitwiseAnswer() {
    const v = this._bitwiseVarName;
    const s1 = this._bitwiseShifts[0];
    const s2 = this._bitwiseShifts[1];
    const expected1 = `${v}<<${s1}`;
    const expected2 = `${v}<<${s2}`;
    const user1 = this.bitwiseInput1.value.replace(/\s+/g, "");
    const user2 = this.bitwiseInput2.value.replace(/\s+/g, "");
    let correct =
      (user1 === expected1 && user2 === expected2) ||
      (user1 === expected2 && user2 === expected1);
    if (correct) {
      this.bitwiseAnswer.textContent = `✅ Correct! ${v} * ${this._bitwiseMultiplier} = (${expected1}) + (${expected2})`;
      this.bitwiseAnswer.className =
        "text-lg font-semibold text-green-700 mb-2";
    } else {
      this.bitwiseAnswer.textContent = `❌ Not quite. The correct answer is: ${v} = ${expected1} + ${expected2}`;
      this.bitwiseAnswer.className = "text-lg font-semibold text-red-700 mb-2";
    }
  }
}

// Initialize the app when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new QuizApp();
});
