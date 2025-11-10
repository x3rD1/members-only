document.querySelectorAll('.post-date').forEach(el => {
  const utc = el.dataset.timestamp + 'Z';
  const local = new Date(utc).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  el.textContent = local;
});
