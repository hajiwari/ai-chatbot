// SMTPjs password: 4DB14B34297FC6C2C8101AC99BBC58602F87
const buttonContainer = document.getElementById("buttonContainer");
const emailVerification = document.getElementById("emailVerification");
const logInButton = document.getElementById("logInButton");
const logInFinalButton = document.getElementById("logInFinalButton");
const signUpButton = document.getElementById("signUpButton");
const artificiTitle = document.getElementById("artificiTitle");
const signUpButton2 = document.getElementById("signUpButton2");
const buttonTabContainer1 = document.getElementById("buttonTabContainer1");
const signUpButton21 = document.getElementById("signUpButton21");
const buttonTabContainer11 = document.getElementById("buttonTabContainer11");
const signUpContent = document.getElementById("signUpContent");
const signInContent = document.getElementById("signInContent");
const registrationSecondaryContent = document.getElementById(
	"registrationSecondaryContent"
);
const emaiVerificationDigit = document.getElementById("emaiVerificationDigit");
const imageWrapper = document.querySelector(".image-wrapper");
const imageItems = document.querySelectorAll(".image-wrapper > *");
const imageLength = imageItems.length;
const perView = 1;
const delay = 2000;
let totalScroll = 0;
let autoScroll = setInterval(scrolling, delay);
function clearLogin() {
	document.getElementById("userEmailInput").disabled = false;
	document.getElementById("passwordInputLogin").disabled = false;
	document.getElementById("userEmailInput").value = "";
	document.getElementById("passwordInputLogin").value = "";
}
// FORGOT PASSWORD
const forgotPasswordContent = document.getElementById("forgotPasswordContent");
const forgotPasswordBtn = document.getElementById("forgotPasswordBtn");
const backToLogin = document.getElementById("backToLogIn");
const sendForgotPassword = document.getElementById("sendForgotPassword");
const errorDiv = document.getElementById("errorDiv");
const forgotEmail = document.getElementById("forgotEmail");
document.addEventListener("DOMContentLoaded", function () {
	forgotPasswordBtn.addEventListener("click", showForgotPasswordContent);
	function showForgotPasswordContent() {
		clearLogin();
		document.getElementById("forgotEmail").value = "";
		signInContent.style.display = "none";
		forgotPasswordContent.style.display = "flex";
	}
});

document.addEventListener("DOMContentLoaded", function () {
	backToLogin.addEventListener("click", showSignInContent);
	function showSignInContent() {
		document.getElementById("forgotEmail").value = "";
		signInContent.style.display = "flex";
		forgotPasswordContent.style.display = "none";
	}
});
document.addEventListener("DOMContentLoaded", function () {
	sendForgotPassword.addEventListener("click", sendEmail);
	function sendEmail() {
		if (forgotEmail.value.trim() === "") {
		} else {
			errorDiv.innerHTML = "";
			errorDiv.style.backgroundColor = "transparent";
			errorDiv.style.border = "none";
		}
	}
});

// FETCH AND INJECT FOOTER
document.addEventListener("DOMContentLoaded", function () {
	fetch((href = "{{ url_for('api', filename='templates/chat_page.html') }}"))
		.then((response) => response.text())
		.then((data) => {
			const parser = new DOMParser();
			const doc = parser.parseFromString(data, "text/html");
			const footerContent = doc.querySelector(".footer-container").outerHTML;

			document.getElementById("footerContainer").outerHTML = footerContent;
		});
});

// AUTO ANIMATION TYPE
document.addEventListener("DOMContentLoaded", function () {
	const welcomeMessages = [
		"Hello! ARTIFICI here!",
		"Hi there! It's great to have you!",
		"Welcome! How can I assist you today?",
	];

	let randomMessages = [
		"Yeeeet!",
		"Greetings! I'm here to help.",
		"Feel free to ask me anything.",
	];

	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}

	shuffleArray(randomMessages);

	let currentSentenceIndex = 0;
	let currentCharIndex = 0;

	function type() {
		const typingText = document.getElementById("typingText");
		const currentSentence =
			currentSentenceIndex % 2 === 0
				? welcomeMessages[Math.floor(currentSentenceIndex / 2)]
				: `${randomMessages[Math.floor(currentSentenceIndex / 2)]}`;
		typingText.textContent = currentSentence.slice(0, currentCharIndex);

		if (currentCharIndex < currentSentence.length) {
			currentCharIndex++;
			setTimeout(type, 100); // Adjust the speed by changing the timeout value
		} else {
			setTimeout(erase, 1500);
		}
	}

	function erase() {
		const typingText = document.getElementById("typingText");

		if (currentCharIndex > 0) {
			typingText.textContent =
				currentSentenceIndex % 2 === 0
					? welcomeMessages[Math.floor(currentSentenceIndex / 2)].slice(
						0,
						currentCharIndex - 1
					)
					: `${randomMessages[Math.floor(currentSentenceIndex / 2)]}`.slice(
						0,
						currentCharIndex - 1
					);
			currentCharIndex--;
			setTimeout(erase, 50); // Adjust the speed by changing the timeout value
		} else {
			currentSentenceIndex =
				(currentSentenceIndex + 1) % (welcomeMessages.length * 2);
			setTimeout(type, 500);
		}
	}

	// Start the typing animation
	setTimeout(type, 500);
});

