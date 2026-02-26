<template>
  <div class="trivial-container">
    <!-- Header con progreso y puntuación -->
    <div v-if="gameStarted && !gameFinished" class="game-header">
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

    <!-- Pantalla de inicio -->
    <div v-if="!gameStarted" class="start-screen">
      <div class="welcome-section">
        <div class="welcome-icon">🎯</div>
        <h1 class="welcome-title">Trivial de Soporte Vital</h1>
        <p class="welcome-subtitle">Pon a prueba tus conocimientos sobre SVB, RCP, DEA y técnicas de emergencia</p>

        <div class="setup-container">
          <!-- Selector de dificultad -->
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

          <!-- Selector de categorías -->
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

        <!-- Botón de inicio -->
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

    <!-- Pantalla de resultados -->
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
                <div class="stat-value">{{ correctAnswers }}/{{ questions.length }}</div>
                <div class="stat-label">Respuestas correctas</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">📊</div>
              <div class="stat-info">
                <div class="stat-value">{{ Math.round((correctAnswers / questions.length) * 100) }}%</div>
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

    <!-- Pantalla de preguntas -->
    <div v-else class="question-screen">
      <div class="question-container">
        <!-- Header de la pregunta -->
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

        <!-- Contenido de la pregunta -->
        <div class="question-body">
          <div class="question-text-container">
            <h2 class="question-text">{{ currentQuestionData.question }}</h2>
          </div>

          <!-- Opciones múltiples -->
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

          <!-- Verdadero/Falso -->
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

        <!-- Feedback y navegación -->
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

<script setup>
import { ref, computed, onMounted } from 'vue'

// Estado del juego
const gameStarted = ref(false)
const gameFinished = ref(false)
const currentQuestion = ref(0)
const score = ref(0)
const correctAnswers = ref(0)
const selectedAnswer = ref(null)
const showResult = ref(false)
const selectedDifficulty = ref('medium')
const selectedCategories = ref([])
const questionTimes = ref([])
const startTime = ref(null)
const timeLeft = ref(30)
const timerInterval = ref(null)

// Configuración
const difficulties = [
  {
    value: 'easy',
    label: 'Fácil',
    icon: '🟢',
    description: 'Preguntas básicas',
    points: 10
  },
  {
    value: 'medium',
    label: 'Medio',
    icon: '🟡',
    description: 'Preguntas intermedias',
    points: 20
  },
  {
    value: 'hard',
    label: 'Difícil',
    icon: '🔴',
    description: 'Preguntas avanzadas',
    points: 30
  }
]

const categories = [
  { id: 'introduction', name: 'Introducción al Soporte Vital', icon: '🏥' },
  { id: 'svb', name: 'Soporte Vital Básico', icon: '💚' },
  { id: 'rcp', name: 'Reanimación Cardiopulmonar', icon: '💗' },
  { id: 'dea', name: 'Desfibrilador Externo Automático', icon: '⚡' },
  { id: 'chain', name: 'Cadena de Supervivencia', icon: '🔗' },
  { id: 'special', name: 'Situaciones Especiales', icon: '🚨' }
]

// Preguntas del trivial
const questions = ref([
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

// Computed properties
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

// Métodos
const selectDifficulty = (difficulty) => {
  selectedDifficulty.value = difficulty
}

const startGame = () => {
  if (selectedCategories.value.length === 0) return
  
  // Filtrar preguntas por categorías seleccionadas
  const filteredQuestions = questions.value.filter(q => 
    selectedCategories.value.includes(q.category)
  )
  
  // Filtrar por dificultad si es necesario
  if (selectedDifficulty.value && selectedDifficulty.value !== 'all') {
    questions.value = filteredQuestions.filter(q => q.difficulty === selectedDifficulty.value)
  } else {
    questions.value = filteredQuestions
  }
  
  // Mezclar preguntas
  questions.value = shuffleArray(questions.value)

  gameStarted.value = true
  startTime.value = Date.now()

  // Iniciar temporizador
  startTimer()
}

const selectAnswer = (answer) => {
  if (showResult.value) return

  // Limpiar temporizador
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
    timerInterval.value = null
  }

  selectedAnswer.value = answer
  showResult.value = true

  // Calcular tiempo de respuesta
  const questionTime = (Date.now() - startTime.value) / 1000
  questionTimes.value.push(questionTime)

  if (isCorrect.value) {
    score.value += getPointsForDifficulty()
    correctAnswers.value++
  }
}

const nextQuestion = () => {
  // Limpiar temporizador anterior
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

    // Iniciar nuevo temporizador
    startTimer()
  } else {
    gameFinished.value = true
  }
}

