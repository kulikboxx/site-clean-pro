import { getScrollbarWidth } from './getScrollbarWidth';

export default class Lightbox {
    constructor(gallerySelector) {
        this.gallery = document.querySelector(gallerySelector);
        this.index = 0;

        this.setEvents = this.setEvents.bind(this);
        this.touchStart = this.touchStart.bind(this);
        this.touchMove = this.touchMove.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
    }

    renderLightbox() {
        this.lightboxModal = document.createElement('div');
        this.lightboxModal.classList.add('lightbox-modal');
        this.lightboxModal.innerHTML = ` 
            <div class="lightbox-modal__dialog">
                <img src=""/>
                <div class="lightbox-modal__buttons">
                    <button class="lightbox-modal__prev">
                        <i class="fas fa-chevron-circle-left"></i>
                    </button>
                    <button class="lightbox-modal__next">
                        <i class="fas fa-chevron-circle-right"></i>
                    </button>
                </div>
            </div>
        `;
        document.body.append(this.lightboxModal);
    }

    getVisibleImages() {
        this.visibleImages = [...this.gallery.children].filter((img) => getComputedStyle(img).display !== 'none');
    }

    openLightbox(e) {
        this.lightboxModal.classList.add('show');
        document.body.style.paddingRight = getScrollbarWidth() + 'px';
        document.body.style.overflow = 'hidden';

        this.getVisibleImages();
        this.index = this.visibleImages.indexOf(e.target);

        this.flipImage();
    }

    flipImage(n = 0) {
        const image = this.lightboxModal.querySelector('img');
        this.index += n;

        if (this.index < 0) {
            this.index = this.visibleImages.length - 1;
        }

        if (this.index > this.visibleImages.length - 1) {
            this.index = 0;
        }

        image.src = this.visibleImages[this.index].firstElementChild.src;
    }

    touchStart(e) {
        this.lightboxModal.addEventListener('touchmove', this.touchMove);
        this.lightboxModal.addEventListener('touchend', this.touchEnd);

        if (e.target !== this.prev || e.target !== this.next) {
            this.x1 = e.touches[0].clientX;
        }
    }

    touchMove(e) {
        if (e.target !== this.prev || e.target !== this.next) {
            this.x2 = e.changedTouches[0].clientX;
        }
    }

    touchEnd() {
        let res = (this.x2 - this.x1) / 100;

        if (!isNaN(res) && res < -0.4) {
            this.flipImage(1);
        }

        if (!isNaN(res) && res > 0.4) {
            this.flipImage(-1);
        }

        this.lightboxModal.removeEventListener('touchmove', this.touchMove);
        this.lightboxModal.removeEventListener('touchend', this.touchEnd);
    }

    setEvents() {
        try {
            this.prev = this.lightboxModal.querySelector('.lightbox-modal__prev');
            this.next = this.lightboxModal.querySelector('.lightbox-modal__next');

            this.gallery.addEventListener('click', (e) => {
                if (e.target.matches('img') || e.target.closest('div').classList.contains('portfolio-section__item')) {
                    this.openLightbox(e);
                }
            });

            this.lightboxModal.addEventListener('click', (e) => {
                if (e.target === this.lightboxModal) {
                    this.lightboxModal.classList.remove('show');
                    document.body.style.overflow = '';
                    document.body.style.paddingRight = '0px';
                    this.index = 0;
                }
            });

            this.prev.addEventListener('click', (e) => {
                if (e.target === this.prev || e.target === this.prev.firstElementChild) {
                    this.flipImage(-1);
                }
            });

            this.next.addEventListener('click', (e) => {
                if (e.target === this.next || e.target === this.next.firstElementChild) {
                    this.flipImage(1);
                }
            });

            this.lightboxModal.addEventListener('touchstart', this.touchStart);

            document.addEventListener('keydown', (e) => {
                if (this.lightboxModal.classList.contains('show')) {
                    if (e.key === 'ArrowLeft') {
                        this.flipImage(-1);
                    }

                    if (e.key === 'ArrowRight') {
                        this.flipImage(1);
                    }
                }
            });
        } catch (e) {}
    }

    init() {
        this.renderLightbox();
        this.setEvents();
    }
}
