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

    // שליחת הטופס באמצעות EmailJS
    emailjs.send("service_e46zy8c", "template_o0i7dau", bookingData)
    .then(function(response) {
        console.log("ההזמנה נשלחה בהצלחה!", response.status, response.text);
        
        // ניתוב לכתובת של עמוד אישור אחרי שליחה מוצלחת
        window.location.href = "confirmation.html"; // שנה לכתובת עמוד האישור שלך
    }, function(error) {
        console.log("שגיאה בשליחת ההזמנה:", error);
        alert("אירעה שגיאה. נסה שוב מאוחר יותר.");
    });
});

// פונקציה לאתחול EmailJS (כדי שתוכל להשתמש בזה עם ID ייחודי שלך)
(function(){
    emailjs.init("3HgUH6DT0V1iMahFQ"); // ה-Public Key שלך
})();
