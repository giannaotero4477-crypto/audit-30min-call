console.log("Landing page loaded");

document.addEventListener("DOMContentLoaded", () => {
	const form = document.querySelector("form.card");
	if (!form) {
		return;
	}

	const nameInput = form.querySelector("input[name='name']");
	const emailInput = form.querySelector("input[name='email']");
	const urlInput = form.querySelector("input[name='website']");
	const messageEl = form.nextElementSibling;

	const showMessage = (text) => {
		if (!messageEl) {
			return;
		}
		messageEl.textContent = text;
	};

	const isValidName = (value) => value.trim().length >= 2;

	const isValidEmail = (value) => {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailPattern.test(value.trim());
	};

	const isValidUrl = (value) => {
		try {
			const parsed = new URL(value.trim());
			return parsed.protocol === "http:" || parsed.protocol === "https:";
		} catch (error) {
			return false;
		}
	};

	const validateForm = () => {
		if (!nameInput || !emailInput || !urlInput) {
			return "Please complete all required fields.";
		}

		if (!isValidName(nameInput.value)) {
			return "Please enter your name.";
		}

		if (!isValidEmail(emailInput.value)) {
			return "Please enter a valid email address.";
		}

		if (!isValidUrl(urlInput.value)) {
			return "Please enter a valid website URL.";
		}

		return "";
	};

	form.addEventListener("submit", (event) => {
		const errorMessage = validateForm();
		if (errorMessage) {
			event.preventDefault();
			showMessage(errorMessage);
			return;
		}

		showMessage("");
	});

	[nameInput, emailInput, urlInput].forEach((input) => {
		if (!input) {
			return;
		}
		input.addEventListener("input", () => {
			const errorMessage = validateForm();
			showMessage(errorMessage);
		});
	});
});
