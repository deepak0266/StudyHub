// Wait for the DOM to be fully loaded before running any scripts
document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Functionality
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Check local storage for theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    themeToggle.checked = savedTheme === 'dark';
  }

  // Toggle theme on button click
  themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
      body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      body.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  });

  // Navigation Bar Links
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('.section');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSectionId = link.getAttribute('href').substring(1);

      // Remove active classes
      navLinks.forEach(l => l.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));

      // Add active classes
      link.classList.add('active');
      const targetSection = document.getElementById(targetSectionId);
      if (targetSection) {
        targetSection.classList.add('active');
        // Update body class for section-specific styling
        body.className = targetSectionId;
      }
    });
  });

  // Feature Card Interactions
  const featureCards = document.querySelectorAll('.feature-card');
  const featureFragment = document.getElementById('feature-fragment');

  featureCards.forEach(card => {
    card.addEventListener('click', () => {
      const target = card.getAttribute('data-target');
      loadFeature(target);

      // Scroll to the feature fragment
      featureFragment.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Fun message interaction
  const funMessage = document.querySelector('.fun-message');
  const originalText = funMessage.textContent;
  const hoverText = "P.S. This is my 2nd year project, so don't mind the simplicity. Hope you like it! 😄🎉";

  funMessage.addEventListener('mouseenter', () => {
    funMessage.textContent = hoverText;
  });

  funMessage.addEventListener('mouseleave', () => {
    funMessage.textContent = originalText;
  });

  // Initialize with study section and first feature
  document.getElementById('study').classList.add('active');
  loadFeature('text-to-pdf');
});

// Feature Loading Function
function loadFeature(target) {
  const featureFragment = document.getElementById('feature-fragment');
  if (!featureFragment) return;

  featureFragment.innerHTML = '';

  switch (target) {
    case 'text-to-pdf':
      featureFragment.innerHTML = `
        <div class="feature-content">
          <h3>Text to PDF Converter</h3>
          <textarea id="text-input" placeholder="Enter your notes here..."></textarea>
          <button id="convert-to-pdf" class="btn">Convert to PDF</button>
        </div>
      `;
      setupTextToPdf();
      break;

    case 'mcq-quiz':
      featureFragment.innerHTML = `
        <div class="feature-content">
          <h3>MCQ Quiz Generator</h3>
          <div id="quiz-container">
            <div id="quiz"></div>
            <button id="submit-quiz" class="btn">Submit Quiz</button>
            <div id="quiz-results"></div>
          </div>
        </div>
      `;
      setupMCQQuiz();
      break;

    case 'flashcards':
      featureFragment.innerHTML = `
        <div class="feature-content">
          <h3>Flashcards</h3>
          <div id="flashcard-container">
            <div id="flashcard">
              <div class="flashcard-front">Click to Flip</div>
              <div class="flashcard-back">Answer Here</div>
            </div>
            <button id="next-flashcard" class="btn">Next Flashcard</button>
          </div>
        </div>
      `;
      setupFlashcards();
      break;

    case 'flashcard-generator':
      featureFragment.innerHTML = `
            <div class="feature-content">
                <h3>Flashcard Generator</h3>
                <div class="flashcard-creator">
                    <div class="flashcard-input">
                        <textarea placeholder="Enter question..."></textarea>
                        <textarea placeholder="Enter answer..."></textarea>
                    </div>
                    <button class="btn" id="add-flashcard">Add Flashcard</button>
                    <div id="flashcards-list"></div>
                </div>
            </div>
        `;
      setupFlashcardGenerator();
      break;

    case 'pomodoro-timer':
      featureFragment.innerHTML = `
            <div class="feature-content">
                <h3>Pomodoro Timer</h3>
                <div class="pomodoro-container">
                    <div class="timer-display">25:00</div>
                    <div class="timer-controls">
                        <button class="btn" id="start-timer">Start</button>
                        <button class="btn" id="pause-timer">Pause</button>
                        <button class="btn" id="reset-timer">Reset</button>
                    </div>
                </div>
            </div>
        `;
      setupPomodoroTimer();
      break;

    case 'sticky-notes':
      featureFragment.innerHTML = `
            <div class="feature-content">
                <h3>Sticky Notes</h3>
                <button class="btn" id="add-note">Add Note</button>
                <div class="sticky-notes-container" id="notes-container"></div>
            </div>
        `;
      setupStickyNotes();
      break;

    case 'math-solver':
      featureFragment.innerHTML = `
            <div class="feature-content">
                <h3>Math Solver</h3>
                <div class="math-solver-container">
                    <select id="equation-type">
                        <option value="quadratic">Quadratic Equation (ax² + bx + c = 0)</option>
                        <option value="linear">Linear Equation (ax + b = 0)</option>
                    </select>
                    <input type="text" class="equation-input" id="equation-input" 
                           placeholder="Enter equation (e.g., 1,2,1 for x² + 2x + 1 = 0)">
                    <button class="btn" id="solve-equation">Solve</button>
                    <div id="solution-output"></div>
                </div>
            </div>
        `;
      setupMathSolver();
      break;

    case 'unit-converter':
      featureFragment.innerHTML = `
            <div class="feature-content">
                <h3>Unit Converter</h3>
                <div class="converter-container">
                    <select id="conversion-type">
                        <option value="length">Length</option>
                        <option value="weight">Weight</option>
                        <option value="temperature">Temperature</option>
                    </select>
                    <input type="number" class="converter-input" id="from-value">
                    <select id="from-unit"></select>
                    <select id="to-unit"></select>
                    <div id="conversion-result"></div>
                </div>
            </div>
        `;
      setupUnitConverter();
      break;

    case 'dictionary':
      featureFragment.innerHTML = `
            <div class="feature-content">
                <h3>Dictionary</h3>
                <div class="dictionary-container">
                    <input type="text" id="word-input" placeholder="Enter a word...">
                    <button class="btn" id="search-word">Search</button>
                    <div id="word-info" class="word-info"></div>
                </div>
            </div>
        `;
      setupDictionary();
      break;

    case 'markdown-editor':
      featureFragment.innerHTML = `
            <div class="feature-content">
                <h3>Markdown Editor</h3>
                <div class="markdown-container">
                    <textarea id="markdown-input" class="markdown-input" 
                            placeholder="Write your markdown here..."></textarea>
                    <div id="markdown-preview" class="markdown-preview"></div>
                </div>
                <button class="btn" id="download-md">Download</button>
            </div>
        `;
      setupMarkdownEditor();
      break;

    case 'speech-to-text':
      featureFragment.innerHTML = `
            <div class="feature-content">
                <h3>Voice Notes</h3>
                <div class="voice-notes-container">
                    <button class="btn" id="start-recording">Start Recording</button>
                    <textarea id="voice-output" class="voice-input" 
                            placeholder="Your voice will be converted to text here..." 
                            readonly></textarea>
                </div>
            </div>
        `;
      setupSpeechToText();
      break;
  }
}

// Text to PDF Converter Setup
function setupTextToPdf() {
  const convertButton = document.getElementById('convert-to-pdf');
  if (!convertButton) return;

  convertButton.addEventListener('click', () => {
    const text = document.getElementById('text-input')?.value;
    if (!text?.trim()) {
      alert('Please enter some text!');
      return;
    }

    try {
      const doc = new jspdf.jsPDF();
      const lines = doc.splitTextToSize(text, 180);
      doc.setFontSize(12);
      doc.text(15, 20, lines);
      doc.save('StudyHub-Notes.pdf');
    } catch (error) {
      alert('Error creating PDF. Please make sure jsPDF is properly loaded.');
      console.error('PDF generation error:', error);
    }
  });
}


// MCQ Quiz Setup
function setupMCQQuiz() {
  const quizData = [
    {
      question: "What is the time complexity of Binary Search?",
      options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
      answer: "O(log n)"
    },
    {
      question: "Which data structure uses LIFO?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      answer: "Stack"
    },
    {
      question: "What is encapsulation in OOP?",
      options: [
        "Binding data and functions together",
        "Inheriting properties",
        "Creating objects",
        "Polymorphism"
      ],
      answer: "Binding data and functions together"
    }
  ];

  const quizContainer = document.getElementById('quiz');
  const quizResults = document.getElementById('quiz-results');
  const submitButton = document.getElementById('submit-quiz');

  if (!quizContainer || !quizResults || !submitButton) return;

  let currentQuestion = 0;

  function loadQuiz() {
    const currentQuizData = quizData[currentQuestion];
    quizContainer.innerHTML = `
      <div class="question">${currentQuizData.question}</div>
      ${currentQuizData.options.map((option, index) => `
        <div class="option">
          <input type="radio" name="quiz" id="option${index}" value="${option}">
          <label for="option${index}">${option}</label>
        </div>
      `).join('')}
    `;
  }

  function showResults() {
    const answers = Array.from(document.querySelectorAll('input[type="radio"]:checked'))
      .map(input => input.value);

    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === quizData[index].answer) score++;
    });

    quizResults.innerHTML = `
      <h3>Your Score: ${score}/${quizData.length}</h3>
      <div class="answers-review">
        ${quizData.map((question, index) => `
          <div class="review-item ${answers[index] === question.answer ? 'correct' : 'incorrect'}">
            <p>${question.question}</p>
            <p>Your answer: ${answers[index] || 'Not answered'}</p>
            <p>Correct answer: ${question.answer}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  submitButton.addEventListener('click', showResults);
  loadQuiz();
}

