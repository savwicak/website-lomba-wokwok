document.addEventListener('DOMContentLoaded', loadPosts);

function loadPosts() {
    const postsContainer = document.getElementById('posts');
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];

    savedPosts.forEach(postData => {
        const post = document.createElement('div');
        post.classList.add('post');

        const postTitle = document.createElement('h3');
        postTitle.textContent = postData.title;

        const postContent = document.createElement('p');
        postContent.textContent = postData.content;

        const postImage = document.createElement('img');
        if (postData.image) {
            postImage.src = postData.image; // Set image source from saved data
            postImage.classList.add('post-image');
        }

        post.appendChild(postTitle);
        post.appendChild(postContent);
        if (postData.image) post.appendChild(postImage);
        postsContainer.appendChild(post);
    });
}
