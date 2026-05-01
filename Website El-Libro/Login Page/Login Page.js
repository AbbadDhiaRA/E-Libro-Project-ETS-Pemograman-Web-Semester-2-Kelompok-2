  function handleLogin() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const btn = document.querySelector('.btn-signin');

    if (!email || !password) {
      btn.style.background = '#c0392b';
      btn.textContent = 'Please fill in all fields';
      setTimeout(() => {
        btn.style.background = '';
        btn.textContent = 'Sign in';
      }, 2000);
      return;
    }

    btn.textContent = 'Signing in…';
    btn.style.opacity = '0.8';
    btn.disabled = true;

    setTimeout(() => {
      // Save login state for homepage detection
      const userData = { email: email, name: email.split('@')[0] };
      sessionStorage.setItem('elibro_user', JSON.stringify(userData));
      localStorage.setItem('elibro_user', JSON.stringify(userData));
      // Redirect to homepage
      window.location.href = '../Homepage/Homepage.html';
    }, 1200);
  }