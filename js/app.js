"use strict";

const initSliders = () => {
    const sliders = document.querySelectorAll('[data-slider]');

    if (!sliders) return;

    sliders.forEach(slider => {
        const typeOfSlider = slider.dataset.slider
        let sliderSwiper = slider.querySelector('.swiper');

        const sliderOptions = {
            speed: 1000,
            grabCursor: true,
            loop: true,
            spaceBetween: 24,
            navigation: {
                prevEl: '[data-slider-prev]',
                nextEl: '[data-slider-next]',
            }
        }

        const sliderObjectsOptions = {
            speed: 1000,
            grabCursor: true,
            loop: true,
            slidesPerView: 2,
            spaceBetween: 24,
            navigation: {
                prevEl: '[data-slider-prev]',
                nextEl: '[data-slider-next]',
            },
            autoplay: {
                deplay: 2000
            },
            breakpoints: {
                300: {
                    slidesPerView: 1,
                },
                576: {
                    slidesPerView: 2
                },
                992: {
                    slidesPerView: 3,
                },
                1200: {
                    slidesPerView: 2,
                },
                2000: {
                    slidesPerView: 3,
                }
            }
        }

        const sliderGalleryOptions = {
            slidesPerView: 3,
            speed: 1000,
            grabCursor: true,
            loop: true,
            spaceBetween: 24,
            navigation: {
                prevEl: '[data-slider-prev]',
                nextEl: '[data-slider-next]',
            },
            pagination: {
                el: '[data-pagination]',
                clickable: true,
                dynamicBullets: true,
                type: 'bullets'
            },
            breakpoints: {
                300: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                }
            }
        }

        switch (typeOfSlider) {
            case "gallery": {
                sliderSwiper = new Swiper(sliderSwiper, sliderGalleryOptions);
            }
            case 'objects': {
                sliderSwiper = new Swiper(sliderSwiper, sliderObjectsOptions);
            }
            default: {
                sliderSwiper = new Swiper(sliderSwiper, sliderOptions);
            }
        }
    })
}

const initHeroSlider = () => {
    const heroSlider = document.querySelector('.hero__slider');
    const heroThumbsSlider = document.querySelector('.hero__thumbs-slider');

    if (!heroSlider || !heroThumbsSlider) return;

    const arrowPrev = heroThumbsSlider.parentNode.querySelector('.arrow--prev');
    const arrowNext = heroThumbsSlider.parentNode.querySelector('.arrow--next');
    const slidersFraction = heroThumbsSlider.parentNode.querySelector('.hero__fraction');

    const thumbsSliderOptions = {
        slidesPerView: 'auto',
        speed: 1000,
        spaceBetween: 24,
        grabCursor: true,
        loop: true,
        navigation: {
            prevEl: arrowPrev,
            nextEl: arrowNext,
        },
    }

    const heroThumbsSliderSwiper = new Swiper(heroThumbsSlider, thumbsSliderOptions);


    const heroSliderOptions = {
        slidesPerView: 'auto',
        speed: 1000,
        simulateTouch: false,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        loop: true,
        thumbs: {
            swiper: heroThumbsSliderSwiper
        },
        navigation: {
            prevEl: arrowPrev,
            nextEl: arrowNext,
        },
        pagination: {
            type: 'progressbar',
            el: '.hero__pagination'
        },
        on: {
            slideChange() {

            }
        }
    }

    const heroSliderSwiper = new Swiper(heroSlider, heroSliderOptions);
}

function initHeader() {
    const header = document.querySelector(".site-header");

    if (!header) return;

    const sidebar = document.querySelector('[data-sidebar]');

    if (sidebar) observeHeader();
    animateHeader();

    function animateHeader() {
        let lastScrollTop = 0;

        window.addEventListener("scroll", (e) => {
            const scrollTop = document.documentElement.scrollTop;

            header.classList.remove("scroll-down");
            header.classList.add("scroll-up");

            if (scrollTop > lastScrollTop) {
                header.classList.add("scroll-down");
                header.classList.remove("scroll-up");
            }

            if (scrollTop === 0) {
                header.classList.remove("scroll-up");
            }

            lastScrollTop = scrollTop;
        });
    }

    function observeHeader() {
        const headerObserver = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (header.classList.contains('scroll-down')) {
                    sidebar.style.top = '24px';
                } else {
                    sidebar.style.top = `${header.clientHeight + 24}px`;
                }
            })
        })

        headerObserver.observe(header, {
            attributes: true,
        })
    }
}

