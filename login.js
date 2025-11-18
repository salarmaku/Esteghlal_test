// --------- DOM ---------
const addbtn = document.getElementById("submitbtn");
const removebtn = document.getElementById("removebtn");
// --------- EVENTS ---------
addbtn?.addEventListener("click", saveInitialInfo);
removebtn?.addEventListener("click" , removeInitialInfo);

// --------- FUNCTIONS ---------

function removeInitialInfo(){
    localStorage.clear();
    alert("تمام اطلاعات ذخیره‌شده حذف شد.");
}


function saveInitialInfo() {
    const name = document.getElementById("name").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const fathername = document.getElementById("fathername").value.trim();
    const city = document.getElementById("city").value;
    const address = document.getElementById("address").value.trim();
    const weight = document.getElementById("weight").value.trim();
    const height = document.getElementById("height").value.trim();
    const age = document.getElementById("age").value.trim();

    if (!name || !lastname || !fathername || !city || !address || !weight || !height || !age) {
        alert("لطفاً همه فیلدها را پر کنید.");
        return;
    }

    const player = {
        name,
        lastname,
        fathername,
        city,
        address,
        weight,
        height,
        age
    };

    // ذخیره موقت اطلاعات بازیکن برای استفاده در صفحه اصلی
    localStorage.setItem("tempPlayer", JSON.stringify(player));
    alert("ثبت نام شما با موفقیت انجام شد");

    // انتقال به صفحه اصلی ثبت تست (esteghlal.html)
    window.location.href = "esteghlal.html";
}
