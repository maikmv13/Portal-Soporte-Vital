export type QuestionType = 'multiple' | 'true-false' | 'sequence'

export interface Question {
  id: number
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  type: QuestionType
  question: string
  options?: string[]
  correct: number | boolean | number[]
  explanation: string
}

export interface Category {
  id: string
  name: string
  icon: string
  color: string
}

export const categories: Category[] = [
  { id: 'introduccion', name: 'Introducción SVA', icon: '🏥', color: '#10b981' },
  { id: 'unidades', name: 'Unidades de Soporte', icon: '🚑', color: '#06b6d4' },
  { id: 'svb', name: 'Soporte Vital Básico', icon: '💚', color: '#22c55e' },
  { id: 'objetivos', name: 'Objetivos SVB', icon: '🎯', color: '#8b5cf6' },
  { id: 'pcr', name: 'Parada Cardiorrespiratoria', icon: '🫀', color: '#ef4444' },
  { id: 'rcp', name: 'Reanimación (RCP)', icon: '💗', color: '#ec4899' },
  { id: 'cadena', name: 'Cadena de Supervivencia', icon: '🔗', color: '#f59e0b' },
  { id: 'pediatrico', name: 'SVB Pediátrico', icon: '👶', color: '#14b8a6' },
  { id: 'lactantes', name: 'SVB Lactantes', icon: '🍼', color: '#a855f7' },
  { id: 'dea', name: 'Desfibrilador (DEA)', icon: '⚡', color: '#eab308' },
  { id: 'especial', name: 'Situaciones Especiales', icon: '🚨', color: '#f97316' },
  { id: 'legal', name: 'Protocolos Legales', icon: '📜', color: '#6366f1' },
]

