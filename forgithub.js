const GITHUB_USERNAME = 'shaxxzx'; // Replace with your GitHub username
const REPO_NAME = 'image-hosting'; // Replace with your repository name
const TOKEN = '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'; // Replace with your GitHub token

// Function to upload image to GitHub
async function uploadImageToGitHub(file, directory, customName) {
    const apiUrl = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${directory}/${customName}`;
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
        reader.onload = async function(e) {
            const base64Content = btoa(reader.result); // Base64 encoding for GitHub API
            const content = {
                message: `Upload ${customName}`,
                content: base64Content
            };

            try {
                const response = await fetch(apiUrl, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `token ${TOKEN}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(content)
                });
                if (response.ok) {
                    resolve(`https://username.github.io/${REPO_NAME}/${directory}/${customName}`);
                } else {
                    reject('Upload failed');
                }
            } catch (error) {
                reject(error);
            }
        };
        reader.readAsBinaryString(file); // Convert file to binary string
    });
}

// Upload button event listener
uploadButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const files = imageInput.files;
    const directory = directorySelect.value;
    const uploadPromises = [];

    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        let fileName = file.name;

        // Use custom name if provided
        if (newImageName.value.trim()) {
            fileName = newImageName.value.trim() + fileName.slice(fileName.lastIndexOf('.'));
        }

        uploadPromises.push(uploadImageToGitHub(file, directory, fileName));
    }

    // Upload all files
    Promise.all(uploadPromises)
        .then(urls => {
            statusMessage.textContent = `Uploaded successfully! URLs:\n ${urls.join('\n')}`;
        })
        .catch(err => {
            statusMessage.textContent = `Error uploading files: ${err}`;
        });
});
