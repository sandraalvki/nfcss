// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  const navToggleSpans = document.querySelectorAll('.nav-toggle span');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';

      // Toggle navigation visibility
      navToggle.setAttribute('aria-expanded', !isExpanded);

      // Toggle nav display
      if (isExpanded) {
        nav.style.display = 'none';
      } else {
        nav.style.display = 'flex';
      }

      // Animate hamburger to X
      navToggleSpans.forEach((span, index) => {
        if (!isExpanded) {
          if (index === 0) {
            span.style.transform = 'rotate(45deg) translate(5px, 5px)';
          } else if (index === 1) {
            span.style.opacity = '0';
          } else if (index === 2) {
            span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
          }
        } else {
          span.style.transform = 'none';
          span.style.opacity = '1';
        }
      });
    });
  }

  // Close mobile nav when clicking on a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach((link) => {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 768) {
        navToggle.click();
      }
    });
  });

  // Update current year in footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      if (href === '#') return;

      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();

        const headerHeight =
          document.querySelector('.site-header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });

  // Add scroll effect to header
  const header = document.querySelector('.site-header');
  let lastScrollTop = 0;

  window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      header.style.background = 'rgba(245, 245, 220, 0.98)';
      header.style.boxShadow = '0 2px 20px rgba(139, 69, 19, 0.1)';
    } else {
      header.style.background = 'rgba(245, 245, 220, 0.95)';
      header.style.boxShadow = 'none';
    }

    lastScrollTop = scrollTop;
  });

  // Add hover effects to feature cards
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach((card) => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Add interactive fart cloud effects
  const fartClouds = document.querySelectorAll('.fart-cloud');
  fartClouds.forEach((cloud, index) => {
    cloud.addEventListener('mouseenter', function () {
      this.style.transform = 'scale(1.5) rotate(180deg)';
      this.style.filter = 'blur(0px)';
      this.style.zIndex = '1000';
      this.style.animationPlayState = 'paused';
    });

    cloud.addEventListener('mouseleave', function () {
      this.style.transform = 'scale(1) rotate(0deg)';
      this.style.filter = 'blur(1px)';
      this.style.zIndex = '1';
      this.style.animationPlayState = 'running';
    });

    // Add click effect to fart clouds
    cloud.addEventListener('click', function () {
      createFartExplosion(this);
    });
  });

  // Function to create fart explosion effect
  function createFartExplosion(cloud) {
    const explosion = document.createElement('div');
    explosion.innerHTML = '💨💨💨';
    explosion.style.position = 'fixed';
    explosion.style.left = cloud.offsetLeft + 'px';
    explosion.style.top = cloud.offsetTop + 'px';
    explosion.style.fontSize = '3rem';
    explosion.style.pointerEvents = 'none';
    explosion.style.zIndex = '9999';
    explosion.style.transform = 'translate(-50%, -50%)';

    document.body.appendChild(explosion);

    const animation = explosion.animate(
      [
        { transform: 'translate(-50%, -50%) scale(0.5)', opacity: 1 },
        {
          transform: 'translate(-50%, -50%) scale(2) rotate(360deg)',
          opacity: 0.8,
        },
        {
          transform: 'translate(-50%, -50%) scale(3) rotate(720deg)',
          opacity: 0,
        },
      ],
      {
        duration: 1000,
        easing: 'ease-out',
      }
    );

    animation.onfinish = () => {
      explosion.remove();
    };
  }

  // Add parallax effect to hero section
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', function () {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    });
  }

  // Add intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    '.feature-card, .roadmap-item, .about-features .feature-item'
  );
  animateElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Add typing effect to hero title
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = '';

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };

    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
  }

  // Add floating animation to hero card
  const heroCard = document.querySelector('.hero-card');
  if (heroCard) {
    heroCard.style.animation = 'float 6s ease-in-out infinite';
  }

  // Add CSS for floating animation and additional fart effects
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
    
    @keyframes fart-bubble {
      0% { transform: scale(0) rotate(0deg); opacity: 0; }
      50% { transform: scale(1.2) rotate(180deg); opacity: 0.8; }
      100% { transform: scale(0) rotate(360deg); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  // Create random fart bubbles that appear and disappear
  function createRandomFartBubble() {
    const bubble = document.createElement('div');
    bubble.innerHTML = '💨';
    bubble.style.position = 'fixed';
    bubble.style.left = Math.random() * window.innerWidth + 'px';
    bubble.style.top = Math.random() * window.innerHeight + 'px';
    bubble.style.fontSize = Math.random() * 2 + 1 + 'rem';
    bubble.style.pointerEvents = 'none';
    bubble.style.zIndex = '10';
    bubble.style.animation = 'fart-bubble 3s ease-in-out forwards';

    document.body.appendChild(bubble);

    setTimeout(() => {
      bubble.remove();
    }, 3000);
  }

  // Create fart bubbles at random intervals
  setInterval(createRandomFartBubble, 5000);

  // Add mouse trail fart effect
  let mouseTrail = [];
  let isMouseTrailActive = false;

  document.addEventListener('mousemove', function (e) {
    if (isMouseTrailActive) {
      const trail = document.createElement('div');
      trail.innerHTML = '💨';
      trail.style.position = 'fixed';
      trail.style.left = e.clientX + 'px';
      trail.style.top = e.clientY + 'px';
      trail.style.fontSize = '1rem';
      trail.style.pointerEvents = 'none';
      trail.style.zIndex = '100';
      trail.style.opacity = '0.7';
      trail.style.transform = 'translate(-50%, -50%)';

      document.body.appendChild(trail);

      // Animate trail
      const animation = trail.animate(
        [
          { opacity: 0.7, transform: 'translate(-50%, -50%) scale(1)' },
          { opacity: 0, transform: 'translate(-50%, -50%) scale(0.5)' },
        ],
        {
          duration: 1000,
          easing: 'ease-out',
        }
      );

      animation.onfinish = () => {
        trail.remove();
      };

      mouseTrail.push(trail);

      // Limit trail length
      if (mouseTrail.length > 10) {
        const oldTrail = mouseTrail.shift();
        if (oldTrail && oldTrail.parentNode) {
          oldTrail.remove();
        }
      }
    }
  });

  // Toggle mouse trail with 'T' key
  document.addEventListener('keydown', function (e) {
    if (e.key.toLowerCase() === 't') {
      isMouseTrailActive = !isMouseTrailActive;
      if (isMouseTrailActive) {
        console.log('💨 Fart trail activated! Move your mouse around!');
      } else {
        console.log('💨 Fart trail deactivated!');
        // Clear existing trail
        mouseTrail.forEach((trail) => {
          if (trail && trail.parentNode) {
            trail.remove();
          }
        });
        mouseTrail = [];
      }
    }
  });

  // Add confetti effect on button click
  const primaryButtons = document.querySelectorAll('.btn-primary');
  primaryButtons.forEach((button) => {
    button.addEventListener('click', function () {
      createConfetti();
    });
  });

  function createConfetti() {
    const colors = ['#8B4513', '#228B22', '#FFD700', '#A0522D', '#32CD32'];

    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-10px';
      confetti.style.borderRadius = '50%';
      confetti.style.pointerEvents = 'none';
      confetti.style.zIndex = '9999';

      document.body.appendChild(confetti);

      const animation = confetti.animate(
        [
          { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
          {
            transform: `translateY(${window.innerHeight + 100}px) rotate(${
              Math.random() * 360
            }deg)`,
            opacity: 0,
          },
        ],
        {
          duration: Math.random() * 3000 + 2000,
          easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }
      );

      animation.onfinish = () => {
        confetti.remove();
      };
    }
  }

  // Add fart sound effect (optional - just for fun)
  const fartButton = document.querySelector('.btn-primary');
  if (fartButton) {
    fartButton.addEventListener('click', function () {
      // Create a simple "fart" sound using Web Audio API
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        50,
        audioContext.currentTime + 0.5
      );

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.5
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    });
  }
});

