import renderPopup from "./renderPopup";

export default (clusterer, coordX, coordY) => {
    let coords = [coordX, coordY];
    let placeMark = new ymaps.Placemark(coords);

    placeMark.events.add('click', async event => {
        const mapCoords = placeMark.geometry.getCoordinates();

        const domEvent = event._sourceEvent.originalEvent.domEvent.originalEvent;
        const documentCoords = [domEvent.clientX, domEvent.clientY];
        
        await renderPopup(clusterer, undefined, mapCoords, documentCoords);
    });

    return placeMark;
};

