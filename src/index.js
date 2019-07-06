import renderPopup from "./renderPopup";
import restoreReviews from "./restoreReviews";

ymaps.ready(init);

function init() {
    let myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 10
    });

    let myClusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: true,
        clusterOpenBalloonOnClick: true,
        clusterBalloonContentLayout: 'cluster#balloonCarousel',
        clusterBalloonPanelMaxMapArea: 0,
        clusterBalloonContentLayoutWidth: 200,
        clusterBalloonContentLayoutHeight: 130,
        clusterBalloonPagerSize: 5
    });

    myClusterer.events.add('click', event => {
        // remove openned geoobject element on page
        let curPopupElem = document.querySelector('.geoobject');
        if (curPopupElem) {
            document.body.removeChild(curPopupElem);
        }
    })

    myMap.geoObjects.add(myClusterer);

    restoreReviews(myClusterer);

    myMap.events.add('click', async function (event) {
        let mapCoords = event.get('coords');

        const domEvent = event._sourceEvent.originalEvent.domEvent.originalEvent;
        const documentCoords = [domEvent.clientX, domEvent.clientY];
        
        await renderPopup(myClusterer, undefined, mapCoords, documentCoords);
    });

    document.body.addEventListener('click', async event => {       
        const target = event.target;

        // handler for click on place link in baloon
        if (target.classList.contains('placemark-link')) {
            event.preventDefault();

            const coordX = target.getAttribute('data-coord-x');
            const coordY = target.getAttribute('data-coord-y');

            if (!coordX || !coordY)
                return;
            
            const mapCoords = [coordX, coordY];
            const pageCoords = [event.clientX, event.clientY];

            myMap.balloon.close();

            await renderPopup(myClusterer, undefined, mapCoords, pageCoords);
        }
    });
}