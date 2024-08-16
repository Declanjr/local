document.addEventListener('DOMContentLoaded', (event) => {
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    dateInput.value = today;
});

// Function to generate the reference number
   function generateReference() {
    // Get the current number and fiscal year from local storage
    let currentNumber = localStorage.getItem('currentNumber') || '000000';
    let storedFiscalYear = localStorage.getItem('fiscalYear') || '';

    currentNumber = parseInt(currentNumber, 10);

    // Calculate the current fiscal year
    let today = new Date();
    let year = today.getFullYear();
    let fiscalYear = (today.getMonth() + 1 >= 7) ? year + 1 : year; // Fiscal year starts in July
    let fiscalYearSuffix = fiscalYear.toString().slice(-2); // Last two digits

    // Reset the sequence number if the fiscal year has changed
    if (storedFiscalYear !== fiscalYearSuffix) {
        currentNumber = 1; // Reset to 1
    } else {
        currentNumber += 1; // Increment if the fiscal year hasn't changed
    }

    // Pad the number to 6 digits
    let paddedNumber = String(currentNumber).padStart(6, '0');

    // Combine to form the reference
    let reference = `${paddedNumber}/${fiscalYearSuffix}`;

    // Return both the reference and the fiscal year
    return { reference, currentNumber, fiscalYearSuffix };
}

// Function to set the reference number on page load
function setInitialReference() {
    // Generate a reference number
    const { reference } = generateReference();

    // Set the reference number in the input field
    document.getElementById('reference').value = reference;
}

// Function to handle form submission
function submitForm() {
    // Retrieve the reference number and fiscal year
    const { reference, currentNumber, fiscalYearSuffix } = generateReference();

    // Set the reference number in the input field (if needed again)
    document.getElementById('reference').value = reference;

    // Store the updated number and fiscal year in local storage
    localStorage.setItem('currentNumber', currentNumber);
    localStorage.setItem('fiscalYear', fiscalYearSuffix);

    // Simulate form submission
    alert(`Form submitted for approval! Reference: ${reference}`);

    // Additional logic for form submission can go here
    // For example, send form data to a server or process it further

    // Optionally, reset the form fields
    // document.querySelector('form').reset();
}

// Dummy function for cancel button
function cancelForm() {
    alert('Form cancelled.');
}

// Initialize the reference number when the page loads
document.addEventListener('DOMContentLoaded', function () {
    setInitialReference();
    document.getElementById('submit-button').addEventListener('click', submitForm);
    document.getElementById('cancel-button').addEventListener('click', cancelForm);
});

