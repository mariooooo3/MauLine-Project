/* ── DATA ─────────────────────────────────────────────────────── */
const RIDERS_DB = [
  { username:"user1", password:"pass1", firstName:"Sorin",  lastName:"Marin",  budget:150, spendings:0, preferences:["Calm","Fast","ElectricCar","Friendly"], rating:4.2 },
  { username:"user2", password:"pass2", firstName:"Ana",    lastName:"Pop",    budget:300, spendings:0, preferences:["PetFriendly","Friendly","Clean","Fast"],   rating:4.6 },
  { username:"user3", password:"pass3", firstName:"Bianca", lastName:"Luca",   budget:80,  spendings:0, preferences:["Calm","Clean","Confort","Silent"],          rating:4.0 },
  { username:"user4", password:"pass4", firstName:"Tudor",  lastName:"Dima",   budget:200, spendings:0, preferences:["Modern","Fast","Sport","Music"],            rating:3.9 },
  { username:"user5", password:"pass5", firstName:"Denisa", lastName:"Matei",  budget:500, spendings:0, preferences:["Luxury","Calm","Professional","Clean"],     rating:4.8 },
];

const DRIVERS_DB = [
  { username:"driver1", password:"dpass1", firstName:"Adrian", lastName:"Ionescu", experience:4, qualities:["Calm","ElectricCar","Confort","Clean","Friendly"],    isAvailable:true,  carModel:"Tesla Model 3",   earnings:0, rating:4.7, rides:0 },
  { username:"driver2", password:"dpass2", firstName:"Mihai",  lastName:"Popescu", experience:5, qualities:["Fast","Modern","Sport","Music","Friendly"],           isAvailable:true,  carModel:"BMW M3",           earnings:0, rating:4.5, rides:0 },
  { username:"driver3", password:"dpass3", firstName:"Maria",  lastName:"Stan",    experience:3, qualities:["Clean","Friendly","PetFriendly","Calm","Confort"],    isAvailable:true,  carModel:"Dacia Spring",     earnings:0, rating:4.1, rides:0 },
  { username:"driver4", password:"dpass4", firstName:"Ioan",   lastName:"Vlad",    experience:4, qualities:["PetFriendly","Calm","Silent","ElectricCar","Friendly"],isAvailable:true,  carModel:"Toyota Prius",    earnings:0, rating:4.3, rides:0 },
  { username:"driver5", password:"dpass5", firstName:"Elena",  lastName:"Radu",    experience:5, qualities:["Luxury","Calm","Professional","Clean","Confort"],     isAvailable:false, carModel:"Mercedes S-Class", earnings:0, rating:4.9, rides:0 },
];

const RIDE_TYPES = {
  Economic: { icon:"🍃", baseFee:10, perKm:2,  badge:"rb-economic" },
  Regular:  { icon:"🚗", baseFee:15, perKm:4,  badge:"rb-regular"  },
  Comfort:  { icon:"💎", baseFee:30, perKm:6,  badge:"rb-comfort"  },
};

const PAYMENT_ICONS = { Cash:"💵", CreditCard:"💳", Revolut:"📱", Voucher:"🎟️" };

const AVATAR_COLORS_RIDER  = ["#4CAF50","#22c55e","#10b981","#14b8a6","#06b6d4"];
const AVATAR_COLORS_DRIVER = ["#3b82f6","#6366f1","#8b5cf6","#ec4899","#f43f5e"];

const CRITERIA = ["Communication","Punctuality","Professionalism","Safety","Respectfulness","Cleanliness"];

/* ── STATE ────────────────────────────────────────────────────── */
const state = {
  currentUser: null,
  currentRole: null,
  rides: [],
  notifications: [],
  signInRole: "rider",
  signUpRole: "rider",
  book: { rider:null, driver:null, rideType:null, payment:null },
  ratingScores: {},
  pendingRideForRating: null,
};

