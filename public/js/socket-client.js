const lbOnline = document.getElementById('lbOnline');
const lbOffline = document.getElementById('lbOffline');
const textMessage = document.getElementById('textMessage')
const btnSend = document.getElementById('btnSend')


const socket = io()


socket.on('connect', ()=>{
    lbOffline.style.display = 'none';
    lbOnline.style.display = 'initial';
})

socket.on('disconnect', ()=>{
    lbOnline.style.display = 'none';
    lbOffline.style.display = 'initial';
})

socket.on('send', (payload)=>{
    console.log(payload);
})


btnSend.addEventListener('click', ()=>{
    const message  = textMessage.value

    const payload = {
        message,
        id:'123456',
        date:  new Date().getTime()
    }

    socket.emit('send', payload, (id) => {
        console.log('Desde ek server', id); // el tercer argumento
        // lo recivo del callback dese el server con los argumentos que en 
        // el backend hallan definido
    })
})