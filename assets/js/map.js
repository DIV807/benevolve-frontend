
const map = L.map("map").setView([28.6139, 77.2090], 5); // Default India view

// Add OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);


async function loadEvents() {
    try {
        const response = await fetch("http://benevolve-backend.onrender.com/api/events");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const events = await response.json();
        console.log("📌 Events from Backend:", events); // Debugging Log

        for (let event of events) {
            const coords = await getCoordinates(event.location);
            if (coords) {
                console.log(`📍 Plotting Event: ${event.name} at (${coords.lat}, ${coords.lon})`);
                plotMarker(coords.lat, coords.lon, event);
            }
        }
    } catch (error) {
        console.error("❌ Error loading events:", error);
    }
}

//  convert location name to coordinates
async function getCoordinates(location) {
    try {
        console.log(`🔍 Fetching coordinates for: ${location}`);
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        console.log(`📌 Coordinates for ${location}:`, data); // Debugging Output

        if (data.length > 0) {
            return { lat: data[0].lat, lon: data[0].lon };
        } else {
            throw new Error("No coordinates found");
        }
    } catch (error) {
        console.error("❌ Error fetching coordinates:", error);
        return null;
    }
}

//plot markers on the map
function plotMarker(lat, lon, event) {
    const marker = L.marker([lat, lon]).addTo(map);

    
    const popupContent = `
        <b>${event.name}</b><br>
        📅 <strong>Date:</strong> ${new Date(event.date).toDateString()}<br>
        📍 <strong>Location:</strong> ${event.location}<br>
        📝 <strong>Description:</strong> ${event.description}<br>
        🛠 <strong>Skills:</strong> ${event.skills?.join(", ") || "N/A"}
    `;

    marker.bindPopup(popupContent);
}



document.addEventListener("DOMContentLoaded", loadEvents);
