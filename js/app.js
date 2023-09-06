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

function showProductsInformation(product, category) {
  const parentElement = document.getElementById('right');
  parentElement.innerHTML = '';

  let element = document.createElement('div');
  element.textContent = `${product.name}  Price: $${product.price} Descriptions:${product.description}`;
  element.setAttribute('data-product', product.id);
    
  let button = document.createElement('button');
  button.textContent = 'Buy';
  button.style.backgroundColor = 'lightgreen';
  const messageDiv = document.querySelector('#message');
  let order = document.getElementById('#order-form');
  button.addEventListener("click", function() {
    document.getElementById("order-form").style.display = "block";
  });
  button.addEventListener('click', () => {
    messageDiv.textContent = 'Товар куплено!';  
    setTimeout(() => {
      messageDiv.textContent = '';
    }, 2000);
  });
    
  parentElement.appendChild(element);
  parentElement.appendChild(button);
}

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



