// ===== Goal Setter 2030 — App Logic =====

(function () {
  'use strict';

  const MAX_GOALS = 6;
  let goals = [];

  // DOM refs
  const form = document.getElementById('goalForm');
  const titleInput = document.getElementById('goalTitle');
  const categorySelect = document.getElementById('goalCategory');
  const yearSelect = document.getElementById('goalYear');
  const descInput = document.getElementById('goalDesc');
  const goalCards = document.getElementById('goalCards');
  const goalCounter = document.getElementById('goalCounter');
  const generateWrap = document.getElementById('generateWrap');
  const generateBtn = document.getElementById('generateBtn');
  const roadmapSection = document.getElementById('roadmap');
  const timeline = document.getElementById('timeline');
  const resetBtn = document.getElementById('resetBtn');
  const shareBtn = document.getElementById('shareBtn');
  const addGoalBtn = document.getElementById('addGoalBtn');
  const toast = document.getElementById('toast');
  const particlesContainer = document.getElementById('particles');

  const categoryLabels = {
    career: '💼 Career',
    health: '💪 Health & Fitness',
    finance: '💰 Finance',
    education: '📚 Education',
    personal: '🌱 Personal Growth',
    travel: '✈️ Travel & Adventure',
  };

  // ===== Particles =====
  function createParticles() {
    const count = 30;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      const size = Math.random() * 4 + 2;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + 100 + '%';
      p.style.animationDuration = Math.random() * 15 + 10 + 's';
      p.style.animationDelay = Math.random() * 10 + 's';
      particlesContainer.appendChild(p);
    }
  }

  // ===== Toast =====
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2800);
  }

  // ===== Validation =====
  function clearErrors() {
    form.querySelectorAll('.error').forEach((el) => el.classList.remove('error'));
  }

  function validate() {
    clearErrors();
    let valid = true;

    if (!titleInput.value.trim()) {
      titleInput.classList.add('error');
      valid = false;
    }
    if (!categorySelect.value) {
      categorySelect.classList.add('error');
      valid = false;
    }
    if (!yearSelect.value) {
      yearSelect.classList.add('error');
      valid = false;
    }

    return valid;
  }

  // ===== Render Goal Cards =====
  function renderCards() {
    goalCards.innerHTML = '';

    goals.forEach((goal, index) => {
      const card = document.createElement('div');
      card.classList.add('goal-card');
      card.style.animationDelay = index * 0.08 + 's';

      const descHtml = goal.description
        ? `<p class="card-desc">${escapeHtml(goal.description)}</p>`
        : '';

      card.innerHTML = `
        <button class="card-delete" data-index="${index}" aria-label="Remove goal: ${escapeHtml(goal.title)}">&times;</button>
        <span class="card-cat" data-cat="${goal.category}">${categoryLabels[goal.category]}</span>
        <h3 class="card-title">${escapeHtml(goal.title)}</h3>
        <p class="card-year">Target: ${goal.year}</p>
        ${descHtml}
      `;

      goalCards.appendChild(card);
    });

    // Update counter
    goalCounter.textContent = `${goals.length} / ${MAX_GOALS} goals`;

    // Toggle add button
    addGoalBtn.disabled = goals.length >= MAX_GOALS;

    // Toggle generate button
    generateWrap.style.display = goals.length > 0 ? 'block' : 'none';
  }

  // ===== Add Goal =====
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (goals.length >= MAX_GOALS) {
      showToast('Maximum of 6 goals reached!');
      return;
    }

    if (!validate()) {
      showToast('Please fill in the required fields.');
      return;
    }

    goals.push({
      title: titleInput.value.trim(),
      category: categorySelect.value,
      year: parseInt(yearSelect.value, 10),
      description: descInput.value.trim(),
    });

    // Reset form
    form.reset();
    clearErrors();
    renderCards();
    showToast('Goal added!');
  });

  // ===== Delete Goal =====
  goalCards.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('.card-delete');
    if (!deleteBtn) return;

    const index = parseInt(deleteBtn.dataset.index, 10);
    goals.splice(index, 1);
    renderCards();
    showToast('Goal removed.');
  });

  // ===== Generate Roadmap =====
  generateBtn.addEventListener('click', () => {
    if (goals.length === 0) return;

    // Sort goals by year
    const sorted = [...goals].sort((a, b) => a.year - b.year);

    // Build timeline
    timeline.innerHTML = '';

    sorted.forEach((goal, i) => {
      const item = document.createElement('div');
      item.classList.add('timeline-item');
      item.setAttribute('role', 'listitem');
      item.style.animationDelay = i * 0.15 + 's';

      const descHtml = goal.description
        ? `<p>${escapeHtml(goal.description)}</p>`
        : '';

      item.innerHTML = `
        <div class="tl-dot"></div>
        <div class="tl-year">${goal.year}</div>
        <div class="tl-card">
          <span class="tl-cat" data-cat="${goal.category}">${categoryLabels[goal.category]}</span>
          <h3>${escapeHtml(goal.title)}</h3>
          ${descHtml}
        </div>
      `;

      timeline.appendChild(item);
    });

    // Show roadmap
    roadmapSection.style.display = 'block';

    // Scroll to roadmap
    setTimeout(() => {
      roadmapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  });

  // ===== Reset =====
  resetBtn.addEventListener('click', () => {
    goals = [];
    renderCards();
    roadmapSection.style.display = 'none';
    timeline.innerHTML = '';
    document.getElementById('goal-form').scrollIntoView({ behavior: 'smooth' });
    showToast('All goals cleared. Start fresh!');
  });

  // ===== Copy Summary =====
  shareBtn.addEventListener('click', () => {
    if (goals.length === 0) return;

    const sorted = [...goals].sort((a, b) => a.year - b.year);
    let text = '🎯 My Goals for 2030\n\n';

    sorted.forEach((goal) => {
      text += `${goal.year} — ${categoryLabels[goal.category]} ${goal.title}`;
      if (goal.description) text += `\n   ${goal.description}`;
      text += '\n\n';
    });

    text += 'Created with Goal Setter 2030 ✨';

    navigator.clipboard.writeText(text).then(() => {
      showToast('Summary copied to clipboard!');
    }).catch(() => {
      showToast('Could not copy. Try again.');
    });
  });

  // ===== Smooth scroll for hero CTA =====
  document.getElementById('start-btn').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('goal-form').scrollIntoView({ behavior: 'smooth' });
  });

  // ===== Utility =====
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ===== Init =====
  createParticles();
})();
