// Function to get the URL parameter value
function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

document.addEventListener("DOMContentLoaded", function() {
    // Get events data from URL parameters
    const eventsData = getQueryParameter("events");

    // Check if eventsData exists and is valid JSON
    if (!eventsData) {
        document.getElementById("events-list").innerHTML = "<p>No events found matching your criteria.</p>";
        return;
    }

    let events;
    try {
        events = JSON.parse(decodeURIComponent(eventsData));
    } catch (error) {
        console.error("Error parsing event data:", error);
        document.getElementById("events-list").innerHTML = "<p>Error loading events. Please try again.</p>";
        return;
    }

    const eventsListContainer = document.getElementById("events-list");

    // Check if events exist and display them
    if (events.length > 0) {
        events.forEach(event => {
            const eventCard = document.createElement("div");
            eventCard.classList.add("event-card");

            // Event card structure
            eventCard.innerHTML = `
                <h2 class="event-title">${event.name || "Untitled Event"}</h2>
                <p class="event-location"><strong>Location:</strong> ${event.location || "Not specified"}</p>
                <p class="event-date"><strong>Date:</strong> ${event.date ? new Date(event.date).toLocaleDateString() : "TBD"}</p>
                <p class="event-description">${event.description || "No description available."}</p>
                <p class="event-availability"><strong>Availability:</strong> ${event.availability || "N/A"}</p>
            `;

            // Append the event card to the events list container
            eventsListContainer.appendChild(eventCard);
        });
    } else {
        eventsListContainer.innerHTML = "<p>No events found matching your criteria.</p>";
    }
});
