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

    var submitForm=document.getElementsByClassName('btn-primary');
    button.addEventListener('click',sendMail());

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
    discount(total);
}

function discount(total){
    
      var discount;
    if(total<100){
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
    document.getElementsByClassName('cart-total-dis')[0].innerText = 'No discount'}


    else if(total>100){
      if (total>100 && total<250){
        discount=15
        var dis=Math.round(15*total)/100
        var t=Math.round(total-dis)}

        else if(total>250 && total<500){
            discount=40
             var dis=Math.round(40*total)/100
             var t=Math.round(total-dis)}

             else if(total>500){
             discount=55
             var dis=Math.round(55*total)/100
             var t=Math.round(total-dis)}
            
         document.getElementsByClassName('cart-total-price')[0].innerText = 'Before discount:  $'+ total
         document.getElementsByClassName('cart-total-dis')[0].innerText = 'After discount of '+discount+'%'+' : $'+t}
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
  

   /* mail function */

   function sendMail(){
    
emailjs.send("service_l3blc1i","template_l1kvz73",{
name: document.getElementsByClassName('name')[0].value,

email: document.getElementsByClassName('email')[0].value,
message: document.getElementsByClassName('message')[0].value, 
});
   }


  
