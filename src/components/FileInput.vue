<script setup lang="ts">
import { ref } from 'vue';

const onFileChange = async ($event: Event) => {
    const target = $event.target as HTMLInputElement
    if(!target || !target.files) return
    if(!target.files[0]) return

    console.log(target.files[0].type)
    if(target.files[0].type == "text/plain") {
        console.log("Txt File")
    }
    fileText.value = await target.files[0].text() 
}

const fileText = ref<string | null>()
</script>

<template>
    <div class="input-container">
        <input type="file" accept=".txt" multiple="false" @change="onFileChange($event)"> 
    </div>
</template>

<style scoped>

</style>