/**
 * MVVM Architecture & Interactive Logic for Qeema Website
 * -----------------------------------------------------------
 * - Model: Defines stats metrics, targets, and duration.
 * - ViewModel: Handles cubic easing math, counter animations, and form validation.
 * - ViewBinder: Observes viewport, binds data attributes to DOM, and handles interactive forms.
 */

// ============================================================================
// 1. MODEL
// ============================================================================
class StatsModel {
  constructor() {
    this.targets = {
      c0: 120, // +120 عميل
      c1: 600, // +600 تقرير شهري
      c2: 40,  // +40 مشروع استشاري
      c3: 6    // +6 دول خليجية نخدمها
    };
    this.duration = 1800; // ms
  }
}

// ============================================================================
// 2. VIEWMODEL
// ============================================================================
class StatsViewModel {
  constructor(model) {
    this.model = model;
    this.listeners = [];
    this.values = { c0: 0, c1: 0, c2: 0, c3: 0 };
    this.hasAnimated = false;
  }

  subscribe(listener) {
    this.listeners.push(listener);
    listener(this.values);
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this.values);
    }
  }

  // Cubic Ease-Out: e = 1 - (1 - p)^3
  calculateEasedValues(p) {
    const e = 1 - Math.pow(1 - p, 3);
    return {
      c0: Math.round(this.model.targets.c0 * e),
      c1: Math.round(this.model.targets.c1 * e),
      c2: Math.round(this.model.targets.c2 * e),
      c3: Math.round(this.model.targets.c3 * e)
    };
  }

  startAnimation() {
    if (this.hasAnimated) return;
    this.hasAnimated = true;

    const startTime = performance.now();

    const frame = (now) => {
      const elapsed = now - startTime;
      const p = Math.min(1, elapsed / this.model.duration);
      this.values = this.calculateEasedValues(p);
      this.notify();

      if (p < 1) {
        requestAnimationFrame(frame);
      }
    };

    requestAnimationFrame(frame);
  }
}

// ============================================================================
// 3. VIEW BINDER (DOM & Event Binding)
// ============================================================================
class ViewBinder {
  static bindStats(viewModel) {
    const boundElements = {
      c0: document.querySelectorAll('[data-bind="c0"]'),
      c1: document.querySelectorAll('[data-bind="c1"]'),
      c2: document.querySelectorAll('[data-bind="c2"]'),
      c3: document.querySelectorAll('[data-bind="c3"]')
    };

    // If no stat elements on this page, return early
    if (boundElements.c0.length === 0 && boundElements.c1.length === 0) {
      return;
    }

    viewModel.subscribe((values) => {
      for (const [key, elements] of Object.entries(boundElements)) {
        elements.forEach((el) => {
          el.textContent = values[key];
        });
      }
    });

    const statsBanner = document.querySelector('.stats-banner');
    if (statsBanner && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            viewModel.startAnimation();
            observer.disconnect();
          }
        });
      }, { threshold: 0.15 });

      observer.observe(statsBanner);
    } else {
      viewModel.startAnimation();
    }
  }

  static bindForms() {
    // 1. Hero Trial Form
    const trialForm = document.querySelector('#trial-form');
    if (trialForm) {
      trialForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = trialForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          const originalText = submitBtn.textContent;
          submitBtn.textContent = 'تم إرسال طلبك بنجاح ✓';
          submitBtn.disabled = true;
          submitBtn.style.backgroundColor = '#0A6B4E';

          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.backgroundColor = '';
            trialForm.reset();
          }, 3000);
        }
      });
    }

    // 2. Contact Form
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          const originalText = submitBtn.textContent;
          submitBtn.textContent = 'تم إرسال رسالتك بنجاح ✓';
          submitBtn.disabled = true;
          submitBtn.style.backgroundColor = '#0A6B4E';

          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.backgroundColor = '';
            contactForm.reset();
          }, 4000);
        }
      });
    }

    // 3. Careers Form
    const careersForm = document.querySelector('#careers-form');
    if (careersForm) {
      careersForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = careersForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          const originalText = submitBtn.textContent;
          submitBtn.textContent = 'تم استلام طلب التوظيف بنجاح ✓';
          submitBtn.disabled = true;
          submitBtn.style.backgroundColor = '#0A6B4E';

          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.backgroundColor = '';
            careersForm.reset();
          }, 3500);
        }
      });
    }
  }

  static highlightActiveNav() {
    const currentPath = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';
    const cleanCurrent = currentPath.replace(/\.html$/, '');

    const navLinks = document.querySelectorAll('.nl, .mnav-pill');
    navLinks.forEach((link) => {
      const linkHref = (link.getAttribute('href') || '').toLowerCase().replace(/\.html$/, '').replace(/^#/, '');
      if (linkHref === cleanCurrent || (linkHref === 'index' && (cleanCurrent === '' || cleanCurrent === 'index'))) {
        link.classList.add('active');
      } else if (cleanCurrent !== linkHref) {
        link.classList.remove('active');
      }
    });
  }
}

