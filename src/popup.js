import Handlebars from 'handlebars/dist/handlebars.min.js';

const source = `
<div class="geoobject-header">
  <i class="fa fa-map-marker" aria-hidden="true"></i>
  <div class="address">{{address}}</div>
  <i class="fa fa-times exit"></i>
</div>
<div class="reviews-block">
  {{#each reviews}}
  <div class="review">
    <div class="review-header">
      <div class="review-name">{{placeName}}</div>
      <div class="review-place">{{address}}</div>
      <div class="review-date">{{date}}</div>
    </div>
    <div class="review-text">{{text}}</div>
  </div>
  {{/each}}
  <form action="" class="feedback">
    <div class="feedback-title">Ваш отзыв</div>
    <input name="name" type="text" class="feedback-name" placeholder="Ваше имя">
    <input name="place" type="text" class="feedback-place" placeholder="Укажите место">
    <textarea name="text" id="" cols="30" rows="10" class="feedback-text" placeholder="Поделитесь впечатлениями"></textarea>
    <button class="feedback-btn">Добавить</button>
  </form>
</div>`;

let template = Handlebars.compile(source);

export default async (address, reviews, documentCoords) => {
    let context = {
        address: address,
        reviews: reviews
    };

    let html = template(context);

    let elem = document.createElement('div');
    elem.classList.add('geoobject');
    elem.innerHTML = html;

    // set position on document
    elem.style.top = documentCoords[1] + 'px';
    elem.style.left = documentCoords[0] + 'px';

    let exitIcon = elem.getElementsByClassName('exit')[0];
    exitIcon.addEventListener('click', () => {
        document.body.removeChild(elem);
    });

    return elem;
}