export default (map, coords) => {
    var projection = map.options.get('projection');
    return map.converter.globalToPage(
        projection.toGlobalPixels(
            coords,
            map.getZoom()
        )
    );
}