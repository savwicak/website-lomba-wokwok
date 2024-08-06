let currentPost = null;

document.addEventListener('DOMContentLoaded', loadPosts);

function addPost() {
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');
    const postsContainer = document.getElementById('posts');

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (title === '' || content === '') {
        alert('Please enter both a title and content.');
        return;
    }

    const post = createPostElement(title, content);
    postsContainer.appendChild(post);

    savePosts();

    titleInput.value = '';
    contentInput.value = '';
}

function createPostElement(title, content) {
    const post = document.createElement('div');
    post.classList.add('post');

    const postTitle = document.createElement('h3');
    postTitle.textContent = title;

    const postContent = document.createElement('p');
    postContent.textContent = content;

    const postButtons = document.createElement('div');
    postButtons.classList.add('post-buttons');

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');
    editButton.onclick = () => openModal(post, postTitle, postContent);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.onclick = () => deletePost(post);

    postButtons.appendChild(editButton);
    postButtons.appendChild(deleteButton);

    post.appendChild(postTitle);
    post.appendChild(postContent);
    post.appendChild(postButtons);

    return post;
}

function openModal(post, postTitle, postContent) {
    currentPost = post;
    document.getElementById('editTitle').value = postTitle.textContent;
    document.getElementById('editContent').value = postContent.textContent;
    document.getElementById('editModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}

function saveEdit() {
    if (currentPost) {
        const newTitle = document.getElementById('editTitle').value.trim();
        const newContent = document.getElementById('editContent').value.trim();

        if (newTitle !== '' && newContent !== '') {
            currentPost.querySelector('h3').textContent = newTitle;
            currentPost.querySelector('p').textContent = newContent;
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
        posts.push({ title, content });
    });

    localStorage.setItem('posts', JSON.stringify(posts));
}

function loadPosts() {
    const postsContainer = document.getElementById('posts');
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];

    savedPosts.forEach(postData => {
        const post = createPostElement(postData.title, postData.content);
        postsContainer.appendChild(post);
    });
}
