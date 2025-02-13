document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("id");
    const postsList = document.getElementById("posts-list");

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        const posts = await response.json();

        postsList.innerHTML = posts.map(post => `
            <div class="post-item">
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            </div>
        `).join("");
    } catch (error) {
        console.error("Error fetching posts:", error);
        postsList.innerHTML = "<p>ไม่สามารถโหลดโพสต์ได้</p>";
    }
});