//Staff Information
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const staffIdInput = document.getElementById('staff-id');
    const nameInput = document.getElementById('name');
    const titleInput = document.getElementById('title');
    const departmentInput = document.getElementById('department');
  
    // Debounced function for fetching staff details
    const fetchStaffDetails = debounce(function() {
      const staffId = staffIdInput.value.trim();
  
      if (staffId) {
        fetch(`/api/staff/${staffId}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Staff not found');
            }
            return response.json();
          })
          .then(data => {
            nameInput.value = data.name;
            titleInput.value = data.title;
            departmentInput.value = data.department;
          })
          .catch(error => {
            console.error(error);
            nameInput.value = '';
            titleInput.value = '';
            departmentInput.value = '';
          });
      } else {
        nameInput.value = '';
        titleInput.value = '';
        departmentInput.value = '';
      }
    }, 300); // 300ms delay
  
    staffIdInput.addEventListener('input', fetchStaffDetails);
  });

//Proposer and Approver ID
document.addEventListener('DOMContentLoaded', function () {
    const proposerInput = document.getElementById('proposer_id');
    const approvedInput = document.getElementById('approved_id');

    // Create suggestion containers for each input
    const proposerSuggestionsContainer = document.createElement('div');
    proposerSuggestionsContainer.classList.add('suggestions-container');
    proposerInput.parentNode.insertBefore(proposerSuggestionsContainer, proposerInput.nextSibling);

    const approvedSuggestionsContainer = document.createElement('div');
    approvedSuggestionsContainer.classList.add('suggestions-container');
    approvedInput.parentNode.insertBefore(approvedSuggestionsContainer, approvedInput.nextSibling);

    const fetchNameSuggestions = async (query, inputElement, suggestionsContainer) => {
        try {
            const response = await fetch(`/api/staff?q=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error('Staff not found');
            }
            const data = await response.json();
            displaySuggestions(data, inputElement, suggestionsContainer);
        } catch (error) {
            console.error(error);
            displaySuggestions([], inputElement, suggestionsContainer);
        }
    };

    const displaySuggestions = (data, inputElement, suggestionsContainer) => {
        suggestionsContainer.innerHTML = ''; // Clear existing suggestions

        if (data.length === 0) {
            suggestionsContainer.style.display = 'block'; // Show container for 'No user found'
            const noUserFound = document.createElement('div');
            noUserFound.textContent = 'No user found';
            noUserFound.classList.add('no-user-found');
            suggestionsContainer.appendChild(noUserFound);
            return;
        }

        suggestionsContainer.style.display = 'block'; // Show suggestions container when data is available
        data.forEach(user => {
            const suggestion = document.createElement('div');
            suggestion.textContent = `${user.name} (${user.id})`;
            suggestion.classList.add('suggestion');

            // When a suggestion is clicked, populate the input field
            suggestion.addEventListener('click', () => {
                // Populate the input with the selected suggestion
                inputElement.value = user.name; // Fill input with the user's name or any desired attribute
                suggestionsContainer.innerHTML = ''; // Clear suggestions
                suggestionsContainer.style.display = 'none'; // Hide suggestions after selection
            });

            suggestionsContainer.appendChild(suggestion);
        });
    };

    const debounce = (func, delay) => {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    };

    const handleInputChange = debounce(function (event) {
        const query = event.target.value.trim();
        const suggestionsContainer = event.target.id === 'proposer_id'
            ? proposerSuggestionsContainer
            : approvedSuggestionsContainer;

        if (query) {
            fetchNameSuggestions(query, event.target, suggestionsContainer);
        } else {
            event.target.value = '';
            suggestionsContainer.innerHTML = ''; // Clear suggestions when input is empty
            suggestionsContainer.style.display = 'none'; // Hide container when input is empty
        }
    }, 300);

    proposerInput.addEventListener('input', handleInputChange);
    approvedInput.addEventListener('input', handleInputChange);

    // Hide suggestions when clicking outside
    document.addEventListener('click', function (event) {
        if (!proposerSuggestionsContainer.contains(event.target) && !proposerInput.contains(event.target)) {
            proposerSuggestionsContainer.style.display = 'none';
        }
        if (!approvedSuggestionsContainer.contains(event.target) && !approvedInput.contains(event.target)) {
            approvedSuggestionsContainer.style.display = 'none';
        }
    });
});



