<template>
  <div class="tv-app">
    <!-- ═══════════════ PANTALLA DE INICIO ═══════════════ -->
    <div v-if="screen === 'start'" class="tv-start full-width-home">
      <div class="hero-bg-glow"></div>
      <div class="hero-content tv-start-hero-content">
        <!-- Left column: Hero -->
        <div class="hero-text-side">
          <h1 class="hero-title">
            <span class="hero-top">🎓 Modo Entrenamiento</span>
            <span class="hero-main">Simulador Clínico SVA 2025</span>
            <div class="hero-divider"></div>
          </h1>
          <p class="hero-tagline">Pon a prueba tu toma de decisiones bajo presión con escenarios clínicos basados en las últimas Recomendaciones ERC.</p>
          
          <div class="hero-actions">
            <!-- Start Button -->
            <button
              class="hero-btn-primary"
              :disabled="selectedCategories.length === 0"
              @click="startGame"
            >
              <span>🚀 Iniciar Simulación</span>
            </button>
          </div>
          
          <!-- Stats / floaters -->
          <div class="tv-start__info" v-if="selectedCategories.length > 0">
            <div class="tv-info-badge">
              <span class="tv-info-icon">📊</span>
              <span class="tv-info-text"><b>{{ availableQuestionCount }}</b> Casos Activos</span>
            </div>
            <div class="tv-info-badge">
              <span class="tv-info-icon">⏱️</span>
              <span class="tv-info-text">Eval. Continua</span>
            </div>
          </div>
        </div>

        <!-- Right column: Configuration (Modes + Categories) -->
        <div class="hero-image-side config-side">
          <div class="bento-card featured config-card">
            
            <div class="config-section">
              <h3 class="config-title">1. Selecciona Modo de Operación</h3>
              <div class="tv-modes__grid">
                <button
                  v-for="mode in gameModes"
                  :key="mode.id"
                  class="tv-mode-card"
                  :class="{ 'tv-mode-card--active': selectedMode === mode.id }"
                  @click="selectedMode = mode.id"
                >
                  <div class="tv-mode-card__header">
                    <span class="tv-mode-card__icon">{{ mode.icon }}</span>
                    <span class="tv-mode-card__name">{{ mode.name }}</span>
                  </div>
                  <span class="tv-mode-card__desc">{{ mode.description }}</span>
                </button>
              </div>
            </div>
            
            <div class="config-divider"></div>
            
            <div class="config-section">
              <div class="tv-categories__header">
                <h3 class="config-title">2. Temario Específico</h3>
                <button class="tv-categories__toggle" @click="toggleAllCategories">
                  {{ allSelected ? 'Deseleccionar todos' : 'Marcar todos' }}
                </button>
              </div>
              
              <div class="tv-categories__grid">
                <label
                  v-for="cat in categoriesList"
                  :key="cat.id"
                  class="tv-cat-switch"
                  :class="{ 'tv-cat-switch--selected': selectedCategories.includes(cat.id) }"
                >
                  <input
                    type="checkbox"
                    v-model="selectedCategories"
                    :value="cat.id"
                    class="tv-cat-switch__input"
                  />
                  <span class="tv-cat-switch__label">
                    <span class="tv-cat-switch__icon">{{ cat.icon }}</span>
                    <span class="tv-cat-switch__name">{{ cat.name }}</span>
                  </span>
                  <div class="tv-cat-switch__toggle"></div>
                </label>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>

    <!-- ═══════════════ PANTALLA DE JUEGO ═══════════════ -->
    <div v-else-if="screen === 'game'" class="tv-game">
      <!-- Header -->
      <div class="tv-hud">
        <div class="tv-hud__progress">
          <div class="tv-hud__bar">
            <div class="tv-hud__bar-fill" :style="{ width: progressPercent + '%' }"></div>
          </div>
          <span class="tv-hud__counter">{{ currentIndex + 1 }} / {{ gameQuestions.length }}</span>
        </div>
        <div class="tv-hud__stats">
          <div class="tv-hud__stat">
            <span>🏆</span>
            <span class="tv-hud__stat-val">{{ score }}</span>
          </div>
          <div class="tv-hud__stat">
            <span>🔥</span>
            <span class="tv-hud__stat-val">{{ streak }}</span>
          </div>
          <!-- Timer (Contrarreloj mode) -->
          <div v-if="selectedMode === 'rush'" class="tv-hud__stat tv-hud__stat--timer">
            <span>⏱️</span>
            <span class="tv-hud__stat-val">{{ formatTime(globalTimeLeft) }}</span>
          </div>
        </div>
      </div>

      <!-- Question Card -->
      <div class="tv-question" :class="{ 'tv-question--reveal': showResult }">
        <!-- Timer Circle (Classic & Marathon) -->
        <div v-if="selectedMode !== 'rush' && !showResult" class="tv-timer">
          <svg class="tv-timer__svg" viewBox="0 0 36 36">
            <path
              class="tv-timer__bg"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              class="tv-timer__ring"
              :class="{ 'tv-timer__ring--danger': timeLeft <= 5 }"
              :stroke-dasharray="`${timerPercent}, 100`"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span class="tv-timer__text" :class="{ 'tv-timer__text--danger': timeLeft <= 5 }">{{ timeLeft }}</span>
        </div>

        <!-- Badges -->
        <div class="tv-question__badges">
          <span class="tv-badge tv-badge--cat">{{ getCategoryName(currentQ.category) }}</span>
          <span class="tv-badge tv-badge--diff" :class="'tv-badge--' + currentQ.difficulty">
            {{ difficultyLabel(currentQ.difficulty) }}
          </span>
        </div>

        <!-- Question Text -->
        <h2 class="tv-question__text">{{ currentQ.question }}</h2>

        <!-- Multiple Choice -->
        <div v-if="currentQ.type === 'multiple'" class="tv-options">
          <button
            v-for="(opt, i) in currentQ.options"
            :key="i"
            class="tv-option"
            :class="optionClass(i)"
            :disabled="showResult"
            @click="answer(i)"
          >
            <span class="tv-option__letter">{{ letters[i] }}</span>
            <span class="tv-option__text">{{ opt }}</span>
            <span v-if="showResult && i === currentQ.correct" class="tv-option__icon">✓</span>
            <span v-else-if="showResult && selectedAnswer === i && i !== currentQ.correct" class="tv-option__icon">✗</span>
          </button>
        </div>

        <!-- True/False -->
        <div v-else-if="currentQ.type === 'true-false'" class="tv-tf">
          <button
            class="tv-tf__btn tv-tf__btn--true"
            :class="tfClass(true)"
            :disabled="showResult"
            @click="answer(true)"
          >
            <span class="tv-tf__icon">✓</span>
            <span>Verdadero</span>
          </button>
          <button
            class="tv-tf__btn tv-tf__btn--false"
            :class="tfClass(false)"
            :disabled="showResult"
            @click="answer(false)"
          >
            <span class="tv-tf__icon">✗</span>
            <span>Falso</span>
          </button>
        </div>

        <!-- Sequence (Drag & Drop) -->
        <div v-else-if="currentQ.type === 'sequence'" class="tv-seq">
          <p class="tv-seq__hint">Arrastra para ordenar los pasos correctamente</p>
          <div class="tv-seq__list">
            <div
              v-for="(item, i) in sequenceItems"
              :key="item.originalIndex"
              class="tv-seq__item"
              :class="seqItemClass(i)"
              draggable="true"
              @dragstart="onDragStart(i, $event)"
              @dragover.prevent="onDragOver(i)"
              @drop="onDrop(i)"
              @dragend="dragIndex = -1"
            >
              <span class="tv-seq__num">{{ i + 1 }}</span>
              <span class="tv-seq__text">{{ item.text }}</span>
              <span class="tv-seq__handle">⠿</span>
            </div>
          </div>
          <button
            v-if="!showResult"
            class="tv-seq__submit"
            @click="submitSequence"
          >Comprobar orden</button>
        </div>

        <!-- Feedback -->
        <div v-if="showResult" class="tv-feedback" :class="isCorrect ? 'tv-feedback--correct' : 'tv-feedback--wrong'">
          <div class="tv-feedback__header">
            <span class="tv-feedback__icon">{{ isCorrect ? '🎉' : '💡' }}</span>
            <span class="tv-feedback__label">{{ isCorrect ? '¡Correcto!' : 'Respuesta incorrecta' }}</span>
          </div>
          <p class="tv-feedback__text">{{ currentQ.explanation }}</p>
          <button class="tv-feedback__next" @click="nextQuestion">
            {{ isLastQuestion ? 'Ver resultados' : 'Siguiente' }}
            <span>→</span>
          </button>
        </div>
      </div>
    </div>

    <!-- ═══════════════ PANTALLA DE RESULTADOS ═══════════════ -->
    <div v-else-if="screen === 'results'" class="tv-results">
      <div class="tv-results__confetti" v-if="scorePercent >= 80" ref="confettiRef"></div>
      <div class="tv-results__inner">
        <h2 class="tv-results__title">
          {{ scorePercent >= 80 ? '🏆 ¡Impresionante!' : scorePercent >= 50 ? '👏 ¡Buen trabajo!' : '📚 ¡Sigue practicando!' }}
        </h2>

        <!-- Score Circle -->
        <div class="tv-score-ring">
          <svg viewBox="0 0 120 120" class="tv-score-ring__svg">
            <circle cx="60" cy="60" r="54" class="tv-score-ring__bg" />
            <circle
              cx="60" cy="60" r="54"
              class="tv-score-ring__fill"
              :stroke-dasharray="`${scorePercent * 3.39}, 339.292`"
            />
          </svg>
          <div class="tv-score-ring__content">
            <span class="tv-score-ring__num">{{ animatedPercent }}%</span>
            <span class="tv-score-ring__label">Aciertos</span>
          </div>
        </div>

        <!-- Stats Grid -->
        <div class="tv-stats">
          <div class="tv-stat-card">
            <span class="tv-stat-card__icon">✅</span>
            <span class="tv-stat-card__val">{{ correctCount }}/{{ gameQuestions.length }}</span>
            <span class="tv-stat-card__label">Correctas</span>
          </div>
          <div class="tv-stat-card">
            <span class="tv-stat-card__icon">🏆</span>
            <span class="tv-stat-card__val">{{ score }}</span>
            <span class="tv-stat-card__label">Puntuación</span>
          </div>
          <div class="tv-stat-card">
            <span class="tv-stat-card__icon">🔥</span>
            <span class="tv-stat-card__val">{{ maxStreak }}</span>
            <span class="tv-stat-card__label">Racha máxima</span>
          </div>
          <div class="tv-stat-card">
            <span class="tv-stat-card__icon">⏱️</span>
            <span class="tv-stat-card__val">{{ avgTime }}s</span>
            <span class="tv-stat-card__label">Tiempo medio</span>
          </div>
        </div>

        <!-- Category Breakdown -->
        <div class="tv-breakdown">
          <h3 class="tv-breakdown__title">Precisión por tema</h3>
          <div class="tv-breakdown__list">
            <div
              v-for="stat in categoryStats"
              :key="stat.id"
              class="tv-breakdown__row"
            >
              <span class="tv-breakdown__name">{{ stat.icon }} {{ stat.name }}</span>
              <div class="tv-breakdown__bar">
                <div
                  class="tv-breakdown__bar-fill"
                  :class="stat.percent >= 70 ? 'tv-breakdown__bar-fill--good' : 'tv-breakdown__bar-fill--bad'"
                  :style="{ width: stat.percent + '%' }"
                ></div>
              </div>
              <span class="tv-breakdown__pct">{{ stat.percent }}%</span>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="tv-results__actions">
          <button class="tv-btn tv-btn--primary" @click="restart">
            <span>🔄</span> Jugar de nuevo
          </button>
          <a href="/" class="tv-btn tv-btn--secondary">
            <span>📚</span> Volver al curso
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { questions as allQuestions, categories as categoriesList, type Question } from '../data/trivial-questions'

