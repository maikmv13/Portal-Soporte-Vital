---
layout: home
hero:
  name: "🚑 Guía SVB y SVA"
  text: "Soporte Vital Básico y Avanzado 2025"
  tagline: 👩‍⚕️ Por Aurora Vizoso García – Enfermera Asistencial FPUSG 061
  image:
    src: /hero-cpr.png
    alt: RCP en acción
  actions:
    - theme: brand
      text: 🎯 Comenzar el Curso
      link: /guia
      
---

<div class="grid-container">
  <div class="grid-item">
    <h4>🎓 Formación Completa</h4>
    <p>Curso integral de SVB y SVA con las últimas recomendaciones del ERC. Todo lo que necesitas en un solo lugar.</p>
  </div>
  <div class="grid-item">
    <h4>🏥 Contenido Práctico</h4>
    <p>Talleres interactivos, simulaciones realistas y casos clínicos diseñados para un aprendizaje efectivo y duradero.</p>
  </div>
  <div class="grid-item">
    <h4>📜 Certificación Oficial</h4>
    <p>Formación avalada por el Consejo Español de RCP, garantizando los más altos estándares educativos.</p>
  </div>
  <div class="grid-item">
    <h4>🚀 Actualización 2025</h4>
    <p>Contenido siempre al día con las últimas guías y protocolos internacionales para una práctica segura.</p>
  </div>
</div>

<div class="highlight-section">
  <div class="custom-card welcome-card">
    <div class="card-header">
      <span class="card-icon">💡</span>
      <h3>¿Por qué esta guía?</h3>
    </div>
    <p>La formación en técnicas de soporte vital es fundamental para salvar vidas. Este curso te proporcionará los conocimientos y habilidades necesarios siguiendo las recomendaciones más recientes del <strong>European Resuscitation Council (ERC)</strong>.</p>
    <div class="card-footer">
      <span class="badge">Eficacia Probada</span>
      <span class="badge">Método Científico</span>
    </div>
  </div>
</div>

<h2 id="contenido-del-curso">📚 Estructura del Aprendizaje</h2>

<div class="custom-card content-card">
  <div class="card-header">
    <span class="card-icon">🎯</span>
    <h3>Módulos de Especialización</h3>
  </div>
  <div class="content-grid">
    <div class="content-item">
      <div class="item-icon">🚨</div>
      <h4>Fundamentos SVB</h4>
      <p>Bases del soporte vital y algoritmos iniciales.</p>
    </div>
    <div class="content-item">
      <div class="item-icon">💗</div>
      <h4>RCP Avanzada</h4>
      <p>Técnicas complejas y manejo de vía aérea.</p>
    </div>
    <div class="content-item">
      <div class="item-icon">⚡</div>
      <h4>Desfibrilación</h4>
      <p>Uso experto del DEA y seguridad eléctrica.</p>
    </div>
    <div class="content-item">
      <div class="item-icon">⚖️</div>
      <h4>Marco Legal</h4>
      <p>Responsabilidades y protocolos vigentes en España.</p>
    </div>
  </div>
</div>

<div class="two-column-container">
  <div class="column">
    <div class="custom-container info">
      <p class="custom-container-title">👥 PERFILES RECOMENDADOS</p>
      <div class="profile-chips">
        <span class="chip">🏥 Sanitarios</span>
        <span class="chip">🚑 Emergencias</span>
        <span class="chip">👮 Seguridad</span>
        <span class="chip">🌟 Ciudadanos</span>
      </div>
      <p style="margin-top: 1rem; font-size: 0.9rem;">Ideal para cualquier persona que desee estar preparada ante una emergencia vital.</p>
    </div>
  </div>

  <div class="column">
    <div class="custom-container warning">
      <p class="custom-container-title">📢 HOJA DE RUTA</p>
      <ul class="roadmap-list">
        <li><span>1</span> Sigue el orden secuencial de los módulos.</li>
        <li><span>2</span> Practica con los algoritmos interactivos.</li>
        <li><span>3</span> Supera los tests del <strong>Trivial SVA</strong>.</li>
      </ul>
    </div>
  </div>
</div>

<style>
/* Modern Bento Grid for Hero Features */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 3rem 0;
}

.grid-item {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  padding: 2.5rem;
  border-radius: 24px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
}

.dark .grid-item {
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.03);
}

.grid-item:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 30px 40px -15px rgba(5, 150, 105, 0.15);
  background: #ffffff;
  border-color: rgba(5, 150, 105, 0.2);
}

.dark .grid-item:hover {
  background: rgba(30, 41, 59, 0.8);
  box-shadow: 0 30px 40px -15px rgba(0, 0, 0, 0.4);
}

.grid-item h4 {
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: #059669;
}

.grid-item p {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #64748b;
  margin: 0;
}

