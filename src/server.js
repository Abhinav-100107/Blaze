const express = require('express');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = 5000;
const WS_PORT = 5001;

let currentData = {
  temperature: 0,
  smoke: 0,
  status: 'OFFLINE',
  message: 'Waiting for Arduino...',
  timestamp: new Date().toISOString()
};

// Connect to Arduino on COM10
async function connectArduino() {
  console.log('Connecting to Arduino on COM10...\n');

  const arduinoPort = new SerialPort({
    path: 'COM10', // Your Arduino port
    baudRate: 9600
  });

  const parser = arduinoPort.pipe(new ReadlineParser({ delimiter: '\n' }));

  arduinoPort.on('open', () => {
    console.log('✓ Arduino connected successfully on COM10!');
  });

  parser.on('data', (data) => {
    console.log('Arduino says:', data);
    
    try {
      const message = data.trim();
      
      // Parse sensor data
      let temperature = 25;
      let smoke = 0;
      let status = 'SAFE';
      
      // Extract temperature (format: "Temp: 33.20°C")
      const tempMatch = message.match(/Temp:\s*([\d.]+)/);
      if (tempMatch) {
        temperature = Math.round(parseFloat(tempMatch[1]));
      }
      
      // Extract smoke (format: "Smoke: 0")
      const smokeMatch = message.match(/Smoke:\s*(\d+)/);
      if (smokeMatch) {
        smoke = parseInt(smokeMatch[1]);
      }
      
      // Check if "FIRE" in message (not "NO FIRE")
      if (message.toUpperCase().includes('FIRE') && !message.toUpperCase().includes('NO FIRE')) {
        status = 'FIRE';
      }
      
      currentData = {
        temperature: temperature,
        smoke: smoke,
        status: status,
        message: status === 'FIRE' ? 'FIRE DETECTED!' : 'No Fire Detected',
        timestamp: new Date().toISOString()
      };
      
      console.log('✓ Status:', currentData.status, '| Temp:', temperature + '°C', '| Smoke:', smoke);
      broadcastData(currentData);
      
    } catch (error) {
      console.error('Error:', error);
    }
  });

  arduinoPort.on('error', (err) => {
    console.error('❌ Serial error:', err.message);
    currentData.status = 'OFFLINE';
  });
}

// WebSocket Server
const wss = new WebSocket.Server({ port: WS_PORT });

function broadcastData(data) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

wss.on('connection', (ws) => {
  console.log('✓ Dashboard connected via WebSocket');
  ws.send(JSON.stringify(currentData));
  
  ws.on('close', () => {
    console.log('✗ Dashboard disconnected');
  });
});

// REST API
app.get('/api/sensor-data', (req, res) => {
  res.json(currentData);
});

app.listen(PORT, () => {
  console.log('\n🚀 BlazeBot Backend Server Started');
  console.log(`📡 REST API: http://localhost:${PORT}`);
  console.log(`🔌 WebSocket: ws://localhost:${WS_PORT}\n`);
  
  setTimeout(connectArduino, 2000);
});