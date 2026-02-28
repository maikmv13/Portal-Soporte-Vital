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
            Header: './src/components/Header.astro',
            Footer: './src/components/Footer.astro',
        },
        sidebar: [
            {
                label: '1. Introducción SVA',
                collapsed: true,
                items: [
                    { label: 'Presentación', link: '/introduccion/presentacion' },
                    { label: 'Soporte Vital', link: '/introduccion/soporte-vital' },
                    { label: 'Definición y objetivos', link: '/introduccion/definicion' },
                    { label: 'Historia y ERC', link: '/introduccion/historia-erc' },
                    { label: 'Consejo Español RCP', link: '/introduccion/consejo-espanol' },
                    { label: 'Formación en RCP', link: '/introduccion/formacion-rcp' }
                ]
            },
            {
                label: '2. Unidades de Soporte',
                collapsed: true,
                items: [
                    { label: 'SVA Med. vs Enfermero', link: '/tipos-unidades-soporte-vital/sva-medicalizado-enfermero' },
                    { label: 'Red de Transporte', link: '/tipos-unidades-soporte-vital/red-transporte-sanitario' },
                    { label: 'Helicópteros', link: '/tipos-unidades-soporte-vital/helicopteros-medicalizados' },
                    { label: 'Implantación SVAE', link: '/tipos-unidades-soporte-vital/implantacion-svae' }
                ]
            },
            {
                label: '3. Soporte Vital Básico',
                collapsed: true,
                items: [
                    { label: 'Concepto SVB', link: '/svb/concepto' },
                    { label: 'Niveles de RCP', link: '/svb/niveles' },
                    { label: 'Técnicas básicas', link: '/svb/tecnicas' },
                    { label: 'Manejo OVACE', link: '/svb/ovace' }
                ]
            },
            {
                label: '4. Objetivos SVB',
                collapsed: true,
                items: [
                    { label: 'Valoración víctima', link: '/objetivos/valoracion' },
                    { label: 'Compresiones', link: '/objetivos/compresiones' },
                    { label: 'Uso del DEA', link: '/objetivos/dea' },
                    { label: 'Posición PLS', link: '/objetivos/pls' },
                    { label: 'Atragantamientos', link: '/objetivos/atragantamiento' }
                ]
            },
            {
                label: '5. Parada (PCR)',
                collapsed: true,
                items: [
                    { label: 'Definición', link: '/pcr/definicion' },
                    { label: 'Algoritmo PCR', link: '/pcr/algoritmo' },
                    { label: 'Atención precoz', link: '/pcr/atencion-precoz' }
                ]
            },
            {
                label: '6. Reanimación (RCP)',
                collapsed: true,
                items: [
                    { label: 'Introducción', link: '/rcp' },
                    { label: 'Estadísticas', link: '/rcp/estadisticas' },
                    { label: 'Supervivencia', link: '/rcp/supervivencia-tiempo' },
                    { label: 'Casos especiales', link: '/rcp/casos-especiales' }
                ]
            },
            {
                label: '7. Cadena Supervivencia',
                collapsed: true,
                items: [
                    { label: 'Visión General', link: '/cadena-supervivencia' },
                    { label: 'Eslabones', link: '/cadena-supervivencia/eslabones' },
                    { label: 'Formación', link: '/cadena-supervivencia/formacion-profesionales' },
                    { label: 'Central 061', link: '/cadena-supervivencia/central-coordinacion' }
                ]
            },
            { label: '8. Algoritmo Adultos', link: '/algoritmo-svb-adultos' },
            { label: '9. Posición PLS', link: '/posicion-lateral-seguridad' },
            { label: '10. Manejo PCR Adultos', link: '/manejo-pcr-adultos' },
            {
                label: '11. SVB Pediátrico',
                collapsed: true,
                items: [
                    { label: 'Diferencias', link: '/svb-pediatrico/diferencias-con-adultos' },
                    { label: 'Algoritmo', link: '/svb-pediatrico/algoritmo-pediatrico' },
                    { label: 'Reconocimiento', link: '/svb-pediatrico/reconocimiento-pcr' },
                    { label: 'Técnicas', link: '/svb-pediatrico/tecnicas-especificas' }
                ]
            },
            {
                label: '12. SVB Lactantes',
                collapsed: true,
                items: [
                    { label: 'OVACE pediátrica', link: '/svb-lactantes-ninos/ovace-pediatrica' },
                    { label: 'Desobstrucción', link: '/svb-lactantes-ninos/tecnicas-desobstruccion' },
                    { label: 'PCR pediátrica', link: '/svb-lactantes-ninos/pcr-pediatrica' }
                ]
            },
            { label: '13. Uso del DEA', link: '/desfibrilacion-externa-automatica/funcionamiento' },
            { label: '14. Situaciones Especiales', link: '/situaciones-especiales/atragantamiento' },
            { label: '15. Protocolos Legales', link: '/protocolos-legales-dea/decreto-38-2017' },
            { label: '16. Conclusiones', link: '/conclusiones/formacion-continua' },
            { label: '🎯 Trivial', link: '/trivial' },
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