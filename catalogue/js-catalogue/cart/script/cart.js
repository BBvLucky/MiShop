
//Массив товаров

function addCard() { //создаём единую функцию добавления карточек товаров
    var goods = [ //создаём массив товаров
        {
            name: "Canon 600D",
            cost: 25694.26,
            shortDesc: "Короткое описание товара",
            fullDesc: "Подробное описание товара",
            img: 'img/canon-camera.jpg'
        },
        {
            name: "Mi Piston",
            cost: 699.95,
            shortDesc: "Короткое описание товара",
            fullDesc: "Подробное описание товара",
            img: "img/earphones.jpg"
        },
        {
            name: "Idea Pad",
            cost: 49990.56,
            shortDesc: "Подробное описание товара",
            fullDesc: "А всё равно никто не читает, можно писать что угодно",
            img: "img/lenovo.jpg"
        },
        {
            name: "Mi 8",
            cost: 38456.58,
            shortDesc: "Короткое описание товара",
            fullDesc: "Подробное описание товара",
            img: "img/mi8.jpg"
        },
        {
            name: "Mi Band 3",
            cost: 2499.89,
            shortDesc: "Короткое описание товара",
            fullDesc: "Подробное описание товара",
            img: "img/mi-band-3.jpg"
        },
        {
            name: "Mi Notebook",
            cost: 59785.16,
            shortDesc: "Короткое описание товара",
            fullDesc: "Подробное описание товара",
            img: "img/mi-notebook.jpg"
        },
        {
            name: "Play Station 3",
            cost: 12756.94,
            shortDesc: "Короткое описание товара",
            fullDesc: "Подробное описание товара",
            img: "img/ps-3.jpg"
        },
        {
            name: "Xperia Z5",
            cost: 49980.45,
            shortDesc: "Короткое описание товара",
            fullDesc: "Послений красивый смартфон от Sony",
            img: "img/sony-xperia.jpg"
        },
        {
            name: "Mi Selfie Stick Tripod",
            cost: 1350.91,
            shortDesc: "Короткое описание товара",
            fullDesc: "А у меня есть такой, прикольная штука",
            img: "img/tripod.jpg"
        }
    ];
    
    //Карточки товара
    
    var productWrapper = document.getElementsByClassName("products")[0]; //подтягиваем шаблон карточки товара из HTML-кода
    var productContainer = document.getElementsByClassName('product-cards')[0]; //контейнер для карточек
    
    for (let i = 0; i < goods.length; i++) { //добавляем карточки на страницу

        var productClone = productWrapper.cloneNode(true); //клонируем первую карточку, иначе карточки будут перезаписывать друг друга
        productContainer.appendChild(productClone); //добавляем карточки на страницу
        productClone.children[0].src = goods[i].img; //записываем данные из массива в карточки на странице
        productClone.children[1].innerHTML = goods[i].name; //записываем данные из массива в карточки на странице
        productClone.children[2].innerHTML = goods[i].shortDesc;
        productClone.children[4].innerHTML = goods[i].fullDesc; //записываем данные из массива в карточки на странице
        productClone.children[5].innerHTML = goods[i].cost + " руб"; //записываем данные из массива в карточки на странице
        }

    productContainer.removeChild(productWrapper); //удаляем "лишнюю" карточку

    var buyBtn = document.querySelectorAll(".cart-link"); //отлавливаем все кнопки, добавляющие товар в корзину

    var priceCounter = []; //объявляем массив с ценами
    var totalPrice = 0; //переменная, в которую будем записывать сумму цен товаров
    
    var orderInfo = document.getElementsByClassName('products-order')[0]; //подтягиваем шаблон карточки товара из выпадающего окна
    var orderWrapper = document.getElementById('order'); //обращаемся к обёртке карточек
    for (let i = 0; i < buyBtn.length; i++) { 
        buyBtn[i].onclick = function () {
                    priceCounter.push(goods[i].cost); //вносим суммы выбранных товаров в массив
                  

                    for (let i = 0; i < priceCounter.length; i++) {
                        totalPrice = totalPrice + priceCounter[i];

                    }
                    var mainPrice = document.getElementById('price-count'); //отлавливаем элемет, отображающий сумму покупок на главной странице
                    mainPrice.innerHTML = totalPrice.toFixed(2); // записываем в него итоговую сумму
                    
                    var orderPrice = document.getElementById('order-price'); //тоже самое для выпадающего окна
                    orderPrice.innerHTML = totalPrice.toFixed(2);

                    var productNumber = document.getElementById('goods-number'); //записываем количество товаров в корзине
                    productNumber.innerHTML = priceCounter.length;
                    
                
                    
                    var orderInfoClone = orderInfo.cloneNode(true);
                    orderInfoClone.children[0].innerHTML = goods[i].name;
                    orderInfoClone.children[1].innerHTML = goods[i].cost;
                    orderWrapper.appendChild(orderInfoClone);
                }
                
            }
            orderWrapper.removeChild(orderInfo);
}
window.onload = addCard;


