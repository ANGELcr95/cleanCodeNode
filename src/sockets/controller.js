

export const socketController = (socket) => {


    // socket.on('event', data => { /* … */ });
    socket.on('disconnect', () => { 
        console.log('Client disconnected', socket.id);
        
     });

    socket.on('send', (payload, callback ) => { // esta funcion 
    // recibe el callback y este retorna el callback solo a quien lo emitio
    // ya el cliente decide que eralizar con esta envio
    const id = 123141431
    callback(id)
    //socket.emit('send', payload)  asi este socket le  envia solo al cliente 
    // que lo envio igual que el de arriba
    socket.broadcast.emit('send', payload) // se los envia a todos
    })
}