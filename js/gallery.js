/**
 * MRP Home Solutions & Realty - Houzz-Style Luxury Portfolio & Lightbox
 */

document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.portfolio-card');
  const lightbox = document.getElementById('portfolioLightbox');
  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxClose = document.getElementById('lightboxClose');

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Open Lightbox
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('.portfolio-img');
      const title = card.querySelector('.portfolio-card-title')?.innerText || '';
      const category = card.querySelector('.portfolio-card-category')?.innerText || '';
      const details = card.querySelector('.portfolio-card-details')?.innerText || '';

      if (lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = title;
        if (lightboxTitle) lightboxTitle.innerText = title;
        if (lightboxDesc) lightboxDesc.innerText = `${category} • ${details}`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close Lightbox
  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
});
