// script.js
document.addEventListener("DOMContentLoaded", () => {
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
      choices: ["Earth", "Jupiter", "Mars", "Saturn"],
      answer: "Jupiter",
    },
    {
      question: "What is the capital of Canada?",
      choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
      answer: "Ottawa",
    },
  ];

  const questionsElement = document.getElementById("questions");
  const submitButton = document.getElementById("submit");
  const scoreElement = document.getElementById("score");

  let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

  function renderQuestions() {
    questionsElement.innerHTML = ""; // clear if re-rendering

    questions.forEach((q, i) => {
      const qDiv = document.createElement("div");

      const qText = document.createElement("p");
      qText.textContent = q.question;
      qDiv.appendChild(qText);

      q.choices.forEach((choice) => {
        const label = document.createElement("label");
        const input = document.createElement("input");

        input.type = "radio";
        input.name = `question-${i}`;
        input.value = choice;

        if (userAnswers[i] === choice) {
          input.checked = true;
        }

        input.addEventListener("change", () => {
          userAnswers[i] = choice;
          sessionStorage.setItem("progress", JSON.stringify(userAnswers));
        });

        label.appendChild(input);
        label.appendChild(document.createTextNode(choice));
        qDiv.appendChild(label);
      });

      questionsElement.appendChild(qDiv);
    });
  }

  renderQuestions();

  // Load and show score if already submitted
  const storedScore = localStorage.getItem("score");
  if (storedScore !== null) {
    scoreElement.textContent = `Your score is ${storedScore} out of 5.`;
  }

  submitButton.addEventListener("click", () => {
    let score = 0;
    questions.forEach((q, i) => {
      if (userAnswers[i] === q.answer) {
        score++;
      }
    });

    scoreElement.textContent = `Your score is ${score} out of 5.`;
    localStorage.setItem("score", score.toString());
  });
});
