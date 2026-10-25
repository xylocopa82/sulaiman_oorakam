/* Progressive enhancement: navigation and content still work without JavaScript. */
(() => {
  'use strict';
  document.body.classList.add('js-ready');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#navigation');
  toggle.hidden = false;
  function closeMenu() { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  document.querySelector('#year').textContent = new Date().getFullYear();
  const grid = document.querySelector('#media-grid');
  const dialog = document.querySelector('#media-dialog');
  const body = document.querySelector('#dialog-body');
  let trigger;
  const media = window.portfolioMedia || { videos: [], gallery: [] };
  // Only allow local/HTTP media; never insert editable strings as HTML.
  function safeURL(value) {
    if (!value || typeof value !== 'string') return '';
    try { const url = new URL(value, document.baseURI); return ['https:', 'http:', 'file:'].includes(url.protocol) ? url.href : ''; } catch { return ''; }
  }
  function youtubeID(value) {
    try {
      const url = new URL(value);
      const host = url.hostname.replace(/^www\./, '');
      if (!['youtube.com', 'youtu.be', 'm.youtube.com'].includes(host)) return '';
      const id = host === 'youtu.be' ? url.pathname.slice(1) : (url.searchParams.get('v') || url.pathname.split('/').pop());
      return /^[A-Za-z0-9_-]{11}$/.test(id || '') ? id : '';
    } catch { return ''; }
  }
  function instagramEmbedURL(value) {
    try {
      const url = new URL(value);
      const host = url.hostname.replace(/^www\./, '');
      const match = url.pathname.match(/^\/reel\/([A-Za-z0-9_-]+)\/?$/);
      return host === 'instagram.com' && match ? `https://www.instagram.com/reel/${match[1]}/embed/` : '';
    } catch { return ''; }
  }
  function node(tag, className, text) { const el = document.createElement(tag); if (className) el.className = className; if (text) el.textContent = text; return el; }
  function openMedia(item, category, button) {
    trigger = button;
    body.replaceChildren();
    document.querySelector('#dialog-title').textContent = item.title || 'Media';
    let el;
    if (category === 'gallery') {
      el = node('img'); el.src = safeURL(item.src); el.alt = item.alt || item.title || 'Gallery photograph';
    } else if (item.type === 'youtube') {
      const id = youtubeID(item.src);
      if (!id) return;
      el = node('iframe'); el.src = 'https://www.youtube-nocookie.com/embed/' + id; el.title = item.title || 'Video'; el.allowFullscreen = true; el.allow = 'fullscreen; picture-in-picture'; el.referrerPolicy = 'strict-origin-when-cross-origin';
    } else if (item.type === 'instagram') {
      const embedURL = instagramEmbedURL(item.src);
      if (!embedURL) return;
      el = node('iframe', 'instagram-embed'); el.src = embedURL; el.title = item.title || 'Instagram video'; el.allowFullscreen = true; el.referrerPolicy = 'strict-origin-when-cross-origin';
    } else {
      el = node('video'); el.src = safeURL(item.src); el.controls = true; el.preload = 'metadata'; if (safeURL(item.poster)) el.poster = safeURL(item.poster);
    }
    body.append(el);
    if (item.description) body.append(node('p', '', item.description));
    dialog.showModal();
  }
  function render(category) {
    grid.replaceChildren();
    const items = Array.isArray(media[category]) ? media[category] : [];
    const valid = items.filter(item => safeURL(item.src) && (category !== 'videos' || (item.type !== 'youtube' || youtubeID(item.src)) && (item.type !== 'instagram' || instagramEmbedURL(item.src))));
    if (!valid.length) {
      const titles = category === 'videos' ? ['Talks', 'Career guidance', 'Interviews'] : ['Events', 'Education sessions', 'Photographs'];
      titles.forEach(title => {
        const card = node('article', 'media-placeholder');
        const visual = node('div', 'media-visual'); visual.setAttribute('aria-hidden', 'true'); visual.dataset.kind = category; visual.append(node('span', 'media-icon', ''));
        const caption = node('div', 'media-caption'); caption.append(node('span', 'status', 'COLLECTION PENDING'), node('h3', '', title), node('p', '', category === 'videos' ? 'Video collection to be added.' : 'Photo collection to be added.'));
        card.append(visual, caption); grid.append(card);
      }); return;
    }
    valid.forEach(item => {
      const card = node('button', 'media-item'); card.type = 'button';
      card.dataset.kind = category;
      if (category === 'gallery' && /speech/i.test(item.title || item.alt || '')) card.dataset.crop = 'lower';
      const source = category === 'gallery' ? item.src : item.poster;
      if (safeURL(source)) {
        const visual = node('div', 'media-thumb');
        const img = node('img'); img.src = safeURL(source); img.alt = category === 'gallery' ? (item.alt || item.title || '') : ''; img.loading = 'lazy'; img.width = 640; img.height = 400;
        visual.append(img); card.append(visual);
      }
      else if (category === 'videos') { const visual = node('div', 'media-visual'); visual.setAttribute('aria-hidden', 'true'); visual.dataset.kind = 'videos'; visual.append(node('span', 'media-icon', '')); card.append(visual); }
      const caption = node('div', 'media-caption'); caption.append(node('h3', '', item.title || 'View media'), node('p', '', category === 'videos' ? 'Watch video' : 'View photograph')); card.append(caption);
      card.addEventListener('click', () => openMedia(item, category, card)); grid.append(card);
    });
  }
  document.querySelectorAll('[data-tab]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-tab]').forEach(tab => { tab.classList.toggle('active', tab === button); tab.setAttribute('aria-pressed', String(tab === button)); });
    render(button.dataset.tab);
  }));
  function closeDialog() { dialog.close(); }
  document.querySelector('#close-dialog').addEventListener('click', closeDialog);
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) closeDialog(); } });
  dialog.addEventListener('close', () => { body.replaceChildren(); trigger?.focus(); });
  render('videos');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('reveal'); observer.unobserve(entry.target); } }), { threshold: 0.12 });
    document.querySelectorAll('.section-heading, .about-copy, .venture, .focus-list article').forEach(el => observer.observe(el));
  }
})();
