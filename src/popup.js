import Handlebars from 'handlebars/dist/handlebars.min.js';

const source = `
<div class="geoobject-header">
  <div class="icon marker"><i class="fa fa-map-marker" aria-hidden="true"></i></div>
  <span class="address">{{address}}</span>
  <div class="icon exit"><i class="fa fa-times"></i></div>
</div>
<div class="reviews-block">
  {{#if reviews}}
    {{#each reviews}}
    <div class="review">
      <div class="review-header">
        <span class="review-name">{{name}}</span>
        <span class="review-place">{{place}}</span>
        <span class="review-date">{{date}}</span>
      </div>
      <div class="review-text">{{text}}</div>
    </div>
    {{/each}}
  {{else}}
    <div>Отзывов пока нет...</div>
  {{/if}}
</div>
<form action="" class="feedback">
  <div class="feedback-title">Ваш отзыв</div>
  <input name="name" type="text" class="feedback-name field" placeholder="Ваше имя">
  <input name="place" type="text" class="feedback-place field" placeholder="Укажите место">
  <textarea name="text" id="" cols="30" rows="10" class="feedback-text field" placeholder="Поделитесь впечатлениями"></textarea>
  <button class="feedback-btn">Добавить</button>
</form>
`;

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