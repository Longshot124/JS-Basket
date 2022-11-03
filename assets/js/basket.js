

let basket = JSON.parse(localStorage.getItem('basket'));

function decrease(event,id)
{
    let item = basket.find(x=>+x.Id===+id)
    if (item.Count>0) {
        item.Count--
    }
    else{
        alert("Mehsulu pozmaq ucun Del duymesine basin")
    }

   let span = event.target.nextElementSibling
   span.innerHTML = item.Count

   localStorage.setItem('basket',JSON.stringify(basket))
   
   console.log(basket);
    console.log(item);
  
}

function increase(event,id)
{
    let item = basket.find(x=>+x.Id ===+id)
    item.Count++
    let span = event.target.previousElementSibling
    span.innerHTML = item.Count
    localStorage.setItem('basket',JSON.stringify(basket))
    ShowAlert()
} 
function updateProductTotal(){
    let basket = JSON.parse(localStorage.getItem('basket'));
    var total = 0;
    for (let i = 0; i < basket.length; i++) {
        const cartRow = basket[i];
        var priceElement= cartRow.Price;
        var quantityElelemt = cartRow.Count;
        total = total+(priceElement*quantityElelemt)
        console.log(priceElement);
        console.log(total);

    }
    document.querySelector(".total-amount").innerText = total;
    localStorage.setItem('basket',JSON.stringify(basket))

}
// updateProductTotal();
function ShowAlert() {
    let basket = JSON.parse(localStorage.getItem('basket'));

    if(basket.length === 0) {
        document.getElementById('Alert').classList.remove('d-none')
        document.querySelector('table').classList.add('d-none')
    }
    else{
        document.getElementById('Alert').classList.add('d-none')
        document.querySelector('table').classList.remove('d-none')

        let list = '';

        basket.forEach((p, index)=> {
            list += `
            <tr>
                <td>${index + 1}</td>
                <td>
                    <img src="${p.Src}" alt="">
                </td>
                <td>${p.Name}</td>
                <td>
                <i style = "cursor:pointer;color:white" id="minus"  class="fa-solid fa-minus me-3" onclick = "decrease(event,${p.Id})">
                </i> <span id="currentCount">${p.Count}</span>
                <i style = "cursor:pointer;color:white" id="plus" class="fa-solid fa-plus ms-3" onclick = "increase(event,${p.Id})">
                </td>
                <td>${p.Price}</td>
                <td>${p.Price*p.Count}</td>
                <td>
                
                <button class="mt-3 w-50 btn btn-danger" onclick="RemoveItem(event,${p.Id})">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
                </td>
            </tr>
            `
        });
        let totall = '';
        basket.forEach(()=>{
            totall +=`
            <tr>
            <td class="total-amount">
                
            </td>
            </tr>
            `
        });

        
       
    
        document.querySelector('#tbody').innerHTML = list
      
       
        document.querySelector('#ttotal').innerHTML = totall
    }
    
}


ShowAlert();
updateProductTotal();


function RemoveItem(event,itemId){
    event.target.closest('tr').remove();
    let basket = JSON.parse(localStorage.getItem('basket'));
    let itemIndex = basket.findIndex(it=>it.Id==itemId);
    basket.splice(itemIndex,1);
    localStorage.setItem("basket",JSON.stringify(basket));
    console.log(basket);
    
    ShowAlert();
    CountBasket();
    
 }
 

