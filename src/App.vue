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
  let lines = text.split(/\r?\n|\r|\n/g)
  
  //Checking the Draw Line
  if(!/([\d]+,)+[\d]+/.test(lines[0])){
    console.error("Draw Input didn't pass Regex", lines[0], /([\d]+,)+[\d]+/)
    return
  }
  draw.value = lines[0].split(",")
  
  //Remove Draw line, as it has been handled
  lines.splice(0, 1)
  
  //Remove spacing lines
  for(const line of lines) {
    if(/[\d ]+[\d]/.test(line)) continue
    const index = lines.indexOf(line)
    lines.splice(index, 1)
  }

  let newBoard : Board | null = null
  for(const line of lines) {
    const index = lines.indexOf(line)
    //First Row of Board
    if(index%5 == 0) {
      newBoard = { fields: []}
    }
    const numbers = line.split(/[ ]+?[ ]*/)

    for(const numberString of numbers) {
      if(numberString.length < 1) continue
      const num = Number(numberString)
      newBoard?.fields.push(new Field(num))
    }
    //Last Row of Board
    if(index%5 == 4) {
      if(newBoard == null) continue
      if(newBoard.fields.length > 25) {
        console.error(newBoard, "has more than 25 fields")
        continue
      }
      boards.value.push(newBoard)
    }
  }

  console.log(lines)
  console.log(boards.value)
}



const draw = ref<string[] | []>([])
const boards : Ref<Board[]> = ref([])

export type { Field }
</script>
  
<template>
  <div class="draw">
    <p>{{ draw.toString()}}</p>
  </div>

  <div class="board-container">
    <BingoBoard v-for="(board, index) in boards" :fields="board.fields" :index="index"></BingoBoard>
  </div>

  <FileInput @file-submitted="onFileSubmitted"></FileInput>
  
</template>

<style scoped>

.board-container {
  display: grid;
  grid-template-columns: auto auto auto auto auto;
}
.draw p {
  text-align: left;
  overflow: hidden;
}

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
