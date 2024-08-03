document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value.trim();

    if (username && password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.find(user => user.username === username)) {
            alert('Username already exists.');
            return;
        }
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful. You can now log in.');
        window.location.href = 'login.html';
    } else {
        alert('Please enter both username and password.');
    }
});
