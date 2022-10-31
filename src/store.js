import { reactive } from 'vue';
import { shuffle } from './helpers';

export const store = reactive({
  score: 0,
  questionCount: 0,
  quizEnded: false,
  data: null,
  options: null,
  loading: true,
  currentQuestion: 0,
  step: 0,
  showAnswer: false,
  incrementScore() {
    this.score++;
  },
  restartQuiz() {
    this.score = 0;
    this.step = 0;
    this.questionCount = 0;
    this.quizEnded = false;
    this.data = null;
    this.loading = true;
  },
  setQuestionCount(count) {
    this.questionCount = count;
  },
  getData() {
    this.loading = true;
    fetch(
      `http://localhost:8080/QuestionsByQuiz/${this.options.category}`
    )
      .then((res) => res.json())
      .then((res) =>{
        console.log(res)
        this.data = res;
        this.currentQuestion = 0;
        this.showAnswer = false;
        this.questionCount = res.length;
        this.loading = false;
      });
  },
  checkAnswer(answer) {
    if (this.data[this.currentQuestion].correctAnswer == answer) {
      this.incrementScore();
      this.showAnswer = true;
      this.data[this.currentQuestion].guessedRight = true;
      return;
    }
    this.data[this.currentQuestion].guessedRight = false;
    this.showAnswer = true;
  },
  getNextQuestion() {
    if (this.currentQuestion >= this.data.length - 1) {
      this.quizEnded = true;
      this.step = 2;
    }
    this.currentQuestion += 1;
    this.showAnswer = false;
  },
  startQuiz(payload) {
    this.options = payload;
    this.step = 1;
  },
});
