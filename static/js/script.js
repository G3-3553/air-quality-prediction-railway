// main.js
document.getElementById('predictionForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Get input values
    const formData = new FormData(e.target);
    const inputs = {};
    formData.forEach((value, key) => {
        inputs[key] = parseFloat(value);
    });

    try {
        // Simulate API call to get prediction
        const response = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs),
        });

        if (!response.ok) throw new Error('Failed to fetch prediction');

        const result = await response.json();

        // Add prediction to inputs and redirect to results page
        inputs.prediction = result.prediction === 1 ? 'Bad' : 'Good';
        const queryString = new URLSearchParams(inputs).toString();
        window.location.href = `results.html?${queryString}`;
    } catch (error) {
        alert('Error fetching prediction. Please try again.');
    }
});
