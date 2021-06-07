$(document).ready(function(){
  let blockName = "pagination";
  //array.from принимает итерируемый объект, в котором указанна его длина, и создаёт полноценный массив
  //map преобразует, принимая(item,index) массив в другой массив, в котором будут только элементы с номеро индекса
  const data = Array.from({ length: 100 })
                    .map((_, i) => `Item ${(i + 1)}`) ;
  //console.log(JSON.stringify(data));//[Item 1, Item 2 ... Item 100]
  //-------------------------------------------------------
  const html = {//Это объект, в котором есть метод get, который примиает css селектор 
                //и возвращает первый dom элемент во всё документе, который удовлет этому селектору.
                //И это достаточно плохо, вдруг у меня будет несколько пагинаций, тогда работать будет только одна.
                //Поэтому нужно заменить все html методы на другие, более конкретные и универсальные.
      get(element) {
          return document.querySelector(element);
      }
  };

  let perPage = 5;
  const state = {
      page : 1,//Активная страница по умолчанию.
      perPage, //Указывает сколько item-ов будет отображенн на стринце в __content
      totalPage: Math.ceil( data.length / perPage ),//указывает на общее количество страниц. ceil - округляет вверх. при perPage=5 данное значение будт = 20
      maxVisibleButtons: 5//Количество видимых кнопок(кроме стрелок)
  };

  const controls = {
      next() {
        const isLastPage = state.page === state.totalPage;// true или false - это проверка, добрался ли ты до конца
        if (!isLastPage) state.page++;
      },
      prev() {
        const isFirstPage = state.page === 1;//true или false - проверка, добрался ли ты до начала.
        if (!isFirstPage) state.page--;
      },
      goTo(pageNumber) {
          if (pageNumber < 1 || pageNumber > state.totalPage) return;
          state.page = pageNumber;
      },
      createListeners() {
          $(`.${blockName}__arrow_left`)
              .addEventListener('click', () => { 
                  this.next();
                  update(); 
          });
          $(`.${blockName}__arrow_right`)
              .addEventListener('click', () => { 
                  this.prev();
                  update(); 
          });
      }
  };
  const list = {
      create(content) {
          const li = document.createElement('li');
          li.classList.add(`${blockName}__item`);//classList-псевдомассив всех классов элемента.
          li.innerHTML = content;//innerHTML - выводит или устанавливает содержимое узла.
          html.get('.list').appendChild(li);//создаём item для списка.
      },
      update() {
          html.get('.list').innerHTML = "";
          let page = state.page - 1;//индекс страницу в массиве страниц (если бы он ещё был.). Надо бы переименовать данную переменную, на более подходящее название.
          let start = page * state.perPage;//Единовременно на страницу будет отображате количество item-ов от start до end
          let end = start + state.perPage;
          const paginatedItems = data.slice(start, end);/*из массива данных извлекается нужный отрезок*/
          paginatedItems.forEach(list.create);//Этот отрезов выводится на экран.
      }
  };
  const buttons = {    
      element: html.get('.pagination .numbers'), //находим контэйнер с числами
      create(page) {//создаёт кнопку хорошо бы внутрь класть ещё и кнопку
          const button = document.createElement('li');
          button.innerHTML = page;
          if (state.page === page){
              button.classList.add('active');
          }
          button.addEventListener('click', () => { 
              controls.goTo(page);
              update(); 
          });
          this.element.appendChild(button);
      },
      update() {
          this.element.innerHTML = "";
          const { maxLeft, maxRight } = this.calculateMaxVisible();
          for(let page = maxLeft; page <= maxRight; page++) {
              buttons.create(page);
          }
      },
      calculateMaxVisible() {//возвзращает крайние значения номеров страниц с учётом state.maxVisibleButtons
          const { maxVisibleButtons } = state;
          let maxLeft = (state.page - Math.floor(maxVisibleButtons / 2));//максимально левое число, в начале это 1 
          let maxRight = (state.page + Math.floor(maxVisibleButtons / 2));//максимально правое число, в начале это 5
          if (maxRight > state.totalPage) {//Если уприаемся в правый край, то maxRight = последнему элементу.
              maxLeft = state.totalPage - ( maxVisibleButtons - 1 );
              maxRight = state.totalPage;
          }
          if(maxLeft < 1) {
              maxLeft = 1;
              maxRight = maxVisibleButtons;
          } 
          return {maxLeft, maxRight};
      }
  }
  const update = () => { 
      list.update();
      buttons.update(); 
  };
  const init = () => {
      list.update();
      buttons.update();
      controls.createListeners();
  };

  init();

})