.dark .grid-item p {
  color: #94a3b8;
}

/* Custom Cards */
.custom-card {
  background: #ffffff;
  padding: 3rem;
  border-radius: 28px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.03);
  margin: 3rem 0;
  border: 1px solid #f1f5f9;
  position: relative;
  overflow: hidden;
}

.dark .custom-card {
  background: #0f172a;
  border-color: #1e293b;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.card-icon {
  font-size: 2rem;
  background: #f0fdf4;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

.dark .card-icon {
  background: rgba(5, 150, 105, 0.1);
}

.welcome-card {
  border-left: 8px solid #10b981;
}

.content-card {
  border-left: 8px solid #0ea5e9;
}

.card-footer {
  display: flex;
  gap: 0.5rem;
  margin-top: 2rem;
}

.card-footer .badge {
  background: #f1f5f9;
  color: #475569;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
}

.dark .card-footer .badge {
  background: #1e293b;
  color: #94a3b8;
}

/* Content Grid within cards */
.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.content-item {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 18px;
  border: 1px solid #f1f5f9;
  transition: all 0.3s ease;
  position: relative;
}

.dark .content-item {
  background: #1e293b;
  border-color: #334155;
}

.content-item:hover {
  transform: translateY(-5px);
  border-color: #0ea5e9;
  background: #ffffff;
  box-shadow: 0 10px 15px -3px rgba(14, 165, 233, 0.1);
}

.item-icon {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

/* Containers */
.custom-container {
  padding: 2rem;
  border-radius: 24px;
  margin: 1.5rem 0;
  height: 100%;
}

.profile-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.chip {
  background: white;
  padding: 4px 12px;
  border-radius: 99px;
  font-size: 0.8rem;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.dark .chip {
  background: #1e293b;
  color: #f1f5f9;
}

.roadmap-list {
  list-style: none !important;
  padding: 0 !important;
  margin-top: 1rem !important;
}

.roadmap-list li {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.roadmap-list li span {
  background: #f59e0b;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 800;
  flex-shrink: 0;
}

.custom-container.info {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border: 1px solid #bae6fd;
}

.dark .custom-container.info {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.12) 0%, rgba(14, 165, 233, 0.05) 100%);
  border-color: rgba(14, 165, 233, 0.2);
}

.custom-container.warning {
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
  border: 1px solid #fde68a;
}

.dark .custom-container.warning {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(245, 158, 11, 0.05) 100%);
  border-color: rgba(245, 158, 11, 0.2);
}

.two-column-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 5rem;
}

.column {
  flex: 1;
  min-width: 340px;
}

h2 {
  font-size: 2.25rem;
  font-weight: 800;
  margin-top: 6rem;
  margin-bottom: 2.5rem;
  letter-spacing: -0.03em;
  color: #0f172a;
}

.dark h2 {
  color: #f1f5f9;
}

@media (max-width: 768px) {
    .two-column-container {
      flex-direction: column;
    }
}

/* Floating Elements Cloud */
.VPHero .image-container {
  position: relative;
  display: flex !important;
  justify-content: center;
}

.VPHero .image-container::before,
.VPHero .image-container::after {
  position: absolute;
  font-size: 2.5rem;
  z-index: 10;
  filter: drop-shadow(0 10px 15px rgba(0,0,0,0.1));
}

.VPHero .image-container::before {
  content: "❤️";
  top: -10px;
  left: -20px;
  animation: float 3.5s ease-in-out infinite;
}

.VPHero .image-container::after {
  content: "🚑";
  bottom: 20px;
  right: -20px;
  animation: float 4s ease-in-out infinite reverse;
}

.VPHero .image-bg {
  position: relative;
}

.VPHero .image-bg::before {
  content: "✓ ERC 2025";
  position: absolute;
  top: 20%;
  right: -40px;
  background: #059669;
  color: white;
  padding: 6px 14px;
  border-radius: 99px;
  font-size: 0.8rem;
  font-weight: 800;
  box-shadow: 0 10px 15px -3px rgba(5, 150, 105, 0.4);
  animation: float 5s ease-in-out infinite;
  z-index: 11;
}

.VPHero .image-bg::after {
  content: "LIVE SAVING";
  position: absolute;
  bottom: 30%;
  left: -50px;
  background: #0ea5e9;
  color: white;
  padding: 6px 14px;
  border-radius: 99px;
  font-size: 0.8rem;
  font-weight: 800;
  box-shadow: 0 10px 15px -3px rgba(14, 165, 233, 0.4);
  animation: float 4.5s ease-in-out infinite reverse;
  z-index: 11;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(3deg); }
}

/* Premium Image Styling */
.VPHero img {
  border-radius: 32px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3);
  border: 6px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.VPHero img:hover {
  transform: scale(1.02) rotate(-1deg);
}
</style>