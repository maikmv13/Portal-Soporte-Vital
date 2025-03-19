import { defineConfig } from 'vitepress'

// Estructura de contenidos centralizada
export const courseContent = [
  {
    text: '1️⃣ Introducción al Soporte Vital Avanzado (SVA)',
    collapsed: false,
    items: [
      { text: 'Presentación', link: '/introduccion/presentacion' },
      { text: 'Soporte Vital', link: '/introduccion/soporte-vital' },
      { text: 'Definición y objetivos', link: '/introduccion/definicion' },
      { text: 'Historia y relevancia del ERC', link: '/introduccion/historia-erc' },
      { text: 'Consejo Español de RCP', link: '/introduccion/consejo-espanol' },
      { text: 'Formación en RCP', link: '/introduccion/formacion-rcp' }
    ]
  },
  {
    text: '2️⃣ Tipos de Unidades de Soporte Vital',
    items: [
      { text: 'SVA Medicalizado y SVA Enfermero', link: '/tipos-unidades-soporte-vital/sva-medicalizado-enfermero' },
      { text: 'Red de Transporte Sanitario Urgente', link: '/tipos-unidades-soporte-vital/red-transporte-sanitario' },
      { text: 'Helicópteros Medicalizados', link: '/tipos-unidades-soporte-vital/helicopteros-medicalizados' },
      { text: 'Implantación de SVAE', link: '/tipos-unidades-soporte-vital/implantacion-svae' }
    ]
  },
  {
    text: '3️⃣ Soporte Vital Básico (SVB)',
    items: [
      { text: 'Concepto de SVB', link: '/svb/concepto' },
      { text: 'RCP en dos niveles', link: '/svb/niveles' },
      { text: 'Técnicas básicas', link: '/svb/tecnicas' },
      { text: 'Manejo de la OVACE', link: '/svb/ovace' }
    ]
  },
  {
    text: '4️⃣ Objetivos del Soporte Vital Básico',
    items: [
      { text: 'Valoración de la víctima', link: '/objetivos/valoracion' },
      { text: 'Compresiones torácicas', link: '/objetivos/compresiones' },
      { text: 'Uso del DEA', link: '/objetivos/dea' },
      { text: 'Posición lateral de seguridad', link: '/objetivos/pls' },
      { text: 'Manejo de atragantamientos', link: '/objetivos/atragantamiento' }
    ]
  },
  {
    text: '5️⃣ Parada Cardio-Respiratoria (PCR)',
    items: [
      { text: 'Definición y diagnóstico', link: '/pcr/definicion' },
      { text: 'Algoritmo PCR', link: '/pcr/algoritmo' },
      { text: 'Atención precoz', link: '/pcr/atencion-precoz' }
    ]
  },
  {
    text: '6️⃣ Reanimación Cardiopulmonar (RCP)',
    items: [
      { text: 'Introducción a la RCP', link: '/rcp/index' },
      { text: 'Estadísticas en España', link: '/rcp/estadisticas' },
      { text: 'Supervivencia y tiempo', link: '/rcp/supervivencia-tiempo' },
      { text: 'Casos especiales', link: '/rcp/casos-especiales' }
    ]
  },
  {
    text: '7️⃣ Cadena de Supervivencia',
    items: [
      { text: 'Visión General', link: '/cadena-supervivencia/' },
      { text: 'Eslabones de la cadena', link: '/cadena-supervivencia/eslabones' },
      { text: 'Formación de profesionales', link: '/cadena-supervivencia/formacion-profesionales' },
      { text: 'Central de Coordinación 061', link: '/cadena-supervivencia/central-coordinacion' }
    ]
  },
  {
    text: '8️⃣ Algoritmo SVB para Adultos',
    items: [
      { text: 'Resumen del Algoritmo', link: '/algoritmo-svb-adultos/' },
      { text: 'Seguridad', link: '/algoritmo-svb-adultos/seguridad' },
      { text: 'Evaluación inicial', link: '/algoritmo-svb-adultos/evaluacion-inicial' },
      { text: 'RCP y solicitud de ayuda', link: '/algoritmo-svb-adultos/rcp-y-ayuda' }
    ]
  },
  {
    text: '9️⃣ Posición Lateral de Seguridad',
    items: [
      { text: 'Visión general', link: '/posicion-lateral-seguridad/' },
      { text: 'Procedimiento', link: '/posicion-lateral-seguridad/procedimiento' },
      { text: 'Beneficios', link: '/posicion-lateral-seguridad/beneficios' }
    ]
  },
  {
    text: '🔟 Manejo de la PCR en Adultos',
    items: [
      { text: 'Visión general', link: '/manejo-pcr-adultos/' },
      { text: 'Procedimiento', link: '/manejo-pcr-adultos/procedimiento' },
      { text: 'Uso del DEA', link: '/manejo-pcr-adultos/uso-dea' },
      { text: 'Compresiones de calidad', link: '/manejo-pcr-adultos/compresiones' }
    ]
  },
  {
    text: '1️⃣1️⃣ SVB Pediátrico',
    items: [
      { text: 'Diferencias con adultos', link: '/svb-pediatrico/diferencias-con-adultos' },
      { text: 'Algoritmo pediátrico', link: '/svb-pediatrico/algoritmo-pediatrico' },
      { text: 'Reconocimiento PCR', link: '/svb-pediatrico/reconocimiento-pcr' },
      { text: 'Técnicas específicas', link: '/svb-pediatrico/tecnicas-especificas' }
    ]
  },
  {
    text: '1️⃣2️⃣ SVB en Lactantes y Niños',
    items: [
      { text: 'OVACE pediátrica', link: '/svb-lactantes-ninos/ovace-pediatrica' },
      { text: 'Técnicas de desobstrucción', link: '/svb-lactantes-ninos/tecnicas-desobstruccion' },
      { text: 'PCR pediátrica', link: '/svb-lactantes-ninos/pcr-pediatrica' }
    ]
  },
  {
    text: '1️⃣3️⃣ Desfibrilación Externa Automática',
    items: [
      { text: 'Funcionamiento', link: '/desfibrilacion-externa-automatica/funcionamiento' },
      { text: 'Colocación de parches', link: '/desfibrilacion-externa-automatica/colocacion-parches' },
      { text: 'Energía recomendada', link: '/desfibrilacion-externa-automatica/energia-recomendada' }
    ]
  },
  {
    text: '1️⃣4️⃣ Situaciones Especiales',
    items: [
      { text: 'Atragantamiento', link: '/situaciones-especiales/atragantamiento' },
      { text: 'Casos específicos', link: '/situaciones-especiales/casos-especificos' }
    ]
  },
  {
    text: '1️⃣5️⃣ Protocolos Legales y DEA',
    items: [
      { text: 'Decreto 38/2017', link: '/protocolos-legales-dea/decreto-38-2017' },
      { text: 'Uso autorizado', link: '/protocolos-legales-dea/uso-autorizado' }
    ]
  },
  {
    text: '1️⃣6️⃣ Conclusiones',
    items: [
      { text: 'Formación continua', link: '/conclusiones/formacion-continua' },
      { text: 'Actuación temprana', link: '/conclusiones/actuacion-temprana' }
    ]
  },
  {
    text: '📊 Algoritmos',
    items: [
      {
        text: 'Algoritmos',
        items: [
          { text: 'SVB Adultos', link: '/recursos/algoritmos/svb-adultos' },
          { text: 'SVB Pediátrico', link: '/recursos/algoritmos/svb-pediatrico' },
          { text: 'SVA Adultos', link: '/recursos/algoritmos/sva-adultos' },
          { text: 'OVACE', link: '/recursos/algoritmos/ovace' },
          { text: 'DEA', link: '/recursos/algoritmos/dea' }
        ]
      }
    ]
  }
];

export default defineConfig({
  lang: 'es-ES',
  title: 'Curso SVB y SVA',
  description: 'Curso de Soporte Vital Básico y Avanzado',
  lastUpdated: false,
  appearance: false,
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' }]
  ],

  // Configuración del servidor de desarrollo
  vite: {
    server: {
      port: 3000, // Puerto personalizado
      open: true  // Abre automáticamente el navegador
    }
  },

  themeConfig: {
    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Guía', link: '/guia' },
      {
        text: 'Recursos',
        items: [
          { text: 'Algoritmos', link: '/recursos/algoritmos/' },
          { text: 'Videos', link: '/recursos/videos/' },
          { text: 'Documentos', link: '/recursos/documentos/' }
        ]
      }
    ],

    // Usar la estructura de contenidos centralizada
    sidebar: courseContent,

    footer: {
      message: 'Creado con ❤️ por Aurora Vizoso García',
      copyright: 'Copyright © 2024'
    },

    search: {
      provider: 'local'
    },

    outline: {
      level: [2, 3],
      label: 'En esta página'
    },

    docFooter: {
      prev: 'Página anterior',
      next: 'Siguiente página'
    }
  }
})