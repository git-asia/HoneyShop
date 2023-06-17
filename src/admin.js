const addProductForm = document.querySelector('.form-add-product');
const inputName = document.querySelector('[name = "product-name"]');
const inputPrice = document.querySelector('[name = "product-price"]');
const productsList = document.querySelector('.products-list');

// --------- Dodawanie nowo stworzonych produktów do localStorage -------
// (ten sposób nie jest optymalny — lepsza była suma logiczna użyta w Baskecie
// — ale też często spotykany)

const saveAddedProductToLS = (name, price) => {
  // Pobieramy dotychczasową listę produktów
  const productList = JSON.parse(localStorage.getItem('offered-products')) ?? [];
  productList.push({ name, price });
  // Odsyłamy info do lS
  localStorage.setItem('offered-products', JSON.stringify(productList));
};

// ----- Funkcja, która pozwoli na dodawanie nowych produktów do oferty na podstawie
// danych wejściowych z formularza ------
const addProductToSalesOffer = (name, price) => {
  // Tworzymy elementy listy
  const newLi = document.createElement('li');
  const newStrong = document.createElement('strong');
  newStrong.innerText = name;
  const newPriceTxt = document.createTextNode(` - ${price.toFixed(2)} zł `);
  // Tworzymy przycisk i nadajemy mu klasę, atrybuty, treść i stylowanie zgodne z tymi w HTML
  const newProductBtn = document.createElement('button');
  newProductBtn.classList.add('.btn-buy');
  newProductBtn.dataset.name = name;
  newProductBtn.dataset.price = String(price);
  newProductBtn.innerText = 'Do koszyka';
  newProductBtn.style.borderRadius = '5px';
  newProductBtn.style.padding = '5px';
  newProductBtn.style.margin = '5px auto';
  newProductBtn.addEventListener('click', addProductToBasket);
  // Dodajemy poszczególne składowe do elementu newLi
  newLi.appendChild(newStrong);
  newLi.appendChild(newPriceTxt);
  newLi.appendChild(newProductBtn);
  // Dodajemy kompletne newLi do listy produktów
  productsList.append(newLi);
};
// Pobieramy dane z lS
const loadAddedProductFromLS = () => {
  const productList = JSON.parse(localStorage.getItem('offered-products')) ?? [];
  // destrukturyzacja od razu wstawiona do zmiennej
  for (const { name, price } of productList) {
    addProductToSalesOffer(name, price);
  }
};
// Czyścimy inputy
const clearData = () => {
  inputName.value = '';
  inputPrice.value = '';
};

// -------- Obsługa wysyłania formularza do dodawania produktów -------------
const handleAddProductFormSubmit = (event) => {
  // spowoduje, że przeglądarka nie przeładuje str.po submicie
  event.preventDefault();
  // wartość inputów formularza wyciągamy dopiero w momencie jego przesłania;
  // żeby dostać się do wartości przekazanej przez użytkownika używamy właściwości /.value/
  const nameFromInput = inputName.value;
  const priceFromInput = Number(inputPrice.value);

  // Wywołujemy callbacki
  clearData();
  addProductToSalesOffer(nameFromInput, priceFromInput);
  saveAddedProductToLS(nameFromInput, priceFromInput);
};

// aEL na submit nie klik, żeby obsłużyć też Enter
addProductForm.addEventListener('submit', handleAddProductFormSubmit);

// Wywołujemy funkcję
loadAddedProductFromLS();
