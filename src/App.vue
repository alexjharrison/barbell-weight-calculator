<script setup lang="ts">
import { useWeights } from './composables/weight';

const { idealWeights, selectedBarWeight, targetWeight, calculatedWeight } = useWeights()

const bgColors = {
  "1.25": "bg-white text-gray-900",
  "2.5": "bg-green-700",
  "5": "bg-blue-700",
  "10": "bg-white text-gray-900",
  "25": "bg-green-700",
  "45": "bg-blue-700",
}

const handleSelectInput = (e: MouseEvent) => {
  const target = e.target as HTMLInputElement
  target?.select()
}
</script>

<template>
  <div class="text-center h-screen w-full bg-blue-800 text-gray-200 pt-5">
    <header>
      <h1 class="font-bold text-2xl mb-2">Weight Calculator</h1>
    </header>
    <main>
      <form @submit.prevent>
        <h2 class="text-lg">Target Weight</h2>
        <input
          class="shadow appearance-none border rounded w-20 text-center py-2 mt-1 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          @click="handleSelectInput" type="number" name="target-weight" id="target-weight" step=".001"
          v-model.number="targetWeight">
        <h2 class="text-lg">Bar Weight</h2>
        <div class="flex gap-2 justify-center">
          <input :value="35" type="radio" name="35" id="35" v-model="selectedBarWeight">
          <label for="35">35</label>
          <input :value="45" type="radio" name="45" id="45" v-model="selectedBarWeight" />
          <label for="45">45</label>
        </div>
      </form>
      <div class="flex justify-center my-3 flex-wrap">
        <div class="mr-4">
          <p class="text-center">Left</p>
          <div class="flex gap-1">
            <span v-for="(weight, i) in idealWeights.slice().reverse()" :key="i" :class="bgColors[weight]"
              class="p-1 rounded-md border-gray-200 border">{{
                weight
              }}</span>
          </div>
        </div>
        <div class="mt-auto mr-4 font-extrabold" :class="selectedBarWeight === 35 ? 'text-black' : 'text-gray-500'">====
        </div>
        <div>
          <p class="text-center">Right</p>
          <div class="flex gap-1">
            <span v-for="(weight, i) in idealWeights" :key="i" :class="bgColors[weight]"
              class="p-1 rounded-md border-gray-200 border">{{ weight
              }}</span>
          </div>
        </div>
      </div>
      <p class="text-xl mt-3">Calculated Weight: <span class="font-semibold">{{ calculatedWeight }}</span> lbs</p>
      <p class="mt-2">Metricified <span class="font-bold">{{ Math.round(targetWeight * 0.45359237 * 10) / 10 }}</span>
        kg</p>

      <img class="mx-auto mt-8" src="/workout.svg" />
    </main>
  </div>
</template>

<style scoped></style>
