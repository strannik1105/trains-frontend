const URL_STATIONS = 'http://localhost:8500/api/v1/stations/';
let URL_TRAINS = 'http://localhost:8500/api/v1/trains/';
let URL_WAGON_BY_TRAIN = 'http://localhost:8500/api/v1/wagons/id/historical/by_train';
let URL_WAGON = 'http://localhost:8500/api/v1/wagons/id/historical/by_train';

ymaps.ready(function () {

    var map = new ymaps.Map('map', {
            center: [34.319203099075196, 54.07586663394321],
            zoom: 13,
            controls: ['zoomControl']
        }),
        objectManager = new ymaps.ObjectManager();
    map.controls.get('zoomControl').options.set({size: 'small'});

    const app1 = async () => {
        const obj = await fetch(URL_STATIONS);
        const result = await obj.json();

        for (let i = 0; i < result.length; i++) {
            let tmp_coords = [];
            tmp_coords.push(result[i].longitude);
            tmp_coords.push(result[i].latitude);

            map.geoObjects.add(
                myPlacemark = new ymaps.Placemark(tmp_coords, {

                        balloonContent: `<strong>${result[i].name}</strong>`
                    }, {
                        preset: "islands#circleIconWithCaption",
                        iconColor: '#ff0000',
                    },
                )
            )
        }

        for (let i = 0; i < result.length - 1; i++) {
            let tmp_coords1 = [];
            tmp_coords1.push(result[i].longitude);
            tmp_coords1.push(result[i].latitude);

            let tmp_coords2 = [];
            tmp_coords2.push(result[i + 1].longitude);
            tmp_coords2.push(result[i + 1].latitude);

            map.geoObjects.add(
                myGeoObject = new ymaps.GeoObject({
                    // Описываем геометрию геообъекта.
                    geometry: {
                        // Тип геометрии - "Ломаная линия".
                        type: "LineString",
                        // Указываем координаты вершин ломаной.
                        coordinates: [
                            tmp_coords1,
                            tmp_coords2
                        ]
                    },
                    // Описываем свойства геообъекта.
                }, {
                    // Задаем опции геообъекта.
                    // Цвет линии.
                    strokeColor: "#FFFF00",
                    // Ширина линии.
                    strokeWidth: 5
                })
            )
        }
    }
    app1()

})

const app = async () => {
    // получаем и обрабатываем данные с backend
    const obj = await fetch(URL_STATIONS);
    const result = await obj.json();
    // находим элемент, в который будет записываться контент
    let list = document.querySelector('.trains__list');
    // в цикле записываем данные
    for (let i = 0; i < result.length; i++) {
        list.innerHTML += '<div class="trains__list-item"></div>'
        let list_item = list.lastElementChild;
        list_item.innerHTML += '<img class="trains__list-item-image" src="public/images/subway_FILL0_wght400_GRAD0_opsz24.svg"\n' +
            '                 alt="">'
        list_item.innerHTML += `<p class="trains__list-item-text" id="${result[i].sid}" onclick="showInfo(id)">${result[i].name}</p>`
        list_item.innerHTML += '<p></p>'
        list_item.innerHTML += `<p class="trains__list-item-info hide">${result[i].longitude}, ${result[i].latitude}</p>`
        list_item.innerHTML += ''
    }

}
// вызов функции
app()

//
const selectApp = async () => {
    // получаем данные о поездах
    const obj = await fetch(URL_TRAINS);
    const result = await obj.json();
    console.log(result)
    // находим элемент, в который будет записываться контент
    let list = document.querySelector('#select');
    // записываем id поездов в option для последующего выбора в форме
    result.forEach((el) => {
        list.innerHTML += `<option value="${el}">${el}</option>`
    })
}
selectApp()

const searchTrain = async () => {
    let list = document.querySelector('#select');
    let search_url = URL_WAGON.replace('id', list.value);

    // получаем данные о конкретном поезде
    const obj = await fetch(search_url);
    const result = await obj.json();
    // записываем контент в найденный элемент
    let search_result = document.querySelector('.search__result');
    search_result.innerHTML = ""

    console.log(result.operdate)

    for (let i = 0; i < result.length; i++) {
        search_result.innerHTML += `<p class="result__info">Дата: ${result[i].operdate}</p>`;
        search_result.innerHTML += `<p class="result__info">Откуда(id): ${result[i].operdate}</p>`;
        search_result.innerHTML += `<p class="result__info">Куда(id): ${result[i].st_desl_id}</p>`;

    }
}


