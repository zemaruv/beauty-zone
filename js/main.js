// ==================== BURGER MENU ====================
const burger = document.querySelector('.burger');
const headerMenu = document.querySelector('.header_menu');
const menuBackdrop = document.createElement('div');
menuBackdrop.classList.add('menu_backdrop');
document.body.appendChild(menuBackdrop);

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    headerMenu.classList.toggle('active');
    menuBackdrop.classList.toggle('active');
});

// Закрытие меню при клике на фон
menuBackdrop.addEventListener('click', () => {
    burger.classList.remove('active');
    headerMenu.classList.remove('active');
    menuBackdrop.classList.remove('active');
});

// ==================== MODAL ====================
const modal = document.getElementById('call-modal');
const openModalBtn = document.getElementById('call-btn');
const closeModalBtn = document.getElementById('modal-close');

function openModal() {
    modal.classList.remove('is-hidden');
}
function closeModal() {
    modal.classList.add('is-hidden');
}

openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);

// Закрытие при клике на фон
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// Закрытие по нажатию Esc
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && !modal.classList.contains('is-hidden')) {
        closeModal();
    }
});
// ====== Карусель ======
const prevBtn = document.querySelector('.carousel_button.prev');
const nextBtn = document.querySelector('.carousel_button.next');
const track = document.querySelector('.procedure_track');
const wrapper = document.querySelector('.procedure_track_wrapper');
let articles = Array.from(track.children);
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;

// Дублируем элементы для бесконечной прокрутки
track.append(...articles.map(article => article.cloneNode(true)));
track.prepend(...articles.map(article => article.cloneNode(true)));

articles = Array.from(track.children); 

const articleWidth = articles[0].offsetWidth + 16; 
track.style.transform = `translateX(${-articleWidth * articles.length / 3}px)`; 

// Обновление активной точки
function updateDots(index) {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index % dots.length].classList.add('active');
}

// Обновление карусели
function updateCarousel() {
    track.style.transition = 'transform 0.5s ease';
    track.style.transform = `translateX(${-articleWidth * (currentIndex + articles.length / 3)}px)`;
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
    track.style.transition = 'none';
    if (currentIndex < 0) {
        currentIndex = dots.length - 1;
        track.style.transform = `translateX(${-articleWidth * (currentIndex + articles.length / 3)}px)`;
    }
    if (currentIndex >= dots.length) {
        currentIndex = 0;
        track.style.transform = `translateX(${-articleWidth * (currentIndex + articles.length / 3)}px)`;
    }
});


// ==================== SCROLL TO TOP ====================
const scrollBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollBtn.classList.add('show');
    } else {
        scrollBtn.classList.remove('show');
    }
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== FORM SUBMISSION ====================
const form = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    successMessage.classList.add('show');
    setTimeout(() => successMessage.classList.remove('show'), 3000);
    form.reset();
});