function initBurger() {
    const burger = document.querySelector(".burger");
    const headerPanel = document.querySelector(".site-header__panel");

    if (!burger || !headerPanel) return;

    const headerPanelClose = headerPanel.querySelector('.site-header__panel-close');

    if (headerPanelClose) initHeaderPanelClose();

    burger.addEventListener("click", (e) => {
        burger.classList.add("is-active");
        headerPanel.classList.add("is-active");
        document.body.classList.add("lock");
    });

    function initHeaderPanelClose() {
        headerPanelClose.addEventListener('click', (e) => {
            burger.classList.remove("is-active");
            headerPanel.classList.remove("is-active");
            document.body.classList.remove("lock");
        });
    }
}

function initLazyload() {
    const lazyItems = document.querySelectorAll("[data-lozad]");

    if (!lazyItems) return;

    const observer = lozad(lazyItems);
    observer.observe();
}

function initCheckboxes() {
    const checkboxes = document.querySelectorAll('[data-checkbox]');

    if (!checkboxes) return;

    checkboxes.forEach(checkbox => {
        const checkboxInput = checkbox.querySelector('.checkbox__input');

        if (checkboxInput) handeCheckboxInput();

        function handeCheckboxInput() {
            checkboxInput.addEventListener('input', (e) => {
                if (checkboxInput.checked) {
                    checkbox.classList.add('is-checked');
                } else {
                    checkbox.classList.remove('is-checked');
                }
            })
        }
    })
}

function initObjectsFilters() {
    const objectFilters = document.querySelector('.object-filters');

    if (!objectFilters) return;

    const objectFiltersCheckboxes = objectFilters.querySelectorAll('.checkbox');
    const objectFiltersAll = objectFilters.querySelector('.object-filters__all');

    if (objectFiltersAll) objectFiltersAll.addEventListener('click', setAllFilters);

    function setAllFilters() {
        objectFiltersCheckboxes.forEach(checkbox => {
            const checkboxInput = checkbox.querySelector('.checkbox__input');

            checkboxInput.checked = true;
            checkbox.classList.add('is-checked');
        })
    }
}

function initMap() {
    let map = document.querySelector('[data-map]');

    if (!map) return;

    let center = [57.034043, 28.926347];
    let zoom = 9;
    let filtersArray = [];

    ymaps.ready(init);

    function init() {
        map = new ymaps.Map(map, {
            center: center,
            zoom: zoom,
            controls: ['zoomControl', 'fullscreenControl']
        }, {

            zoomControlSize: 'small'
        });

        initObjectManager();
        initMapFilters();

        function initObjectManager() {
            window.objectManager = new ymaps.ObjectManager({
                clusterize: true,
                clusterIconLayout: 'default#pieChart',
                clusterIconPieChartRadius: 25,
                clusterIconPieChartCoreRadius: 10,
                clusterIconPieChartStrokeWidth: 3,
                hasBalloon: true,
                clusterHasHint: false,
                clusterDisableClickZoom: true
            });

            objectManager.clusters.options.set('preset', 'islands#inverteddartBlueClusterIcons');
            objectManager.add(getObjects());
        }

        function initMapFilters() {
            const mapFilters = document.querySelectorAll('.map-filters .checkbox__input');

            if (!mapFilters) return;

            mapFilters.forEach(filter => {
                filter.addEventListener('input', setObjectsFilters)
            })

            function setObjectsFilters() {
                let filterFunction = '';

                mapFilters.forEach(filter => {
                    const filterValue = filter.value;
                    const isContains = filtersArray.includes(filterValue);

                    if (filter.checked) {
                        if (!isContains) {
                            filtersArray.push(filterValue);
                        }
                    } else {
                        if (isContains) {
                            filtersArray.splice(filtersArray.indexOf(filterValue), 1)
                        }
                    }
                })

                filtersArray.forEach(filter => {
                    if (filterFunction !== '') filterFunction += ' || ';

                    filterFunction += `properties.type == "${filter}"`
                })

                if (!filterFunction) filterFunction = 'properties.grp==0';

                objectManager.setFilter(filterFunction);
            }
        }

        function getObjects() {
            const objects = [];
            const coordinates = [[57.052095, 29.135229],]

            coordinates.forEach(coord => {
                objects.push({
                    properties: {
                        type: 'Рестораны',
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: coord
                    }
                });

            })

            console.log(objects);

            return objects;
        }

        // $.ajax({
        //     url: "modules/data/mapdata.php"
        // }).done(function (data) {
        //     objectManager.add(data);
        // });

        // map.geoObjects.events.add(['click', 'mouseup'], function (e) {
        //     var id = e.get('objectId');
        //     if (id < 500) {
        //         $("#map-objects").load("modules/data/anons-project.php?cod=" + id);
        //     }
        //     var object = objectManager.objects.getById(id);
        //     var coord = object.geometry.coordinates;
        //     myMap.setCenter(coord);
        //     myMap.setZoom(16);
        //     myMap.container.fitToViewport();
        //     window.location.hash = '#map-filter';
        //     history.pushState('', document.title, window.location.pathname + window.location.search);
        // });

        map.geoObjects.add(objectManager);
    }
}

