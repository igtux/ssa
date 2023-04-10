const fileInput = document.getElementById('fileInput');
const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');
const audioPlayer = document.getElementById('audioPlayer');

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    audioPlayer.src = fileUrl;
    playButton.disabled = false;
    pauseButton.disabled = false;
});

playButton.addEventListener('click', () => {
    socket.send(JSON.stringify({ type: 'play', timestamp: Date.now() }));
});

pauseButton.addEventListener('click', () => {
    socket.send(JSON.stringify({ type: 'pause', timestamp: Date.now() }));
});

const serverUrl = 'ws://localhost:3000'; // Replace with your server URL
const socket = new WebSocket(serverUrl);

socket.addEventListener('open', () => {
    console.log('Connected to server');
});

socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.type === 'play') {
        const delay = Date.now() - message.timestamp;
        setTimeout(() => {
            audioPlayer.play();
        }, delay);
    } else if (message.type === 'pause') {
        const delay = Date.now() - message.timestamp;
        setTimeout(() => {
            audioPlayer.pause();
        }, delay);
    }
});

socket.addEventListener('close', () => {
    console.log('Disconnected from server');
});