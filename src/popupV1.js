// import Handlebars from 'handlebars/dist/handlebars.min.js';
// import getAddressByCoords from './getAddressByCoords.js';
// import placeMark from './placeMark';
// import Marker from './marker';
// import saveMarker from './saveReview.js/index.js';
// import getMarkers from './getReviews.js/index.js';
// import getFullAddress from './getFullAddress.js';

// const source = `
// <div class="geoobject-header">
//   <i class="fa fa-map-marker" aria-hidden="true"></i>
//   <div class="address">{{address}}</div>
//   <i class="fa fa-times exit"></i>
// </div>
// <div class="reviews-block">
//   {{#each reviews}}
//   <div class="review">
//     <div class="review-header">
//       <div class="review-name">{{name}}</div>
//       <div class="review-place">{{place}}</div>
//       <div class="review-date">{{date}}</div>
//     </div>
//     <div class="review-text">{{text}}</div>
//   </div>
//   {{/each}}
//   <form action="" class="feedback">
//     <div class="feedback-title">Ваш отзыв</div>
//     <input name="name" type="text" class="feedback-name" placeholder="Ваше имя">
//     <input name="place" type="text" class="feedback-place" placeholder="Укажите место">
//     <textarea name="text" id="" cols="30" rows="10" class="feedback-text" placeholder="Поделитесь впечатлениями"></textarea>
//     <button class="feedback-btn">Добавить</button>
//   </form>
// </div>`;

// let template = Handlebars.compile(source);

// export default async (clusterer, mapCoords, documentCoords) => {
//     let reviews = [];
//     // get exists markers with received coordinates
//     let markers = getMarkers(mapCoords);
//     markers.forEach(r => reviews.push(r));

//     let addressObject = await getAddressByCoords(mapCoords);
//     let fullAddress = getFullAddress(addressObject);

//     let context = {
//         address: fullAddress,
//         reviews: reviews
//       };
      
//     let html = template(context);

//     let elem = document.createElement('div');
//     elem.classList.add('geoobject');
//     elem.innerHTML = html;

//     elem.style.top = documentCoords[1] + 'px';
//     elem.style.left = documentCoords[0] + 'px';

//     let exitIcon = elem.getElementsByClassName('exit')[0];
//     exitIcon.addEventListener('click', () => {
//         document.body.removeChild(elem);
//     });

//     // form handler
//     let nameInput = elem.getElementsByClassName('feedback-name')[0];
//     let placeInput = elem.getElementsByClassName('feedback-place')[0];
//     let textInput = elem.getElementsByClassName('feedback-text')[0];
//     let form = elem.getElementsByClassName('feedback')[0];

//     form.addEventListener('submit', event => {
//         event.preventDefault();

//         let nameValue = nameInput.value;
//         let placeValue = placeInput.value;
//         let textValue = textInput.value;
        
//         let dateNow = new Date(Date.now());
//         let dateValue = `${dateNow.getFullYear()}.${dateNow.getMonth()}.${dateNow.getDate()} ${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`;

//         console.log(nameValue + placeValue + textValue);
//         let newReview = {
//             name: nameValue,
//             place: placeValue,
//             date: dateValue,
//             text: textValue
//         };

//         let marker = new Marker(mapCoords[0], mapCoords[1], fullAddress, newReview);

//         clusterer.add(placeMark(marker));
//         saveMarker(marker);

//         // clear input values
//         nameInput.value = '';
//         placeInput.value = '';
//         textInput.value = '';
        
//     });
    
//     return elem;
// }