// Text Reverser tool
(function () {
  const input = document.getElementById('text-input');
  if (!input) return;

  function reverseChars(str) {
    return str.split('').reverse().join('');
  }

  function reverseWordOrder(str) {
    return str.split(/(\s+)/).reverse().join('');
  }

  function reverseLineOrder(str) {
    return str.split('\n').reverse().join('\n');
  }

  function reverseEachWord(str) {
    return str.replace(/[A-Za-z0-9]+/g, (w) => w.split('').reverse().join(''));
  }

  document.querySelectorAll('[data-action]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-action');
      let result = input.value;
      if (action === 'chars') result = reverseChars(result);
      if (action === 'words') result = reverseWordOrder(result);
      if (action === 'lines') result = reverseLineOrder(result);
      if (action === 'each-word') result = reverseEachWord(result);
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