// Flashcards Setup
function setupFlashcards() {
  const flashcards = [
    { front: "What is the capital of France?", back: "Paris" },
    { front: "What is 2 + 2?", back: "4" },
    { front: "Who wrote 'Romeo and Juliet'?", back: "Shakespeare" }
  ];

  const flashcardElement = document.getElementById('flashcard');
  const nextButton = document.getElementById('next-flashcard');

  if (!flashcardElement || !nextButton) return;

  let currentFlashcard = 0;
  const flashcardFront = flashcardElement.querySelector('.flashcard-front');
  const flashcardBack = flashcardElement.querySelector('.flashcard-back');

  function loadFlashcard() {
    if (flashcardFront && flashcardBack) {
      flashcardFront.textContent = flashcards[currentFlashcard].front;
      flashcardBack.textContent = flashcards[currentFlashcard].back;
    }
  }

  flashcardElement.addEventListener('click', () => {
    flashcardElement.classList.toggle('flipped');
  });

  nextButton.addEventListener('click', () => {
    currentFlashcard = (currentFlashcard + 1) % flashcards.length;
    loadFlashcard();
    if (flashcardElement.classList.contains('flipped')) {
      flashcardElement.classList.remove('flipped');
    }
  });

  loadFlashcard();
}

// Flashcard Generator Setup
function setupFlashcardGenerator() {
  const addButton = document.getElementById('add-flashcard');
  const flashcardsList = document.getElementById('flashcards-list');
  let flashcards = JSON.parse(localStorage.getItem('flashcards') || '[]');

  function updateFlashcardsList() {
    flashcardsList.innerHTML = flashcards.map((card, index) => `
          <div class="flashcard">
              <p><strong>Q:</strong> ${card.question}</p>
              <p><strong>A:</strong> ${card.answer}</p>
              <button class="btn btn-danger" onclick="deleteFlashcard(${index})">Delete</button>
          </div>
      `).join('');
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
  }

  window.deleteFlashcard = function (index) {
    flashcards.splice(index, 1);
    updateFlashcardsList();
  };

  addButton.addEventListener('click', () => {
    const [questionInput, answerInput] = document.querySelectorAll('.flashcard-input textarea');
    if (!questionInput.value.trim() || !answerInput.value.trim()) return;

    flashcards.push({
      question: questionInput.value,
      answer: answerInput.value
    });

    questionInput.value = '';
    answerInput.value = '';
    updateFlashcardsList();
  });

  updateFlashcardsList();
}

