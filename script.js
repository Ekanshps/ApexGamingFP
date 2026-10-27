(() => {
  'use strict';
  document.documentElement.classList.add('motion-ready');

  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });
    navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation menu');
    }));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        navLinks.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation menu');
      }
    });
  }

  const form = document.querySelector('#sponsor-form');
  const callbackField = document.querySelector('#callback-field');
  const phoneInput = document.querySelector('#phone');
  const callbackSelect = document.querySelector('#callback-time');
  const phoneRequiredLabel = document.querySelector('#phone-required-label');
  const formIntro = document.querySelector('#form-intro');
  const formSubject = document.querySelector('#form-subject');
  const formType = document.querySelector('#form-type');
  const submitLabel = document.querySelector('#submit-label');
  const submitButton = document.querySelector('#submit-button');
  const formStatus = document.querySelector('#form-status');
  const consent = document.querySelector('#consent');
  const intentButtons = document.querySelectorAll('[data-set-intent]');
  let currentIntent = 'campaign';

  const setIntent = (intent, shouldScroll = false) => {
    currentIntent = intent === 'call' ? 'call' : 'campaign';
    const isCall = currentIntent === 'call';
    intentButtons.forEach((button) => {
      const active = button.dataset.setIntent === currentIntent;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    if (callbackField) callbackField.hidden = !isCall;
    if (phoneInput) phoneInput.required = isCall;
    if (callbackSelect) {
      callbackSelect.required = isCall;
      if (!isCall) callbackSelect.value = '';
    }
    if (phoneRequiredLabel) {
      phoneRequiredLabel.textContent = isCall ? 'Required for callback' : 'Optional';
      phoneRequiredLabel.classList.toggle('required-label', isCall);
    }
    if (formIntro) {
      formIntro.textContent = isCall
        ? 'Share your contact number and a convenient time. We’ll reach out to discuss the opportunity.'
        : 'Share your brief and we’ll follow up by email with next steps.';
    }
    if (formSubject) formSubject.value = isCall
      ? 'Callback request — ApexGaming.fp sponsorship'
      : 'New sponsorship inquiry — ApexGaming.fp';
    if (formType) formType.value = isCall ? 'Request a call' : 'Campaign inquiry';
    if (submitLabel) submitLabel.textContent = isCall ? 'Request a call' : 'Send campaign inquiry';
    if (shouldScroll && form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.setTimeout(() => {
        const firstField = document.querySelector('#brand-name');
        if (firstField) firstField.focus({ preventScroll: true });
      }, 450);
    }
  };

  intentButtons.forEach((button) => button.addEventListener('click', () => setIntent(button.dataset.setIntent)));
  document.querySelectorAll('[data-intent]').forEach((link) => link.addEventListener('click', () => {
    setIntent(link.dataset.intent || 'campaign');
  }));

  const clearErrors = () => {
    document.querySelectorAll('[data-error-for]').forEach((element) => { element.textContent = ''; });
    form?.querySelectorAll('[aria-invalid="true"]').forEach((element) => element.removeAttribute('aria-invalid'));
  };
  const setFieldError = (name, message) => {
    const holder = document.querySelector(`[data-error-for="${CSS.escape(name)}"]`);
    if (holder) holder.textContent = message;
    const input = form?.querySelector(`[name="${CSS.escape(name)}"]`);
    if (input) input.setAttribute('aria-invalid', 'true');
  };
  const showStatus = (message, state) => {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.className = `form-status is-visible ${state === 'success' ? 'is-success' : 'is-error'}`;
  };
  const validateForm = () => {
    clearErrors();
    let valid = true;
    if (!form) return false;
    const requiredFields = [
      ['brand_name', 'Please enter the brand or company name.'],
      ['contact_name', 'Please enter the contact person’s name.'],
      ['email', 'Enter a valid business email address.'],
      ['promotion_type', 'Choose what you want to promote.'],
      ['message', 'Add a little more detail (at least 10 characters).']
    ];
    requiredFields.forEach(([name, message]) => {
      const field = form.elements.namedItem(name);
      if (!field) return;
      const value = String(field.value || '').trim();
      if (!value || (name === 'message' && value.length < 10)) {
        setFieldError(name, message);
        valid = false;
        return;
      }
      if (name === 'email' && !field.validity.valid) {
        setFieldError(name, message);
        valid = false;
      }
    });
    if (currentIntent === 'call') {
      const phone = String(phoneInput?.value || '').trim();
      if (!phone || phone.replace(/\D/g, '').length < 7) {
        setFieldError('phone', 'Add a valid contact number for the callback.');
        valid = false;
      }
      if (!String(callbackSelect?.value || '').trim()) {
        setFieldError('preferred_callback_time', 'Choose a convenient callback window.');
        valid = false;
      }
    }
    if (consent && !consent.checked) {
      setFieldError('contact_consent', 'Please agree so we can respond to this inquiry.');
      valid = false;
    }
    return valid;
  };

  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (formStatus) formStatus.className = 'form-status';
      if (!validateForm()) {
        showStatus('Please check the highlighted fields and try again.', 'error');
        const invalid = form.querySelector('[aria-invalid="true"]');
        if (invalid) invalid.focus({ preventScroll: false });
        return;
      }

      const originalText = submitLabel?.textContent || 'Submit inquiry';
      if (submitButton) submitButton.disabled = true;
      if (submitLabel) submitLabel.textContent = 'Sending securely…';
      const formData = new FormData(form);
      formData.set('form_type', currentIntent === 'call' ? 'Request a call' : 'Campaign inquiry');
      formData.set('_replyto', String(form.elements.namedItem('email')?.value || '').trim());
      formData.set('_subject', currentIntent === 'call'
        ? 'Callback request — ApexGaming.fp sponsorship'
        : 'New sponsorship inquiry — ApexGaming.fp');

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' }
        });
        let result = {};
        try { result = await response.json(); } catch (_) { /* handled by status below */ }
        if (response.ok) {
          form.reset();
          clearErrors();
          setIntent('campaign');
          showStatus('Thanks — your inquiry has been sent. If the campaign looks like a fit, we’ll get back to you using the contact details you shared.', 'success');
          const statusTop = formStatus?.getBoundingClientRect().top;
          if (typeof statusTop === 'number' && statusTop < 0) formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          const apiErrors = Array.isArray(result.errors) ? result.errors.map((item) => item.message).filter(Boolean).join(' ') : '';
          showStatus(apiErrors || 'We couldn’t send that right now. Please try again in a moment or DM @apexgaming.fp on Instagram.', 'error');
        }
      } catch (error) {
        showStatus('Connection issue — your message was not confirmed as sent. Please try again or DM @apexgaming.fp on Instagram.', 'error');
      } finally {
        if (submitButton) submitButton.disabled = false;
        if (currentIntent === 'call') setIntent('call');
        else if (submitLabel) submitLabel.textContent = originalText === 'Request a call' ? 'Send campaign inquiry' : originalText;
      }
    });
    form.querySelectorAll('input, select, textarea').forEach((field) => {
      field.addEventListener('input', () => {
        if (field.hasAttribute('aria-invalid')) field.removeAttribute('aria-invalid');
        const error = document.querySelector(`[data-error-for="${CSS.escape(field.name)}"]`);
        if (error) error.textContent = '';
        if (formStatus?.classList.contains('is-error')) formStatus.className = 'form-status';
      });
      field.addEventListener('change', () => {
        if (field.hasAttribute('aria-invalid')) field.removeAttribute('aria-invalid');
        const error = document.querySelector(`[data-error-for="${CSS.escape(field.name)}"]`);
        if (error) error.textContent = '';
      });
    });
  }

  const year = document.querySelector('#current-year');
  if (year) year.textContent = new Date().getFullYear();

  const revealElements = document.querySelectorAll('.reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -26px 0px' });
    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  }

  const mobileCta = document.querySelector('.mobile-sticky-cta');
  if (mobileCta) {
    const updateMobileCta = () => {
      const shouldShow = window.innerWidth <= 560 && window.scrollY > 520 && window.scrollY < document.documentElement.scrollHeight - window.innerHeight - 450;
      mobileCta.classList.toggle('is-shown', shouldShow);
    };
    window.addEventListener('scroll', updateMobileCta, { passive: true });
    window.addEventListener('resize', updateMobileCta);
    updateMobileCta();
  }

})();
