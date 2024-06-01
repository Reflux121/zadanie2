const express = require('express');
const os = require('os');
const moment = require('moment-timezone');

const app = express();
const port = process.env.PORT || 3000;
const version = process.env.VERSION || '1.0.0';
const author = "Jakub Kiełb";

app.get('/', (req, res) => {
  const networkInterfaces = os.networkInterfaces();
  let ipv4Interfaces = [];
  Object.keys(networkInterfaces).forEach((name) => {
    ipv4Interfaces = ipv4Interfaces.concat(networkInterfaces[name].filter((iface) => iface.family === 'IPv4' && !iface.internal));
  });
  const hostname = os.hostname();
  const ip = ipv4Interfaces.length > 0 ? ipv4Interfaces[0].address : undefined;
  const clientIP = req.ip;
  const clientTime = moment().tz('Europe/Warsaw').format('YYYY-MM-DD HH:mm:ss');
  
  console.log(`Data uruchomienia: ${clientTime}, Autor: ${author}, Port: ${port}`);
  
  res.send(`Adres IP: ${clientIP}<br>Aktualny czas: ${clientTime}`);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
