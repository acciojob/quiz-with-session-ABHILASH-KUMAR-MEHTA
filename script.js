// Questions data
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Reference to container elements
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Load previous answers from sessionStorage if available
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// Function to render the quiz questions
function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear existing content

  questions.forEach((question, i) => {
    const questionDiv = document.createElement("div");

    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionDiv.appendChild(questionText);

    question.choices.forEach((choice) => {
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${i}`;
      input.value = choice;

      // Restore selected choice from sessionStorage
      if (userAnswers[i] === choice) {
        input.checked = true;
        input.setAttribute("checked", "true"); // Important for Cypress
      }

      // Update sessionStorage on change
      input.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      const label = document.createElement("label");
      label.textContent = choice;

      questionDiv.appendChild(input);
      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(questionDiv);
  });
}

// Submit button event
submitButton.addEventListener("click", () => {
  let score = 0;
  questions.forEach((q, i) => {
    if (userAnswers[i] === q.answer) {
      score++;
    }
  });

  const scoreText = `Your score is ${score} out of ${questions.length}.`;
  scoreElement.textContent = scoreText;

  // Save final score to localStorage
  localStorage.setItem("score", score.toString());
});

// On page load
renderQuestions();

// Show previous score if present
const storedScore = localStorage.getItem("score");
if (storedScore !== null) {
  scoreElement.textContent = `Your score is ${storedScore} out of ${questions.length}.`;
}
