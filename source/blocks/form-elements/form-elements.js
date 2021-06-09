import '../pagination/pagination';
$(document).ready(function(){
  let blockName = "text-field";
  let paginations = $(`.${blockName}__description`);
  let i=0;
  for(i=0; i< paginations.length ; i++ ){
    paginations[i].addEventListener('click', function() {
      console.log(`this = ${JSON.stringify(this)}`);
      $(this).css({'border':'10px solid red'});
    })
    console.log(`header_theme_UI-Kit.lenght = ${$('.header_theme_UI-Kit').length}`);
    $(paginations[i]).css({'border':`10px solid gren`});
  }
  clr(paginations[1]);
  crt(paginations[1],'калгон');
})

function crt(node,content){
  const li = document.createElement('span');
  li.classList.add(`__item`);
  li.innerHTML = content;
  node.appendChild(li);
}
function clr(node){
  node.innerHTML = "";
}