const restartGame = () => {
  // Limpiar temporizador
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

const goToDocs = () => {
  // Redirigir a la documentación
  globalThis.location.href = '/'
}

const getPointsForDifficulty = () => {
  switch (selectedDifficulty.value) {
    case 'easy': return 10
    case 'medium': return 20
    case 'hard': return 30
    default: return 15
  }
}

const getCurrentCategoryName = () => {
  const category = categories.find(c => c.id === currentQuestionData.value.category)
  return category ? category.name : 'General'
}

const getDifficultyName = () => {
  const diff = difficulties.find(d => d.value === currentQuestionData.value.difficulty)
  return diff ? diff.label : 'Medio'
}

const getCorrectAnswerText = () => {
  if (currentQuestionData.value.type === 'multiple') {
    return currentQuestionData.value.options[currentQuestionData.value.correct]
  } else {
    return currentQuestionData.value.correct ? 'Verdadero' : 'Falso'
  }
}

const getScoreMessage = () => {
  const percentage = (correctAnswers.value / questions.value.length) * 100
  if (percentage >= 90) return '¡Excelente! Dominas perfectamente el soporte vital.'
  if (percentage >= 70) return '¡Muy bien! Tienes buenos conocimientos.'
  if (percentage >= 50) return 'Bien, pero puedes mejorar. Revisa la documentación.'
  return 'Necesitas estudiar más. Te recomendamos revisar los módulos básicos.'
}

const startTimer = () => {
  timeLeft.value = 30
  timerInterval.value = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      clearInterval(timerInterval.value)
      // Auto-seleccionar respuesta cuando se acaba el tiempo
      if (!showResult.value) {
        selectAnswer(null) // Respuesta incorrecta por tiempo agotado
      }
    }
  }, 1000)
}

const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Inicialización
onMounted(() => {
  // Seleccionar todas las categorías por defecto
  selectedCategories.value = categories.map(c => c.id)
})
</script>

<style scoped>
/* Variables de colores modernos */
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --success-color: #4caf50;
  --error-color: #f44336;
  --warning-color: #ff9800;
  --info-color: #2196f3;
  --surface-color: #ffffff;
  --background-color: #f8fafc;
  --text-primary: #1a202c;
  --text-secondary: #4a5568;
  --border-color: #e2e8f0;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --border-radius: 12px;
  --border-radius-lg: 16px;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.trivial-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: var(--background-color);
  min-height: 100vh;
  padding: 20px;
  color: var(--text-primary);
}

/* Header del juego con progreso */
.game-header {
  background: var(--surface-color);
  border-radius: var(--border-radius-lg);
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: var(--shadow-md);
  position: sticky;
  top: 20px;
  z-index: 10;
}

.progress-container {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: var(--border-color);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--primary-gradient);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
  min-width: 50px;
  text-align: right;
}

.progress-text .current {
  color: var(--info-color);
  font-weight: 700;
}

.progress-text .separator {
  margin: 0 4px;
}

.progress-text .total {
  color: var(--text-secondary);
}

.score-container {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.score-item {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--background-color);
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid var(--border-color);
}

.score-icon {
  font-size: 16px;
}

.score-value {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
}

/* Pantalla de inicio */
.start-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
}

.welcome-section {
  background: var(--surface-color);
  border-radius: var(--border-radius-lg);
  padding: 40px;
  box-shadow: var(--shadow-xl);
  max-width: 600px;
  width: 100%;
  text-align: center;
}

.welcome-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.welcome-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.welcome-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
  margin-bottom: 32px;
  line-height: 1.5;
}

.setup-container {
  text-align: left;
}

.config-section {
  margin-bottom: 32px;
}

.config-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Selector de dificultad */
.difficulty-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.difficulty-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  background: var(--surface-color);
  cursor: pointer;
  transition: var(--transition);
  text-align: left;
}

.difficulty-card:hover {
  border-color: var(--info-color);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.difficulty-card.active {
  border-color: var(--info-color);
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
}

.difficulty-icon {
  font-size: 20px;
  width: 32px;
  text-align: center;
}

.difficulty-info {
  flex: 1;
}

.difficulty-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 2px;
}

