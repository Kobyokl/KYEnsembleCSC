import { clip } from 'scribbletune/browser';

const btnStart = document.getElementById('start');
const btnPlay = document.getElementById('play');
const btnStop = document.getElementById('stop');

btnStart.addEventListener('click', () => {
    Tone.context.resume().then(() => Tone.Transport.start());
});

const simpleLoop = clip({ synth: 'Synth', notes: 'c4', pattern: 'x' });
btnPlay.addEventListener('click', () => {
    simpleLoop.start();
});

btnStop.addEventListener('click', () => {
    simpleLoop.stop();
});