// ─── Game Modes ───
const gameModes = [
  { id: 'classic', icon: '🎯', name: 'Clásico', description: '10 preguntas al azar con 30s por pregunta' },
  { id: 'rush', icon: '⏱️', name: 'Contrarreloj', description: 'Máximas preguntas en 2 minutos' },
  { id: 'marathon', icon: '🏆', name: 'Maratón', description: 'Todas las preguntas, sin límite de tiempo' },
]

const letters = ['A', 'B', 'C', 'D']

// ─── State ───
const screen = ref<'start' | 'game' | 'results'>('start')
const selectedMode = ref('classic')
const selectedCategories = ref<string[]>([])

const gameQuestions = ref<Question[]>([])
const currentIndex = ref(0)
const score = ref(0)
const correctCount = ref(0)
const streak = ref(0)
const maxStreak = ref(0)
const selectedAnswer = ref<number | boolean | null>(null)
const showResult = ref(false)
const isCorrect = ref(false)

// Timers
const timeLeft = ref(30)
const globalTimeLeft = ref(120)
const timerHandle = ref<ReturnType<typeof setInterval> | null>(null)
const questionStartTime = ref(0)
const questionTimes = ref<number[]>([])

// Sequence
const sequenceItems = ref<{ text: string; originalIndex: number }[]>([])
const dragIndex = ref(-1)
const dragOverIndex = ref(-1)

