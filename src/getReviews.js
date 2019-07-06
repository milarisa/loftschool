export default (coords) => {
    if (!window.reviewsMap)
        return [];

    let reviews = window.reviewsMap.get(`${coords[0]}-${coords[1]}`);

    return !reviews ? [] : reviews;
}