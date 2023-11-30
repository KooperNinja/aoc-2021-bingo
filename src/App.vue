<script setup lang="ts">
import { Ref, ref } from 'vue';
import BingoBoard from './components/BingoBoard.vue';
import FileInput from './components/FileInput.vue';

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

const onFileSubmitted = (text : string) => {
  const lines = text.split(/\r?\n|\r|\n/g)
  console.log("Draw:", lines[0])
  if(!/([\d]+,)+[\d]+/.test(lines[0])){
    console.error("Input didn't pass Regex", lines[0], /([\d]+,)+[\d]+/)
    return
  }
  draw.value = lines[0].split(",")
}

const draw = ref<string[] | []>([])
const boards : Ref<Board[]> = ref([])

export type { Field }
</script>
  
<template>
  <div class="draw">
    {{ draw.toString()}}
  </div>

  <div class="board-container">
    <BingoBoard v-for="(board, index) in boards" :fields="board.fields" :index="index"></BingoBoard>
  </div>

  <FileInput @file-submitted="onFileSubmitted"></FileInput>
  
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