export const questions: Question[] = [
  // ═══════════════════════════════════════════
  // INTRODUCCIÓN SVA (6 preguntas)
  // ═══════════════════════════════════════════
  {
    id: 1,
    category: 'introduccion',
    difficulty: 'easy',
    type: 'multiple',
    question: '¿Qué significan las siglas SVB?',
    options: [
      'Soporte Vital Básico',
      'Sistema de Ventilación Básica',
      'Soporte Vascular Básico',
      'Sistema Vital de Base',
    ],
    correct: 0,
    explanation:
      'SVB significa Soporte Vital Básico, que incluye técnicas de emergencia para mantener las funciones vitales sin equipamiento especializado.',
  },
  {
    id: 2,
    category: 'introduccion',
    difficulty: 'easy',
    type: 'multiple',
    question: '¿Qué significan las siglas SVA?',
    options: [
      'Soporte Vital Avanzado',
      'Sistema Vascular Avanzado',
      'Servicio de Vigilancia Activa',
      'Soporte Ventilatorio Artificial',
    ],
    correct: 0,
    explanation:
      'SVA significa Soporte Vital Avanzado e incluye técnicas y procedimientos médicos realizados por profesionales sanitarios con equipamiento especializado.',
  },
  {
    id: 3,
    category: 'introduccion',
    difficulty: 'medium',
    type: 'multiple',
    question: '¿Qué organismo elabora las guías europeas de resucitación?',
    options: [
      'OMS (Organización Mundial de la Salud)',
      'ERC (European Resuscitation Council)',
      'Cruz Roja Internacional',
      'SEMES (Sociedad Española de Medicina de Urgencias)',
    ],
    correct: 1,
    explanation:
      'El European Resuscitation Council (ERC) es el organismo europeo responsable de elaborar las guías de resucitación basadas en la evidencia científica del ILCOR.',
  },
  {
    id: 4,
    category: 'introduccion',
    difficulty: 'medium',
    type: 'multiple',
    question: '¿Qué es el CERCP?',
    options: [
      'Centro Europeo de Reanimación Cardiopulmonar',
      'Consejo Español de Resucitación Cardiopulmonar',
      'Comité de Emergencias y Rescate en PCR',
      'Certificado Europeo de RCP',
    ],
    correct: 1,
    explanation:
      'El CERCP es el Consejo Español de Resucitación Cardiopulmonar, organismo que adapta y difunde las guías del ERC en España.',
  },
  {
    id: 5,
    category: 'introduccion',
    difficulty: 'hard',
    type: 'multiple',
    question: '¿Cuál es la ventana de tiempo crítica para iniciar maniobras de SVB con máxima supervivencia?',
    options: ['0-2 minutos', '0-4 minutos', '0-6 minutos', '0-8 minutos'],
    correct: 1,
    explanation:
      'La ventana crítica es de 0-4 minutos. Dentro de este intervalo, la supervivencia con mínimas secuelas neurológicas se sitúa entre el 75-80%.',
  },
  {
    id: 6,
    category: 'introduccion',
    difficulty: 'hard',
    type: 'true-false',
    question: 'El ILCOR es el organismo internacional que coordina la revisión de la evidencia científica sobre resucitación a nivel mundial.',
    correct: true,
    explanation:
      'Correcto. El International Liaison Committee on Resuscitation (ILCOR) coordina la revisión de la evidencia científica a nivel mundial y sus consensos se traducen en las guías regionales como las del ERC.',
  },

  // ═══════════════════════════════════════════
  // UNIDADES DE SOPORTE (5 preguntas)
  // ═══════════════════════════════════════════
  {
    id: 7,
    category: 'unidades',
    difficulty: 'medium',
    type: 'multiple',
    question: '¿Cuál es la principal diferencia entre un SVA medicalizado y un SVA enfermero?',
    options: [
      'El SVA medicalizado lleva médico y enfermero; el enfermero solo lleva enfermero',
      'El SVA medicalizado es terrestre y el enfermero aéreo',
      'No hay diferencia, es el mismo servicio',
      'El SVA enfermero solo actúa en hospitales',
    ],
    correct: 0,
    explanation:
      'La diferencia fundamental es la dotación de personal: el SVA medicalizado incluye médico y enfermero, mientras que el SVA enfermero está dotado por un enfermero con formación avanzada.',
  },
  {
    id: 8,
    category: 'unidades',
    difficulty: 'easy',
    type: 'true-false',
    question: 'Los helicópteros medicalizados forman parte del sistema de transporte sanitario urgente.',
    correct: true,
    explanation:
      'Correcto. Los helicópteros medicalizados son unidades de SVA que permiten alcanzar zonas de difícil acceso y reducir los tiempos de respuesta en emergencias.',
  },
  {
    id: 9,
    category: 'unidades',
    difficulty: 'medium',
    type: 'multiple',
    question: '¿Cuál es el número de emergencias sanitarias en España?',
    options: ['112', '091', '092', '080'],
    correct: 0,
    explanation:
      'El 112 es el número europeo de emergencias, que permite activar los servicios de emergencias sanitarias (SEM/061) en todo el territorio español.',
  },
  {
    id: 10,
    category: 'unidades',
    difficulty: 'hard',
    type: 'multiple',
    question: '¿Qué significa SVAE en el contexto de emergencias sanitarias?',
    options: [
      'Soporte Vital Avanzado Enfermero',
      'Sistema de Vigilancia y Atención de Emergencias',
      'Servicio de Ventilación Artificial Externo',
      'Soporte Vital y Asistencia Especializada',
    ],
    correct: 0,
    explanation:
      'SVAE significa Soporte Vital Avanzado Enfermero, un modelo de atención donde enfermeros con formación avanzada lideran la respuesta prehospitalaria.',
  },
  {
    id: 11,
    category: 'unidades',
    difficulty: 'easy',
    type: 'multiple',
    question: '¿Cuál es la función principal de la central de coordinación 061?',
    options: [
      'Coordinar y despachar recursos de emergencias sanitarias',
      'Gestionar las citas de atención primaria',
      'Administrar los hospitales públicos',
      'Formar a profesionales sanitarios',
    ],
    correct: 0,
    explanation:
      'La central de coordinación 061 recibe las llamadas de emergencia, clasifica la urgencia y despacha el recurso más adecuado (ambulancia SVB, SVA, helicóptero, etc.).',
  },

  // ═══════════════════════════════════════════
  // SOPORTE VITAL BÁSICO (8 preguntas)
  // ═══════════════════════════════════════════
  {
    id: 12,
    category: 'svb',
    difficulty: 'easy',
    type: 'multiple',
    question: '¿Cuál es la profundidad recomendada de las compresiones torácicas en adultos?',
    options: ['3-4 cm', '5-6 cm', '7-8 cm', '2-3 cm'],
    correct: 1,
    explanation:
      'La profundidad recomendada es de 5-6 cm para asegurar una compresión efectiva del corazón contra el esternón.',
  },
  {
    id: 13,
    category: 'svb',
    difficulty: 'easy',
    type: 'multiple',
    question: '¿Cuál es la frecuencia recomendada de compresiones torácicas en adultos?',
    options: ['80-100 por minuto', '100-120 por minuto', '120-140 por minuto', '60-80 por minuto'],
    correct: 1,
    explanation:
      'La frecuencia recomendada es de 100-120 compresiones por minuto para mantener una circulación sanguínea efectiva.',
  },
  {
    id: 14,
    category: 'svb',
    difficulty: 'medium',
    type: 'multiple',
    question: '¿Cuál es la relación compresiones-ventilaciones en RCP básica para adultos?',
    options: ['15:2', '30:2', '5:1', '10:2'],
    correct: 1,
    explanation:
      'La relación estándar es 30 compresiones por cada 2 ventilaciones en RCP básica de adultos.',
  },
  {
    id: 15,
    category: 'svb',
    difficulty: 'medium',
    type: 'multiple',
    question: '¿Qué maniobra se utiliza para abrir la vía aérea cuando NO hay sospecha de lesión cervical?',
    options: [
      'Maniobra de tracción mandibular',
      'Maniobra frente-mentón',
      'Maniobra de Heimlich',
      'Maniobra de Sellick',
    ],
    correct: 1,
    explanation:
      'La maniobra frente-mentón es la técnica estándar: se coloca una mano en la frente inclinando la cabeza hacia atrás y con la otra se eleva el mentón.',
  },
  {
    id: 16,
    category: 'svb',
    difficulty: 'hard',
    type: 'multiple',
    question: '¿Qué maniobra debe usarse para abrir la vía aérea en caso de sospecha de lesión cervical?',
    options: [
      'Maniobra frente-mentón',
      'Maniobra de tracción mandibular',
      'Maniobra de Heimlich',
      'Hiperextensión cervical',
    ],
    correct: 1,
    explanation:
      'En sospecha de lesión cervical, se usa la tracción mandibular para abrir la vía aérea sin mover el cuello, manteniendo la alineación espinal.',
  },
  {
    id: 17,
    category: 'svb',
    difficulty: 'medium',
    type: 'multiple',
    question: '¿Cuál es el volumen recomendado para cada ventilación de rescate?',
    options: ['200-300 ml', '500-600 ml', '800-1000 ml', '1000-1200 ml'],
    correct: 1,
    explanation:
      'El volumen recomendado es de 500-600 ml por insuflación, administrado durante 1 segundo, observando la elevación del tórax.',
  },
  {
    id: 18,
    category: 'svb',
    difficulty: 'easy',
    type: 'true-false',
    question: 'En la RCP, después de cada compresión debe permitirse que el tórax se reexpanda completamente.',
    correct: true,
    explanation:
      'Correcto. La reexpansión completa del tórax permite que el corazón se rellene de sangre entre cada compresión, lo que es esencial para mantener una circulación efectiva.',
  },
  {
    id: 19,
    category: 'svb',
    difficulty: 'hard',
    type: 'true-false',
    question: 'Las interrupciones en las compresiones torácicas no deben superar los 10 segundos.',
    correct: true,
    explanation:
      'Correcto. Las interrupciones mayores de 10 segundos reducen significativamente la presión de perfusión coronaria, comprometiendo la eficacia de la RCP.',
  },

  // ═══════════════════════════════════════════
  // OBJETIVOS SVB (7 preguntas)
  // ═══════════════════════════════════════════
  {
    id: 20,
    category: 'objetivos',
    difficulty: 'easy',
    type: 'multiple',
    question: '¿Cuál es el primer paso al encontrarse con una posible víctima de parada cardíaca?',
    options: [
      'Iniciar compresiones torácicas',
      'Comprobar la seguridad de la escena',
      'Llamar al 112',
      'Buscar un DEA',
    ],
    correct: 1,
    explanation:
      'Antes de cualquier actuación, hay que asegurar la seguridad del entorno para el reanimador y la víctima. Un reanimador lesionado no puede ayudar.',
  },
  {
    id: 21,
    category: 'objetivos',
    difficulty: 'medium',
    type: 'multiple',
    question: '¿Cómo se comprueba si una víctima responde?',
    options: [
      'Se le aplican estímulos dolorosos fuertes',
      'Se sacude suavemente por los hombros y se le pregunta en voz alta',
      'Se le toma el pulso radial',
      'Se le explora la pupila con una linterna',
    ],
    correct: 1,
    explanation:
      'Se sacude suavemente a la víctima por los hombros y se le pregunta en voz alta si se encuentra bien. Esto permite evaluar la consciencia de forma rápida y segura.',
  },
  {
    id: 22,
    category: 'objetivos',
    difficulty: 'medium',
    type: 'multiple',
    question: '¿Qué es la Posición Lateral de Seguridad (PLS)?',
    options: [
      'Una posición para víctimas que respiran pero están inconscientes',
      'Una técnica de inmovilización para fracturas',
      'La posición correcta del reanimador durante la RCP',
      'Una maniobra para desobstruir la vía aérea',
    ],
    correct: 0,
    explanation:
      'La PLS se usa en víctimas inconscientes que SÍ respiran normalmente. Evita que la lengua obstruya la vía aérea y permite el drenaje de fluidos.',
  },
  {
    id: 23,
    category: 'objetivos',
    difficulty: 'easy',
    type: 'true-false',
    question: 'El DEA puede ser usado por cualquier persona con formación básica.',
    correct: true,
    explanation:
      'Sí, el DEA está diseñado para ser usado por personal no médico con formación básica, ya que proporciona instrucciones de voz claras paso a paso.',
  },
  {
    id: 24,
    category: 'objetivos',
    difficulty: 'hard',
    type: 'multiple',
    question: '¿Dónde se deben colocar las manos para realizar compresiones torácicas?',
    options: [
      'En la parte superior del esternón',
      'En el centro del pecho, sobre la mitad inferior del esternón',
      'Sobre el abdomen, debajo del esternón',
      'En el lado izquierdo del tórax, sobre el corazón',
    ],
    correct: 1,
    explanation:
      'Las manos se colocan en el centro del pecho, sobre la mitad inferior del esternón. Se usa el talón de una mano con la otra encima y los brazos rectos.',
  },
  {
    id: 25,
    category: 'objetivos',
    difficulty: 'medium',
    type: 'true-false',
    question: 'En caso de atragantamiento en un adulto consciente con tos efectiva, debemos realizar la maniobra de Heimlich inmediatamente.',
    correct: false,
    explanation:
      'Falso. Si la tos es efectiva, se debe animar al paciente a seguir tosiendo. La maniobra de Heimlich (compresiones abdominales) solo se aplica si la tos se vuelve inefectiva y la obstrucción es grave.',
  },
  {
    id: 26,
    category: 'objetivos',
    difficulty: 'hard',
    type: 'sequence',
    question: 'Ordena los pasos de la valoración inicial de una víctima:',
    options: [
      'Comprobar seguridad de la escena',
      'Comprobar respuesta (hablar/sacudir)',
      'Abrir la vía aérea (frente-mentón)',
      'Comprobar si respira normalmente (10 seg)',
      'Llamar al 112 si no respira',
    ],
    correct: [0, 1, 2, 3, 4],
    explanation:
      'La secuencia correcta es: Seguridad → Respuesta → Vía aérea → Respiración → Alerta 112. Este orden sistematizado garantiza una evaluación rápida y segura.',
  },

  // ═══════════════════════════════════════════
  // PCR (6 preguntas)
  // ═══════════════════════════════════════════
  {
    id: 27,
    category: 'pcr',
    difficulty: 'easy',
    type: 'multiple',
    question: '¿Qué significa PCR en el contexto de emergencias médicas?',
    options: [
      'Protocolo de Control Respiratorio',
      'Parada Cardiorrespiratoria',
      'Procedimiento de Cirugía Rápida',
      'Plan de Contingencia y Respuesta',
    ],
    correct: 1,
    explanation:
      'PCR significa Parada Cardiorrespiratoria: la interrupción brusca, inesperada y potencialmente reversible de la respiración y la circulación espontáneas.',
  },
  {
    id: 28,
    category: 'pcr',
    difficulty: 'medium',
    type: 'multiple',
    question: '¿Cuántas PCR extrahospitalarias se producen aproximadamente al año en España?',
    options: ['5.000', '15.000', '30.000', '50.000'],
    correct: 2,
    explanation:
      'En España se producen aproximadamente 30.000 PCR extrahospitalarias al año, con una tasa de supervivencia que apenas alcanza el 10%.',
  },
  {
    id: 29,
    category: 'pcr',
    difficulty: 'medium',
    type: 'multiple',
    question: '¿Cuál es la principal causa de PCR súbita en adultos en el medio extrahospitalario?',
    options: [
      'Traumatismos graves',
      'Problemas cardíacos (cardiopatía isquémica)',
      'Intoxicaciones',
      'Ahogamiento',
    ],
    correct: 1,
    explanation:
      'La principal causa de PCR en adultos es la cardiopatía isquémica, que puede desencadenar arritmias letales como la fibrilación ventricular, responsable del 85% de las paradas cardíacas súbitas.',
  },
  {
    id: 30,
    category: 'pcr',
    difficulty: 'hard',
    type: 'multiple',
    question: '¿Qué es la respiración agónica (gasping)?',
    options: [
      'Respiración rápida y superficial causada por ansiedad',
      'Jadeos ocasionales e ineficaces que pueden aparecer al inicio de una PCR',
      'Respiración normal de una persona dormida',
      'Un tipo de ventilación mecánica asistida',
    ],
    correct: 1,
    explanation:
      'La respiración agónica son jadeos esporádicos e ineficaces que pueden aparecer en los primeros minutos de una PCR. NO debe confundirse con respiración normal y requiere inicio inmediato de RCP.',
  },
  {
    id: 31,
    category: 'pcr',
    difficulty: 'hard',
    type: 'true-false',
    question: 'Si hay dudas sobre si una víctima está en PCR, se recomienda actuar como si lo estuviera e iniciar RCP.',
    correct: true,
    explanation:
      'Correcto. El beneficio potencial de realizar RCP supera ampliamente el riesgo de realizar compresiones en alguien que no las necesita. Ante la duda, siempre iniciar RCP.',
  },
  {
    id: 32,
    category: 'pcr',
    difficulty: 'medium',
    type: 'multiple',
    question: '¿Dónde ocurren la mayoría de las PCR extrahospitalarias?',
    options: [
      'En la calle',
      'En centros deportivos',
      'En el domicilio (65-70%)',
      'En centros comerciales',
    ],
    correct: 2,
    explanation:
      'El 65-70% de las PCR extrahospitalarias ocurren en el domicilio, lo que hace fundamental que la población general conozca técnicas de RCP.',
  },

  // ═══════════════════════════════════════════
  // RCP (6 preguntas)
  // ═══════════════════════════════════════════
  {
    id: 33,
    category: 'rcp',
    difficulty: 'medium',
    type: 'multiple',
    question: '¿Cuánto disminuye la probabilidad de supervivencia por cada minuto sin RCP?',
    options: ['3-5%', '7-10%', '15-20%', '1-2%'],
    correct: 1,
    explanation:
      'La supervivencia disminuye entre un 7-10% por cada minuto sin RCP ni desfibrilación. Por eso la respuesta rápida es absolutamente crítica.',
  },
  {
    id: 34,
    category: 'rcp',
    difficulty: 'easy',
    type: 'true-false',
    question: 'La RCP realizada por testigos puede duplicar o triplicar las posibilidades de supervivencia.',
    correct: true,
    explanation:
      'Correcto. La RCP por testigos incrementa la supervivencia un 200-300% al mantener la perfusión cerebral y cardíaca hasta la llegada de los servicios de emergencia.',
  },
  {
    id: 35,
    category: 'rcp',
    difficulty: 'hard',
    type: 'multiple',
    question: '¿Cuál es la tasa de éxito del DEA si se aplica en menos de 3 minutos tras la PCR?',
    options: ['30-40%', '50-60%', 'Superior al 70%', '90-100%'],
    correct: 2,
    explanation:
      'Si el DEA se aplica en menos de 3 minutos, la tasa de éxito es superior al 70%. Cada minuto de retraso reduce su eficacia un 10%.',
  },
  {
    id: 36,
    category: 'rcp',
    difficulty: 'medium',
    type: 'multiple',
    question: '¿A partir de qué minuto sin oxígeno comienza el daño cerebral irreversible?',
    options: ['1 minuto', '4 minutos', '8 minutos', '15 minutos'],
    correct: 1,
    explanation:
      'A los 4 minutos sin oxígeno comienza el daño neuronal. Las neuronas mueren irreversiblemente sin aporte de oxígeno, por eso la RCP precoz es vital.',
  },
  {
    id: 37,
    category: 'rcp',
    difficulty: 'hard',
    type: 'multiple',
    question: '¿Cuánto puede aumentar la supervivencia la combinación de RCP temprana y uso de DEA según el estudio EuReCa-3?',
    options: ['Hasta un 25%', 'Hasta un 35%', 'Hasta un 52%', 'Hasta un 80%'],
    correct: 2,
    explanation:
      'El estudio EuReCa-3 (2020) demostró que la combinación de RCP temprana y uso de DEA puede aumentar las tasas de supervivencia hasta un 52% en entornos urbanos.',
  },
  {
    id: 38,
    category: 'rcp',
    difficulty: 'easy',
    type: 'true-false',
    question: 'Las compresiones torácicas deben interrumpirse para realizar ventilaciones de rescate.',
    correct: false,
    explanation:
      'Falso. Las compresiones deben tener las mínimas interrupciones posibles. Solo se pausan brevemente (máximo 10 segundos) para las 2 ventilaciones del ciclo 30:2.',
  },

  // ═══════════════════════════════════════════
  // CADENA DE SUPERVIVENCIA (6 preguntas)
  // ═══════════════════════════════════════════
  {
    id: 39,
    category: 'cadena',
    difficulty: 'easy',
    type: 'multiple',
    question: '¿Cuál es el primer eslabón de la cadena de supervivencia?',
    options: [
      'Reconocimiento y alerta precoz (llamar al 112)',
      'RCP precoz',
      'Desfibrilación precoz',
      'Soporte Vital Avanzado',
    ],
    correct: 0,
    explanation:
      'El primer eslabón es el reconocimiento de la emergencia y la activación precoz del sistema de emergencias llamando al 112/061.',
  },
  {
    id: 40,
    category: 'cadena',
    difficulty: 'medium',
    type: 'sequence',
    question: 'Ordena los 4 eslabones de la cadena de supervivencia:',
    options: [
      'Reconocimiento y alerta precoz',
      'RCP precoz',
      'Desfibrilación precoz',
      'Soporte Vital Avanzado',
    ],
    correct: [0, 1, 2, 3],
    explanation:
      'La cadena de supervivencia: 1) Reconocimiento y alerta → 2) RCP precoz → 3) Desfibrilación precoz → 4) Soporte Vital Avanzado. Cada eslabón depende del anterior.',
  },
  {
    id: 41,
    category: 'cadena',
    difficulty: 'medium',
    type: 'true-false',
    question: 'La cadena de supervivencia comienza con la llegada de los servicios de emergencia.',
    correct: false,
    explanation:
      'Falso. La cadena comienza con el primer testigo que reconoce la emergencia y alerta al 112. Sin este primer eslabón, los demás se activan con retraso crítico.',
  },
  {
    id: 42,
    category: 'cadena',
    difficulty: 'hard',
    type: 'multiple',
    question: '¿Cuánto puede incrementar la supervivencia la RCP guiada por teléfono desde la central 061?',
    options: ['10-20%', '25-35%', '50-75%', '100-150%'],
    correct: 2,
    explanation:
      'La RCP guiada por teléfono desde la central de coordinación puede incrementar la supervivencia un 50-75%, mejorando la calidad de las compresiones mientras se espera al equipo.',
  },
  {
    id: 43,
    category: 'cadena',
    difficulty: 'easy',
    type: 'multiple',
    question: '¿Cuál es el tercer eslabón de la cadena de supervivencia?',
    options: [
      'RCP precoz',
      'Reconocimiento y alerta',
      'Desfibrilación precoz',
      'Soporte Vital Avanzado',
    ],
    correct: 2,
    explanation:
      'El tercer eslabón es la desfibrilación precoz mediante el uso del DEA tan pronto como esté disponible.',
  },
  {
    id: 44,
    category: 'cadena',
    difficulty: 'hard',
    type: 'true-false',
    question: 'Según el estudio OHSCAR España, cada 30 segundos de reducción en el tiempo de respuesta aumenta la supervivencia un 4%.',
    correct: true,
    explanation:
      'Correcto. El registro OHSCAR España (2022) confirma la correlación directa entre tiempo de respuesta y supervivencia, con un incremento del 4% por cada 30 segundos ganados.',
  },

  // ═══════════════════════════════════════════
  // SVB PEDIÁTRICO (6 preguntas)
  // ═══════════════════════════════════════════
  {
    id: 45,
    category: 'pediatrico',
    difficulty: 'easy',
    type: 'multiple',
    question: '¿Cuál es la causa más frecuente de PCR en niños, a diferencia de los adultos?',
    options: [
      'Cardiopatía isquémica',
      'Problemas respiratorios',
      'Traumatismos craneoencefálicos',
      'Arritmias cardíacas congénitas',
    ],
    correct: 1,
    explanation:
      'A diferencia de los adultos (causa cardíaca), en niños la causa más frecuente de PCR es respiratoria (obstrucción de vía aérea, infecciones respiratorias, ahogamiento).',
  },
  {
    id: 46,
    category: 'pediatrico',
    difficulty: 'medium',
    type: 'multiple',
    question: '¿Cuántas ventilaciones de rescate se dan inicialmente antes de comenzar las compresiones en RCP pediátrica?',
    options: ['2 ventilaciones', '5 ventilaciones', '10 ventilaciones', 'Ninguna, se empieza directamente con compresiones'],
    correct: 1,
    explanation:
      'En RCP pediátrica se dan 5 ventilaciones de rescate iniciales antes de comenzar las compresiones, ya que la causa más frecuente de PCR en niños es respiratoria.',
  },
  {
    id: 47,
    category: 'pediatrico',
    difficulty: 'medium',
    type: 'multiple',
    question: '¿Cuál es la relación compresiones-ventilaciones recomendada en RCP pediátrica con 2 reanimadores?',
    options: ['30:2', '15:2', '5:1', '10:2'],
    correct: 1,
    explanation:
      'Con 2 reanimadores se usa la relación 15:2 en RCP pediátrica. Si hay un solo reanimador, puede usar 30:2 como en adultos.',
  },
  {
    id: 48,
    category: 'pediatrico',
    difficulty: 'hard',
    type: 'multiple',
    question: '¿A qué profundidad deben realizarse las compresiones torácicas en niños?',
    options: [
      '2-3 cm',
      'Un tercio del diámetro anteroposterior del tórax (aprox. 5 cm)',
      '5-6 cm como en adultos',
      '1-2 cm',
    ],
    correct: 1,
    explanation:
      'En niños, las compresiones deben deprimir un tercio del diámetro anteroposterior del tórax, lo que equivale aproximadamente a 5 cm.',
  },
  {
    id: 49,
    category: 'pediatrico',
    difficulty: 'easy',
    type: 'true-false',
    question: 'En RCP pediátrica, un reanimador único debe realizar 1 minuto de RCP antes de llamar al 112 si no hay nadie más.',
    correct: true,
    explanation:
      'Correcto. Como la causa más frecuente de PCR en niños es respiratoria, 1 minuto de RCP (5 ventilaciones + compresiones) puede revertir la situación. Luego se alerta al 112.',
  },
  {
    id: 50,
    category: 'pediatrico',
    difficulty: 'hard',
    type: 'true-false',
    question: 'En lactantes menores de 1 año, las compresiones torácicas deben realizarse con dos dedos en el centro del pecho.',
    correct: true,
    explanation:
      'Correcto. En lactantes (< 1 año), un reanimador único usa la técnica de dos dedos colocados en el centro del pecho, justo por debajo de la línea intermamilar.',
  },

  // ═══════════════════════════════════════════
  // SVB LACTANTES / OVACE PEDIÁTRICA (5 preguntas)
  // ═══════════════════════════════════════════
  {
    id: 51,
    category: 'lactantes',
    difficulty: 'medium',
    type: 'multiple',
    question: '¿Qué técnica se usa para desobstruir la vía aérea de un lactante consciente?',
    options: [
      'Maniobra de Heimlich (compresiones abdominales)',
      'Golpes interescapulares + compresiones torácicas alternando',
      'Barrido digital a ciegas',
      'Hiperextensión cervical',
    ],
    correct: 1,
    explanation:
      'En lactantes se alternan 5 golpes interescapulares (boca abajo) con 5 compresiones torácicas (boca arriba). NUNCA se hacen compresiones abdominales en lactantes por el riesgo de lesión hepática.',
  },
  {
    id: 52,
    category: 'lactantes',
    difficulty: 'easy',
    type: 'true-false',
    question: 'La maniobra de Heimlich (compresiones abdominales) está contraindicada en lactantes menores de 1 año.',
    correct: true,
    explanation:
      'Correcto. En lactantes menores de 1 año las compresiones abdominales pueden causar lesiones hepáticas graves. Se usan golpes interescapulares y compresiones torácicas.',
  },
  {
    id: 53,
    category: 'lactantes',
    difficulty: 'medium',
    type: 'multiple',
    question: '¿Cuántos golpes interescapulares se dan en cada ciclo de desobstrucción en lactantes?',
    options: ['3 golpes', '5 golpes', '10 golpes', '1 golpe fuerte'],
    correct: 1,
    explanation:
      'Se dan 5 golpes interescapulares con el talón de la mano entre las escápulas, con el lactante boca abajo sobre el antebrazo, alternando con 5 compresiones torácicas.',
  },
  {
    id: 54,
    category: 'lactantes',
    difficulty: 'hard',
    type: 'multiple',
    question: '¿A qué profundidad deben realizarse las compresiones torácicas en lactantes?',
    options: [
      '1-2 cm',
      'Un tercio del diámetro anteroposterior del tórax (aprox. 4 cm)',
      '5-6 cm',
      '3 cm exactos',
    ],
    correct: 1,
    explanation:
      'En lactantes, las compresiones deben deprimir un tercio del diámetro anteroposterior del tórax, equivalente aproximadamente a 4 cm.',
  },
  {
    id: 55,
    category: 'lactantes',
    difficulty: 'hard',
    type: 'true-false',
    question: 'El barrido digital a ciegas de la boca está indicado en lactantes con obstrucción de la vía aérea.',
    correct: false,
    explanation:
      'Falso. El barrido digital a ciegas está CONTRAINDICADO tanto en lactantes como en niños porque puede empujar el cuerpo extraño más profundamente. Solo se extrae si es visible.',
  },

  // ═══════════════════════════════════════════
  // DEA (5 preguntas)
  // ═══════════════════════════════════════════
  {
    id: 56,
    category: 'dea',
    difficulty: 'easy',
    type: 'multiple',
    question: '¿Qué significan las siglas DEA?',
    options: [
      'Desfibrilador Externo Automático',
      'Dispositivo Eléctrico de Asistencia',
      'Defensor Electrónico Avanzado',
      'Desfibrilador de Emergencia Activa',
    ],
    correct: 0,
    explanation:
      'DEA significa Desfibrilador Externo Automático, un dispositivo portátil que analiza el ritmo cardíaco y administra una descarga eléctrica si detecta un ritmo desfibrilable.',
  },
  {
    id: 57,
    category: 'dea',
    difficulty: 'medium',
    type: 'multiple',
    question: '¿Dónde se colocan los parches del DEA en un adulto?',
    options: [
      'Uno en el pecho y otro en la espalda',
      'Uno debajo de la clavícula derecha y otro en el costado izquierdo bajo la axila',
      'Ambos en el centro del pecho',
      'Uno en el abdomen y otro en el pecho',
    ],
    correct: 1,
    explanation:
      'Un parche va debajo de la clavícula derecha cerca del esternón, y el otro en el costado izquierdo del tórax debajo de la axila (posición anterolateral).',
  },
  {
    id: 58,
    category: 'dea',
    difficulty: 'medium',
    type: 'true-false',
    question: 'Mientras el DEA analiza el ritmo cardíaco, se deben continuar las compresiones torácicas.',
    correct: false,
    explanation:
      'Falso. Durante el análisis del DEA, NADIE debe tocar a la víctima. Las compresiones se detienen para que el análisis no se vea artefactado por el movimiento.',
  },
  {
    id: 59,
    category: 'dea',
    difficulty: 'hard',
    type: 'multiple',
    question: '¿Qué ritmos cardíacos son desfibrilables por el DEA?',
    options: [
      'Asistolia y actividad eléctrica sin pulso',
      'Fibrilación ventricular y taquicardia ventricular sin pulso',
      'Bradicardia sinusal y bloqueo AV',
      'Cualquier ritmo irregular',
    ],
    correct: 1,
    explanation:
      'Los ritmos desfibrilables son la Fibrilación Ventricular (FV) y la Taquicardia Ventricular sin pulso (TVSP). La asistolia y la AESP NO son desfibrilables.',
  },
  {
    id: 60,
    category: 'dea',
    difficulty: 'easy',
    type: 'true-false',
    question: 'El DEA se puede usar de forma segura en una superficie mojada.',
    correct: false,
    explanation:
      'Falso. Es necesario secar el pecho del paciente y apartarlo de superficies mojadas antes de usar el DEA para evitar el riesgo de descarga eléctrica al reanimador.',
  },

  // ═══════════════════════════════════════════
  // SITUACIONES ESPECIALES (4 preguntas)
  // ═══════════════════════════════════════════
  {
    id: 61,
    category: 'especial',
    difficulty: 'medium',
    type: 'multiple',
    question: 'En caso de atragantamiento en un adulto consciente con obstrucción GRAVE, ¿qué maniobra se aplica?',
    options: [
      'Solo golpes en la espalda',
      'Compresiones abdominales (maniobra de Heimlich)',
      'Alternando 5 golpes interescapulares y 5 compresiones abdominales',
      'Ventilación boca a boca',
    ],
    correct: 2,
    explanation:
      'En adultos conscientes con obstrucción grave se alternan 5 golpes interescapulares con 5 compresiones abdominales (Heimlich) hasta resolver la obstrucción o la pérdida de consciencia.',
  },
  {
    id: 62,
    category: 'especial',
    difficulty: 'hard',
    type: 'multiple',
    question: '¿Qué se debe hacer si una víctima de atragantamiento pierde la consciencia?',
    options: [
      'Continuar con la maniobra de Heimlich en el suelo',
      'Colocar en PLS y esperar la ambulancia',
      'Tumbar en el suelo, llamar al 112 e iniciar RCP (30:2)',
      'Realizar un barrido digital de la boca inmediatamente',
    ],
    correct: 2,
    explanation:
      'Si el paciente pierde la consciencia, se tumba suavemente en el suelo, se llama al 112 y se inicia RCP con 30 compresiones y 2 ventilaciones. Las compresiones pueden desplazar el objeto.',
  },
  {
    id: 63,
    category: 'especial',
    difficulty: 'medium',
    type: 'true-false',
    question: 'En caso de hipotermia severa, se aplica el principio: "no está muerto hasta que está caliente y muerto".',
    correct: true,
    explanation:
      'Correcto. La hipotermia puede dar signos vitales mínimos difíciles de detectar. La RCP debe continuarse hasta que el paciente sea recalentado, ya que la hipotermia puede proteger al cerebro.',
  },
  {
    id: 64,
    category: 'especial',
    difficulty: 'easy',
    type: 'true-false',
    question: 'En caso de atragantamiento, siempre se debe realizar la maniobra de Heimlich independientemente de la edad del paciente.',
    correct: false,
    explanation:
      'Falso. La maniobra de Heimlich (compresiones abdominales) se usa en adultos y niños mayores de 1 año. En lactantes se usan golpes interescapulares y compresiones torácicas.',
  },

  // ═══════════════════════════════════════════
  // PROTOCOLOS LEGALES (4 preguntas)
  // ═══════════════════════════════════════════
  {
    id: 65,
    category: 'legal',
    difficulty: 'medium',
    type: 'multiple',
    question: '¿Qué regula el Decreto 38/2017 en materia de DEA?',
    options: [
      'La fabricación de desfibriladores en España',
      'La instalación obligatoria y uso de DEA en determinados espacios públicos',
      'Los precios de los cursos de formación en RCP',
      'La investigación científica sobre desfibrilación',
    ],
    correct: 1,
    explanation:
      'El Decreto 38/2017 regula la instalación obligatoria de DEA en determinados espacios públicos y las condiciones para su uso por personal no sanitario con la formación adecuada.',
  },
  {
    id: 66,
    category: 'legal',
    difficulty: 'easy',
    type: 'true-false',
    question: 'En España, cualquier persona puede usar un DEA en una emergencia sin temor a consecuencias legales si actúa de buena fe.',
    correct: true,
    explanation:
      'Correcto. La normativa española protege legalmente a quienes usen un DEA en una emergencia actuando de buena fe. No auxiliar pudiendo hacerlo puede constituir un delito de omisión del deber de socorro.',
  },
  {
    id: 67,
    category: 'legal',
    difficulty: 'hard',
    type: 'multiple',
    question: '¿Qué delito puede cometer una persona que no auxilia a alguien en peligro pudiendo hacerlo sin riesgo propio?',
    options: [
      'Delito de homicidio imprudente',
      'Delito de omisión del deber de socorro',
      'Delito de negligencia profesional',
      'No existe ningún delito aplicable',
    ],
    correct: 1,
    explanation:
      'El Código Penal español tipifica el delito de omisión del deber de socorro (art. 195) para quienes no socorren a una persona en peligro manifiesto y grave pudiendo hacerlo sin riesgo propio.',
  },
  {
    id: 68,
    category: 'legal',
    difficulty: 'medium',
    type: 'true-false',
    question: 'Los centros educativos y grandes superficies comerciales están obligados por ley a disponer de un DEA.',
    correct: true,
    explanation:
      'Correcto. La normativa vigente obliga a determinados establecimientos de gran afluencia pública, como centros educativos, centros comerciales y polideportivos, a disponer de un DEA accesible.',
  },
]
