function calculateBMR(age, sex, height, weight) {
    if (sex === "male") {
        return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        return 10 * weight + 6.25 * height - 5 * age - 161;
    }
}

function calculateTDEE(bmr, activity) {
    const activityFactors = {
        "sedentary": 1.2,
        "light": 1.375,
        "moderate": 1.55,
        "very": 1.725,
        "extreme": 1.9
    };
    return bmr * activityFactors[activity];
}

function calculateNutrition() {
    const age = document.getElementById('age').value;
    const sex = document.getElementById('sex').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const activity = document.getElementById('activity').value;
    const goal = document.getElementById('goal').value;

    const bmr = calculateBMR(age, sex, height, weight);
    const tdee = calculateTDEE(bmr, activity);

    let calorieMultiplier;
    if (goal === "bulk") calorieMultiplier = 1.1;
    else if (goal === "cut") calorieMultiplier = 0.8;
    else calorieMultiplier = 1; // maintain

    const dailyCalories = tdee * calorieMultiplier;
    const proteinPerKg = goal === "bulk" ? 2.2 : goal === "cut" ? 2.5 : 1.7;
    const proteinNeeds = weight * proteinPerKg;
    const carbsCalories = dailyCalories * (goal === "cut" ? 0.45 : 0.55); // Using an average percentage for carbs
    const carbsNeeds = carbsCalories / 4; // 4 calories per gram of carbs

    document.getElementById('results').innerHTML = `
        <p>Basal Metabolic Rate(BMR): ${bmr.toFixed(2)} calories</p>
        <p>Total Daily Energy Expenditure (TDEE): ${tdee.toFixed(2)} calories</p>
        <p>Recommended Daily Calorie Intake: ${dailyCalories.toFixed(2)} calories</p>
        <p>Recommended Daily Protein Intake: ${proteinNeeds.toFixed(2)}g</p>
        <p>Recommended Daily Carbs Intake: ${carbsNeeds.toFixed(2)}g</p>
    `;
}