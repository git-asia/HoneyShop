export class Basket {
  // eslint-disable-next-line max-len
  // Początkowo tworzymy pusty koszyk — tablicę obiektów, kt docelowo będzie zawierała przechowywane w koszyku produkty.
  // Po dodaniu opcji localStorage modyfikujemy nasz konstruktor, który teraz będzie zawierał odniesienie do metody zwracającej dane z lS.
  //! Konstruktory działają synchronicznie – dopóki nie dostaniemy danych z lS, kod nie pójdzie dalej.
  constructor() {
    // W konstruktorze możemy tworzyć zmienne (np. dla zwiększenia czytelności kodu)
    const lSLoad = this.loadFromLocalStorage();
    // Operator trójargumentowy: jeśli lSL zwróci jakąś wartość (T), to wykonaj metodę lFLS(), jeśli zwróci null (F), stwórz pustą tablicę.
    this.items = lSLoad || [];

    // Jeszcze krótsze wersje (przy tych zapisach usuwamy const lSLoad, bo jej wartość wstawiliśmy bezpośrednio do wyrażenia)
    // 1. suma logiczna: jeśli lSL == F, to zrób [], a jeśli T, to wywołaj lSL;
    // this.items = this.loadFromLocalStorage() || []

    // 2. nullish operator: jeśli lSL == null or undefined, to zrób [], a jeśli T, to wywołaj lSL;
    // this.items = this.loadFromLocalStorage() ?? []

    // Powyższe zapisy dokładnie odpowiada temu:
    // if (lSLoad) {
    //     this.items = lSLoad
    // } else {
    //     this.items = []
    // }       //
  }

  // Koszyk możemy wyczyścić...
  clear() {
    this.items.length = 0;
    this.saveToLocalStorage();
  }

  // ...lub coś do niego dodać
  add(item) {
    this.items.push(item);
    this.saveToLocalStorage();
  }

  // Zliczamy wartość cenową produktów, które mamy w koszyku
  getTotal() {
    return this.items.reduce((prev, product) => prev + product.price, 0);
  }

  // Info co mamy w koszyku oraz ile kosztują poszczególne produkty
  getBasketSummary() {
    return this.items
      .map((product, i) => ({
        id: i + 1,
        text: `${i + 1} - ${product.name} - ${product.price.toFixed(2)} zł`,
      }));
  }

  // Możemy usunąć wybrany produkt z koszyka
  remove(number) {
    this.items.splice(number - 1, 1);
    this.saveToLocalStorage();
  }

  // Przechowywanie zawartości koszyka w localStorage (musimy zmienić obiekt na stringa).
  // Wywołujemy w każdym miejscu, gdzie koszyk ulega zmianie.
  saveToLocalStorage() {
    localStorage.setItem('basket-items', JSON.stringify(this.items));
  }
  // Odczytywanie (get) i pobieranie (return) wartości przechowywanych w localStorage — musimy z powrotem zmienić stringa na obiekt (parse) lub tworzymy pustą tablicę, jeśli lS nie przechowuje żadnych wartości.
  // Wywołujemy w konstruktorze Basketa.

  loadFromLocalStorage() {
    return JSON.parse(localStorage.getItem('basket-items'));
    /// / inna prosta acz długa wersja
    // const jsonItem = localStorage.getItem('basket-items')
    // if (jsonItem === null) {
    //     return[]
    // } else {
    //     return JSON.parse(jsonItem)
    // }
  }
}

export class Product {
  constructor(productName, productPrice) {
    this.name = productName;
    this.price = productPrice;
  }
// Zmiana ceny produktu-funkcja stworzona 'na zapas' na razie nieużywana
//     setNewPrice(newPrice) {
//          this.price = newPrice
//     }
}

// // Sprawdzanie kodu
// const shopBasket = new Basket();
// const oranges = new Product('Pomarańcze luz', 6.99)
// const cucumbers = new Product('Ogórki gruntowe', 3)
//
// shopBasket.add(cucumbers)
// shopBasket.add(cucumbers)
// shopBasket.add(oranges)
//
// shopBasket.remove(2)
// shopBasket.add(cucumbers)
// shopBasket.add(oranges)
// shopBasket.showBasket()
// console.log(shopBasket.getTotal())