// Pomodoro Timer Setup
function setupPomodoroTimer() {
  let timeLeft = 25 * 60; // 25 minutes in seconds
  let timerId = null;
  const display = document.querySelector('.timer-display');
  const startBtn = document.getElementById('start-timer');
  const pauseBtn = document.getElementById('pause-timer');
  const resetBtn = document.getElementById('reset-timer');

  function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  startBtn.addEventListener('click', () => {
    if (timerId) return;
    timerId = setInterval(() => {
      timeLeft--;
      updateDisplay();
      if (timeLeft === 0) {
        clearInterval(timerId);
        timerId = null;
        alert('Time to take a break!');
      }
    }, 1000);
  });

  pauseBtn.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  });

  resetBtn.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    timeLeft = 25 * 60;
    updateDisplay();
  });
}

// Sticky Notes Setup
function setupStickyNotes() {
  const addNoteButton = document.getElementById('add-note');
  const notesContainer = document.getElementById('notes-container');

  addNoteButton.addEventListener('click', () => {
    const note = document.createElement('div');
    note.className = 'sticky-note';
    note.contentEditable = true;
    note.textContent = 'New Note';
    notesContainer.appendChild(note);
  });
}

// Math Solver Setup
function setupMathSolver() {
  const equationType = document.getElementById('equation-type');
  const equationInput = document.getElementById('equation-input');
  const solveButton = document.getElementById('solve-equation');
  const solutionOutput = document.getElementById('solution-output');

  solveButton.addEventListener('click', () => {
    const type = equationType.value;
    const input = equationInput.value.trim();

    if (!input) {
      alert('Please enter the equation coefficients.');
      return;
    }

    const coefficients = input.split(',').map(Number);

    if (type === 'quadratic') {
      const [a, b, c] = coefficients;
      const discriminant = b * b - 4 * a * c;
      if (discriminant < 0) {
        solutionOutput.textContent = 'No real roots.';
      } else {
        const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        solutionOutput.textContent = `Roots: ${root1.toFixed(2)}, ${root2.toFixed(2)}`;
      }
    } else if (type === 'linear') {
      const [a, b] = coefficients;
      const root = -b / a;
      solutionOutput.textContent = `Root: ${root.toFixed(2)}`;
    }
  });
}

