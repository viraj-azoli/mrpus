/**
 * MRP Home Solutions & Realty - Before & After Slider
 * Handles smooth mouse, touch, and keyboard interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.before-after-wrapper');
  const beforeImg = document.querySelector('.comparison-img-before');
  const handle = document.querySelector('.comparison-handle');

  if (!container || !beforeImg || !handle) return;

  let isDragging = false;

  function updateSliderPosition(clientX) {
    const rect = container.getBoundingClientRect();
    let offsetX = clientX - rect.left;
    let percentage = (offsetX / rect.width) * 100;

    // Clamp between 5% and 95%
    if (percentage < 5) percentage = 5;
    if (percentage > 95) percentage = 95;

    beforeImg.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  }

  // Mouse Events
  handle.addEventListener('mousedown', (e) => {
    isDragging = true;
    e.preventDefault();
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientX);
  });

  // Touch Events
  handle.addEventListener('touchstart', (e) => {
    isDragging = true;
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || !e.touches[0]) return;
    updateSliderPosition(e.touches[0].clientX);
  }, { passive: true });

  // Direct container click
  container.addEventListener('click', (e) => {
    updateSliderPosition(e.clientX);
  });
});
