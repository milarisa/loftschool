import placeMark from "./placeMark";

export default (clusterer) => {
    window.reviewsMap = new Map();

    let storage = localStorage.reviews;
    if (!storage)
        return;

    let reviews = JSON.parse(localStorage.reviews);

    reviews.forEach(r => {
        let reviews = r.value;
        window.reviewsMap.set(r.key, reviews);
        reviews.forEach(rev => {
            clusterer.add(placeMark(clusterer, rev.coords[0], rev.coords[1]));
        })
    });
}