// --- IMAGE SLIDER ---
imageWrapper.style.setProperty("--per-view", perView);
for (let i = 0; i < perView; i++) {
	imageWrapper.insertAdjacentHTML("beforeend", imageItems[i].outerHTML);
}

function scrolling() {
	totalScroll++;
	if (totalScroll == imageLength) {
		clearInterval(autoScroll);
		totalScroll = 0;
		imageWrapper.style.transition = ".2s";
		imageWrapper.style.left = ".2s";
		autoScroll = setInterval(scrolling, delay);
	}
	const widthEl =
		document.querySelector(".image-wrapper > :first-child").offsetWidth + 24;
	imageWrapper.style.left = `-${totalScroll * widthEl}px`;
	imageWrapper.style.transition = ".3s";
}

function togglePassword(event) {
	var passwordInput = event.target.previousElementSibling;
	var toggleIcon = event.target;

	if (passwordInput.type === "password") {
		passwordInput.type = "text";
		toggleIcon.src =
			"https://res.cloudinary.com/dgrbrxs3g/image/upload/v1700864062/assets/vt5co3enophuwi5oeheq.svg";
	} else {
		passwordInput.type = "password";
		toggleIcon.src =
			"https://res.cloudinary.com/dgrbrxs3g/image/upload/v1700864062/assets/cb2ye57stjwvvrnfxi6z.svg";
	}
}

// --- LOG-IN - SIGN-UP BUTTONS ---
document.addEventListener("DOMContentLoaded", function () {
	logInButton.addEventListener("click", showSignInContent);
	buttonTabContainer1.addEventListener("click", showSignInContent);
	buttonContainer.addEventListener("click", showSignInContent);
	signUpButton.addEventListener("click", showSignUpContent);
	signUpButton2.addEventListener("click", showSignUpContent);
	signUpButton21.addEventListener("click", showSignUpContent);
	buttonTabContainer11.addEventListener("click", showSignInContent);
	var clickHereLink = document.getElementById("clickHereLink");
	clickHereLink.addEventListener("click", showSignInContent);
	artificiTitle.addEventListener("click", function () {
		hideAllContent();
		forgotPasswordContent.style.display = "none";
			});
	function showTabContent() {
		hideAllContent();
		buttonTabContainer1.style.borderBottom =
			"3px solid var(--primary-light-artifici)";
		buttonTabContainer1.style.fontWeight = "700";
		buttonTabContainer11.style.borderBottom = "3px solid var(--color-silver)";
		signUpButton2.style.borderBottom = "3px solid var(--color-silver)";
		signUpButton21.style.borderBottom =
			"3px solid var(--primary-light-artifici)";
		signUpButton21.style.fontWeight = "700";
		forgotPasswordContent.style.display = "none";
	}
	function showSignInContent() {
		showTabContent();
		signInContent.style.display = "flex";
		forgotPasswordContent.style.display = "none";
	}
	function showSignUpContent() {
		showTabContent();
		signUpContent.style.display = "flex";
		forgotPasswordContent.style.display = "none";
	}
	function hideAllContent() {
		emailVerification.style.display = "none";
		registrationSecondaryContent.style.display = "none";
				signInContent.style.display = "none";
		signUpContent.style.display = "none";
		forgotPasswordContent.style.display = "none";
	}
});

// --- AUTH 6-DIGIT ---
document.addEventListener("DOMContentLoaded", function () {
	const inputs = document.querySelectorAll(".textbox.digit");

	inputs.forEach(function (input, index) {
		input.addEventListener("input", function () {
			this.value = this.value.replace(/\D/g, "");

			if (this.value.length > 0 && index < inputs.length - 1) {
				inputs[index + 1].focus();
			}

			if (this.value.length > 1) {
				this.value = this.value.slice(0, 1);
			}
		});

		input.addEventListener("keypress", function (e) {
			if (this.value.length === this.maxLength) {
				e.preventDefault();
			}
		});
	});

	inputs.forEach(function (input, index) {
		input.addEventListener("keydown", function (e) {
			if (e.key === "Backspace" && this.value.length === 0 && index > 0) {
				inputs[index - 1].focus();
			}
		});
	});
});

