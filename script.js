// ================= EVENT DATA =================

const events = [
    { title: "Football Tournament", date: "2026-02-05", category: "Sports", description: "Inter-college football match", location: "Ground", image: "download.jpg" },
    { title: "AI Workshop", date: "2026-02-06", category: "Workshop", description: "Hands-on AI training", location: "Lab 2" , image: "download (1).jpg"},
    { title: "Guest Lecture: NASA Scientist", date: "2026-02-08", category: "Lecture", description: "Space exploration talk", location: "Auditorium", image: "download (2).jpg"},
    { title: "Hackathon", date: "2026-02-09", category: "Workshop", description: "24-hour coding challenge", location: "Tech Hall", image: "download (3).jpg"},
    { title: "Basketball League", date: "2026-02-10", category: "Sports", description: "College league games", location: "Court" ,image: "download (4).jpg" },
    { title: "Cyber Security Seminar", date: "2026-02-12", category: "Lecture", description: "Security best practices", location: "Hall A" ,image: "download (5).jpg"},
    { title: "Robotics Workshop", date: "2026-02-15", category: "Workshop", description: "Build robots", location: "Lab 3" ,image: "download (6).jpg"}
];

const container = document.getElementById("eventsContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const dateFilter = document.getElementById("dateFilter");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");

let currentPage = 1;
const perPage = 5;


// ================= RENDER EVENTS =================

function renderEvents(list) {
    container.innerHTML = "";

    const start = (currentPage - 1) * perPage;
    const paginated = list.slice(start, start + perPage);

    paginated.forEach(event => {
        const card = document.createElement("div");
        card.className = "card";
        
        card.innerHTML = `
            <img src="${event.image}" class="event-img" alt="${event.title}">
            <h3>${event.title}</h3>
            <p><b>Date:</b> ${event.date}</p>
            <p>${event.description}</p>
            <button onclick="alert('Location: ${event.location}')">View Details</button>
        `;

        container.appendChild(card);
    });

    pageInfo.innerText = `Page ${currentPage} / ${Math.ceil(list.length / perPage)}`;
}


// ================= FILTER LOGIC =================

function applyFilters() {
    let filtered = [...events];

    const search = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const dateType = dateFilter.value;

    // search
    filtered = filtered.filter(e =>
        e.title.toLowerCase().includes(search) ||
        e.date.includes(search)
    );

    // category
    if (category !== "all") {
        filtered = filtered.filter(e => e.category === category);
    }

    // date filter
    const today = new Date();

    if (dateType === "today") {
        filtered = filtered.filter(e => new Date(e.date).toDateString() === today.toDateString());
    }

    if (dateType === "week") {
        const week = new Date();
        week.setDate(today.getDate() + 7);
        filtered = filtered.filter(e => new Date(e.date) <= week);
    }

    currentPage = 1;
    renderEvents(filtered);

    // save filtered list globally for pagination
    window.currentFiltered = filtered;
}


// ================= PAGINATION =================

prevBtn.onclick = () => {
    if (currentPage > 1) {
        currentPage--;
        renderEvents(window.currentFiltered);
    }
};

nextBtn.onclick = () => {
    if (currentPage < Math.ceil(window.currentFiltered.length / perPage)) {
        currentPage++;
        renderEvents(window.currentFiltered);
    }
};


// ================= EVENTS =================

searchInput.oninput = applyFilters;
categoryFilter.onchange = applyFilters;
dateFilter.onchange = applyFilters;

window.currentFiltered = events;
renderEvents(events);
