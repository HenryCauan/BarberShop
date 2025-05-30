const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('Novo cliente conectado');

  socket.on('newAppointment', (appointment) => {
    // Enviar notificação para todos os admins conectados
    io.emit('newAppointment', appointment);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(3001, () => {
  console.log('Servidor WebSocket rodando na porta 3001');
});
