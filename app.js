// ==========================================
// CARBONWALLET STATE MANAGEMENT
// ==========================================

// Default Initial Data
const DEFAULT_USER = {
  firstName: "สมชาย",
  lastName: "รักดี",
  code: "CW-88492",
  points: 1250,
  level: 3,
  xp: 850,
  xpMax: 1000,
  carbonSaved: 148.5, // in kg CO2e
  walletAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  email: "somchai.rakdee@example.com",
  phone: "089-123-4567"
};

const DEFAULT_REWARDS = [
  {
    id: "r1",
    title: "Coffee Coupon",
    points: 150,
    stock: 120,
    image: "images/coffee_coupon.png",
    category: "food",
    description: "คูปองแลกรับกาแฟร้อนหรือเย็นแสนอร่อย ฟรี 1 แก้ว มูลค่าสูงสุด 80 บาท ที่ร้านกาแฟสไตล์มินิมอลที่ร่วมรายการ สามารถรับสิทธิ์ได้ทันทีโดยการยื่นรหัสกับบาริสต้าที่ร้าน",
    redeemCount: 350
  },
  {
    id: "r2",
    title: "Stainless Bottle",
    points: 300,
    stock: 45,
    image: "images/stainless_bottle.png",
    category: "premium",
    description: "กระบอกน้ำเก็บอุณหภูมิสแตนเลส (Thermal Flask) เก็บความเย็นได้นาน 24 ชั่วโมง และความร้อนได้ 12 ชั่วโมง ขนาดพกพา 500ml ทำจากวัสดุ Food-grade ไร้สารอันตราย ดีไซน์สีดำพรีเมียม ช่วยคุณลดการใช้ขวดพลาสติกเที่ยวเดียวได้อย่างมีสไตล์",
    redeemCount: 220
  },
  {
    id: "r3",
    title: "T-Shirt (Eco Edition)",
    points: 500,
    stock: 30,
    image: "images/tshirt.png",
    category: "premium",
    description: "เสื้อยืดคอกลมลายรักษ์โลกสุดพรีเมียม ผลิตจากฝ้ายอินทรีย์ออร์แกนิก 100% (Organic Cotton) ไม่ผ่านสารเคมีที่เป็นพิษในการผลิต สวมใส่สบาย ระบายความร้อนดีเยี่ยม เหมาะสำหรับทุกกิจกรรมสีเขียว",
    redeemCount: 95
  },
  {
    id: "r4",
    title: "Grab Coupon 100B",
    points: 200,
    stock: 80,
    image: "images/grab_coupon.png",
    category: "coupon",
    description: "ส่วนลดมูลค่า 100 บาท สำหรับใช้บริการ GrabCar, GrabBike หรือ GrabEV (รถพลังงานไฟฟ้า) เพื่อสนับสนุนการเดินทางที่ลดมลพิษในเมืองหลวง สามารถใช้รหัสนี้กรอกในช่อง Promo Code บนแอป Grab",
    redeemCount: 410
  },
  {
    id: "r5",
    title: "Power Bank 10,000mAh",
    points: 700,
    stock: 15,
    image: "images/powerbank.png",
    category: "electronics",
    description: "แบตเตอรี่สำรองขนาดความจุ 10,000 mAh ที่บางเบาและชาร์จเร็ว รองรับระบบ PD (Power Delivery) ดีไซน์ล้ำสมัยพร้อมหน้าจอดิจิทัลแสดงผลเปอร์เซ็นต์พลังงานที่เหลือ ผลิตจากวัสดุรีไซเคิลถึง 40% แข็งแรงทนทานปลอดภัยสูง",
    redeemCount: 140
  },
  {
    id: "r6",
    title: "Eco Umbrella",
    points: 400,
    stock: 25,
    image: "images/umbrella.png",
    category: "premium",
    description: "ร่มพับพรีเมียมกันแดดกันฝนและรังสี UV 100% ตัวผ้าร่มรีไซเคิลจากขวดพลาสติก PET โครงร่มแข็งแรงทนทานทำจากอลูมิเนียมเกรดพิเศษพร้อมด้ามจับที่ทำจากไม้บีชแท้ ดีไซน์คลาสสิก พกพาสะดวกไปได้ในทุกที่",
    redeemCount: 88
  },
  {
    id: "r7",
    title: "Movie Ticket (Deluxe)",
    points: 250,
    stock: 60,
    image: "images/movie_ticket.png",
    category: "others",
    description: "บัตรชมภาพยนตร์ฟรี 1 ที่นั่ง สำหรับที่นั่งประเภท Deluxe ในโรงภาพยนตร์ระบบปกติและ 2D สามารถกดรับสิทธิ์แลกตั๋วที่ตู้อัตโนมัติหรือหน้าเคาน์เตอร์จำหน่ายตั๋วได้ทั่วประเทศ",
    redeemCount: 290
  },
  {
    id: "r8",
    title: "Central Coupon 200B",
    points: 350,
    stock: 40,
    image: "images/central_coupon.png",
    category: "coupon",
    description: "บัตรของขวัญอิเล็กทรอนิกส์ (E-Gift Voucher) มูลค่า 200 บาท สำหรับใช้แทนเงินสดในการซื้อสินค้าในห้างสรรพสินค้าเซ็นทรัล และมาร์คแอนด์สเปนเซอร์ ทุกสาขา ไม่มีข้อกำหนดขั้นต่ำ สะดวกและลดขยะกระดาษ",
    redeemCount: 180
  }
];