//DATE CALCULATION
document.addEventListener("DOMContentLoaded", function () {
    const departureInput = document.getElementById('departure_id');
    const tableBody = document.getElementById('tableBody');
    const addRowButton = document.getElementById('addRowButton');
    const returnDateInput = document.getElementById('return_date');
    const missionDurationInput = document.getElementById('mission_duration');
    const errorModal = document.getElementById('errorModal');
    const errorMessage = document.getElementById('errorMessage');
    const closeModal = document.getElementById('closeModal');

    // Function to show error modal
    function showError(message) {
        errorMessage.textContent = message;
        errorModal.style.display = 'flex';
    }

    // Close modal
    closeModal.addEventListener('click', function () {
        errorModal.style.display = 'none';
    });

    // Automatically set the "Date From" of the first destination row
    departureInput.addEventListener('change', function () {
        if (isDateInPast(departureInput.value)) {
            showError("The departure date cannot be in the past.");
            departureInput.value = ''; // Clear the input
            return;
        }

        const firstDateFrom = tableBody.querySelector('.dateFrom');
        firstDateFrom.value = departureInput.value;
        calculateDaysAndNights();
        updateReturnDate();
    });

    // Add new row functionality
    addRowButton.addEventListener('click', function () {
        const lastRow = tableBody.querySelectorAll('tr')[tableBody.querySelectorAll('tr').length - 2];
        const newRow = lastRow.cloneNode(true);

        // Reset inputs
        const inputs = newRow.querySelectorAll('input');
        inputs.forEach(input => {
            if (input.name === 'location') {
                input.value = '';
            } else if (input.name === 'date_from') {
                input.value = lastRow.querySelector('.dateTo').value;
            } else {
                input.value = '';
            }
        });

        newRow.querySelector('.days').textContent = '';
        newRow.querySelector('.nights').textContent = '';

        // Add event listener for date changes
        newRow.querySelector('.dateTo').addEventListener('change', dateToChangeHandler);
        newRow.querySelector('.dateFrom').addEventListener('change', dateFromChangeHandler);

        // Append new row
        tableBody.insertBefore(newRow, tableBody.lastElementChild);

        calculateDaysAndNights();
        updateReturnDate();
    });

    // Handle "Date From" changes
    function dateFromChangeHandler() {
        const row = this.closest('tr');
        const dateFrom = this.value;

        if (isDateInPast(dateFrom)) {
            showError("The 'Date From' cannot be in the past.");
            this.value = '';
            return;
        }

        calculateDaysAndNights();
        updateReturnDate();
    }

    // Handle "Date To" changes
    function dateToChangeHandler() {
        const row = this.closest('tr');
        const dateFrom = row.querySelector('.dateFrom').value;
        const dateTo = this.value;

        if (new Date(dateTo) < new Date(dateFrom)) {
            showError("The 'Date To' cannot be earlier than 'Date From'.");
            this.value = '';
            return;
        }

        if (isDateInPast(dateTo)) {
            showError("The 'Date To' cannot be in the past.");
            this.value = '';
            return;
        }

        calculateDaysAndNights();
        updateReturnDate();
    }

    // Calculate days and nights
    function calculateDaysAndNights() {
        let totalDays = 0;
        let totalNights = 0;

        const rows = tableBody.querySelectorAll('tr');

        rows.forEach((row, index) => {
            if (index === rows.length - 1) return; // Skip total row

            const dateFromInput = row.querySelector('.dateFrom');
            const dateToInput = row.querySelector('.dateTo');

            if (!dateFromInput.value || !dateToInput.value) return;

            const dateFrom = new Date(dateFromInput.value);
            const dateTo = new Date(dateToInput.value);

            const timeDifference = dateTo - dateFrom;
            const daysSpent = Math.ceil(timeDifference / (1000 * 3600 * 24));

            const daysCell = row.querySelector('.days');
            const nightsCell = row.querySelector('.nights');

            if (index === 0) {
                daysCell.textContent = daysSpent + 1; // Add one for the first destination
            } else {
                daysCell.textContent = daysSpent;
            }
            nightsCell.textContent = daysSpent;

            totalDays += parseInt(daysCell.textContent);
            totalNights += daysSpent;
        });

        document.getElementById('totalDays').textContent = totalDays;
        document.getElementById('totalNights').textContent = totalNights;

        // Update mission duration input
        missionDurationInput.value = `${totalDays} days , ${totalNights} nights`;
    }

    // Update return date
    function updateReturnDate() {
        const lastRow = tableBody.querySelectorAll('tr')[tableBody.querySelectorAll('tr').length - 2];
        const lastDateTo = lastRow.querySelector('.dateTo').value;
        returnDateInput.value = lastDateTo;
    }

    // Initial setup for first row
    const firstDateTo = tableBody.querySelector('.dateTo');
    firstDateTo.addEventListener('change', dateToChangeHandler);
    const firstDateFrom = tableBody.querySelector('.dateFrom');
    firstDateFrom.addEventListener('change', dateFromChangeHandler);

    calculateDaysAndNights();
    updateReturnDate();

    // Helper function to check if a date is in the past
    function isDateInPast(date) {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Remove time component
        return selectedDate < today;
    }
});


