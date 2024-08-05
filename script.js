document.addEventListener('DOMContentLoaded', () => {
    const leftEye = document.getElementById('left-eye');
    const rightEye = document.getElementById('right-eye');
    const mouth = document.getElementById('mouth');
    const nose = document.getElementById('nose');
    const facialElements = [leftEye, rightEye, mouth, nose];

    let leftEyeTimer;
    let rightEyeTimer;

    // Add drag and drop functionality to facial elements
    facialElements.forEach(element => {
        element.addEventListener('dragstart', dragStart);
        element.addEventListener('dragend', dragEnd);
    });

    function dragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.id);
        setTimeout(() => {
            event.target.style.visibility = 'hidden';
        }, 0);
    }

    function dragEnd(event) {
        event.target.style.visibility = 'visible';
    }

    document.querySelector('.face-container').addEventListener('dragover', dragOver);
    document.querySelector('.face-container').addEventListener('drop', drop);

    function dragOver(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();
        const id = event.dataTransfer.getData('text/plain');
        const draggableElement = document.getElementById(id);
        const dropzone = event.target;

        const rect = dropzone.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;

        draggableElement.style.left = `${offsetX}px`;
        draggableElement.style.top = `${offsetY}px`;
        draggableElement.style.transform = 'translate(-50%, -50%)';
    }

    const resetEyeTimers = () => {
        if (leftEyeTimer) clearTimeout(leftEyeTimer);
        if (rightEyeTimer) clearTimeout(rightEyeTimer);
    
        leftEyeTimer = setTimeout(() => {
            leftEye.src = 'static/closed_eye.svg';
        }, 15000); // Close left eye after 15 seconds
    
        rightEyeTimer = setTimeout(() => {
            rightEye.src = 'static/closed_eye.svg';
        }, 15000); // Close right eye after 15 seconds
    };

    leftEye.addEventListener('click', () => {
        leftEye.src = leftEye.src.includes('closed_eye.svg') ? 'static/left_eye_open.svg' : 'static/closed_eye.svg';
        if (leftEye.src.includes('left_eye_open.svg')) {
            resetEyeTimers();
        }
        checkFaceState();
    });

    rightEye.addEventListener('click', () => {
        rightEye.src = rightEye.src.includes('closed_eye.svg') ? 'static/right_eye_open.svg' : 'static/closed_eye.svg';
        if (rightEye.src.includes('right_eye_open.svg')) {
            resetEyeTimers();
        }
        checkFaceState();
    });

    mouth.addEventListener('click', () => {
        mouth.src = mouth.src.includes('smiling_mouth.svg') ? 'static/smiling_mouth_tongue_out.svg' : 'static/smiling_mouth.svg';
    });

    nose.addEventListener('click', () => {
        nose.src = nose.src.includes('nose.svg') ? 'static/nose_alternate.svg' : 'static/nose.svg';
    });

    // Apply shake effect to all facial elements
    facialElements.forEach(element => {
        element.classList.add('shake');
    });
});