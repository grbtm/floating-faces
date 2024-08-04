document.addEventListener('DOMContentLoaded', () => {
    const leftEye = document.getElementById('left-eye');
    const rightEye = document.getElementById('right-eye');
    const mouth = document.getElementById('mouth');
    const nose = document.getElementById('nose');
    const faceContainer = document.querySelector('.face-container');

    let leftEyeTimer;
    let rightEyeTimer;

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

    const checkFaceState = () => {
        const isLeftEyeOpen = leftEye.src.includes('left_eye_open.svg');
        const isRightEyeOpen = rightEye.src.includes('right_eye_open.svg');

        if (isLeftEyeOpen && isRightEyeOpen) {
            faceContainer.classList.add('rotate-face');
            setTimeout(() => {
                if (mouth.src.includes('smiling_mouth.svg')) {
                    mouth.src = 'static/smiling_mouth_tongue_out.svg';
                    setTimeout(() => {
                        mouth.src = 'static/smiling_mouth.svg';
                        // Delay before wink effect
                        setTimeout(() => {
                            rightEye.src = 'static/closed_eye.svg';
                            setTimeout(() => {
                                rightEye.src = 'static/right_eye_open.svg';
                            }, 500); // Reopen right eye after 0.5 seconds
                        }, 500); // Delay before starting wink effect
                    }, 1000); // Change back to smiling mouth after 1 second
                } else {
                    // Case when rotation starts with tongue out
                    setTimeout(() => {
                        rightEye.src = 'static/closed_eye.svg';
                        setTimeout(() => {
                            rightEye.src = 'static/right_eye_open.svg';
                        }, 500); // Reopen right eye after 0.5 seconds
                    }, 300); // Delay before starting wink effect
                }
            }, 2000); // Change mouth after rotation animation (2 seconds)
        } else {
            faceContainer.classList.remove('rotate-face');
        }
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
});