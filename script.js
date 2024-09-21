// פונקציה לגלילה חלקה לחלק ההזמנה
function scrollToBooking() {
    document.getElementById("booking").scrollIntoView({ behavior: 'smooth' });
}

// פונקציה לטיפול בטופס ההזמנה ושמירת ההזמנות ב-Local Storage
document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault(); // למנוע את השליחה הרגילה של הטופס

    // איסוף ערכים מהשדות
    const fullName = document.getElementById('full-name').value;
    const phone = document.getElementById('phone').value;
    const location = document.getElementById('location').value;
    const washType = document.getElementById('wash-type').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    // בדיקת תקינות השדות (שכל השדות מלאים)
    if (!fullName || !phone || !location || !washType || !date || !time) {
        alert("אנא מלא את כל השדות לפני שליחת ההזמנה.");
        return;
    }

    // הכנת הנתונים ושליחתם ל-Local Storage
    const bookingData = {
        fullName: fullName,
        phone: phone,
        location: location,
        washType: washType,
        date: date,
        time: time
    };

    // שמירת ההזמנה ב-Local Storage
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(bookingData);
    localStorage.setItem('orders', JSON.stringify(orders));

    // שמירת ההזמנה האחרונה עבור עמוד האישור
    localStorage.setItem('lastOrder', JSON.stringify(bookingData));

    // הפניה לעמוד אישור
    window.location.href = "confirmation.html";
});

// פונקציה להצגת ההזמנה האחרונה בעמוד האישור
function displayLastOrder() {
    const lastOrder = JSON.parse(localStorage.getItem('lastOrder'));

    if (lastOrder) {
        document.getElementById('fullName').textContent = lastOrder.fullName;
        document.getElementById('phone').textContent = lastOrder.phone;
        document.getElementById('location').textContent = lastOrder.location;
        document.getElementById('washType').textContent = lastOrder.washType;
        document.getElementById('date').textContent = lastOrder.date;
        document.getElementById('time').textContent = lastOrder.time;
    }
}

// קריאה לפונקציה להצגת ההזמנה בעמוד האישור
if (window.location.pathname.includes('confirmation.html')) {
    window.onload = displayLastOrder;
}