// Results animation
const animatedPercent = ref(0)
const confettiRef = ref<HTMLElement | null>(null)

// ─── Computed ───
const currentQ = computed(() => gameQuestions.value[currentIndex.value])
const isLastQuestion = computed(() => currentIndex.value >= gameQuestions.value.length - 1)
const progressPercent = computed(() => ((currentIndex.value + 1) / gameQuestions.value.length) * 100)
const timerPercent = computed(() => (timeLeft.value / 30) * 100)
const allSelected = computed(() => selectedCategories.value.length === categoriesList.length)
const scorePercent = computed(() =>
  gameQuestions.value.length > 0
    ? Math.round((correctCount.value / gameQuestions.value.length) * 100)
    : 0
)
const avgTime = computed(() => {
  if (questionTimes.value.length === 0) return 0
  return Math.round(questionTimes.value.reduce((a, b) => a + b, 0) / questionTimes.value.length)
})

const availableQuestionCount = computed(() =>
  allQuestions.filter(q => selectedCategories.value.includes(q.category)).length
)

const categoryStats = computed(() => {
  const map = new Map<string, { correct: number; total: number }>()
  for (const q of gameQuestions.value) {
    if (!map.has(q.category)) map.set(q.category, { correct: 0, total: 0 })
    const s = map.get(q.category)!
    s.total++
  }
  // Mark corrects from history
  for (let i = 0; i < gameQuestions.value.length; i++) {
    if (answerHistory.value[i]) {
      const s = map.get(gameQuestions.value[i].category)!
      s.correct++
    }
  }
  return categoriesList
    .filter(c => map.has(c.id))
    .map(c => {
      const s = map.get(c.id)!
      return {
        id: c.id,
        name: c.name,
        icon: c.icon,
        percent: s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0,
      }
    })
})

const answerHistory = ref<boolean[]>([])

// ─── Methods ───
function toggleAllCategories() {
  if (allSelected.value) {
    selectedCategories.value = []
  } else {
    selectedCategories.value = categoriesList.map(c => c.id)
  }
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function startGame() {
  if (selectedCategories.value.length === 0) return
  let filtered = allQuestions.filter(q => selectedCategories.value.includes(q.category))
  filtered = shuffle(filtered)

  if (selectedMode.value === 'classic') {
    filtered = filtered.slice(0, 10)
  }
  // Marathon = all, Rush = all (ends by timer)

  gameQuestions.value = filtered
  currentIndex.value = 0
  score.value = 0
  correctCount.value = 0
  streak.value = 0
  maxStreak.value = 0
  selectedAnswer.value = null
  showResult.value = false
  questionTimes.value = []
  answerHistory.value = new Array(filtered.length).fill(false)

  screen.value = 'game'
  questionStartTime.value = Date.now()
  initSequenceIfNeeded()

  if (selectedMode.value === 'rush') {
    globalTimeLeft.value = 120
    startGlobalTimer()
  } else {
    startQuestionTimer()
  }
}

function startQuestionTimer() {
  clearTimer()
  timeLeft.value = 30
  timerHandle.value = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      clearTimer()
      if (!showResult.value) answer(null)
    }
  }, 1000)
}

