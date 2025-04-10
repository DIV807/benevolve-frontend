document.addEventListener("DOMContentLoaded", async () => {
    const leaderboardContainer = document.getElementById("leaderboard");

    try {
        console.log("Fetching leaderboard data...");

        const response = await fetch("https://benevolve-backend.onrender.com/api/users/leaderboard"); 
        console.log("Response status:", response.status);

        if (!response.ok) throw new Error("Failed to fetch leaderboard data");

        const users = await response.json();
        console.log("Fetched users:", users);

        leaderboardContainer.innerHTML = users.length
            ? users.map((user, index) => `
                <div class="leaderboard-entry">
                    <span class="rank">#${index + 1}</span>
                    <span>${user.name}</span>
                    <span>${user.points} Points</span>
                    <span class="badge">${user.badges[0]}</span>
                </div>
            `).join("")
            : "<p>No volunteers on the leaderboard yet.</p>";

    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        leaderboardContainer.innerHTML = "<p>⚠️ Failed to load leaderboard.</p>";
    }
});


function shareRank(name, points, rank) {
    const text = `🎉 I ranked #${rank} on the Benevolve Leaderboard with ${points} points! Join me!`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, "_blank");
}
