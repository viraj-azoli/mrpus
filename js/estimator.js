/**
 * MRP Home Solutions & Realty - Interactive Project Estimator
 * Calculates estimated investments, lead times, and integrates with Proposal Form
 */

document.addEventListener('DOMContentLoaded', () => {
  const scopeInputs = document.querySelectorAll('input[name="est_scope"]');
  const sizeSlider = document.getElementById('estSqft');
  const sizeDisplay = document.getElementById('estSqftVal');
  const tierInputs = document.querySelectorAll('input[name="est_tier"]');
  const realtyInputs = document.querySelectorAll('input[name="est_realty"]');

  const outputPrice = document.getElementById('estPriceRange');
  const outputTimeline = document.getElementById('estTimeline');
  const outputScopeList = document.getElementById('estScopeList');
  const applyBtn = document.getElementById('applyEstimateToForm');

  if (!sizeSlider) return;

  function calculateEstimate() {
    const selectedScope = document.querySelector('input[name="est_scope"]:checked')?.value || 'full_estate';
    const sqft = parseInt(sizeSlider.value, 10);
    const selectedTier = document.querySelector('input[name="est_tier"]:checked')?.value || 'bespoke';
    const hasRealty = document.querySelector('input[name="est_realty"]:checked')?.value === 'bundle_realty';

    if (sizeDisplay) {
      sizeDisplay.innerText = `${sqft.toLocaleString()} sq ft`;
    }

    let baseRatePerSqft = 65; // default
    let minWeeks = 4;
    let maxWeeks = 8;
    let recommendedServices = [];

    switch (selectedScope) {
      case 'full_estate':
        baseRatePerSqft = selectedTier === 'bespoke' ? 110 : 80;
        minWeeks = Math.round(sqft / 400);
        maxWeeks = minWeeks + 6;
        recommendedServices = [
          'Architectural Roofing & Gutters',
          'Premium Siding & Window Upgrades',
          'Full Chef Kitchen & Luxury Bathrooms',
          'Custom Carpentry & Hardwood Flooring',
          'Complete Interior & Exterior Painting'
        ];
        break;

      case 'exterior_roof':
        baseRatePerSqft = selectedTier === 'bespoke' ? 42 : 30;
        minWeeks = 2;
        maxWeeks = 4;
        recommendedServices = [
          'Architectural Shingle / Flat Roof System',
          'Engineered Siding & Stone Accents',
          'Seamless Aluminum Gutters & Guards',
          'Custom Energy-Efficient Windows'
        ];
        break;

      case 'interior_remodel':
        baseRatePerSqft = selectedTier === 'bespoke' ? 75 : 55;
        minWeeks = Math.round(sqft / 600);
        maxWeeks = minWeeks + 4;
        recommendedServices = [
          'Master Spa Bathroom Retreat',
          'Custom Cabinetry & Quartz Countertops',
          'Structural Build-Outs & Wall Openings',
          'Designer Flooring & Fine Carpentry'
        ];
        break;

      case 'pre_listing_prep':
        baseRatePerSqft = selectedTier === 'bespoke' ? 24 : 16;
        minWeeks = 1;
        maxWeeks = 3;
        recommendedServices = [
          'Turnkey Home Inspection Item Remediation',
          'Roof & Exterior Seal / Tune-up',
          'Interior Touch-up Paint & Flooring Prep',
          'Curb Appeal & Pre-Sale Value Optimization'
        ];
        break;
    }

    let calculatedTotal = sqft * baseRatePerSqft;

    // Real Estate Bundling Incentive: Preferred partner package
    if (hasRealty) {
      calculatedTotal = calculatedTotal * 0.92; // 8% bundled loyalty savings
    }

    const lowRange = Math.round((calculatedTotal * 0.88) / 1000) * 1000;
    const highRange = Math.round((calculatedTotal * 1.15) / 1000) * 1000;

    if (outputPrice) {
      outputPrice.innerText = `$${lowRange.toLocaleString()} - $${highRange.toLocaleString()}`;
    }

    if (outputTimeline) {
      outputTimeline.innerText = `${minWeeks} - ${maxWeeks} Weeks`;
    }

    if (outputScopeList) {
      outputScopeList.innerHTML = recommendedServices
        .map(item => `<li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> ${item}</li>`)
        .join('');
    }
  }

  // Event Listeners
  sizeSlider.addEventListener('input', calculateEstimate);
  scopeInputs.forEach(i => i.addEventListener('change', calculateEstimate));
  tierInputs.forEach(i => i.addEventListener('change', calculateEstimate));
  realtyInputs.forEach(i => i.addEventListener('change', calculateEstimate));

  calculateEstimate();

  // Apply to Proposal Form
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      const selectedScope = document.querySelector('input[name="est_scope"]:checked')?.value || 'full_estate';
      const sqft = sizeSlider.value;
      const descField = document.getElementById('projectDescription');
      const formEl = document.getElementById('proposalFormSection');

      // Check relevant boxes in the proposal form
      const checkboxMapping = {
        full_estate: ['roofing', 'siding', 'gutters', 'windows', 'buildouts', 'bathrooms', 'flooring', 'painting'],
        exterior_roof: ['roofing', 'siding', 'gutters', 'windows', 'decks'],
        interior_remodel: ['buildouts', 'carpentry', 'bathrooms', 'flooring', 'painting', 'carpet'],
        pre_listing_prep: ['inspection', 'painting', 'roofing', 'realestate_selling']
      };

      const keysToEnable = checkboxMapping[selectedScope] || [];
      keysToEnable.forEach(key => {
        const cb = document.querySelector(`input[name="services"][value="${key}"]`);
        if (cb) cb.checked = true;
      });

      if (descField) {
        descField.value = `Estimated Project Scope (${selectedScope.replace('_', ' ').toUpperCase()}): Approx ${sqft} sq ft residence. Please prepare an itemized proposal including material specifications and proposed lead times.`;
      }

      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth' });
      }

      // Show toast
      if (window.showToast) {
        window.showToast('Calculator scope transferred to Proposal Form!');
      }
    });
  }
});
