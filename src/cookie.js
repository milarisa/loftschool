/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', function() {
    let filterValue = filterNameInput.value;

    if (filterValue === '') {
        displayCookie();
    }
    
    displayCookie(getFilteredCookie(filterValue));
});

function isMatching(full, chunk) {
    return full.toLowerCase().indexOf(chunk.toLowerCase()) > -1;
}

function getFilteredCookie(value) {
    let cookie = getCookie();
    let filteredCookie = {};

    for (name in cookie) {
        if (isMatching(name, value) || isMatching(cookie[name], value)) {
            filteredCookie[name] = cookie[name];
        }
    }

    return filteredCookie;
}

addButton.addEventListener('click', () => {
    let name = addNameInput.value;
    let value = addValueInput.value;

    if (!name || !value)
        return;

    document.cookie = `${name}=${value}`;

    addNameInput.value = '';
    addValueInput.value = '';
    
    filterNameInput.dispatchEvent(new Event('keyup'));
});

function getCookie() {
    return document.cookie
        .split('; ')
        .filter(Boolean)
        .reduce((obj, curCookie) => {            
            let [name, value] = curCookie.split('=');
            obj[name] = value;
            
            return obj;
        }, {});
}

function displayCookie(cookieObj) {
    cookieObj = cookieObj || getCookie();
    
    listTable.innerText = '';

    for (name in cookieObj) {
        // Create name column
        let nameTh = document.createElement('th');
        nameTh.classList.add('cookie-name');
        nameTh.innerText = name;

        // Create value column
        let valueTh = document.createElement('th');
        valueTh.classList.add('cookie-value');
        valueTh.innerText = cookieObj[name];

        // Create remove column
        let removeBtn = document.createElement('button');
        removeBtn.innerText = 'Удалить';
        let removeTh = document.createElement('th');
        removeTh.append(removeBtn);

        // Create cookie row
        let cookieTr = document.createElement('tr');
        cookieTr.append(nameTh);
        cookieTr.append(valueTh);
        cookieTr.append(removeTh);

        listTable.append(cookieTr);
    }
}

listTable.addEventListener('click', (event) => {
    let element = event.target;
    if (element.tagName !== 'BUTTON')
        return;

    let cookieRow = element.parentElement.parentElement;
    let cookieName = cookieRow.querySelector('.cookie-name').innerText;

    var date = new Date(0);
    document.cookie = `${cookieName}=; expires=${date.toUTCString()}`;

    displayCookie();
});

displayCookie();