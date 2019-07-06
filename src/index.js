import renderPopup from "./renderPopup";
import restoreReviews from "./restoreReviews";

ymaps.ready(init);

function init() {
    let myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 10
    });

    let myClusterer = new ymaps.Clusterer(
        {clusterDisableClickZoom: true}
    );
    myMap.geoObjects.add(myClusterer);

    restoreReviews(myClusterer);

    myMap.events.add('click', async function (event) {
        let mapCoords = event.get('coords');

        const domEvent = event._sourceEvent.originalEvent.domEvent.originalEvent;
        const documentCoords = [domEvent.clientX, domEvent.clientY];
        
        await renderPopup(myClusterer, undefined, mapCoords, documentCoords);
    });
}