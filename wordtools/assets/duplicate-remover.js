// Duplicate Line Remover tool
(function () {
  const input = document.getElementById('text-input');
  if (!input) return;

  const caseSensitiveBox = document.getElementById('case-sensitive');
  const trimBox = document.getElementById('trim-lines');
  const removedCountEl = document.getElementById('removed-count');

  function removeDuplicates() {
    const lines = input.value.split('\n');
    const seen = new Set();
    const out = [];
    let removed = 0;

    for (const rawLine of lines) {
      const line = trimBox && trimBox.checked ? rawLine.trim() : rawLine;
      const key = caseSensitiveBox && caseSensitiveBox.checked ? line : line.toLowerCase();
      if (seen.has(key)) {
        removed++;
        continue;
      }
      seen.add(key);
      out.push(line);
    }

    input.value = out.join('\n');
    if (removedCountEl) removedCountEl.textContent = removed.toLocaleString();
    updateCount();
  }

  const runBtn = document.getElementById('btn-remove-duplicates');
  if (runBtn) runBtn.addEventListener('click', removeDuplicates);

  const clearBtn = document.getElementById('btn-clear');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      input.value = '';
      if (removedCountEl) removedCountEl.textContent = '0';
      updateCount();
      input.focus();
    });
  }

  const copyBtn = document.getElementById('btn-copy');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(input.value);
        const old = copyBtn.textContent;
        copyBtn.textContent = 'Copied';
        setTimeout(() => (copyBtn.textContent = old), 1200);
      } catch (e) {}
    });
  }

  const pasteBtn = document.getElementById('btn-paste');
  if (pasteBtn) {
    pasteBtn.addEventListener('click', async () => {
      try { input.value = await navigator.clipboard.readText(); updateCount(); } catch (e) {}
    });
  }

  const countEl = document.getElementById('stat-lines');
  function updateCount() {
    const lines = input.value.length ? input.value.split('\n').length : 0;
    if (countEl) countEl.textContent = lines.toLocaleString();
  }
  input.addEventListener('input', updateCount);
  updateCount();
})();
