function showCategories() {
  const parentElement = document.getElementById('left');

  for (let categoryKey in categories) {
    const category = categories[categoryKey];

    let element = document.createElement('div');
    element.textContent = category.name;
    element.setAttribute('data-category', categoryKey)
    parentElement.appendChild(element);
  }
}

function showProducts(products, category) {
  const parentElement = document.getElementById('center');
  parentElement.innerHTML = '';
  const parentElement1 = document.getElementById('right');
  parentElement1.innerHTML = '';

  for (let product of products) {
    let element = document.createElement('div');
    element.textContent = `${product.name} $${product.price}`;
    element.setAttribute('data-product', product.id);
    element.setAttribute('data-category', category);

    parentElement.appendChild(element);
  }
}
//--------------------------------------------------------------------------
function showProductsInformation(product, category) {
  const parentElement = document.getElementById('right');
  parentElement.innerHTML = '';

  const element = document.createElement('div');
  element.textContent = `${product.name}  Price: $${product.price} Descriptions: ${product.description}`;
  element.setAttribute('data-product', product.id);

  const button = document.createElement('button');
  button.textContent = 'Buy';
  button.style.backgroundColor = 'lightgreen';

  parentElement.appendChild(element);
  parentElement.appendChild(button);

  const orderForm = document.querySelector('#order-form');

  button.addEventListener('click', function() {
    orderForm.style.display = 'block';
  });

  const messageDiv = document.querySelector('#message');

  button.addEventListener('click', function() {
    orderForm.style.display = 'block';
  });

  const orderButton = document.querySelector('#order-button');

  orderButton.addEventListener('click', function() {
    const productName = product.name; 
    const order = { productName, date: product.name, price: product.price };
    let orders = JSON.parse(localStorage.getItem(`orders-${category}`)) || [];
    orders.push(order);
    localStorage.setItem(`orders-${category}`, JSON.stringify(orders));
    messageDiv.textContent = 'Товар куплено!';
    orderForm.style.display = 'none';

    setTimeout(function() {
      messageDiv.textContent = '';
    }, 2000);
  });

  window.addEventListener('load', () => {
    tasks = JSON.parse(localStorage.getItem('ourTasks')) || [];
    showTasks();
  });

  document.getElementById('my-orders').addEventListener('click', () => {
    const str = document.forms[0].product.value;
    tasks.push(str);
    showTask(str, tasks.length - 1);
    localStorage.setItem('ourTasks', JSON.stringify(tasks));
  });
}
//--------------------------------------------------------------------------
function showTasks() {
  tasks.map((task, index) => showTask(task, index));
}

function showTask(task, index) {
  const parent = document.getElementById('tasks');
  const item = document.createElement('li');
  item.textContent = task;

  const btn = document.createElement('button');
  btn.setAttribute('type', 'button');
  btn.textContent = 'X';
  btn.setAttribute('data-task-index', index);
  btn.addEventListener('click', () => {
    tasks.splice(index, 1);
    localStorage.setItem('ourTasks', JSON.stringify(tasks));
    item.remove();
  });

  item.appendChild(btn)
  parent.appendChild(item);
}

//--------------------------------------------------------------------------


showCategories();

document.getElementById('left').addEventListener('click', event => {
  if (event.target.nodeName === 'DIV') {
    const categoryKey = event.target.getAttribute('data-category');
    const categoryProducts = categories[categoryKey].products;
    showProducts(categoryProducts, categoryKey);
  }
});

document.getElementById('center').addEventListener('click', event => {
  if (event.target.nodeName === 'DIV') {
    const productId = event.target.getAttribute('data-product');
    const categoryKey = event.target.getAttribute('data-category');

    const product = categories[categoryKey].products.find(product => product.id == productId);
    showProductsInformation(product, categoryKey);
   }
});

document.getElementById("order-form").addEventListener("submit", function(event) {
  event.preventDefault();
  let form = event.target;
  let isValid = form.checkValidity();
  if (!isValid) {
      alert("Будь ласка, заповніть усі обов'язкові поля");
      return;
  }
  let orderSummary = "Інформація про замовлення:<br>";
  orderSummary += "ПІБ покупця: " + form.elements["name"].value + "<br>";
  orderSummary += "Місто: " + form.elements["city"].value + "<br>";
  orderSummary += "Склад Нової пошти для надсилання: " + form.elements["warehouse"].value + "<br>";
  let paymentMethod = form.elements["payment-method"].value;
  if (paymentMethod === "cash-on-delivery") {
      paymentMethod = "Післяплати";
  } else if (paymentMethod === "credit-card") {
      paymentMethod = "Оплата банківською карткою";
  }
  orderSummary += "Спосіб оплати: " + paymentMethod + "<br>";
  orderSummary += "Кількість продукції, що купується: " + form.elements["quantity"].value + "<br>";
  orderSummary += "Коментар до замовлення: " + form.elements["comment"].value;
  document.getElementById("order-summary").innerHTML = orderSummary;
});



