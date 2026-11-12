// Case Converter tool logic
(function () {
  const input = document.getElementById('text-input');
  if (!input) return;

  function toTitleCase(str) {
    const minorWords = new Set(['a','an','and','as','at','but','by','for','in','nor','of','on','or','so','the','to','up','yet']);
    return str
      .toLowerCase()
      .split(' ')
      .map((word, i) => {
        if (word.length === 0) return word;
        if (i !== 0 && minorWords.has(word)) return word;
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  }

  function toSentenceCase(str) {
    const lower = str.toLowerCase();
    return lower.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
  }

  function toAlternatingCase(str) {
    let out = '';
    let upper = false;
    for (const ch of str) {
      if (/[a-zA-Z]/.test(ch)) {
        out += upper ? ch.toUpperCase() : ch.toLowerCase();
        upper = !upper;
      } else {
        out += ch;
      }
    }
    return out;
  }

  function applyCase(type) {
    const val = input.value;
    let result = val;
    switch (type) {
      case 'upper': result = val.toUpperCase(); break;
      case 'lower': result = val.toLowerCase(); break;
      case 'title': result = toTitleCase(val); break;
      case 'sentence': result = toSentenceCase(val); break;
      case 'alt': result = toAlternatingCase(val); break;
    }
    input.value = result;
    updateCount();
  }

  document.querySelectorAll('[data-case]').forEach((btn) => {
    btn.addEventListener('click', () => applyCase(btn.getAttribute('data-case')));
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
