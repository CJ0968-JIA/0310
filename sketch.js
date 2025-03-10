let questions = [];

function preload() {
  loadTable('questions.csv', 'csv', 'header', (table) => {
    table.rows.forEach(row => {
      questions.push({
        question: row.get('question'),
        options: row.get('options') ? row.get('options').split(';') : null,
        answer: row.get('answer'),
        type: row.get('type')
      });
    });
  });
}

let currentQuestion = 0;
let correctCount = 0;
let incorrectCount = 0;
let questionElement, options, submitButton, result, answerInput;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#778da9');
  
  textSize(30);
  
  questionElement = createElement('h2', '');
  questionElement.style('font-size', '30px');
  questionElement.position(width / 2 - questionElement.width / 2, height / 2 - 150);
  
  options = createRadio();
  options.style('font-size', '30px');
  options.position(width / 2 - options.width / 2, height / 2 - 50);
  
  submitButton = createButton('送出');
  submitButton.style('font-size', '30px');
  submitButton.position(width / 2 - submitButton.width / 2, height / 2 + 50);
  submitButton.mousePressed(checkAnswer);
  
  result = createElement('h2', '');
  result.style('font-size', '30px');
  result.position(width / 2 - result.width / 2, height / 2 + 150);
  
  answerInput = createInput();
  answerInput.style('font-size', '30px');
  answerInput.position(width / 2 - answerInput.width / 2, height / 2 - 50);
  answerInput.hide();
  
  displayQuestion();
}

function draw() {
  background('#778da9');
  displayScore();
}

function displayScore() {
  fill(255);
  textSize(20);
  textAlign(LEFT);
  text(`答對數：${correctCount}`, 20, 30);
  text(`答錯數：${incorrectCount}`, 20, 60);
  text("413730564朱珈嫻", 20, 90);
}

function displayQuestion() {
  if (currentQuestion < questions.length) {
    let q = questions[currentQuestion];
    questionElement.html(q.question);
    if (q.type === 'multiple-choice') {
      options.show();
      answerInput.hide();
      options.html('');
      q.options.forEach(option => options.option(option));
    } else if (q.type === 'fill-in-the-blank') {
      options.hide();
      answerInput.show();
      answerInput.value('');
    }
  } else {
    questionElement.html('測驗結束！');
    options.hide();
    submitButton.hide();
    result.html(`答對數：${correctCount}，答錯數：${incorrectCount}`);
  }
}

function checkAnswer() {
  if (currentQuestion < questions.length) {
    const q = questions[currentQuestion];
    let answer;
    if (q.type === 'multiple-choice') {
      answer = options.value();
    } else if (q.type === 'fill-in-the-blank') {
      answer = answerInput.value();
    }
    if (answer === q.answer) {
      correctCount++;
      result.html('答對了！');
      result.style('color', '#006d77');
    } else {
      incorrectCount++;
      result.html('答錯了！');
      result.style('color', '#ff8fab');
    }
    currentQuestion++;
    setTimeout(displayQuestion, 1000); // 1秒後顯示下一題
  }
}
