document.addEventListener("DOMContentLoaded", async function () {
    const token = localStorage.getItem("token"); // Retrieve token

    if (!token) {
        console.error("No token found! Redirecting to login...");
        window.location.href = "login.html"; 
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`, 
                "Content-Type": "application/json"
            }            
        });

        if (!response.ok) {
            throw new Error("Failed to fetch profile");
        }

        const userData = await response.json();
        console.log("✅ User Profile:", userData);

        
        document.getElementById("userName").innerText = userData.name;
        document.getElementById("userEmail").innerText = userData.email;
        document.getElementById("userInterests").innerText = userData.interests || "N/A";
        document.getElementById("userAvailability").innerText = userData.availability || "N/A";

    } catch (error) {
        console.error("❌ Error fetching profile:", error);
    }

    // Attach logout event to the button
    const logoutButton = document.getElementById("logout-btn");
    if (logoutButton) {
        logoutButton.addEventListener("click", logout);
    }
});


function logout() {
    console.log("Logging out..."); 

   
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("userData");

    
    window.location.href = "login.html";
}
