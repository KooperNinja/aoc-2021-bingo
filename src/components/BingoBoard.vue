<script setup lang="ts">
import { ref } from 'vue'
import { Field } from '../App.vue'

interface Props {
  fields : Field[]
}

const props = defineProps<Props>()

const fields = ref(props.fields)
</script>

<template>
  <h1>Hello</h1>

  <div class="grid-container">
    <div v-for="field in fields" class="grid-item">
      {{ field.num }}
    </div>
  </div>

</template>

<style scoped>

</style>