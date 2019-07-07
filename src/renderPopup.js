import popup from "./popup";
import getFullAddress from "./geocode/getFullAddress";
import getAddressByCoords from "./geocode/getAddressByCoords";
import getReviews from "./storage/getReviews";
import placeMark from "./yMapsModel/placeMark";
import saveReview from "./storage/saveReview";
import Review from "./review";

export default async function renderPopup(clusterer, mapCoords, pageCoords, address) {
    // remove current popup element on page if exist
    let curPopupElem = document.querySelector('.geoobject');
    if (curPopupElem) {
        document.body.removeChild(curPopupElem);
    }

    // get exists markers with received coordinates
    let reviews = getReviews(mapCoords);

    let fullAddress;
    if (!address) {
        let addressObject = await getAddressByCoords(mapCoords);
        fullAddress = getFullAddress(addressObject);
    } else {
        fullAddress = address;
    }    

    let popupElem = await popup(fullAddress, reviews, pageCoords);

    // popupup's form handler
    let nameInput = popupElem.getElementsByClassName('feedback-name')[0];
    let placeInput = popupElem.getElementsByClassName('feedback-place')[0];
    let textInput = popupElem.getElementsByClassName('feedback-text')[0];
    let form = popupElem.getElementsByClassName('feedback')[0];

    form.addEventListener('submit', async event => {
        event.preventDefault();

        let nameValue = nameInput.value;
        let placeValue = placeInput.value;
        let textValue = textInput.value;
        
        let dateNow = new Date(Date.now());
        let dateValue = `${dateNow.getFullYear()}.${dateNow.getMonth()}.${dateNow.getDate()} ${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`;

        let review = new Review(mapCoords[0], mapCoords[1], fullAddress, nameValue, placeValue, textValue, dateValue);

        clusterer.add(placeMark(clusterer, review));
        saveReview(review);

        // clear input values
        nameInput.value = '';
        placeInput.value = '';
        textInput.value = '';
        
        // refresh reviews on popup
        await renderPopup(clusterer, mapCoords, pageCoords, fullAddress);
    });

    document.body.append(popupElem);
}