//FILE UPLOAD
document.addEventListener('DOMContentLoaded', () => {
    const uploadButton = document.getElementById('upload-doc');
    const deleteButton = document.getElementById('delete-doc');
    const viewButton = document.getElementById('view-doc');
    const fileInput = document.getElementById('file-input');
    const fileNameCell = document.getElementById('file-name-cell');

    let uploadedFiles = [];

    // Upload Document
    uploadButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (uploadedFiles.length >= 2) {
            alert('You can only upload a maximum of 2 documents.');
            return;
        }
        if (uploadedFiles.length > 0) {
            const addNew = confirm('A document has already been uploaded. Do you want to upload a new document?');
            if (!addNew) return;
        }
        fileInput.click();
    });

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            uploadedFiles.push(file);
            displayFiles();
            deleteButton.style.display = 'inline';
            viewButton.style.display = 'inline';
            fileInput.value = ''; // Reset the file input after selection
        } else {
            alert('Please upload a PDF document.');
            fileInput.value = ''; // Reset the file input if the file is not a PDF
        }
    });

    // Display uploaded file name in the table cell
    function displayFiles() {
        fileNameCell.textContent = ''; // Clear existing content
        uploadedFiles.forEach((file, index) => {
            const fileDisplay = document.createElement('div');
            const fileLink = document.createElement('a');
    
            fileLink.href = '#';  // Placeholder link
            fileLink.textContent = `${index + 1}. ${file.name}`;
            fileLink.style.marginBottom = '30px'; // Add space between documents
            fileLink.addEventListener('click', (event) => {
                event.preventDefault();
                viewFile(index);
            });
    
            fileDisplay.appendChild(fileLink);
            fileNameCell.appendChild(fileDisplay);
        });
    }

    // View Document function
    function viewFile(index) {
        if (index >= 0 && index < uploadedFiles.length) {
            const fileURL = URL.createObjectURL(uploadedFiles[index]);
            window.open(fileURL, '_blank');
        } else {
            alert('Invalid document number.');
        }
    }

    // Delete Document
    deleteButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (uploadedFiles.length === 0) return alert('No documents to delete.');

        const docIndex = prompt(`Enter the number of the document you want to delete (1-${uploadedFiles.length}):`);
        const index = parseInt(docIndex, 10) - 1;

        if (index >= 0 && index < uploadedFiles.length) {
            const confirmDelete = confirm(`Do you really want to remove "${uploadedFiles[index].name}"?`);
            if (confirmDelete) {
                uploadedFiles.splice(index, 1);
                displayFiles();
                if (uploadedFiles.length === 0) {
                    deleteButton.style.display = '';
                    viewButton.style.display = '';
                }
            }
        } else {
            alert('Invalid document number.');
        }
    });

    // View Document (for button)
    viewButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (uploadedFiles.length === 0) return alert('No documents to view.');

        const docIndex = prompt(`Enter the number of the document you want to view (1-${uploadedFiles.length}):`);
        const index = parseInt(docIndex, 10) - 1;

        if (index >= 0 && index < uploadedFiles.length) {
            viewFile(index);
        } else {
            alert('Invalid document number.');
        }
    });
});


//PLATE NUMBER VALIDATION
document.addEventListener('DOMContentLoaded', () => {
    const transportSelect = document.getElementById('means-of-transport');
    const plateNumberContainer = document.getElementById('plate-number-container');
    const titleInput = document.getElementById('title');

    // Roles that can select "Private Car"
    const allowedRoles = [
        'Commissioner General',
        'Deputy Commissioner General',
        'Commissioner',
        'Assistant Commissioner'
    ];

    function validateTransportOptions() {
        const userRole = titleInput.value;
        const privateCarOption = transportSelect.querySelector('option[value="private_car"]');

        if (allowedRoles.includes(userRole)) {
            privateCarOption.disabled = false;
        } else {
            if (transportSelect.value === 'private_car') {
                transportSelect.value = '';  // Reset the selection if it was on "Private Car"
            }
            privateCarOption.disabled = true;
        }
    }

    // Validate transport options on page load
    validateTransportOptions();

    // Validate when the user role changes (if it's changeable)
    titleInput.addEventListener('input', validateTransportOptions);

    // Show or hide the plate number input field based on the selected transport
    transportSelect.addEventListener('change', function () {
        const selectedValue = transportSelect.value;
        
        if (selectedValue === 'private_car' || selectedValue === 'hired_car') {
            plateNumberContainer.style.display = 'block';  // Show the plate number input
        } else {
            plateNumberContainer.style.display = 'none';   // Hide the plate number input
        }
    });
});



        
