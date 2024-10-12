document.getElementById('health-form').addEventListener('submit', async function(e) {
    e.preventDefault();
  
    const formData = {
      name: document.getElementById('name').value,
      age: document.getElementById('age').value,
      symptoms: document.getElementById('symptoms').value,
      duration: document.getElementById('duration').value,
      severity: document.getElementById('severity').value
    };
  
    try {
      const response = await fetch('https://your-worker-subdomain.workers.dev/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      const data = await response.json();
  
      document.getElementById('result').classList.remove('hidden');
      document.getElementById('prediction').innerText = `Prediction: ${data.prediction}`;
  
      if (data.serious) {
        document.getElementById('schedule-btn').classList.remove('hidden');
      } else {
        document.getElementById('schedule-btn').classList.add('hidden');
      }
  
    } catch (error) {
      alert('Error: ' + error.message);
    }
  });
  
  document.getElementById('schedule-btn').addEventListener('click', async function() {
    const formData = {
      name: document.getElementById('name').value,
      age: document.getElementById('age').value,
      symptoms: document.getElementById('symptoms').value,
      duration: document.getElementById('duration').value,
      severity: document.getElementById('severity').value
    };
  
    try {
      const response = await fetch('https://your-worker-subdomain.workers.dev/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      const data = await response.json();
  
      alert(`Appointment scheduled for: ${data.time}`);
  
    } catch (error) {
      alert('Error: ' + error.message);
    }
  });
  