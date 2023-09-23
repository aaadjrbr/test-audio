const recordButton = document.getElementById('recordButton');
const recordedAudio = document.getElementById('recordedAudio');

let mediaRecorder;
let chunks = [];

recordButton.addEventListener('click', async () => {
    if (!mediaRecorder) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                chunks.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'audio/wav' }); // Make sure the format is correct (e.g., 'audio/wav' or 'audio/mp3')
            const audioURL = URL.createObjectURL(blob);
            recordedAudio.src = audioURL; // Set the src attribute to the generated URL
            recordedAudio.style.display = 'block';
        };
    }

    if (mediaRecorder.state === 'inactive') {
        chunks = [];
        mediaRecorder.start();
        recordButton.textContent = 'Stop Recording';
    } else {
        mediaRecorder.stop();
        recordButton.textContent = 'Start Recording';
    }
});