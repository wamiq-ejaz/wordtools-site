// Remove Extra Spaces / whitespace cleanup tool
(function () {
  const input = document.getElementById('text-input');
  if (!input) return;

  function removeExtraSpaces(str) {
    return str
      .split('\n')
      .map((line) => line.replace(/[ \t]+/g, ' ').trim())
      .join('\n');
  }

  function removeLineBreaks(str) {
    return str.replace(/\s*\n+\s*/g, ' ').replace(/[ \t]+/g, ' ').trim();
  }

  function removeBlankLines(str) {
    return str
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .join('\n');
  }

  function trimEachLine(str) {
    return str
      .split('\n')
      .map((line) => line.trim())
      .join('\n');
  }

  document.querySelectorAll('[data-action]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-action');
      let result = input.value;
      if (action === 'extra-spaces') result = removeExtraSpaces(result);
      if (action === 'line-breaks') result = removeLineBreaks(result);
      if (action === 'blank-lines') result = removeBlankLines(result);
      if (action === 'trim-lines') result = trimEachLine(result);
      input.value = result;
      updateCount();
    });
  });

  const clearBtn = document.getElementById('btn-clear');
  if (clearBtn) clearBtn.addEventListener('click', () => { input.value = ''; updateCount(); input.focus(); });

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

  const countEl = document.getElementById('stat-chars');
  function updateCount() {
    if (countEl) countEl.textContent = input.value.length.toLocaleString();
  }
  input.addEventListener('input', updateCount);
  updateCount();
})();