function initPopups() {
    const overlay = document.querySelector(".overlay");

    if (!overlay) return;

    initCloseModalsOnClickOverlay();

    const popups = document.querySelectorAll("[data-popup]");
    const popupBtns = document.querySelectorAll("[data-popup-btn]");

    if (!popupBtns) return;

    popupBtns.forEach((btn) => {
        const popup = overlay.querySelector(`[data-popup=${btn.dataset.popupBtn}]`);

        btn.addEventListener("click", (e) => {
            e.preventDefault();
            openModal(popup);
        });
    });

    popups.forEach((popup) => {
        const popupCloses = popup.querySelectorAll("[data-popup-close]");

        if (popupCloses) {
            popupCloses.forEach((close) => {
                close.addEventListener("click", (e) => {
                    closeModal(popup);
                });
            });
        }
    });

    function openModal(popup) {
        overlay.classList.add("is-visible");
        popup.classList.remove("is-hidden");
        document.body.classList.add("lock");
    }

    function closeModal(popup) {
        overlay.classList.remove("is-visible");
        popup.classList.add("is-hidden");
        document.body.classList.remove("lock");
    }

    function initCloseModalsOnClickOverlay() {
        const overlayChilds = Array.from(overlay.querySelectorAll("*"));

        overlay.addEventListener("click", (e) => {
            const { target } = e;

            if (!contains(overlayChilds, target)) {
                if (popups) {
                    popups.forEach((popup) => {
                        closeModal(popup);
                    });
                }

                document.body.classList.remove("lock");
            }
        });
    }
}

function contains(array, element) {
    return array.includes(element);
}

function initAnchors() {
    const anchors = document.querySelectorAll('[data-anchor]')

    if (!anchors) return;

    anchors.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            let href = this.getAttribute('href').substring(1);

            const scrollTarget = document.getElementById(href);

            const topOffset = document.querySelector('.site-header').scrollHeight;

            const elementPosition = scrollTarget.getBoundingClientRect().top;
            const offsetPosition = elementPosition - topOffset;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
}

function initScrollOnHash() {
    var pageHash = location.hash;

    if (!pageHash) return;

    location.hash = '';

    const scrollTarget = document.querySelector(pageHash);

    const topOffset = document.querySelector('.site-header').scrollHeight;

    const elementPosition = scrollTarget.getBoundingClientRect().top;
    const offsetPosition = elementPosition - topOffset;

    window.scrollBy({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

function initHeroBtns(){
    const heroBtns = document.querySelectorAll('[data-types]');

    if(!heroBtns) return;

    const mapFilters = document.querySelectorAll('.map-filters .checkbox');
    const popupFilters = document.querySelectorAll('.filters__list .checkbox');

    heroBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            const btnTypes = btn.dataset.types.split(',');

            console.log(btnTypes);

            clearAllMapFilters(mapFilters);
            clearAllMapFilters(popupFilters);

            checkFiltersOnTheBtnTypes(mapFilters, btnTypes);
            checkFiltersOnTheBtnTypes(popupFilters, btnTypes);
        })
    })

    function checkFiltersOnTheBtnTypes(filters, types){
        filters.forEach(filter => {
            const filterInput = filter.querySelector('input');

            types.forEach(type => {
                if(type === filterInput.value){
                    filter.click();
                } 
            })
        })
    }

    function clearAllMapFilters(filters){
        filters.forEach(filter => {
            const filterInput = filter.querySelector('input');

            filterInput.checked = false;
            filter.classList.remove('is-checked');
        });
    }
}

window.addEventListener("DOMContentLoaded", (e) => {
    initAnchors();
    initScrollOnHash();
    initSliders();
    initHeroSlider();
    initHeader();
    initBurger();
    initLazyload();
    initCheckboxes();
    initObjectsFilters();
    initMap();
    initPopups();
    initHeroBtns();
});
