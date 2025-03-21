//---------Modern och tillgänglig JavaScript----------

document.addEventListener("DOMContentLoaded", function () {
	// Initialisera huvudfunktioner
	initializeHeaderScrollEffect();
	initializeAnnouncement();
	initializeInteractiveImages();
	initializeExpandableContent();
	initializeFormValidation();
	initializeMobileMenu();
	initializeBackToTopButton();
	initializeAnimations();
	initializeLazyLoading();
	initializeSearchForm(); // Added search form initialization
});

/**
 * Lägger till scrolleffekt för header
 */
function initializeHeaderScrollEffect() {
	const header = document.querySelector("header");
	if (!header) return;

	let lastScrollPosition = 0;

	window.addEventListener("scroll", () => {
		const currentScrollPosition = window.scrollY;

		if (currentScrollPosition > 50) {
			header.classList.add("header-scrolled");
		} else {
			header.classList.remove("header-scrolled");
		}

		lastScrollPosition = currentScrollPosition;
	});
}

/**
 * Initialize search form functionality
 */
function initializeSearchForm() {
	const searchForm = document.querySelector(".search-container form");
	if (searchForm) {
		// Remove any existing event listeners to prevent duplication
		const newSearchForm = searchForm.cloneNode(true);
		searchForm.parentNode.replaceChild(newSearchForm, searchForm);

		newSearchForm.addEventListener("submit", function (event) {
			event.preventDefault(); // Prevent default form submission

			const searchInput = this.querySelector('input[type="text"]');
			const searchTerm = searchInput.value.trim();

			if (searchTerm) {
				// Replace console.log with a notification pattern
				try {
					// For development only, remove in production
					if (process.env.NODE_ENV !== "production") {
						console.log("Searching for:", searchTerm);
					}
					alert("You searched for: " + searchTerm);
					searchInput.value = "";
				} catch (error) {
					// Silent error handling for production
				}
			}
		});
	}
}

/**
 * Hanterar annonsmeddelande
 */
function initializeAnnouncement() {
	const announcement = document.getElementById("announcement");
	const closeButton = document.querySelector(".close-button");

	if (!announcement || !closeButton) return;

	setTimeout(() => {
		announcement.classList.add("visible");
		announceToScreenReader("Ett nytt erbjudande finns tillgängligt");
	}, 1500);

	closeButton.addEventListener("click", () => closeAnnouncement(announcement));
	closeButton.addEventListener("keydown", (e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			closeAnnouncement(announcement);
		}
	});

	if (localStorage.getItem("announcementClosed") === "true") {
		announcement.style.display = "none";
	}
}

/**
 * Stänger annonsen med animation
 */
function closeAnnouncement(announcement) {
	announcement.classList.add("closing");

	setTimeout(() => {
		announcement.style.display = "none";
		localStorage.setItem("announcementClosed", "true");
		announceToScreenReader("Meddelandet har stängts");
	}, 300);
}

/**
 * Hanterar interaktiva bilder med modern UX
 */
function initializeInteractiveImages() {
	const articleImages = document.querySelectorAll(".image-container img");

	articleImages.forEach((img) => {
		img.setAttribute("tabindex", "0");
		img.setAttribute("role", "button");
		img.setAttribute("aria-label", `Visa mer information om ${img.alt}`);

		const handleImageInteraction = () => handleImageClick(img);

		img.addEventListener("click", handleImageInteraction);
		img.addEventListener("keydown", (e) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				handleImageInteraction();
			}
		});
	});
}

/**
 * Modern bildinteraktion med option för lightbox
 */
function handleImageClick(img) {
	try {
		const imageTitle = img.alt;
		const imageSrc = img.src;

		showModal({
			title: imageTitle,
			image: imageSrc,
			content: `Här skulle mer detaljerad information om "${imageTitle}" visas.`,
		});
	} catch (error) {
		// Silent error handling
	}
}

/**
 * Enkel modal-implementation
 */