const DEFAULT_TRANSACTIONS = [
  {
    id: "TXN-20260713-0001",
    title: "PromptGo - เดินลดคาร์บอน",
    points: 50,
    type: "received", // received, used, carbon
    date: "13 ก.ค. 2026",
    time: "10:30:45",
    source: "PromptGo App",
    status: "Completed",
    hash: "0x8a72cf5be640e340e4f6a7d6d7e2f5e714942082b"
  },
  {
    id: "TXN-20260713-0002",
    title: "Helmet App - ขับขี่ปลอดภัยสวมหมวก",
    points: 120,
    type: "received",
    date: "13 ก.ค. 2026",
    time: "08:15:22",
    source: "Helmet App",
    status: "Completed",
    hash: "0x3f5c814ab296def098c47b561c29e12089bca74e1"
  },
  {
    id: "TXN-20260712-0001",
    title: "แลกขวดน้ำเหล็ก - Bottle",
    points: -300,
    type: "used",
    date: "12 ก.ค. 2026",
    time: "19:45:10",
    source: "CarbonWallet Shop",
    status: "Completed",
    hash: "0x918cf5de2247ba88a098defb751b7401b5f6d8976f"
  },
  {
    id: "TXN-20260712-0002",
    title: "EV Bus - เดินทางสาธารณะรถไฟฟ้า",
    points: 20,
    type: "carbon", // Shown in Carbon Credit tab
    date: "12 ก.ค. 2026",
    time: "09:30:00",
    source: "EV Bus Linker",
    status: "Completed",
    hash: "0x4ae89cd5ef182a4d3cfc78a0189bda8a984029415"
  },
  {
    id: "TXN-20260710-0001",
    title: "Coffee Coupon - คูปองกาแฟร้อน",
    points: -150,
    type: "used",
    date: "10 ก.ค. 2026",
    time: "10:00:15",
    source: "CarbonWallet Shop",
    status: "Completed",
    hash: "0x11a8c7b420f1885ded7614a9082f81c4e7ab88b09"
  }
];

const DEFAULT_NOTIFICATIONS = [
  {
    id: "n1",
    text: "ยินดีด้วย! คุณสะสมแต้มคาร์บอนถึงระดับ 3 แล้ว",
    time: "30 นาทีที่แล้ว",
    icon: "fa-trophy",
    unread: true
  },
  {
    id: "n2",
    text: "ได้รับ 120 แต้มจากการบันทึกการขับขี่สวมหมวกนิรภัย",
    time: "2 ชั่วโมงที่แล้ว",
    icon: "fa-helmet-safety",
    unread: true
  },
  {
    id: "n3",
    text: "การแลกของรางวัล Grab Coupon สำเร็จ",
    time: "1 วันที่แล้ว",
    icon: "fa-circle-check",
    unread: false
  }
];

// App State Cache
let userState = { ...DEFAULT_USER };
let rewardsState = [ ...DEFAULT_REWARDS ];
let transactionsState = [ ...DEFAULT_TRANSACTIONS ];
let notificationsState = [ ...DEFAULT_NOTIFICATIONS ];

// ==========================================
// PERSISTENCE FUNCTIONS
// ==========================================
function saveToLocalStorage() {
  localStorage.setItem("cw_user", JSON.stringify(userState));
  localStorage.setItem("cw_rewards", JSON.stringify(rewardsState));
  localStorage.setItem("cw_transactions", JSON.stringify(transactionsState));
  localStorage.setItem("cw_notifications", JSON.stringify(notificationsState));
}

function loadFromLocalStorage() {
  const cachedUser = localStorage.getItem("cw_user");
  const cachedRewards = localStorage.getItem("cw_rewards");
  const cachedTransactions = localStorage.getItem("cw_transactions");
  const cachedNotifications = localStorage.getItem("cw_notifications");
  
  if (cachedUser) userState = JSON.parse(cachedUser);
  if (cachedRewards) rewardsState = JSON.parse(cachedRewards);
  if (cachedTransactions) transactionsState = JSON.parse(cachedTransactions);
  if (cachedNotifications) {
    notificationsState = JSON.parse(cachedNotifications);
  } else {
    notificationsState = [ ...DEFAULT_NOTIFICATIONS ];
  }
}

