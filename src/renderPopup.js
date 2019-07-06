import popup from "./popup";
import getFullAddress from "./getFullAddress";
import getAddressByCoords from "./getAddressByCoords";
import getReviews from "./getReviews";
import placeMark from "./placeMark";
import saveReview from "./saveReview";
import Review from "./review";

export default async (clusterer, mapCoords, documentCoords) => {
    // remove current geoobject element on page if exists
    let curPopupElem = document.querySelector('.geoobject');
    if (curPopupElem) {
        document.body.removeChild(curPopupElem);
    }

    // let reviews = [];
    // get exists markers with received coordinates
    let reviews = getReviews(mapCoords);
    // markers.forEach(r => reviews.push(r));

    let addressObject = await getAddressByCoords(mapCoords);
    let fullAddress = getFullAddress(addressObject);

    let popupElem = await popup(fullAddress, reviews, documentCoords);

    // popupup's form handler
    let nameInput = popupElem.getElementsByClassName('feedback-name')[0];
    let placeInput = popupElem.getElementsByClassName('feedback-place')[0];
    let textInput = popupElem.getElementsByClassName('feedback-text')[0];
    let form = popupElem.getElementsByClassName('feedback')[0];

    form.addEventListener('submit', event => {
        event.preventDefault();

        let nameValue = nameInput.value;
        let placeValue = placeInput.value;
        let textValue = textInput.value;
        
        let dateNow = new Date(Date.now());
        let dateValue = `${dateNow.getFullYear()}.${dateNow.getMonth()}.${dateNow.getDate()} ${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`;

        console.log(nameValue + placeValue + textValue);
        // let newReview = {
        //     name: nameValue,
        //     place: placeValue,
        //     date: dateValue,
        //     text: textValue
        // };

        // let marker = new Marker(mapCoords[0], mapCoords[1], fullAddress, newReview);
        let review = new Review(mapCoords[0], mapCoords[1], fullAddress, nameValue, textValue, dateValue);

        clusterer.add(placeMark(mapCoords[0], mapCoords[1]));
        saveReview(review);

        // clear input values
        nameInput.value = '';
        placeInput.value = '';
        textInput.value = '';
        
    });

    document.body.append(popupElem);
}