<template>
    <label class="inline-flex items-center relative cursor-pointer">
        <input
        class="peer hidden"
        type="checkbox"
        :checked="dark"
        @change="toggleDark"/>
        <div
            class="relative w-[70px] h-[30px] bg-white peer-checked:bg-zinc-500 rounded-full
            after:absolute after:content-[''] after:w-[24px] after:h-[24px] after:bg-gradient-to-r from-orange-500 to-yellow-400
            peer-checked:after:from-zinc-900 peer-checked:after:to-zinc-900 after:rounded-full
            after:top-[3px] after:left-[3px] active:after:w-[30px]
            peer-checked:after:left-[67px] peer-checked:after:translate-x-[-100%]
            shadow-sm duration-300 after:duration-300 after:shadow-md">
        </div>

        <!-- Sonne -->
        <svg
            viewBox="0 0 24 24"
            class="fill-white peer-checked:opacity-60 absolute w-4 h-4 left-[8px] top-[8px]"
            xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5ZM13,0h-2V5h2V0Zm0,19h-2v5h2v-5ZM5,11H0v2H5v-2Zm19,0h-5v2h5v-2Zm-2.81-6.78l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54ZM7.76,17.66l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54Zm0-11.31l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Zm13.44,13.44l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Z"/>
        </svg>

        <!-- Mond -->
        <svg
            viewBox="0 0 24 24"
            class="fill-black opacity-60 peer-checked:opacity-70 peer-checked:fill-white absolute w-4 h-4 right-[8px] top-[8px]"
            xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12.009,24A12.067,12.067,0,0,1,.075,10.725,12.121,12.121,0,0,1,10.1.152a13,13,0,0,1,5.03.206,2.5,2.5,0,0,1,1.8,1.8,2.47,2.47,0,0,1-.7,2.425c-4.559,4.168-4.165,10.645.807,14.412h0a2.5,2.5,0,0,1-.7,4.319A13.875,13.875,0,0,1,12.009,24Zm.074-22a10.776,10.776,0,0,0-1.675.127,10.1,10.1,0,0,0-8.344,8.8A9.928,9.928,0,0,0,4.581,18.7a10.473,10.473,0,0,0,11.093,2.734.5.5,0,0,0,.138-.856h0C9.883,16.1,9.417,8.087,14.865,3.124a.459.459,0,0,0,.127-.465.491.491,0,0,0-.356-.362A10.68,10.68,0,0,0,12.083,2Z"/>
        </svg>
    </label>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useDarkMode } from '../composables/useDarkMode'

const { dark, toggleDark, initDarkMode } = useDarkMode()

onMounted(() => {
  initDarkMode()
})
</script>