function startGlobalTimer() {
  clearTimer()
  timerHandle.value = setInterval(() => {
    globalTimeLeft.value--
    if (globalTimeLeft.value <= 0) {
      clearTimer()
      // End game
      if (!showResult.value) {
        answerHistory.value[currentIndex.value] = false
      }
      screen.value = 'results'
      animateScore()
    }
  }, 1000)
}

function clearTimer() {
  if (timerHandle.value) {
    clearInterval(timerHandle.value)
    timerHandle.value = null
  }
}

function answer(ans: number | boolean | null) {
  if (showResult.value) return
  if (selectedMode.value !== 'rush') clearTimer()

  selectedAnswer.value = ans
  const q = currentQ.value
  let correct = false

  if (q.type === 'multiple') {
    correct = ans === q.correct
  } else if (q.type === 'true-false') {
    correct = ans === q.correct
  }

  isCorrect.value = correct
  showResult.value = true

  const elapsed = (Date.now() - questionStartTime.value) / 1000
  questionTimes.value.push(elapsed)

  if (correct) {
    correctCount.value++
    streak.value++
    if (streak.value > maxStreak.value) maxStreak.value = streak.value
    const basePoints = q.difficulty === 'hard' ? 30 : q.difficulty === 'medium' ? 20 : 10
    const timeBonus = selectedMode.value === 'rush' ? 5 : Math.max(0, Math.floor(timeLeft.value / 3))
    score.value += basePoints + timeBonus
  } else {
    streak.value = 0
  }

  answerHistory.value[currentIndex.value] = correct
}

function submitSequence() {
  if (showResult.value) return
  if (selectedMode.value !== 'rush') clearTimer()

  const q = currentQ.value
  const correctOrder = q.correct as number[]
  const userOrder = sequenceItems.value.map(s => s.originalIndex)
  const correct = JSON.stringify(userOrder) === JSON.stringify(correctOrder)

  isCorrect.value = correct
  showResult.value = true
  selectedAnswer.value = null

  const elapsed = (Date.now() - questionStartTime.value) / 1000
  questionTimes.value.push(elapsed)

  if (correct) {
    correctCount.value++
    streak.value++
    if (streak.value > maxStreak.value) maxStreak.value = streak.value
    score.value += 30 // Sequences always hard
  } else {
    streak.value = 0
  }

  answerHistory.value[currentIndex.value] = correct
}

function nextQuestion() {
  if (isLastQuestion.value || (selectedMode.value === 'rush' && globalTimeLeft.value <= 0)) {
    if (selectedMode.value === 'rush') clearTimer()
    screen.value = 'results'
    animateScore()
    return
  }

  currentIndex.value++
  selectedAnswer.value = null
  showResult.value = false
  questionStartTime.value = Date.now()
  initSequenceIfNeeded()

  if (selectedMode.value !== 'rush') {
    startQuestionTimer()
  }
}

function initSequenceIfNeeded() {
  const q = gameQuestions.value[currentIndex.value]
  if (q.type === 'sequence' && q.options) {
    sequenceItems.value = shuffle(
      q.options.map((text, i) => ({ text, originalIndex: i }))
    )
  }
}

function restart() {
  clearTimer()
  screen.value = 'start'
  animatedPercent.value = 0
}

function animateScore() {
  animatedPercent.value = 0
  const target = scorePercent.value
  const step = Math.max(1, Math.ceil(target / 40))
  const interval = setInterval(() => {
    animatedPercent.value = Math.min(animatedPercent.value + step, target)
    if (animatedPercent.value >= target) clearInterval(interval)
  }, 30)

  if (target >= 80) {
    nextTick(() => spawnConfetti())
  }
}

