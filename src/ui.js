import { Basket, Product } from './basket';

const basketList = document.querySelector('.basket-list');
const buyAllBtn = document.querySelector('.btn-buy-all');
// Od razu tworzymy tablicę
const buyBtns = [...document.querySelectorAll('.btn-buy')];

// Tworzymy koszyk (nowy obiekt bazując na konstruktorze obiektu Basket)
const basket = new Basket();

// -------- Wyświetlamy zawartość koszyka po zmianie (dodaniu lub usunięciu produktu) ---------
const createBasketList = () => {
  // Usuwamy wszystko z <ul> nadając mu pusty string
  basketList.innerText = '';
  const summary = basket.getBasketSummary();

  // Od razu destrukturyzujemy obiekt, żeby skrócić kod
  for (const { id, text } of summary) {
    const newLi = document.createElement('li');
    newLi.innerText = text;
    newLi.dataset.id = id;
    basketList.append(newLi);
    // Tworzymy przycisk do usuwania produktu z koszyka
    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'Usuń';
    removeBtn.style.borderRadius = '5px';
    removeBtn.style.padding = '5px';
    removeBtn.style.margin = '5px auto';
    removeBtn.addEventListener('click', removeProductFromBasket);
    basketList.append(removeBtn);
  }

  const basketTotalValue = basket.getTotal().toFixed(2);
  buyAllBtn.innerText = `Złóż zamówienie na kwotę ${basketTotalValue} zł`;
  buyAllBtn.style.borderRadius = '5px';
  buyAllBtn.style.padding = '5px';

  if (basketTotalValue > 0) {
    buyAllBtn.disabled = false;
  } else {
    buyAllBtn.disabled = true;
    buyAllBtn.innerText = 'Koszyk pusty';
  }
  // to samo krócej, ale mniej czytelnie
  // buyAllBtn.disabled = basketTotalValue === 0
};

// ----- Dodajemy produkt do koszyka --------
const addProductToBasket = (event) => {
  const { name } = event.target.dataset;
  const price = Number(event.target.dataset.price);

  const newProduct = new Product(name, price);
  basket.add(newProduct);
  // Odświeżamy widok koszyka
  createBasketList();
};

// ---- Usuwamy wybrane produkty z koszyka -----
const removeProductFromBasket = (event) => {
  const id = Number(event.target.dataset.id);
  basket.remove(id);
  createBasketList();
};

// Kupujemy wybrane produkty i czyścimy zawartość koszyka
const buyAllProducts = () => {
  const basketTotalValue = basket.getTotal().toFixed(2);
  alert(`Kupiłeś produkty o wartości ${basketTotalValue} zł`);
  basket.clear();
  createBasketList();
};
// Robimy pętle, żeby dodać aEL na wszystkie przyciski

for (const btn of buyBtns) {
  btn.addEventListener('click', addProductToBasket);
}

buyAllBtn.addEventListener('click', buyAllProducts);

// Budujemy widok koszyka — jak nam się wczyta strona, to chcemy od razu zobaczyć zawartość koszyka
createBasketList();

export default addProductToBasket;
