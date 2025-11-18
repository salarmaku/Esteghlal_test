// --------- DOM ---------
const sportSections = {
    فوتبال: document.querySelector(".foo"),
    والیبال: document.querySelector(".voll"),
    بسکتبال: document.querySelector(".bascket"),
    کشتی: document.querySelector(".kosh"),
    "وزنه برداری": document.querySelector(".power"),
    شنا: document.querySelector(".swi")
};

// --------- EVENTS ---------
document.addEventListener("DOMContentLoaded", displayAcceptedPlayers);

// --------- FUNCTIONS ---------
function displayAcceptedPlayers() {
    const accepted = JSON.parse(localStorage.getItem("accepted")) || [];

    Object.values(sportSections).forEach(div => (div.innerHTML = "")); // پاک‌سازی اولیه

    accepted.forEach((player, index) => {
        const div = sportSections[player.sport];
        if (div) {
            const container = document.createElement("div");
            container.classList.add("player-item");

            const p = document.createElement("p");
            p.textContent = `👤 ${player.name} ${player.lastname} - سن: ${player.age}`;

            const removeBtn = document.createElement("button");
            removeBtn.textContent = "❌ حذف";
            removeBtn.style.marginRight = "10px";
            removeBtn.onclick = () => removePlayer(index);

            container.appendChild(p);
            container.appendChild(removeBtn);
            div.appendChild(container);
        }
    });
}

function removePlayer(index) {
    let accepted = JSON.parse(localStorage.getItem("accepted")) || [];

    if (index >= 0 && index < accepted.length) {
        const player = accepted[index];

        // افزایش ظرفیت رشته
        let capacity = JSON.parse(localStorage.getItem("capacity"));
        if (capacity[player.sport] !== undefined) {
            capacity[player.sport]++;
            localStorage.setItem("capacity", JSON.stringify(capacity));
        }

        // حذف از لیست و ذخیره دوباره
        accepted.splice(index, 1);
        localStorage.setItem("accepted", JSON.stringify(accepted));

        // رفرش صفحه
        displayAcceptedPlayers();
    }
}