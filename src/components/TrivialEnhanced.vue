<template>
  <div class="trivial-container">
    <div v-if="!gameStarted" class="start-screen">
      <div class="welcome-section">
        <div class="welcome-icon">🎯</div>
        <h1 class="welcome-title">Trivial de Soporte Vital</h1>
        <p class="welcome-subtitle">Pon a prueba tus conocimientos sobre SVB, RCP, DEA y técnicas de emergencia</p>

        <div class="setup-container">
          <div class="config-section">
            <h3 class="config-title">🎚️ Nivel de Dificultad</h3>
            <div class="difficulty-grid">
              <button
                v-for="diff in difficulties"
                :key="diff.value"
                @click="selectDifficulty(diff.value)"
                :class="['difficulty-card', { active: selectedDifficulty === diff.value }]"
              >
                <div class="difficulty-icon">{{ diff.icon }}</div>
                <div class="difficulty-info">
                  <div class="difficulty-name">{{ diff.label }}</div>
                  <div class="difficulty-desc">{{ diff.description }}</div>
                </div>
                <div class="difficulty-points">{{ diff.points }} pts</div>
              </button>
            </div>
          </div>

          <div class="config-section">
            <h3 class="config-title">📚 Temas a Practicar</h3>
            <div class="categories-container">
              <label
                v-for="category in categories"
                :key="category.id"
                class="category-card"
                :class="{ selected: selectedCategories.includes(category.id) }"
              >
                <input
                  type="checkbox"
                  v-model="selectedCategories"
                  :value="category.id"
                  class="category-input"
                >
                <div class="category-icon">{{ category.icon }}</div>
                <div class="category-name">{{ category.name }}</div>
              </label>
            </div>
          </div>
        </div>

        <button
          @click="startGame"
          class="start-button"
          :disabled="selectedCategories.length === 0"
        >
          <span class="start-icon">🚀</span>
          <span class="start-text">Comenzar Trivial</span>
        </button>
      </div>
    </div>

    <div v-else-if="gameFinished" class="results-screen">
      <div class="results-container">
        <div class="results-header">
          <div class="results-icon">🎉</div>
          <h2 class="results-title">¡Trivial Completado!</h2>
        </div>

        <div class="final-stats">
          <div class="main-score">
            <div class="score-circle">
              <span class="score-number">{{ score }}</span>
              <span class="score-label">Puntuación</span>
            </div>
          </div>

          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">✅</div>
              <div class="stat-info">
                <div class="stat-value">{{ correctAnswers }}/{{ gameQuestions.length }}</div>
                <div class="stat-label">Respuestas correctas</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">📊</div>
              <div class="stat-info">
                <div class="stat-value">{{ Math.round((correctAnswers / gameQuestions.length) * 100) }}%</div>
                <div class="stat-label">Precisión</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">⏱️</div>
              <div class="stat-info">
                <div class="stat-value">{{ Math.round(averageTime) }}s</div>
                <div class="stat-label">Tiempo promedio</div>
              </div>
            </div>
          </div>
        </div>

        <div class="results-message">
          <p class="message-text">{{ getScoreMessage() }}</p>
        </div>

        <div class="action-buttons">
          <button @click="restartGame" class="action-btn primary">
            <span class="btn-icon">🔄</span>
            <span class="btn-text">Jugar de Nuevo</span>
          </button>
          <button @click="goToDocs" class="action-btn secondary">
            <span class="btn-icon">📚</span>
            <span class="btn-text">Revisar Documentación</span>
          </button>
        </div>
      </div>
    </div>

    <div v-else class="question-screen">
      <div class="game-header">
        <div class="progress-container">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }"></div>
          </div>
          <div class="progress-text">
            <span class="current">{{ currentQuestion + 1 }}</span>
            <span class="separator">/</span>
            <span class="total">{{ questions.length }}</span>
          </div>
        </div>

        <div class="score-container">
          <div class="score-item">
            <span class="score-icon">🏆</span>
            <span class="score-value">{{ score }}</span>
          </div>
          <div class="score-item">
            <span class="score-icon">⭐</span>
            <span class="score-value">{{ level }}</span>
          </div>
        </div>
      </div>

      <div class="question-container">
        <div class="question-header">
          <div class="question-badges">
            <span class="question-badge category">{{ getCurrentCategoryName() }}</span>
            <span class="question-badge difficulty">{{ getDifficultyName() }}</span>
          </div>
          <div class="question-timer" v-if="!showResult">
            <span class="timer-icon">⏱️</span>
            <span class="timer-count">{{ timeLeft }}</span>
          </div>
        </div>

        <div class="question-body">
          <div class="question-text-container">
            <h2 class="question-text">{{ currentQuestionData.question }}</h2>
          </div>

          <div v-if="currentQuestionData.type === 'multiple'" class="options-container">
            <button
              v-for="(option, index) in currentQuestionData.options"
              :key="index"
              @click="selectAnswer(index)"
              :class="[
                'option-card',
                {
                  selected: selectedAnswer === index,
                  correct: showResult && index === currentQuestionData.correct,
                  incorrect: showResult && selectedAnswer === index && index !== currentQuestionData.correct,
                  disabled: showResult
                }
              ]"
            >
              <div class="option-indicator">{{ String.fromCharCode(65 + index) }}</div>
              <div class="option-text">{{ option }}</div>
              <div v-if="showResult" class="option-result">
                <span v-if="index === currentQuestionData.correct">✅</span>
                <span v-else-if="selectedAnswer === index">❌</span>
              </div>
            </button>
          </div>

          <div v-else-if="currentQuestionData.type === 'true-false'" class="true-false-container">
            <button
              @click="selectAnswer(true)"
              :class="[
                'tf-card',
                {
                  selected: selectedAnswer === true,
                  correct: showResult && currentQuestionData.correct === true,
                  incorrect: showResult && selectedAnswer === true && currentQuestionData.correct !== true,
                  disabled: showResult
                }
              ]"
            >
              <div class="tf-indicator">✅</div>
              <div class="tf-text">Verdadero</div>
            </button>

            <button
              @click="selectAnswer(false)"
              :class="[
                'tf-card',
                {
                  selected: selectedAnswer === false,
                  correct: showResult && currentQuestionData.correct === false,
                  incorrect: showResult && selectedAnswer === false && currentQuestionData.correct !== false,
                  disabled: showResult
                }
              ]"
            >
              <div class="tf-indicator">❌</div>
              <div class="tf-text">Falso</div>
            </button>
          </div>
        </div>

        <div v-if="showResult" class="feedback-section">
          <div class="feedback-container">
            <div v-if="isCorrect" class="feedback-correct">
              <div class="feedback-icon">🎉</div>
              <div class="feedback-content">
                <h3 class="feedback-title">¡Correcto!</h3>
                <p class="feedback-text">{{ currentQuestionData.explanation }}</p>
              </div>
            </div>
            <div v-else class="feedback-incorrect">
              <div class="feedback-icon">💡</div>
              <div class="feedback-content">
                <h3 class="feedback-title">Respuesta correcta:</h3>
                <p class="feedback-correct-answer">{{ getCorrectAnswerText() }}</p>
                <p class="feedback-text">{{ currentQuestionData.explanation }}</p>
              </div>
            </div>
          </div>

          <button @click="nextQuestion" class="continue-btn">
            <span class="continue-text">{{ currentQuestion < questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados' }}</span>
            <span class="continue-icon">→</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

type Difficulty = 'easy' | 'medium' | 'hard'
type QuestionType = 'multiple' | 'true-false'
type Question = {
  id: string | number
  category: string
  difficulty: Difficulty
  type: QuestionType
  question: string
  options?: string[]
  correct: number | boolean
  explanation: string
}

const questions = ref<Question[]>([
  {
    id: 1,
    category: 'introduction',
    difficulty: 'easy',
    type: 'multiple',
    question: '¿Qué significa SVB?',
    options: [
      'Soporte Vital Básico',
      'Sistema de Ventilación Básica',
      'Soporte Vascular Básico',
      'Sistema Vital de Emergencia'
    ],
    correct: 0,
    explanation: 'SVB significa Soporte Vital Básico, que incluye técnicas de emergencia para mantener las funciones vitales sin equipamiento especializado.'
  },
  {
    id: 2,
    category: 'svb',
    difficulty: 'medium',
    type: 'multiple',
    question: '¿Cuál es la frecuencia recomendada de compresiones torácicas en adultos?',
    options: [
      '80-100 por minuto',
      '100-120 por minuto',
      '120-140 por minuto',
      '60-80 por minuto'
    ],
    correct: 1,
    explanation: 'La frecuencia recomendada es de 100-120 compresiones por minuto para mantener una circulación sanguínea efectiva.'
  },
  {
    id: 3,
    category: 'rcp',
    difficulty: 'easy',
    type: 'true-false',
    question: 'Las compresiones torácicas deben interrumpirse para realizar ventilaciones.',
    correct: false,
    explanation: 'Las compresiones deben ser continuas. Solo se interrumpen brevemente para ventilaciones o cuando el DEA analiza el ritmo.'
  },
  {
    id: 4,
    category: 'dea',
    difficulty: 'medium',
    type: 'multiple',
    question: '¿Dónde se colocan los parches del DEA?',
    options: [
      'Uno en el pecho y otro en la espalda',
      'Uno debajo de la clavícula derecha y otro en el lado izquierdo del tórax',
      'Ambos en el centro del pecho',
      'Uno en el abdomen y otro en el pecho'
    ],
    correct: 1,
    explanation: 'Un parche va debajo de la clavícula derecha cerca del esternón, y el otro en el lado izquierdo del tórax debajo de la axila.'
  },
  {
    id: 5,
    category: 'chain',
    difficulty: 'hard',
    type: 'multiple',
    question: '¿Cuál es el primer eslabón de la cadena de supervivencia?',
    options: [
      'Activación precoz del SEM',
      'RCP precoz',
      'Desfibrilación precoz',
      'Cuidados post-reanimación'
    ],
    correct: 0,
    explanation: 'El primer eslabón es la activación precoz del Sistema de Emergencias Médicas (SEM), que debe realizarse inmediatamente al reconocer una PCR.'
  },
  {
    id: 6,
    category: 'svb',
    difficulty: 'easy',
    type: 'multiple',
    question: '¿Cuál es la profundidad recomendada de las compresiones torácicas en adultos?',
    options: [
      '3-4 cm',
      '5-6 cm',
      '7-8 cm',
      '2-3 cm'
    ],
    correct: 1,
    explanation: 'La profundidad recomendada es de 5-6 cm para asegurar una compresión efectiva del corazón.'
  },
  {
    id: 7,
    category: 'special',
    difficulty: 'medium',
    type: 'true-false',
    question: 'En caso de atragantamiento, siempre se debe realizar la maniobra de Heimlich.',
    correct: false,
    explanation: 'La maniobra de Heimlich se usa en adultos y niños mayores. En lactantes se usan técnicas diferentes como golpes en la espalda y compresiones torácicas.'
  },
  {
    id: 8,
    category: 'introduction',
    difficulty: 'hard',
    type: 'multiple',
    question: '¿Cuál es la ventana de tiempo crítica para iniciar SVB?',
    options: [
      '0-2 minutos',
      '0-4 minutos',
      '0-6 minutos',
      '0-8 minutos'
    ],
    correct: 1,
    explanation: 'La ventana crítica es de 0-4 minutos. Después de este tiempo, las probabilidades de supervivencia disminuyen significativamente.'
  },
  {
    id: 9,
    category: 'rcp',
    difficulty: 'medium',
    type: 'multiple',
    question: '¿Cuál es la relación compresiones-ventilaciones en RCP básica?',
    options: [
      '15:2',
      '30:2',
      '5:1',
      '10:2'
    ],
    correct: 1,
    explanation: 'La relación estándar es 30 compresiones por cada 2 ventilaciones en RCP básica.'
  },
  {
    id: 10,
    category: 'dea',
    difficulty: 'easy',
    type: 'true-false',
    question: 'El DEA puede ser usado por cualquier persona con formación básica.',
    correct: true,
    explanation: 'Sí, el DEA está diseñado para ser usado por personal no médico con formación básica, ya que da instrucciones de voz claras.'
  }
])
const gameStarted = ref(false)
const gameFinished = ref(false)
const currentQuestion = ref(0)
const score = ref(0)
const correctAnswers = ref(0)
const selectedAnswer = ref<number | boolean | null>(null)
const showResult = ref(false)
const selectedDifficulty = ref('medium')
const selectedCategories = ref<string[]>([])
const questionTimes = ref<number[]>([])
const startTime = ref<number | null>(null)
const timeLeft = ref(30)
const timerInterval = ref<ReturnType<typeof setInterval> | null>(null)

const difficulties = [
  { value: 'easy', label: 'Fácil', icon: '🟢', description: 'Preguntas básicas', points: 10 },
  { value: 'medium', label: 'Medio', icon: '🟡', description: 'Preguntas intermedias', points: 20 },
  { value: 'hard', label: 'Difícil', icon: '🔴', description: 'Preguntas avanzadas', points: 30 }
]

const categories = [
  { id: 'introduction', name: 'Introducción al Soporte Vital', icon: '🏥' },
  { id: 'svb', name: 'Soporte Vital Básico', icon: '💚' },
  { id: 'rcp', name: 'Reanimación Cardiopulmonar', icon: '💗' },
  { id: 'dea', name: 'Desfibrilador Externo Automático', icon: '⚡' },
  { id: 'chain', name: 'Cadena de Supervivencia', icon: '🔗' },
  { id: 'special', name: 'Situaciones Especiales', icon: '🚨' }
]

const currentQuestionData = computed(() => questions.value[currentQuestion.value])
const isCorrect = computed(() => selectedAnswer.value === currentQuestionData.value.correct)
const level = computed(() => {
  if (score.value < 100) return 'Principiante'
  if (score.value < 200) return 'Intermedio'
  if (score.value < 300) return 'Avanzado'
  return 'Experto'
})
const averageTime = computed(() => {
  if (questionTimes.value.length === 0) return 0
  return questionTimes.value.reduce((a, b) => a + b, 0) / questionTimes.value.length
})

function selectDifficulty(difficulty: string) {
  selectedDifficulty.value = difficulty
}

async function startGame() {
  if (selectedCategories.value.length === 0) return

  const filtered = questions.value.filter(q =>
    selectedCategories.value.includes(q.category) &&
    (selectedDifficulty.value === 'all' || q.difficulty === selectedDifficulty.value)
  )

  questions.value = shuffleArray(filtered)

  gameStarted.value = true
  startTime.value = Date.now()
  startTimer()
}

async function selectAnswer(answer: number | boolean) {
  if (showResult.value) return

  if (timerInterval.value) {
    clearInterval(timerInterval.value)
    timerInterval.value = null
  }

  selectedAnswer.value = answer
  showResult.value = true

  const questionTime = (Date.now() - (startTime.value || 0)) / 1000
  questionTimes.value.push(questionTime)

  const correct = isCorrect.value
  if (correct) {
    score.value += getPointsForDifficulty()
    correctAnswers.value++
  }
}

async function nextQuestion() {
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
    timerInterval.value = null
  }

  if (currentQuestion.value < questions.value.length - 1) {
    currentQuestion.value++
    selectedAnswer.value = null
    showResult.value = false
    timeLeft.value = 30
    startTime.value = Date.now()
    startTimer()
  } else {
    gameFinished.value = true
  }
}

function restartGame() {
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
    timerInterval.value = null
  }

  gameStarted.value = false
  gameFinished.value = false
  currentQuestion.value = 0
  score.value = 0
  correctAnswers.value = 0
  selectedAnswer.value = null
  showResult.value = false
  questionTimes.value = []
  selectedCategories.value = []
  timeLeft.value = 30
}

