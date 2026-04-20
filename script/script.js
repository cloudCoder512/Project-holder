const slidesData = [
    { 
        url: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        title: "Web Development",
        desc: "Create stunning websites and web apps"
    },
    { 
        url: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        title: "Mobile App Design",
        desc: "iOS & Android application development"
    },
    { 
        url: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        title: "UI/UX Design",
        desc: "Beautiful user interfaces & experiences"
    },
    { 
        url: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        title: "Data Science",
        desc: "Analytics, ML & AI solutions"
    },
    { 
        url: "https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        title: "Backend Systems",
        desc: "Scalable server architecture"
    },
    { 
        url: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        title: "Cloud Computing",
        desc: "AWS, Azure & Google Cloud"
    },
    { 
        url: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        title: "Cybersecurity",
        desc: "Protect digital assets & systems"
    },
    { 
        url: "https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        title: "AI & Machine Learning",
        desc: "Intelligent automation & predictions"
    },
    { 
        url: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        title: "Game Development",
        desc: "2D, 3D & AR/VR gaming"
    },
    { 
        url: "https://images.pexels.com/photos/6476261/pexels-photo-6476261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        title: "Digital Marketing",
        desc: "SEO, Social Media & Analytics"
    },
    { 
        url: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        title: "E-Commerce",
        desc: "Online stores & payment integration"
    },
    { 
        url: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        title: "Project Management",
        desc: "Agile, Scrum & Team Collaboration"
    }
];
let currentSlideIndex = 0;
let slideInterval;
const slideIntervalTime = 7500;
function initSlideshow() {
    const container = document.getElementById('slideshowContainer');
    const dotsContainer = document.getElementById('slideDots');   
    container.innerHTML = '';
    dotsContainer.innerHTML = '';
    slidesData.forEach((slide, index) => {
        const img = document.createElement('img');
        img.src = slide.url;
        img.alt = slide.title;
        img.className = 'slide';
        if (index === 0) img.classList.add('active');
        container.appendChild(img);
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    updateOverlayText(0);
}
function updateOverlayText(index) {
    const slide = slidesData[index];
    const titleEl = document.getElementById('slideTitle');
    const descEl = document.getElementById('slideDesc');
    if (titleEl && descEl) {
        titleEl.style.opacity = '0';
        descEl.style.opacity = '0';
        titleEl.style.transform = 'translateY(20px)';
        descEl.style.transform = 'translateY(20px)';
        setTimeout(() => {
            titleEl.textContent = slide.title;
            descEl.textContent = slide.desc;
            titleEl.style.opacity = '1';
            descEl.style.opacity = '1';
            titleEl.style.transform = 'translateY(0)';
            descEl.style.transform = 'translateY(0)';
        }, 150);
    }
}
function goToSlide(index) {
    if (index === currentSlideIndex) return;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    slides[currentSlideIndex].classList.remove('active');
    dots[currentSlideIndex].classList.remove('active');
    currentSlideIndex = index;
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
    updateOverlayText(currentSlideIndex);
    resetSlideTimer();
}
function nextSlide() {
    let nextIndex = currentSlideIndex + 1;
    if (nextIndex >= slidesData.length) {
        nextIndex = 0;
    }
    goToSlide(nextIndex);
}
function resetSlideTimer() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
    slideInterval = setInterval(() => {
        nextSlide();
    }, slideIntervalTime);
}
initSlideshow();
resetSlideTimer();
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxMozffpSAKPEzZSAuMb3RTJYR6q-X0_sCNGap8PH0qNSCgRWa12MEBA0LsXy4qRPWT2A/exec";
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
        const res = await fetch("https://oauth2.googleapis.com/tokeninfo?id_token=" + token);
        const data = await res.json();
        hideProgressWheel();
        if (data.email_verified === true) {
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
        this.parentElement.style.transform = 'translateY(-1px)';
    });
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// ============================================
// FIX: Prevent username/password autofill
// ============================================
(function fixAutofill() {
    // Find username and password inputs
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const regUsernameInput = document.getElementById('regUsername');
    const regPasswordInput = document.getElementById('regPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    // Function to clear all inputs
    function clearAllInputs() {
        if (usernameInput && usernameInput.value) usernameInput.value = '';
        if (passwordInput && passwordInput.value) passwordInput.value = '';
        if (regUsernameInput && regUsernameInput.value) regUsernameInput.value = '';
        if (regPasswordInput && regPasswordInput.value) regPasswordInput.value = '';
        if (confirmPasswordInput && confirmPasswordInput.value) confirmPasswordInput.value = '';
    }
    
    // Disable autocomplete on all inputs
    const allInputs = [usernameInput, passwordInput, regUsernameInput, regPasswordInput, confirmPasswordInput];
    allInputs.forEach(input => {
        if (input) {
            input.setAttribute('autocomplete', 'off');
            input.setAttribute('autocomplete', 'new-password');
        }
    });
    
    // Clear immediately
    clearAllInputs();
    
    // Clear after page load
    window.addEventListener('load', function() {
        setTimeout(clearAllInputs, 10);
        setTimeout(clearAllInputs, 50);
        setTimeout(clearAllInputs, 200);
    });
    
    // Clear on focus
    if (usernameInput) {
        usernameInput.addEventListener('focus', function() {
            if (this.value) this.value = '';
        });
    }
    if (passwordInput) {
        passwordInput.addEventListener('focus', function() {
            if (this.value) this.value = '';
        });
    }
    if (regUsernameInput) {
        regUsernameInput.addEventListener('focus', function() {
            if (this.value) this.value = '';
        });
    }
    if (regPasswordInput) {
        regPasswordInput.addEventListener('focus', function() {
            if (this.value) this.value = '';
        });
    }
})();