// ==========================================
// SPA ROUTING
// ==========================================
function initRouting() {
  const navLinks = document.querySelectorAll(".nav-link");
  const views = document.querySelectorAll(".content-view");
  
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      
      const targetViewId = link.getAttribute("data-target");
      
      // Update sidebar nav UI
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      
      // Update Visible View
      views.forEach(view => {
        if (view.id === targetViewId) {
          view.classList.add("active-view");
        } else {
          view.classList.remove("active-view");
        }
      });
      
      // Update Top Header Display Title
      let pageTitleText = "หน้าหลัก (Dashboard)";
      if (targetViewId === "rewards-view") pageTitleText = "แลกของรางวัล (Rewards)";
      if (targetViewId === "transactions-view") pageTitleText = "ประวัติรายการ (Transactions)";
      if (targetViewId === "profile-view") pageTitleText = "โปรไฟล์และข้อมูลผู้ใช้";
      document.getElementById("page-title-display").innerText = pageTitleText;
      
      // Additional View Initialization logic
      if (targetViewId === "rewards-view") {
        renderRewards();
      } else if (targetViewId === "transactions-view") {
        renderTransactions();
        // Clear transaction details preview
        resetTransactionDetailPanel();
      } else if (targetViewId === "profile-view") {
        populateProfileFields();
      }
    });
  });

  // Setup Dashboard Quick Redeem button link
  document.getElementById("btn-quick-redeem").addEventListener("click", () => {
    document.getElementById("nav-rewards").click();
  });
  
  // Setup Dashboard View All Activities button link to go to Transactions view
  const viewAllBtn = document.getElementById("btn-view-all-activities");
  if (viewAllBtn) {
    viewAllBtn.addEventListener("click", () => {
      document.getElementById("nav-transactions").click();
    });
  }
}

// ==========================================
// RENDERING & STATE SYNC
// ==========================================
function syncUI() {
  // 1. Header points display
  document.getElementById("header-points-value").innerText = Number(userState.points).toLocaleString();
  
  // 2. Dashboard points display
  document.getElementById("dashboard-points-value").innerHTML = `${Number(userState.points).toLocaleString()}`;
  
  // 3. Sidebar Profile name & code
  document.getElementById("user-name-sidebar").innerText = `${userState.firstName} ${userState.lastName}`;
  document.getElementById("user-code-sidebar").innerText = userState.code;
  
  // Header profile name
  const headerName = document.getElementById("header-username-display");
  if (headerName) headerName.innerText = `${userState.firstName} ${userState.lastName}`;
  
  // 4. Welcome banner name
  document.getElementById("user-display-name").innerText = `คุณ${userState.firstName} ${userState.lastName}`;
  
  // 5. Sync avatar images if custom avatar exists
  if (userState.avatar) {
    document.getElementById("profile-avatar-img").src = userState.avatar;
    document.getElementById("sidebar-avatar-img").src = userState.avatar;
    const headerAvatar = document.getElementById("header-avatar-img");
    if (headerAvatar) headerAvatar.src = userState.avatar;
    const leaderboardAvatar = document.getElementById("leaderboard-avatar-img");
    if (leaderboardAvatar) leaderboardAvatar.src = userState.avatar;
  }
  
  // 6. Sync notifications list and badge
  renderNotifications();
}

// ==========================================
// VIEW: REWARDS LOGIC
// ==========================================
let currentRewardCategory = "all";
let searchRewardQuery = "";
let sortRewardsBy = "popular";

