function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
function isValidUrl(url) {
  try {
    const u = new URL(url.trim());
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("leadForm");
  const status = document.getElementById("status");
  const actions = document.getElementById("actions");

  const nameEl = document.getElementById("name");
  const emailEl = document.getElementById("email");
  const urlEl = document.getElementById("url");

  const payBtn = document.getElementById("payBtn");
  const bookBtn = document.getElementById("bookBtn");

  // Replace these with your real links
  const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/YOUR_LINK";
  const CALENDLY_LINK = "https://calendly.com/YOUR_HANDLE/audit-call";

  payBtn.href = STRIPE_PAYMENT_LINK;
  bookBtn.href = CALENDLY_LINK;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const url = urlEl.value.trim();

    if (!name) { status.textContent = "Add your name."; actions.classList.add("hidden"); return; }
    if (!isValidEmail(email)) { status.textContent = "Use a real email."; actions.classList.add("hidden"); return; }
    if (!isValidUrl(url)) { status.textContent = "Use a full URL starting with https://"; actions.classList.add("hidden"); return; }

    status.textContent = "Valid. Pay first, then book.";
    actions.classList.remove("hidden");
    actions.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
