
export default (coordX, coordY) => {
    let coords = [coordX, coordY];
    let placeMark = new ymaps.Placemark(coords);

    return placeMark;
};