function renderRewards() {
  const container = document.getElementById("rewards-grid-container");
  container.innerHTML = "";
  
  // Filter rewards based on search & category
  let filtered = rewardsState.filter(item => {
    const matchesCategory = currentRewardCategory === "all" || item.category === currentRewardCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchRewardQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchRewardQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Sort rewards
  if (sortRewardsBy === "points-low") {
    filtered.sort((a, b) => a.points - b.points);
  } else if (sortRewardsBy === "points-high") {
    filtered.sort((a, b) => b.points - a.points);
  } else {
    // popular (by redeem count)
    filtered.sort((a, b) => b.redeemCount - a.redeemCount);
  }
  
  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
        <i class="fa-solid fa-box-open" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
        <p>ไม่พบของรางวัลที่ค้นหา กรุณาลองใช้คีย์เวิร์ดอื่น</p>
      </div>
    `;
    return;
  }
  
  filtered.forEach(item => {
    const card = document.createElement("div");
    card.className = "reward-card";
    card.addEventListener("click", () => openRewardDetailModal(item));
    
    // Category readable name
    const categoryThai = getCategoryThaiName(item.category);
    
    card.innerHTML = `
      <div class="reward-card-image-wrapper">
        <img src="${item.image}" alt="${item.title}">
        <span class="category-tag">${categoryThai}</span>
      </div>
      <div class="reward-card-body">
        <h3 class="reward-title">${item.title}</h3>
        <div class="reward-points">${item.points} Points</div>
        <div class="reward-stock">
          <i class="fa-solid fa-box"></i> คงเหลือ ${item.stock} ชิ้น
        </div>
        <button class="reward-btn" data-id="${item.id}">แลกเลย</button>
      </div>
    `;
    
    // Stop event propagation on button so it opens confirm directly without opening details first
    const btn = card.querySelector(".reward-btn");
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openConfirmRedemption(item);
    });
    
    container.appendChild(card);
  });
}

function getCategoryThaiName(cat) {
  switch (cat) {
    case "food": return "อาหาร & เครื่องดื่ม";
    case "coupon": return "คูปองส่วนลด";
    case "premium": return "ของพรีเมียม";
    case "electronics": return "อิเล็กทรอนิกส์";
    default: return "อื่นๆ";
  }
}

// Category tabs listeners
function initRewardsFilters() {
  const catButtons = document.querySelectorAll("#rewards-categories .category-btn");
  catButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      catButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentRewardCategory = btn.getAttribute("data-category");
      renderRewards();
    });
  });
  
  // Search bar input
  const searchInput = document.getElementById("search-reward-input");
  searchInput.addEventListener("input", (e) => {
    searchRewardQuery = e.target.value;
    renderRewards();
  });
  
  // Sorting select
  const sortSelect = document.getElementById("sort-rewards-select");
  sortSelect.addEventListener("change", (e) => {
    sortRewardsBy = e.target.value;
    renderRewards();
  });
}

// ==========================================
// REWARDS DETAILS MODAL
// ==========================================
let currentSelectedReward = null;

function openRewardDetailModal(reward) {
  currentSelectedReward = reward;
  
  document.getElementById("detail-modal-image").src = reward.image;
  document.getElementById("detail-modal-category").innerText = getCategoryThaiName(reward.category);
  document.getElementById("detail-modal-title").innerText = reward.title;
  document.getElementById("detail-modal-points").innerText = `${reward.points} Points`;
  document.getElementById("detail-modal-stock").innerText = `คงเหลือ ${reward.stock} ชิ้น`;
  document.getElementById("detail-modal-desc").innerText = reward.description;
  
  const modal = document.getElementById("reward-detail-modal");
  modal.classList.add("active");
}

function closeRewardDetailModal() {
  document.getElementById("reward-detail-modal").classList.remove("active");
}

// ==========================================
// CONFIRM REDEMPTION MODAL & PROCESS
// ==========================================
function openConfirmRedemption(reward) {
  currentSelectedReward = reward;
  closeRewardDetailModal(); // Close detail modal if open
  
  // Bind preview details
  document.getElementById("confirm-modal-item-img").src = reward.image;
  document.getElementById("confirm-modal-item-title").innerText = reward.title;
  document.getElementById("confirm-modal-item-points").innerText = `-${reward.points} Points`;
  
  // Calculate summary box
  const curPoints = userState.points;
  const deduct = reward.points;
  const remaining = curPoints - deduct;
  
  document.getElementById("confirm-user-current-points").innerText = curPoints.toLocaleString();
  document.getElementById("confirm-points-to-deduct").innerText = `-${deduct.toLocaleString()}`;
  document.getElementById("confirm-points-remaining").innerText = remaining.toLocaleString();
  
  // Reset confirmation button loading state
  const confirmBtn = document.getElementById("btn-confirm-redeem-action");
  confirmBtn.innerHTML = "กดยืนยันการแลกรางวัล";
  confirmBtn.disabled = false;
  
  // Open confirm modal
  document.getElementById("confirm-redeem-modal").classList.add("active");
}

function closeConfirmRedemption() {
  document.getElementById("confirm-redeem-modal").classList.remove("active");
}

// Simulate smart contract confirmation and execute redemption
function executeRedemption() {
  if (!currentSelectedReward) return;
  
  const reward = currentSelectedReward;
  
  // 1. Check points balance
  if (userState.points < reward.points) {
    showToast("คะแนนของคุณไม่เพียงพอสำหรับการแลกรับรางวัลนี้", "error");
    closeConfirmRedemption();
    return;
  }
  
  // 2. Check item stock
  if (reward.stock <= 0) {
    showToast("ขออภัย! ของรางวัลชิ้นนี้หมดชั่วคราว", "error");
    closeConfirmRedemption();
    return;
  }
  
  const confirmBtn = document.getElementById("btn-confirm-redeem-action");
  confirmBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> กำลังดำเนินการ...';
  confirmBtn.disabled = true;
  
  // Simulate smart contract / network confirmation delay (1.5 seconds)
  setTimeout(() => {
    // 3. Deduct points and stock
    userState.points -= reward.points;
    reward.stock -= 1;
    reward.redeemCount += 1;
    
    // 4. Generate transaction record
    const newTxId = `TXN-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newHash = "0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
    const thaiDate = getThaiCurrentDateString();
    const thaiTime = getThaiCurrentTimeString();
    
    const newTx = {
      id: newTxId,
      title: `แลกรับของรางวัล - ${reward.title}`,
      points: -reward.points,
      type: "used",
      date: thaiDate,
      time: thaiTime,
      source: "CarbonWallet Shop",
      status: "Completed",
      hash: newHash
    };
    
    transactionsState.unshift(newTx); // Append to top of history
    
    // Add success notification
    notificationsState.unshift({
      id: `n-${Date.now()}`,
      text: `แลกของรางวัล ${reward.title} สำเร็จแล้ว!`,
      time: "เมื่อสักครู่",
      icon: "fa-circle-check",
      unread: true
    });
    
    // Save to localStorage
    saveToLocalStorage();
    
    // Sync header and dashboard states
    syncUI();
    
    // Close confirm modal
    closeConfirmRedemption();
    
    // 5. Open Success modal
    openSuccessModal(reward, newTx);
    
    // Toast alert
    showToast("แลกของรางวัลสำเร็จเรียบร้อย!", "success");
    
  }, 1500);
}

