'use strict';

const modalTitle = document.querySelector('.modal__title');
const overlayModal = document.querySelector('.overlay__modal');
const modalForm = document.querySelector('.modal__form');
const modalCheckbox = document.querySelector('.modal__checkbox');
const modalInputCheckbox = document.querySelector('.modal__input_discount');
const overlayElem = document.querySelector('.overlay');
const btnModalOpen = document.querySelector('.panel__add-goods');
const tableBody = document.querySelector('.table__body');


const arrGoods = [
    {
        "id": 1,
        "title": "Смартфон Xiaomi 11T 8/128GB",
        "price": 27000,
        "description": "Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.",
        "category": "mobile-phone",
        "discont": false,
        "count": 3,
        "units": "шт",
        "images": {
            "small": "img/smrtxiaomi11t-m.jpg",
            "big": "img/smrtxiaomi11t-b.jpg"
        }
    },
    {
        "id": 2,
        "title": "Радиоуправляемый автомобиль Cheetan",
        "price": 4000,
        "description": "Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет",
        "category": "toys",
        "discont": 5,
        "count": 1,
        "units": "шт",
        "images": {
            "small": "img/cheetancar-m.jpg",
            "big": "img/cheetancar-b.jpg"
        }
    },
];

// util for createElement
const createElem = (tag, opts) => {
    const elem = document.createElement(tag);
    Object.assign(elem, opts);
    return elem;
};

const createRow = ({ id, title, category, units, count, price }) => {
    const tableRow = document.createElement('TR')
    tableRow.className = 'goods__row';

    const td = createElem('TD', {
        className: 'table__cell',
        textContent: `${id}`,
    });
    const td_title = createElem('TD', {
        className: 'table__cell table__cell_left table__cell_name',
    });
    td_title.dataset.id = `${id}`;

    const tdSpanId = createElem('SPAN', {
        className: 'table__cell-id',
        textContent: `id: '${id}`,
    });
    td_title.append(tdSpanId);
    td_title.append(`${title}`);

    const td_category = createElem('TD', {
        className: 'table__cell table__cell_left',
        textContent: `${category}`,
    });
    const td_units = createElem('TD', {
        className: 'table__cell',
        textContent: `${units}`,
    });
    const td_count = createElem('TD', {
        className: 'table__cell',
        textContent: `${count}`,
    });
    const td_price = createElem('TD', {
        className: 'table__cell',
        textContent: `$ ${price}`,
    });
    const td_total = createElem('TD', {
        className: 'table__cell',
        textContent: `$ ${count * price}`,
    });

    const td_btn_wrapper = createElem('TD', {
        className: 'table__cell table__cell_btn-wrapper',
    });
    const button_pic = createElem('BUTTON', {
        className: 'table__btn table__btn_pic',
    });
    const button_edit = createElem('BUTTON', {
        className: 'table__btn table__btn_edit',
    });
    const button_del = createElem('BUTTON', {
        className: 'table__btn table__btn_del',
    });

    tableBody.append(tableRow);
    tableRow.append(td, td_title, td_category, td_units, td_count, td_price, td_total, td_btn_wrapper);
    td_btn_wrapper.append(button_pic, button_edit, button_del);

    return tableRow;
};

// как сделать?
//  При клике на кнопку удалить в таблице, удалять 
// строку из вёрстки и объект из базы данных
// В консоль выводить базу данных после удаления поля
const renderGoods = (arr) => {
    arr.forEach((obj) => {
        createRow(obj);

        const btnsDel = document.querySelectorAll('.table__btn_del');
        btnsDel.forEach(del => {
            del.addEventListener('click', event => {
                const target = event.target;
                if (target.contains(del)) {
                    const row = target.closest('.goods__row');
                    row.remove();
                    console.log('obj: ', obj);
                }
            });
        });
    });
    return arr;

};

const init = () => {
    overlayElem.classList.remove('active');
    renderGoods(arrGoods);



    btnModalOpen.addEventListener('click', () =>
        overlayElem.classList.add('active'));
    overlayElem.addEventListener('click', event => {
        const target = event.target;
        if (target === overlayElem || target.closest('.modal__close')) {
            overlayElem.classList.remove('active');
        }
    });

}
init();
