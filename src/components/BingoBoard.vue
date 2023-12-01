<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { Field } from '../App.vue'

interface Props {
  fields : Field[]
  index: number
}

const props = defineProps<Props>()

const fields = ref(props.fields)

watchEffect(() => {

})

</script>

<template>
  <div class="board">
    <div class="board-title">Board {{ index }}</div>

    <div class="grid-container">
      <div v-for="field in fields" class="grid-item" :class="field.highlighted ? 'highlighted' : ''" >
        {{ field.num }}
      </div>
    </div>
  </div>
</template>

<style scoped>
  .highlighted {
    background-color: #42b883aa;
  }
  .board {
    width: 10rem;
    margin: 1rem;
  }
  .board-title {
    text-align: center;

  }
  .grid-container {
    display: grid;
    grid-template-columns: 2rem 2rem 2rem 2rem 2rem;

  }
  .grid-item {
    text-align: center;
  }
</style>
