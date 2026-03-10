// ===== Scroll Animation Observer =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
// ===== Ripple Effect on Buttons =====
document.querySelectorAll('.btn-primary, .btn-ghost, .plan-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.cssText = `
            width:${size}px; height:${size}px;
            left:${e.clientX - rect.left - size/2}px;
            top:${e.clientY - rect.top - size/2}px;
            position:absolute; border-radius:50%;
            background:rgba(255,255,255,0.4);
            transform:scale(0); pointer-events:none;
            animation:ripple-anim 0.6s ease-out;
        `;
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});
const rs = document.createElement('style');
rs.textContent = `@keyframes ripple-anim { to { transform: scale(4); opacity: 0; } }`;
document.head.appendChild(rs);
// ===== Counter Animation for Stats =====
function animateCounter(element, target, suffix, duration = 2000) {
    let current = 0;
    const steps = 60;
    const stepTime = duration / steps;
    const timer = setInterval(() => {
        current++;
        element.textContent = formatStat(Math.floor((current / steps) * target), suffix);
        if (current >= steps) {
            element.textContent = formatStat(target, suffix);
            clearInterval(timer);
        }
    }, stepTime);
}
function formatStat(num, suffix) {
    if (suffix === 'M+') return (num / 1000000).toFixed(1) + 'M+';
    if (suffix === 'K+') return (num / 1000).toFixed(0) + 'K+';
    return num + suffix;
}
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target.querySelector('.stat-num');
        if (!el) return;
        const text = el.textContent.trim();
        let target = 0, suffix = '';
        if      (text.includes('M+'))                             { target = parseFloat(text) * 1000000; suffix = 'M+'; }
        else if (text.includes('k+') || text.includes('K+'))     { target = parseFloat(text) * 1000;    suffix = 'K+'; }
        else if (text.includes('★'))                              { return; }
        else                                                       { target = parseInt(text); suffix = ''; }
        if (target > 0) { el.textContent = formatStat(0, suffix); animateCounter(el, target, suffix); }
        statsObserver.unobserve(entry.target);
    });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-item').forEach(s => statsObserver.observe(s));
// ===== Feature Card Icon Rotation =====
document.querySelectorAll('.feature-card').forEach(card => {
    const icon = card.querySelector('.feature-icon');
    card.addEventListener('mouseenter', () => { icon.style.transform = 'rotateY(180deg) scale(1.1)'; });
    card.addEventListener('mouseleave', () => { icon.style.transform = 'rotateY(0deg) scale(1)'; });
});
// ===== CTA Button Success Animation =====
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fa-solid fa-check"></i> Success!';
        this.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        setTimeout(() => { this.innerHTML = originalText; this.style.background = ''; }, 2000);
    });
});
// ===== Console =====
console.log('%cTaskFlow', 'color: #4f6ef7; font-size: 24px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS & JavaScript', 'color: #64748b; font-size: 14px;');