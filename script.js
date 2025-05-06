function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear before re-render
  questions.forEach((q, i) => {
    const questionDiv = document.createElement("div");
    const qText = document.createElement("p");
    qText.textContent = q.question;
    questionDiv.appendChild(qText);

    q.choices.forEach((choice) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${i}`;
      input.value = choice;

      // ✅ Set checked as HTML attribute for Cypress
      if (userAnswers[i] === choice) {
        input.setAttribute("checked", "true");
      }

      input.addEventListener("change", () => {
        userAnswers[i] = input.value;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(label);
    });

    questionsElement.appendChild(questionDiv);
  });
}
