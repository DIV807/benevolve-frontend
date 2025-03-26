document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("search-form");

    if (searchForm) {
        searchForm.addEventListener("submit", async function (event) {
            event.preventDefault(); 

            console.log("🔍 Search button clicked");

            const skills = document.getElementById("skills").value.trim();
            const location = document.getElementById("location").value.trim();

            console.log("📌 User Input -> Skills:", skills, "Location:", location);

            const searchQuery = {
                skills,
                location,
                availability: true
            };

            try {
                console.log("🚀 Sending request to backend...");
                const response = await fetch("http://localhost:5000/api/events/search", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(searchQuery)
                });

                const data = await response.json();
                console.log("✅ Response received:", data);

                if (data.events && data.events.length > 0) {
                    console.log("🎯 Events found, redirecting...");
                    window.location.href = `events-results.html?events=${encodeURIComponent(JSON.stringify(data.events))}`;
                } else {
                    console.warn("⚠️ No events found.");
                    alert("No matching events found.");
                }
            } catch (error) {
                console.error("❌ Error searching events:", error);
                alert("An error occurred while searching for events.");
            }
        });
    } else {
        console.error("❌ Search form not found in index.html!");
    }
});
