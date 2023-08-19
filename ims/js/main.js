// Get all inputs from the product form
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");

// Declare some variables to be used
var clearedValue = "";
var productTable;
var char;
var matchedRows;

// Setting Main Array
var productList;

// Check if there's data in localStorage and initialize the productList
if (localStorage.getItem("products") !== null) {
  productList = JSON.parse(localStorage.getItem("products"));
  display(productList);
} else {
  productList = [];
}

// Creating a Product
function addingProduct() {
  product = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    description: productDescription.value,
  };

  productList.push(product);
  store(productList);
  display(productList);
  clearForm();
}
// Clearing Form (TB used on the clear button and the adding function)
function clearForm() {
  productCategory.value = clearedValue;
  productPrice.value = clearedValue;
  productName.value = clearedValue;
  productDescription.value = clearedValue;
}

//Displaying the product list in the table
function display(list) {
  productTable = "";

  for (var i = 0; i < list.length; i++) {
    productTable += `
        <tr id="row-${i}" class="text-center">
          <th scope="row">${i + 1}</th>
          <td>${list[i].name}</td>
          <td>${list[i].price}</td>
          <td>${list[i].category}</td>
          <td>${list[i].description}</td>
          <td class="d-flex align-content-center justify-content-center flex-sm-column flex-md-row">
            <button class="btn btn-outline-warning py-1 px-2 mx-md-2 my-1" onclick="returnDataToForm(${i})">
              Update
            </button>
            <button class="btn btn-outline-danger py-1 px-2 my-1" onclick="deleteProduct(${i})">
              Delete
            </button>
          </td>
        </tr>
      `;
  }

  document.getElementById("displayLocation").innerHTML = productTable;
}
display(productList);

// Store the productList
function store(list) {
  localStorage.setItem("products", JSON.stringify(productList));
}

// Delete Product From the list
function deleteProduct(i) {
  productList.splice(i, 1);
  display(productList);
  store(productList);
}

// Re-Show the product in the form
function returnDataToForm(i) {
  // Show the update button on the product entry form
  document.getElementById("updateBtn").classList.remove("d-none");
  document.getElementById("addBtn").classList.add("d-none");
  chosenProduct = productList[i];
  // Assigning product info. to the inputs value
  productCategory.value = productList[i].category;
  productPrice.value = productList[i].price;
  productName.value = productList[i].name;
  productDescription.value = productList[i].description;
  // Assign the product index to a visually hidden span
  document.getElementById("productID").innerText = i;
}

// Update the product information
function updateProduct() {
  var productId = document.getElementById("productID");
  var i = Number(productId.innerHTML);
  productList[i] = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    description: productDescription.value,
  };

  display(productList);
  store(productList);
  clearForm();

  document.getElementById("updateBtn").classList.add("d-none");
  document.getElementById("addBtn").classList.remove("d-none");
}

// THE BIG HEADACHE :D, (The MIGHTY) search bar ...

function search() {
  // Get the search input value and convert it to lowercase for case-insensitive comparison
  var char = document.getElementById("searchbar").value.toLowerCase();
  matchedRows = []; // Array to store matching table rows

  if (char === "") {
    // If the input field is empty, show all table rows and reset product names
    for (var i = 0; i < productList.length; i++) {
      var tableRow = document.getElementById(`row-${i}`);
      tableRow.style.display = "table-row";

      // Reset the product name back to its original (Remains colored issue)
      var productCell = tableRow.cells[1];
      productCell.innerHTML = productList[i].name;
    }
    return; // Exit the function early
  }

  for (var i = 0; i < productList.length; i++) {
    var productName = productList[i].name.toLowerCase();
    var tableRow = document.getElementById(`row-${i}`);
    var productCell = tableRow.cells[1]; // Catching the product name
    var originalProductName = productList[i].name;
    var highlightedProductName = "";

    var startIndex = 0;
    var searchIndex;
    var showRow = false;

    // Search for search string in the product name
    while ((searchIndex = productName.indexOf(char, startIndex)) !== -1) {
      showRow = true;
      var beforeMatch = originalProductName.substring(startIndex, searchIndex);
      var match = originalProductName.substring(
        searchIndex,
        searchIndex + char.length
      );
      highlightedProductName +=
        beforeMatch +
        `<span style="color: hsla(152, 100%, 50%, 1); font-weight: bold;">${match}</span>`;
      startIndex = searchIndex + char.length;
    }

    // Add the remaining part of the product name after the last matched character
    highlightedProductName += originalProductName.substring(startIndex);

    // Update the product name cell with the highlighted version
    productCell.innerHTML = highlightedProductName;

    // Show or hide the current table row based on search results
    if (showRow) {
      matchedRows.push(tableRow); // Add matching rows to the array
    } else {
      tableRow.style.display = "none"; // Hide non-matching rows
    }
  }

  // Show only the rows that match the search criteria
  for (var i = 0; i < matchedRows.length; i++) {
    matchedRows[i].style.display = "table-row";
  }
}

// Show some guides to make the entries matches with the rules
function showHelp() {
  var dialog = document.getElementById("dialog");
  dialog.style.opacity = 1;
  dialog.style.zIndex = 3;
}

// Show some guides to make the entries matches with the rules
function closeHelp() {
  var dialog = document.getElementById("dialog");
  dialog.style.opacity = 0;
  dialog.style.zIndex = -3;
}