.difficulty-desc {
  font-size: 14px;
  color: var(--text-secondary);
}

.difficulty-points {
  font-size: 14px;
  font-weight: 700;
  color: var(--info-color);
  background: rgba(33, 150, 243, 0.1);
  padding: 4px 8px;
  border-radius: 8px;
  min-width: 40px;
  text-align: center;
}

/* Selector de categorías */
.categories-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 12px;
}

.category-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  background: var(--surface-color);
  cursor: pointer;
  transition: var(--transition);
  position: relative;
}

.category-card:hover {
  border-color: var(--success-color);
  transform: translateY(-1px);
}

.category-card.selected {
  border-color: var(--success-color);
  background: rgba(76, 175, 80, 0.05);
}

.category-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.category-icon {
  font-size: 18px;
  width: 24px;
  text-align: center;
}

.category-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}

/* Botón de inicio */
.start-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: var(--primary-gradient);
  color: white;
  border: none;
  border-radius: var(--border-radius-lg);
  padding: 16px 32px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  margin-top: 24px;
  box-shadow: var(--shadow-md);
  width: 100%;
  max-width: 300px;
}

.start-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.start-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.start-icon {
  font-size: 20px;
}

.start-text {
  font-size: 16px;
}

/* Pantalla de resultados */
.results-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
}

.results-container {
  background: var(--surface-color);
  border-radius: var(--border-radius-lg);
  padding: 40px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 100%;
  text-align: center;
}

.results-header {
  margin-bottom: 32px;
}

.results-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.results-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.final-stats {
  margin-bottom: 32px;
}

.main-score {
  margin-bottom: 24px;
}

.score-circle {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  background: var(--primary-gradient);
  border-radius: 50%;
  color: white;
  margin: 0 auto;
}

.score-number {
  font-size: 32px;
  font-weight: 700;
  line-height: 1;
}

.score-label {
  font-size: 14px;
  opacity: 0.9;
  margin-top: 4px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: var(--background-color);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
}

.stat-icon {
  font-size: 20px;
  width: 32px;
  text-align: center;
}

.stat-info {
  flex: 1;
  text-align: left;
}

.stat-value {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.2;
}

.stat-label {
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 2px;
}

.results-message {
  margin-bottom: 32px;
}

.message-text {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
}

.action-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: var(--border-radius);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  min-width: 140px;
  justify-content: center;
}

.action-btn.primary {
  background: var(--primary-gradient);
  color: white;
  box-shadow: var(--shadow-md);
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.action-btn.secondary {
  background: var(--surface-color);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.action-btn.secondary:hover {
  background: var(--background-color);
  transform: translateY(-1px);
}

.btn-icon {
  font-size: 16px;
}

.btn-text {
  font-size: 14px;
}

/* Pantalla de preguntas */
.question-screen {
  margin-top: 24px;
}

.question-container {
  background: var(--surface-color);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: var(--background-color);
  border-bottom: 1px solid var(--border-color);
}

.question-badges {
  display: flex;
  gap: 8px;
}

.question-badge {
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.question-badge.category {
  background: rgba(76, 175, 80, 0.1);
  color: var(--success-color);
}

.question-badge.difficulty {
  background: rgba(255, 152, 0, 0.1);
  color: var(--warning-color);
}

.question-timer {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--error-color);
  font-weight: 600;
}

.timer-icon {
  font-size: 14px;
}

.timer-count {
  font-size: 16px;
  min-width: 20px;
  text-align: center;
}

.question-body {
  padding: 24px;
}

.question-text-container {
  margin-bottom: 24px;
}

.question-text {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.4;
  margin: 0;
}

/* Opciones múltiples */
.options-container {
  display: grid;
  gap: 12px;
  margin-bottom: 24px;
}

.option-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  background: var(--surface-color);
  cursor: pointer;
  transition: var(--transition);
  text-align: left;
  position: relative;
}

.option-card:hover:not(.disabled) {
  border-color: var(--info-color);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.option-card.selected {
  border-color: var(--info-color);
  background: rgba(102, 126, 234, 0.05);
}

.option-card.correct {
  border-color: var(--success-color);
  background: rgba(76, 175, 80, 0.05);
}

.option-card.incorrect {
  border-color: var(--error-color);
  background: rgba(244, 67, 54, 0.05);
}

.option-card.disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.option-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--border-color);
  border-radius: 50%;
  font-size: 14px;
  font-weight: 700;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.option-card.selected .option-indicator,
.option-card.correct .option-indicator,
.option-card.incorrect .option-indicator {
  background: currentColor;
  color: white;
}

.option-text {
  flex: 1;
  font-size: 16px;
  color: var(--text-primary);
  line-height: 1.4;
}

.option-result {
  font-size: 18px;
  width: 24px;
  text-align: center;
}

/* Verdadero/Falso */
.true-false-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
}