// Unit Converter Setup
function setupUnitConverter() {
  const conversionType = document.getElementById('conversion-type');
  const fromUnit = document.getElementById('from-unit');
  const toUnit = document.getElementById('to-unit');
  const fromValue = document.getElementById('from-value');
  const conversionResult = document.getElementById('conversion-result');

  const units = {
    length: ['meters', 'kilometers', 'miles', 'feet'],
    weight: ['grams', 'kilograms', 'pounds', 'ounces'],
    temperature: ['celsius', 'fahrenheit', 'kelvin']
  };

  function populateUnits() {
    const type = conversionType.value;
    fromUnit.innerHTML = units[type].map(unit => `<option value="${unit}">${unit}</option>`).join('');
    toUnit.innerHTML = units[type].map(unit => `<option value="${unit}">${unit}</option>`).join('');
  }

  conversionType.addEventListener('change', populateUnits);
  populateUnits();

  function convert() {
    const type = conversionType.value;
    const from = fromUnit.value;
    const to = toUnit.value;
    const value = parseFloat(fromValue.value);

    if (isNaN(value)) {
      conversionResult.textContent = 'Please enter a valid number.';
      return;
    }

    let result;
    if (type === 'length') {
      result = convertLength(value, from, to);
    } else if (type === 'weight') {
      result = convertWeight(value, from, to);
    } else if (type === 'temperature') {
      result = convertTemperature(value, from, to);
    }

    conversionResult.textContent = `${value} ${from} = ${result.toFixed(2)} ${to}`;
  }

  fromValue.addEventListener('input', convert);
  fromUnit.addEventListener('change', convert);
  toUnit.addEventListener('change', convert);

  function convertLength(value, from, to) {
    const conversions = {
      meters: 1,
      kilometers: 0.001,
      miles: 0.000621371,
      feet: 3.28084
    };
    return value * (conversions[to] / conversions[from]);
  }

  function convertWeight(value, from, to) {
    const conversions = {
      grams: 1,
      kilograms: 0.001,
      pounds: 0.00220462,
      ounces: 0.035274
    };
    return value * (conversions[to] / conversions[from]);
  }

  function convertTemperature(value, from, to) {
    if (from === to) return value;
    if (from === 'celsius') {
      if (to === 'fahrenheit') return (value * 9 / 5) + 32;
      if (to === 'kelvin') return value + 273.15;
    } else if (from === 'fahrenheit') {
      if (to === 'celsius') return (value - 32) * 5 / 9;
      if (to === 'kelvin') return (value - 32) * 5 / 9 + 273.15;
    } else if (from === 'kelvin') {
      if (to === 'celsius') return value - 273.15;
      if (to === 'fahrenheit') return (value - 273.15) * 9 / 5 + 32;
    }
    return value;
  }
}

