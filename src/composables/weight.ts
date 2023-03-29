import { computed, ref } from "vue";

export const useWeights = () => {
  const discWeights = [45, 25, 10, 5, 2.5, 1.25] as const;

  const targetWeight = ref(0);
  const selectedBarWeight = ref<35 | 45>(35);

  const idealWeights = computed(() => {
    let runningWeight = (targetWeight.value - selectedBarWeight.value) / 2;
    const addedWeights: number[] = [];
    while (runningWeight > 1.25) {
      for (const weight of discWeights) {
        while (runningWeight >= weight) {
          runningWeight -= weight;
          addedWeights.push(weight);
          console.log(runningWeight);
        }
      }
    }

    return addedWeights;
  });

  const calculatedWeight = computed(
    () =>
      selectedBarWeight.value +
      idealWeights.value.reduce((acc, curr) => acc + curr * 2, 0)
  );

  return { targetWeight, idealWeights, selectedBarWeight, calculatedWeight };
};
