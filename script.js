document.addEventListener('DOMContentLoaded', () => {
    const leftEye = document.getElementById('left-eye');
    const rightEye = document.getElementById('right-eye');
    const mouth = document.getElementById('mouth');
    const nose = document.getElementById('nose');

    leftEye.addEventListener('click', () => {
        leftEye.src = leftEye.src.includes('closed_eye.svg') ? 'static/left_eye_open.svg' : 'static/closed_eye.svg';
    });

    rightEye.addEventListener('click', () => {
        rightEye.src = rightEye.src.includes('closed_eye.svg') ? 'static/right_eye_open.svg' : 'static/closed_eye.svg';
    });

    mouth.addEventListener('click', () => {
        mouth.src = mouth.src.includes('smiling_mouth.svg') ? 'static/smiling_mouth_tongue_out.svg' : 'static/smiling_mouth.svg';
    });

    nose.addEventListener('click', () => {
        nose.src = nose.src.includes('nose.svg') ? 'static/nose_alternate.svg' : 'static/nose.svg';
    });
});