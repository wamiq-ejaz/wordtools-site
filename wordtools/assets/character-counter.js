// Character Counter tool logic
(function () {
  const input = document.getElementById('text-input');
  if (!input) return;

  const stat = document.getElementById('stat-chars');
  const statNoSpace = document.getElementById('stat-chars-nospace');
  const limitBars = document.querySelectorAll('[data-limit]');

  function update() {
    const text = input.value;
    const len = text.length;
    const noSpace = text.replace(/\s/g, '').length;

    if (stat) stat.textContent = len.toLocaleString();
    if (statNoSpace) statNoSpace.textContent = noSpace.toLocaleString();

    limitBars.forEach((row) => {
      const limit = parseInt(row.getAttribute('data-limit'), 10);
      const countEl = row.querySelector('.limit-count');
      const barEl = row.querySelector('.limit-fill');
      if (countEl) countEl.textContent = len + ' / ' + limit;
      if (barEl) {
        const pct = Math.min(100, (len / limit) * 100);
        barEl.style.width = pct + '%';
        barEl.style.background = len > limit ? 'var(--ribbon)' : 'var(--inkblue)';
      }
    });
  }

  input.addEventListener('input', update);

  const clearBtn = document.getElementById('btn-clear');
  if (clearBtn) clearBtn.addEventListener('click', () => { input.value = ''; update(); input.focus(); });

  const pasteBtn = document.getElementById('btn-paste');
  if (pasteBtn) {
    pasteBtn.addEventListener('click', async () => {
      try { input.value = await navigator.clipboard.readText(); update(); } catch (e) {}
    });
  }

  update();
})();