// ============================================================================
// 4. INTERACTIVE CALCULATOR & AUDIT HANDLERS
// ============================================================================
function updateCalculator() {
  const salaryInput = document.getElementById('input-salary');
  const otherInput = document.getElementById('input-other');
  const packageInput = document.getElementById('input-package');

  if (!salaryInput || !otherInput || !packageInput) return;

  const salary = parseFloat(salaryInput.value) || 5000;
  const other = parseFloat(otherInput.value) || 1500;
  const packageVal = parseFloat(packageInput.value) || 1500;

  const totalInternal = salary + other;
  const monthlySavings = Math.max(0, totalInternal - packageVal);
  const annualSavings = monthlySavings * 12;
  const percent = totalInternal > 0 ? Math.round((monthlySavings / totalInternal) * 100) : 0;

  document.getElementById('salary-val').textContent = salary.toLocaleString('ar-SA') + ' ريال';
  document.getElementById('other-val').textContent = other.toLocaleString('ar-SA') + ' ريال';
  document.getElementById('package-val').textContent = packageVal.toLocaleString('ar-SA') + ' ريال';

  document.getElementById('monthly-savings').textContent = monthlySavings.toLocaleString('ar-SA') + ' ريال';
  document.getElementById('annual-savings').textContent = annualSavings.toLocaleString('ar-SA') + ' ريال';
  document.getElementById('savings-percent').textContent = percent + '%';
}

function handleAuditSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  let yesCount = 0;
  let totalCount = 0;

  for (const [key, value] of formData.entries()) {
    totalCount++;
    if (value === 'yes') yesCount++;
  }

  const scorePercent = totalCount > 0 ? Math.round((yesCount / totalCount) * 100) : 0;
  let statusText = '';
  let statusColor = '#0F9D74';

  if (scorePercent >= 80) {
    statusText = 'ممتاز! دفاتركم في حالة جيدة جداً وتحتاج فقط إلى ضبط دوري للتقارير.';
    statusColor = '#0F9D74';
  } else if (scorePercent >= 50) {
    statusText = 'متوسط: هناك بعض الثغرات المحاسبية في التسويات أو الإقفال تحتاج لمراجعة فورية لتجنب غرامات الزكاة.';
    statusColor = '#FFB800';
  } else {
    statusText = 'تنبيه عالي: دفاتركم تواجه مخاطر مالية وتأخر في الرقابة، ننصح بحجز استشارة سريعة مع فريقنا المالي.';
    statusColor = '#D9534F';
  }

  let resultBox = document.getElementById('audit-result-box');
  if (!resultBox) {
    resultBox = document.createElement('div');
    resultBox.id = 'audit-result-box';
    resultBox.style.marginTop = '24px';
    resultBox.style.padding = '24px';
    resultBox.style.borderRadius = '16px';
    resultBox.style.textAlign = 'center';
    resultBox.style.border = '2px solid ' + statusColor;
    resultBox.style.backgroundColor = '#FAFAF6';
    form.appendChild(resultBox);
  }

  resultBox.innerHTML = `
    <div style="font-size: 14px; font-weight: 700; color: #5C7168;">درجة الجاهزية والانضباط المالي</div>
    <div style="font-size: 42px; font-weight: 800; color: ${statusColor}; margin: 8px 0;">${scorePercent}%</div>
    <p style="font-size: 16px; line-height: 1.8; color: #0C2A22; max-width: 600px; margin: 0 auto 18px;">${statusText}</p>
    <a href="contact.html" class="btn-primary" style="display: inline-block;">احجز استشارة مجانية لمناقشة النتيجة ←</a>
  `;
}

// ============================================================================
// 5. APPLICATION INITIALIZATION
// ============================================================================
if (typeof window !== 'undefined') {
  window.updateCalculator = updateCalculator;
  window.handleAuditSubmit = handleAuditSubmit;
  window.QeemaApp = {
    StatsModel,
    StatsViewModel,
    ViewBinder,
    init: () => {
      const model = new StatsModel();
      const viewModel = new StatsViewModel(model);
      ViewBinder.bindStats(viewModel);
      ViewBinder.bindForms();
      ViewBinder.highlightActiveNav();
      if (document.getElementById('input-salary')) {
        updateCalculator();
      }
    }
  };
}
