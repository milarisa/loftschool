import getReviews from "./getReviews";

export default (review) => {
    if (!window.reviewsMap)
        window.reviewsMap = new Map();
    
    let reviewsCollection = getReviews(review.coords);
    reviewsCollection.push(review);

    let coords = review.coords;
    window.reviewsMap.set(`${coords[0]}-${coords[1]}`, reviewsCollection);
}