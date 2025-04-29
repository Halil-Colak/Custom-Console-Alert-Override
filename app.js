(function () {
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;
    const originalConsoleLog = console.log;

    function showCustomAlert(message, type = 'error') {
        const container = document.querySelector('.toast-alert-container') || createContainer();

        const alertBox = document.createElement('div');
        alertBox.classList.add('toast-alert', type);
        alertBox.style.transform = 'scale(0.9)';
        alertBox.style.transition = 'transform 0.3s ease';

        const icon = document.createElement('i');
        icon.classList.add('fa-solid');
        switch (type) {
            case 'error':
                icon.classList.add('fa-circle-xmark');
                break;
            case 'warn':
                icon.classList.add('fa-triangle-exclamation');
                break;
            case 'log':
                icon.classList.add('fa-circle-info');
                break;
        }

        const messageBox = document.createElement('span');
        messageBox.classList.add('message');
        messageBox.textContent = message;

        const content = document.createElement('div');
        content.classList.add('toast-content');
        content.appendChild(icon);
        content.appendChild(messageBox);

        const progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');
        const progress = document.createElement('div');
        progress.classList.add('progress');
        progress.style.width = '0%';
        progressBar.appendChild(progress);

        alertBox.appendChild(content);
        alertBox.appendChild(progressBar);
        container.appendChild(alertBox);

        requestAnimationFrame(() => {
            alertBox.style.transform = 'scale(1)';
        });

        let duration = 5000;
        let interval = setInterval(() => {
            let width = parseFloat(progress.style.width) || 0;
            width += (100 / (duration / 100));
            if (width >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    alertBox.style.right = '-350px';
                    alertBox.style.transform = 'scale(0.9)';
                    alertBox.style.opacity = '0';
                    alertBox.style.transition = '0.3s ease';

                    setTimeout(() => {
                        container.removeChild(alertBox);
                    }, 300);
                }, 500);
            }
            progress.style.width = width + '%';
        }, 100);
    }

    function createContainer() {
        const container = document.createElement('div');
        container.classList.add('toast-alert-container');
        document.body.appendChild(container);
        return container;
    }

    console.error = function (message) {
        showCustomAlert(message, 'error');
        originalConsoleError.apply(console, arguments);
    };

    console.warn = function (message) {
        showCustomAlert(message, 'warn');
        originalConsoleWarn.apply(console, arguments);
    };

    console.log = function (message) {
        showCustomAlert(message, 'log');
        originalConsoleLog.apply(console, arguments);
    };
})();
