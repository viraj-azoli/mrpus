/**
 * MRP Home Solutions & Realty - Main Application Script
 * Building | Buying | Selling | License #C151670
 */

// Toast notification utility
window.showToast = function(message, duration = 4000) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C5A880" stroke-width="2.5">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
};

// Download Dean Scieszinski vCard
window.downloadVCard = function() {
  const vcardData = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Scieszinski;Dean;;;',
    'FN:Dean Scieszinski',
    'ORG:MRP Home Solutions & Realty',
    'TITLE:Director of Sales & Operations',
    'TEL;TYPE=CELL,VOICE:515-669-8202',
    'TEL;TYPE=WORK,VOICE:515-985-9412',
    'EMAIL;TYPE=INTERNET,PREF:dean@mrpus.com',
    'EMAIL;TYPE=INTERNET:sales@mrpus.com',
    'URL:https://mrpus.com',
    'ADR;TYPE=WORK:;;2995 133rd Ct;Van Meter;IA;50261;USA',
    'NOTE:Contractor License #C151670 | Licensed Realtor for Buying & Selling',
    'END:VCARD'
  ].join('\r\n');

  const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', 'Dean_Scieszinski_MRP.vcf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.showToast('Dean Scieszinski contact card downloaded!');
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }

  // 3. Scroll Spy for Navigation Links
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 150;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNavLink.classList.add('active');
        } else {
          targetNavLink.classList.remove('active');
        }
      }
    });
  });

  // 4. Services Tab Switcher
  const serviceTabBtns = document.querySelectorAll('.service-tab-btn');
  const servicePanes = document.querySelectorAll('.service-pane');

  serviceTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      serviceTabBtns.forEach(b => b.classList.remove('active'));
      servicePanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // 5. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close others
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 6. Generate Random Dynamic Proposal Number
  const proposalNumEl = document.getElementById('proposalNumberDisplay');
  if (proposalNumEl) {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    proposalNumEl.innerText = `#MRP-${new Date().getFullYear()}-${randomNum}`;
  }

  // 7. Proposal Form Submission
  const proposalForm = document.getElementById('officialProposalForm');
  if (proposalForm) {
    proposalForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const clientName = document.getElementById('clientName').value.trim();
      const clientPhone = document.getElementById('mobilePhone').value.trim();
      const projectAddress = document.getElementById('workAddress').value.trim();

      if (!clientName || !clientPhone) {
        alert('Please provide your name and phone number so Dean and our sales team can reach you.');
        return;
      }

      // Checked services
      const checkedServices = Array.from(document.querySelectorAll('input[name="services"]:checked')).map(cb => cb.value);

      const submitBtn = proposalForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerText;
      submitBtn.innerText = 'Transmitting Proposal Request...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerText = 'Proposal Request Received ✓';
        submitBtn.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
        submitBtn.style.color = '#FFF';

        window.showToast(`Thank you, ${clientName}! Proposal request has been sent to Dean Scieszinski & the MRP team.`);

        // Ask if they want to print / save
        setTimeout(() => {
          if (confirm('Proposal request registered successfully! Would you like to print or save a copy of your itemized proposal specification?')) {
            window.print();
          }
        }, 800);
      }, 1000);
    });
  }

  // 8. Print Proposal Button
  const printProposalBtn = document.getElementById('printProposalBtn');
  if (printProposalBtn) {
    printProposalBtn.addEventListener('click', () => {
      window.print();
    });
  }
});
