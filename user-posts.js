document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("id");
    const postsList = document.getElementById("posts-list");
    const userNameSpan = document.getElementById("user-name");

    try {
        // 🔹 โหลดชื่อผู้ใช้
        const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const user = await userResponse.json();
        userNameSpan.textContent = user.name;

        // 🔹 โหลดโพสต์ของผู้ใช้
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        const posts = await response.json();

        postsList.innerHTML = posts.map(post => `
            <div class="post-item">
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <button class="toggle-comments" data-post-id="${post.id}">ดูความคิดเห็น</button>
                <div class="comments" id="comments-${post.id}" style="display: none;"></div>
            </div>
        `).join("");

        // 🔹 Event Listener ให้ปุ่ม "ดูความคิดเห็น"
        document.querySelectorAll(".toggle-comments").forEach(button => {
            button.addEventListener("click", async (e) => {
                const postId = e.target.getAttribute("data-post-id");
                const commentsDiv = document.getElementById(`comments-${postId}`);

                if (commentsDiv.style.display === "none") {
                    try {
                        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
                        const comments = await response.json();

                        commentsDiv.innerHTML = comments.map(comment => `
                            <div class="comment">
                                <p><strong>${comment.name}</strong> (${comment.email})</p>
                                <p>${comment.body}</p>
                            </div>
                        `).join("");

                        commentsDiv.style.display = "block";
                        e.target.textContent = "ซ่อนความคิดเห็น";
                    } catch (error) {
                        console.error("Error fetching comments:", error);
                    }
                } else {
                    commentsDiv.style.display = "none";
                    e.target.textContent = "ดูความคิดเห็น";
                }
            });
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        postsList.innerHTML = "<p>ไม่สามารถโหลดโพสต์ได้</p>";
    }
});
