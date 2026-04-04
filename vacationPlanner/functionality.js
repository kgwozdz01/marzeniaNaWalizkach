
document.addEventListener('DOMContentLoaded', () => {
    
    
    const mainSurvey = document.getElementById('mainSurvey');
    const submitBtn = document.getElementById('submitBtn');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwptRZeksdHbm2m677_1TbeuR7ZnJ2MlATrEcyeJ-34BJO4vaNddgDbhRIc6t26mRUZ/exec';

    
    const revealObserver = new IntersectionObserver((entries) => 
    {
        entries.forEach(entry => {
            
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                
                entry.target.classList.remove('active');
            }
        });
    }, { threshold: 0.2 });

    
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    const homeLink = document.querySelector('a[href="#home"]');
    const somethingElse = document.getElementById('somethingElse');
    if (homeLink) {
        homeLink.addEventListener('click', (e) => {
            e.preventDefault(); 
            window.scrollTo({ top: 0, behavior: 'smooth' });
           // somethingElse?.classList.remove('hidden');
           // setTimeout(() => somethingElse?.classList.add('hidden'), 3000);
        });
    }

    
    const slider = document.getElementById('carouselViewport');
    let isDown = false;
    let startX;
    let scrollLeft;

    if (slider) {
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('dragging');
            startX = e.pageX - slider.offsetLeft; // punkt startowy wzgledem suwaka
            scrollLeft = slider.scrollLeft; // gdzie karuzela przed ruchem
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

    
    const durationInput = document.getElementById('durationRange');
    const durationDisplay = document.getElementById('durationValue');
    if (durationInput && durationDisplay) {
        
        durationInput.addEventListener('input', () => {
            durationDisplay.textContent = durationInput.value;
        });
    }

 
    if (mainSurvey) {
        const checkboxes = mainSurvey.querySelectorAll('input[name="destinations"]');
        const firstCheckbox = checkboxes[0];

        
        checkboxes.forEach(cb => {
            cb.addEventListener('change', () => {
                firstCheckbox.setCustomValidity(""); 
            });
        });

        mainSurvey.addEventListener('submit', (e) => {
            const formData = new FormData(mainSurvey); 
            const destinations = formData.getAll('destinations');

            // Walidacja logiczna: czy zaznaczono chociaż jeden checkbox?
            if (destinations.length === 0) {
                e.preventDefault(); 
                // setCustomValidity to systemowa metoda HTML5 do tworzenia własnych komunikatów błędów
                firstCheckbox.setCustomValidity("Wybierz przynajmniej jeden kierunek");
                // reportValidity() wymusza na przeglądarce pokazanie "dymka" z błędem tam, gdzie jest input
                firstCheckbox.reportValidity();
                return; // Przerwij działanie funkcji, nie idź dalej do fetch()
            } else {
                firstCheckbox.setCustomValidity(""); // Jeśli wszystko ok, upewnij się, że błąd jest pusty
            }

            // Etap wysyłki (wykona się tylko jeśli walidacja przeszła)
            e.preventDefault(); // Blokujemy domyślne przeładowanie strony, by wysłać dane w tle (AJAX)
            submitBtn.textContent = "Wysłano!"; // Feedback dla usera
            submitBtn.disabled = true; // Blokada przycisku przed ponownym kliknięciem (anty-spam)
            submitBtn.style.opacity = "0.6"; // Wizualne wyszarzenie przycisku
            submitBtn.style.cursor = "not-allowed"; // Zmiana kursora na zakaz

            // Fetch wysyła dane na Twój URL Google Apps Script
            fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors', // Ważne dla Google Script: wysyłamy bez oczekiwania na odpowiedź zwrotną (unikamy błędów CORS)
                body: JSON.stringify({
                    userEmail: formData.get('userEmail'),
                    destinations: destinations,
                    travelersCount: formData.get('travelersCount'),
                    durationRange: formData.get('durationRange'),
                    budgetRange: formData.get('budgetRange')
                })
            }).catch(err => console.error('Błąd wysyłki:', err)); // Jeśli serwer padnie, logujemy błąd w konsoli (F12)
        });
    }
});