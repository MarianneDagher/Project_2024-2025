if (document.readyState=='loading'){
   document.addEventListener('DOMContentLoaded',ready)
 }else{
   ready()
 }


 function ready(){
   var removeCartItemsButtons=document.getElementsByClassName('btn-danger')
 console.log('removeCartItemsButtons')

 for(var i=0; i<removeCartItemsButtons.length; i++){
    var button =removeCartItemsButtons[i]
    button.addEventListener('click',removeCartItem)}

  var addToCartButtons=document.getElementsByClassName("addCart")
   for(var i=0; i<addToCartButtons.length; i++){
    var button= addToCartButtons[i]
    button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

/*purchase button*/
function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}



 /*remove from cart*/

 function removeCartItem(event){
   var buttonClicked= event.target
       buttonClicked.parentElement.parentElement.remove()
       updateCartTotal()
 }
 
/*Update Cart*/

 function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}

/*Input quantity */
var quantityInputs = document.getElementsByClassName('cart-quantity-input')
for (var i = 0; i < quantityInputs.length; i++) {
    quantityInputs[i].addEventListener('change', function (event) {
        if (isNaN(event.target.value) || event.target.value <= 0) {
            event.target.value = 1
        }
        updateCartTotal()
    })
}
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}



/* add to cart*/

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('item-name')[0].innerText
    var price = shopItem.getElementsByClassName('item-price')[0].innerText
   
    addItemToCart(title, price)
    updateCartTotal()
  var quantityInputs = document.getElementsByClassName('cart-quantity-input')
 for (var i = 0; i < quantityInputs.length; i++) {
    quantityInputs[i].addEventListener('change', function (event) {
        if (isNaN(event.target.value) || event.target.value <= 0) {
            event.target.value = 1
        }
        updateCartTotal()
    })
}  
   
}

function addItemToCart(title, price) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
   
   }
