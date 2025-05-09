window.addEventListener('DOMContentLoaded', () => {
  const dateDOM = document.querySelector('#date');
  const date = new Date().getFullYear();

  dateDOM.textContent = date;

  const tabList = document.querySelector('[role="tablist"]');
  const tabs = tabList.querySelectorAll(':scope > [role="tab"]');

  tabs.forEach((tab) => {
    tab.addEventListener('click', changeTabs);
  });

  let tabFocus = 0;

  tabList.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      tabs[tabFocus].setAttribute('tabindex', -1);
      if (e.key === 'ArrowRight') {
        tabFocus++;

        if (tabFocus >= tabs.length) {
          tabFocus = 0;
        }
      } else if (e.key === 'ArrowLeft') {
        tabFocus--;

        if (tabFocus < 0) {
          tabFocus = tabs.length - 1;
        }
      }

      tabs[tabFocus].setAttribute('tabindex', 0);
      tabs[tabFocus].focus();
    }
  });
});

function changeTabs(e) {
  const targetTab = e.target;
  const tabList = targetTab.parentNode;
  const tabGroup = tabList.parentNode;

  tabList
    .querySelectorAll(':scope > [aria-selected="true"]')
    .forEach((t) => t.setAttribute('aria-selected', false));

  targetTab.setAttribute('aria-selected', true);

  tabGroup
    .querySelectorAll(':scope > [role="tabpanel"]')
    .forEach((p) => p.setAttribute('hidden', true));

  tabGroup
    .querySelector(`#${targetTab.getAttribute('aria-controls')}`)
    .removeAttribute('hidden');
}

const peopleCount = document.getElementById('people-count');
const peopleInput = document.getElementById('people');
const minusButton = document.querySelector('.counter-button.minus');
const plusButton = document.querySelector('.counter-button.plus');

let count = 4;

minusButton.addEventListener('click', () => {
  if (count > 1) {
    count--;
    updatePeopleCount();
  }
});

plusButton.addEventListener('click', () => {
  if (count < 20) {
    count++;
    updatePeopleCount();
  }
});

function updatePeopleCount() {
  peopleCount.textContent = `${count} ${count === 1 ? 'person' : 'people'}`;
  peopleInput.value = count;
}

const form = document.getElementById('reservation-form');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  let isValid = true;

  const name = document.getElementById('name');
  const nameError = document.getElementById('name-error');
  if (!name.value.trim()) {
    nameError.textContent = 'This field is required';
    name.classList.add('error');
    isValid = false;
  } else {
    nameError.textContent = '';
    name.classList.remove('error');
  }

  const email = document.getElementById('email');
  const emailError = document.getElementById('email-error');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim()) {
    emailError.textContent = 'This field is required';
    email.classList.add('error');
    isValid = false;
  } else if (!emailRegex.test(email.value)) {
    emailError.textContent = 'Please provide a valid email address';
    email.classList.add('error');
    isValid = false;
  } else {
    emailError.textContent = '';
    email.classList.remove('error');
  }

  const day = document.getElementById('day');
  const month = document.getElementById('month');
  const year = document.getElementById('year');
  const dateError = document.getElementById('date-error');

  if (!day.value || !month.value || !year.value) {
    dateError.textContent = 'This field is incomplete';
    isValid = false;
  } else {
    dateError.textContent = '';
  }

  const hour = document.getElementById('hour');
  const minute = document.getElementById('minute');
  const timeError = document.getElementById('time-error');

  if (!hour.value || !minute.value) {
    timeError.textContent = 'This field is incomplete';
    isValid = false;
  } else {
    timeError.textContent = '';
  }

  if (isValid) {
    alert(
      'Your reservation has been confirmed. We look forward to seeing you!'
    );
    form.reset();
    count = 4;
    updatePeopleCount();
  }
});

document.getElementById('date').textContent = new Date().getFullYear();
