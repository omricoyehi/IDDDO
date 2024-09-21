// פונקציה לגלילה חלקה לחלק ההזמנה
function scrollToBooking() {
    document.getElementById("booking").scrollIntoView({ behavior: 'smooth' });
}

// פונקציה לטיפול בטופס ההזמנה
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

    // הכנת הנתונים לשליחה
    const bookingData = {
        fullName: fullName,
        phone: phone,
        location: location === 'home' ? 'בית הלקוח' : 'בית העסק',
        washType: washType,
        date: date,
        time: time,
    };

   // פונקציה לטיפול בטופס ההזמנה
document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // איסוף ערכים מהשדות
    const fullName = document.getElementById('full-name').value;
    const phone = document.getElementById('phone').value;
    const location = document.getElementById('location').value;
    const washType = document.getElementById('wash-type').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    if (!fullName || !phone || !location || !washType || !date || !time) {
        alert("אנא מלא את כל השדות לפני שליחת ההזמנה.");
        return;
    }

    // הכנת הנתונים
    const bookingData = {
        fullName: fullName,
        phone: phone,
        location: location,
        washType: washType,
        date: date,
        time: time
    };

    // שמירת ההזמנה ב־Local Storage
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(bookingData);
    localStorage.setItem('orders', JSON.stringify(orders));

    // הפניה לעמוד אישור
    window.location.href = "confirmation.html";
});

});
