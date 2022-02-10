const searchTag = document.getElementsByClassName("search")[0];
const productTag = document.getElementsByClassName("productTag")[0];
let products;
const url = "https://fakestoreapi.com/products";

const UI = async () => {
  const fetchData = await fetch(url);
  products = await fetchData.json();
  searchUI();
};
UI().catch((error) => {
  console.log(error);
});

let filteredProductsArray = [];

const searchUI = () => {
  searchTag.style.display = "block";
  searchTag.addEventListener("keyup", (event) => {
    if (
      event.key === "ArrowDown" ||
      event.key === "ArrowUp" ||
      event.key === "Enter"
    ) {
      navigateAndSelectProduct(event.key);
      return;
    }

    productTag.innerHTML = "";
    const searchTagValue = event.target.value.toLowerCase();
    if (searchTagValue === "") {
      return;
    }
    filteredProductsArray = products.filter((product) => {
      return product.title.toLowerCase().includes(searchTagValue);
    });

    if (filteredProductsArray.length > 0) {
      for (let i = 0; i < filteredProductsArray.length; i++) {
        const productDiv = document.createElement("div");
        productDiv.id = filteredProductsArray[i].id;

        productDiv.classList.add("productDiv");

        const productDivText = document.createElement("span");
        const productDivImage = document.createElement("img");
        productDivImage.classList.add("img");
        productDivText.append(filteredProductsArray[i].title);
        productDivImage.src = filteredProductsArray[i].image;
        productDiv.append(productDivText, productDivImage);
        productTag.append(productDiv);
      }
    }
  });
  let indexToSelect = -1;

  const navigateAndSelectProduct = (key) => {
    if (key === "ArrowDown") {
      if (indexToSelect === filteredProductsArray.length - 1) {
        deselect();
        indexToSelect = -1;
        return;
      }

      indexToSelect += 1;
      select(indexToSelect);
      if (indexToSelect > 0) {
        deselect();
      }
    } else if (key === "ArrowUp") {
      indexToSelect -= 1;
      if (indexToSelect < 0) {
        indexToSelect = -1;
        deselect();
        return;
      }

      deselect();
      select(indexToSelect);
    } else {
      // if(key==="Enter")

      const getEnterDiv = document.getElementsByClassName("enter")[0];
      getEnterDiv.style.display = "block";
      searchTag.style.display = "none";
      productTag.style.display = "none";
      const img = document.createElement("img");
      img.classList.add("enterImg");
      const title = document.createElement("p");
      const price = document.createElement("p");
      const description = document.createElement("p");
      const rate = document.createElement("p");
      const count = document.createElement("p");
      img.src = filteredProductsArray[indexToSelect].image;
      title.textContent =
        "Title: " + filteredProductsArray[indexToSelect].title;
      price.textContent =
        "Price: " + filteredProductsArray[indexToSelect].price;
      description.textContent =
        "Description: " + filteredProductsArray[indexToSelect].description;
      rate.textContent =
        "Rate: " + filteredProductsArray[indexToSelect].rating.rate;
      count.textContent =
        "Count: " + filteredProductsArray[indexToSelect].rating.count;
      getEnterDiv.append(img, title, price, description, rate, count);
    }
    /*else{
        const EnterDiv=document.getElementsByClassName("enter")[0];
        EnterDiv.style.display="none";
        searchTag.style.display="block";
        productTag.stylr.display="block";
    }
    */
  };

  const select = (index) => {
    const selectedDivId = filteredProductsArray[index].id.toString();

    const selectedDiv = document.getElementById(selectedDivId);

    selectedDiv.className += " selected";
    selectedDiv.style.backgroundColor = "#3633eebc";
  };
  const deselect = () => {
    const deselectedDiv = document.getElementsByClassName("selected")[0];

    deselectedDiv.classList.remove("selected");
    deselectedDiv.style.backgroundColor = "white";
  };
};
