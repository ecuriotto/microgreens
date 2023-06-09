async function findBestMicrogreens(selectedNutrients, numberOfResults) {
  return fetch('data/microVitamins.json')
    .then((response) => response.json())
    .then((microgreens) => {
      // Get the minimum and maximum value of each selected nutrient
      const nutrientRanges = {};
      for (const nutrient of selectedNutrients) {
        const nutrientValues = Object.values(microgreens).map((microgreen) => {
          const value = microgreen[nutrient];
          return typeof value === 'string' ? parseFloat(value.replace(',', '.')) : value;
        });
        nutrientRanges[nutrient] = {
          min: Math.min(...nutrientValues),
          max: Math.max(...nutrientValues),
        };
        
      }
      // Normalize the value of each selected nutrient for each microgreen
      for (const microgreenName in microgreens) {
        const microgreen = microgreens[microgreenName];
        for (const nutrient of selectedNutrients) {
          const range = nutrientRanges[nutrient];
          let nutrientValue = microgreen[nutrient];
          if (typeof nutrientValue === 'string') {
            nutrientValue = nutrientValue.replace(',', '.');
          }
          microgreen[nutrient] = (parseFloat(nutrientValue) - range.min) / (range.max - range.min);
        }
      }

      // Calculate the sum of each selected nutrient for each microgreen

      const microgreenScores = [];
      for (const microgreenName in microgreens) {
        const microgreen = microgreens[microgreenName];
        let weightedSum = 0;
        for (const nutrient of selectedNutrients) {
          weightedSum += microgreen[nutrient];
        }
        weightedSum = parseInt(weightedSum * 100);
        microgreenScores.push({ name: microgreenName, score: weightedSum });
      }

      // Sort the microgreens by score in descending order and return the top 3
      microgreenScores.sort((a, b) => b.score - a.score);
      const bestNMicrogreens = microgreenScores
        .slice(0, numberOfResults)
        .map((microgreen) => microgreen.name);
      return bestNMicrogreens;
    })
    .catch((error) => console.error(error));
}
