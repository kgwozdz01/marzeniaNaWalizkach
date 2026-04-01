document.addEventListener('DOMContentLoaded', () => {
    
    const mainSurvey = document.getElementById('mainSurvey');
    const submitBtn = document.getElementById('submitBtn');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwptRZeksdHbm2m677_1TbeuR7ZnJ2MlATrEcyeJ-34BJO4vaNddgDbhRIc6t26mRUZ/exec';

    // 1. ANIMACJA POJAWIANIA I ZNIKANIA
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 2. HOME ALERT & SCROLL
    const homeLink = document.querySelector('a[href="#home"]');
    const somethingElse = document.getElementById('somethingElse');
    if (homeLink) {
        homeLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            somethingElse?.classList.remove('hidden');
            setTimeout(() => somethingElse?.classList.add('hidden'), 3000);
        });
    }

    // 3. KARUZELA (Drag handling)
    const slider = document.getElementById('carouselViewport');
    let isDown = false, startX, scrollLeft;

    if (slider) {
        slider.addEventListener('mousedown', (e) => {
            isDown = true; slider.classList.add('dragging');
            startX = e.pageX - slider.offsetLeft; scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseup', () => { isDown = false; slider.classList.remove('dragging'); });
        slider.addEventListener('mouseleave', () => isDown = false);
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            slider.scrollLeft = scrollLeft - (x - startX) * 2;
        });
    }

    // 4. LICZNIK DNI
    const durationInput = document.getElementById('durationRange');
    const durationDisplay = document.getElementById('durationValue');
    if (durationInput && durationDisplay) {
        durationInput.addEventListener('input', () => {
            durationDisplay.textContent = durationInput.value;
        });
    }

    // 5. FORM SUBMIT & VALIDATION
    if (mainSurvey) {
        // Resetowanie błędu przy zmianie checkboxa
        const checkboxes = mainSurvey.querySelectorAll('input[name="destinations"]');
        checkboxes.forEach(cb => {
            cb.addEventListener('change', () => {
                checkboxes[0].setCustomValidity(""); // Czyść błąd na pierwszym elemencie
            });
        });

        mainSurvey.addEventListener('submit', (e) => {
            const formData = new FormData(mainSurvey);
            const destinations = formData.getAll('destinations');
            const firstCheckbox = checkboxes[0];

            // Walidacja wyboru destynacji (taki sam dymek jak email)
            if (destinations.length === 0) {
                e.preventDefault();
                firstCheckbox.setCustomValidity("Wybierz przynajmniej jeden kierunek!");
                firstCheckbox.reportValidity();
                return;
            } else {
                firstCheckbox.setCustomValidity("");
            }

            // Jeśli walidacja przeszła - wysyłamy
            e.preventDefault();
            submitBtn.textContent = "Wysłano!";
            submitBtn.disabled = true; // Blokada do przeładowania strony
            submitBtn.style.background = "#bdc3c7"; // Wizualne potwierdzenie zablokowania
            submitBtn.style.cursor = "not-allowed";

            fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify({
                    userEmail: formData.get('userEmail'),
                    destinations: destinations,
                    travelersCount: formData.get('travelersCount'),
                    durationRange: formData.get('durationRange'),
                    budgetRange: formData.get('budgetRange')
                })
            }).catch(() => {
                console.log("Błąd wysyłki, ale przycisk zostaje 'Wysłano' zgodnie z instrukcją.");
            });
        });
    }
});