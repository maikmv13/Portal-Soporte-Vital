import { defineConfig } from 'vitepress'

// Estructura de contenidos centralizada
export const courseContent = [
  {
    text: '1. Introducción al Soporte Vital Avanzado (SVA)',
    collapsed: true,
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
    text: '2. Tipos de Unidades de Soporte Vital',
    collapsed: true,
    items: [
      { text: 'SVA Medicalizado y SVA Enfermero', link: '/tipos-unidades-soporte-vital/sva-medicalizado-enfermero' },
      { text: 'Red de Transporte Sanitario Urgente', link: '/tipos-unidades-soporte-vital/red-transporte-sanitario' },
      { text: 'Helicópteros Medicalizados', link: '/tipos-unidades-soporte-vital/helicopteros-medicalizados' },
      { text: 'Implantación de SVAE', link: '/tipos-unidades-soporte-vital/implantacion-svae' }
    ]
  },
  {
    text: '3. Soporte Vital Básico (SVB)',
    collapsed: true,
    items: [
      { text: 'Concepto de SVB', link: '/svb/concepto' },
      { text: 'RCP en dos niveles', link: '/svb/niveles' },
      { text: 'Técnicas básicas', link: '/svb/tecnicas' },
      { text: 'Manejo de la OVACE', link: '/svb/ovace' }
    ]
  },
  {
    text: '4. Objetivos del Soporte Vital Básico',
    collapsed: true,
    items: [
      { text: 'Valoración de la víctima', link: '/objetivos/valoracion' },
      { text: 'Compresiones torácicas', link: '/objetivos/compresiones' },
      { text: 'Uso del DEA', link: '/objetivos/dea' },
      { text: 'Posición lateral de seguridad', link: '/objetivos/pls' },
      { text: 'Manejo de atragantamientos', link: '/objetivos/atragantamiento' }
    ]
  },
  {
    text: '5. Parada Cardio-Respiratoria (PCR)',
    collapsed: true,
    items: [
      { text: 'Definición y diagnóstico', link: '/pcr/definicion' },
      { text: 'Algoritmo PCR', link: '/pcr/algoritmo' },
      { text: 'Atención precoz', link: '/pcr/atencion-precoz' }
    ]
  },
  {
    text: '6. Reanimación Cardiopulmonar (RCP)',
    collapsed: true,
    items: [
      { text: 'Introducción a la RCP', link: '/rcp/index' },
      { text: 'Estadísticas en España', link: '/rcp/estadisticas' },
      { text: 'Supervivencia y tiempo', link: '/rcp/supervivencia-tiempo' },
      { text: 'Casos especiales', link: '/rcp/casos-especiales' }
    ]
  },
  {
    text: '7. Cadena de Supervivencia',
    collapsed: true,
    items: [
      { text: 'Visión General', link: '/cadena-supervivencia/' },
      { text: 'Eslabones de la cadena', link: '/cadena-supervivencia/eslabones' },
      { text: 'Formación de profesionales', link: '/cadena-supervivencia/formacion-profesionales' },
      { text: 'Central de Coordinación 061', link: '/cadena-supervivencia/central-coordinacion' }
    ]
  },
  {
    text: '8. Algoritmo SVB para Adultos',
    collapsed: true,
    items: [
      { text: 'Resumen del Algoritmo', link: '/algoritmo-svb-adultos/' },
      { text: 'Seguridad', link: '/algoritmo-svb-adultos/seguridad' },
      { text: 'Evaluación inicial', link: '/algoritmo-svb-adultos/evaluacion-inicial' },
      { text: 'RCP y solicitud de ayuda', link: '/algoritmo-svb-adultos/rcp-y-ayuda' }
    ]
  },
  {
    text: '9. Posición Lateral de Seguridad',
    collapsed: true,
    items: [
      { text: 'Visión general', link: '/posicion-lateral-seguridad/' },
      { text: 'Procedimiento', link: '/posicion-lateral-seguridad/procedimiento' },
      { text: 'Beneficios', link: '/posicion-lateral-seguridad/beneficios' }
    ]
  },
  {
    text: '10. Manejo de la PCR en Adultos',
    collapsed: true,
    items: [
      { text: 'Visión general', link: '/manejo-pcr-adultos/' },
      { text: 'Procedimiento', link: '/manejo-pcr-adultos/procedimiento' },
      { text: 'Uso del DEA', link: '/manejo-pcr-adultos/uso-dea' },
      { text: 'Compresiones de calidad', link: '/manejo-pcr-adultos/compresiones' }
    ]
  },
  {
    text: '11. SVB Pediátrico',
    collapsed: true,
    items: [
      { text: 'Diferencias con adultos', link: '/svb-pediatrico/diferencias-con-adultos' },
      { text: 'Algoritmo pediátrico', link: '/svb-pediatrico/algoritmo-pediatrico' },
      { text: 'Reconocimiento PCR', link: '/svb-pediatrico/reconocimiento-pcr' },
      { text: 'Técnicas específicas', link: '/svb-pediatrico/tecnicas-especificas' }
    ]
  },
  {
    text: '12. SVB en Lactantes y Niños',
    collapsed: true,
    items: [
      { text: 'OVACE pediátrica', link: '/svb-lactantes-ninos/ovace-pediatrica' },
      { text: 'Técnicas de desobstrucción', link: '/svb-lactantes-ninos/tecnicas-desobstruccion' },
      { text: 'PCR pediátrica', link: '/svb-lactantes-ninos/pcr-pediatrica' }
    ]
  },
  {
    text: '13. Desfibrilación Externa Automática',
    collapsed: true,
    items: [
      { text: 'Funcionamiento', link: '/desfibrilacion-externa-automatica/funcionamiento' },
      { text: 'Colocación de parches', link: '/desfibrilacion-externa-automatica/colocacion-parches' },
      { text: 'Energía recomendada', link: '/desfibrilacion-externa-automatica/energia-recomendada' }
    ]
  },
  {
    text: '14. Situaciones Especiales',
    collapsed: true,
    items: [
      { text: 'Atragantamiento', link: '/situaciones-especiales/atragantamiento' },
      { text: 'Casos específicos', link: '/situaciones-especiales/casos-especificos' }
    ]
  },
  {
    text: '15. Protocolos Legales y DEA',
    collapsed: true,
    items: [
      { text: 'Decreto 38/2017', link: '/protocolos-legales-dea/decreto-38-2017' },
      { text: 'Uso autorizado', link: '/protocolos-legales-dea/uso-autorizado' }
    ]
  },
  {
    text: '16. Conclusiones',
    collapsed: true,
    items: [
      { text: 'Formación continua', link: '/conclusiones/formacion-continua' },
      { text: 'Actuación temprana', link: '/conclusiones/actuacion-temprana' }
    ]
  },
  {
    text: '🎯 Evaluación y Práctica',
    collapsed: true,
    items: [
      { text: 'Trivial Interactivo', link: '/trivial' }
    ]
  },
  {
    text: '📊 Algoritmos',
    collapsed: true,
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
  title: 'Soporte Vital',
  description: 'Curso de Soporte Vital Básico y Avanzado',
  lastUpdated: false,
  appearance: false,

  head: [
    ['link', { rel: 'icon', href: '/logo-ambulance.svg' }],
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
    logo: '/logo-ambulance.svg',
    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Guía', link: '/guia' },
      { text: '🎯 Trivial', link: '/trivial' },
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