// Dictionary Setup
function setupDictionary() {
  const wordInput = document.getElementById('word-input');
  const searchButton = document.getElementById('search-word');
  const wordInfo = document.getElementById('word-info');

  searchButton.addEventListener('click', async () => {
    const word = wordInput.value.trim();
    if (!word) {
      alert('Please enter a word to search.');
      return;
    }

    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await response.json();
      if (data.title === 'No Definitions Found') {
        wordInfo.textContent = 'No definitions found for this word.';
      } else {
        const meanings = data[0].meanings.map(meaning => `
          <p><strong>${meaning.partOfSpeech}</strong>: ${meaning.definitions[0].definition}</p>
        `).join('');
        wordInfo.innerHTML = meanings;
      }
    } catch (error) {
      wordInfo.textContent = 'Error fetching word information.';
    }
  });
}

// Mark Down Editor Setup
function setupMarkdownEditor() {
  const markdownInput = document.getElementById('markdown-input');
  const markdownPreview = document.getElementById('markdown-preview');
  const downloadButton = document.getElementById('download-md');

  markdownInput.addEventListener('input', () => {
    markdownPreview.innerHTML = marked.parse(markdownInput.value);
  });

  downloadButton.addEventListener('click', () => {
    const blob = new Blob([markdownInput.value], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'markdown-file.md';
    a.click();
    URL.revokeObjectURL(url);
  });
}

// Speech to Text Setup
function setupSpeechToText() {
  const startRecordingButton = document.getElementById('start-recording');
  const voiceOutput = document.getElementById('voice-output');

  let recognition;
  if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      voiceOutput.value = transcript;
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };
  } else {
    alert('Speech recognition not supported in this browser.');
    return;
  }

  startRecordingButton.addEventListener('click', () => {
    if (recognition) {
      recognition.start();
    }
  });
}


// Load Game Function
function loadGame(gameName) {
 
  const initialMessage = document.getElementById('initialMessage');
  const gameContent = document.getElementById('gameContent');

  // Hide initial message and show game content
  initialMessage.style.display = 'none';
  gameContent.style.display = 'block';
  
  // Clear previous game content
  gameContent.innerHTML = '';
  
  if (gameName === 'snake') {
    // Create Snake Game
    gameContent.innerHTML = '<p>Snake Game is loading...</p>';
    const canvas = document.createElement('canvas');
    canvas.id = 'snakeCanvas';
    canvas.width = 400;
    canvas.height = 400;
    gameContent.appendChild(canvas);
    
    // Start Snake Game
    startSnakeGame(canvas);
  } else if (gameName === '2048') {
    // Add 2048 Game Later
    gameContent.innerHTML = '<p>2048 Game Coming Soon!</p>';
  }
  else if (gameName === 'tetris') {
    gameContent.innerHTML = '<p>Tetris Game Coming Soon!</p>';
    // Add Tetris Game logic here
  } else if (gameName === 'flappy') {
    gameContent.innerHTML = '<p>Flappy Bird Coming Soon!</p>';
    // Add Flappy Bird Game logic here
  }
}

// Snake Game Implementation
function startSnakeGame(canvas) {
  const ctx = canvas.getContext('2d');
  const box = 20; // Size of each box in the grid
  let snake = [{ x: 9 * box, y: 10 * box }]; // Initial snake position
  let food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
  let direction = 'RIGHT';
  let score = 0;

  // Draw the game
  function draw() {
    // Clear the canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    ctx.fillStyle = 'lime';
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, box, box));

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    // Display the score
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);
  }

  // Update the game state
  function update() {
    // Move the snake
    let head = { x: snake[0].x, y: snake[0].y };
    if (direction === 'RIGHT') head.x += box;
    if (direction === 'LEFT') head.x -= box;
    if (direction === 'UP') head.y -= box;
    if (direction === 'DOWN') head.y += box;

    // Check for collisions
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
      clearInterval(gameLoop);
      alert(`Game Over! Your score is ${score}`);
      return;
    }

    // Add new head to the snake
    snake.unshift(head);

    // Check if snake eats the food
    if (head.x === food.x && head.y === food.y) {
      score++;
      food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
    } else {
      // Remove the tail
      snake.pop();
    }
  }

  // Handle keyboard input
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
    if (e.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (e.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (e.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
  });

  // Game loop
  const gameLoop = setInterval(() => {
    update();
    draw();
  }, 100);
}