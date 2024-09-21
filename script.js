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

    // הכנת הנתונים לשליחה ושמירתם ב-Local Storage
    const bookingData = {
        fullName: fullName,
        phone: phone,
        location: location,
        washType: washType,
        date: date,
        time: time
    };

    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(bookingData);
    localStorage.setItem('orders', JSON.stringify(orders));

    // הפניה לעמוד אישור
    window.location.href = "confirmation.html";
});

// פונקציה להצגת ההזמנות בעמוד ההזמנות
function displayOrders() {
    const ordersList = document.getElementById('orders-list');
    let orders = JSON.parse(localStorage.getItem('orders')) || [];

    if (orders.length === 0) {
        ordersList.innerHTML = "<p>אין הזמנות להצגה.</p>";
    } else {
        orders.forEach(order => {
            const orderItem = document.createElement('div');
            orderItem.className = 'order-item';
            orderItem.innerHTML = `
                <h2>הזמנה של: ${order.fullName}</h2>
                <p>טלפון: ${order.phone}</p>
                <p>מיקום השטיפה: ${order.location}</p>
                <p>סוג השטיפה: ${order.washType}</p>
                <p>תאריך: ${order.date}</p>
                <p>שעה: ${order.time}</p>
            `;
            ordersList.appendChild(orderItem);
        });
    }
}

// קריאה לפונקציה להצגת ההזמנות בעמוד ההזמנות
if (window.location.pathname.includes('orders.html')) {
    window.onload = displayOrders;
}
