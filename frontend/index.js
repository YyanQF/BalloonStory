// general
function togglePages(targetPageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
    document.getElementById(targetPageId).classList.remove('hidden');
}

function displayError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
}

// sign up
document.getElementById('signup-btn').addEventListener('click', async () => {
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    const error = document.getElementById('signup-error');

    if (!name || !email || !password) {
        return displayError(error, 'All fields are required!');
    }

    try {
        const response = await fetch('http://localhost:4000/api/user/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Sign Up Successful! Redirecting to Login page...');
            error.style.display = 'none';
            togglePages('login');
        } else {
            displayError(error, data.message || 'Sign Up Failed!');
        }
    } catch {
        displayError(error, 'An error occurred. Please try again later.');
    }
});

// sign in
document.getElementById('login-btn').addEventListener('click', async () => {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const error = document.getElementById('login-error');

    if (!email || !password) {
        return displayError(error, 'All fields are required!');
    }

    try {
        const response = await fetch('http://localhost:4000/api/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert(`Welcome back, ${data.user.name}!`);
            error.style.display = 'none';
            localStorage.setItem('user', JSON.stringify(data));
            togglePages('home');
        } else {
            displayError(error, data.message || 'Invalid email or password.');
        }
    } catch {
        displayError(error, 'An error occurred. Please try again later.');
    }
});
