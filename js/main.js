// ====== Форма футера ======
const form = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

form?.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();

    // Проверка имени (только буквы)
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
    successMessage?.classList.add('show');

    // Очистка формы
    form.reset();

    // Скрыть сообщение через 3 секунды
    setTimeout(() => {
        successMessage?.classList.remove('show');
    }, 3000);
});


// ====== Карусель ======
const prevBtn = document.querySelector('.carousel_button.prev');
const nextBtn = document.querySelector('.carousel_button.next');
const track = document.querySelector('.procedure_track');
const wrapper = document.querySelector('.procedure_track_wrapper');
const articles = Array.from(track.children);
const dots = document.querySelectorAll('.dot');
const carousel = wrapper; // для свайпа

let currentIndex = 0;

// Дублируем элементы для бесконечной прокрутки
track.append(...articles.map(article => article.cloneNode(true)));
track.prepend(...articles.map(article => article.cloneNode(true)));

// Обновление активной точки
function updateDots(index) {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index % dots.length].classList.add('active');
}

// Обновление карусели
function updateCarousel() {
    const articleWidth = articles[0].offsetWidth + 16;
    track.style.transition = 'transform 0.5s ease';
    track.style.transform = `translateX(${-articleWidth * (currentIndex + articles.length)}px)`;
    updateDots(currentIndex);
}

// Кнопки ПК
prevBtn?.addEventListener('click', () => {
    currentIndex--;
    updateCarousel();
});

nextBtn?.addEventListener('click', () => {
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

// Бесконечный цикл
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

// Мобильный скролл (свайп)
wrapper?.addEventListener('scroll', () => {
    const scrollLeft = wrapper.scrollLeft;
    const articleWidth = articles[0].offsetWidth + 16;
    const newIndex = Math.round(scrollLeft / articleWidth);

    if (newIndex !== currentIndex) {
        currentIndex = newIndex;
        updateDots(currentIndex);
    }
});

// Свайп мышью и сенсор
let isDown = false;
let startX;
let scrollStart;

carousel?.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollStart = carousel.scrollLeft;
});
carousel?.addEventListener('mouseleave', () => isDown = false);
carousel?.addEventListener('mouseup', () => isDown = false);
carousel?.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    carousel.scrollLeft = scrollStart - (x - startX) * 2;
});
carousel?.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX - carousel.offsetLeft;
    scrollStart = carousel.scrollLeft;
});
carousel?.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX - carousel.offsetLeft;
    carousel.scrollLeft = scrollStart - (x - startX) * 2;
});

// Инициализация карусели
updateCarousel();


// ====== Бургер ======
document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".burger");
    const menu = document.querySelector(".header_menu");

    burger?.addEventListener("click", () => {
        burger.classList.toggle("active");
        menu?.classList.toggle("active");
    });

    // Модалка
    const callBtn = document.getElementById("call-btn");
    const modal = document.getElementById("call-modal");
    const modalClose = document.getElementById("modal-close");

    callBtn?.addEventListener("click", () => modal?.classList.remove("is-hidden"));
    modalClose?.addEventListener("click", () => modal?.classList.add("is-hidden"));

    modal?.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.add("is-hidden");
    });
});


// ====== Кнопка ВВЕРХ ======
document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    scrollToTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
