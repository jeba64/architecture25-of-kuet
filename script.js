/* ============================================
   ARCH-25 | Shared Script
   ============================================ */

(function () {
  'use strict';

  // ── NAV ITEMS (static - no API dependency) ──
  const NAV_ITEMS = [
    { label: 'Album',    url: 'index.html' },
    { label: 'Project',  url: 'project.html' },
    { label: 'Students', url: 'students.html' },
    { label: 'About',    url: 'about.html' },
    { label: 'Contact',  url: 'contact.html' },
  ];

  // ── DOM REFS ──
  const navbar     = document.getElementById('navbar');
  const desktopMenu= document.getElementById('desktop-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuBtn    = document.getElementById('menu-btn');
  const menuIcon   = document.getElementById('menu-icon');

  // ── BUILD MENUS ──
  function buildMenus() {
    const currentPath = window.location.pathname;

    if (desktopMenu) {
      desktopMenu.innerHTML = NAV_ITEMS.map(item => {
        const isActive = currentPath.includes(item.url.replace('/', ''));
        return `<li><a href="${item.url}" class="nav-link${isActive ? ' active' : ''}">${item.label}</a></li>`;
      }).join('');
    }

    if (mobileMenu) {
      mobileMenu.innerHTML = NAV_ITEMS.map(item =>
        `<a href="${item.url}" class="mobile-link">${item.label}</a>`
      ).join('');
    }
  }

  // ── SCROLL EFFECT ──
  function handleScroll() {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }

  // ── MOBILE TOGGLE ──
  const ICON_MENU  = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>`;
  const ICON_CLOSE = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>`;

  function toggleMenu() {
    if (!mobileMenu) return;
    const isOpen = mobileMenu.classList.toggle('open');
    if (menuIcon) menuIcon.innerHTML = isOpen ? ICON_CLOSE : ICON_MENU;
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    if (menuIcon) menuIcon.innerHTML = ICON_MENU;
    document.body.style.overflow = '';
  }

  // ── LIVE CLOCK ──
  function updateClock() {
    const now = new Date();
    const dateEl = document.getElementById('live-date');
    const timeEl = document.getElementById('live-time');
    if (!dateEl || !timeEl) return;

    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yyyy = now.getFullYear();
    dateEl.textContent = `${dd}/${mm}/${yyyy}`;

    let h = now.getHours();
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    const min = String(now.getMinutes()).padStart(2, '0');
    const sec = String(now.getSeconds()).padStart(2, '0');
    timeEl.textContent = `${String(h).padStart(2,'0')}:${min}:${sec} ${ampm}`;
  }

  // ── INIT ──
  document.addEventListener('DOMContentLoaded', () => {
    buildMenus();
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    if (menuBtn)    menuBtn.addEventListener('click', toggleMenu);
    if (mobileMenu) {
      mobileMenu.addEventListener('click', e => {
        if (e.target.classList.contains('mobile-link')) closeMenu();
      });
    }

    // Close on outside click
    document.addEventListener('click', e => {
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
          closeMenu();
        }
      }
    });

    // Close on ESC
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMenu();
    });

    updateClock();
    setInterval(updateClock, 1000);
  });
})();
