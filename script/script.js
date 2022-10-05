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
const totalPrice = document.querySelector('.crm__total-price');
const modalTotal = form.total;

const arrGoods = [];

// util for createElement
const createElem = (tag, opts) => {
    const elem = document.createElement(tag);
    Object.assign(elem, opts);
    return elem;
};

const generateId = () => {
    const id = Date.now();
    vendorId.textContent = id;
    return id;
};

const getTotalPrice = (modalTotalVal) => {
    const sum = [];
    // const modalTotalVal = parseInt(modalTotal.value);

    sum.push(modalTotalVal);
    const newSum = sum.reduce((prev, val) => {
        return prev + val;
    }, 0);
    totalPrice.textContent = `$ ${newSum}`;
    return {
        totalPrice,
    };
};

const getModalTotal = () => {

}

const addGoodData = ((data, good) => {
    data.push(good);
    return data;
});

const createRow = ({ id, title, category, units, count, price, total }) => {
    id = vendorId.textContent;
    total = parseInt(form.total.value);

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

const addGoodToPage = ((newGood) => {
    tableBody.append(createRow(newGood));
});

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

const renderGoods = (arr) => {

    arr.forEach((obj) => {
        createRow(obj);
        console.log('obj: ', obj);
    });
};

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

const formControl = (modalClose, total) => {
    form.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newGood = Object.fromEntries(formData);

        console.log('newGood: ', newGood);

        addGoodToPage(newGood, tableBody);
        addGoodData(arrGoods, newGood);
        deleteGood(arrGoods);

        getTotalPrice(total);
        //form.reset();
        modalClose();
    });
};

const checkDiscount = () => {
    checkbox.addEventListener('click', e => {
        const target = e.target;
        if (target.checked === true) {
            console.log('target: ', target);
            inputCheckbox.removeAttribute('disabled');
        }
    })

    checkbox.addEventListener('click', e => {
        const target = e.target;
        if (target.checked === false) {
            console.log('target: ', target);
            inputCheckbox.value = '';
            inputCheckbox.setAttribute('disabled', 'disabled');
        }
    });
};
const init = () => {
    //renderGoods(arrGoods);
    const { modalClose } = modalControl();
    const { total } = createRow;
    modalClose();

    formControl(modalClose, total);
    console.log('total: ', total);
    checkDiscount();
}
init();
