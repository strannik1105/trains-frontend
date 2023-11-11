ymaps.ready(function () {

    var map = new ymaps.Map('map', {
            center: [-0.13968631031941695, 51.52437396304669],
            zoom: 13,
            controls: ['zoomControl']
        }),
        objectManager = new ymaps.ObjectManager();
    map.controls.get('zoomControl').options.set({size: 'small'});
    // Загружаем GeoJSON файл, экспортированный из Конструктора карт.
    $.getJSON('data.geojson')
        .done(function (geoJson) {

            geoJson.features.forEach(function (obj) {
                // Задаём контент балуна.
                obj.properties.balloonContent = obj.properties.description;
                // Задаём пресет для меток с полем iconCaption.
                if (obj.properties.iconCaption) {
                    obj.options = {
                        preset: "islands#circleIconWithCaption",
                        iconColor: '#ff0000',
                        iconCaptionMaxWidth: '50'
                    }
                }
            });
            // Добавляем описание объектов в формате JSON в менеджер объектов.
            objectManager.add(geoJson);
            // Добавляем объекты на карту.
            map.geoObjects.add(objectManager);
        });
});


let url = 'http://localhost:9000/api/v1/stations/';

function drawStation(el){
    let list_item = document.querySelector('.trains__list');
    list_item.innerHTML += '<img class="trains__list-item-image" src="public/images/subway_FILL0_wght400_GRAD0_opsz24.svg"\n' +
        '                 alt="">'
    list_item.innerHTML += '<p class="trains__list-item-text" id="" onclick="showInfo(id)">el.name</p>'
    list_item.innerHTML += '<p></p>'
    list_item.innerHTML += '<p class="trains__list-item-info hide">some info</p>'
}
const app = async () => {
    const obj = await fetch(url);
    const result = await obj.json();
    let list = document.querySelector('.trains__list');
    for (let i=0; i < result.length; i++){
        list.innerHTML += '<div class="trains__list-item"></div>'
        let list_item = list.lastElementChild;
        list_item.innerHTML += '<img class="trains__list-item-image" src="public/images/subway_FILL0_wght400_GRAD0_opsz24.svg"\n' +
            '                 alt="">'
        list_item.innerHTML += `<p class="trains__list-item-text" id="${result[i].sid}" onclick="showInfo(id)">${result[i].name}</p>`
        list_item.innerHTML += '<p></p>'
        list_item.innerHTML += `<p class="trains__list-item-info hide">${result[i].longitude}, ${result[i].latitude}</p>`
        list_item.innerHTML += ''
        console.log(result[i])
    }

}

app()