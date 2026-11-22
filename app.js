// SmileSpectrum Dental (PROTOTYPE): pages, booking, feedback
// Fictional clinic. Bookings and feedback are saved in this browser only,
// unless BOOKING_URL below is set (then bookings also go to your Google Sheet + email).

// Paste your Google Apps Script "Web app" link here to save bookings to a Google Sheet
// and send confirmation emails. Leave "" for demo mode (email opens in the visitor's own mail app).
const BOOKING_URL = "";

// ---------- helpers ----------
const $ = function (id) { return document.getElementById(id); };
const app = $("app");
const esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
const dept = function (id) { return DEPARTMENTS.find(function (d) { return d.id === id; }); };
const initials = function (n) { return n.replace("Dr. ", "").split(" ").map(function (w) { return w[0]; }).join(""); };
function load(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (e) { return fallback; } }
function store(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} }
function toast(msg) { const t = $("toast"); t.textContent = msg; t.classList.add("show"); setTimeout(function () { t.classList.remove("show"); }, 2600); }
function stars(n) { return "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n); }
function niceDate(iso) { return new Date(iso + "T00:00:00").toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" }); }

// ---------- reusable pieces ----------
function deptTile(d) {
  return '<a class="dept-tile" href="#dept/' + d.id + '" style="--c:' + d.color + ';--l:' + d.light + ';--g:' + d.grad + '">' +
    '<div class="tile-icon">' + d.icon + "</div><h3>" + esc(d.short) + "</h3><p>" + d.treatments.length + " treatments</p>" +
    '<span class="tile-go">Explore →</span></a>';
}
function doctorCard(s, i) {
  const d = dept(s.dept);
  return '<div class="doc" style="--c:' + d.color + ';--l:' + d.light + '">' +
    '<div class="avatar" style="background:' + d.grad + '">' + initials(s.name) + "</div>" +
    "<h3>" + esc(s.name) + '</h3><p class="doc-title">' + esc(s.title) + "</p>" +
    '<span class="dept-pill">' + d.icon + " " + esc(d.short) + "</span>" +
    '<p class="small">🗓️ ' + esc(s.days) + " · ⭐ " + s.exp + " yrs · 🗣️ " + esc(s.langs) + "</p>" +
    '<p class="sample-tag">Fictional profile</p>' +
    '<a class="btn" style="background:' + d.grad + '" href="#book/doc/' + i + '">Book with ' + esc(s.name.split(" ")[1]) + "</a></div>";
}
function feedbackCard(f) {
  const d = dept(f.dept);
  return '<div class="fb" style="--c:' + d.color + ';--l:' + d.light + '"><div class="fb-top"><span class="stars">' + stars(f.rating) + "</span>" +
    '<span class="dept-pill">' + d.icon + " " + esc(d.short) + "</span></div><p>“" + esc(f.text) + "”</p>" +
    '<p class="small"><b>' + esc(f.name) + "</b>" + (f.mine ? " · added in this browser" : " · sample feedback") + "</p></div>";
}

// ---------- PAGES ----------
const pages = {};

pages.home = function () {
  const fb = SAMPLE_FEEDBACK.slice(0, 3).map(feedbackCard).join("");
  return '<section class="hero">' +
    '<div class="hero-inner"><div>' +
    '<span class="chip-light">✨ 8 specialities · 9 specialists · one clinic</span>' +
    "<h1>Every smile deserves<br><span>a specialist.</span></h1>" +
    "<p>" + esc(CLINIC.tagline) + " From kids' first check-ups to braces, root canals and implants.</p>" +
    '<div class="hero-btns"><a class="btn big light" href="#book">📅 Book an appointment</a><a class="btn big ghost" href="#departments">Explore departments</a></div>' +
    "</div>" + heroArt() + "</div></section>" +

    '<section class="wrap"><div class="stats">' +
    stat("🏥", "8", "departments") + stat("👩‍⚕️", "9", "specialists") + stat("🦷", DEPARTMENTS.reduce(function (s, d) { return s + d.treatments.length; }, 0), "treatments") + stat("⏰", "6 days", "a week") +
    "</div>" +
    '<div class="section-head"><h2>Choose a department</h2><p>Tap a department to see its treatments, specialists and booking.</p></div>' +
    '<div class="dept-grid">' + DEPARTMENTS.map(deptTile).join("") + "</div>" +

    '<div class="section-head"><h2>How booking works</h2></div>' +
    '<div class="steps">' +
    step("1", "Pick a department", "Or a specialist you'd like to see.") +
    step("2", "Choose date & time", "Mon–Sat, 10 am to 8 pm.") +
    step("3", "Get a confirmation", "On screen, by email and as a calendar invite.") +
    "</div>" +

    '<div class="section-head"><h2>What patients say</h2><p>Sample feedback for this prototype · <a href="#feedback">See all</a></p></div>' +
    '<div class="fb-grid">' + fb + "</div></section>";
};
function stat(i, n, l) { return '<div class="stat"><span>' + i + "</span><strong>" + n + "</strong><small>" + l + "</small></div>"; }
function step(n, t, d) { return '<div class="step"><div class="step-n">' + n + "</div><h3>" + t + "</h3><p>" + d + "</p></div>"; }
function heroArt() {
  return '<svg class="hero-art" viewBox="0 0 240 240" aria-hidden="true">' +
    '<circle cx="120" cy="120" r="104" fill="rgba(255,255,255,.15)"/>' +
    '<path d="M120 52c-16-12-44-17-60-1-18 18-12 52-4 76 7 20 9 41 12 59 4 19 20 23 25 3 5-16 7-39 27-39s22 23 27 39c5 20 21 16 25-3 3-18 5-39 12-59 8-24 14-58-4-76-16-16-44-11-60 1z" fill="#fff" stroke="#fde68a" stroke-width="5"/>' +
    '<path d="M86 96q34 26 68 0" fill="none" stroke="#f472b6" stroke-width="7" stroke-linecap="round"/>' +
    '<circle cx="98" cy="80" r="6" fill="#1e293b"/><circle cx="142" cy="80" r="6" fill="#1e293b"/>' +
    '<text x="196" y="58" font-size="26">✨</text><text x="28" y="196" font-size="24">💙</text><text x="186" y="206" font-size="22">⭐</text></svg>';
}

pages.departments = function () {
  return '<section class="page-hero rainbow"><h1>Our departments</h1><p>Eight specialities, each with its own team and treatments.</p></section>' +
    '<section class="wrap"><div class="dept-grid">' + DEPARTMENTS.map(deptTile).join("") + "</div>" +
    DEPARTMENTS.map(function (d) {
      return '<div class="dept-row" style="--c:' + d.color + ';--l:' + d.light + '"><div class="dept-row-icon" style="background:' + d.grad + '">' + d.icon + "</div>" +
        "<div><h3>" + esc(d.name) + "</h3><p>" + esc(d.intro) + '</p><p class="small">' + d.treatments.map(function (t) { return esc(t.name); }).join(" · ") + "</p>" +
        '<a href="#dept/' + d.id + '">View department →</a></div></div>';
    }).join("") + "</section>";
};

pages.dept = function (id) {
  const d = dept(id);
  if (!d) return pages.notfound();
  const docs = SPECIALISTS.map(function (s, i) { return { s: s, i: i }; }).filter(function (x) { return x.s.dept === id; });
  const fb = SAMPLE_FEEDBACK.concat(load("ss_feedback", [])).filter(function (f) { return f.dept === id; });
  return '<section class="page-hero" style="background:' + d.grad + '"><div class="dept-hero-icon">' + d.icon + "</div>" +
    "<h1>" + esc(d.name) + "</h1><p>" + esc(d.intro) + "</p>" +
    '<a class="btn big light" href="#book/dept/' + d.id + '">📅 Book in ' + esc(d.short) + "</a></section>" +
    '<section class="wrap" style="--c:' + d.color + ";--l:" + d.light + ";--g:" + d.grad + '">' +
    '<div class="section-head"><h2>Treatments</h2><p>General information only; your dentist will advise what suits you.</p></div>' +
    '<div class="treat-grid">' + d.treatments.map(function (t) {
      return '<div class="treat"><h3>' + esc(t.name) + "</h3><p>" + esc(t.desc) + '</p><div class="treat-meta"><span>🗓️ ' + esc(t.visits) + "</span><span>⏱️ " + esc(t.time) + "</span></div></div>";
    }).join("") + "</div>" +
    '<div class="section-head"><h2>Specialists</h2></div><div class="doc-grid">' + docs.map(function (x) { return doctorCard(x.s, x.i); }).join("") + "</div>" +
    (fb.length ? '<div class="section-head"><h2>Feedback</h2></div><div class="fb-grid">' + fb.map(feedbackCard).join("") + "</div>" : "") +
    '<div class="other-depts"><h3>Other departments</h3><div class="mini-tiles">' + DEPARTMENTS.filter(function (x) { return x.id !== id; }).map(function (x) {
      return '<a href="#dept/' + x.id + '" style="background:' + x.light + ";color:" + x.color + '">' + x.icon + " " + esc(x.short) + "</a>";
    }).join("") + "</div></div></section>";
};

pages.specialists = function (filter) {
  const list = SPECIALISTS.map(function (s, i) { return { s: s, i: i }; }).filter(function (x) { return !filter || x.s.dept === filter; });
  return '<section class="page-hero rainbow"><h1>Our specialists</h1><p>Fictional profiles for this prototype.</p></section>' +
    '<section class="wrap"><div class="filter-chips"><a href="#specialists" class="' + (!filter ? "on" : "") + '">All</a>' +
    DEPARTMENTS.map(function (d) { return '<a href="#specialists/' + d.id + '" class="' + (filter === d.id ? "on" : "") + '" style="--c:' + d.color + '">' + d.icon + " " + esc(d.short) + "</a>"; }).join("") +
    '</div><div class="doc-grid">' + list.map(function (x) { return doctorCard(x.s, x.i); }).join("") + "</div></section>";
};

// ---------- BOOKING ----------
pages.book = function (kind, val) {
  let preDept = "", preDoc = "";
  if (kind === "dept") preDept = val;
  if (kind === "doc" && SPECIALISTS[val]) { preDoc = String(val); preDept = SPECIALISTS[val].dept; }
  const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().slice(0, 10);
  setTimeout(function () { setupBooking(preDept, preDoc); }, 0);
  return '<section class="page-hero rainbow"><h1>📅 Book an appointment</h1><p>Prototype booking: this does not reserve a real appointment.</p></section>' +
    '<section class="wrap narrow"><form id="bookForm" class="card form">' +
    '<div class="two"><label>Department<select name="dept" id="bDept" required><option value="">Choose…</option>' +
    DEPARTMENTS.map(function (d) { return '<option value="' + d.id + '">' + d.icon + " " + esc(d.name) + "</option>"; }).join("") + "</select></label>" +
    '<label>Specialist<select name="doc" id="bDoc"><option value="">Any available</option></select></label></div>' +
    '<div class="two"><label>Date<input type="date" name="date" id="bDate" min="' + minDate + '" required></label>' +
    '<label>Treatment (optional)<select name="treatment" id="bTreat"><option value="">Not sure / check-up</option></select></label></div>' +
    '<label>Time</label><div class="slots" id="bSlots">' + CLINIC.slots.map(function (s) { return '<button type="button" class="slot" data-t="' + s + '">' + s + "</button>"; }).join("") + "</div>" +
    '<div class="two"><label>Your name<input name="name" required placeholder="Full name"></label>' +
    '<label>Phone<input name="phone" type="tel" required placeholder="10-digit mobile" pattern="[0-9+ ]{10,15}"></label></div>' +
    '<label>Email (for your confirmation)<input name="email" type="email" required placeholder="you@example.com"></label>' +
    '<label>Anything we should know? (optional)<textarea name="notes" rows="2" placeholder="e.g. tooth pain on the lower left. Please don\'t share detailed medical history here."></textarea></label>' +
    '<label class="check"><input type="checkbox" required> I understand this is a <b>prototype</b> and no real appointment will be made.</label>' +
    '<button class="btn big grad" type="submit">Confirm booking</button></form></section>';
};

// Which weekdays a specialist works, from text like "Mon, Wed, Fri" or "Mon–Fri"
function worksOn(s, day) {
  const names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const range = s.days.match(/(\w{3})\s*[–-]\s*(\w{3})/);
  if (range) { const a = names.indexOf(range[1]), b = names.indexOf(range[2]); return day >= a && day <= b; }
  return s.days.split(",").map(function (x) { return x.trim(); }).indexOf(names[day]) >= 0;
}

function setupBooking(preDept, preDoc) {
  const deptSel = $("bDept"), docSel = $("bDoc"), treatSel = $("bTreat");
  let chosenTime = "";
  function fill() {
    const d = dept(deptSel.value);
    docSel.innerHTML = '<option value="">Any available</option>' + SPECIALISTS.map(function (s, i) { return s.dept === deptSel.value ? '<option value="' + i + '">' + esc(s.name) + " (" + esc(s.days) + ")</option>" : ""; }).join("");
    treatSel.innerHTML = '<option value="">Not sure / check-up</option>' + (d ? d.treatments.map(function (t) { return "<option>" + esc(t.name) + "</option>"; }).join("") : "");
    const form = $("bookForm");
    if (d) form.style.setProperty("--c", d.color); else form.style.removeProperty("--c");
  }
  deptSel.addEventListener("change", fill);
  deptSel.value = preDept; fill(); if (preDoc) docSel.value = preDoc;

  function checkDay() {
    const el = $("bDate"); if (!el.value) return;
    const day = new Date(el.value + "T00:00:00").getDay();
    if (day === 0) { toast("We're closed on Sundays (sample timings). Please pick another day."); el.value = ""; return; }
    if (docSel.value !== "" && !worksOn(SPECIALISTS[docSel.value], day)) {
      toast(SPECIALISTS[docSel.value].name + " is available " + SPECIALISTS[docSel.value].days + ". Please pick one of those days.");
      el.value = "";
    }
  }
  $("bDate").addEventListener("change", checkDay);
  docSel.addEventListener("change", checkDay);
  document.querySelectorAll(".slot").forEach(function (b) {
    b.addEventListener("click", function () { document.querySelectorAll(".slot").forEach(function (x) { x.classList.remove("on"); }); b.classList.add("on"); chosenTime = b.dataset.t; });
  });

  $("bookForm").addEventListener("submit", function (e) {
    e.preventDefault();
    if (!chosenTime) { toast("Please choose a time slot"); return; }
    const f = Object.fromEntries(new FormData(e.target).entries());
    const d = dept(f.dept);
    const doc = f.doc !== "" ? SPECIALISTS[f.doc].name : "Any available specialist";
    const booking = {
      id: "SS-" + Date.now().toString().slice(-6), dept: d.id, deptName: d.name, doctor: doc, treatment: f.treatment || "Consultation / check-up",
      date: f.date, time: chosenTime, name: f.name, phone: f.phone, email: f.email, notes: f.notes, status: "Booked", created: new Date().toISOString()
    };
    const all = load("ss_bookings", []); all.push(booking); store("ss_bookings", all);
    if (BOOKING_URL) {
      fetch(BOOKING_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain" }, body: JSON.stringify(booking) })
        .catch(function () {});
    }
    location.hash = "#booked/" + booking.id;
  });
}

pages.booked = function (id) {
  const b = load("ss_bookings", []).find(function (x) { return x.id === id; });
  if (!b) return pages.notfound();
  const d = dept(b.dept);
  return '<section class="page-hero" style="background:' + d.grad + '"><div class="dept-hero-icon">✅</div><h1>Booking confirmed</h1><p>Prototype confirmation · no real appointment has been made.</p></section>' +
    '<section class="wrap narrow"><div class="card confirm" style="--c:' + d.color + '">' +
    '<p class="big-id">' + b.id + "</p>" +
    row("Department", d.icon + " " + esc(b.deptName)) + row("Specialist", esc(b.doctor)) + row("Treatment", esc(b.treatment)) +
    row("Date & time", niceDate(b.date) + " · " + b.time) + row("Name", esc(b.name)) + row("Email", esc(b.email)) +
    '<p class="muted small">' + (BOOKING_URL ? "📧 A confirmation email is on its way to " + esc(b.email) + "." : "📧 Demo mode: click below to email yourself a copy from your own mail app.") + "</p>" +
    '<div class="btn-row"><button class="btn grad" onclick="emailCopy(\'' + b.id + '\')">📧 Email me a copy</button>' +
    '<button class="btn outline" onclick="downloadICS(\'' + b.id + '\')">🗓️ Add to calendar</button>' +
    '<a class="btn outline" href="#my-bookings">My bookings</a></div></div></section>';
};
function row(k, v) { return '<div class="kv"><span>' + k + "</span><b>" + v + "</b></div>"; }

function bookingText(b) {
  return "SmileSpectrum Dental (PROTOTYPE, not a real appointment)\n\nBooking ID: " + b.id + "\nDepartment: " + b.deptName + "\nSpecialist: " + b.doctor +
    "\nTreatment: " + b.treatment + "\nDate: " + niceDate(b.date) + "\nTime: " + b.time + "\nName: " + b.name + "\n\nThis is a demo booking from a prototype website.";
}
function emailCopy(id) {
  const b = load("ss_bookings", []).find(function (x) { return x.id === id; });
  location.href = "mailto:" + encodeURIComponent(b.email) + "?subject=" + encodeURIComponent("Your SmileSpectrum booking " + b.id + " (prototype)") + "&body=" + encodeURIComponent(bookingText(b));
}
function downloadICS(id) {
  const b = load("ss_bookings", []).find(function (x) { return x.id === id; });
  const m = b.time.match(/(\d+):(\d+) (am|pm)/); let h = Number(m[1]) % 12; if (m[3] === "pm") h += 12;
  const start = b.date.replace(/-/g, "") + "T" + String(h).padStart(2, "0") + m[2] + "00";
  const end = b.date.replace(/-/g, "") + "T" + String(h + 1).padStart(2, "0") + m[2] + "00";
  const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//SmileSpectrum//Prototype//EN", "BEGIN:VEVENT", "UID:" + b.id + "@smilespectrum.prototype",
    "DTSTAMP:" + new Date().toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z", "DTSTART:" + start, "DTEND:" + end,
    "SUMMARY:Dental appointment (PROTOTYPE) - " + b.deptName, "DESCRIPTION:" + bookingText(b).replace(/\n/g, "\\n"), "END:VEVENT", "END:VCALENDAR"].join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" })); a.download = b.id + ".ics"; a.click();
}

pages["my-bookings"] = function () {
  const all = load("ss_bookings", []).slice().sort(function (a, b) { return (a.date + a.time).localeCompare(b.date + b.time); });
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = all.filter(function (b) { return b.status === "Booked" && b.date >= today; });
  const byDept = DEPARTMENTS.map(function (d) { return { d: d, n: all.filter(function (b) { return b.dept === d.id; }).length }; });
  const max = Math.max.apply(null, byDept.map(function (x) { return x.n; }).concat([1]));
  return '<section class="page-hero rainbow"><h1>My bookings</h1><p>Bookings made in this browser (prototype).</p></section>' +
    '<section class="wrap"><div class="stats">' + stat("📅", all.length, "total bookings") + stat("⏳", upcoming.length, "upcoming") +
    stat("❌", all.filter(function (b) { return b.status === "Cancelled"; }).length, "cancelled") + stat("🏥", byDept.filter(function (x) { return x.n; }).length, "departments used") + "</div>" +
    (all.length ? '<div class="card"><h3>Bookings by department</h3>' + byDept.map(function (x) {
      return '<div class="bar-row"><span>' + x.d.icon + " " + esc(x.d.short) + '</span><div class="bar"><div style="width:' + (x.n / max * 100) + "%;background:" + x.d.grad + '"></div></div><b>' + x.n + "</b></div>";
    }).join("") + "</div>" : "") +
    (all.length ? all.map(function (b) {
      const d = dept(b.dept);
      return '<div class="booking ' + (b.status === "Cancelled" ? "cancelled" : "") + '" style="--c:' + d.color + '"><div class="b-icon" style="background:' + d.grad + '">' + d.icon + "</div>" +
        "<div><b>" + niceDate(b.date) + " · " + b.time + '</b><p class="small">' + esc(b.deptName) + " · " + esc(b.doctor) + " · " + esc(b.treatment) + '</p><p class="small muted">' + b.id + " · " + b.status + "</p></div>" +
        '<div class="b-actions"><a href="#booked/' + b.id + '">View</a>' + (b.status === "Booked" ? '<button onclick="cancelBooking(\'' + b.id + '\')">Cancel</button>' : "") + "</div></div>";
    }).join("") : '<div class="card empty"><p>No bookings yet.</p><a class="btn grad" href="#book">Book your first appointment</a></div>') + "</section>";
};
function cancelBooking(id) {
  const all = load("ss_bookings", []); const b = all.find(function (x) { return x.id === id; });
  if (b) { b.status = "Cancelled"; store("ss_bookings", all); render(); toast("Booking " + id + " cancelled"); }
}

// ---------- FEEDBACK ----------
pages.feedback = function (filter) {
  const all = load("ss_feedback", []).concat(SAMPLE_FEEDBACK);
  const list = all.filter(function (f) { return !filter || f.dept === filter; });
  const avg = list.length ? list.reduce(function (s, f) { return s + f.rating; }, 0) / list.length : 0;
  setTimeout(setupFeedback, 0);
  return '<section class="page-hero rainbow"><h1>Patient feedback</h1><p>Sample feedback for this prototype, plus anything you add in this browser.</p></section>' +
    '<section class="wrap"><div class="rating-big"><strong>' + avg.toFixed(1) + '</strong><span class="stars">' + stars(Math.round(avg)) + "</span><small>" + list.length + " reviews · sample data</small></div>" +
    '<div class="filter-chips"><a href="#feedback" class="' + (!filter ? "on" : "") + '">All</a>' +
    DEPARTMENTS.map(function (d) { return '<a href="#feedback/' + d.id + '" class="' + (filter === d.id ? "on" : "") + '" style="--c:' + d.color + '">' + d.icon + " " + esc(d.short) + "</a>"; }).join("") + "</div>" +
    '<div class="fb-grid">' + list.map(feedbackCard).join("") + "</div>" +
    '<form id="fbForm" class="card form"><h3>✍️ Share your feedback</h3><p class="small muted">Saved in this browser only. Please don\'t include personal or medical details.</p>' +
    '<div class="two"><label>Your first name<input name="name" required maxlength="30"></label><label>Department<select name="dept" required>' +
    DEPARTMENTS.map(function (d) { return '<option value="' + d.id + '">' + d.icon + " " + esc(d.short) + "</option>"; }).join("") + "</select></label></div>" +
    '<label>Rating</label><div class="star-pick" id="starPick">' + [1, 2, 3, 4, 5].map(function (n) { return '<button type="button" data-n="' + n + '">★</button>'; }).join("") + "</div>" +
    '<label>Your feedback<textarea name="text" rows="3" required maxlength="300"></textarea></label>' +
    '<button class="btn grad" type="submit">Post feedback</button></form></section>';
};
function setupFeedback() {
  let rating = 5;
  const paint = function () { document.querySelectorAll("#starPick button").forEach(function (b) { b.classList.toggle("on", Number(b.dataset.n) <= rating); }); };
  document.querySelectorAll("#starPick button").forEach(function (b) { b.addEventListener("click", function () { rating = Number(b.dataset.n); paint(); }); });
  paint();
  $("fbForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.target).entries());
    const all = load("ss_feedback", []);
    all.unshift({ name: f.name, dept: f.dept, rating: rating, text: f.text, mine: true });
    store("ss_feedback", all); render(); toast("Thanks for your feedback!");
  });
}

pages.about = function () {
  return '<section class="page-hero" style="background:linear-gradient(135deg,#f59e0b,#f97316)"><div class="dept-hero-icon">🧪</div><h1>Prototype notice</h1><p>Please read before using this site.</p></section>' +
    '<section class="wrap narrow"><div class="card about">' +
    "<p><b>SmileSpectrum Dental is not a real clinic.</b> This website is a prototype built to demonstrate how a multi-speciality dental clinic could present its departments, treatments, specialists, online booking and patient feedback.</p>" +
    "<ul><li>All <b>doctors are fictional</b>; names, qualifications and timings are sample content.</li>" +
    "<li><b>Bookings are not real appointments.</b> No clinic will contact you or keep a slot for you.</li>" +
    "<li>Feedback shown is <b>sample feedback</b>, not from real patients. Feedback you add is stored only in your browser.</li>" +
    "<li>Treatment descriptions are general information, <b>not medical advice</b>.</li>" +
    "<li>For security and privacy, please <b>don't enter real medical history</b> or sensitive personal information.</li>" +
    "<li>In a dental emergency, contact a real dentist or hospital.</li></ul>" +
    '<p class="small muted">Built by Anjali Bhushan (IIM Kozhikode) as a portfolio project.</p></div></section>';
};
pages.notfound = function () { return '<section class="wrap narrow"><div class="card empty"><h2>Page not found</h2><a class="btn grad" href="#home">Go home</a></div></section>'; };

// ---------- ROUTER ----------
function render() {
  const parts = (location.hash.replace(/^#/, "") || "home").split("/");
  const name = parts[0];
  const page = pages[name] || pages.notfound;
  app.innerHTML = page(parts[1], parts[2]);
  document.querySelectorAll("#nav a").forEach(function (a) { a.classList.toggle("active", a.dataset.page === name || (name === "dept" && a.dataset.page === "departments")); });
  $("nav").classList.remove("open");
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", render);
$("menuBtn").addEventListener("click", function () { $("nav").classList.toggle("open"); });
render();
