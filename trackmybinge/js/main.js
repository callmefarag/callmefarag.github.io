// Btn and dialog
let modal_saveBtn = document.querySelector("#Modal_SaveEntry");
let dialog = document.querySelector("dialog");
let dialog_close = document.querySelector("#modal_closeDialog");
let userDataAdd = document.querySelector("#userDataAdd");

// Modal Inputs
let entryName = document.querySelector("#entryName");
let entryEpisode = document.querySelector("#entryEpisode");
let entrySeason = document.querySelector("#entrySeason");

let showList;
let clearedValue = "";

// Set the local storage
if (localStorage.getItem("shows") !== null) {
  showList = JSON.parse(localStorage.getItem("shows"));
  display(showList);
} else {
  showList = [];
}

// Modal Save Button
modal_saveBtn.addEventListener("click", function () {
  const modalValidation = /^[a-zA-Z0-9\s]{3,30}$/;
  const numberRegex = /^[0-9]{1,2}$/;

  if (
    modalValidation.test(entryName.value) &&
    numberRegex.test(entrySeason.value) &&
    numberRegex.test(entryEpisode.value)
  ) {
    let entry = {
      name: entryName.value,
      episode: entryEpisode.value,
      season: entrySeason.value,
    };
    dialogDataGrabber(true);
    showList.push(entry);
    store(showList);
    display(showList);
    dialog.showModal();
    clearForm();
  } else {
    dialogDataGrabber(false);
  }
  dialog.showModal();
});

// Closing confirmation dialog
dialog_close.addEventListener("click", function () {
  dialog.close();
});

// Show the data in the dialog
function dialogDataGrabber(status) {
  let entryConfirmation = document.querySelector("#entryConfirmation");
  if (status == true) {
    entryConfirmation.innerHTML = `You've added ${entryName.value}, The latest EP you've watched was ${entryEpisode.value} of season ${entrySeason.value}`;
  } else {
    entryConfirmation.innerHTML = `Sorry, But the show's data you've just entered are not valid.
    ensure that the show's name is between 3-30 character, episode and season are 2 numbers maximum`;
  }
}

// The CRUD OPERATIONS START HERE

// Store to local storage
function store(list) {
  localStorage.setItem("shows", JSON.stringify(list));
}

// Display in the row
function display(list) {
  let displayArea = document.querySelector("#displayArea");
  displayArea.innerHTML = "";

  for (let i = 0; i < list.length; i++) {
    displayArea.innerHTML += `<tr id="row-${i}">
    <th scope="row">${i + 1}</th>
    <td>${list[i].name}</td>
    <td>${list[i].season}</td>
    <td>${list[i].episode}</td>
    <td>
      <span class="d-flex gap-3">
        <i class="fa-regular fa-pen-to-square" onclick="editShow(${i})" id="editEntry"></i>
        <i class="fa-solid fa-trash-can" id="deleteEntry" onclick="deleteShow(${i})"></i
      ></span>
    </td>
  </tr>
  <div id="editsForm" class="bg-transparent d-none">
  <div class="bg-transparent">
    <div class="bg-dark text-white p-4 rounded-5">
      <!-- From Here -->
      <div>
        <label for="editName-new" class="form-label">Show Name</label>
        <div class="input-group">
          <span
            class="input-group-text bg-dark text-white-50"
            id="editName-old"
            >Was ${list[i].name}
          </span>
          <input
            type="text"
            class="form-control bg-transparent border-success-subtle shadow-lg text-white"
            id="editName-new"
            aria-describedby="basic-addon3 basic-addon4"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <div class="mb-3">
            <label for="editSeason-new" class="form-label"
              >Current Season</label
            >
            <div class="input-group">
              <span
                class="input-group-text bg-dark text-white-50"
                id="editSeason-old"
                >Was ${list[i].season}
              </span>
              <input
                type="number"
                class="form-control bg-transparent border-success-subtle shadow-lg text-white"
                id="editSeason-new"
                aria-describedby="basic-addon3 basic-addon4"
              />
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="mb-3">
            <label for="editEp-new" class="form-label"
              >Current Episode</label
            >
            <div class="input-group">
              <span
                class="input-group-text bg-dark text-white-50"
                id="editEp-old"
                >Was ${list[i].episode}
              </span>
              <input
                type="number"
                class="form-control bg-transparent border-success-subtle shadow-lg text-white"
                id="editEp-new"
                aria-describedby="basic-addon3 basic-addon4"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="d-grid gap-2">
        <button
          type="button"
          name="saveedit"
          id="saveEdits"
          class="btn btn-success"
        >
          Save
        </button>
      </div>
      <!-- To Here -->
    </div>
  </div>
</div>`;
  }
}

// Delete shows from the list
function deleteShow(i) {
  showList.splice(i, 1);
  store(showList);
  display(showList);
}

// Edit shows on the list
function editShow(i) {
  const chosenShow = showList[i];
  const editsForm = document.querySelector("#editsForm");
  const editNameOld = document.querySelector("#editName-old");
  const editEpOld = document.querySelector("#editEp-old");
  const editSeasonOld = document.querySelector("#editSeason-old");

  editNameOld.textContent = `Was ${chosenShow.name}`;
  editEpOld.textContent = `Was ${chosenShow.episode}`;
  editSeasonOld.textContent = `Was ${chosenShow.season}`;

  const editNameNew = document.querySelector("#editName-new");
  const editEpNew = document.querySelector("#editEp-new");
  const editSeasonNew = document.querySelector("#editSeason-new");

  editNameNew.value = chosenShow.name;
  editEpNew.value = chosenShow.episode;
  editSeasonNew.value = chosenShow.season;

  editsForm.classList.remove("d-none");

  const saveEdits = document.querySelector("#saveEdits");
  saveEdits.addEventListener("click", function () {
    chosenShow.name = editNameNew.value;
    chosenShow.episode = editEpNew.value;
    chosenShow.season = editSeasonNew.value;

    store(showList);
    display(showList);
    editsForm.classList.add("d-none");
  });
}

// Waiting to save the changes
const saveEdits = document.querySelector("#saveEdits");
saveEdits.addEventListener("click", function () {
  const newShowName = document.querySelector("#editName-new").value;
  const newShowEpisode = document.querySelector("#editEp-new").value;
  const newShowSeason = document.querySelector("#editSeason-new").value;
  chosenShow = {
    name: newShowName,
    episode: newShowEpisode,
    season: newShowSeason,
  };
  store(showList);
  display(showList);
  editsForm.classList.add("d-none");
});

// Clear Form
function clearForm() {
  entryName.value = clearedValue;
  entryEpisode.value = clearedValue;
  entrySeason.value = clearedValue;
}
