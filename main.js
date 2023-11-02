const ITEMS = [
    {
        id: 1,
        name: 'Iphone 14 Pro Max',
        price: 1099,
        image: 'images/iphone.jpg',
        qty: 1
    },
    {
        id: 2,
        name: 'Samsung Galaxy S23 Ultra',
        price: 1199,
        image: 'images/samsung_galaxy.jpg',
        qty: 1
    },
    {
        id: 3,
        name: 'Google Pixel 7 Pro',
        price: 899,
        image: 'images/google_pixel.jpg',
        qty: 1
    },
    {
        id: 4,
        name: 'One Plus 11 5G',
        price: 699,
        image: 'images/one_plus.jpg',
        qty: 1
    },
]

const openBtn = document.getElementById('open_chart_button')
const cart = document.getElementById('sidechart')
const closeBtn = document.getElementById('close_btn')
const backdrop = document.querySelector('.backdrop')
const itemsE1 = document.querySelector('.items')
const cartItems = document.querySelector('.chart_items')
const itemNum = document.getElementById("items_num")
const subTotal = document.getElementById("subtotal_price")

let cartData = []

openBtn.addEventListener('click', openCart)
closeBtn.addEventListener('click', closeCart)
backdrop.addEventListener('click', closeCart)

renderItems()
renderCartItems()

//open cart
function openCart(){
    cart.classList.add('open')
    backdrop.computedStyleMap.display = 'block'
    setTimeout(() => {
        backdrop.classList.add('show')
    }, 0)
    
}

//close cart
function closeCart(){
    cart.classList.remove('open')
    backdrop.classList.remove('show')

    setTimeout( () => {
        backdrop.computedStyleMap.display = 'none'
    }, 500)
}

//add items to cart
function addItem(idx, itemId){
    const foundedItem = cartData.find((item) => item.id.toString() === itemId.toString())

    if(foundedItem){
        increaseQty(itemId)
    }else{
        cartData.push(ITEMS[idx])
    }
    updateCart()
    openCart()
}

// remove cart items
function removeCartItems(itemId){
    cartData = cartData.filter((item) => item.id != itemId)
    updateCart()
}

//increase qty
function increaseQty(itemId){
    cartData = cartData.map(item => item.id.toString() === itemId.toString() ? { ...item, qty: item.qty + 1} : item)

    updateCart()
}

// decrease qty
function decreaseQty(itemId){
    cartData = cartData.map(item => item.id.toString() === itemId.toString() ? { ...item, qty: item.qty > 1 ? item.qty - 1 : item.qty} : item)

    updateCart()
}

//calculate item number
function calItemNum(){
    let count = 0
    cartData.forEach((item) => (count += item.qty))
    itemNum.innerText = count
}

//calculate subtotal
function subTotalPrice(){
    let subtotal = 0
    cartData.forEach((item) => (subtotal += item.price * item.qty))
    subTotal.innerText = subtotal
}

//Render Items
function renderItems(){
    ITEMS.forEach((item, idx)=> {
        const itemE1 = document.createElement('div')
        itemE1.classList.add('item')
        itemE1.onclick = () => addItem(idx, item.id)
        itemE1.innerHTML = `<img src="${item.image}" alt="">
        <button>Add to Cart</button>`
        itemsE1.appendChild(itemE1)
    })
}

//render/display cart items
function renderCartItems(){
    //remove everything from cart
    cartItems.innerHTML = ''
    //add new data
    cartData.forEach((item) => {
        const cartItem = document.createElement('div')
        cartItem.classList.add('chart_item')
        cartItem.innerHTML = `
        <div class="remove_item" onclick="removeCartItems(${item.id})">
            <span>&times</span>
        </div>
        <div class="item_img">
            <img src="${item.image}" alt="">
        </div>
        <div class="item_details">
            <p>${item.name}</p>
            <strong>$${item.price}</strong>
            <div class="qty">
                <span onclick="decreaseQty(${item.id})">-</span>
                <strong>${item.qty}</strong>
                <span onclick="increaseQty(${item.id})">+</span>
            </div>
        </div>`

        cartItems.appendChild(cartItem)
    })
}

function updateCart(){
    renderCartItems()
    calItemNum()
    subTotalPrice()
}