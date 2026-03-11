const SCRIPT_URL ="https://script.google.com/macros/s/AKfycbxMozffpSAKPEzZSAuMb3RTJYR6q-X0_sCNGap8PH0qNSCgRWa12MEBA0LsXy4qRPWT2A/exec";            
        function showProgressWheel(text = "Processing...") {
            document.getElementById('wheelText').textContent = text;
            document.getElementById('progressWheel').style.display = 'flex';
        }   
        history.pushState(null, null, location.href);
        window.onpopstate = function () {
            history.go(1);
        };     
        function hideProgressWheel() {
            document.getElementById('progressWheel').style.display = 'none';
        }        
        function showMessage(elementId, message, type) {
            const element = document.getElementById(elementId);
            element.textContent = message;
            element.className = 'message ' + type + '-message';
            element.style.display = 'block';
        }
        function clearMessage(elementId) {
            document.getElementById(elementId).style.display = 'none';
        }
        document.getElementById('showRegister').onclick = function(e) {
            e.preventDefault();
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('register-form').style.display = 'block';
            clearMessage('login-message');
            clearMessage('register-message');
        };
        document.getElementById('showLogin').onclick = function(e) {
            e.preventDefault();
            document.getElementById('register-form').style.display = 'none';
            document.getElementById('login-form').style.display = 'block';
            clearMessage('login-message');
            clearMessage('register-message');
        };
        document.getElementById('registerButton').onclick = async function() {
            const username = document.getElementById('regUsername').value.trim();
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;            
            if (!username || !password || !confirmPassword) {
                showMessage('register-message', 'All fields are required', 'error');
                return;
            }
            if (password !== confirmPassword) {
                showMessage('register-message', 'Passwords do not match', 'error');
                return;
            }            
            if (password.length < 6) {
                showMessage('register-message', 'Password must be at least 6 characters', 'error');
                return;
            }
            showProgressWheel("Creating your account...");
            try {
                const response = await fetch(SCRIPT_URL, {
                    method: 'POST',
                    body: JSON.stringify({
                        action: 'register',
                        username: username,
                        password: password
                    })
                });
                const result = await response.json();
                hideProgressWheel();
                if (result.success) {
                    showMessage('register-message', result.message, 'success');
                    document.getElementById('regUsername').value = '';
                    document.getElementById('regPassword').value = '';
                    document.getElementById('confirmPassword').value = '';
                    setTimeout(() => {
                        document.getElementById('register-form').style.display = 'none';
                        document.getElementById('login-form').style.display = 'block';
                        clearMessage('register-message');
                    }, 2000);
                } else {
                    showMessage('register-message', result.message, 'error');
                }
            } catch (error) {
                hideProgressWheel();
                showMessage('register-message', 'Network error. Please try again.', 'error');
            }
        };
            document.getElementById('loginButton').onclick = async function() {
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            if (!username || !password) {
                showMessage('login-message', 'Please enter username and password', 'error');
                return;
            }
            showProgressWheel("Signing you in...");
            try {
                const response = await fetch(SCRIPT_URL, {
                    method: 'POST',
                    body: JSON.stringify({
                        action: 'login',
                        username: username,
                        password: password
                    })
                });
                const result = await response.json();
                hideProgressWheel();
                if (result.success) {
                    showMessage('login-message', result.message, 'success');
                    if (document.getElementById('rememberMe').checked) {
                        localStorage.setItem('rememberedUser', username);
                    }  
                    setTimeout(() => {
                        window.location.href = "contact/Dashboard.html";
                    }, 1500);
                } else {
                    showMessage('login-message', result.message, 'error');
                }
            } catch (error) {
                hideProgressWheel();
                showMessage('login-message', 'Network error. Please try again.', 'error');
            }
        };
        window.onload = function() {
            const rememberedUser = localStorage.getItem('rememberedUser');
            if (rememberedUser) {
                document.getElementById('username').value = rememberedUser;
                document.getElementById('rememberMe').checked = true;
            }
        };
        async function handleGoogleLogin(response) {
            showProgressWheel("Verifying Google account...");
            const token = response.credential;
            if (!token) {
                hideProgressWheel();
                alert("Google login failed");
                return;
            }
            try {
                const res = await fetch(
                    "https://oauth2.googleapis.com/tokeninfo?id_token=" + token
                );
                const data = await res.json();
                hideProgressWheel();
                if (data.email_verified ===  true) {
                    localStorage.setItem("googleUser", data.email);
                    showMessage('login-message', 'Google login successful! Redirecting...', 'success');
                    setTimeout(() => {
                       window.location.href = "contact/Dashboard.html";
                    }, 1000);
                } else {
                    showMessage('login-message', 'Google verification failed', 'error');
                }
            } catch (err) {
                hideProgressWheel();
                showMessage('login-message', 'Google login error', 'error');
            }
        }
        document.querySelectorAll('.form-input').forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'translateY(-2px)';
            });
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'translateY(0)';
            });
        });