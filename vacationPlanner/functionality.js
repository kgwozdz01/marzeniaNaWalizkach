document.addEventListener('DOMContentLoaded', () => {
    
    // Zmienne globalne
    const mainSurvey = document.getElementById('mainSurvey');
    const submitBtn = document.getElementById('submitBtn');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwptRZeksdHbm2m677_1TbeuR7ZnJ2MlATrEcyeJ-34BJO4vaNddgDbhRIc6t26mRUZ/exec';

    // 1. ANIMACJA POJAWIANIA I ZNIKANIA (Reveal/Hide)
    // Obserwator sprawdza, czy element jest w widoku. Jeśli nie - zabiera klasę active (zanikanie).
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); // Pojawia się
            } else {
                entry.target.classList.remove('active'); // Znika przy przewijaniu dalej
            }
        });
    }, { threshold: 0.1 }); // Reakcja przy 10% widoczności

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
            isDown = true;
            slider.classList.add('dragging');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('dragging');
        });
        slider.addEventListener('mouseleave', () => isDown = false);
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
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

    // 5. FORM SUBMIT
    if (mainSurvey) {
        mainSurvey.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(mainSurvey);
            const destinations = formData.getAll('destinations');

            if (destinations.length === 0) {
                alert("Proszę wybrać kierunek!");
                return;
            }

            submitBtn.textContent = "Wysyłanie...";
            submitBtn.disabled = true;

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
            }).then(() => {
                submitBtn.textContent = "Wysłano!";
                submitBtn.classList.add('btnSuccess');
                mainSurvey.reset();
                if (durationDisplay) durationDisplay.textContent = "7";
            }).catch(() => {
                submitBtn.textContent = "Błąd wysyłki";
                submitBtn.disabled = false;
            });
        });
    }
});