//Form of footer


const form = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();

    // Проверка имени (только буквы, украинские и латинские)
    const nameRegex = /^[a-zA-Zа-яА-ЯёЁіїІЇєЄґҐ\s'-]+$/u;
    if (!nameRegex.test(name)) {
        alert("Будь ласка, введіть правильне ім'я (тільки букви).");
        return;
    }

    // Проверка телефона (только цифры)
    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(phone)) {
        alert("Будь ласка, введіть правильний номер телефону (тільки цифри).");
        return;
    }

    // Проверка email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Будь ласка, введіть правильну електронну пошту.");
        return;
    }

    // Если всё ок, показываем сообщение
    successMessage.classList.add('show');

    // Можно очистить форму
    form.reset();

    // Скрыть сообщение через 3 секунды
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 3000);
});



//Carousel

const prevBtn = document.querySelector('.carousel_button.prev');
const nextBtn = document.querySelector('.carousel_button.next');
const track = document.querySelector('.procedure_track');
const articles = Array.from(track.children);
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;

// Дублируем первые и последние элементы для бесконечной прокрутки
track.append(...articles.map(article => article.cloneNode(true)));
track.prepend(...articles.map(article => article.cloneNode(true)));

function updateCarousel() {
    const articleWidth = articles[0].offsetWidth + 16; // ширина + gap
    track.style.transition = 'transform 0.5s ease';
    track.style.transform = `translateX(${-articleWidth * (currentIndex + articles.length)}px)`;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex % dots.length].classList.add('active');
}

// Листаем назад
prevBtn.addEventListener('click', () => {
    currentIndex--;
    updateCarousel();
});

// Листаем вперед
nextBtn.addEventListener('click', () => {
    currentIndex++;
    updateCarousel();
});

// Навигация по точкам
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
    });
});

// Плавный бесконечный цикл
track.addEventListener('transitionend', () => {
    const articleWidth = articles[0].offsetWidth + 16;
    if (currentIndex < 0) {
        currentIndex = articles.length - 1;
        track.style.transition = 'none';
        track.style.transform = `translateX(${-articleWidth * (currentIndex + articles.length)}px)`;
    }
    if (currentIndex >= articles.length) {
        currentIndex = 0;
        track.style.transition = 'none';
        track.style.transform = `translateX(${-articleWidth * (currentIndex + articles.length)}px)`;
    }
});

// Инициализация
updateCarousel();



        // Свайп для мобильных
        let isDown = false;
        let startX;
        let scrollLeft;

        carousel.addEventListener('mousedown', (e) => { isDown = true; startX = e.pageX - carousel.offsetLeft; scrollLeft = carousel.scrollLeft; });
        carousel.addEventListener('mouseleave', () => isDown = false);
        carousel.addEventListener('mouseup', () => isDown = false);
        carousel.addEventListener('mousemove', (e) => { if(!isDown) return; e.preventDefault(); const x = e.pageX - carousel.offsetLeft; carousel.scrollLeft = scrollLeft - (x-startX)*2; });

        carousel.addEventListener('touchstart', (e) => { startX = e.touches[0].pageX - carousel.offsetLeft; scrollLeft = carousel.scrollLeft; });
        carousel.addEventListener('touchmove', (e) => { const x = e.touches[0].pageX - carousel.offsetLeft; carousel.scrollLeft = scrollLeft - (x-startX)*2; });
//Burger

const burger = document.querySelector('.burger');
const menu = document.querySelector('.header_menu');

burger.addEventListener('click', () => {
    menu.classList.toggle('active');
});
