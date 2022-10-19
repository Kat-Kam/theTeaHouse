let date = new Date();

const produkt1 = {
  name: "Paris",
  article_Nr: "223344",
  price: 11.66,
  weightInGr: 100,
  amount: 1,
  data: date,
  bild_url: "img/bild10.jpeg",
};

const produkt2 = {
  name: "London",
  article_Nr: "112222",
  price: 14.99,
  weightInGr: 100,
  amount: 1,
  data: date,
  bild_url: "img/bild11.jpeg",
};

//function from task
function addToCart(produkt) {
  let cart = JSON.parse(localStorage.getItem("cart"));

  if (cart) {
    cart.push(produkt);
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    localStorage.setItem("cart", JSON.stringify([produkt]));
  }
}

// Product will be added in createTableInCart() to cart
// in function totalPrice() the total price is added to last row

function createTableInCart() {
  let removedProduct = false;
  let cart = JSON.parse(localStorage.getItem("cart"));

  let table = document.getElementsByTagName("table")[0];

  let lastRow = cart.length - 1;

  for (let i = 0; i < cart.length; i++) {
    let row = document.createElement("tr");
    row.style.height = "100px";

    for (let j = 0; j < 1; j++) {
      let cellImg = document.createElement("td");
      cellImg.style.width = "50px";
      let imgEl = document.createElement("img");
      imgEl.style.height = "75px";
      imgEl.src = cart[i].bild_url;
      cellImg.appendChild(imgEl);
      row.appendChild(cellImg);

      let cellName = document.createElement("td");
      let nameEl = document.createTextNode(cart[i].name);
      cellName.style.width = "200px";
      cellName.style.height = "100px";
      cellName.appendChild(nameEl);
      row.appendChild(cellName);

      let cellArtNr = document.createElement("td");
      cellArtNr.style.width = "200px";

      let choosenWeight = cart[i].weightInGr;
      console.log("choosenWeight" + choosenWeight);

      let artNrEl = document.createTextNode(cart[i].article_Nr);
      cellArtNr.appendChild(artNrEl);
      row.appendChild(cellArtNr);

      let cellPrice = document.createElement("td");
      cellPrice.style.width = "100px";
      let priceEl = document.createTextNode(cart[i].price);

      cellPrice.appendChild(priceEl);
      row.appendChild(cellPrice);

      let cellWeight = document.createElement("td");
      cellWeight.style.width = "100px";
      let weightEl = document.createTextNode(cart[i].weightInGr);
      cellWeight.appendChild(weightEl);
      row.appendChild(cellWeight);

      let cellAmount = document.createElement("td");
      cellAmount.style.width = "100px";
      let amountEl = document.createTextNode(cart[i].amount);
      cellAmount.appendChild(amountEl);
      row.appendChild(cellAmount);

      let cellButton = document.createElement("td");
      let buttonEl = document.createElement("button");

      buttonEl.addEventListener("click", function () {
        row.remove();
        cart.splice(i, 1);
        localStorage.setItem("cart", JSON.stringify(cart));

        location.reload(); //reloading page with new calculation
        totalPrice();
      });

      buttonEl.style.width = "50px";
      buttonEl.innerHTML = "x";
      cellButton.appendChild(buttonEl);
      row.appendChild(cellButton);

      table.appendChild(row);
    }

    if (i === lastRow) {
      totalPrice();
    }
  }
}

//Calculation of the total price and output in last row:

function totalPrice() {
  let priceSingleProduct;
  let cellTotalPriceText;

  let table = document.getElementsByTagName("table")[0];
  let row = document.createElement("tr");
  row.style.height = "200px";
  let cart = JSON.parse(localStorage.getItem("cart"));

  // Line
  cellLine = document.createElement("td");
  cellLineEl = document.createElement("hr");
  cellLine.style.width = "100px";
  cellLine.appendChild(cellLineEl);
  row.appendChild(cellLine);

  for (let i = 0; i < 1; i++) {
    for (let j = 0; j < 1; j++) {
      // TOTAL TEXT
      cellTotalPriceText = document.createElement("td");
      cellTotalPriceText.style.width = "75px";
      priceSingleProduct = document.createTextNode("TOTAL");
      cellTotalPriceText.appendChild(priceSingleProduct);
      row.appendChild(cellTotalPriceText);

      // empty cell
      cellEmpty = document.createElement("td");
      cellEmpty.style.width = "100px";
      cellEmptyEl = document.createTextNode("--");
      cellEmpty.appendChild(cellEmptyEl);
      row.appendChild(cellEmpty);

      // total price and output
      cellTotalPrice = document.createElement("td");
      cellTotalPrice.style.width = "75px";

      let singlePrice;
      let priceSum = 0;
      for (let i = 0; i < cart.length; i++) {
        singlePrice = JSON.parse(cart[i].price * cart[i].amount);
        priceSum = priceSum + singlePrice;
      }

      priceSum = priceSum.toFixed(2);
      priceAllProducts = document.createTextNode(priceSum);
      cellTotalPrice.appendChild(priceAllProducts);
      row.appendChild(cellTotalPrice);

      // Empty cell
      cellEmpty1 = document.createElement("td");
      cellEmpty1.style.width = "100px";
      cellEmptyEl1 = document.createTextNode("--");
      cellEmpty1.appendChild(cellEmptyEl1);
      row.appendChild(cellEmpty1);

      let cellAmount = document.createElement("td");
      cellAmount.style.width = "100px";

      let singleAmount;
      let amountSum = 0;
      for (let i = 0; i < cart.length; i++) {
        singleAmount = JSON.parse(cart[i].amount);
        amountSum = amountSum + singleAmount;
      }
      amountAllProducts = document.createTextNode(amountSum);
      cellAmount.appendChild(amountAllProducts);
      row.appendChild(cellAmount);
      table.appendChild(row);
    }
  }
}

function buttonProdukt2Deaktivieren() {
  disableBtn.disable = true;
  disableBtn.style.color = "lightgrey";
  disableBtn.style.boxShadow = "-5px -5px 0px lightgrey";
  disableBtn.style.borderColor = "white";
}

let produkt_1 = document.getElementById("produkt1");
let produkt_2 = document.getElementById("produkt2");

let disableBtn = document.getElementById("produkt2");
let pressedOnlyOnce = true;

if (produkt_1) {
  produkt_1.addEventListener("click", () => {
    addToCart(produkt1);
  });
}

if (produkt_2) {
  produkt_2.addEventListener("click", () => {
    if (pressedOnlyOnce) {
      addToCart(produkt2);
      buttonProdukt2Deaktivieren();
    } else {
      return;
    }
    pressedOnlyOnce = false;
  });
}
