/* ==========================================
   LINEAR / VERCEL STYLE COMMAND PALETTE (Ctrl+K)
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('command-palette');
  const input = document.getElementById('cmd-input');
  const list = document.getElementById('cmd-list');
  const openBtns = document.querySelectorAll('.trigger-cmd-palette');

  if (!modal || !input || !list) return;

  const actions = [
    { id: 'hero', icon: 'zap', title: 'Jump to Hero', category: 'Navigation', action: () => scrollToSection('hero') },
    { id: 'about', icon: 'user', title: 'About Harsh Tiwari', category: 'Navigation', action: () => scrollToSection('about') },
    { id: 'skills', icon: 'cpu', title: 'View Technical & AI Skills', category: 'Navigation', action: () => scrollToSection('skills') },
    { id: 'experience', icon: 'briefcase', title: 'Work Experience Timeline', category: 'Navigation', action: () => scrollToSection('experience') },
    { id: 'projects', icon: 'folder-git-2', title: 'Explore Case Studies & Projects', category: 'Navigation', action: () => scrollToSection('projects') },
    { id: 'services', icon: 'layers', title: 'Growth & SEO Services', category: 'Navigation', action: () => scrollToSection('services') },
    { id: 'case-studies', icon: 'bar-chart-3', title: 'Live Performance Case Studies', category: 'Navigation', action: () => scrollToSection('case-studies') },
    { id: 'certifications', icon: 'award', title: 'Certifications & Education', category: 'Navigation', action: () => scrollToSection('certifications') },
    { id: 'contact', icon: 'mail', title: "Get in Touch / Let's Talk", category: 'Navigation', action: () => scrollToSection('contact') },
    { id: 'resume-view', icon: 'file-text', title: 'View Resume (Interactive Modal)', category: 'Actions', action: () => openResumeModal() },
    { id: 'theme-toggle', icon: 'sun-moon', title: 'Toggle Light / Dark Theme', category: 'Actions', action: () => toggleTheme() },
    { id: 'ai-chat', icon: 'bot', title: 'Talk to Harsh AI Assistant', category: 'Actions', action: () => toggleAIChat() },
    { id: 'email-copy', icon: 'copy', title: 'Copy Email (harshtiwari163@gmail.com)', category: 'Actions', action: () => copyEmail() }
  ];

  let selectedIndex = 0;
  let filteredActions = [...actions];

  function renderList() {
    list.innerHTML = '';
    if (filteredActions.length === 0) {
      list.innerHTML = `<div class="p-6 text-center text-sm text-slate-400">No matching commands found</div>`;
      return;
    }

    let currentCat = '';
    filteredActions.forEach((item, index) => {
      if (item.category !== currentCat) {
        currentCat = item.category;
        const catHeader = document.createElement('div');
        catHeader.className = 'px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500';
        catHeader.textContent = currentCat;
        list.appendChild(catHeader);
      }

      const el = document.createElement('div');
      el.className = `cmd-item px-4 py-3 rounded-xl flex items-center justify-between cursor-pointer text-sm transition-colors ${
        index === selectedIndex ? 'bg-blue-600/20 border border-blue-500/30 text-white font-medium' : 'text-slate-300 hover:bg-slate-800/60'
      }`;
      el.innerHTML = `
        <div class="flex items-center gap-3">
          <i data-lucide="${item.icon}" class="w-4 h-4 text-blue-400"></i>
          <span>${item.title}</span>
        </div>
        <span class="text-xs text-slate-500 font-mono">↵ Execute</span>
      `;

      el.addEventListener('click', () => {
        item.action();
        closeModal();
      });

      list.appendChild(el);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  function openModal() {
    modal.classList.add('active');
    input.value = '';
    filteredActions = [...actions];
    selectedIndex = 0;
    renderList();
    setTimeout(() => input.focus(), 50);
  }

  function closeModal() {
    modal.classList.remove('active');
  }

  openBtns.forEach(btn => btn.addEventListener('click', openModal));

  // Keybindings
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      modal.classList.contains('active') ? closeModal() : openModal();
    } else if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  input.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    filteredActions = actions.filter(a => a.title.toLowerCase().includes(q) || a.category.toLowerCase().includes(q));
    selectedIndex = 0;
    renderList();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % filteredActions.length;
      renderList();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + filteredActions.length) % filteredActions.length;
      renderList();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredActions[selectedIndex]) {
        filteredActions[selectedIndex].action();
        closeModal();
      }
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  function scrollToSection(id) {
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  }

  function copyEmail() {
    navigator.clipboard.writeText('harshtiwari163@gmail.com');
    if (window.showToast) window.showToast('Copied email to clipboard! harshtiwari163@gmail.com');
  }
});
