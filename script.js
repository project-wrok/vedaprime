// Sticky Footer Countdown Timer
(function () {
  let totalSeconds = 15 * 60;
  const timerEl = document.getElementById("stickyTimer");

  if (!timerEl) return;

  function updateTimer() {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;

    timerEl.textContent =
      `${String(m).padStart(2, "0")} : ${String(s).padStart(2, "0")}`;

    totalSeconds--;

    if (totalSeconds < 0) {
      totalSeconds = 15 * 60;
    }
  }

  updateTimer();
  setInterval(updateTimer, 1000);
})();
// Google Apps Script Web App URL for Sheet:
// https://docs.google.com/spreadsheets/d/1hX9aCKitEjgVPic2EN_AWPupsnWqSkFG35BXMC_RP-0/edit
const GOOGLE_SHEET_WEBAPP_URL =
  "https://script.google.com/macros/s/AKfycbwNVPI8Wd8KbERnD7wLb-wj0c25w3HqpEsXLj5oPiCQM0oDxA-rthmQ0hhbKmSlh28ffg/exec";

function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = document.getElementById("leadForm");
  const submitBtn = form.querySelector(".form-submit-btn");

  const name = document.getElementById("nameInput").value.trim();
  const age = parseInt(document.getElementById("ageInput").value, 10);
  const weight = parseInt(document.getElementById("weightInput").value, 10);
  const phone = document.getElementById("phoneInput").value.trim();
  const address = document.getElementById("addressInput").value.trim();
  const zip = document.getElementById("zipInput").value.trim();

  if (!name || name.length < 2) {
    alert("कृपया अपना पूरा नाम सही से दर्ज करें।");
    return;
  }

  if (isNaN(age) || age < 18 || age > 85) {
    alert("कृपया वैध उम्र दर्ज करें (18 से 85 वर्ष के बीच)।");
    return;
  }

  if (isNaN(weight) || weight < 35 || weight > 150) {
    alert("कृपया वैध वजन दर्ज करें (35 से 150 kg के बीच)।");
    return;
  }

  if (!/^[6-9]\d{9}$/.test(phone)) {
    alert("कृपया वैध 10 अंकों का भारतीय मोबाइल नंबर दर्ज करें।");
    return;
  }

  if (!address || address.length < 5) {
    alert("कृपया अपना पूरा पता दर्ज करें।");
    return;
  }

  if (!/^[1-9]\d{5}$/.test(zip)) {
    alert("कृपया वैध 6 अंकों का पिन कोड दर्ज करें।");
    return;
  }

  // Disable submit button & show loading state
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = "कृपया प्रतीक्षा करें... (Submitting...)";
    submitBtn.style.opacity = "0.7";
    submitBtn.style.cursor = "not-allowed";
  }

  const formData = new FormData(form);
  formData.append("product", "vedantara Shakti Capsule");
  formData.append("price", "₹2,490");

  // Store in sessionStorage for thanks page
  sessionStorage.setItem("order_name", name);
  sessionStorage.setItem("order_phone", phone);
  sessionStorage.setItem("order_address", address);
  sessionStorage.setItem("order_zip", zip);

  const msg = document.getElementById("orderSuccessMsg");
  if (msg) {
    msg.style.display = "block";
    msg.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  // Send lead data to Google Sheet
  if (
    GOOGLE_SHEET_WEBAPP_URL &&
    GOOGLE_SHEET_WEBAPP_URL !== "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL"
  ) {
    
    fetch(GOOGLE_SHEET_WEBAPP_URL, {
      method: "POST",
      body: formData,
      mode: "no-cors",
    })
    
      .then(() => {
        fbq('track', 'Purchase', {
        content_name: 'VEDANTARA Naturals CAPSULE',
        content_category: 'Health & Beauty',
        content_ids: ['VEDANTARA-NATURALS-CAPSULE'],
        content_type: 'product',
        value: 2400,
        currency: 'INR'
  });
        
        setTimeout(() => {
          
          window.location.href = "thanks.html";
        }, 600);
      })
      
      .catch((err) => {
        console.error("Sheet submit error:", err);
        setTimeout(() => {
          window.location.href = "thanks.html";
        }, 600);
      });
  } else {
    // If Web App URL is not yet replaced, redirect smoothly
    setTimeout(() => {
      window.location.href = "thanks.html";
    }, 800);
  }
}
