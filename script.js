const books=[
{ id:1,title:'Jungle Adventure',author:'A. King',price:10,cat:'Adventure',desc:'Adventure story',img:'JungleA.png'},
{ id:2,title:'Lost Island',author:'B. Ray',price:12,cat:'Adventure',desc:'Island adventure',img:'LostI.png'},
{ id:3,title:'Mystery House',author:'C. Lee',price:9,cat:'Mystery',desc:'Spooky mystery',img:'MistryH.png'},
{ id:4,title:'Hidden Truth',author:'D. Kim',price:11,cat:'Mystery',desc:'Detective novel',img:'Hidden.png'},
{ id:5,title:'Love Story',author:'E. Rose',price:8,cat:'Romance',desc:'Romantic novel',img:'LoveS.png'},
{ id:6,title:'Forever Love',author:'F. Snow',price:10,cat:'Romance',desc:'Love drama',img:'ForeverL.png'},
{ id:7,title:'Science Basics',author:'G. Stone',price:14,cat:'Science',desc:'Basic science',img:'ScienceB.png'},
{ id:8,title:'Space World',author:'H. Moon',price:15,cat:'Science',desc:'Space science',img:'SpaceW.png'},
{ id:9,title:'Ocean Life',author:'I. Blue',price:13,cat:'Science',desc:'Marine science',img:'OceanL.png'},
{ id:10,title:'Secret Love',author:'J. Heart',price:9,cat:'Romance',desc:'Love story',img:'SecretL.png'}];

function displayBooks(list){
  const div=document.getElementById('bookList');
  div.innerHTML='';
  list.forEach(b=>{
    div.innerHTML+=`<div class='book'>
    <img src='${b.img}'><br>
    <b>${b.title}</b><br>${b.author}<br>$${b.price}<br>
    <button onclick='viewBook(${b.id})'>View</button></div>`;
  });
}

function filterBooks(cat){
  if(cat==='all')displayBooks(books);
  else displayBooks(books.filter(b=>b.cat===cat));
}

function viewBook(id){
  localStorage.setItem('book',JSON.stringify(books.find(b=>b.id===id)));
  location.href='book.html';
}

function loadBook(){
  const b=JSON.parse(localStorage.getItem('book'));
  img.src=b.img;title.innerText=b.title;author.innerText=b.author;
  price.innerText='$'+b.price;desc.innerText=b.desc;
}

function addToCart(){
  let cart=JSON.parse(localStorage.getItem('cart'))||[];
  const b=JSON.parse(localStorage.getItem('book'));
  const item=cart.find(i=>i.id===b.id);
  item?item.qty++:cart.push({...b,qty:1});
  localStorage.setItem('cart',JSON.stringify(cart));alert('Added');
}

function loadCart(){
  let cart=JSON.parse(localStorage.getItem('cart'))||[];
  let html='<tr><th>Book</th><th>Qty</th><th>Price</th><th>Remove</th></tr>';
  let total=0;
  cart.forEach((i,idx)=>{
    total+=i.price*i.qty;
    html+=`<tr><td>${i.title}</td><td>${i.qty}</td><td>$${i.price*i.qty}</td>
    <td><button onclick='removeItem(${idx})'>X</button></td></tr>`;
  });
  cartTable.innerHTML=html;total.innerText='Total: $'+total;
}

function removeItem(i){
  let cart=JSON.parse(localStorage.getItem('cart'));cart.splice(i,1);
  localStorage.setItem('cart',JSON.stringify(cart));loadCart();
}

function clearCart(){localStorage.removeItem('cart');loadCart();}

function validateForm(){
  if(!name.value||!email.value||!subject.value||!message.value){alert('Fill all');return false}
  alert('Message Sent');return false;
}

document.getElementById('bookList')&&displayBooks(books);
