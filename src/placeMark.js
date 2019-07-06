import renderPopup from "./renderPopup";

export default (clusterer, review) => {
    const baloonContent = `
        <a class='placemark-link' href='' data-coord-x='${review.coords[0]}' data-coord-y='${review.coords[1]}'>${review.address}</a>
        <div>${review.text}</div>`;

    let placeMark = new ymaps.Placemark(review.coords, {
        balloonContentHeader: review.place,
        balloonContentBody: baloonContent,
        balloonContentFooter: review.date
    });

    placeMark.events.add('click', async event => {
        const mapCoords = placeMark.geometry.getCoordinates();

        const domEvent = event._sourceEvent.originalEvent.domEvent.originalEvent;
        const documentCoords = [domEvent.clientX, domEvent.clientY];
        
        await renderPopup(clusterer, undefined, mapCoords, documentCoords);
    });

    return placeMark;
};

