---
layout: page
title: Trivial de Soporte Vital
description: Pon a prueba tus conocimientos sobre SVB, RCP, DEA y técnicas de emergencia con nuestro trivial interactivo
---

<script setup>
import { defineClientComponent } from 'vitepress'

const TrivialEnhanced = defineClientComponent(() => import('./.vitepress/theme/TrivialEnhanced.vue'))
</script>

# 🎯 Trivial de Soporte Vital

Evalúa tus conocimientos sobre Soporte Vital Básico, RCP, DEA y situaciones de emergencia.

<ClientOnly>
  <TrivialEnhanced />
</ClientOnly>
