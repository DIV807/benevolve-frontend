document.getElementById("login-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("error-message");

    try {
        const response = await fetch("https://benevolve-backend.onrender.com/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const textResponse = await response.text();
            throw new Error(textResponse.includes("<!DOCTYPE") ? "Server error, please try again!" : JSON.parse(textResponse).error);
        }

        const data = await response.json();

        
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("role", data.role);
        localStorage.setItem("userData", JSON.stringify(data));

        console.log("✅ Login Successful:", data);

        
        document.getElementById("visit-profile").style.display = "block";
        document.getElementById("go-home").style.display = "block";

    } catch (error) {
        errorMessage.style.color = "red";
        errorMessage.innerText = `❌ ${error.message || "Login failed. Please try again."}`;
    }
});
