import renderPopup from "./renderPopup";
import restoreReviews from "./storage/restoreReviews";
import clusterer from "./yMapsModel/clusterer";

ymaps.ready(init);

function init() {
    let map = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 10
    });

    let myClusterer = clusterer();
    map.geoObjects.add(myClusterer);

    restoreReviews(myClusterer);

    map.events.add('click', async function (event) {
        let mapCoords = event.get('coords');

        const domEvent = event._sourceEvent.originalEvent.domEvent.originalEvent;
        const pageCoords = [domEvent.clientX, domEvent.clientY];
        
        await renderPopup(myClusterer, mapCoords, pageCoords);
    });

    document.body.addEventListener('click', async () => {
        // handler for click on place link in baloon
        if (event.target.classList.contains('placemark-link'))
            await handlePlacemarkLinkClick(event, map, myClusterer);        
    });
}

async function handlePlacemarkLinkClick(event, map, clusterer) {
    event.preventDefault();
    const target = event.target;

    const coordX = target.getAttribute('data-coord-x');
    const coordY = target.getAttribute('data-coord-y');

    if (!coordX || !coordY)
        return;
    
    const mapCoords = [coordX, coordY];
    const pageCoords = [event.clientX, event.clientY];

    map.balloon.close();

    await renderPopup(clusterer, mapCoords, pageCoords);
}