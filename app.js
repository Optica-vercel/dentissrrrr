/* ============================================
   LUMINA DENTISTRY — Optimized Application JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initBookingForm();
});

/* ---- NAVBAR SCROLL + HAMBURGER ---- */
function initNavbar() {
  const nav = document.getElementById('navbar');
  const hamburger = document.querySelector('.nav-hamburger');
  const links = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }
  });

  hamburger && hamburger.addEventListener('click', () => {
    const isOpen = links && links.classList.toggle('open');
    // Toggle icon
    const icon = hamburger.querySelector('i');
    if (icon) {
      icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    }
  });

  // Close menu on link click and reset icon
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      if (links) links.classList.remove('open');
      const icon = hamburger.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-bars';
    });
  });
}

/* ---- INTERSECTION OBSERVER SCROLL REVEAL ---- */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!els.length) return;
  
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  
  els.forEach(el => obs.observe(el));
}

/* ---- SIMPLIFIED BOOKING FORM (LEAD CAPTURE) ---- */
function initBookingForm() {
  const form = document.getElementById('appointmentForm');
  const successDiv = document.getElementById('formSuccess');
  
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const btn = form.querySelector('.form-submit');
    const btnText = btn.querySelector('.btn-text');
    const btnLoading = btn.querySelector('.btn-loading');
    
    // Toggle loading state
    btn.disabled = true;
    if (btnText) btnText.style.display = 'none';
    if (btnLoading) btnLoading.style.display = 'inline-block';

    const data = {
      patient_name: document.getElementById('apptName').value,
      patient_phone: document.getElementById('apptPhone').value,
      service: document.getElementById('apptService').value,
      // For the lead-capture flow, we omit date/time and email
      // We'll set defaults for the DB columns that are NOT NULL
      patient_email: 'pending@lumina.com', // Placeholder for DB constraint
      appointment_date: new Date().toISOString().split('T')[0], // Placeholder
      appointment_time: '00:00:00', // Placeholder
      status: 'pending',
      message: 'Lead capture from new simplified form.'
    };

    try {
      // getSupabase() is provided by supabase-config.js
      const client = getSupabase();
      if (!client) throw new Error('Supabase client not initialized');

      const { error } = await client
        .from('appointments')
        .insert([data]);

      if (error) throw error;

      // Show success state
      form.style.display = 'none';
      if (successDiv) {
        successDiv.style.display = 'flex';
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

    } catch (err) {
      console.error('Booking error:', err);
      alert('We encountered an error. Please try again or call us directly at (555) LUMINA.');
    } finally {
      // Reset button state
      btn.disabled = false;
      if (btnText) btnText.style.display = 'inline-block';
      if (btnLoading) btnLoading.style.display = 'none';
    }
  });
}