function goToDocs() {
  globalThis.location.href = '/'
}

function getPointsForDifficulty(): number {
  switch (selectedDifficulty.value) {
    case 'easy': return 10
    case 'medium': return 20
    case 'hard': return 30
    default: return 15
  }
}

function getCurrentCategoryName(): string {
  const category = categories.find(c => c.id === currentQuestionData.value?.category)
  return category ? category.name : 'General'
}

function getDifficultyName(): string {
  const diff = difficulties.find(d => d.value === currentQuestionData.value?.difficulty)
  return diff ? diff.label : 'Medio'
}

function getCorrectAnswerText(): string {
  if (currentQuestionData.value.type === 'multiple') {
    return currentQuestionData.value.options?.[currentQuestionData.value.correct as number] || ''
  } else {
    return currentQuestionData.value.correct ? 'Verdadero' : 'Falso'
  }
}

function getScoreMessage(): string {
  const percentage = (correctAnswers.value / gameQuestions.value.length) * 100
  if (percentage >= 90) return '¡Excelente! Dominas perfectamente el soporte vital.'
  if (percentage >= 70) return '¡Muy bien! Tienes buenos conocimientos.'
  if (percentage >= 50) return 'Bien, pero puedes mejorar. Revisa la documentación.'
  return 'Necesitas estudiar más. Te recomendamos revisar los módulos básicos.'
}

function startTimer() {
  timeLeft.value = 30
  timerInterval.value = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      clearInterval(timerInterval.value!)
      if (!showResult.value) {
        selectAnswer(null)
      }
    }
  }, 1000)
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

onMounted(() => {
  selectedCategories.value = categories.map(c => c.id)
})

onUnmounted(() => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
  }
})
</script>

<style scoped src="./trivial-styles.css"></style>
