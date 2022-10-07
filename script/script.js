'use strict';

const modalTitle = document.querySelector('.modal__title');
const overlayModal = document.querySelector('.overlay__modal');
const overlayElem = document.querySelector('.overlay');
const btnModalOpen = document.querySelector('.panel__add-goods');
const tableBody = document.querySelector('.table__body');
const form = document.querySelector('.modal__form');
const checkbox = form.elements.discount;
const inputCheckbox = form.elements.discount_count;

const vendorId = document.querySelector('.vendor-code__id');

// массив с данными
// в него добавляются новые товары
const arrGoods = [];

// util for createElement
const createElem = (tag, opts) => {
    const elem = document.createElement(tag);
    Object.assign(elem, opts);
    return elem;
};

// генерирует случайный id
// возращает id
const generateId = () => {
    const id = Date.now();
    vendorId.textContent = id;
    return id;
};

// пересчитывает массив с товарами и 
// вставляет число (от1 до длины массива)
const numberGood = (arr) => {
    console.log('arr.length', arr.length);
};


// считает общую сумму через перебор reduce
//! пушатся одно и то же значение, а не разные
// должна получать из фильрованного массива по значению 
// суммы по каждому товару
const getTotalPrice = (modalTotalVal, arr) => {
    let totalPrice = document.querySelector('.crm__total-price');
    const sum = [];
    arr.forEach(item => {
        item = modalTotalVal;
        sum.push(item);
    });
    console.log('sum: ', sum);
    const newSum = sum.reduce((prev, val) => {
        return prev + val;
    }, 0);
    totalPrice.textContent = `$ ${newSum}`;

    return {
        totalPrice,
    };
};

// сoздаем верстку строки-товара:
// в строку вставляем: все эелементы с аргументами + враппер кнопок
// в тело таблицы вставляем строку
// ----
// в аргументах деструктуризтрованный объект - полученный из формы, 
//! (кроме id, total, н/п) - это сами? как вставить данные?
// внутри присваивам значения id
// внутри присваиваем total - вся сумма товара, берем ее из вёрстки
// внутри втавляем номер по-порядку, который сам 
// ----
// но почему это всё в объекте аргумента, а не просто переменными?
// вставляем интерполяцией эти свойства из объекта
const createRow = ({ id, title, category, units, count, price, total }) => {
    id = vendorId.textContent;
    total = parseInt(form.total.value);
    console.log('total: ', total);

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
    td_title.textContent = `${title}`

    const tdSpanId = createElem('SPAN', {
        className: 'table__cell-id',
        textContent: `id: ${id}`,
    });
    td_title.append(tdSpanId);

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
        textContent: `$ ${total}`,
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
};

// добавляет новый товар в массив с данными
// товар, получен из данных формы
const addGoodData = ((data, good) => {
    data.push(good);
    return data;
});

// вызываем функцию построения строки с новым товаром
// если вставляем в тело таблицы строку, то баг ОбъектОбъект
const addGoodToPage = ((newGood) => {
    //tableBody.append(createRow(newGood));
    createRow(newGood);
});

// удаляет товар со страницы и из массива по нажатию на кнопку "удалить"
// в аргументах получает массив с данными
// перебирает все кнопки "удалить"
// каждой кнопке навешивает прослушиватель по клику
// действуем через делегирование
// проверка: если таргет содержит кнопку, то
// весь эелемент с классом .goods__row - удалить
// ----
// пересчитать массив:
// удалить из массива данных эелемент(товар) по индексу
// через filter, создать новый массив (чтобы не было "пусто")
// через splice -  не получалось
//! сейчас: если  удалить и снова добавить товары - массив ломается
//возращаем новый массив filtered
const deleteGood = (arr) => {
    const btnsDel = document.querySelectorAll('.table__btn_del');
    let filtered = [];

    btnsDel.forEach((del, index) => {
        del.addEventListener('click', (event) => {
            const target = event.target;
            if (target.contains(del)) {
                const row = target.closest('.goods__row');
                row.remove();
                delete arr[index];
                filtered = arr.filter(() => true);
                console.log('filtered: ', filtered);
            }
        });
    });
    return {
        filtered,
    };
};

//! для чего эта функция не понимаю? у меня нигде не участвует
// принимает массив с данными
// перебирает его на отдельные объекты
const renderGoods = (arr) => {
    arr.forEach((obj) => {
        createRow(obj);
        console.log('obj: ', obj);
    });
};

// контроль модалки
// при открытии модалки на кнопке "Добавить товар" -
// запуск функции генерации id
// при закрытии модалки: закрывае м и сбрасываем данные формы
//возращаем метод modalClose
const modalControl = () => {
    const modalOpen = () => overlayElem.classList.add('active');
    const modalClose = () => overlayElem.classList.remove('active');

    btnModalOpen.addEventListener('click', () => {
        generateId();
    });
    btnModalOpen.addEventListener('click', modalOpen);
    overlayElem.addEventListener('click', event => {
        const target = event.target;
        if (target === overlayElem || target.closest('.modal__close')) {
            modalClose();
            form.reset();
        }
    });
    return {
        modalClose,
    }
};

// контроль формы
// принимаем метод закрытия модалки
// навешиваем на форму прослушиватель submit
// скидываем дефолтные значения
// получаем значения из формы через FormData
// присваиваем новому товару - деструктуризтрованный объект
// -----
//! как total перенести в переменные в строке
//! часть фуyкций как-то перенести в init
// вызываем функции:
// добавить новый товар в массив с данными
// добавить новый товар как строку в телотаблицы
// удалить товар из массива данных
// -----
// расчитать общую сумму товаров, передать туда сумму по одному товару total
// закрыть модалку
// очистить данные формы
const formControl = (modalClose, arr) => {
    form.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const totalGood = parseInt(form.total.value);
        formData.set('total', totalGood);
        let total = +formData.get('total');

        const newGood = Object.fromEntries(formData);
        console.log('newGood: ', newGood);

        addGoodData(arr, newGood);
        addGoodToPage(newGood, tableBody);
        deleteGood(arr);

        getTotalPrice(total, arr);
        modalClose();
        //form.reset();
    });
};

// проверка дисконта
// слушатель по клику на чекбокс
// проверка включить: если чекбокс нажат, то инпут доступен
// иначе (чекбокс не нажат), очистить инпут и недоступен
const checkDiscount = () => {
    checkbox.addEventListener('click', e => {
        const target = e.target;
        if (target.checked === true) {
            inputCheckbox.removeAttribute('disabled');
        } else {
            inputCheckbox.value = '';
            inputCheckbox.setAttribute('disabled', 'disabled');
        }
    })
};

// функция вызова всех функций
// вызов рендеринга?
// вызов контроля модалки: забираем метод modalClose
// вызов закрытия модалки, чтобы ее не было при открытии сайта
// вызов контроля формы, в нее параметры закрытия модалки, массив данных
// вызов проверки дискаунта
// где-то должна быть функция номера по-порядку
const init = () => {
    renderGoods(arrGoods);
    const { modalClose } = modalControl();

    modalClose();

    formControl(modalClose, arrGoods);
    checkDiscount();
}
init();