// POP-UP
function setupPopup(popupTriggerId, popupId) {
	const popupTrigger = document.getElementById(popupTriggerId);

	if (popupTrigger) {
		popupTrigger.addEventListener("click", function () {
			var popup = document.getElementById(popupId);

			if (!popup) return;
			var popupStyle = popup.style;
			if (popupStyle) {
				popupStyle.display = "flex";
				popupStyle.zIndex = 100;
				popupStyle.backgroundColor = "rgba(0, 0, 0, .75)";
				popupStyle.alignItems = "center";
				popupStyle.justifyContent = "center";
			}
			popup.setAttribute("closable", "");

			var onClick =
				popup.onClick ||
				function () {
					if (event.target === popup && popup.hasAttribute("closable")) {
						popupStyle.display = "none";
					}
				};
			popup.addEventListener("click", onClick);
		});
	}
}
setupPopup("termsAndConditionsButton", "termsAndConditionPopUp");
setupPopup("researchButton", "researchPopUp");
setupPopup("safetyButton", "safetyPopUp");

// SIGN-IN/UP UI VALIDATION
document.addEventListener("DOMContentLoaded", function () {
	const inputs = document.querySelectorAll(".textbox input");
	inputs.forEach((input) => {
		input.addEventListener("blur", function () {
			validateInput(this);
		});
	});

	function validateInput(input) {
		const parentDiv = input.parentElement;
		parentDiv.classList.remove("invalid");

		// Skip validation
		if (
			input.classList.contains("middle-name") ||
			input.classList.contains("birthday")
		) {
			return;
		}

		if (input.value.trim() === "") {
			parentDiv.classList.add("invalid");
		}
	}

	// Focus on the first input when the page loads
	document.getElementById("fnInput").focus();

	// Required fields and buttons
	const signUpRequiredInputs = document.querySelectorAll(
		".sign-up-field input[required]"
	);
	const signUpButton = document.getElementById("signUpButtonFinal");

	const logInRequiredInputs = document.querySelectorAll(
		".log-in-field input[required]"
	);
	const logInButton = document.getElementById("logInButtonFinal");

	const forgotPasswordRequiredInput = document.querySelectorAll(
		".forgot-password-field input[required]"
	);
	const forgotPassButton = document.getElementById("sendForgotPassword");

	const otpInputs = document.querySelectorAll(
		'.textbox-otp-parent input[type="text"]'
	);
	const verifyButton = document.getElementById("submitOTP");

	function checkRequiredFields(inputs, button) {
		let allFilled = true;
		inputs.forEach((input) => {
			if (input.value.trim() === "") {
				allFilled = false;
			}
		});

		if (allFilled) {
			button.classList.add("active");
			button.removeAttribute("disabled");
			button.disabled = false;
			button.style.cursor = "pointer";
		} else {
			button.classList.remove("active");
			button.setAttribute("disabled", true);
			button.disabled = true;
			button.style.cursor = "not-allowed";
		}
	}

	signUpRequiredInputs.forEach((input) => {
		input.addEventListener("input", function () {
			checkRequiredFields(signUpRequiredInputs, signUpButton);
		});
	});

	logInRequiredInputs.forEach((input) => {
		input.addEventListener("input", function () {
			checkRequiredFields(logInRequiredInputs, logInButton);
		});
	});

	forgotPasswordRequiredInput.forEach((input) => {
		input.addEventListener("input", function () {
			checkRequiredFields(forgotPasswordRequiredInput, forgotPassButton);
		});
	});

	otpInputs.forEach((input) => {
		input.addEventListener("input", function () {
			checkRequiredFields(otpInputs, verifyButton);
		});
	});
	});

// EVENT LISTENER FOR LIGHT/DARK MODE
var footerContainer = document.getElementById("footerContainer");
var headerContainer = document.getElementById("headerContainer");
var logInSignUp = document.getElementById("logInSignUp");
var toggleButton = document.getElementById("lightDarkToggle");

function setThemeMode(isDarkMode) {
	logInSignUp.classList.toggle("dark-mode", isDarkMode);
	headerContainer.classList.toggle("dark-mode-header-footer", isDarkMode);
	footerContainer.classList.toggle("dark-mode-header-footer", isDarkMode);
	toggleButton.textContent = isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode";
}

function saveThemeMode(isDarkMode) {
	localStorage.setItem("darkMode", isDarkMode);
}

document.addEventListener("DOMContentLoaded", function () {
	const savedDarkMode = localStorage.getItem("darkMode");
	if (savedDarkMode !== null) {
		setThemeMode(savedDarkMode === "true");
	}

	toggleButton.addEventListener("click", function () {
		const isDarkMode = !logInSignUp.classList.contains("dark-mode");
		setThemeMode(isDarkMode);
		saveThemeMode(isDarkMode);

		localStorage.setItem("selectedTheme", isDarkMode ? "Dark" : "Light");
	});
});

window.addEventListener("storage", function (event) {
	if (event.key === "selectedTheme" && event.newValue !== null) {
		setThemeMode(event.newValue === "Dark");
	}
});

