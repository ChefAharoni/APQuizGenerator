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

    // Bind event listeners
    this.bindEventListeners();
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
}

// Initialize the app when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new QuizApp();
});
