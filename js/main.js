

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