function showModal(options = {}) {
	// Ta bort eventuellt befintlig modal
	const existingModal = document.getElementById("image-modal");
	if (existingModal) {
		existingModal.remove();
	}

	const modal = document.createElement("div");
	modal.id = "image-modal";
	modal.className = "modal";
	modal.setAttribute("role", "dialog");
	modal.setAttribute("aria-modal", "true");
	modal.setAttribute("aria-labelledby", "modal-title");

	modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3 id="modal-title">${options.title || "Information"}</h3>
        <button class="modal-close" aria-label="Stäng">&times;</button>
      </div>
      <div class="modal-body">
        ${
					options.image
						? `<img src="${options.image}" alt="${options.title}" class="modal-image">`
						: ""
				}
        <p>${options.content || ""}</p>
      </div>
      <div class="modal-footer">
        <button class="modal-ok">OK</button>
      </div>
    </div>
  `;

	document.body.appendChild(modal);

	const style = document.createElement("style");
	style.textContent = `
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1500;
      opacity: 0;
      transition: opacity 0.3s;
    }
    .modal.show {
      opacity: 1;
    }
    .modal-content {
      background: white;
      border-radius: 8px;
      max-width: 90%;
      width: 500px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 15px 30px rgba(0,0,0,0.2);
      transform: translateY(20px);
      transition: transform 0.3s;
    }
    .modal.show .modal-content {
      transform: translateY(0);
    }
    .modal-header {
      padding: 1rem;
      border-bottom: 1px solid #e9ecef;
      display: flex;
      justify-content: space-between;
    }
    .modal-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
    }
    .modal-body {
      padding: 1rem;
    }
    .modal-footer {
      padding: 1rem;
      border-top: 1px solid #e9ecef;
      text-align: right;
    }
    .modal-ok {
      background: #007bff;
      border: none;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }
    .modal-ok:hover {
      background: #0056b3;
    }
  `;
	document.head.appendChild(style);

	setTimeout(() => {
		modal.classList.add("show");
	}, 10);

	const closeModal = () => {
		modal.classList.remove("show");
		setTimeout(() => {
			modal.remove();
		}, 300);
	};

	modal.querySelector(".modal-close").addEventListener("click", closeModal);
	modal.querySelector(".modal-ok").addEventListener("click", closeModal);
	modal.addEventListener("click", (e) => {
		if (e.target === modal) {
			closeModal();
		}
	});
}

/**
 * Hanterar expanderbart innehåll
 */
function initializeExpandableContent() {
	const expandButtons = document.querySelectorAll(".view-more");

	expandButtons.forEach((button) => {
		if (!button) return;

		const content = button.nextElementSibling;
		if (!content || !content.classList.contains("expanded-content")) return;

		content.hidden = true;
		button.setAttribute("aria-expanded", "false");

		button.addEventListener("click", () => {
			const expanded = button.getAttribute("aria-expanded") === "true";
			button.setAttribute("aria-expanded", !expanded);
			content.hidden = expanded;

			const buttonText = expanded ? "Visa mer information" : "Dölj information";
			button.innerHTML =
				buttonText + '<span class="visually-hidden"> om nyårsfirandet</span>';

			announceToScreenReader(expanded ? "Innehåll dolt" : "Mer innehåll visas");
		});
	});
}

/**
 * Hanterar formulärvalidering
 */
function initializeFormValidation() {
	const forms = document.querySelectorAll("form");

	forms.forEach((form) => {
		if (form.closest(".search-container")) return;

		form.addEventListener("submit", (e) => {
			e.preventDefault();

			const requiredFields = form.querySelectorAll('[aria-required="true"]');
			let hasError = false;

			requiredFields.forEach((field) => {
				if (!field.value.trim()) {
					hasError = true;
					showFieldError(field);
				} else {
					clearFieldError(field);
				}
			});

			if (!hasError) {
				announceToScreenReader("Formuläret har skickats");
				showFormSuccess(form);
			}
		});
	});
}

/**
 * Visar ett felmeddelande för ett fält
 */
function showFieldError(field) {
	clearFieldError(field);

	const errorId = `error-${
		field.id || Math.random().toString(36).substring(2, 9)
	}`;
	const errorMessage = document.createElement("div");
	errorMessage.id = errorId;
	errorMessage.className = "field-error";
	errorMessage.textContent = "Detta fält är obligatoriskt";

	field.setAttribute("aria-invalid", "true");
	field.setAttribute("aria-describedby", errorId);

	field.parentNode.insertBefore(errorMessage, field.nextSibling);

	field.focus();
}

/**
 * Rensar felmeddelande för ett fält
 */
function clearFieldError(field) {
	field.removeAttribute("aria-invalid");

	const errorId = field.getAttribute("aria-describedby");
	if (errorId) {
		const errorElement = document.getElementById(errorId);
		if (errorElement) {
			errorElement.remove();
		}
		field.removeAttribute("aria-describedby");
	}
}

/**
 * Visar en bekräftelse på att formuläret har skickats
 */
function showFormSuccess(form) {
	const successMessage = document.createElement("div");
	successMessage.className = "form-success";
	successMessage.setAttribute("role", "alert");
	successMessage.textContent = "Tack! Din information har tagits emot.";

	form.insertAdjacentElement("beforeend", successMessage);
	form.reset();

	setTimeout(() => {
		successMessage.remove();
	}, 5000);
}

/**
 * Meddelar skärmläsare om viktiga händelser
 */
function announceToScreenReader(message) {
	let announcer = document.getElementById("sr-announcer");

	if (!announcer) {
		announcer = document.createElement("div");
		announcer.id = "sr-announcer";
		announcer.setAttribute("role", "status");
		announcer.setAttribute("aria-live", "polite");
		announcer.className = "visually-hidden";
		document.body.appendChild(announcer);
	}

	announcer.textContent = message;

	setTimeout(() => {
		announcer.textContent = "";
	}, 3000);
}

/**
 * Hanterar "Tillbaka till toppen"-knappen
 */
function initializeBackToTopButton() {
	const backToTop = document.querySelector(".back-to-top");

	if (!backToTop) return;

	const showBackToTop = () => {
		if (window.scrollY > 300) {
			backToTop.classList.add("visible");
		} else {
			backToTop.classList.remove("visible");
		}
	};

	showBackToTop();

	window.addEventListener("scroll", showBackToTop);

	backToTop.addEventListener("click", (e) => {
		e.preventDefault();
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	});
}

/**
 * Initialiserar mobilmenyn
 */
function initializeMobileMenu() {
	const menuToggle = document.querySelector(".menu-toggle");
	const navigation = document.getElementById("navigation");

	if (!menuToggle || !navigation) return;

	menuToggle.addEventListener("click", () => {
		const expanded = menuToggle.getAttribute("aria-expanded") === "true";
		menuToggle.setAttribute("aria-expanded", !expanded);
		navigation.classList.toggle("expanded");

		const bars = menuToggle.querySelectorAll(".menu-toggle-bar");
		if (bars.length >= 3) {
			if (!expanded) {
				bars[0].style.transform = "rotate(45deg) translate(5px, 5px)";
				bars[1].style.opacity = "0";
				bars[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
			} else {
				bars[0].style.transform = "none";
				bars[1].style.opacity = "1";
				bars[2].style.transform = "none";
			}
		}
	});

	const navLinks = navigation.querySelectorAll("a");
	navLinks.forEach((link) => {
		link.addEventListener("click", () => {
			if (window.innerWidth <= 768) {
				menuToggle.setAttribute("aria-expanded", "false");
				navigation.classList.remove("expanded");

				const bars = menuToggle.querySelectorAll(".menu-toggle-bar");
				if (bars.length >= 3) {
					bars[0].style.transform = "none";
					bars[1].style.opacity = "1";
					bars[2].style.transform = "none";
				}
			}
		});
	});
}

/**
 * Lägger till animationer för element när de kommer in i vyport
 */
function initializeAnimations() {
	const animateOnScroll = () => {
		const elements = document.querySelectorAll(
			".article, .newsletter-card, .footer-content > div"
		);
		const triggerBottom = window.innerHeight * 0.8;

		elements.forEach((element) => {
			const elementTop = element.getBoundingClientRect().top;

			if (elementTop < triggerBottom) {
				element.style.opacity = "1";
				element.style.transform = "translateY(0)";
			} else {
				element.style.opacity = "0";
				element.style.transform = "translateY(20px)";
			}
		});
	};

	document
		.querySelectorAll(".article, .newsletter-card, .footer-content > div")
		.forEach((element) => {
			element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
			element.style.opacity = "0";
			element.style.transform = "translateY(20px)";
		});

	window.addEventListener("scroll", animateOnScroll);

	animateOnScroll();
}

/**
 * Implementerar lazy loading för bilder
 */
function initializeLazyLoading() {
	// Kontrollera om browsern redan stödjer lazy loading
	if ("loading" in HTMLImageElement.prototype) {
		return;
	}

	const lazyImages = document.querySelectorAll('img[loading="lazy"]');

	const lazyLoad = (image) => {
		if (image.dataset.src) {
			image.src = image.dataset.src;
			image.removeAttribute("data-src");
		}
	};

	if ("IntersectionObserver" in window) {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					lazyLoad(entry.target);
					observer.unobserve(entry.target);
				}
			});
		});

		lazyImages.forEach((image) => {
			observer.observe(image);
		});
	} else {
		const lazyLoadFallback = () => {
			lazyImages.forEach((image) => {
				if (image.getBoundingClientRect().top < window.innerHeight) {
					lazyLoad(image);
				}
			});
		};

		window.addEventListener("scroll", lazyLoadFallback);
		window.addEventListener("resize", lazyLoadFallback);
		window.addEventListener("orientationchange", lazyLoadFallback);
		lazyLoadFallback();
	}
}
