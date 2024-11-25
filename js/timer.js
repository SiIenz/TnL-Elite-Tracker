document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.tab-container button');
    const startButtons = document.querySelectorAll('.start-timer');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            loadPage(button.textContent);
        });
    });

    function loadPage(pageName) {
        let url;
        switch(pageName) {
            case "Syleus's Abyss":
                url = '/';
                break;
            case "Shadowed Crypt":
                url = '/shadowed_crypt';
                break;
            case "Sanctum of Desire":
                url = '/sanctum_of_desire';
                break;
            default:
                url = '/';
        }
        window.location.href = url;
    }

    startButtons.forEach(button => {
        button.addEventListener('click', handleTimer);
    });

    function handleTimer(event) {
        const button = event.target;
        const timerSection = button.closest('.timer-section') || button.closest('.timer-box');
        const countdownElement = timerSection.querySelector('.countdown');
        
        if (button.textContent === 'Start Timer') {
            startCountdown(button, countdownElement);
        } else {
            resetCountdown(button, countdownElement);
        }
    }

    function startCountdown(button, countdownElement) {
        let timeLeft = 10 * 60;
        button.textContent = 'Reset Timer';
        
        // Lösche vorhandenen Timer falls vorhanden
        if (button.dataset.intervalId) {
            clearInterval(parseInt(button.dataset.intervalId));
        }
        
        const countdownInterval = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            countdownElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                countdownElement.textContent = "Time's up!";
                button.textContent = 'Start Timer';
                return;
            }
            timeLeft--;
        }, 1000);
        
        button.dataset.intervalId = countdownInterval;
    }

    function resetCountdown(button, countdownElement) {
        clearInterval(parseInt(button.dataset.intervalId));
        button.textContent = 'Start Timer';
        countdownElement.textContent = '';
        delete button.dataset.intervalId;
    }
});