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

  for (let product of products) {
    let element = document.createElement('div');
    element.textContent = `${product.name} $${product.price}`;
    element.setAttribute('data-product', product.id);
    element.setAttribute('data-category', category);

    parentElement.appendChild(element);
  }
}

function showProductsInformation(product, category) {
  const parentElement1 = document.getElementById('center');
  const parentElement = document.getElementById('right');
  parentElement.innerHTML = '';

  let element = document.createElement('div');
  element.textContent = `${product.name}  Price: $${product.price} Descriptions:${product.description}`;
  element.setAttribute('data-product', product.id);
    
  let button = document.createElement('button');
  button.textContent = 'Buy';
  button.style.backgroundColor = 'lightgreen';
  button.addEventListener('click', () => {
    alert('Вітаю товар куплено !');
    parentElement.innerHTML = '';
    parentElement1.innerHTML = '';
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
    debugger
  }
});



