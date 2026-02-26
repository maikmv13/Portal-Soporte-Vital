// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
    integrations: [starlight({
        title: 'Soporte Vital',
        logo: {
            src: './src/assets/logo-ambulance.svg',
        },
        expressiveCode: {
            themes: ['github-light'],
        },
        head: [
            {
                tag: 'script',
                content: `
                    // Lock theme to light
                    document.documentElement.dataset.theme = 'light';
                    const observer = new MutationObserver(() => {
                        if (document.documentElement.dataset.theme !== 'light') {
                            document.documentElement.dataset.theme = 'light';
                        }
                    });
                    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
                `
            }
        ],
        customCss: [
            './src/styles/custom.css',
        ],
        components: {
            SiteTitle: './src/components/SiteTitle.astro',
            SocialIcons: './src/components/RightNav.astro',
        },
        sidebar: [
            {
                label: '1. Introducción al Soporte Vital Avanzado (SVA)',
                collapsed: true,
                items: [
                    { label: 'Presentación', link: '/introduccion/presentacion' },
                    { label: 'Soporte Vital', link: '/introduccion/soporte-vital' },
                    { label: 'Definición y objetivos', link: '/introduccion/definicion' },
                    { label: 'Historia y relevancia del ERC', link: '/introduccion/historia-erc' },
                    { label: 'Consejo Español de RCP', link: '/introduccion/consejo-espanol' },
                    { label: 'Formación en RCP', link: '/introduccion/formacion-rcp' }
                ]
            },
            {
                label: '2. Tipos de Unidades de Soporte Vital',
                collapsed: true,
                items: [
                    { label: 'SVA Medicalizado y SVA Enfermero', link: '/tipos-unidades-soporte-vital/sva-medicalizado-enfermero' },
                    { label: 'Red de Transporte Sanitario Urgente', link: '/tipos-unidades-soporte-vital/red-transporte-sanitario' },
                    { label: 'Helicópteros Medicalizados', link: '/tipos-unidades-soporte-vital/helicopteros-medicalizados' },
                    { label: 'Implantación de SVAE', link: '/tipos-unidades-soporte-vital/implantacion-svae' }
                ]
            },
            {
                label: '3. Soporte Vital Básico (SVB)',
                collapsed: true,
                items: [
                    { label: 'Concepto de SVB', link: '/svb/concepto' },
                    { label: 'RCP en dos niveles', link: '/svb/niveles' },
                    { label: 'Técnicas básicas', link: '/svb/tecnicas' },
                    { label: 'Manejo de la OVACE', link: '/svb/ovace' }
                ]
            },
            {
                label: '4. Objetivos del Soporte Vital Básico',
                collapsed: true,
                items: [
                    { label: 'Valoración de la víctima', link: '/objetivos/valoracion' },
                    { label: 'Compresiones torácicas', link: '/objetivos/compresiones' },
                    { label: 'Uso del DEA', link: '/objetivos/dea' },
                    { label: 'Posición lateral de seguridad', link: '/objetivos/pls' },
                    { label: 'Manejo de atragantamientos', link: '/objetivos/atragantamiento' }
                ]
            },
            {
                label: '5. Parada Cardio-Respiratoria (PCR)',
                collapsed: true,
                items: [
                    { label: 'Definición y diagnóstico', link: '/pcr/definicion' },
                    { label: 'Algoritmo PCR', link: '/pcr/algoritmo' },
                    { label: 'Atención precoz', link: '/pcr/atencion-precoz' }
                ]
            },
            {
                label: '6. Reanimación Cardiopulmonar (RCP)',
                collapsed: true,
                items: [
                    { label: 'Introducción a la RCP', link: '/rcp' },
                    { label: 'Estadísticas en España', link: '/rcp/estadisticas' },
                    { label: 'Supervivencia y tiempo', link: '/rcp/supervivencia-tiempo' },
                    { label: 'Casos especiales', link: '/rcp/casos-especiales' }
                ]
            },
            {
                label: '7. Cadena de Supervivencia',
                collapsed: true,
                items: [
                    { label: 'Visión General', link: '/cadena-supervivencia' },
                    { label: 'Eslabones de la cadena', link: '/cadena-supervivencia/eslabones' },
                    { label: 'Formación de profesionales', link: '/cadena-supervivencia/formacion-profesionales' },
                    { label: 'Central de Coordinación 061', link: '/cadena-supervivencia/central-coordinacion' }
                ]
            },
            {
                label: '8. Algoritmo SVB para Adultos',
                collapsed: true,
                items: [
                    { label: 'Resumen del Algoritmo', link: '/algoritmo-svb-adultos' },
                    { label: 'Seguridad', link: '/algoritmo-svb-adultos/seguridad' },
                    { label: 'Evaluación inicial', link: '/algoritmo-svb-adultos/evaluacion-inicial' },
                    { label: 'RCP y solicitud de ayuda', link: '/algoritmo-svb-adultos/rcp-y-ayuda' }
                ]
            },
            {
                label: '9. Posición Lateral de Seguridad',
                collapsed: true,
                items: [
                    { label: 'Visión general', link: '/posicion-lateral-seguridad' },
                    { label: 'Procedimiento', link: '/posicion-lateral-seguridad/procedimiento' },
                    { label: 'Beneficios', link: '/posicion-lateral-seguridad/beneficios' }
                ]
            },
            {
                label: '10. Manejo de la PCR en Adultos',
                collapsed: true,
                items: [
                    { label: 'Visión general', link: '/manejo-pcr-adultos' },
                    { label: 'Procedimiento', link: '/manejo-pcr-adultos/procedimiento' },
                    { label: 'Uso del DEA', link: '/manejo-pcr-adultos/uso-dea' },
                    { label: 'Compresiones de calidad', link: '/manejo-pcr-adultos/compresiones' }
                ]
            },
            {
                label: '11. SVB Pediátrico',
                collapsed: true,
                items: [
                    { label: 'Diferencias con adultos', link: '/svb-pediatrico/diferencias-con-adultos' },
                    { label: 'Algoritmo pediátrico', link: '/svb-pediatrico/algoritmo-pediatrico' },
                    { label: 'Reconocimiento PCR', link: '/svb-pediatrico/reconocimiento-pcr' },
                    { label: 'Técnicas específicas', link: '/svb-pediatrico/tecnicas-especificas' }
                ]
            },
            {
                label: '12. SVB en Lactantes y Niños',
                collapsed: true,
                items: [
                    { label: 'OVACE pediátrica', link: '/svb-lactantes-ninos/ovace-pediatrica' },
                    { label: 'Técnicas de desobstrucción', link: '/svb-lactantes-ninos/tecnicas-desobstruccion' },
                    { label: 'PCR pediátrica', link: '/svb-lactantes-ninos/pcr-pediatrica' }
                ]
            },
            {
                label: '13. Desfibrilación Externa Automática',
                collapsed: true,
                items: [
                    { label: 'Funcionamiento', link: '/desfibrilacion-externa-automatica/funcionamiento' },
                    { label: 'Colocación de parches', link: '/desfibrilacion-externa-automatica/colocacion-parches' },
                    { label: 'Energía recomendada', link: '/desfibrilacion-externa-automatica/energia-recomendada' }
                ]
            },
            {
                label: '14. Situaciones Especiales',
                collapsed: true,
                items: [
                    { label: 'Atragantamiento', link: '/situaciones-especiales/atragantamiento' },
                    { label: 'Casos específicos', link: '/situaciones-especiales/casos-especificos' }
                ]
            },
            {
                label: '15. Protocolos Legales y DEA',
                collapsed: true,
                items: [
                    { label: 'Decreto 38/2017', link: '/protocolos-legales-dea/decreto-38-2017' },
                    { label: 'Uso autorizado', link: '/protocolos-legales-dea/uso-autorizado' }
                ]
            },
            {
                label: '16. Conclusiones',
                collapsed: true,
                items: [
                    { label: 'Formación continua', link: '/conclusiones/formacion-continua' },
                    { label: 'Actuación temprana', link: '/conclusiones/actuacion-temprana' }
                ]
            },
            {
                label: '🎯 Evaluación y Práctica',
                collapsed: true,
                items: [
                    { label: 'Trivial Interactivo', link: '/trivial' }
                ]
            },
            {
                label: '📊 Algoritmos',
                collapsed: true,
                items: [
                    { label: 'SVB Adultos', link: '/recursos/algoritmos/svb-adultos' },
                    { label: 'SVB Pediátrico', link: '/recursos/algoritmos/svb-pediatrico' },
                    { label: 'SVA Adultos', link: '/recursos/algoritmos/sva-adultos' },
                    { label: 'OVACE', link: '/recursos/algoritmos/ovace' },
                    { label: 'DEA', link: '/recursos/algoritmos/dea' }
                ]
            }
        ],
    }), vue()],
});