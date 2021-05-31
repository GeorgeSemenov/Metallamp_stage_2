import '../../vendor/nice-select/jquery-nice-select-1.1.0/js/jquery.nice-select.min.js';
let btnMinus = `<button type="button" aria-label="minus button" class="dropdown__math-operation dropdown__math-operation_minus"></button>`;
let btnPlus = `<button type="button" aria-label="plus button" class="dropdown__math-operation dropdown__math-operation_plus"></button>`;
let result = `<p class="dropdown__math-result"></p>`;
$(document).ready(function(){
  $('.dropdown').niceSelect();
  $('.dropdown ul').addClass('dropdown__options-container');
  $('.dropdown li').addClass('dropdown__option');
  $('.dropdown li').append(`<div class="dropdown__math-field"> ${btnMinus}${result}${btnPlus} </div>`);
  // $('.dropdown li').append(`<div class="dropdown__math-field"> ${btnMinus}${result}${btnPlus} </div>`);
})
