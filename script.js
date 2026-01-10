// Minimal script placeholder (theme toggle removed)
document.addEventListener('DOMContentLoaded', ()=>{
  // No dynamic JS required currently. Keep file for future enhancements.
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

const form = document.getElementById('contact-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const submitBtn = form.querySelector('button');
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      form.reset();
      submitBtn.textContent = 'Sent ✓';
    } else {
      submitBtn.textContent = 'Error';
    }
  } catch (err) {
    submitBtn.textContent = 'Failed';
  }

  setTimeout(() => {
    submitBtn.textContent = 'Send email';
    submitBtn.disabled = false;
  }, 2500);
});

const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalTech = document.getElementById("modalTech");
const modalLink = document.getElementById("modalLink");
const closeBtn = document.getElementById("closeModal");

document.querySelectorAll(".project-card.clickable").forEach(card => {
    card.addEventListener("click", () => {
        modalTitle.textContent = card.dataset.title;
        modalDesc.textContent = card.dataset.desc;
        modalLink.href = card.dataset.link;

        modalTech.innerHTML = "";
        card.dataset.tech.split(",").forEach(t => {
            const span = document.createElement("span");
            span.className = "tech";
            span.textContent = t.trim();
            modalTech.appendChild(span);
        });

        modal.classList.add("active");
    });
});

closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
});

modal.addEventListener("click", e => {
    if(e.target === modal){
        modal.classList.remove("active");
    }
});