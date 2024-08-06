document.addEventListener('DOMContentLoaded', () => {
    const leftEyeContainer = document.getElementById('left-eye-container');
    const leftEye = document.getElementById('left-eye');
    const leftEyePupil = document.getElementById('left-eye-pupil');
    const rightEye = document.getElementById('right-eye');
    const mouth = document.getElementById('mouth');
    const nose = document.getElementById('nose');
    const facialElements = [leftEyeContainer, rightEye, mouth, nose];


    //////////////////////////////////////////////////////////
    // Add drag and drop functionality to facial elements
    //////////////////////////////////////////////////////////
    facialElements.forEach(element => {
        element.addEventListener('dragstart', dragStart);
        element.addEventListener('dragend', dragEnd);
    });

    function dragStart(event) {
        const targetElement = event.target.closest('[draggable="true"]');
        event.dataTransfer.setData('text/plain', targetElement.id);
        setTimeout(() => {
            targetElement.style.visibility = 'hidden'; // event.target
        }, 0);
    }

    function dragEnd(event) {
        const targetElement = event.target.closest('[draggable="true"]');
        targetElement.style.visibility = 'visible'; // event.target
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
        
        const dropzone = event.target.closest('.face-container'); // Ensure dropzone is the face-container

        dropzone.appendChild(draggableElement);
        draggableElement.style.visibility = 'visible';

        const rect = dropzone.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;

        draggableElement.style.left = `${offsetX}px`;
        draggableElement.style.top = `${offsetY}px`;
        draggableElement.style.transform = 'translate(-50%, -50%)';
    }

    //////////////////////////////////////////////////////////
    // Close eyes after 15 seconds of inactivity
    //////////////////////////////////////////////////////////
    let inactivityTimer;

    const fallAsleep = () => {
        leftEye.src = 'static/closed_eye.svg';
        leftEyePupil.style.display = 'none'; // Hide pupil when eye is closed
        rightEye.src = 'static/closed_eye.svg';
    };

    const startInactivityTimer = () => {
        // Clear any existing timer
        clearTimeout(inactivityTimer);
    
        // Set a new timer for 15 seconds (15000 milliseconds)
        inactivityTimer = setTimeout(() => {
            fallAsleep();
        }, 15000);
    };

    // Set up event listeners for user interactions
    document.addEventListener('mousemove', startInactivityTimer);
    document.addEventListener('click', startInactivityTimer);
    document.addEventListener('keydown', startInactivityTimer);

    // Start the inactivity timer initially
    startInactivityTimer();

    //////////////////////////////////////////////////////////
    // Click event listeners for facial elements
    //////////////////////////////////////////////////////////
    leftEyeContainer.addEventListener('click', () => {
        if (leftEye.src.includes('closed_eye.svg')) {
            leftEye.src = 'static/left_eye_no_pupil.svg';
            leftEyePupil.style.display = 'block'; // Show pupil when eye is open
        } else {
            leftEye.src = 'static/closed_eye.svg';
            leftEyePupil.style.display = 'none'; // Hide pupil when eye is closed
        }
        startInactivityTimer(); // Restart inactivity timer on eye click
    });

    rightEye.addEventListener('click', () => {
        rightEye.src = rightEye.src.includes('closed_eye.svg') ? 'static/right_eye_open.svg' : 'static/closed_eye.svg';
        startInactivityTimer(); // Restart inactivity timer on eye click
    });

    mouth.addEventListener('click', () => {
        mouth.src = mouth.src.includes('smiling_mouth.svg') ? 'static/smiling_mouth_tongue_out.svg' : 'static/smiling_mouth.svg';
    });

    nose.addEventListener('click', () => {
        nose.src = nose.src.includes('nose.svg') ? 'static/nose_alternate.svg' : 'static/nose.svg';
    });

    //////////////////////////////////////////////////////////
    // Apply shake effect to all facial elements
    //////////////////////////////////////////////////////////
    facialElements.forEach(element => {
        element.classList.add('shake');
    });

    //////////////////////////////////////////////////////////
    // Move the pupil of the left eye based on mouse movement
    //////////////////////////////////////////////////////////
    document.addEventListener('mousemove', (event) => {
        const rect = leftEye.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;
        const maxOffset = rect.width / 16; // Maximum offset for the pupil (radius of the circle)

        const offsetX = event.clientX - eyeCenterX;
        const offsetY = event.clientY - eyeCenterY;

        const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);

        if (distance > maxOffset) {
            const angle = Math.atan2(offsetY, offsetX);
            leftEyePupil.style.transform = `translate(${Math.cos(angle) * maxOffset}px, ${Math.sin(angle) * maxOffset}px)`;
        } else {
            leftEyePupil.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        }
    });
});