.tf-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  background: var(--surface-color);
  cursor: pointer;
  transition: var(--transition);
  text-align: left;
}

.tf-card:hover:not(.disabled) {
  border-color: var(--info-color);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.tf-card.selected {
  border-color: var(--info-color);
  background: rgba(102, 126, 234, 0.05);
}

.tf-card.correct {
  border-color: var(--success-color);
  background: rgba(76, 175, 80, 0.05);
}

.tf-card.incorrect {
  border-color: var(--error-color);
  background: rgba(244, 67, 54, 0.05);
}

.tf-card.disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.tf-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-size: 14px;
  flex-shrink: 0;
}

.tf-text {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

/* Feedback */
.feedback-section {
  background: var(--background-color);
  border-top: 1px solid var(--border-color);
  padding: 24px;
}

.feedback-container {
  margin-bottom: 20px;
}

.feedback-correct,
.feedback-incorrect {
  display: flex;
  gap: 16px;
  padding: 16px;
  border-radius: var(--border-radius);
  align-items: flex-start;
}

.feedback-correct {
  background: rgba(76, 175, 80, 0.05);
  border-left: 4px solid var(--success-color);
}

.feedback-incorrect {
  background: rgba(244, 67, 54, 0.05);
  border-left: 4px solid var(--error-color);
}

.feedback-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.feedback-content {
  flex: 1;
}

.feedback-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: var(--text-primary);
}

.feedback-text {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
}

.feedback-correct-answer {
  font-size: 14px;
  color: var(--text-primary);
  font-weight: 600;
  margin-bottom: 8px;
}

.continue-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: var(--primary-gradient);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  width: 100%;
}

.continue-btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.continue-text {
  font-size: 14px;
}

.continue-icon {
  font-size: 16px;
}

/* Responsividad móvil */
@media (max-width: 768px) {
  .trivial-container {
    padding: 12px;
  }

  .game-header {
    padding: 16px;
    position: static;
    margin-bottom: 16px;
  }

  .progress-container {
    flex-direction: column;
    gap: 8px;
    align-items: stretch;
  }

  .score-container {
    flex-direction: column;
    gap: 8px;
  }

  .welcome-section {
    padding: 24px;
  }

  .welcome-title {
    font-size: 24px;
  }

  .welcome-subtitle {
    font-size: 14px;
  }

  .difficulty-grid {
    grid-template-columns: 1fr;
  }

  .categories-container {
    grid-template-columns: 1fr;
  }

  .results-container {
    padding: 24px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .question-header {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }

  .question-badges {
    justify-content: center;
  }

  .question-timer {
    justify-content: center;
  }

  .question-body {
    padding: 20px;
  }

  .question-text {
    font-size: 18px;
  }

  .options-container {
    gap: 8px;
  }

  .option-card {
    padding: 14px 16px;
  }

  .true-false-container {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .tf-card {
    padding: 14px 16px;
  }

  .action-buttons {
    flex-direction: column;
  }

  .action-btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .welcome-section {
    padding: 20px;
  }

  .welcome-title {
    font-size: 20px;
  }

  .question-text {
    font-size: 16px;
  }

  .option-text {
    font-size: 14px;
  }

  .tf-text {
    font-size: 14px;
  }
}

/* Animaciones */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.start-screen,
.results-screen,
.question-screen {
  animation: fadeIn 0.5s ease-out;
}

.option-card,
.tf-card,
.difficulty-card,
.category-card {
  animation: slideIn 0.3s ease-out;
}

.start-button:hover .start-icon {
  animation: pulse 1s infinite;
}


/* Estados de carga y transición */
.loading {
  opacity: 0.7;
  pointer-events: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
