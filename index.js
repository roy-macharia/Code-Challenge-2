const form = document.getElementById('guest-form');
const input = document.getElementById('guest-name');
const guestList = document.getElementById('guest-list');
const categorySelect = document.getElementById('guest-category');

let guestCount = 0;
const maxGuests = 10;

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = input.value.trim();
  const category = categorySelect.value;

  if (!name) return;

  if (guestCount >= maxGuests) {
    alert("Guest limit reached (10 people).");
    return;
  }

  const li = document.createElement('li');
  li.innerHTML = `
    <span>
      ${name}
      <span class="tag ${category}">${category}</span>
      <span class="timestamp">${new Date().toLocaleTimeString()}</span>
    </span>
    <div>
      <button class="toggle">RSVP</button>
      <button class="edit">Edit</button>
      <button class="remove">Remove</button>
    </div>
  `;
  guestList.appendChild(li);
  guestCount++;

  input.value = '';
});

// Event delegation for remove, toggle, and edit
guestList.addEventListener('click', function (e) {
  const target = e.target;
  const li = target.closest('li');

  if (target.classList.contains('remove')) {
    li.remove();
    guestCount--;
  }

  if (target.classList.contains('toggle')) {
    const span = li.querySelector('span');
    if (span.classList.contains('attending')) {
      span.classList.remove('attending');
      target.textContent = 'RSVP';
    } else {
      span.classList.add('attending');
      target.textContent = 'Not Attending';
    }
  }

  if (target.classList.contains('edit')) {
    const nameSpan = li.querySelector('span').childNodes[0];
    const newName = prompt("Edit guest name:", nameSpan.nodeValue.trim());
    if (newName) {
      nameSpan.nodeValue = newName + ' ';
    }
  }
});