function changeLineColor(coords1, coords2) {
    ymaps.ready(function () {

        var map = new ymaps.Map('map', {
                center: [34.319203099075196, 54.07586663394321],
                zoom: 13,
                controls: ['zoomControl']
            }),
            objectManager = new ymaps.ObjectManager();
        map.controls.get('zoomControl').options.set({size: 'small'});

        const app1 = async () => {
            const obj = await fetch(URL_STATIONS);
            const result = await obj.json();

            for (let i = 0; i < result.length; i++) {
                let tmp_coords = [];
                tmp_coords.push(result[i].longitude);
                tmp_coords.push(result[i].latitude);

                map.geoObjects.add(
                    myPlacemark = new ymaps.Placemark(tmp_coords, {

                            balloonContent: `<strong>${result[i].name}</strong>`
                        }, {
                            preset: "islands#circleIconWithCaption",
                            iconColor: '#ff0000',
                        },
                    )
                )
            }

            for (let i = 0; i < result.length - 1; i++) {
                let tmp_coords1 = [];
                tmp_coords1.push(result[i].longitude);
                tmp_coords1.push(result[i].latitude);

                let tmp_coords2 = [];
                tmp_coords2.push(result[i + 1].longitude);
                tmp_coords2.push(result[i + 1].latitude);

                map.geoObjects.add(
                    myGeoObject = new ymaps.GeoObject({
                        // Описываем геометрию геообъекта.
                        geometry: {
                            // Тип геометрии - "Ломаная линия".
                            type: "LineString",
                            // Указываем координаты вершин ломаной.
                            coordinates: [
                                tmp_coords1,
                                tmp_coords2
                            ]
                        },
                        // Описываем свойства геообъекта.
                    }, {
                        // Задаем опции геообъекта.
                        // Цвет линии.
                        strokeColor: "#FFFF00",
                        // Ширина линии.
                        strokeWidth: 5
                    })
                )
                map.geoObjects.add(
                    myGeoObject = new ymaps.GeoObject({
                        // Описываем геометрию геообъекта.
                        geometry: {
                            // Тип геометрии - "Ломаная линия".
                            type: "LineString",
                            // Указываем координаты вершин ломаной.
                            coordinates: [
                                coords1,
                                coords2
                            ]
                        },
                        // Описываем свойства геообъекта.
                    }, {
                        // Задаем опции геообъекта.
                        // Цвет линии.
                        strokeColor: "#ff0000",
                        // Ширина линии.
                        strokeWidth: 5
                    })
                )
            }
        }
        app1()

    })
}


const searchWagon = async () => {
    let list = document.querySelector('#select');
    let search_url = URL_TRAINS + list.value;
    // получаем данные о конкретном поезде
    const obj = await fetch(search_url);
    const result = await obj.json();
    // записываем контент в найденный элемент
    let search_result = document.querySelector('.search__result');
    search_result.innerHTML = ""
    let data_node1 = result['node1']
    let data_node2 = result['node2']
    let length = result['length']

    console.log(data_node1)

    search_result.innerHTML += `<p class="result__info">Откуда: ${data_node1.name}</p>`;
    search_result.innerHTML += `<p class="result__info">Куда: ${data_node2.name}</p>`;
    search_result.innerHTML += `<p class="result__info">Длина в км: ${length}</p>`;

    for (let i = 0; i < 1; i++) {
        let tmp_coords1 = [];
        tmp_coords1.push(data_node1.longitude);
        tmp_coords1.push(data_node1.latitude);

        let tmp_coords2 = [];
        tmp_coords2.push(data_node2.longitude);
        tmp_coords2.push(data_node2.latitude);
        changeLineColor(tmp_coords1, tmp_coords2);
    }
}
searchWagon()


const drawWa = async () =>{
    const obj = await fetch(URL_STATIONS);
    const result = await obj.json();

    let list1 = document.querySelector('#select2');
    let list2 = document.querySelector('#select3');

    console.log(result)

    result.forEach((el) => {
        list1.innerHTML += `<option value="${el.sid}">${el.sid}</option>`
        list2.innerHTML += `<option value="${el.sid}">${el.sid}</option>`
    })
}
drawWa()

let urll = 'http://localhost:8500/api/v1/shorttest/id1/id2'
const drawWay = async () =>{
    let list2 = document.querySelector('#select2');
    let list3 = document.querySelector('#select3');
    let c = urll.replace('id1', list2.value).replace('id2', list3.value)
    const obj = await fetch(c);
    const result = await obj.json();

    console.log(result)


}

