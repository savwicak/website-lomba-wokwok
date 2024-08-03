let currentPost = null;

document.addEventListener('DOMContentLoaded', loadPosts);

function addPost() {
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');
    const imageUpload = document.getElementById('imageUpload');
    const postsContainer = document.getElementById('posts');

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    const image = imageUpload.files[0]; // Get the uploaded file

    if (title === '' || content === '') {
        alert('Please enter both a title and content.');
        return;
    }

    const imageSrc = image ? URL.createObjectURL(image) : null;
    const post = createPostElement(title, content, imageSrc);
    postsContainer.appendChild(post);

    savePosts();

    titleInput.value = '';
    contentInput.value = '';
    imageUpload.value = ''; // Clear file input
}

function createPostElement(title, content, imageSrc) {
    const post = document.createElement('div');
    post.classList.add('post');

    const postTitle = document.createElement('h3');
    postTitle.textContent = title;

    const postContent = document.createElement('p');
    postContent.textContent = content;

    const postImage = document.createElement('img');
    if (imageSrc) {
        postImage.src = imageSrc; // Use Base64 or Object URL
        postImage.classList.add('post-image');
    }

    const postButtons = document.createElement('div');
    postButtons.classList.add('post-buttons');

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');
    editButton.onclick = () => openModal(post, postTitle, postContent, postImage);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.onclick = () => deletePost(post);

    postButtons.appendChild(editButton);
    postButtons.appendChild(deleteButton);

    post.appendChild(postTitle);
    post.appendChild(postContent);
    if (imageSrc) post.appendChild(postImage);
    post.appendChild(postButtons);

    return post;
}

function openModal(post, postTitle, postContent, postImage) {
    currentPost = post;
    document.getElementById('editTitle').value = postTitle.textContent;
    document.getElementById('editContent').value = postContent.textContent;
    document.getElementById('editImageUpload').value = ''; // Clear file input

    if (postImage) {
        document.getElementById('editImagePreview').src = postImage.src;
        document.getElementById('editImagePreview').style.display = 'block';
    } else {
        document.getElementById('editImagePreview').style.display = 'none';
    }

    document.getElementById('editModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}

function saveEdit() {
    if (currentPost) {
        const newTitle = document.getElementById('editTitle').value.trim();
        const newContent = document.getElementById('editContent').value.trim();
        const newImage = document.getElementById('editImageUpload').files[0];
        const newImageSrc = newImage ? URL.createObjectURL(newImage) : document.getElementById('editImagePreview').src;

        if (newTitle !== '' && newContent !== '') {
            currentPost.querySelector('h3').textContent = newTitle;
            currentPost.querySelector('p').textContent = newContent;

            const postImage = currentPost.querySelector('img');
            if (postImage) {
                if (newImage) {
                    postImage.src = newImageSrc;
                } else {
                    postImage.style.display = 'none';
                }
            } else if (newImage) {
                const newPostImage = document.createElement('img');
                newPostImage.src = newImageSrc;
                newPostImage.classList.add('post-image');
                currentPost.appendChild(newPostImage);
            }

            savePosts();
        }

        closeModal();
    }
}

function deletePost(post) {
    post.remove();
    savePosts();
}

function savePosts() {
    const postsContainer = document.getElementById('posts');
    const posts = [];

    postsContainer.querySelectorAll('.post').forEach(post => {
        const title = post.querySelector('h3').textContent;
        const content = post.querySelector('p').textContent;
        const image = post.querySelector('img');

        posts.push({
            title,
            content,
            image: image ? image.src : null
        });
    });

    localStorage.setItem('posts', JSON.stringify(posts));
}

function loadPosts() {
    const postsContainer = document.getElementById('posts');
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];

    savedPosts.forEach(postData => {
        const post = createPostElement(postData.title, postData.content, postData.image);
        postsContainer.appendChild(post);
    });
    
}

document.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        window.location.href = 'login.html';
    }
});

function logOut() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
}

// Add this function to your script to set the logged-in user
function setLoggedInUser(username) {
    localStorage.setItem('loggedInUser', username);
}

