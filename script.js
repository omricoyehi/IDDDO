// Form Validation and Submission
document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect values from the form fields
    const fullName = document.getElementById('full-name').value;
    const phone = document.getElementById('phone').value;
    const location = document.getElementById('location').value;
    const washType = document.getElementById('wash-type').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    // Check if all fields are filled
    if (!fullName || !phone || !location || !washType || !date || !time) {
        alert("אנא מלא את כל השדות לפני שליחת ההזמנה.");
        return;
    }

    // Show confirmation message
    alert(`תודה, ${fullName}. הזמנתך לשירות ${washType} תתבצע בתאריך ${date} בשעה ${time} ב-${location === 'home' ? 'בית הלקוח' : 'בית העסק'}.`);

    // Prepare data for EmailJS
    const bookingData = {
        fullName: fullName,
        phone: phone,
        location: location === 'home' ? 'בית הלקוח' : 'בית העסק',
        washType: washType,
        date: date,
        time: time,
    };

    // Send email via EmailJS
    emailjs.send("service_e46zy8c", "YOUR_TEMPLATE_ID", bookingData) // Replace "YOUR_TEMPLATE_ID" with your actual Template ID
    .then(function(response) {
        console.log("ההזמנה נשלחה בהצלחה!", response.status, response.text);
        window.location.href = "confirmation.html"; // Replace with your confirmation page URL
    }, function(error) {
        console.log("שגיאה בשליחת ההזמנה:", error);
        alert("אירעה שגיאה. נסה שוב מאוחר יותר.");
    });
});

// Lightbox Gallery (Basic Implementation)
document.querySelectorAll('.gallery-images a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const imageSrc = this.getAttribute('href');
        openLightbox(imageSrc);
    });
});

function openLightbox(src) {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style.position = 'fixed';
    lightbox.style.top = '0';
    lightbox.style.left = '0';
    lightbox.style.width = '100%';
    lightbox.style.height = '100%';
    lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    lightbox.style.display = 'flex';
    lightbox.style.justifyContent = 'center';
    lightbox.style.alignItems = 'center';
    lightbox.style.zIndex = '1000';

    const img = document.createElement('img');
    img.src = src;
    img.style.maxWidth = '80%';
    img.style.maxHeight = '80%';
    img.style.borderRadius = '10px';

    lightbox.appendChild(img);
    document.body.appendChild(lightbox);

    // Close lightbox when clicked outside the image
    lightbox.addEventListener('click', function() {
        document.body.removeChild(lightbox);
    });
}

// Dynamic Text Effect in Hero Section
const kineticText = document.querySelector('.kinetic-text');
const textArray = ['IDO Washing - חווית שטיפה ברמה אחרת!', 'השטיפה המושלמת לרכב שלך!', 'ניקיון וברק שלא יאמינו!'];
let textIndex = 0;
let charIndex = 0;
let currentText = '';
let isDeleting = false;

function typeText() {
    if (!isDeleting && charIndex < textArray[textIndex].length) {
        currentText = textArray[textIndex].substring(0, charIndex + 1);
        charIndex++;
    } else if (isDeleting && charIndex > 0) {
        currentText = textArray[textIndex].substring(0, charIndex - 1);
        charIndex--;
    }

    kineticText.textContent = currentText;

    if (!isDeleting && charIndex === textArray[textIndex].length) {
        isDeleting = true;
        setTimeout(typeText, 2000); // Pause before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(typeText, 500); // Pause before typing new text
    } else {
        setTimeout(typeText, isDeleting ? 50 : 100);
    }
}

typeText();