function spawnConfetti() {
  const container = confettiRef.value
  if (!container) return
  const colors = ['#10b981', '#06b6d4', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']
  for (let i = 0; i < 60; i++) {
    const el = document.createElement('div')
    el.className = 'tv-confetti-piece'
    el.style.setProperty('--x', `${Math.random() * 100}%`)
    el.style.setProperty('--delay', `${Math.random() * 0.5}s`)
    el.style.setProperty('--rotation', `${Math.random() * 360}deg`)
    el.style.setProperty('--bg', colors[Math.floor(Math.random() * colors.length)])
    container.appendChild(el)
  }
}

// Drag & drop for sequences
function onDragStart(index: number, e: DragEvent) {
  dragIndex.value = index
  if (e.dataTransfer) e.dataTransfer.effectAllowed = 'move'
}
function onDragOver(index: number) {
  dragOverIndex.value = index
}
function onDrop(index: number) {
  if (dragIndex.value === -1 || showResult.value) return
  const items = [...sequenceItems.value]
  const [moved] = items.splice(dragIndex.value, 1)
  items.splice(index, 0, moved)
  sequenceItems.value = items
  dragIndex.value = -1
  dragOverIndex.value = -1
}

// Helpers
function getCategoryName(id: string) {
  return categoriesList.find(c => c.id === id)?.name ?? id
}
function difficultyLabel(d: string) {
  return d === 'easy' ? 'Fácil' : d === 'medium' ? 'Medio' : 'Difícil'
}
function formatTime(s: number) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${sec.toString().padStart(2, '0')}`
}

function optionClass(i: number) {
  if (!showResult.value) {
    return selectedAnswer.value === i ? 'tv-option--selected' : ''
  }
  if (i === currentQ.value.correct) return 'tv-option--correct'
  if (selectedAnswer.value === i) return 'tv-option--wrong'
  return 'tv-option--dim'
}

function tfClass(val: boolean) {
  if (!showResult.value) {
    return selectedAnswer.value === val ? 'tv-tf__btn--selected' : ''
  }
  if (val === currentQ.value.correct) return 'tv-tf__btn--correct'
  if (selectedAnswer.value === val) return 'tv-tf__btn--wrong'
  return 'tv-tf__btn--dim'
}

function seqItemClass(i: number) {
  if (!showResult.value) {
    if (dragOverIndex.value === i) return 'tv-seq__item--over'
    return ''
  }
  const correctOrder = currentQ.value.correct as number[]
  return sequenceItems.value[i].originalIndex === correctOrder[i]
    ? 'tv-seq__item--correct'
    : 'tv-seq__item--wrong'
}

// Lifecycle
onMounted(() => {
  selectedCategories.value = categoriesList.map(c => c.id)
})
onUnmounted(() => clearTimer())
</script>

<style scoped>
/* ═══════════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════════ */
:root {
  --tv-primary: #10b981;
  --tv-primary-light: #34d399;
  --tv-secondary: #06b6d4;
  --tv-bg: #f8fafc;
  --tv-surface: #ffffff;
  --tv-text: #0f172a;
  --tv-text-muted: #64748b;
  --tv-border: #e2e8f0;
  --tv-success: #10b981;
  --tv-error: #ef4444;
  --tv-warning: #f59e0b;
  --tv-radius: 24px;
  --tv-radius-lg: 40px;
  --tv-font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --tv-shadow: 0 8px 30px rgba(0,0,0,0.06);
  --tv-shadow-lg: 0 20px 60px rgba(0,0,0,0.08);
  --tv-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.tv-app {
  font-family: var(--tv-font);
  color: var(--tv-text);
  background: var(--tv-bg);
  min-height: 100vh;
}

/* ═══════════════════════════════════════════
   START SCREEN - REDESIGNED HERO
   ═══════════════════════════════════════════ */
.tv-start {
  position: relative;
  min-height: calc(100vh - 5rem);
  padding: 4rem 5% 6rem;
  overflow: visible;
}

.hero-bg-glow {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120vw;
  height: 90vh;
  background: radial-gradient(circle at 20% 30%, rgba(16, 185, 129, 0.12) 0%, transparent 40%),
              radial-gradient(circle at 80% 70%, rgba(6, 182, 212, 0.12) 0%, transparent 40%);
  z-index: -1;
  pointer-events: none;
}

.tv-start-hero-content {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 4rem;
  max-width: 1400px;
  margin: 0 auto;
  align-items: center;
}

.hero-title {
  margin: 0;
  line-height: 1.1;
}

.hero-top {
  font-size: clamp(2rem, 3.5vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  background: linear-gradient(90deg, #10b981 0%, #06b6d4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  display: inline-block;
  margin-bottom: 0.5rem;
}

.hero-main {
  font-size: clamp(3.5rem, 6vw, 4.5rem);
  font-weight: 900;
  color: #0f172a;
  letter-spacing: -0.04em;
  display: block;
  line-height: 1.05;
}

.hero-divider {
  width: 100px;
  height: 8px;
  background: #10b981;
  margin-top: 2rem;
  border-radius: 4px;
}

.hero-tagline {
  font-size: 1.3rem;
  color: #475569;
  margin: 2.5rem 0;
  font-weight: 500;
  line-height: 1.5;
  max-width: 90%;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.hero-btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: linear-gradient(90deg, #10b981 0%, #06b6d4 100%);
  color: white;
  padding: 1.25rem 3.5rem;
  border-radius: 99px;
  font-weight: 800;
  font-size: 1.25rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 20px 40px -10px rgba(16, 185, 129, 0.35);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.hero-btn-primary:hover:not(:disabled) {
  transform: translateY(-5px) scale(1.03);
  box-shadow: 0 30px 50px -10px rgba(6, 182, 212, 0.45);
}
.hero-btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.tv-start__info {
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
}

.tv-info-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  padding: 0.75rem 1.25rem;
  border-radius: 99px;
  box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
  border: 1px solid rgba(0,0,0,0.02);
}

.tv-info-text {
  font-size: 0.95rem;
  color: #475569;
}
.tv-info-text b { color: #0f172a; font-weight: 800; }

/* Config Right column */
.config-side {
  perspective: 1000px;
}

.config-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0,0,0,0.05);
  box-shadow: 0 30px 60px -15px rgba(0,0,0,0.08);
  padding: 1.75rem 2rem;
  border-radius: 32px;
}

.config-section {
  display: flex;
  flex-direction: column;
}

.config-title {
  font-size: 1.3rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 1.5rem;
}

.config-divider {
  height: 1px;
  background: var(--tv-border);
  margin: 1.25rem 0;
}

.tv-categories__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}
.tv-categories__header .config-title { margin-bottom: 0; }

.tv-categories__toggle {
  background: #f0fdf4;
  color: #10b981;
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}
.tv-categories__toggle:hover {
  background: #d1fae5;
}

/* Modes Grid inside Config card */
.tv-modes__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.tv-mode-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0.85rem 0.5rem;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}

.tv-mode-card:hover {
  border-color: #94a3b8;
  transform: translateY(-2px);
}

.tv-mode-card--active {
  border-color: #10b981;
  background: #f0fdf4;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.1);
}

.tv-mode-card__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 0.35rem;
}

.tv-mode-card__icon { font-size: 1.5rem; }
.tv-mode-card__name { font-size: 1rem; font-weight: 800; color: #0f172a; }
.tv-mode-card__desc { font-size: 0.75rem; color: #64748b; line-height: 1.2; padding: 0 0.25rem; }

/* Categories Grid with Switches */
.tv-categories__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.tv-cat-switch {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  border: 1px solid #e2e8f0;
  padding: 0.65rem 0.85rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
}

.tv-cat-switch:hover {
  border-color: #cbd5e1;
  background: #f8fafc;
}

.tv-cat-switch--selected {
  border-color: #34d399;
  background: #f0fdf4;
}

.tv-cat-switch__label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #475569;
  overflow: hidden;
}

.tv-cat-switch--selected .tv-cat-switch__label {
  color: #0f172a;
}

.tv-cat-switch__icon {
  font-size: 1.1rem;
  flex-shrink: 0;
}

.tv-cat-switch__name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tv-cat-switch__input {
  display: none;
}

.tv-cat-switch__toggle {
  position: relative;
  width: 32px;
  height: 20px;
  background: #cbd5e1;
  border-radius: 99px;
  transition: background 0.3s;
  flex-shrink: 0;
}

.tv-cat-switch__toggle::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 50%;
  transition: transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.tv-cat-switch--selected .tv-cat-switch__toggle {
  background: #10b981;
}

.tv-cat-switch--selected .tv-cat-switch__toggle::after {
  transform: translateX(12px);
}

@media (max-width: 1024px) {
  .tv-start-hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 3rem;
  }
  .hero-divider { margin: 1.5rem auto; }
  .hero-tagline { margin: 2rem auto; }
  .hero-actions { justify-content: center; }
  .tv-start__info { justify-content: center; }
  .tv-mode-card { align-items: center; text-align: center; }
  .tv-mode-card__desc { padding-left: 0; }
  .tv-categories__grid { justify-content: center; }
  .config-card { padding: 1.5rem; border-radius: 24px; }
}

/* ═══════════════════════════════════════════
   GAME SCREEN
   ═══════════════════════════════════════════ */
.tv-game {
  max-width: 780px;
  margin: 0 auto;
  padding: 5rem 1.5rem 1.5rem;
  min-height: 100vh;
}

/* HUD */
.tv-hud {
  background: var(--tv-surface);
  border-radius: var(--tv-radius);
  padding: 1.25rem 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: var(--tv-shadow);
  position: sticky;
  top: 4.5rem;
  z-index: 10;
}

.tv-hud__progress {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.tv-hud__bar {
  flex: 1;
  height: 6px;
  background: var(--tv-border);
  border-radius: 3px;
  overflow: hidden;
}

.tv-hud__bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--tv-primary), var(--tv-secondary));
  border-radius: 3px;
  transition: width 0.4s ease;
}

.tv-hud__counter {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--tv-text-muted);
  min-width: 50px;
  text-align: right;
}

.tv-hud__stats {
  display: flex;
  gap: 1.25rem;
  justify-content: center;
}

.tv-hud__stat {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--tv-bg);
  padding: 0.4rem 1rem;
  border-radius: 99px;
  border: 1px solid var(--tv-border);
}

.tv-hud__stat--timer {
  background: #fef2f2;
  border-color: #fecaca;
}

.tv-hud__stat-val {
  font-size: 1rem;
  font-weight: 800;
}

/* Question Card */
.tv-question {
  background: var(--tv-surface);
  border-radius: var(--tv-radius-lg);
  box-shadow: var(--tv-shadow-lg);
  overflow: hidden;
  animation: slideUp 0.4s ease;
  position: relative;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Timer Circle */
.tv-timer {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 52px;
  height: 52px;
  z-index: 5;
}

.tv-timer__svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.tv-timer__bg {
  fill: none;
  stroke: var(--tv-border);
  stroke-width: 2.5;
}

.tv-timer__ring {
  fill: none;
  stroke: var(--tv-primary);
  stroke-width: 2.5;
  stroke-linecap: round;
  transition: stroke-dasharray 0.8s ease, stroke 0.3s ease;
}

.tv-timer__ring--danger {
  stroke: var(--tv-error);
}

.tv-timer__text {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 800;
  color: var(--tv-text);
}

.tv-timer__text--danger {
  color: var(--tv-error);
  animation: pulse 0.6s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* Badges */
.tv-question__badges {
  display: flex;
  gap: 0.5rem;
  padding: 1.5rem 1.5rem 0;
}

.tv-badge {
  padding: 0.3rem 0.85rem;
  border-radius: 99px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.tv-badge--cat {
  background: #f0fdf4;
  color: #059669;
}

.tv-badge--easy {
  background: #f0fdf4;
  color: #10b981;
}

.tv-badge--medium {
  background: #fffbeb;
  color: #d97706;
}

.tv-badge--hard {
  background: #fef2f2;
  color: #ef4444;
}

/* Question Text */
.tv-question__text {
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1.5;
  padding: 1.25rem 1.5rem 1.5rem;
  margin: 0;
  color: var(--tv-text);
}

/* Options */
.tv-options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0 1.5rem 1.5rem;
}

.tv-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border: 2px solid var(--tv-border);
  border-radius: 16px;
  background: var(--tv-surface);
  cursor: pointer;
  transition: var(--tv-transition);
  text-align: left;
  font-size: 1rem;
  position: relative;
}

.tv-option:hover:not(:disabled):not(.tv-option--correct):not(.tv-option--wrong):not(.tv-option--dim) {
  border-color: var(--tv-primary-light);
  transform: translateY(-2px);
  box-shadow: var(--tv-shadow);
}

.tv-option--selected {
  border-color: var(--tv-primary);
  background: rgba(16,185,129,0.04);
}

.tv-option--correct {
  border-color: var(--tv-success);
  background: rgba(16,185,129,0.06);
  animation: correctPop 0.4s ease;
}

@keyframes correctPop {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

.tv-option--wrong {
  border-color: var(--tv-error);
  background: rgba(239,68,68,0.06);
  animation: shake 0.4s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-6px); }
  75% { transform: translateX(6px); }
}

.tv-option--dim {
  opacity: 0.45;
}

.tv-option__letter {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--tv-bg);
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--tv-text-muted);
  flex-shrink: 0;
  border: 1.5px solid var(--tv-border);
}

.tv-option--correct .tv-option__letter {
  background: var(--tv-success);
  color: white;
  border-color: var(--tv-success);
}

.tv-option--wrong .tv-option__letter {
  background: var(--tv-error);
  color: white;
  border-color: var(--tv-error);
}

.tv-option__text { flex: 1; line-height: 1.4; }

.tv-option__icon {
  font-size: 1.1rem;
  font-weight: 800;
  flex-shrink: 0;
}

/* True/False */
.tv-tf {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 0 1.5rem 1.5rem;
}

.tv-tf__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1.25rem;
  border: 2px solid var(--tv-border);
  border-radius: var(--tv-radius);
  background: var(--tv-surface);
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 700;
  transition: var(--tv-transition);
}

.tv-tf__btn:hover:not(:disabled):not(.tv-tf__btn--correct):not(.tv-tf__btn--wrong):not(.tv-tf__btn--dim) {
  transform: translateY(-3px);
  box-shadow: var(--tv-shadow);
}

.tv-tf__btn--true:hover:not(:disabled):not(.tv-tf__btn--correct):not(.tv-tf__btn--wrong):not(.tv-tf__btn--dim) {
  border-color: var(--tv-success);
}

.tv-tf__btn--false:hover:not(:disabled):not(.tv-tf__btn--correct):not(.tv-tf__btn--wrong):not(.tv-tf__btn--dim) {
  border-color: var(--tv-error);
}

.tv-tf__btn--selected { border-color: var(--tv-primary); background: rgba(16,185,129,0.04); }
.tv-tf__btn--correct { border-color: var(--tv-success); background: rgba(16,185,129,0.06); }
.tv-tf__btn--wrong { border-color: var(--tv-error); background: rgba(239,68,68,0.06); animation: shake 0.4s ease; }
.tv-tf__btn--dim { opacity: 0.45; }

.tv-tf__icon { font-size: 1.25rem; }

/* Sequence */
.tv-seq {
  padding: 0 1.5rem 1.5rem;
}

.tv-seq__hint {
  font-size: 0.85rem;
  color: var(--tv-text-muted);
  margin-bottom: 1rem;
}

.tv-seq__list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.tv-seq__item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.9rem 1.25rem;
  background: var(--tv-surface);
  border: 2px solid var(--tv-border);
  border-radius: 16px;
  cursor: grab;
  transition: var(--tv-transition);
  user-select: none;
}

.tv-seq__item:active { cursor: grabbing; }

.tv-seq__item--over {
  border-color: var(--tv-primary);
  background: rgba(16,185,129,0.04);
  transform: scale(1.02);
}

.tv-seq__item--correct {
  border-color: var(--tv-success);
  background: rgba(16,185,129,0.06);
}

.tv-seq__item--wrong {
  border-color: var(--tv-error);
  background: rgba(239,68,68,0.06);
}

.tv-seq__num {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--tv-bg);
  font-size: 0.8rem;
  font-weight: 800;
  color: var(--tv-text-muted);
  flex-shrink: 0;
  border: 1.5px solid var(--tv-border);
}

.tv-seq__text { flex: 1; font-size: 0.95rem; }
.tv-seq__handle { color: var(--tv-text-muted); font-size: 1.1rem; }

.tv-seq__submit {
  margin-top: 1rem;
  width: 100%;
  padding: 0.9rem;
  background: linear-gradient(90deg, var(--tv-primary), var(--tv-secondary));
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: var(--tv-transition);
}

.tv-seq__submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(16,185,129,0.3);
}

/* Feedback */
.tv-feedback {
  padding: 1.5rem;
  border-top: 1px solid var(--tv-border);
  animation: slideUp 0.3s ease;
}

.tv-feedback--correct {
  background: rgba(16,185,129,0.04);
  border-top-color: var(--tv-success);
}

.tv-feedback--wrong {
  background: rgba(239,68,68,0.04);
  border-top-color: var(--tv-error);
}

.tv-feedback__header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.tv-feedback__icon { font-size: 1.5rem; }

.tv-feedback__label {
  font-size: 1.1rem;
  font-weight: 800;
}

.tv-feedback--correct .tv-feedback__label { color: #059669; }
.tv-feedback--wrong .tv-feedback__label { color: #dc2626; }

.tv-feedback__text {
  font-size: 0.95rem;
  color: var(--tv-text-muted);
  line-height: 1.6;
  margin: 0 0 1.25rem;
}

.tv-feedback__next {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.9rem;
  background: linear-gradient(90deg, var(--tv-primary), var(--tv-secondary));
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: var(--tv-transition);
}

.tv-feedback__next:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(16,185,129,0.3);
}

/* ═══════════════════════════════════════════
   RESULTS SCREEN
   ═══════════════════════════════════════════ */
.tv-results {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.tv-results__confetti {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 50;
}

:global(.tv-confetti-piece) {
  position: absolute;
  width: 8px;
  height: 12px;
  background: var(--bg);
  left: var(--x);
  top: -20px;
  border-radius: 2px;
  animation: confettiFall 2.5s ease-in forwards;
  animation-delay: var(--delay);
  transform: rotate(var(--rotation));
}

@keyframes confettiFall {
  0% { top: -20px; opacity: 1; }
  100% { top: 110vh; opacity: 0; transform: rotate(calc(var(--rotation) + 720deg)); }
}

.tv-results__inner {
  background: var(--tv-surface);
  border-radius: var(--tv-radius-lg);
  padding: 3rem;
  box-shadow: var(--tv-shadow-lg);
  max-width: 600px;
  width: 100%;
  text-align: center;
  animation: slideUp 0.5s ease;
}

.tv-results__title {
  font-size: 1.8rem;
  font-weight: 900;
  margin: 0 0 2rem;
  letter-spacing: -0.02em;
}

/* Score Ring */
.tv-score-ring {
  position: relative;
  width: 160px;
  height: 160px;
  margin: 0 auto 2rem;
}

.tv-score-ring__svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.tv-score-ring__bg {
  fill: none;
  stroke: var(--tv-border);
  stroke-width: 8;
}

.tv-score-ring__fill {
  fill: none;
  stroke: url(#scoreGradient);
  stroke-width: 8;
  stroke-linecap: round;
  transition: stroke-dasharray 1s ease;
}

.tv-score-ring__content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.tv-score-ring__num {
  font-size: 2.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, var(--tv-primary), var(--tv-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.tv-score-ring__label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--tv-text-muted);
  margin-top: 2px;
}

/* Stats */
.tv-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.tv-stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  padding: 1.25rem 1rem;
  background: var(--tv-bg);
  border-radius: var(--tv-radius);
  border: 1px solid var(--tv-border);
}

.tv-stat-card__icon { font-size: 1.25rem; }
.tv-stat-card__val { font-size: 1.5rem; font-weight: 900; color: var(--tv-text); }
.tv-stat-card__label { font-size: 0.75rem; font-weight: 600; color: var(--tv-text-muted); }

/* Breakdown */
.tv-breakdown {
  text-align: left;
  margin-bottom: 2rem;
}

.tv-breakdown__title {
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 1rem;
}

.tv-breakdown__list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.tv-breakdown__row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.tv-breakdown__name {
  font-size: 0.8rem;
  font-weight: 600;
  min-width: 120px;
  color: var(--tv-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tv-breakdown__bar {
  flex: 1;
  height: 8px;
  background: var(--tv-border);
  border-radius: 4px;
  overflow: hidden;
}

.tv-breakdown__bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.8s ease;
}

.tv-breakdown__bar-fill--good {
  background: linear-gradient(90deg, var(--tv-primary), var(--tv-secondary));
}

.tv-breakdown__bar-fill--bad {
  background: linear-gradient(90deg, var(--tv-error), #f97316);
}

.tv-breakdown__pct {
  font-size: 0.8rem;
  font-weight: 800;
  min-width: 35px;
  text-align: right;
}

/* Action Buttons */
.tv-results__actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.tv-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.9rem 2rem;
  border: none;
  border-radius: 99px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: var(--tv-transition);
  text-decoration: none;
}

.tv-btn--primary {
  background: linear-gradient(90deg, var(--tv-primary), var(--tv-secondary));
  color: white;
  box-shadow: 0 10px 25px rgba(16,185,129,0.3);
}

.tv-btn--primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(16,185,129,0.4);
}

.tv-btn--secondary {
  background: var(--tv-surface);
  color: var(--tv-text);
  border: 1.5px solid var(--tv-border);
}

.tv-btn--secondary:hover {
  background: var(--tv-bg);
  transform: translateY(-2px);
}

/* ═══════════════════════════════════════════
   RESPONSIVE
   ═══════════════════════════════════════════ */
@media (max-width: 640px) {
  .tv-modes__grid {
    grid-template-columns: 1fr;
  }

  .tv-question__text {
    font-size: 1.1rem;
    padding: 1rem 1.25rem;
  }

  .tv-options,
  .tv-tf,
  .tv-seq,
  .tv-feedback,
  .tv-question__badges {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }

  .tv-results__inner {
    padding: 2rem 1.5rem;
  }

  .tv-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  .tv-hud {
    padding: 1rem;
  }

  .tv-hud__stats {
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .tv-breakdown__name {
    min-width: 80px;
    font-size: 0.7rem;
  }
}
</style>
