// Czekamy, aż cała struktura HTML zostanie załadowana przez przeglądarkę
document.addEventListener('DOMContentLoaded', () => {
    
    // Pobieramy najważniejsze elementy z HTML do zmiennych
    const mainSurvey = document.getElementById('mainSurvey');
    const submitBtn = document.getElementById('submitBtn');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwptRZeksdHbm2m677_1TbeuR7ZnJ2MlATrEcyeJ-34BJO4vaNddgDbhRIc6t26mRUZ/exec';

    // --- 1. OBSŁUGA ANIMACJI POJAWIANIA SIĘ (SCROLL REVEAL) ---
    // Tworzymy obserwatora, który sprawdza czy sekcje są widoczne
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Jeśli sekcja wejdzie w 15% pola widzenia, dodaj klasę 'active'
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 }); // Próg czułości: 15% widoczności

    // Znajdź wszystkie elementy z klasą 'reveal' i każ obserwatorowi je śledzić
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // --- 2. LOGIKA PRZYCISKU HOME ---
    const homeLink = document.querySelector('a[href="#home"]');
    const somethingElse = document.getElementById('somethingElse');

    if (homeLink) {
        homeLink.addEventListener('click', (e) => {
            e.preventDefault(); // Zapobiegamy domyślnemu skokowi
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Płynne przewinięcie na górę
            
            // Pokaż powiadomienie 'somethingElse'
            if (somethingElse) {
                somethingElse.classList.remove('hidden');
                // Ukryj je automatycznie po 3 sekundach
                setTimeout(() => somethingElse.classList.add('hidden'), 3000);
            }
        });
    }

    // --- 3. PRZECIĄGANIE KARUZELI MYSZKĄ (DRAG TO SCROLL) ---
    const slider = document.getElementById('carouselViewport');
    let isDown = false; // Czy przycisk myszy jest wciśnięty
    let startX;      // Pozycja początkowa myszy
    let scrollLeft;  // Początkowe przesunięcie suwaka

    if (slider) {
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active'); // Zmiana kursoru na łapkę
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseleave', () => isDown = false);
        slider.addEventListener('mouseup', () => isDown = false);
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return; // Jeśli nie trzymasz myszy, nic nie rób
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // Mnożnik 2 przyspiesza przewijanie
            slider.scrollLeft = scrollLeft - walk;
        });
    }

    // --- 4. DYNAMICZNY LICZNIK DNI ---
    const durationInput = document.getElementById('durationRange');
    const durationDisplay = document.getElementById('durationValue');
    if (durationInput && durationDisplay) {
        durationInput.addEventListener('input', () => {
            // Przypisz wartość suwaka do tekstu w span
            durationDisplay.textContent = durationInput.value;
        });
    }

    // --- 5. WYSYŁKA FORMULARZA DO GOOGLE SHEETS ---
    if (mainSurvey) {
        mainSurvey.addEventListener('submit', (e) => {
            e.preventDefault(); // Zablokuj odświeżenie strony po kliknięciu wyślij

            const formData = new FormData(mainSurvey);
            const destinations = formData.getAll('destinations');

            // Walidacja: czy wybrano przynajmniej jeden kierunek
            if (destinations.length === 0) {
                alert("Wybierz przynajmniej jeden kierunek!");
                return;
            }

            // Przygotuj paczkę danych do wysłania
            const data = {
                userEmail: formData.get('userEmail'),
                destinations: destinations,
                travelersCount: formData.get('travelersCount'),
                durationRange: formData.get('durationRange'),
                budgetRange: formData.get('budgetRange')
            };

            // Zmień stan przycisku na 'Wysyłanie' i zablokuj go
            submitBtn.textContent = "Wysyłanie...";
            submitBtn.disabled = true;

            // Wyślij dane do Twojego skryptu Google
            fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors', // Specyficzne dla Google Apps Script
                cache: 'no-cache',
                body: JSON.stringify(data)
            })
            .then(() => {
                // Sukces: Zmień napis na przycisku na stałe
                submitBtn.textContent = "Wysłano!";
                submitBtn.classList.add('btnSuccess');
                submitBtn.disabled = true; 
                mainSurvey.reset(); // Wyczyść pola formularza
                if (durationDisplay) durationDisplay.textContent = "7"; // Zresetuj licznik dni
            })
            .catch(err => {
                // Obsługa błędu połączenia
                console.error('Błąd:', err);
                submitBtn.textContent = "Błąd! Spróbuj ponownie";
                submitBtn.disabled = false;
            });
        });
    }
});