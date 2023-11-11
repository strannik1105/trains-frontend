function showInfo(id){
    // получаем станцию по id и ее родительский элемент
    let elem = document.getElementById(id).parentNode;
    // получаем информацию о станции, изначально она скрыта
    let elem_info = elem.querySelector(".trains__list-item-info");
    // показываем/скрываем информацию о станции
    elem_info.classList.toggle('hide');
}