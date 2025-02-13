document.addEventListener("DOMContentLoaded", async () => {
    const userList = document.getElementById("user-list");

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await response.json();

        userList.innerHTML = users.map(user => `
            <div class="user-item">
                <a href="user-detail.html?id=${user.id}">
                    ${user.name} <br> <small>(${user.email})</small>
                </a>
            </div>
        `).join("");
    } catch (error) {
        console.error("Error fetching users:", error);
        userList.innerHTML = "<p>ไม่สามารถโหลดข้อมูลผู้ใช้ได้</p>";
    }
});
