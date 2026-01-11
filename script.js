let events = [
  {
    id: 1,
    name: "Tech Conference 2026",
    date: "2026-03-15",
    description:
      "Annual technology conference featuring the latest innovations in AI and software development.",
  },
  {
    id: 2,
    name: "Summer Music Festival",
    date: "2026-07-20",
    description:
      "A three-day outdoor music festival featuring top artists from around the world.",
  },
  {
    id: 3,
    name: "New Year Celebration",
    date: "2026-01-01",
    description: "Ring in the new year with fireworks, music, and celebration!",
  },
];

let nextId = 4;

function renderEvents(eventsToRender = events) {
  const grid = document.getElementById("eventsGrid");

  if (eventsToRender.length === 0) {
    grid.innerHTML =
      '<div class="no-events">No events found. Add your first event!</div>';
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  grid.innerHTML = eventsToRender
    .map((event) => {
      const eventDate = new Date(event.date);
      const isPast = eventDate < today;
      const statusClass = isPast ? "past" : "upcoming";

      return `
                    <div class="event-card ${statusClass}">
                        <h3>${event.name}</h3>
                        <div class="event-date">📅 ${formatDate(
                          event.date
                        )}</div>
                        <p class="event-description">${event.description}</p>
                        <button class="btn-delete" onclick="deleteEvent(${
                          event.id
                        })">Delete Event</button>
                    </div>
                `;
    })
    .join("");
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function sortEvents() {
  events.sort((a, b) => new Date(a.date) - new Date(b.date));
}

function addEvent(e) {
  e.preventDefault();

  const name = document.getElementById("eventName").value.trim();
  const date = document.getElementById("eventDate").value;
  const description = document.getElementById("eventDescription").value.trim();

  document
    .querySelectorAll(".error-message")
    .forEach((msg) => (msg.style.display = "none"));

  let isValid = true;

  if (!name) {
    document.getElementById("nameError").style.display = "block";
    isValid = false;
  }

  if (!date) {
    document.getElementById("dateError").style.display = "block";
    isValid = false;
  }

  if (!description) {
    document.getElementById("descError").style.display = "block";
    isValid = false;
  }

  if (!isValid) return;

  const newEvent = {
    id: nextId++,
    name,
    date,
    description,
  };

  events.push(newEvent);
  sortEvents();
  renderEvents();

  document.getElementById("eventForm").reset();
}

function deleteEvent(id) {
  events = events.filter((event) => event.id !== id);
  renderEvents();

  const searchTerm = document.getElementById("searchInput").value;
  if (searchTerm) {
    searchEvents();
  }
}

function searchEvents() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();

  const filtered = events.filter((event) => {
    const nameMatch = event.name.toLowerCase().includes(searchTerm);
    const dateMatch =
      event.date.includes(searchTerm) ||
      formatDate(event.date).toLowerCase().includes(searchTerm);
    return nameMatch || dateMatch;
  });

  renderEvents(filtered);
}

document.getElementById("eventForm").addEventListener("submit", addEvent);
document.getElementById("searchInput").addEventListener("input", searchEvents);

sortEvents();
renderEvents();