function getThaiCurrentDateString() {
  const months = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
  const d = new Date();
  const day = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear() + 543; // convert to Buddhist Era
  return `${day} ${month} ${year}`;
}

function getThaiCurrentTimeString() {
  const d = new Date();
  return d.toTimeString().split(" ")[0]; // returns hh:mm:ss
}

// ==========================================
// REDEEM SUCCESS MODAL
// ==========================================
function openSuccessModal(reward, tx) {
  document.getElementById("success-item-name").innerText = reward.title;
  document.getElementById("success-points-spent").innerText = `-${reward.points} Points`;
  document.getElementById("success-points-remaining").innerText = `${userState.points.toLocaleString()} Points`;
  
  // Generate random voucher coupon code
  const codeSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
  // Ensure the title prefix is safe for Code 39
  const titlePrefix = reward.title.substring(0, 3).toUpperCase().replace(/[^A-Z0-9-]/g, '-');
  const couponCode = `CW-${titlePrefix}-${codeSuffix}`;
  document.getElementById("success-coupon-code").innerText = couponCode;
  
  // Render Barcode SVG
  const barcodeWrapper = document.getElementById("success-barcode-svg");
  if (barcodeWrapper) {
    barcodeWrapper.innerHTML = generateBarcodeSVG(couponCode);
  }
  
  // Hide copy notification
  document.getElementById("copy-success-msg").style.display = "none";
  
  const modal = document.getElementById("success-redeem-modal");
  modal.classList.add("active");
  
  // Trigger Confetti
  triggerConfetti();
}

function closeSuccessModal() {
  document.getElementById("success-redeem-modal").classList.remove("active");
}

// Copy Coupon Code to Clipboard
function copyCouponCode() {
  const code = document.getElementById("success-coupon-code").innerText;
  navigator.clipboard.writeText(code).then(() => {
    const msg = document.getElementById("copy-success-msg");
    msg.style.display = "block";
    setTimeout(() => {
      msg.style.display = "none";
    }, 2500);
  });
}

// Confetti Particle Effect Generator
function triggerConfetti() {
  const container = document.getElementById("confetti-container");
  container.innerHTML = "";
  
  const colors = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];
  
  for (let i = 0; i < 60; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti-particle";
    
    // Random position & animation duration
    const startX = Math.random() * 100; // % width
    const duration = 1.5 + Math.random() * 2; // seconds
    const delay = Math.random() * 0.5; // seconds
    const size = 6 + Math.random() * 8; // px
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    confetti.style.left = `${startX}%`;
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.backgroundColor = color;
    confetti.style.animationDuration = `${duration}s`;
    confetti.style.animationDelay = `${delay}s`;
    
    // Shape styling
    if (Math.random() > 0.5) {
      confetti.style.borderRadius = "50%";
    } else {
      confetti.style.borderRadius = "2px";
    }
    
    container.appendChild(confetti);
  }
}

// ==========================================
// VIEW: TRANSACTIONS LOGIC
// ==========================================
let currentTxFilter = "all";
let selectedTxId = null;

