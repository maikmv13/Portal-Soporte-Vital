---
title: SVB Adultos
---

# Algoritmo SVB Adultos

<div class="custom-card info-card">
  <div class="card-header">
    <div class="header-icon">📊</div>
    <div class="header-title">Soporte Vital Básico en Adultos</div>
  </div>
  <div class="card-content">
    <p>Secuencia de acciones para la atención inicial de una persona adulta en parada cardiorrespiratoria.</p>
  </div>
</div>

## Flujograma SVB Adultos

<div class="custom-card">
  <div class="card-header">
    <div class="header-icon">🔄</div>
    <div class="header-title">Secuencia de Actuación</div>
  </div>
  <div class="card-content">
    <pre class="diagram">
    ┌───────────────────────┐
    │ Comprobar la seguridad│
    └───────────┬───────────┘
                ▼
    ┌───────────────────────┐
    │  Valorar consciencia  │
    └───────────┬───────────┘
                ▼
       ┌────────┴─────────┐
       ▼                  ▼
┌────────────┐    ┌────────────────┐
│  Responde  │    │   No responde  │
└────────────┘    └────────┬───────┘
                          ▼
                ┌───────────────────┐
                │ Gritar pidiendo   │
                │      ayuda        │
                └─────────┬─────────┘
                          ▼
                ┌───────────────────┐
                │ Abrir vía aérea   │
                └─────────┬─────────┘
                          ▼
                ┌───────────────────┐
                │Valorar respiración│
                └─────────┬─────────┘
                          ▼
             ┌────────────┴────────────┐
             ▼                         ▼
    ┌────────────────┐        ┌────────────────────┐
    │Respira normal  │        │  No respira o      │
    │                │        │  respira anormal   │
    └────────┬───────┘        └──────────┬─────────┘
             ▼                            ▼
    ┌────────────────┐        ┌────────────────────┐
    │Posición lateral│        │    Llamar 112      │
    │de seguridad    │        │                    │
    └────────────────┘        └──────────┬─────────┘
                                         ▼
                              ┌────────────────────┐
                              │  30 compresiones   │
                              └──────────┬─────────┘
                                         ▼
                              ┌────────────────────┐
                              │ 2 ventilaciones    │
                              └──────────┬─────────┘
                                         ▼
                              ┌────────────────────┐
                              │ Continuar 30:2     │
                              └────────────────────┘
    </pre>
  </div>
</div>

## Puntos Clave

<div class="grid-3">
  <div class="custom-card">
    <div class="card-header">
      <div class="header-icon">⚡</div>
      <div class="header-title">Tiempos Críticos</div>
    </div>
    <div class="card-content">
      <ul>
        <li>Valoración inicial: <strong>&lt;10 segundos</strong></li>
        <li>Inicio RCP: <strong>Inmediato</strong></li>
        <li>Activación emergencias: <strong>Precoz</strong></li>
      </ul>
    </div>
  </div>

  <div class="custom-card">
    <div class="card-header">
      <div class="header-icon">💪</div>
      <div class="header-title">Compresiones</div>
    </div>
    <div class="card-content">
      <ul>
        <li>Frecuencia: <strong>100-120/min</strong></li>
        <li>Profundidad: <strong>5-6 cm</strong></li>
        <li>Relación: <strong>30:2</strong></li>
      </ul>
    </div>
  </div>

  <div class="custom-card">
    <div class="card-header">
      <div class="header-icon">🔄</div>
      <div class="header-title">Ciclo Completo</div>
    </div>
    <div class="card-content">
      <ul>
        <li>30 compresiones</li>
        <li>2 ventilaciones</li>
        <li>Minimizar interrupciones</li>
      </ul>
    </div>
  </div>
</div>

<style>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.custom-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.info-card {
  border-left: 4px solid #3498db;
}

.card-header {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
}

.header-icon {
  font-size: 1.5rem;
  margin-right: 0.8rem;
}

.header-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #2c3e50;
}

.card-content {
  padding: 1rem;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.diagram {
  font-family: monospace;
  white-space: pre;
  overflow-x: auto;
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 5px;
  font-size: 0.85rem;
  line-height: 1.2;
}
</style>
