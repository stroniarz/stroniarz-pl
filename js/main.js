(function() {
    'use strict';

    // ── GSAP + Lenis init (Phase 1) ──
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    let lenis = null;
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });
        if (typeof ScrollTrigger !== 'undefined') {
            lenis.on('scroll', ScrollTrigger.update);
        }
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
        // Expose globally for nav anchor scrolling
        window.stroniarzLenis = lenis;
    }

    // ── Logo typewriter ──
    const logoEl = document.getElementById('logoText');
    const logoName = 'Stroniarz.pl';
    const cursor = document.createElement('span');
    cursor.className = 'logo-cursor';
    logoEl.appendChild(cursor);

    logoName.split('').forEach((char, i) => {
        setTimeout(() => {
            const span = document.createElement('span');
            span.className = 'logo-letter';
            span.textContent = char;
            span.style.animationDelay = '0s';
            logoEl.insertBefore(span, cursor);
        }, 120 * i + 300);
    });

    // Remove cursor after typing
    setTimeout(() => {
        cursor.style.animation = 'cursorBlink 0.6s step-end 3';
        cursor.addEventListener('animationend', () => cursor.remove());
    }, 120 * logoName.length + 800);

    // ── Nav links typewriter (after logo finishes) ──
    const navLinks = document.querySelectorAll('.nav__links a');
    const navStartDelay = 120 * logoName.length + 400;
    let totalNavChars = 0;

    navLinks.forEach((link) => {
        const text = link.textContent;
        link.textContent = '';
        link.style.opacity = '1';
        link.style.transform = 'none';

        text.split('').forEach((char, j) => {
            setTimeout(() => {
                const span = document.createElement('span');
                span.className = 'logo-letter';
                span.style.animationDelay = '0s';
                span.textContent = char;
                link.appendChild(span);
            }, navStartDelay + (totalNavChars + j) * 60);
        });
        totalNavChars += text.length + 2;
    });

    // ── Custom cursor + glow follow ──
    const glow = document.getElementById('cursorGlow');
    const customCursor = document.getElementById('customCursor');
    let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;
    let cursorX = 0, cursorY = 0;

    if (window.matchMedia('(pointer: fine)').matches) {
        // Hide default cursor
        document.body.style.cursor = 'none';
        document.querySelectorAll('a, button, .service-item').forEach(el => {
            el.style.cursor = 'none';
        });

        document.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursors() {
            cursorX += (mouseX - cursorX) * 0.5;
            cursorY += (mouseY - cursorY) * 0.5;
            customCursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

            glowX += (mouseX - glowX) * 0.08;
            glowY += (mouseY - glowY) * 0.08;
            glow.style.left = glowX + 'px';
            glow.style.top = glowY + 'px';

            requestAnimationFrame(animateCursors);
        }
        animateCursors();
    } else {
        glow.style.display = 'none';
        customCursor.style.display = 'none';
    }

    // ── Service preview overlay with canvas animations ──
    const preview = document.getElementById('servicePreview');
    const canvas = document.getElementById('previewCanvas');
    const ctx = canvas.getContext('2d');
    let previewActive = false;
    let currentPreview = '';
    let previewRAF = null;
    let previewTime = 0;

    const previewColors = {
        ecommerce: { a: '#7c3aed', b: '#c026d3', c: '#e879f9' },
        ai:        { a: '#00e5ff', b: '#3b0764', c: '#7c3aed' },
        ads:       { a: '#fbbf24', b: '#f59e0b', c: '#d97706' },
        web:       { a: '#10b981', b: '#06b6d4', c: '#00e5ff' }
    };

    function drawPreview(type) {
        const w = canvas.width, h = canvas.height;
        const col = previewColors[type];
        previewTime += 0.02;

        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#0a0a14';
        ctx.fillRect(0, 0, w, h);

        // Animated flowing particles
        for (let i = 0; i < 40; i++) {
            const t = previewTime + i * 0.4;
            const x = (Math.sin(t * 0.7 + i) * 0.4 + 0.5) * w;
            const y = (Math.cos(t * 0.5 + i * 0.8) * 0.4 + 0.5) * h;
            const r = 2 + Math.sin(t + i) * 1.5;
            const alpha = 0.3 + Math.sin(t * 0.8 + i) * 0.2;

            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fillStyle = (i % 3 === 0) ? col.a : (i % 3 === 1) ? col.b : col.c;
            ctx.globalAlpha = alpha;
            ctx.fill();
        }

        // Connecting lines between nearby particles
        ctx.globalAlpha = 0.08;
        ctx.strokeStyle = col.a;
        ctx.lineWidth = 1;
        for (let i = 0; i < 20; i++) {
            const t1 = previewTime + i * 0.4;
            const x1 = (Math.sin(t1 * 0.7 + i) * 0.4 + 0.5) * w;
            const y1 = (Math.cos(t1 * 0.5 + i * 0.8) * 0.4 + 0.5) * h;
            const j = (i + 3) % 20;
            const t2 = previewTime + j * 0.4;
            const x2 = (Math.sin(t2 * 0.7 + j) * 0.4 + 0.5) * w;
            const y2 = (Math.cos(t2 * 0.5 + j * 0.8) * 0.4 + 0.5) * h;
            const dist = Math.hypot(x2 - x1, y2 - y1);
            if (dist < 180) {
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }
        }

        // Pulsing gradient orb
        ctx.globalAlpha = 0.25;
        const orbR = 80 + Math.sin(previewTime) * 20;
        const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, orbR);
        grad.addColorStop(0, col.a);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, orbR, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 1;

        if (previewActive) {
            previewRAF = requestAnimationFrame(() => drawPreview(type));
        }
    }

    if (window.matchMedia('(pointer: fine)').matches) {
        document.querySelectorAll('.service-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                currentPreview = item.dataset.preview;
                previewActive = true;
                previewTime = 0;
                preview.classList.add('active');
                drawPreview(currentPreview);
            });

            item.addEventListener('mousemove', e => {
                preview.style.left = (e.clientX + 20) + 'px';
                preview.style.top = (e.clientY - 110) + 'px';
            });

            item.addEventListener('mouseleave', () => {
                previewActive = false;
                preview.classList.remove('active');
                if (previewRAF) cancelAnimationFrame(previewRAF);
            });
        });
    }

    // ── Magnetic CTA button ──
    const ctaBtn = document.getElementById('ctaBtn');
    if (window.matchMedia('(pointer: fine)').matches && ctaBtn) {
        ctaBtn.addEventListener('mousemove', e => {
            const rect = ctaBtn.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) * 0.15;
            const dy = (e.clientY - cy) * 0.15;
            ctaBtn.style.transform = `translate(${dx}px, ${dy}px)`;
        });
        ctaBtn.addEventListener('mouseleave', () => {
            ctaBtn.style.transform = '';
        });
    }

    // ── Service items scroll-in (GSAP) ──
    if (typeof gsap !== 'undefined') {
        gsap.set('.service-item', { opacity: 0, y: 60 });
        gsap.to('.service-item', {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.services__list',
                start: 'top 80%',
                toggleActions: 'play none none none',
            }
        });
    }

    // ── Service detail slide ──
    const servicesWrapper = document.getElementById('servicesWrapper');
    const serviceFullBg = document.getElementById('serviceFullBg');
    let activeDetail = null;

    const detailBgs = {
        0: 'assets/images/bg-ecommerce.png',
        1: 'assets/images/bg-ai.jpg',
        2: '',
        3: ''
    };

    document.querySelectorAll('.service-item').forEach(item => {
        item.addEventListener('click', () => {
            const idx = item.dataset.detail;
            // Hide all detail panels
            document.querySelectorAll('.service-detail').forEach(d => d.classList.remove('active-detail'));
            const detail = document.getElementById('serviceDetail-' + idx);
            detail.classList.add('active-detail');
            servicesWrapper.classList.add('detail-open');
            activeDetail = idx;

            // Set fullscreen background
            if (detailBgs[idx]) {
                serviceFullBg.style.backgroundImage = 'url(' + detailBgs[idx] + ')';
                serviceFullBg.classList.add('active');
            } else {
                serviceFullBg.classList.remove('active');
            }

            document.body.classList.add('detail-mode');

            // Scroll to services section
            document.getElementById('uslugi').scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Hide the preview overlay
            previewActive = false;
            preview.classList.remove('active');
            if (previewRAF) cancelAnimationFrame(previewRAF);
        });
    });

    function closeDetail() {
        document.querySelectorAll('.service-detail').forEach(d => d.classList.remove('active-detail'));
        servicesWrapper.classList.remove('detail-open');
        serviceFullBg.classList.remove('active');
        document.body.classList.remove('detail-mode');
        activeDetail = null;
    }

    function openDetail(idx) {
        document.querySelectorAll('.service-detail').forEach(d => d.classList.remove('active-detail'));
        const detail = document.getElementById('serviceDetail-' + idx);
        if (!detail) { closeDetail(); return; }
        detail.classList.add('active-detail');
        servicesWrapper.classList.add('detail-open');
        document.body.classList.add('detail-mode');
        activeDetail = idx;

        if (detailBgs[idx]) {
            serviceFullBg.style.backgroundImage = 'url(' + detailBgs[idx] + ')';
            serviceFullBg.classList.add('active');
        } else {
            serviceFullBg.classList.remove('active');
        }

        document.getElementById('uslugi').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    document.querySelectorAll('[data-close-detail]').forEach(btn => {
        btn.addEventListener('click', closeDetail);
    });

    // ── Scroll to next detail or close ──
    const totalDetails = 4;
    let scrollCooldown = false;

    // Click on next hints
    document.querySelectorAll('.detail-next-hint').forEach(hint => {
        hint.addEventListener('click', () => {
            if (activeDetail === null) return;
            const nextIdx = parseInt(activeDetail) + 1;
            if (nextIdx < totalDetails) {
                openDetail(nextIdx);
            } else {
                closeDetail();
                document.getElementById('uslugi').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Scroll-based auto-advance — requires sustained scroll at boundary
    let prevScrollY = window.scrollY;
    let atBottomCount = 0;
    let atTopCount = 0;
    const SCROLL_THRESHOLD = 8; // need this many scroll events at boundary

    function onDetailScroll() {
        if (activeDetail === null || scrollCooldown) return;

        const scrollY = window.scrollY;
        const scrollBottom = scrollY + window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const servicesTop = document.getElementById('uslugi').getBoundingClientRect().top + scrollY;
        const goingDown = scrollY > prevScrollY;
        const goingUp = scrollY < prevScrollY;

        // Scroll DOWN — at bottom of page, keep counting
        if (scrollBottom >= docHeight - 30 && goingDown) {
            atBottomCount++;
            atTopCount = 0;
        } else if (goingDown) {
            atBottomCount = 0;
        }

        // Scroll UP — at top of services section, keep counting
        if (scrollY <= servicesTop + 20 && goingUp) {
            atTopCount++;
            atBottomCount = 0;
        } else if (goingUp) {
            atTopCount = 0;
        }

        // Trigger next detail after sustained scroll at bottom
        if (atBottomCount >= SCROLL_THRESHOLD) {
            atBottomCount = 0;
            scrollCooldown = true;
            const nextIdx = parseInt(activeDetail) + 1;
            if (nextIdx < totalDetails) {
                openDetail(nextIdx);
            } else {
                closeDetail();
                document.getElementById('uslugi').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            setTimeout(() => { scrollCooldown = false; }, 1500);
        }

        // Trigger close after sustained scroll at top
        if (atTopCount >= SCROLL_THRESHOLD) {
            atTopCount = 0;
            scrollCooldown = true;
            closeDetail();
            document.getElementById('uslugi').scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => { scrollCooldown = false; }, 1500);
        }

        prevScrollY = scrollY;
    }

    window.addEventListener('scroll', onDetailScroll, { passive: true });

    // ── Scroll reveal (GSAP ScrollTrigger) ──
    if (typeof gsap !== 'undefined') {
        document.querySelectorAll('.reveal').forEach((el) => {
            // Read delay from class (.reveal-delay-1..4)
            const delayMatch = el.className.match(/reveal-delay-(\d)/);
            const delay = delayMatch ? parseInt(delayMatch[1], 10) * 0.1 : 0;
            gsap.set(el, { opacity: 0, y: 50 });
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: delay,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    toggleActions: 'play none none none',
                }
            });
        });
    }

    // ── Hero parallax ──
    if (typeof gsap !== 'undefined') {
        gsap.to('.hero__content', {
            yPercent: -25,
            opacity: 0.4,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 0.5,
            }
        });
    }

    // ── Nav scroll effect ──
    const nav = document.getElementById('nav');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        nav.classList.toggle('scrolled', scrollY > 60);
        lastScroll = scrollY;
    }, { passive: true });

    // ── Counter animation (GSAP ScrollTrigger) ──
    if (typeof gsap !== 'undefined') {
        document.querySelectorAll('.stat__number').forEach((el) => {
            const target = parseInt(el.dataset.target, 10);
            const obj = { val: 0 };
            ScrollTrigger.create({
                trigger: el,
                start: 'top 80%',
                once: true,
                onEnter: () => {
                    gsap.to(obj, {
                        val: target,
                        duration: 2,
                        ease: 'power3.out',
                        onUpdate: () => {
                            el.textContent = Math.round(obj.val) + '+';
                        }
                    });
                }
            });
        });
    }

    // ── Anchor links smooth scroll via Lenis ──
    if (lenis) {
        document.querySelectorAll('a[href^="#"]').forEach((a) => {
            a.addEventListener('click', (e) => {
                const href = a.getAttribute('href');
                if (href && href.length > 1) {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        lenis.scrollTo(target, { offset: -80 });
                    }
                }
            });
        });
    }

    // ── Mobile menu ──
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobileMenu');

    burger.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        const spans = burger.querySelectorAll('span');
        if (mobileMenu.classList.contains('open')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });

    mobileMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            const spans = burger.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        });
    });

    // ── Hide scroll hint on scroll ──
    const scrollHint = document.querySelector('.hero__scroll-hint');
    if (scrollHint) {
        window.addEventListener('scroll', () => {
            scrollHint.style.opacity = Math.max(0, 1 - window.scrollY / 300);
        }, { passive: true });
    }

})();
