document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (username && password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            alert('Login successful.');
            // Redirect to the main blog page or dashboard
            window.location.href = 'index.html'; // Update to your main page
        } else {
            alert('Invalid username or password.');
        }
    } else {
        alert('Please enter both username and password.');
    }
});
