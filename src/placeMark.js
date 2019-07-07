import renderPopup from "./renderPopup";

export default (clusterer, review) => {
    const balloonContent = `
        <a class='placemark-link' href='' data-coord-x='${review.coords[0]}' data-coord-y='${review.coords[1]}'>${review.address}</a>
        <div class='balloon-text'>${review.text}</div>`;

    const baloonFooter = `<div class='balloon-footer'>${review.date}</div>`;

    const placeMark = new ymaps.Placemark(review.coords, {
        balloonContentHeader: review.place,
        balloonContentBody: balloonContent,
        balloonContentFooter: baloonFooter
    });

    placeMark.events.add('click', async event => {
        event.preventDefault();
        
        const mapCoords = placeMark.geometry.getCoordinates();

        const domEvent = event._sourceEvent.originalEvent.domEvent.originalEvent;
        const documentCoords = [domEvent.clientX, domEvent.clientY];
        
        await renderPopup(clusterer, undefined, mapCoords, documentCoords);
    });

    return placeMark;
};

