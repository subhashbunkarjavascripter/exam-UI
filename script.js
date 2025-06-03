const questions = [
    { question: "HTML stands for?", options: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "Hyper Text Markdown Language", "None"], answer: "Hyper Text Markup Language" },
    { question: "Which CSS property controls the text size?", options: ["font-style", "text-size", "font-size", "text-style"], answer: "font-size" },
    { question: "JavaScript is a ___ language.", options: ["Compiled", "Interpreted", "Markup", "Style"], answer: "Interpreted" },
    { question: "Which tag is used for inserting an image?", options: ["img", "src", "image", "picture"], answer: "img" },
    { question: "Which symbol is used for comments in JS?", options: ["//", "<!--", "#", "**"], answer: "//" },
    { question: "CSS stands for?", options: ["Creative Style Sheets", "Colorful Style Sheets", "Cascading Style Sheets", "Computer Style Sheets"], answer: "Cascading Style Sheets" },
    { question: "Inside which HTML element do we put JavaScript?", options: ["<js>", "<scripting>", "<script>", "<javascript>"], answer: "<script>" },
    { question: "What does DOM stand for?", options: ["Document Object Model", "Data Object Model", "Design Object Model", "Document Oriented Model"], answer: "Document Object Model" },
    { question: "Which event occurs when user clicks a button?", options: ["onmouseover", "onchange", "onclick", "onload"], answer: "onclick" },
    { question: "Which is not a valid JS datatype?", options: ["String", "Boolean", "Float", "Undefined"], answer: "Float" },
  ];
  
  let currentQuestion = 0;
  let selectedAnswers = {};
  let score = 0;
  let timeLeft = 120;
  let timer;
  
  function startExam() {
    document.getElementById('main-content').innerHTML = `
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Exam In Progress</h2>
        <div id="timer" class="text-lg font-bold text-red-600">Time: ${timeLeft}s</div>
      </div>
      <div id="question-box" class="mb-6"></div>
      <div class="flex justify-between">
        <button onclick="prevQuestion()" class="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded">Previous</button>
        <button onclick="nextQuestion()" class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">Next</button>
        <button onclick="submitExam()" class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">Submit</button>
      </div>
    `;
    showQuestion();
    startTimer();
  }
  
  function showQuestion() {
    const q = questions[currentQuestion];
    const container = document.getElementById('question-box');
    let html = `<h3 class="text-lg font-medium mb-4">Q${currentQuestion + 1}: ${q.question}</h3>`;
    q.options.forEach(opt => {
      const checked = selectedAnswers[currentQuestion] === opt ? "checked" : "";
      html += `
        <label class="block mb-2">
          <input type="radio" name="option" value="${opt}" ${checked} onchange="selectAnswer('${opt}')" class="mr-2">
          ${opt}
        </label>
      `;
    });
    container.innerHTML = html;
  }
  
  function selectAnswer(opt) {
    selectedAnswers[currentQuestion] = opt;
  }
  
  function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      showQuestion();
    }
  }
  
  function prevQuestion() {
    if (currentQuestion > 0) {
      currentQuestion--;
      showQuestion();
    }
  }
  
  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      document.getElementById('timer').innerText = `Time: ${timeLeft}s`;
      if (timeLeft <= 0) {
        clearInterval(timer);
        submitExam(true);
      }
    }, 1000);
  }
  
  function submitExam(auto = false) {
    clearInterval(timer);
    score = 0;
    questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.answer) score++;
    });
  
    document.getElementById('main-content').innerHTML = `
      <h2 class="text-2xl font-bold text-center mb-4">${auto ? "Time's Up!" : "Exam Submitted!"}</h2>
      <p class="text-center text-lg mb-6">You scored <span class="font-bold">${score}</span> out of <span class="font-bold">${questions.length}</span>.</p>
      <div class="text-center">
        <button onclick="location.reload()" class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow">
          Restart Exam
        </button>
      </div>
    `;
  }
  