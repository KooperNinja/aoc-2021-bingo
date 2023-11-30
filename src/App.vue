<script setup lang="ts">
import { Ref, ref } from 'vue';
import BingoBoard from './components/BingoBoard.vue';

class Field {
  num : number = 0
  highlighted : boolean = false

  constructor(num : number) {
    this.num = num
  }
}

interface Board {
  fields : Field[]
}

const draw = ref([2, 24])
const boards : Ref<Board[]> = ref({fields: [new Field(2)]})

export type { Field }
</script>
  
<template>
  <div v-for="board in boards">
    <BingoBoard :fields="board.fields"></BingoBoard>
  </div>
  
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