/* ── AUTH ─────────────────────────────────────────────────────── */
function selectRole(role, btn) {
  state.signInRole = role;
  document.querySelectorAll("#tab-signin .role-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}
function selectRoleSignup(role, btn) {
  state.signUpRole = role;
  document.querySelectorAll("#tab-signup .role-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById("su-rider-fields").style.display  = role === "rider"  ? "contents" : "none";
  document.getElementById("su-driver-fields").style.display = role === "driver" ? "contents" : "none";
}
function switchTab(tab) {
  document.querySelectorAll(".tab-btn").forEach((b,i) => b.classList.toggle("active", (i===0 && tab==="signin") || (i===1 && tab==="signup")));
  document.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active"));
  document.getElementById("tab-"+tab).classList.add("active");
}
function doSignIn() {
  const u = v("si-username"), p = v("si-password");
  const db = state.signInRole === "rider" ? RIDERS_DB : DRIVERS_DB;
  const found = db.find(x => x.username === u && x.password === p);
  if (!found) { document.getElementById("si-error").textContent = "Invalid credentials."; return; }
  document.getElementById("si-error").textContent = "";
  loginAs(found, state.signInRole);
}
function doSignUp() {
  const first = v("su-first"), last = v("su-last"), user = v("su-username"), pass = v("su-password");
  if (!first||!last||!user||!pass) { document.getElementById("su-error").textContent = "Fill all required fields."; return; }
  const all = [...RIDERS_DB, ...DRIVERS_DB];
  if (all.find(x => x.username === user)) { document.getElementById("su-error").textContent = "Username taken."; return; }
  if (state.signUpRole === "rider") {
    const budget = parseFloat(v("su-budget")) || 100;
    const prefs  = v("su-prefs").split(",").map(s=>s.trim()).filter(Boolean);
    const nu = { username:user, password:pass, firstName:first, lastName:last, budget, spendings:0, preferences:prefs, rating:5.0 };
    RIDERS_DB.push(nu);
    loginAs(nu, "rider");
  } else {
    const car  = v("su-car");
    const exp  = parseInt(v("su-exp")) || 1;
    const quals = v("su-quals").split(",").map(s=>s.trim()).filter(Boolean);
    if (!car) { document.getElementById("su-error").textContent = "Enter a car model."; return; }
    const nu = { username:user, password:pass, firstName:first, lastName:last, experience:exp, qualities:quals, isAvailable:true, carModel:car, earnings:0, rating:5.0, rides:0 };
    DRIVERS_DB.push(nu);
    loginAs(nu, "driver");
  }
}
function loginAs(user, role) {
  state.currentUser = user;
  state.currentRole = role;
  document.getElementById("page-login").classList.remove("active");
  document.getElementById("page-app").classList.add("active");
  document.getElementById("user-display-name").textContent = user.firstName;
  const av = document.getElementById("user-avatar");
  av.textContent = user.firstName[0];
  av.style.background = role === "rider" ? AVATAR_COLORS_RIDER[0] : AVATAR_COLORS_DRIVER[0];
  // Show rides nav only for riders
  document.getElementById("nav-rides-li").style.display = role === "rider" ? "" : "none";
  sendWelcomeNotif(user, role);
  initDashboard();
  navigate("dashboard", document.querySelector("[data-page=dashboard]"));
}
function doLogout() {
  state.currentUser = null; state.currentRole = null; state.notifications = [];
  updateNotifCount();
  document.getElementById("page-app").classList.remove("active");
  document.getElementById("page-login").classList.add("active");
}

/* ── NOTIFICATIONS ────────────────────────────────────────────── */
function sendWelcomeNotif(user, role) {
  const driversNearby = DRIVERS_DB.filter(d=>d.isAvailable).length;
  const ridersNearby  = RIDERS_DB.length;
  if (role === "rider") {
    addNotif(`🧍 Welcome ${user.firstName}! First 3 rides get 20% discount!`);
    addNotif(`🚗 ${driversNearby} drivers available in your area.`);
  } else {
    addNotif(`🚗 Welcome ${user.firstName}! Exclusive this week: 20% bonus earnings!`);
    addNotif(`🧍 ${ridersNearby} riders in your area.`);
  }
}
function addNotif(msg) {
  state.notifications.unshift({ msg, time: new Date().toLocaleTimeString() });
  updateNotifCount();
  renderNotifPanel();
}
function updateNotifCount() {
  const el = document.getElementById("notif-count");
  const n  = state.notifications.length;
  el.textContent = n > 9 ? "9+" : n;
  el.dataset.zero = n === 0 ? "true" : "false";
}
function renderNotifPanel() {
  const list = document.getElementById("notif-list");
  list.innerHTML = state.notifications.length === 0
    ? "<p style='color:var(--text-muted);font-size:.85rem'>No notifications.</p>"
    : state.notifications.map(n => `<div class="notif-item">🔔 ${n.msg}<br><small style="color:var(--text-muted)">${n.time}</small></div>`).join("");
}
function toggleNotifPanel() {
  const p = document.getElementById("notif-panel");
  p.classList.toggle("hidden");
  if (!p.classList.contains("hidden")) renderNotifPanel();
}

/* ── NAVIGATION ───────────────────────────────────────────────── */
const PAGE_TITLES = { dashboard:"Dashboard", book:"Book a Ride", rides:"My Rides", users:"Users", stats:"Statistics" };
function navigate(page, btn) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
  document.getElementById("section-"+page).classList.add("active");
  if (btn) btn.classList.add("active");
  document.getElementById("page-title").textContent = PAGE_TITLES[page] || page;
  document.getElementById("notif-panel").classList.add("hidden");
  if (page === "book")   initBook();
  if (page === "users")  initUsers();
  if (page === "stats")  initStats();
  if (page === "rides")  renderRidesList();
}

/* ── DASHBOARD ────────────────────────────────────────────────── */
function initDashboard() {
  document.getElementById("stat-riders").textContent  = RIDERS_DB.length;
  document.getElementById("stat-drivers").textContent = DRIVERS_DB.length;
  updateDashStats();
  renderDashDrivers();
  renderRecentRides();
}
function updateDashStats() {
  document.getElementById("stat-rides").textContent   = state.rides.length;
  const rev = state.rides.reduce((s,r) => s + r.price, 0);
  document.getElementById("stat-revenue").textContent = rev.toFixed(0) + " lei";
}
function renderDashDrivers() {
  const el = document.getElementById("dashboard-drivers");
  el.innerHTML = DRIVERS_DB.map((d,i) => `
    <div class="driver-mini">
      <div class="dm-avatar" style="background:${AVATAR_COLORS_DRIVER[i%AVATAR_COLORS_DRIVER.length]}">${d.firstName[0]}</div>
      <div class="dm-info">
        <strong>${d.firstName} ${d.lastName}</strong>
        <span>${d.carModel}</span>
      </div>
      <span class="dm-status ${d.isAvailable ? 'online':'offline'}">${d.isAvailable ? 'Online':'Offline'}</span>
    </div>`).join("");
}
function renderRecentRides() {
  const el = document.getElementById("recent-rides-list");
  if (!state.rides.length) {
    el.innerHTML = `<p class="empty-state">No rides yet. <a href="#" onclick="navigate('book',document.querySelector('[data-page=book]'))">Book one!</a></p>`;
    return;
  }
  el.innerHTML = [...state.rides].reverse().slice(0,5).map(r => `
    <div class="activity-item">
      <span class="ai-icon">${RIDE_TYPES[r.type].icon}</span>
      <div class="ai-info">
        <strong>${r.rider} → ${r.driver}</strong>
        <span>${r.type} · ${r.payment} · ${r.time}</span>
      </div>
      <span class="ai-price">${r.price.toFixed(0)} lei</span>
    </div>`).join("");
}

/* ── BOOK FLOW ────────────────────────────────────────────────── */
let currentBookStep = 1;
function initBook() {
  currentBookStep = 1;
  state.book = { rider:null, driver:null, rideType:null, payment:null };
  goBookStep(1);
  renderBookRiders();
}
function goBookStep(n) {
  if (n < 1 || n > 4) return;
  if (n === 2 && !state.book.rider)  { toast("Select a rider first.", "error"); return; }
  if (n === 3 && !state.book.driver) { toast("Select a driver first.", "error"); return; }
  if (n === 4 && !state.book.rideType) { toast("Select a ride type first.", "error"); return; }
  currentBookStep = n;
  document.querySelectorAll(".book-step").forEach(s => s.classList.remove("active-step"));
  document.getElementById("book-step-"+n).classList.add("active-step");
  for (let i=1;i<=4;i++) {
    const dot = document.getElementById("dot-"+i);
    dot.classList.toggle("active", i === n);
    dot.classList.toggle("done", i < n);
  }
  if (n === 2) renderBookDrivers();
  if (n === 4) renderBookSummary();
}
function renderBookRiders() {
  const el = document.getElementById("book-rider-grid");
  const list = state.currentRole === "rider" ? [state.currentUser] : RIDERS_DB;
  el.innerHTML = list.map((r,i) => `
    <div class="user-card ${state.book.rider?.username === r.username ? 'selected':''}" onclick="selectBookRider('${r.username}', this)">
      <div class="uc-avatar" style="background:${AVATAR_COLORS_RIDER[i%AVATAR_COLORS_RIDER.length]};color:#000">${r.firstName[0]}</div>
      <div class="uc-name">${r.firstName} ${r.lastName}</div>
      <div class="uc-sub">Budget: ${r.budget} lei</div>
      <div class="uc-tags">${r.preferences.slice(0,3).map(p=>`<span class="tag">${p}</span>`).join("")}</div>
      <div class="uc-rating">⭐ ${r.rating.toFixed(1)}</div>
    </div>`).join("");
}
function selectBookRider(username, card) {
  state.book.rider = RIDERS_DB.find(r=>r.username===username);
  document.querySelectorAll("#book-rider-grid .user-card").forEach(c=>c.classList.remove("selected"));
  card.classList.add("selected");
  setTimeout(()=>goBookStep(2), 300);
}
function renderBookDrivers() {
  const el = document.getElementById("book-driver-grid");
  el.innerHTML = DRIVERS_DB.map((d,i) => `
    <div class="user-card ${!d.isAvailable ? 'unavailable':''} ${state.book.driver?.username===d.username?'selected':''}" onclick="${d.isAvailable ? `selectBookDriver('${d.username}',this)` : ''}">
      <div class="uc-avatar" style="background:${AVATAR_COLORS_DRIVER[i%AVATAR_COLORS_DRIVER.length]};color:#fff">${d.firstName[0]}</div>
      <div class="uc-name">${d.firstName} ${d.lastName}</div>
      <div class="uc-sub">${d.carModel} · ${d.experience}yr exp</div>
      <div class="uc-tags">${d.qualities.slice(0,3).map(q=>`<span class="tag">${q}</span>`).join("")}</div>
      <div class="uc-rating">⭐ ${d.rating.toFixed(1)} ${!d.isAvailable ? '<span style="color:var(--red);font-size:.72rem">· Unavailable</span>':''}</div>
    </div>`).join("");
}
function selectBookDriver(username, card) {
  state.book.driver = DRIVERS_DB.find(d=>d.username===username);
  document.querySelectorAll("#book-driver-grid .user-card").forEach(c=>c.classList.remove("selected"));
  card.classList.add("selected");
  setTimeout(()=>goBookStep(3), 300);
}
function selectRideType(type, card) {
  state.book.rideType = type;
  document.querySelectorAll(".ride-type-card").forEach(c=>c.classList.remove("selected"));
  card.classList.add("selected");
}
function selectPayment(method, card) {
  state.book.payment = method;
  document.querySelectorAll(".payment-card").forEach(c=>c.classList.remove("selected"));
  card.classList.add("selected");
  document.getElementById("confirm-ride-btn").disabled = false;
  renderBookSummary();
}
function renderBookSummary() {
  const { rider, driver, rideType, payment } = state.book;
  if (!rider || !driver || !rideType) return;
  const rt = RIDE_TYPES[rideType];
  const km = +(5 + Math.random()*20).toFixed(1);
  const price = rt.baseFee + rt.perKm * km;
  state.book.km    = km;
  state.book.price = +price.toFixed(2);
  document.getElementById("book-summary").innerHTML = `
    <div>🧍 <strong>Rider:</strong> ${rider.firstName} ${rider.lastName}</div>
    <div>🚗 <strong>Driver:</strong> ${driver.firstName} ${driver.lastName} (${driver.carModel})</div>
    <div>${rt.icon} <strong>Type:</strong> ${rideType}</div>
    <div>📍 <strong>Distance:</strong> ${km} km</div>
    ${payment ? `<div>${PAYMENT_ICONS[payment]} <strong>Payment:</strong> ${payment}</div>` : ""}
    <div>💰 <strong>Estimated:</strong> <strong>${price.toFixed(0)} lei</strong></div>`;
}
function confirmRide() {
  const { rider, driver, rideType, payment, km, price } = state.book;
  if (!rider || !driver || !rideType || !payment) { toast("Complete all steps first.", "error"); return; }
  if (rider.budget < price) { toast("Insufficient budget!", "error"); return; }
  runRideAnimation(rider, driver, rideType, payment, km, price);
}

/* ── RIDE ANIMATION ───────────────────────────────────────────── */
function runRideAnimation(rider, driver, type, payment, km, price) {
  document.querySelectorAll(".section").forEach(s=>s.classList.remove("active"));
  document.getElementById("section-rideanim").classList.add("active");
  document.getElementById("page-title").textContent = "On the Way…";

  const carEl   = document.getElementById("anim-car");
  const statusEl = document.getElementById("anim-status");
  const prog    = document.getElementById("anim-progress");
  const detEl   = document.getElementById("anim-details");
  const doneBtn = document.getElementById("anim-done-btn");

  const rt = RIDE_TYPES[type];
  carEl.textContent = rt.icon;
  doneBtn.style.display = "none";
  prog.style.width = "0";

  const steps = [
    [300,  "Finding your driver…",             "🔍 Connecting to nearby drivers…"],
    [1200, `Driver found: ${driver.firstName}!`, `🚗 ${driver.carModel} is on the way\n📍 ETA ~${Math.ceil(km/2)} min`],
    [2400, "Driver is arriving…",              `⭐ Rating: ${driver.rating.toFixed(1)} · ${driver.experience}yr exp`],
    [3600, "Ride in progress…",                `🛣️ ${km} km · ${type} ride\n💨 Estimated arrival: ${Math.ceil(km*1.5)} min`],
    [4800, "Almost there…",                    `💰 Price: ${price.toFixed(0)} lei\n${PAYMENT_ICONS[payment]} ${payment}`],
    [5800, "Arrived! 🎉",                      `✅ Ride complete!\n🧍 ${rider.firstName} → ${driver.firstName}`],
  ];

  steps.forEach(([delay, status, detail], idx) => {
    setTimeout(() => {
      statusEl.textContent = status;
      detEl.innerHTML = detail.replace(/\n/g,"<br>");
      prog.style.width = ((idx+1)/steps.length*100)+"%";
    }, delay);
  });

  setTimeout(() => {
    // Commit ride
    rider.budget   -= price;
    rider.spendings = (rider.spendings||0) + price;
    driver.earnings = (driver.earnings||0) + price;
    driver.rides    = (driver.rides||0) + 1;
    const rideRec = { rider:rider.firstName+" "+rider.lastName, driver:driver.firstName+" "+driver.lastName, type, payment, price, km, time:new Date().toLocaleTimeString() };
    state.rides.push(rideRec);
    updateDashStats();
    renderRecentRides();
    addNotif(`✅ Ride complete! ${type} · ${price.toFixed(0)} lei`);
    doneBtn.style.display = "";
    state.pendingRideForRating = { rider, driver, rideRec };
  }, 6400);
}
function finishRide() {
  document.querySelectorAll(".section").forEach(s=>s.classList.remove("active"));
  document.getElementById("section-dashboard").classList.add("active");
  document.querySelectorAll(".nav-btn").forEach(b=>b.classList.remove("active"));
  document.querySelector("[data-page=dashboard]").classList.add("active");
  document.getElementById("page-title").textContent = "Dashboard";
  if (state.pendingRideForRating) openRatingModal();
}

/* ── RATING MODAL ─────────────────────────────────────────────── */
function openRatingModal() {
  state.ratingScores = {};
  const list = document.getElementById("rating-criteria-list");
  list.innerHTML = CRITERIA.map(c => `
    <div class="rc-row">
      <span class="rc-label">${c}</span>
      <div class="rc-stars">${[1,2,3,4,5].map(n=>`<span class="rc-star" onclick="setScore('${c}',${n},this.parentElement)">⭐</span>`).join("")}</div>
    </div>`).join("");
  const { driver } = state.pendingRideForRating;
  document.getElementById("rate-subtitle").textContent = `Rate ${driver.firstName} ${driver.lastName}`;
  document.getElementById("rating-modal").classList.remove("hidden");
}
function setScore(crit, n, starsEl) {
  state.ratingScores[crit] = n;
  starsEl.querySelectorAll(".rc-star").forEach((s,i) => s.classList.toggle("lit", i < n));
}
function submitRating() {
  const scores = Object.values(state.ratingScores);
  if (scores.length < CRITERIA.length) { toast("Rate all criteria!", "error"); return; }
  const avg = scores.reduce((a,b)=>a+b,0) / scores.length;
  const { driver } = state.pendingRideForRating;
  driver.rating = +((driver.rating + avg) / 2).toFixed(2);
  state.pendingRideForRating = null;
  document.getElementById("rating-modal").classList.add("hidden");
  toast(`Rating submitted! Driver avg: ⭐ ${driver.rating.toFixed(1)}`, "success");
  initStats();
}

/* ── MY RIDES ─────────────────────────────────────────────────── */
function renderRidesList() {
  const el = document.getElementById("rides-list");
  const myRides = state.currentRole === "rider"
    ? state.rides.filter(r => r.rider === state.currentUser.firstName+" "+state.currentUser.lastName)
    : state.rides.filter(r => r.driver === state.currentUser.firstName+" "+state.currentUser.lastName);
  if (!myRides.length) {
    el.innerHTML = `<div class="card"><p class="empty-state">No rides yet.</p></div>`;
    return;
  }
  el.innerHTML = [...myRides].reverse().map(r => {
    const rt = RIDE_TYPES[r.type];
    return `<div class="ride-item">
      <span class="ride-item-icon">${rt.icon}</span>
      <div class="ride-item-info">
        <strong>${r.rider} → ${r.driver}</strong>
        <span>${r.time} · ${r.km} km</span>
        <span class="ride-badge ${rt.badge}">${r.type}</span>
      </div>
      <div class="ride-item-right">
        <div class="ri-price">${r.price.toFixed(0)} lei</div>
        <div class="ri-pay">${PAYMENT_ICONS[r.payment]} ${r.payment}</div>
      </div>
    </div>`;
  }).join("");
}

/* ── USERS ────────────────────────────────────────────────────── */
function initUsers() {
  renderUsersRiders();
  renderUsersDrivers();
}
function switchUsersTab(tab, btn) {
  document.querySelectorAll(".utab").forEach(b=>b.classList.remove("active"));
  document.querySelectorAll(".users-panel").forEach(p=>p.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById("users-"+tab+"-panel").classList.add("active");
}
function renderUsersRiders() {
  const el = document.getElementById("users-riders-grid");
  el.innerHTML = RIDERS_DB.map((r,i) => `
    <div class="ucard">
      <div class="ucard-head">
        <div class="ucard-avatar" style="background:${AVATAR_COLORS_RIDER[i%AVATAR_COLORS_RIDER.length]};color:#000">${r.firstName[0]}</div>
        <div>
          <div class="ucard-name">${r.firstName} ${r.lastName}</div>
          <div class="ucard-username">@${r.username}</div>
        </div>
      </div>
      <div class="ucard-info">
        <div><strong>Budget:</strong> ${r.budget} lei</div>
        <div><strong>Spent:</strong> ${(r.spendings||0).toFixed(0)} lei</div>
      </div>
      <div class="ucard-tags">${r.preferences.map(p=>`<span class="tag">${p}</span>`).join("")}</div>
      <div class="ucard-status-row">
        <span class="stars">${starsStr(r.rating)}</span>
        <span style="font-size:.78rem;color:var(--text-muted)">${r.rating.toFixed(1)}</span>
      </div>
    </div>`).join("");
}
function renderUsersDrivers() {
  const el = document.getElementById("users-drivers-grid");
  el.innerHTML = DRIVERS_DB.map((d,i) => `
    <div class="ucard">
      <div class="ucard-head">
        <div class="ucard-avatar" style="background:${AVATAR_COLORS_DRIVER[i%AVATAR_COLORS_DRIVER.length]};color:#fff">${d.firstName[0]}</div>
        <div>
          <div class="ucard-name">${d.firstName} ${d.lastName}</div>
          <div class="ucard-username">@${d.username}</div>
        </div>
      </div>
      <div class="ucard-info">
        <div><strong>Car:</strong> ${d.carModel}</div>
        <div><strong>Experience:</strong> ${d.experience} years</div>
        <div><strong>Earnings:</strong> ${(d.earnings||0).toFixed(0)} lei</div>
        <div><strong>Rides:</strong> ${d.rides||0}</div>
      </div>
      <div class="ucard-tags">${d.qualities.map(q=>`<span class="tag">${q}</span>`).join("")}</div>
      <div class="ucard-status-row">
        <span class="dm-status ${d.isAvailable?'online':'offline'}">${d.isAvailable?'Online':'Offline'}</span>
        <span class="stars">${starsStr(d.rating)}</span>
      </div>
    </div>`).join("");
}

/* ── STATS ────────────────────────────────────────────────────── */
function initStats() {
  renderFinancial();
  renderLeaderboard();
  renderChart();
}
function renderFinancial() {
  const el = document.getElementById("financial-list");
  const rows = [
    ...DRIVERS_DB.map((d,i)=>({ name:d.firstName+" "+d.lastName, sub:"Driver · "+d.carModel, amount:+(d.earnings||0), type:"earn", color:AVATAR_COLORS_DRIVER[i%AVATAR_COLORS_DRIVER.length], init:d.firstName[0] })),
    ...RIDERS_DB.map((r,i)=>({ name:r.firstName+" "+r.lastName, sub:"Rider · budget "+r.budget+" lei", amount:+(r.spendings||0), type:"spend", color:AVATAR_COLORS_RIDER[i%AVATAR_COLORS_RIDER.length], init:r.firstName[0] })),
  ].sort((a,b)=>b.amount-a.amount);
  el.innerHTML = rows.map(row=>`
    <div class="fin-row">
      <div class="fin-avatar" style="background:${row.color};color:${row.type==='earn'?'#fff':'#000'}">${row.init}</div>
      <div class="fin-info"><strong>${row.name}</strong><span>${row.sub}</span></div>
      <div class="fin-amount ${row.type==='earn'?'fin-earn':'fin-spend'}">${row.type==='earn'?'+':'-'}${row.amount.toFixed(0)} lei</div>
    </div>`).join("");
}
function renderLeaderboard() {
  const el = document.getElementById("leaderboard-list");
  const sorted = [...DRIVERS_DB].sort((a,b)=>(b.rides||0)-(a.rides||0));
  el.innerHTML = sorted.map((d,i)=>`
    <div class="lb-row">
      <div class="lb-rank ${['lb-rank-1','lb-rank-2','lb-rank-3'][i]||''}">${i===0?'🥇':i===1?'🥈':i===2?'🥉':i+1}</div>
      <div class="lb-info"><strong>${d.firstName} ${d.lastName}</strong><span>${d.carModel} · ⭐${d.rating.toFixed(1)}</span></div>
      <div class="lb-rides">${d.rides||0} rides</div>
    </div>`).join("");
}
function renderChart() {
  const wrap = document.getElementById("chart-wrap");
  const max = Math.max(...DRIVERS_DB.map(d=>d.earnings||0), 1);
  wrap.innerHTML = DRIVERS_DB.map((d,i)=>`
    <div class="chart-bar-wrap">
      <div class="chart-bar-val">${(d.earnings||0).toFixed(0)}</div>
      <div class="chart-bar" style="height:${Math.max((d.earnings||0)/max*160,4)}px;background:${AVATAR_COLORS_DRIVER[i%AVATAR_COLORS_DRIVER.length]}"></div>
      <div class="chart-bar-label">${d.firstName}</div>
    </div>`).join("");
}

/* ── HELPERS ──────────────────────────────────────────────────── */
function v(id) { return document.getElementById(id).value.trim(); }
function starsStr(rating) {
  const full = Math.round(rating);
  return "⭐".repeat(Math.min(full,5)) + "☆".repeat(Math.max(0,5-full));
}
let toastTimer;
function toast(msg, type="") {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.className = "toast" + (type ? " "+type : "");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>el.classList.add("hidden"), 3000);
}

/* ── CLOSE PANELS ON OUTSIDE CLICK ──────────────────────────── */
document.addEventListener("click", e => {
  if (!e.target.closest("#notif-panel") && !e.target.closest("#notif-bell"))
    document.getElementById("notif-panel").classList.add("hidden");
});
