// Word Counter tool logic
(function () {
  const input = document.getElementById('text-input');
  if (!input) return;

  const els = {
    words: document.getElementById('stat-words'),
    chars: document.getElementById('stat-chars'),
    charsNoSpace: document.getElementById('stat-chars-nospace'),
    sentences: document.getElementById('stat-sentences'),
    paragraphs: document.getElementById('stat-paragraphs'),
    readTime: document.getElementById('stat-readtime'),
  };

  function update() {
    const text = input.value;

    const trimmed = text.trim();
    const words = trimmed.length ? trimmed.split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, '').length;
    const sentences = trimmed
      ? (trimmed.match(/[.!?]+(?=\s|$)/g) || []).length || (trimmed.length ? 1 : 0)
      : 0;
    const paragraphs = trimmed
      ? trimmed.split(/\n+/).filter((p) => p.trim().length > 0).length
      : 0;
    const readTime = Math.max(1, Math.ceil(words / 200));

    if (els.words) els.words.textContent = words.toLocaleString();
    if (els.chars) els.chars.textContent = chars.toLocaleString();
    if (els.charsNoSpace) els.charsNoSpace.textContent = charsNoSpace.toLocaleString();
    if (els.sentences) els.sentences.textContent = sentences.toLocaleString();
    if (els.paragraphs) els.paragraphs.textContent = paragraphs.toLocaleString();
    if (els.readTime) els.readTime.textContent = words === 0 ? '0 min' : readTime + ' min';
  }

  input.addEventListener('input', update);

  const clearBtn = document.getElementById('btn-clear');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      input.value = '';
      update();
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
      } catch (e) {
        /* clipboard unavailable; ignore silently */
      }
    });
  }

  const pasteBtn = document.getElementById('btn-paste');
  if (pasteBtn) {
    pasteBtn.addEventListener('click', async () => {
      try {
        const text = await navigator.clipboard.readText();
        input.value = text;
        update();
      } catch (e) {
        /* clipboard unavailable; ignore silently */
      }
    });
  }

  update();
})();