function renderTransactions() {
  const container = document.getElementById("transactions-list-container");
  container.innerHTML = "";
  
  let filtered = transactionsState.filter(tx => {
    if (currentTxFilter === "all") return true;
    return tx.type === currentTxFilter;
  });
  
  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem; color: var(--text-muted);">
        <i class="fa-solid fa-receipt" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
        <p>ไม่พบประวัติรายการที่สอดคล้อง</p>
      </div>
    `;
    return;
  }
  
  filtered.forEach(tx => {
    const row = document.createElement("div");
    row.className = `transaction-row ${selectedTxId === tx.id ? 'active' : ''}`;
    row.addEventListener("click", () => selectTransaction(tx));
    
    // Choose icon and styles based on sign
    const isPositive = tx.points >= 0;
    const sign = isPositive ? "+" : "";
    const pointsClass = isPositive ? "plus" : "minus";
    const iconClass = isPositive ? "fa-arrow-trend-up tx-received" : "fa-arrow-trend-down tx-used";
    
    row.innerHTML = `
      <div class="tx-icon-badge ${pointsClass === 'plus' ? 'tx-received' : 'tx-used'}">
        <i class="fa-solid ${iconClass}"></i>
      </div>
      <div class="tx-details">
        <h4 class="tx-title">${tx.title}</h4>
        <div class="tx-meta">
          <span>${tx.date}</span>
          <span>•</span>
          <span>${tx.source}</span>
        </div>
      </div>
      <div class="tx-points-col">
        <div class="tx-points-val ${pointsClass}">${sign}${tx.points}</div>
        <div class="tx-time">${tx.time}</div>
      </div>
    `;
    
    container.appendChild(row);
  });
}

function selectTransaction(tx) {
  selectedTxId = tx.id;
  
  // Re-render list to show active selection border
  renderTransactions();
  
  // Render Details Panel on Right
  const panel = document.getElementById("transaction-detail-panel");
  
  const isPositive = tx.points >= 0;
  const sign = isPositive ? "+" : "";
  const pointsClass = isPositive ? "points-green" : "points-red";
  
  panel.innerHTML = `
    <div class="active-detail-container">
      <h3 class="detail-panel-title">รายละเอียดรายการ</h3>
      
      <table class="detail-table">
        <tr>
          <td>ID รายการ</td>
          <td>${tx.id}</td>
        </tr>
        <tr>
          <td>วันที่ทำรายการ</td>
          <td>${tx.date}</td>
        </tr>
        <tr>
          <td>เวลา</td>
          <td>${tx.time}</td>
        </tr>
        <tr>
          <td>ประเภทกิจกรรม</td>
          <td>${tx.type === 'received' ? 'ได้รับ Points' : tx.type === 'used' ? 'ใช้ไป (Redemption)' : 'ได้รับ Carbon Credit'}</td>
        </tr>
        <tr>
          <td>แหล่งอ้างอิง</td>
          <td>${tx.source}</td>
        </tr>
        <tr>
          <td>คะแนนสะสม</td>
          <td class="${pointsClass}">${sign}${tx.points} Points</td>
        </tr>
        <tr>
          <td>สถานะรายการ</td>
          <td>
            <span class="tx-badge-status ${tx.points >= 0 ? 'tx-badge-received' : 'tx-badge-used'}">
              <i class="fa-solid fa-circle-check"></i> ${tx.status}
            </span>
          </td>
        </tr>
        <tr>
          <td>Blockchain Hash</td>
          <td>
            <div class="detail-blockchain-hash">${tx.hash.substring(0, 10)}...${tx.hash.substring(tx.hash.length - 8)}</div>
          </td>
        </tr>
      </table>
      
      <div class="detail-panel-actions">
        <button class="btn btn-primary" id="btn-open-blockchain-explorer">
          <i class="fa-solid fa-cube"></i> ดูบน Explorer
        </button>
      </div>
    </div>
  `;
  
  // Add listener for blockchain explorer
  document.getElementById("btn-open-blockchain-explorer").addEventListener("click", () => {
    openBlockchainExplorerModal(tx);
  });
}

function resetTransactionDetailPanel() {
  const panel = document.getElementById("transaction-detail-panel");
  panel.innerHTML = `
    <div class="detail-empty-state">
      <i class="fa-solid fa-receipt"></i>
      <h3>รายละเอียดรายการ</h3>
      <p>กรุณาเลือกรายการประวัติที่คุณต้องการตรวจสอบเพื่อดูรายละเอียดเพิ่มเติม</p>
    </div>
  `;
  selectedTxId = null;
}

function initTransactionsFilters() {
  const filterTabs = document.querySelectorAll("#transactions-filter-tabs .category-btn");
  filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      filterTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentTxFilter = tab.getAttribute("data-filter");
      renderTransactions();
      resetTransactionDetailPanel();
    });
  });
}

// ==========================================
// BLOCKCHAIN EXPLORER MODAL
// ==========================================
function openBlockchainExplorerModal(tx) {
  document.getElementById("exp-tx-hash").innerText = tx.hash;
  document.getElementById("exp-timestamp").innerText = `${tx.date} ${tx.time}`;
  document.getElementById("exp-action").innerText = tx.points < 0 ? "Redeem Reward" : "Earn Points via Eco Action";
  document.getElementById("exp-points-value").innerText = `${tx.points >= 0 ? '+' : ''}${tx.points} Points`;
  document.getElementById("exp-points-value").className = tx.points < 0 ? "points-val" : "points-val points-green";
  
  document.getElementById("blockchain-explorer-modal").classList.add("active");
}

function closeBlockchainExplorerModal() {
  document.getElementById("blockchain-explorer-modal").classList.remove("active");
}

// ==========================================
// VIEW: PROFILE & SETTINGS
// ==========================================
function populateProfileFields() {
  document.getElementById("input-firstname").value = userState.firstName;
  document.getElementById("input-lastname").value = userState.lastName;
  document.getElementById("input-email").value = userState.email;
  document.getElementById("input-phone").value = userState.phone;
  document.getElementById("input-wallet-address").value = userState.walletAddress;
  
  // Profile View stats
  document.getElementById("profile-user-name").innerText = `${userState.firstName} ${userState.lastName}`;
  document.getElementById("profile-user-code").innerText = userState.code;
  document.getElementById("profile-points-display").innerText = Number(userState.points).toLocaleString();
  document.getElementById("profile-leaderboard-points").innerText = `${Number(userState.points).toLocaleString()} แต้ม`;
}

function saveProfileDetails() {
  const firstNameInput = document.getElementById("input-firstname").value.trim();
  const lastNameInput = document.getElementById("input-lastname").value.trim();
  const emailInput = document.getElementById("input-email").value.trim();
  const phoneInput = document.getElementById("input-phone").value.trim();
  
  if (!firstNameInput || !lastNameInput) {
    showToast("กรุณากรอกชื่อและนามสกุลของคุณ", "error");
    return;
  }
  
  userState.firstName = firstNameInput;
  userState.lastName = lastNameInput;
  userState.email = emailInput;
  userState.phone = phoneInput;
  
  saveToLocalStorage();
  syncUI();
  populateProfileFields();
  
  showToast("บันทึกข้อมูลข้อมูลส่วนตัวสำเร็จ!", "success");
}

// Change Avatar image seed randomly to add an interactive feel
function changeAvatarSeed() {
  const randomSeed = Math.random().toString(36).substring(2, 7);
  const newAvatarUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${randomSeed}`;
  
  document.getElementById("profile-avatar-img").src = newAvatarUrl;
  document.getElementById("sidebar-avatar-img").src = newAvatarUrl;
  document.getElementById("leaderboard-avatar-img").src = newAvatarUrl;
  const headerAvatar = document.getElementById("header-avatar-img");
  if (headerAvatar) headerAvatar.src = newAvatarUrl;
  
  showToast("เปลี่ยนรูปโปรไฟล์เรียบร้อย!", "success");
}

