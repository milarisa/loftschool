export default () => {
    let clusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: true,
        clusterOpenBalloonOnClick: true,
        clusterBalloonContentLayout: 'cluster#balloonCarousel',
        clusterBalloonPanelMaxMapArea: 0,
        clusterBalloonContentLayoutWidth: 300,
        clusterBalloonContentLayoutHeight: 200,
        clusterBalloonPagerSize: 5
    });

    clusterer.events.add('click', event => {
        // remove openned geoobject element on page
        let curPopupElem = document.querySelector('.geoobject');
        if (curPopupElem) {
            document.body.removeChild(curPopupElem);
        }
    });

    return clusterer;
}