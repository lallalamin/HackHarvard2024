addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
    if (request.method === 'OPTIONS') {
      // Handle CORS preflight
      return new Response(null, {
        headers: corsHeaders
      })
    }
  
    const url = new URL(request.url)
    if (url.pathname === '/predict' && request.method === 'POST') {
      return handlePredict(request)
    } else if (url.pathname === '/schedule' && request.method === 'POST') {
      return handleSchedule(request)
    } else {
      return new Response('Not Found', { status: 404 })
    }
  }
  
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  }
  
  async function handlePredict(request) {
    try {
      const data = await request.json()
      const { age, symptoms, severity } = data
  
      // Simple rule-based prediction
      let prediction = 'Healthy'
      let serious = false
  
      if (severity >= 7 || symptoms.toLowerCase().includes('difficulty breathing')) {
        prediction = 'Serious Condition'
        serious = true
      } else if (severity >= 4) {
        prediction = 'Moderate Condition'
      }
  
      return new Response(JSON.stringify({ prediction, serious }), {
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Invalid data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      })
    }
  }
  
  async function handleSchedule(request) {
    try {
      const data = await request.json()
      const { name, email } = data // You can collect more data as needed
  
      // Simulate scheduling by generating a random appointment time
      const appointmentTime = new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString()
  
      // Here, you can integrate with a real scheduling service or database
  
      return new Response(JSON.stringify({ time: appointmentTime }), {
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Invalid data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      })
    }
  }
  