/* ============================================
   LUMINA DENTISTRY — Main Application JS
   ============================================ */

// getSupabase() is now provided by supabase-config.js

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initAppointmentForm();
});

/* ---- NAVBAR SCROLL + HAMBURGER ---- */
function initNavbar() {
  const nav = document.querySelector('.navbar');
  const hamburger = document.querySelector('.nav-hamburger');
  const links = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    nav && nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  hamburger && hamburger.addEventListener('click', () => {
    links && links.classList.toggle('open');
  });

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => links && links.classList.remove('open'));
  });
}

/* ---- INTERSECTION OBSERVER SCROLL REVEAL ---- */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
}

/* ---- APPOINTMENT FORM ---- */
function initAppointmentForm() {
  const form = document.getElementById('appointmentForm');
  if (!form) return;

  // Set min date to today
  const dateInput = form.querySelector('#apptDate');
  if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Submitting...';

    const data = {
      patient_name: form.querySelector('#apptName').value,
      patient_email: form.querySelector('#apptEmail').value,
      patient_phone: form.querySelector('#apptPhone').value,
      service: form.querySelector('#apptService').value,
      appointment_date: form.querySelector('#apptDate').value,
      appointment_time: form.querySelector('#apptTime').value,
      message: form.querySelector('#apptMessage')?.value || '',
    };

    try {
      const client = getSupabase();
      if (!client) throw new Error('Supabase not loaded');
      const { error } = await client.from('appointments').insert([data]);
      if (error) throw error;

      // Show success
      form.style.display = 'none';
      const success = document.querySelector('.form-success');
      if (success) success.classList.add('show');
    } catch (err) {
      console.error('Appointment error:', err);
      alert('Something went wrong. Please try again or call us directly.');
    } finally {
      btn.disabled = false;
      btn.textContent = originalText;
    }
  });
}
