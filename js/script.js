ymaps.ready(initMap);

function initMap() {
    var myMap = new ymaps.Map("map", {
        center: [55.751574, 37.573856],
        zoom: 10,
        behaviors: ['default', 'scrollZoom'],
        controls: []
    });


    var placemark = new ymaps.Placemark(myMap.getCenter(), {
        balloonContentHeader: '<h2 class="header__logo">Movee</h2>',
        balloonContentBody:
            '<ul class="map-list">'+
                '<li class="map-list__item">Москва, Волгоградский пр-т, 38</li>'+
                '<li class="map-list__item">'+
                    '<a href="tel:8(800)-080-12-13" class="tel__telephone">8 (800)-080-12-13</a>'+
                '</li>'+
                '<li class="map-list__item">'+
                    '<a href="mailto:hello@movee.ru" class="social__link">hello@movee.ru</a>'+
                '</li>'+
            '</ul>',
        balloonContentFooter:
            '<ul class="d-flex justify-end map-social">' +
            '<li><a href="https://www.youtube.com/"><img src="./img/youtube.svg"/></a></li>' +
            '<li><a href="https://vk.com/"><img src="./img/vk.svg"/></a></li>' +
            '<li><a href="https://www.facebook.com/"><img src="./img/fb.svg"/></a></li>' +
            '<li><a href="https://www.instagram.com/"><img src="./img/inst.svg"/></a></li>' +
            '</ul>',

    });

    myMap.geoObjects.add(placemark);
    myMap.geoObjects.add(new ymaps.Placemark([55.715449, 37.709398], {
        balloonContent: 'цвет <strong>носика Гены</strong>',
        iconCaption: 'Волгоградский проспект, 38'
    }, {
        preset: 'islands#redDotIconWithCaption'
    }))
    placemark.balloon.open();

}

