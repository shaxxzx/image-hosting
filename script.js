const imageInput = document.getElementById('imageInput');
const uploadButton = document.getElementById('uploadButton');
const imagePreview = document.getElementById('imagePreview');
const statusMessage = document.getElementById('statusMessage');
const directorySelect = document.getElementById('directorySelect');

const popup = document.getElementById('popup');
const overlay = document.getElementById('overlay');
const fileNameInput = document.getElementById('fileNameInput');
const popupImage = document.getElementById('popupImage');
const saveButton = document.getElementById('saveButton');
const closePopup = document.getElementById('closePopup');

let selectedFile; // Will store the currently selected file

// Disable upload button by default
uploadButton.disabled = true;

// Function to handle file selection
imageInput.addEventListener('change', function() {
    const files = imageInput.files;
    imagePreview.innerHTML = '';  // Clear previous previews

    if (files.length > 0) {
        uploadButton.disabled = false; // Enable upload button when files are selected
        statusMessage.textContent = `You selected ${files.length} file(s).`;

        // Loop through each file to generate a preview
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const imgElement = document.createElement('img');
                    imgElement.src = e.target.result;
                    imgElement.alt = file.name;
                    imgElement.setAttribute('data-file-name', file.name);

                    const previewDiv = document.createElement('div');
                    previewDiv.classList.add('preview');
                    previewDiv.appendChild(imgElement);
                    imagePreview.appendChild(previewDiv);

                    // Add click event to image to open the popup
                    imgElement.addEventListener('click', () => {
                        openPopup(file, e.target.result);
                    });
                };
                reader.readAsDataURL(file);  // Convert file to Data URL
            }
        });
    } else {
        uploadButton.disabled = true; // Disable if no files are selected
        statusMessage.textContent = "Please select at least one image to upload.";
    }
});

// Function to open the popup with image and filename
function openPopup(file, imageDataUrl) {
    selectedFile = file; // Store the file in a global variable
    popupImage.src = imageDataUrl;
    const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, ""); // Strip the extension
    fileNameInput.value = fileNameWithoutExtension;
    popup.style.display = 'block';
    overlay.style.display = 'block';
}

// Function to close the popup
closePopup.addEventListener('click', function() {
    popup.style.display = 'none';
    overlay.style.display = 'none';
});

// Function to save the edited file name
saveButton.addEventListener('click', function() {
    const newFileName = fileNameInput.value;
    const fileExtension = selectedFile.name.split('.').pop(); // Keep the original extension
    const newFullFileName = newFileName + '.' + fileExtension;

    statusMessage.textContent = `File name changed to: ${newFullFileName}`;
    popup.style.display = 'none';
    overlay.style.display = 'none';
});

// Function to simulate file upload
document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const selectedDirectory = directorySelect.value;
    statusMessage.textContent = `Files will be uploaded to the '${selectedDirectory}' directory.`;

    // You can add the actual upload logic to a server here in the future
});