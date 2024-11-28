const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedContainer = document.getElementById("completed-container"); // New container for completed tasks

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        // Add delete button
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // Unicode for "×" symbol
        li.appendChild(span);

        // Add edit button
        let eBtn = document.createElement("button"); 
        eBtn.innerHTML = '<i class="fas fa-edit"></i>';
        li.appendChild(eBtn); // Add edit button

        // Add edit functionality
        eBtn.addEventListener('click', () => {
            let currentText = li.firstChild.textContent; // Get the current task text

            // Create an input field for editing
            let inputField = document.createElement("input");
            inputField.type = "text";
            inputField.value = currentText; // Pre-fill with current task text
            li.firstChild.textContent = ''; // Clear the current text
            li.insertBefore(inputField, eBtn); // Insert input before edit button

            // Add save functionality to input field
            inputField.addEventListener('keydown', (event) => {
                if (event.key === "Enter") { // Save on pressing Enter
                    li.firstChild.textContent = inputField.value; // Update the task with new text
                    inputField.remove(); // Remove input field
                    saveData();
                }
            });

            // Optionally, focus the input field for convenience
            inputField.focus();
        });

        // Add delete functionality
        span.addEventListener('click', () => {
            li.remove();
            saveData();
        });
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");

        // If task is checked, move it to the completed tasks container
        if (e.target.classList.contains("checked")) {
            completedContainer.appendChild(e.target); // Move to completed container
            const editButton = e.target.querySelector("button");
            editButton.remove(); // Remove the edit button
        } else {
            listContainer.appendChild(e.target); // Move it back to the main container
            const eBtn = document.createElement("button");
            eBtn.innerHTML = '<i class="fas fa-edit"></i>';
            e.target.appendChild(eBtn); // Re-add edit button
        }

        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// Add functionality to handle clicks in the completed tasks container
completedContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.remove("checked"); // Uncheck the task

        // Move the task back to the main list container
        listContainer.appendChild(e.target);

        // Re-add the edit button when moving the task back
        const eBtn = document.createElement("button");
        eBtn.innerHTML = '<i class="fas fa-edit"></i>';
        e.target.appendChild(eBtn); // Re-add edit button

    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove(); // Delete the task from completed
        saveData();
    }

    saveData();
}, false);

// Data save and restore
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
    localStorage.setItem("completedData", completedContainer.innerHTML); // Save completed tasks
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    completedContainer.innerHTML = localStorage.getItem("completedData"); // Restore completed tasks
}
showTask();
