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
        element.addEventListener('mousedown', dragStart);
    });

    function dragStart(event) {
        event.preventDefault();
        // Traverse DOM tree to find the closest parent element with the class 'face-container'
        // -> ensures that when left-eye is clicked, the parent 'left-eye-container' is returned
        const element = event.target.closest('.face-container > *');
        const rect = element.getBoundingClientRect();
        // Calculate offset from the center of the element
        const offsetX = event.clientX - (rect.left + rect.width / 2);
        const offsetY = event.clientY - (rect.top + rect.height / 2);

        function onMouseMove(event) {
            const faceContainerRect = document.querySelector('.face-container').getBoundingClientRect();
            let newLeft = event.clientX - faceContainerRect.left - offsetX;
            let newTop = event.clientY - faceContainerRect.top - offsetY;

            // Ensure the element stays within the face-container
            newLeft = Math.max(0, Math.min(newLeft, faceContainerRect.width - rect.width));
            newTop = Math.max(0, Math.min(newTop, faceContainerRect.height - rect.height));

            element.style.left = `${newLeft}px`;
            element.style.top = `${newTop}px`;
            element.style.transform = 'translate(0, 0)'; // Remove the translate to avoid double translation
        }

        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
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