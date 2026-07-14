// ==========================================
// CARBONWALLET STATE MANAGEMENT
// ==========================================

// Default Initial Data
const DEFAULT_USER = {
  firstName: "Somchai",
  lastName: "Rakdee",
  studentId: "651234567",
  points: 1250,
  email: "somchai.r@psru.ac.th",
  phone: "089-123-4567",
  faculty: "Science and Technology",
  major: "Computer Science"
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
    title: "PromptGo - นั่งรถไฟฟ้ามหาวิทยาลัย",
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
      let pageTitleText = appLanguage === "th" ? "หน้าหลัก" : "Dashboard";
      if (targetViewId === "rewards-view") pageTitleText = appLanguage === "th" ? "แลกของรางวัล" : "Rewards";
      if (targetViewId === "transactions-view") pageTitleText = appLanguage === "th" ? "ประวัติรายการ" : "Transactions";
      if (targetViewId === "profile-view") pageTitleText = appLanguage === "th" ? "โปรไฟล์นักศึกษา" : "Student Profile";
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
  document.getElementById("user-code-sidebar").innerText = userState.studentId;
  
  // Header profile name
  const headerName = document.getElementById("header-username-display");
  if (headerName) headerName.innerText = `${userState.firstName} ${userState.lastName}`;
  
  // 4. Welcome banner name
  const welcomeTitle = document.querySelector(".welcome-text-wrapper h2");
  if (welcomeTitle) {
    if (appLanguage === "th") {
      welcomeTitle.innerHTML = `สวัสดี, <span id="user-display-name">คุณ${userState.firstName} ${userState.lastName}</span>! 👋`;
    } else {
      welcomeTitle.innerHTML = `Hello, <span id="user-display-name">${userState.firstName} ${userState.lastName}</span>! 👋`;
    }
  }
  
  // 5. Sync avatar images if custom avatar exists
  if (userState.avatar) {
    document.getElementById("profile-avatar-img").src = userState.avatar;
    document.getElementById("sidebar-avatar-img").src = userState.avatar;
    const headerAvatar = document.getElementById("header-avatar-img");
    if (headerAvatar) headerAvatar.src = userState.avatar;
  }
  
  // 6. Sync notifications list and badge
  renderNotifications();

  // 7. Update translations across static elements
  if (typeof translateApp === "function") {
    translateApp();
  }
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
    const noResultsMsg = appLanguage === "th" 
      ? "ไม่พบของรางวัลที่ค้นหา กรุณาลองใช้คีย์เวิร์ดอื่น" 
      : "No rewards found. Please try another keyword.";
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
        <i class="fa-solid fa-box-open" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
        <p>${noResultsMsg}</p>
      </div>
    `;
    return;
  }
  
  filtered.forEach(item => {
    const card = document.createElement("div");
    card.className = "reward-card";
    card.addEventListener("click", () => openRewardDetailModal(item));
    
    // Category readable name
    const categoryName = getCategoryName(item.category);
    const stockText = appLanguage === "th"
      ? `<i class="fa-solid fa-box"></i> คงเหลือ ${item.stock} ชิ้น`
      : `<i class="fa-solid fa-box"></i> ${item.stock} units remaining`;
    const redeemText = appLanguage === "th" ? "แลกเลย" : "Redeem";
    
    card.innerHTML = `
      <div class="reward-card-image-wrapper">
        <img src="${item.image}" alt="${item.title}">
        <span class="category-tag">${categoryName}</span>
      </div>
      <div class="reward-card-body">
        <h3 class="reward-title">${item.title}</h3>
        <div class="reward-points">${item.points} Points</div>
        <div class="reward-stock">
          ${stockText}
        </div>
        <button class="reward-btn" data-id="${item.id}">${redeemText}</button>
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

function getCategoryName(cat) {
  if (appLanguage === "th") {
    switch (cat) {
      case "food": return "อาหาร & เครื่องดื่ม";
      case "coupon": return "คูปองส่วนลด";
      case "premium": return "ของพรีเมียม";
      case "electronics": return "อิเล็กทรอนิกส์";
      default: return "อื่นๆ";
    }
  } else {
    switch (cat) {
      case "food": return "Food & Drinks";
      case "coupon": return "Coupons";
      case "premium": return "Premium Goods";
      case "electronics": return "Electronics";
      default: return "Others";
    }
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
  document.getElementById("detail-modal-category").innerText = getCategoryName(reward.category);
  document.getElementById("detail-modal-title").innerText = reward.title;
  document.getElementById("detail-modal-points").innerText = `${reward.points} Points`;
  document.getElementById("detail-modal-stock").innerText = appLanguage === "th"
    ? `คงเหลือ ${reward.stock} ชิ้น`
    : `${reward.stock} units remaining`;
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
  
  // Set message text based on language
  document.getElementById("confirm-redemption-msg-text").innerText = appLanguage === "th" 
    ? "คุณแน่ใจหรือไม่ว่าจะใช้แต้มคาร์บอนแลกรับของรางวัลนี้?" 
    : "Are you sure you want to use carbon points to redeem this reward?";

  // Reset confirmation button loading state
  const confirmBtn = document.getElementById("btn-confirm-redeem-action");
  confirmBtn.innerHTML = appLanguage === "th" ? "กดยืนยันการแลกรางวัล" : "Confirm Redemption";
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
    const balanceError = appLanguage === "th" 
      ? "คะแนนของคุณไม่เพียงพอสำหรับการแลกรับรางวัลนี้" 
      : "Insufficient points to redeem this reward.";
    showToast(balanceError, "error");
    closeConfirmRedemption();
    return;
  }
  
  // 2. Check item stock
  if (reward.stock <= 0) {
    const stockError = appLanguage === "th" 
      ? "ขออภัย! ของรางวัลชิ้นนี้หมดชั่วคราว" 
      : "Sorry, this reward is temporarily out of stock.";
    showToast(stockError, "error");
    closeConfirmRedemption();
    return;
  }
  
  const confirmBtn = document.getElementById("btn-confirm-redeem-action");
  confirmBtn.innerHTML = appLanguage === "th" 
    ? '<i class="fa-solid fa-circle-notch fa-spin"></i> กำลังดำเนินการ...'
    : '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...';
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
    const currentDate = getCurrentDateString();
    const currentTime = getThaiCurrentTimeString();
    
    const newTx = {
      id: newTxId,
      title: appLanguage === "th" ? `แลกรับของรางวัล - ${reward.title}` : `Redeemed Reward - ${reward.title}`,
      points: -reward.points,
      type: "used",
      date: currentDate,
      time: currentTime,
      source: "CarbonWallet Shop",
      status: "Completed",
      hash: newHash
    };
    
    transactionsState.unshift(newTx); // Append to top of history
    
    // Add success notification
    notificationsState.unshift({
      id: `n-${Date.now()}`,
      text: appLanguage === "th" ? `แลกของรางวัล ${reward.title} สำเร็จแล้ว!` : `Redeemed ${reward.title} successfully!`,
      time: appLanguage === "th" ? "เมื่อสักครู่" : "Just now",
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
    openSuccessModal(reward);
    
    // Toast alert
    const toastMsg = appLanguage === "th" ? "แลกของรางวัลสำเร็จเรียบร้อย!" : "Redeemed successfully!";
    showToast(toastMsg, "success");
    
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

function getCurrentDateString() {
  if (appLanguage === "th") {
    return getThaiCurrentDateString();
  } else {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const d = new Date();
    const day = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${month} ${day}, ${year}`;
  }
}

function localizeDate(dateStr) {
  if (appLanguage === "en") {
    const thMonths = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
    const enMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let result = dateStr;
    thMonths.forEach((thMonth, idx) => {
      if (result.includes(thMonth)) {
        result = result.replace(thMonth, enMonths[idx]);
      }
    });
    return result;
  }
  return dateStr;
}

function getThaiCurrentTimeString() {
  const d = new Date();
  return d.toTimeString().split(" ")[0]; // returns hh:mm:ss
}

// ==========================================
// REDEEM SUCCESS MODAL
// ==========================================
function openSuccessModal(reward) {
  const subtitleText = appLanguage === "th" 
    ? `คุณได้แลก <span id="success-item-name" class="highlight">${reward.title}</span> เรียบร้อยแล้ว` 
    : `You have redeemed <span id="success-item-name" class="highlight">${reward.title}</span> successfully.`;
  document.getElementById("success-subtitle-text").innerHTML = subtitleText;
  
  document.getElementById("success-points-spent").innerText = `-${reward.points} Points`;
  document.getElementById("success-points-remaining").innerText = `${userState.points.toLocaleString()} Points`;
  
  const modal = document.getElementById("success-redeem-modal");
  modal.classList.add("active");
  
  // Trigger Confetti
  triggerConfetti();
}

function closeSuccessModal() {
  document.getElementById("success-redeem-modal").classList.remove("active");
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
    const emptyMsg = appLanguage === "th" ? "ไม่พบประวัติรายการที่สอดคล้อง" : "No matching transaction history found.";
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem; color: var(--text-muted);">
        <i class="fa-solid fa-receipt" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
        <p>${emptyMsg}</p>
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
    
    let titleVal = tx.title;
    let sourceVal = tx.source;
    if (appLanguage === "en") {
      if (tx.title.includes("นั่งรถไฟฟ้ามหาวิทยาลัย")) titleVal = "PromptGo - University EV Shuttle Ride";
      else if (tx.title.includes("ขับขี่ปลอดภัยสวมหมวก")) titleVal = "Helmet App - Ride with Helmet";
      else if (tx.title.includes("แลกขวดน้ำเหล็ก")) titleVal = "Redeemed Steel Bottle - Flask";
      else if (tx.title.includes("เดินทางสาธารณะรถไฟฟ้า")) titleVal = "EV Bus - EV Transit Ride";
      else if (tx.title.includes("คูปองกาแฟร้อน")) titleVal = "Coffee Coupon - Hot Coffee";
      else if (tx.title.includes("แลกรับของรางวัล - ")) {
        titleVal = tx.title.replace("แลกรับของรางวัล - ", "Redeemed Reward - ");
      }
    }
    
    const localizedDateStr = localizeDate(tx.date);
    
    row.innerHTML = `
      <div class="tx-icon-badge ${pointsClass === 'plus' ? 'tx-received' : 'tx-used'}">
        <i class="fa-solid ${iconClass}"></i>
      </div>
      <div class="tx-details">
        <h4 class="tx-title">${titleVal}</h4>
        <div class="tx-meta">
          <span>${localizedDateStr}</span>
          <span>•</span>
          <span>${sourceVal}</span>
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
  
  const detailTitle = appLanguage === "th" ? "รายละเอียดรายการ" : "Transaction Details";
  const labelId = appLanguage === "th" ? "ID รายการ" : "Transaction ID";
  const labelDate = appLanguage === "th" ? "วันที่ทำรายการ" : "Date";
  const labelTime = appLanguage === "th" ? "เวลา" : "Time";
  const labelType = appLanguage === "th" ? "ประเภทกิจกรรม" : "Activity Type";
  const labelSource = appLanguage === "th" ? "แหล่งอ้างอิง" : "Source";
  const labelPoints = appLanguage === "th" ? "คะแนนสะสม" : "Points Balance";
  const labelStatus = appLanguage === "th" ? "สถานะรายการ" : "Status";
  
  let typeVal = "";
  if (appLanguage === "th") {
    typeVal = tx.type === 'received' ? 'ได้รับ Points' : tx.type === 'used' ? 'ใช้ไป (Redemption)' : 'ได้รับ Carbon Credit';
  } else {
    typeVal = tx.type === 'received' ? 'Earned Points' : tx.type === 'used' ? 'Used (Redemption)' : 'Earned Carbon Credit';
  }
  
  let statusVal = tx.status;
  if (tx.status === "Completed") {
    statusVal = appLanguage === "th" ? "สำเร็จ" : "Completed";
  }
  
  panel.innerHTML = `
    <div class="active-detail-container">
      <h3 class="detail-panel-title">${detailTitle}</h3>
      
      <table class="detail-table">
        <tr>
          <td>${labelId}</td>
          <td>${tx.id}</td>
        </tr>
        <tr>
          <td>${labelDate}</td>
          <td>${localizeDate(tx.date)}</td>
        </tr>
        <tr>
          <td>${labelTime}</td>
          <td>${tx.time}</td>
        </tr>
        <tr>
          <td>${labelType}</td>
          <td>${typeVal}</td>
        </tr>
        <tr>
          <td>${labelSource}</td>
          <td>${tx.source}</td>
        </tr>
        <tr>
          <td>${labelPoints}</td>
          <td class="${pointsClass}">${sign}${tx.points} Points</td>
        </tr>
        <tr>
          <td>${labelStatus}</td>
          <td>
            <span class="tx-badge-status ${tx.points >= 0 ? 'tx-badge-received' : 'tx-badge-used'}">
              <i class="fa-solid fa-circle-check"></i> ${statusVal}
            </span>
          </td>
        </tr>
      </table>
    </div>
  `;
}

function resetTransactionDetailPanel() {
  const panel = document.getElementById("transaction-detail-panel");
  const title = appLanguage === "th" ? "รายละเอียดรายการ" : "Transaction Details";
  const desc = appLanguage === "th" 
    ? "กรุณาเลือกรายการประวัติที่คุณต้องการตรวจสอบเพื่อดูรายละเอียดเพิ่มเติม" 
    : "Please select a transaction to check details.";
    
  panel.innerHTML = `
    <div class="detail-empty-state">
      <i class="fa-solid fa-receipt"></i>
      <h3>${title}</h3>
      <p>${desc}</p>
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
// VIEW: PROFILE & SETTINGS
// ==========================================
function populateProfileFields() {
  document.getElementById("input-firstname").value = userState.firstName;
  document.getElementById("input-lastname").value = userState.lastName;
  document.getElementById("input-student-id").value = userState.studentId;
  document.getElementById("input-phone").value = userState.phone;
  document.getElementById("input-email").value = userState.email;
  document.getElementById("input-faculty").value = userState.faculty;
  document.getElementById("input-major").value = userState.major;
  
  // Profile View stats
  document.getElementById("profile-user-name").innerText = `${userState.firstName} ${userState.lastName}`;
  document.getElementById("profile-user-code").innerText = userState.studentId;
  document.getElementById("profile-points-display").innerText = Number(userState.points).toLocaleString();
  document.getElementById("profile-faculty-display").innerText = userState.faculty;
  document.getElementById("profile-major-display").innerText = userState.major;
}

function saveProfileDetails() {
  const firstNameInput = document.getElementById("input-firstname").value.trim();
  const lastNameInput = document.getElementById("input-lastname").value.trim();
  const studentIdInput = document.getElementById("input-student-id").value.trim();
  const phoneInput = document.getElementById("input-phone").value.trim();
  const emailInput = document.getElementById("input-email").value.trim();
  const facultyInput = document.getElementById("input-faculty").value.trim();
  const majorInput = document.getElementById("input-major").value.trim();
  
  if (!firstNameInput || !lastNameInput || !studentIdInput) {
    const errorMsg = appLanguage === "th" 
      ? "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน (ชื่อจริง, นามสกุล, รหัสนักศึกษา)" 
      : "Please fill in all required fields (First Name, Last Name, Student ID).";
    showToast(errorMsg, "error");
    return;
  }
  
  userState.firstName = firstNameInput;
  userState.lastName = lastNameInput;
  userState.studentId = studentIdInput;
  userState.phone = phoneInput;
  userState.email = emailInput;
  userState.faculty = facultyInput;
  userState.major = majorInput;
  
  saveToLocalStorage();
  syncUI();
  populateProfileFields();
  
  const successMsg = appLanguage === "th" 
    ? "บันทึกข้อมูลส่วนตัวเรียบร้อยแล้ว!" 
    : "Profile details updated successfully!";
  showToast(successMsg, "success");
}

// Change Avatar image seed randomly to add an interactive feel
function changeAvatarSeed() {
  const randomSeed = Math.random().toString(36).substring(2, 7);
  const newAvatarUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${randomSeed}`;
  
  document.getElementById("profile-avatar-img").src = newAvatarUrl;
  document.getElementById("sidebar-avatar-img").src = newAvatarUrl;
  const headerAvatar = document.getElementById("header-avatar-img");
  if (headerAvatar) headerAvatar.src = newAvatarUrl;
  
  const avatarMsg = appLanguage === "th" 
    ? "เปลี่ยนรูปโปรไฟล์เรียบร้อย!" 
    : "Profile image changed successfully!";
  showToast(avatarMsg, "success");
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
    
    const msg = appLanguage === "th" 
      ? `สลับใช้งานโหมด ${newTheme === "dark" ? 'กลางคืน' : 'กลางวัน'}` 
      : `Switched to ${newTheme === "dark" ? 'dark' : 'light'} mode`;
    showToast(msg, "success");
  });
}

function updateThemeIcon(theme) {
  const icon = document.querySelector("#theme-toggle-btn i");
  if (theme === "dark") {
    icon.className = "fa-solid fa-sun";
  } else {
    icon.className = "fa-solid fa-moon";
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
  translateApp();
  syncUI();
  initThemeToggle();
  initLangToggle();
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
  document.getElementById("btn-view-transaction-history").addEventListener("click", () => {
    closeSuccessModal();
    // Redirect to Transactions View
    document.getElementById("nav-transactions").click();
  });
  
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
      const sizeMsg = appLanguage === "th" 
        ? "ขนาดภาพต้องไม่เกิน 1MB เพื่อประสิทธิภาพระบบ" 
        : "Image size must not exceed 1MB.";
      showToast(sizeMsg, "error");
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
      
      const uploadMsg = appLanguage === "th" 
        ? "อัปโหลดรูปโปรไฟล์เรียบร้อย!" 
        : "Profile image uploaded successfully!";
      showToast(uploadMsg, "success");
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
    const emptyMsg = appLanguage === "th" ? "ไม่มีการแจ้งเตือนในขณะนี้" : "No notifications at this time.";
    list.innerHTML = `
      <div class="dropdown-empty">
        <i class="fa-solid fa-bell-slash"></i>
        <p>${emptyMsg}</p>
      </div>
    `;
    return;
  }
  
  notificationsState.forEach(item => {
    const el = document.createElement("div");
    el.className = `notification-item ${item.unread ? 'unread' : ''}`;
    
    let textVal = item.text;
    let timeVal = item.time;
    if (appLanguage === "en") {
      if (item.text.includes("ระดับ 3")) textVal = "Congratulations! You reached Level 3 status.";
      else if (item.text.includes("ได้รับ 120 แต้ม")) textVal = "Earned 120 points from Helmet safety check-in.";
      else if (item.text.includes("การแลกของรางวัล Grab Coupon สำเร็จ")) textVal = "Grab Coupon redemption completed successfully.";
      else if (item.text.includes("แลกของรางวัล") && item.text.includes("สำเร็จแล้ว!")) {
        textVal = item.text.replace("แลกของรางวัล ", "Redeemed ").replace(" สำเร็จแล้ว!", " successfully!");
      }
      
      if (item.time.includes("นาทีที่แล้ว")) timeVal = item.time.replace("นาทีที่แล้ว", " mins ago");
      else if (item.time.includes("ชั่วโมงที่แล้ว")) timeVal = item.time.replace("ชั่วโมงที่แล้ว", " hours ago");
      else if (item.time.includes("วันที่แล้ว")) timeVal = item.time.replace("วันที่แล้ว", " days ago");
      else if (item.time.includes("เมื่อสักครู่")) timeVal = "Just now";
    }
    
    el.innerHTML = `
      <div class="notification-icon-wrapper">
        <i class="fa-solid ${item.icon || 'fa-bell'}"></i>
      </div>
      <div class="notification-content">
        <p>${textVal}</p>
        <span class="notification-time">${timeVal}</span>
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

// ==========================================
// TRANSLATION ENGINE (TH/EN)
// ==========================================
let appLanguage = localStorage.getItem("appLanguage") || "th";

const TRANSLATIONS = {
  th: {
    // Navigation
    "nav-dashboard": "หน้าหลัก",
    "nav-rewards": "แลกของรางวัล",
    "nav-transactions": "ประวัติรายการ",
    "nav-profile": "โปรไฟล์นักศึกษา",
    
    // Header
    "points-unit": "Points",
    "clear-all": "อ่านทั้งหมด",
    "notifications-title": "การแจ้งเตือน",
    
    // Dashboard Welcome
    "welcome-title": "สวัสดี, ",
    "welcome-subtitle": "วันนี้คุณช่วยลดคาร์บอนไปแล้ว <b>2.4 kg CO₂e</b> มาร่วมสร้างสิ่งแวดล้อมที่ดีไปด้วยกันนะ!",
    "hero-level": "ระดับ: Carbon Hero",
    "planted-trees": "ปลูกต้นไม้สะสม 12 ต้น",
    
    // Dashboard Stats
    "stat-points-title": "คะแนนสะสมทั้งหมด",
    "stat-points-desc": "ใช้สำหรับแลกของรางวัลและคูปองส่วนลดพิเศษ",
    "btn-quick-redeem": "แลกของรางวัล",
    "stat-carbon-title": "คาร์บอนที่ลดได้สะสม",
    "stat-carbon-desc": "เทียบเท่ากับการปลูกต้นไม้ <b>16.5</b> ต้นในปีนี้",
    
    // Dashboard Actions
    "action-title": "บันทึกกิจกรรมรักษ์โลก",
    "action-desc": "เลือกกิจกรรมที่คุณทำในวันนี้เพื่อบันทึกคะแนนสะสม",
    "action-walk-title": "เดินหรือปั่นจักรยานแทนการใช้รถ",
    "action-walk-desc": "ลดคาร์บอน 1.2 kg · รับ +15 คะแนน",
    "action-tumbler-title": "พกแก้วน้ำหรือกล่องข้าวส่วนตัว",
    "action-tumbler-desc": "ลดคาร์บอน 0.5 kg · รับ +10 คะแนน",
    "action-recycle-title": "แยกขยะก่อนทิ้ง",
    "action-recycle-desc": "ลดคาร์บอน 0.8 kg · รับ +12 คะแนน",
    "action-stairs-title": "ใช้บันไดแทนการขึ้นลิฟต์",
    "action-stairs-desc": "ลดคาร์บอน 0.2 kg · รับ +5 คะแนน",
    "btn-record": "บันทึกกิจกรรม",
    
    // Rewards View
    "rewards-header": "หมวดหมู่ของรางวัล",
    "rewards-search-placeholder": "ค้นหาของรางวัล...",
    "rewards-sort-label": "จัดเรียง:",
    "sort-popular": "ยอดนิยม",
    "sort-low-high": "คะแนนน้อยสุด",
    "sort-high-low": "คะแนนมากสุด",
    "cat-all": "ทั้งหมด",
    "cat-lifestyle": "สินค้าทั่วไป",
    "cat-food": "อาหาร & เครื่องดื่ม",
    "cat-gadget": "ของพรีเมียม",
    "cat-discount": "คูปองส่วนลด",
    "points-label": " คะแนน",
    "btn-redeem": "แลกของรางวัล",
    
    // Transactions View
    "tx-header": "ประวัติการสะสมและการแลกของรางวัล",
    "tx-filter-label": "ตัวกรอง:",
    "tx-filter-all": "ทั้งหมด",
    "tx-filter-received": "ได้รับคะแนน",
    "tx-filter-used": "แลกของรางวัล",
    "tx-details-header": "รายละเอียดรายการ",
    "tx-empty-state": "กรุณาเลือกรายการด้านซ้ายเพื่อดูรายละเอียดเพิ่มเติม",
    "tx-id": "เลขที่รายการ",
    "tx-date": "วันที่ทำรายการ",
    "tx-time": "เวลา",
    "tx-activity-type": "ประเภทรายการ",
    "tx-source": "แหล่งที่มา",
    "tx-points": "คะแนน",
    "tx-status": "สถานะ",
    
    // Profile View
    "profile-title": "ข้อมูลโปรไฟล์นักศึกษา",
    "profile-firstname": "ชื่อ",
    "profile-lastname": "นามสกุล",
    "profile-student-id": "รหัสนักศึกษา",
    "profile-phone": "เบอร์โทรศัพท์",
    "profile-email": "อีเมล",
    "profile-faculty": "คณะ",
    "profile-major": "สาขาวิชา",
    "btn-save-profile": "บันทึกข้อมูล",
    
    // Modals
    "modal-confirm-title": "ยืนยันการแลกของรางวัล",
    "confirm-msg-prefix": "คุณแน่ใจใช่หรือไม่ว่าต้องการใช้ ",
    "confirm-msg-suffix": " คะแนน เพื่อแลกรับของรางวัลชิ้นนี้?",
    "confirm-summary-title": "สรุปรายการแลก",
    "confirm-current-points": "คะแนนคงเหลือปัจจุบัน",
    "confirm-points-deduct": "คะแนนที่ใช้แลก",
    "confirm-points-remaining": "คะแนนคงเหลือหลังแลก",
    "btn-cancel": "ยกเลิก",
    "btn-confirm": "ยืนยัน",
    
    "modal-success-title": "แลกสำเร็จแล้ว",
    "success-msg-prefix": "คุณได้ทำการแลกรับ ",
    "success-msg-suffix": " เรียบร้อยแล้ว",
    "success-spent": "คะแนนที่ใช้",
    "success-remaining": "คะแนนคงเหลือ",
    "btn-view-history": "ดูประวัติการแลก",
    "btn-close-modal": "ปิดหน้าต่าง",
    "goal-progress": "เป้าหมายการลดคาร์บอนประจำเดือนนี้",
    "user-level": "ระดับผู้ใช้งาน",
    "next-level": "อีก 150 คะแนนเพื่อเลื่อนระดับถัดไป",
    "latest-activities": "กิจกรรมรักษ์โลกล่าสุดของคุณ",
    "view-all": "ดูทั้งหมด",
    "achievements": "ความสำเร็จ",
    "ach-1-title": "สายกรีนสม่ำเสมอ",
    "ach-2-title": "อร่อยรักษ์โลก",
    "ach-3-title": "ผู้พิทักษ์คาร์บอน",
    "ach-4-title": "นักสะสมของพรีเมียม",
    "act-1-title": "นั่งรถเมล์ไฟฟ้า (EV)",
    "act-1-desc": "ลดคาร์บอนได้ 3.2 kg",
    "act-1-points": "+20 Carbon Credit",
    "act-2-title": "สวมหมวกกันน็อกขับขี่ปลอดภัย",
    "act-2-desc": "ระบบยืนยันความปลอดภัย",
    "act-3-title": "นั่งรถไฟฟ้ามหาวิทยาลัย (PromptGo)",
    "act-3-desc": "เรียกรถและเดินทางด้วยรถไฟฟ้ามหาลัยเพื่อรับคะแนนสะสม"
  },
  en: {
    // Navigation
    "nav-dashboard": "Dashboard",
    "nav-rewards": "Rewards",
    "nav-transactions": "Transactions",
    "nav-profile": "Student Profile",
    
    // Header
    "points-unit": "Points",
    "clear-all": "Mark all read",
    "notifications-title": "Notifications",
    
    // Dashboard Welcome
    "welcome-title": "Welcome back, ",
    "welcome-subtitle": "Today you saved <b>2.4 kg CO₂e</b> of emissions. Let's make a difference together!",
    "hero-level": "Level: Carbon Hero",
    "planted-trees": "12 trees planted",
    
    // Dashboard Stats
    "stat-points-title": "Total Points Balance",
    "stat-points-desc": "Redeem these points instantly for eco-rewards and store discounts.",
    "btn-quick-redeem": "Redeem Rewards",
    "stat-carbon-title": "Carbon Saved",
    "stat-carbon-desc": "Equivalent to planting <b>16.5</b> trees this year.",
    
    // Dashboard Actions
    "action-title": "Today's Eco Actions",
    "action-desc": "Record your daily eco-friendly activities to earn points.",
    "action-walk-title": "Walk or Cycle instead of Driving",
    "action-walk-desc": "Saved 1.2 kg CO₂e · Earned +15 Points",
    "action-tumbler-title": "Bring Personal Tumbler/Lunchbox",
    "action-tumbler-desc": "Saved 0.5 kg CO₂e · Earned +10 Points",
    "action-recycle-title": "Sort Waste & Recycle",
    "action-recycle-desc": "Saved 0.8 kg CO₂e · Earned +12 Points",
    "action-stairs-title": "Take the Stairs instead of Lift",
    "action-stairs-desc": "Saved 0.2 kg CO₂e · Earned +5 Points",
    "btn-record": "Record Action",
    
    // Rewards View
    "rewards-header": "Reward Categories",
    "rewards-search-placeholder": "Search rewards...",
    "rewards-sort-label": "Sort by:",
    "sort-popular": "Popularity",
    "sort-low-high": "Points: Low to High",
    "sort-high-low": "Points: High to Low",
    "cat-all": "All",
    "cat-lifestyle": "Lifestyle",
    "cat-food": "Food & Drinks",
    "cat-gadget": "Eco Gadgets",
    "cat-discount": "Discounts",
    "points-label": " Points",
    "btn-redeem": "Redeem",
    
    // Transactions View
    "tx-header": "Redemption & Point History",
    "tx-filter-label": "Filter:",
    "tx-filter-all": "All",
    "tx-filter-received": "Earned Points",
    "tx-filter-used": "Redeemed Rewards",
    "tx-details-header": "Transaction Details",
    "tx-empty-state": "Please select a transaction to check details.",
    "tx-id": "Transaction ID",
    "tx-date": "Date",
    "tx-time": "Time",
    "tx-activity-type": "Activity Type",
    "tx-source": "Source",
    "tx-points": "Points Balance",
    "tx-status": "Status",
    
    // Profile View
    "profile-title": "Student Profile Information",
    "profile-firstname": "First Name",
    "profile-lastname": "Last Name",
    "profile-student-id": "Student ID",
    "profile-phone": "Phone Number",
    "profile-email": "Email Address",
    "profile-faculty": "Faculty",
    "profile-major": "Major",
    "btn-save-profile": "Save Profile Details",
    
    // Modals
    "modal-confirm-title": "Confirm Redemption",
    "confirm-msg-prefix": "Do you want to use ",
    "confirm-msg-suffix": " Points to redeem this reward?",
    "confirm-summary-title": "Order Summary",
    "confirm-current-points": "Current Points",
    "confirm-points-deduct": "Points to Deduct",
    "confirm-points-remaining": "Points Remaining",
    "btn-cancel": "Cancel",
    "btn-confirm": "Confirm",
    
    "modal-success-title": "Redemption Successful!",
    "success-msg-prefix": "You have redeemed ",
    "success-msg-suffix": " successfully.",
    "success-spent": "Points Used",
    "success-remaining": "Points Remaining",
    "btn-view-history": "View Transactions",
    "btn-close-modal": "Close",
    "goal-progress": "Monthly Goal Progress",
    "user-level": "User Level Status",
    "next-level": "Only <b>150 XP</b> remaining to reach Level 4 Elite",
    "latest-activities": "Your Recent Carbon Activities",
    "view-all": "View All",
    "achievements": "Eco Achievements",
    "ach-1-title": "Green Habit",
    "ach-2-title": "Eco Foodie",
    "ach-3-title": "Carbon Hero",
    "ach-4-title": "Elite Collector",
    "act-1-title": "Traveled by EV Public Bus",
    "act-1-desc": "Saved 3.2 kg CO₂e emissions",
    "act-1-points": "+20 Carbon Credits",
    "act-2-title": "Safe Ride with Helmet (Helmet App)",
    "act-2-desc": "Journey recorded by AI safety system",
    "act-3-title": "Ride University EV Shuttle (PromptGo)",
    "act-3-desc": "Called and rode university electric shuttle to earn points"
  }
};

function translateApp() {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach(el => {
    const key = el.getAttribute("data-i18n");
    const translation = TRANSLATIONS[appLanguage][key];
    if (translation) {
      if (el.tagName === "INPUT" && el.hasAttribute("placeholder")) {
        el.setAttribute("placeholder", translation);
      } else {
        // If the translation contains HTML elements (like <i> or <b> tags), use innerHTML directly.
        if (translation.includes("<") && translation.includes(">")) {
          el.innerHTML = translation;
        } else {
          // Retain fontawesome icons inside elements when translating
          const icon = el.querySelector("i");
          if (icon) {
            const iconClone = icon.cloneNode(true);
            el.innerText = " " + translation;
            el.insertBefore(iconClone, el.firstChild);
          } else {
            el.innerText = translation;
          }
        }
      }
    }
  });

  // Update header title based on active view
  const activeLink = document.querySelector(".nav-link.active");
  if (activeLink) {
    const targetViewId = activeLink.getAttribute("data-target");
    let pageTitleText = appLanguage === "th" ? "หน้าหลัก" : "Dashboard";
    if (targetViewId === "rewards-view") pageTitleText = appLanguage === "th" ? "แลกของรางวัล" : "Rewards";
    if (targetViewId === "transactions-view") pageTitleText = appLanguage === "th" ? "ประวัติรายการ" : "Transactions";
    if (targetViewId === "profile-view") pageTitleText = appLanguage === "th" ? "โปรไฟล์นักศึกษา" : "Student Profile";
    document.getElementById("page-title-display").innerText = pageTitleText;
  }

  // Update student ID profile prefix
  const codeBadge = document.getElementById("profile-code-badge-label");
  if (codeBadge) {
    const label = appLanguage === "th" ? "รหัสนักศึกษา: " : "Student ID: ";
    codeBadge.innerHTML = `${label}<span id="profile-user-code">${userState.studentId}</span>`;
  }
  
  // Update lang button text
  const langToggleBtn = document.getElementById("lang-toggle-btn");
  if (langToggleBtn) {
    langToggleBtn.innerText = appLanguage === "th" ? "EN" : "TH";
  }
}

function initLangToggle() {
  const btn = document.getElementById("lang-toggle-btn");
  if (btn) {
    btn.addEventListener("click", () => {
      appLanguage = appLanguage === "th" ? "en" : "th";
      localStorage.setItem("appLanguage", appLanguage);
      
      // Update page contents
      translateApp();
      syncUI();
      
      // Notify user
      const msg = appLanguage === "th" ? "เปลี่ยนภาษาเป็นภาษาไทยแล้ว" : "Language switched to English";
      showToast(msg, "success");
    });
  }
}
