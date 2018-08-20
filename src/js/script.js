// svg4everybody(); // иницализация полифила для IE



// $(document).ready(function(){
// AOS.init();
// });

// Если на проекте нет jQuery, но хочется $( document ).ready... (IE9+)

function ready(fn) {
  const classWrap = `books__content`;
  const classList = `books__list`;
  const classItem = `books__item`;
  const classTitle = `books__title`;
  const classPrice = `books__price`;

  const classWrapPagination = `books__pagination`;
  const classListPagination = `books__pagination-list`;
  const classLinkPagination = `books__pagination-link`;
  const classItemPagination = `books__pagination-item`;

  //количество книг на резрешении свыше 768
  const constTable = 8;
  //количество книг на мобилке до 768
  const constMobile = 3;

const books = {
    count: 256, 
    items: [
      {
        title: 'Правила мозга', 
        price: 700
      }, 
      {
        title: 'Всегда вовремя', 
        price: 920
      },
      {
        title: 'Супермен по привычке', 
        price: 590
      },
      {
        title: 'Работа как внутренняя игра', 
        price: 700
      },
      {
        title: 'Дзен-камера', 
        price: 840
      },
      {
        title: 'Быть интровертом', 
        price: 680
      }
    ]
  };

  //Добаляет элемент на страницу
  function addToPage(element, targetClass) {
    const wrap = document.querySelector(targetClass);
    wrap.appendChild(element);
  }


  function addItemsPagination(count) {
    const paginationListNode = createElement('ul', classListPagination);
    for (let i = 0; count > i; i++) {
      const paginationItemNode = createElement('li', classItemPagination);

      paginationItemNode.innerHTML = `
      <a href="#" class="${classLinkPagination}">${i+1}</a>`;

      paginationListNode.appendChild(paginationItemNode);
    }

    return paginationListNode;
  }

  //Удаляет элемент
  function removeFromPage(targetClass) {
    const element = document.querySelector(`.${targetClass}`);
    const parent = element.parentElement;
    parent.removeChild(element);
  }

  // Создание элeментов с классами
  function createElement(tag, classElement) {
    const element = document.createElement(tag);
    element.classList.add(classElement);
    return element;
  }

  //Добавляем элементы книг в общую обёртку
  function addItems(data) { 
    const booksListNode = createElement('div', classList);
    const items = data.items;

    for (let i = 0; items.length > i; i++) {
      const booksItemNode = createElement('div', classItem);
      booksItemNode.classList.add(classItem);
      booksItemNode.innerHTML = `
      <strong class="${classTitle}">${items[i].name}</strong>
      <p class="${classPrice}">
      ${items[i].price}
      </p>`;

      booksListNode.appendChild(booksItemNode);
    } 

    return booksListNode;
  }





  function toggleContent(button) {
    const btn = document.querySelector(button);

    if(!btn) {
      return;
  }

  btn.addEventListener('click', function(){
    removeFromPage(classList);
    addToPage(addItems(), '.books__content');
    });
  }

  toggleContent('.j-view-books');


  function calculatePageNumber(data) {
    if (window.matchMedia("(min-width: 768px)").matches) { // data.count = 76
      return Math.ceil(data.count / constTable);//constTable = 8
    } else  {
      return Math.ceil(data.count / constMobile);// constMobile = 3
    }
  }


  // Гипотеза: Расчитывает количество элементов на странице от медиа запроса
  function getItemsPerPage() {
    if (window.matchMedia("(min-width: 768px)").matches) {
      return 8;
    } else  {
      return 3;
    }  
  }

  function generateListener() {
    const paginationItems = document.querySelectorAll(`.${classItemPagination}`);
    
    paginationItems.forEach(function(elem, index) {
      elem.addEventListener('click', function() {
        getServerData(index + 1);
        console.log(index + 1);
      });
    });
  }
  // function formatterPagination() {
  //   const paginationItems = document.querySelectorAll(`.${classItemPagination}`);
    
  //   paginationItems.splice(5, paginationItems.length-1, "...");

  //   console.log(paginationItems);
  // }

  function getServerData(page, type = '') { 
    const perPage = getItemsPerPage();
    const xhr = new XMLHttpRequest();

    xhr.open('GET', `http://api.do-epixx.ru/htmlpro/bookstore/books/get/${page}/${perPage}/`);
    xhr.send();

    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4 && xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);

        const countPage = calculatePageNumber(data);// 10
        const paginationNode = addItemsPagination(countPage);
        removeFromPage(classListPagination);
        addToPage(paginationNode, `.${classWrapPagination}`);
        // вызываем функцию, которая форматирует пагинацию
        // formatterPagination();

        const booksNode = addItems(data);
        removeFromPage(classList);
        addToPage(booksNode, `.${classWrap}`);

        generateListener(classList);

      } else if (xhr.readyState !== 4) {
        // console.log(`жду полнойзагрузки: ${xhr.readyState}`);
      }
    };
  }

  generateListener(classList);
  getServerData(1);
}





  // const booksListNode = createElement('div', elementList);
  // const items = books.items;
  // const content = document.querySelector('.books__content');
  // console.log(content);
  // content.appendChild(booksListNode);
  // const booksItem = createItems(items);







ready();