// Add some fun easter eggs
document.addEventListener('keydown', function (e) {
  // Press 'F' key for a fun surprise
  if (e.key.toLowerCase() === 'f') {
    const body = document.body;
    body.style.animation = 'shake 0.5s ease-in-out';

    setTimeout(() => {
      body.style.animation = '';
    }, 500);

    // Add shake animation CSS
    if (!document.querySelector('#shake-animation')) {
      const style = document.createElement('style');
      style.id = 'shake-animation';
      style.textContent = `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `;
      document.head.appendChild(style);
    }
  }
});

// Add some fun hover effects to the logo
document.addEventListener('DOMContentLoaded', function () {
  const logo = document.querySelector('.brand-icon img');
  if (logo) {
    logo.addEventListener('mouseenter', function () {
      this.style.transform = 'rotate(360deg) scale(1.1)';
      this.style.transition = 'transform 0.5s ease';
    });

    logo.addEventListener('mouseleave', function () {
      this.style.transform = 'rotate(0deg) scale(1)';
    });
  }

  // Debug and ensure gradient text is working
  const gradientText = document.querySelector('.text-gradient');
  if (gradientText) {
    console.log('💨 Gradient text element found:', gradientText);

    // Force a repaint to ensure CSS is applied
    gradientText.style.display = 'none';
    gradientText.offsetHeight; // Force reflow
    gradientText.style.display = 'inline-block';

    // Add a subtle animation to make sure it's visible
    gradientText.style.animation = 'gradient-pulse 2s ease-in-out infinite';
  }
});

// Add CSS for gradient pulse animation
const gradientStyle = document.createElement('style');
gradientStyle.textContent = `
    @keyframes gradient-pulse {
      0%, 100% { 
        filter: hue-rotate(0deg) brightness(1);
      }
      50% { 
        filter: hue-rotate(10deg) brightness(1.1);
      }
    }
  `;
document.head.appendChild(gradientStyle);
