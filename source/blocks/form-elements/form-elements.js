import '../pagination/pagination';
$(document).ready(function(){
  let blockName = "text-field";
  // $(`.${blockName}__description`)
  //   .addEventListener('click', () => {
  //     console.log(`i'm clicked`);
  //   })
  let paginations = $(`.${blockName}__description`);
  //$(`.${blockName}__description`) возвращает коллекцию а не массив, 
  //у массива нет метода forEach, поэтому приходится использовать цикл for
  let i=0;
  for(i=0; i< paginations.length ; i++ ){
    console.log(i);
    paginations[i].addEventListener('click', () => {
        console.log(`this = ${$(this).attr("class")}`);
        $(this).parent().css({'border':'10px solid red'});
        console.log(`i'm clicked ${i}`);
      })
    // paginations[i].addEventListener('click', () => {console.log('ochen horosho');})
    // paginations[i].css({'border':'10px solid red'});
  }
  // $(`.${blockName}__description`).forEach((item,index)=>{
  //   console.log('loh '+ index);
  // })
  // $(`.text-field__description`).css({'border': '5px solid red'});
  console.log(`i'm here`)
})