// ==========================================
// TOAST NOTIFICATIONS & THEMING
// ==========================================
function showToast(text, type = "success") {
  const toast = document.getElementById("toast-message");
  const icon = document.getElementById("toast-icon");
  const textEl = document.getElementById("toast-text");
  
  textEl.innerText = text;
  
  if (type === "success") {
    icon.className = "fa-solid fa-check-circle";
    icon.style.color = "var(--primary-color)";
  } else {
    icon.className = "fa-solid fa-exclamation-circle";
    icon.style.color = "var(--danger-color)";
  }
  
  toast.classList.add("active");
  
  setTimeout(() => {
    toast.classList.remove("active");
  }, 3000);
}

// Theme toggler (Light / Dark)
function initThemeToggle() {
  const btn = document.getElementById("theme-toggle-btn");
  
  // Check cached theme
  const cachedTheme = localStorage.getItem("cw_theme") || "light";
  document.documentElement.setAttribute("data-theme", cachedTheme);
  updateThemeIcon(cachedTheme);
  
  btn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("cw_theme", newTheme);
    updateThemeIcon(newTheme);
    
    showToast(`สลับใช้งานโหมด ${newTheme === "dark" ? 'กลางคืน' : 'กลางวัน'}`, "success");
  });
}

function updateThemeIcon(theme) {
  const icon = document.querySelector("#theme-toggle-btn i");
  if (theme === "dark") {
    icon.className = "fa-regular fa-sun";
  } else {
    icon.className = "fa-regular fa-moon";
  }
}

// ==========================================
// APP INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // 1. Load data
  loadFromLocalStorage();
  
  // 2. Initialize subsystems
  initRouting();
  syncUI();
  initThemeToggle();
  initRewardsFilters();
  initTransactionsFilters();
  initHamburgerMenu();
  
  // 3. Modal event bindings
  // Detail Modal closing
  document.getElementById("close-detail-modal-btn").addEventListener("click", closeRewardDetailModal);
  document.getElementById("btn-cancel-detail").addEventListener("click", closeRewardDetailModal);
  document.getElementById("btn-redeem-from-detail").addEventListener("click", () => {
    if (currentSelectedReward) {
      openConfirmRedemption(currentSelectedReward);
    }
  });
  
  // Confirm Modal closing
  document.getElementById("btn-cancel-redeem").addEventListener("click", closeConfirmRedemption);
  document.getElementById("btn-confirm-redeem-action").addEventListener("click", executeRedemption);
  
  // Success Modal closing
  document.getElementById("btn-back-to-shop").addEventListener("click", closeSuccessModal);
  document.getElementById("btn-copy-coupon-code").addEventListener("click", copyCouponCode);
  document.getElementById("btn-view-transaction-history").addEventListener("click", () => {
    closeSuccessModal();
    // Redirect to Transactions View
    document.getElementById("nav-transactions").click();
  });
  
  // Explorer Modal closing
  document.getElementById("close-explorer-modal-btn").addEventListener("click", closeBlockchainExplorerModal);
  document.getElementById("btn-close-explorer").addEventListener("click", closeBlockchainExplorerModal);
  
  // Save profile trigger
  document.getElementById("btn-save-profile").addEventListener("click", saveProfileDetails);
  
  // Trigger file upload when clicking camera button
  document.getElementById("change-avatar-btn").addEventListener("click", () => {
    document.getElementById("profile-file-input").click();
  });
  
  // Handle profile image file selection
  document.getElementById("profile-file-input").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Limit file size to 1MB
    const maxSizeBytes = 1024 * 1024;
    if (file.size > maxSizeBytes) {
      showToast("ขนาดภาพต้องไม่เกิน 1MB เพื่อประสิทธิภาพระบบ", "error");
      e.target.value = ""; // Reset
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      userState.avatar = dataUrl;
      saveToLocalStorage();
      
      // Update DOM images immediately
      document.getElementById("profile-avatar-img").src = dataUrl;
      document.getElementById("sidebar-avatar-img").src = dataUrl;
      const headerAvatar = document.getElementById("header-avatar-img");
      if (headerAvatar) headerAvatar.src = dataUrl;
      const lbAvatar = document.getElementById("leaderboard-avatar-img");
      if (lbAvatar) lbAvatar.src = dataUrl;
      
      showToast("อัปโหลดรูปโปรไฟล์เรียบร้อย!", "success");
    };
    reader.readAsDataURL(file);
  });
  
  // Notification Bell toggling and clearance
  const bellBtn = document.getElementById("notification-bell-btn");
  const notificationsDropdown = document.getElementById("notifications-dropdown");
  
  if (bellBtn && notificationsDropdown) {
    bellBtn.addEventListener("click", (e) => {
      // Toggle dropdown only if click wasn't inside the dropdown itself
      if (!notificationsDropdown.contains(e.target)) {
        notificationsDropdown.classList.toggle("show");
      }
    });
    
    document.getElementById("btn-clear-notifications").addEventListener("click", (e) => {
      e.stopPropagation();
      notificationsState.forEach(n => n.unread = false);
      saveToLocalStorage();
      renderNotifications();
    });
    
    // Dismiss notifications when clicking outside the bell button
    document.addEventListener("click", (e) => {
      if (notificationsDropdown.classList.contains("show") && !bellBtn.contains(e.target)) {
        notificationsDropdown.classList.remove("show");
      }
    });
  }

  // Render views initially
  renderRewards();
  renderTransactions();
  renderNotifications();
});

