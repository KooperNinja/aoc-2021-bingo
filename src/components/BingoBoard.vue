<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { Field } from '../App.vue'

interface Props {
  fields : Field[]
  index : number
  nextDraw : number | null
}

class Winner {
  boardindex : number
  fields : Field[]
  score : number

  constructor(boardIndex : number, fields : Field[], winningDraw : number) {
    this.boardindex = boardIndex
    this.fields = fields

    this.score = 0
    for(const unmarkedField of fields.filter((field) => !field.highlighted)) {
      this.score += unmarkedField.num
    }
    this.score *= winningDraw
  }
}

const props = defineProps<Props>()

const emit = defineEmits<{
  boardWon : [winner : Winner]
}>()

const fields = ref(props.fields)
const rows = ref<[Field[]?]>([])
const columns = ref<[Field[]?]>([])

const setRows = () => {
  let newRow = []
  for(const field of fields.value) {
    const index = fields.value.indexOf(field)
    if(index%5 == 0) {
      newRow = []
    }
    newRow.push(field)

    if(index%5 == 4) {
      rows.value.push(newRow)
    }
  }
}

const setColumns = () => {
  for(const field of fields.value) {
    const columnIndex = fields.value.indexOf(field)%5
    if(!columns.value[columnIndex]) {
      columns.value[columnIndex] = []
    }
    columns.value[columnIndex]?.push(field)
  }
}

const checkWin = (line : Field[]) : Winner | false => {
  if(line.length < 1) return false
  for(const field of line) {
    if (!field.highlighted) return false
  }
  const winner = new Winner(props.index, fields.value, props.nextDraw ? props.nextDraw : 0)
  console.log("We have a Winner: ", winner, props.nextDraw)
  emit('boardWon', winner)
  return winner 
}


watchEffect(() => {
  if(fields.value.length == 25) {
    setRows()
    setColumns()
  }
})

watchEffect(() => {
  if(props.nextDraw != null) {
    const affectedFields = fields.value.filter((field : Field) => {
      return field.num == props.nextDraw
    })
    for(const field of affectedFields) {
      field.highlighted = true
    }

    for(const line of rows.value.concat(columns.value)) {
      if(!line) continue
      checkWin(line)
    }
  }
})

export type { Winner }

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
    width: auto;
    margin: 1rem;
    text-align: center; 
  }
  .board-title {
    text-align: center;
  }
  .grid-container {
    display: grid;
    grid-template-columns: 2rem 2rem 2rem 2rem 2rem;
    justify-content: center;
  }
  .grid-item {
    text-align: center;
  }
</style>
