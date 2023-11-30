<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
    fileSubmitted: [text : string]
}>()

const onFileChange = async ($event: Event) => {
    const target = $event.target as HTMLInputElement
    if(!target || !target.files || !target.files[0]) {
        return
    }
    
    if(target.files[0].type !== "text/plain") {
        target.value = ""
        fileText.value = null
        return
    }

    fileText.value = await target.files[0].text()
}

const onFileClear = () => {
    fileText.value = null
    if(!fileInput.value) return
    fileInput.value.value = ""
}

const onFileSubmit = () => {
    if(!fileText.value) return
    emit('fileSubmitted', fileText.value)
    onFileClear()
}

const fileInput = ref<HTMLInputElement | null>(null)
const fileText = ref<string | null>()
</script>

<template>
    <div class="input-container">
        <input type="file" accept=".txt" multiple="false" @change="onFileChange($event)" ref="fileInput">
        <button v-if="fileText" @click="onFileSubmit">Submit</button>
        <button v-if="fileText" @click="onFileClear">Clear</button>
    </div>
    <div v-if="fileText !== null" class="preview">
        {{ fileText }}
    </div>
</template>

<style scoped>

</style>