// ==========================================
// VIEW: NOTIFICATIONS DROPDOWN RENDERING
// ==========================================
function renderNotifications() {
  const badge = document.getElementById("notification-badge-dot");
  const list = document.getElementById("notifications-list");
  
  if (!list) return;
  list.innerHTML = "";
  
  // Check if there are any unread notifications
  const hasUnread = notificationsState.some(n => n.unread);
  if (badge) {
    badge.style.display = hasUnread ? "block" : "none";
  }
  
  if (notificationsState.length === 0) {
    list.innerHTML = `
      <div class="dropdown-empty">
        <i class="fa-solid fa-bell-slash"></i>
        <p>ไม่มีการแจ้งเตือนในขณะนี้</p>
      </div>
    `;
    return;
  }
  
  notificationsState.forEach(item => {
    const el = document.createElement("div");
    el.className = `notification-item ${item.unread ? 'unread' : ''}`;
    
    el.innerHTML = `
      <div class="notification-icon-wrapper">
        <i class="fa-solid ${item.icon || 'fa-bell'}"></i>
      </div>
      <div class="notification-content">
        <p>${item.text}</p>
        <span class="notification-time">${item.time}</span>
      </div>
    `;
    
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      item.unread = false;
      saveToLocalStorage();
      renderNotifications();
    });
    
    list.appendChild(el);
  });
}

function initHamburgerMenu() {
  const hamburgerBtn = document.getElementById("hamburger-menu-btn");
  const dropdownMenu = document.getElementById("nav-dropdown-menu");
  
  if (hamburgerBtn && dropdownMenu) {
    hamburgerBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle("show");
    });
    
    // Close dropdown menu when clicking any link inside it
    const dropdownLinks = dropdownMenu.querySelectorAll(".nav-link");
    dropdownLinks.forEach(link => {
      link.addEventListener("click", () => {
        dropdownMenu.classList.remove("show");
      });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (dropdownMenu.classList.contains("show") && !hamburgerBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove("show");
      }
    });
  }
}

function generateBarcodeSVG(text) {
  const CODE39_MAP = {
    '0': '101001101101', '1': '110100101011', '2': '101100101011', '3': '110110010101',
    '4': '101001101011', '5': '110100110101', '6': '101100110101', '7': '101001011011',
    '8': '110100101101', '9': '101100101101', 'A': '110101001011', 'B': '101101001011',
    'C': '110110100101', 'D': '101011001011', 'E': '110101100101', 'F': '101101100101',
    'G': '101010011011', 'H': '110101001101', 'I': '101101001101', 'J': '101011001101',
    'K': '110101010011', 'L': '101101010011', 'M': '110110101001', 'N': '101011010011',
    'O': '110101101001', 'P': '101101101001', 'Q': '101010110011', 'R': '110101011001',
    'S': '101101011001', 'T': '101011011001', 'U': '110010101011', 'V': '100110101011',
    'W': '110011010101', 'X': '100101101011', 'Y': '110010110101', 'Z': '100110110101',
    '-': '100101011011', '.': '110010101101', ' ': '100110101101', '*': '100101101101',
    '$': '100100100101', '/': '100100101001', '+': '100101001001', '%': '101001001001'
  };

  const sanitized = text.toUpperCase().split('').map(char => CODE39_MAP[char] ? char : '-').join('');
  const formattedText = `*${sanitized}*`;
  
  let binString = "";
  for (let char of formattedText) {
    binString += CODE39_MAP[char] + "0";
  }
  
  const barWidth = 2.2;
  const height = 75;
  const totalWidth = binString.length * barWidth;
  
  let svgContent = `<svg width="100%" height="${height}" viewBox="0 0 ${totalWidth} ${height}" preserveAspectRatio="none" style="display: block; margin: 0 auto;">`;
  for (let i = 0; i < binString.length; i++) {
    if (binString[i] === '1') {
      svgContent += `<rect x="${i * barWidth}" y="0" width="${barWidth}" height="${height}" />`;
    }
  }
  svgContent += `</svg>`;
  return svgContent;
}
