// --------- DOM ---------
const savediff = document.querySelector(".diff");
const userInfoBox = document.querySelector(".user-info");
const statusBox = document.querySelector(".status");
const login = document.querySelector(".login");
const sportRadio = document.querySelectorAll('input[name="r"]');
const dateRadio = document.querySelectorAll('input[name="s"]');
const timeRadio = document.querySelectorAll('input[name="a"]');
const desc = document.querySelector(".text");
const PlayerPage = document.querySelector(".player");
// --------- EVENTS ---------
savediff?.addEventListener("click", completeRegistration);
login?.addEventListener("click", goToLogin);
PlayerPage?.addEventListener("click" , goTOplayer);

// --------- FUNCTIONS ---------

function goToLogin() {
    window.location.href = "login.html";
    
}

function goTOplayer(){
    window.location.href = "players.html";
    
}

function completeRegistration() {
    const player = JSON.parse(localStorage.getItem("tempPlayer"));
    if (!player) {
        alert("ابتدا باید ثبت‌نام کنید.");
        return;
    }

    // گرفتن مقادیر از فرم
    player.sport = getCheckedValue(sportRadio);
    player.date = getCheckedValue(dateRadio);
    player.time = getCheckedValue(timeRadio);
    player.description = desc.value.trim();

    if (!player.sport || !player.date || !player.time || !player.description) {
        alert("لطفاً تمام اطلاعات را کامل وارد کنید.");
        return;
    }

    // مقداردهی اولیه ظرفیت‌ها فقط یک‌بار
    if (!localStorage.getItem("capacity")) {
        const initialCapacities = {
            "فوتبال": 50,
            "والیبال": 30,
            "بسکتبال": 40,
            "کشتی": 50,
            "وزنه برداری": 20,
            "شنا": 10
        };
        localStorage.setItem("capacity", JSON.stringify(initialCapacities));
        alert("اطلاعات شما با موفقیت تغییر یافت . وضعیت را بررسی کنید.");
    }

    let capacity = JSON.parse(localStorage.getItem("capacity"));

    // بررسی ظرفیت رشته انتخاب‌شده
    if (capacity[player.sport] <= 0) {
        alert("ظرفیت این رشته تکمیل شده است.");
        return;
    }

    // نمایش اطلاعات در صفحه
    userInfoBox.innerHTML = `
        <h3>اطلاعات ثبت‌شده:</h3>
        <p>نام: ${player.name}</p>
        <p>نام خانوادگی: ${player.lastname}</p>
        <p>سن: ${player.age}</p>
        <p>رشته ورزشی: ${player.sport}</p>
        <p>تاریخ تست: ${player.date}</p>
        <p>ساعت تست: ${player.time}</p>
        <p>توضیحات: ${player.description}</p>
    `;

    // بررسی شرایط پذیرش
    const weight = Number(player.weight);
    const height = Number(player.height);
    const age = Number(player.age);

    let isAccepted = (weight <= 85 && height >= 175 && age <= 24);

    if (isAccepted) {
        statusBox.style.backgroundColor = "blue";
        statusBox.innerText = "وضعیت: پذیرفته شده ✅";

        // کاهش ظرفیت رشته
        capacity[player.sport]--;
        localStorage.setItem("capacity", JSON.stringify(capacity));

        // اضافه‌کردن به لیست پذیرفته‌شده‌ها
        const accepted = JSON.parse(localStorage.getItem("accepted")) || [];
        accepted.push({
            name: player.name,
            lastname: player.lastname,
            age: player.age,
            sport: player.sport
        });
        localStorage.setItem("accepted", JSON.stringify(accepted));
    } else {
        statusBox.style.backgroundColor = "red";
        statusBox.innerText = "وضعیت: رد شده ❌";
    }

    // ذخیره کلی در لیست همه بازیکن‌ها
    let players = JSON.parse(localStorage.getItem("players")) || [];
    players.push(player);
    localStorage.setItem("players", JSON.stringify(players));

    // حذف داده موقت ثبت‌نام
    localStorage.removeItem("tempPlayer");
}

function getCheckedValue(radioButtons) {
    for (let radio of radioButtons) {
        if (radio.checked) return radio.value;
    }
    return null;
}
