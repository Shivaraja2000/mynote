// Get elements
const addNoteBtn = document.getElementById('add-note-btn');
const noteText = document.getElementById('note-text');
const notesContainer = document.getElementById('notes-container');
const editIndex = document.getElementById('edit-index');

// Load existing notes from localStorage on page load
window.onload = function () {
  displayNotes();
};

// Add event listener to the "Add/Edit Note" button
addNoteBtn.addEventListener('click', function () {
  const text = noteText.value;
  const index = editIndex.value;

  if (text.trim() === '') {
    alert('Please write something in the note.');
    return;
  }

  if (index === '') {
    // Add new note if not in edit mode
    addNoteToLocalStorage(text);
  } else {
    // Edit existing note
    updateNoteInLocalStorage(index, text);
    editIndex.value = ''; // Clear edit mode
    addNoteBtn.textContent = 'Add Note'; // Reset button text
  }

  noteText.value = '';  // Clear the textarea
  displayNotes();
});

// Function to display notes
function displayNotes() {
  const notes = getNotesFromLocalStorage();
  notesContainer.innerHTML = '';  // Clear the container before displaying updated notes

  notes.forEach((note, index) => {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');

    const noteTextElement = document.createElement('p');
    noteTextElement.textContent = note;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function () {
      const isConfirmed = confirm('Are you sure you want to delete this note?');  // Confirmation prompt
      if (isConfirmed) {
        deleteNoteFromLocalStorage(index);  // Delete the note from localStorage
        displayNotes();  // Re-render the notes
      }
    });

    const editBtn = document.createElement('button');
    editBtn.textContent = '✎';
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', function () {
      noteText.value = note; // Fill textarea with the selected note
      editIndex.value = index; // Save the index for editing
      addNoteBtn.textContent = 'Edit Note'; // Change button to 'Edit'
    });

    noteElement.appendChild(noteTextElement);
    noteElement.appendChild(deleteBtn);
    noteElement.appendChild(editBtn);
    notesContainer.appendChild(noteElement);
  });
}

// Add note to localStorage
function addNoteToLocalStorage(note) {
  const notes = getNotesFromLocalStorage();
  notes.push(note);
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Update existing note in localStorage
function updateNoteInLocalStorage(index, updatedNote) {
  const notes = getNotesFromLocalStorage();
  notes[index] = updatedNote;
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Get notes from localStorage
function getNotesFromLocalStorage() {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  return notes;
}

// Delete note from localStorage
function deleteNoteFromLocalStorage(index) {
  const notes = getNotesFromLocalStorage();
  notes.splice(index, 1);  // Remove the note at the given index
  localStorage.setItem('notes', JSON.stringify(notes));  // Update localStorage
}


const isConfirmed = confirm('Are you sure you want to delete this note?');
if (isConfirmed) {
  // Proceed to delete
}



deleteBtn.addEventListener('click', function () {
    const isConfirmed = confirm('Are you sure you want to delete this note?');
    if (isConfirmed) {
      const noteElement = this.parentElement; // Get the current note element
      noteElement.classList.add('fade-out');  // Add the fade-out class for animation
  
      // Wait for the animation to complete before deleting the note
      setTimeout(function () {
        deleteNoteFromLocalStorage(index);  // Delete from localStorage
        displayNotes();  // Re-render the notes
      }, 500);  // 500ms matches the CSS animation duration
    }
  });
  