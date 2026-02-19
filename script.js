// Elements
const entryText = document.getElementById("entryText");
const saveButton = document.getElementById("saveEntry");
const entriesContainer = document.getElementById("entries");
const currentDate = document.getElementById("currentDate");

// Show Today's Date
const today = new Date();
currentDate.textContent = today.toDateString();

// Load Entries From Local Storage
let journalEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];

// Display Entries On Page Load
displayEntries();

// Save Entry
saveButton.addEventListener("click", () => {
  const text = entryText.value.trim();

  if (text === "") return;

  const entry = {
    content: text,
    date: new Date().toLocaleString()
  };

  journalEntries.unshift(entry);
  localStorage.setItem("journalEntries", JSON.stringify(journalEntries));

  entryText.value = "";
  displayEntries();
});

// Display Entries
function displayEntries() {
  entriesContainer.innerHTML = "";

  if (journalEntries.length === 0) {
    entriesContainer.innerHTML = "<p>No entries yet.</p>";
    return;
  }

  journalEntries.forEach((entry, index) => {
    const entryCard = document.createElement("div");
    entryCard.classList.add("entry-card");

    entryCard.innerHTML = `
      <div class="entry-date">${entry.date}</div>
      <div class="entry-content">${entry.content}</div>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;

    entriesContainer.appendChild(entryCard);
  });

  addDeleteListeners();
}

// Delete Entry
function addDeleteListeners() {
  const deleteButtons = document.querySelectorAll(".delete-btn");

  deleteButtons.forEach(button => {
    button.addEventListener("click", () => {
      const index = button.getAttribute("data-index");
      journalEntries.splice(index, 1);
      localStorage.setItem("journalEntries", JSON.stringify(journalEntries));
      displayEntries();
    });
  });
}
