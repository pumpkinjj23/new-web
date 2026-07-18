// ==========================================
// CARBONWALLET STATE MANAGEMENT
// ==========================================

// Reset cache if it has Jo Rakdee
try {
  const cached = localStorage.getItem("cw_user");
  if (cached && JSON.parse(cached).firstName === "Jo") {
    localStorage.removeItem("cw_user");
    localStorage.removeItem("cw_rewards");
    localStorage.removeItem("cw_transactions");
    localStorage.removeItem("cw_notifications");
  }
} catch (e) {
  console.error("Failed to check or clear localStorage:", e);
}

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
    titleTh: "คูปองเครื่องดื่ม Café Amazon",
    titleEn: "Café Amazon Beverage Coupon",
    points: 150,
    stock: 120,
    image: "images/Café_Amazon_Logo.svg.webp",
    category: "food",
    descriptionTh: "คูปองแทนเงินสดสำหรับแลกเครื่องดื่มร้อนหรือเย็น Café Amazon ฟรี 1 แก้ว (มูลค่าสูงสุด 80 บาท) เพียงแสดงรหัสคูปองกับพนักงานเพื่อรับสิทธิ์",
    descriptionEn: "Free 1 Café Amazon hot or iced beverage (up to 80 THB) at participating locations. Present this coupon to the barista.",
    redeemCount: 350
  },
  {
    id: "r2",
    titleTh: "แก้วเก็บอุณหภูมิ (Tumbler)",
    titleEn: "Stainless Tumbler",
    points: 300,
    stock: 45,
    image: "images/stainless_bottle.png",
    category: "premium",
    descriptionTh: "แก้วเก็บอุณหภูมิสเตนเลสขนาด 500ml เก็บความร้อนได้ 12 ชั่วโมง และความเย็นได้ 24 ชั่วโมง ผลิตจากวัสดุ Food-grade แข็งแรงทนทาน ช่วยลดการใช้แก้วพลาสติกแบบครั้งเดียวทิ้ง",
    descriptionEn: "500ml double-wall stainless steel tumbler. Keeps drinks cold for 24 hours or hot for 12 hours. Food-grade and BPA-free.",
    redeemCount: 220
  },
  {
    id: "r3",
    titleTh: "เสื้อยืดรักษ์โลก (Eco Edition)",
    titleEn: "Eco T-Shirt",
    points: 500,
    stock: 30,
    image: "images/tshirt.png",
    category: "premium",
    descriptionTh: "เสื้อยืดผ้าฝ้ายออร์แกนิกธรรมชาติ 100% สวมใส่สบาย ระบายอากาศได้ดี เหมาะสำหรับทุกกิจกรรม",
    descriptionEn: "Premium t-shirt made from 100% organic cotton. Soft, breathable, and sustainably produced.",
    redeemCount: 95
  },
  {
    id: "r4",
    titleTh: "คูปองส่วนลด Grab 100 บาท",
    titleEn: "Grab 100B Discount Coupon",
    points: 200,
    stock: 80,
    image: "images/G.jpg",
    category: "coupon",
    descriptionTh: "ส่วนลดค่าบริการเดินทาง Grab มูลค่า 100 บาท (ใช้ได้กับ GrabCar, GrabBike หรือ GrabEV) เพียงกรอกรหัสส่วนลดในแอปก่อนใช้บริการ",
    descriptionEn: "100 THB discount coupon for Grab services (GrabCar, GrabBike, or GrabEV) to encourage eco-friendly travel.",
    redeemCount: 410
  },
  {
    id: "r5",
    titleTh: "แบตเตอรี่สำรอง 10,000mAh",
    titleEn: "10,000mAh Power Bank",
    points: 700,
    stock: 15,
    image: "images/powerbank.png",
    category: "electronics",
    descriptionTh: "แบตเตอรี่สำรองความจุ 10,000 mAh รองรับระบบชาร์จเร็ว พกพาสะดวก ผลิตจากวัสดุรีไซเคิล ปลอดภัยสูง",
    descriptionEn: "Sleek 10,000 mAh power bank with fast-charging support. Made from 40% recycled materials.",
    redeemCount: 140
  },
  {
    id: "r6",
    titleTh: "ร่มพับรักษ์โลก (Eco Umbrella)",
    titleEn: "Eco Umbrella",
    points: 400,
    stock: 25,
    image: "images/umbrella.png",
    category: "premium",
    descriptionTh: "ร่มพับกันแดดกันฝนและรังสี UV ตัวผ้าร่มรีไซเคิลจากขวดพลาสติก PET โครงสร้างและด้ามจับไม้ธรรมชาติ แข็งแรง พกพาสะดวก",
    descriptionEn: "Eco-friendly folding umbrella with UV protection. Canopy made from recycled PET plastic bottles.",
    redeemCount: 88
  },
  {
    id: "r7",
    titleTh: "ตั๋วชมภาพยนตร์ Major Cineplex ฟรี 1 ที่นั่ง",
    titleEn: "Free Major Cineplex Movie Ticket (Deluxe)",
    points: 250,
    stock: 30,
    image: "images/mj.png",
    category: "others",
    descriptionTh: "ตั๋วชมภาพยนตร์ที่นั่งประเภท Deluxe 1 ที่นั่ง สำหรับชมภาพยนตร์ระบบปกติ 2D ที่โรงภาพยนตร์เมเจอร์ ซีนีเพล็กซ์ ทุกสาขา",
    descriptionEn: "Free 1 Deluxe seat ticket for regular 2D movie screenings at Major Cineplex locations.",
    redeemCount: 145
  },
  {
    id: "r9",
    titleTh: "ตั๋วชมภาพยนตร์ SF Cinema ฟรี 1 ที่นั่ง",
    titleEn: "Free SF Cinema Movie Ticket (Deluxe)",
    points: 250,
    stock: 30,
    image: "images/sf.jpg",
    category: "others",
    descriptionTh: "ตั๋วชมภาพยนตร์ที่นั่งประเภท Deluxe 1 ที่นั่ง สำหรับชมภาพยนตร์ระบบปกติ 2D ที่โรงภาพยนตร์เอสเอฟ ซีนีม่า ทุกสาขา",
    descriptionEn: "Free 1 Deluxe seat ticket for regular 2D movie screenings at SF Cinema locations.",
    redeemCount: 145
  },
  {
    id: "r8",
    titleTh: "คูปองแทนเงินสดเซ็นทรัล 200 บาท",
    titleEn: "Central 200B Gift Voucher",
    points: 350,
    stock: 40,
    image: "images/s.webp",
    category: "coupon",
    descriptionTh: "คูปองแทนเงินสดอิเล็กทรอนิกส์ มูลค่า 200 บาท สำหรับใช้ซื้อสินค้าที่ห้างสรรพสินค้าเซ็นทรัลทุกสาขา ไม่มีขั้นต่ำในการช้อป",
    descriptionEn: "200 THB E-Gift Voucher to purchase items at Central Department Store. No minimum spend required.",
    redeemCount: 180
  }
];

const DEFAULT_TRANSACTIONS = [
  {
    id: "TXN-20260713-0001",
    title: "เดินลดคาร์บอน",
    points: 50,
    type: "received", // received, used, carbon
    date: "13 ก.ค. 2026",
    time: "10:30:45",
    source: "Health Tracker",
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
    title: "แลกแก้วเก็บอุณหภูมิ - Tumbler",
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
    title: "PromptGo - นั่ง Prompt go",
    points: 20,
    type: "carbon", // Shown in Carbon Credit tab
    date: "12 ก.ค. 2026",
    time: "09:30:00",
    source: "PromptGo App",
    status: "Completed",
    hash: "0x4ae89cd5ef182a4d3cfc78a0189bda8a984029415"
  },
  {
    id: "TXN-20260710-0001",
    title: "Café Amazon Coupon - คูปองเครื่องดื่ม Café Amazon",
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
  
  if (cachedRewards) {
    const parsed = JSON.parse(cachedRewards);
    // Merge any missing default rewards (e.g. newly added rewards) into the parsed cached state
    const merged = [...parsed];
    DEFAULT_REWARDS.forEach(defaultItem => {
      if (!merged.some(item => item.id === defaultItem.id)) {
        merged.push(defaultItem);
      }
    });

    rewardsState = merged.map(item => {
      const defaultItem = DEFAULT_REWARDS.find(r => r.id === item.id);
      if (defaultItem) {
        return {
          ...item,
          titleTh: defaultItem.titleTh,
          titleEn: defaultItem.titleEn,
          descriptionTh: defaultItem.descriptionTh,
          descriptionEn: defaultItem.descriptionEn,
          image: defaultItem.image // Sync image path
        };
      }
      return item;
    });
  }
  
  if (cachedTransactions) {
    let parsed = JSON.parse(cachedTransactions);
    parsed = parsed.map(tx => {
      if (tx.title === "แลกขวดน้ำเหล็ก - Bottle") {
        tx.title = "แลกแก้วเก็บอุณหภูมิ - Tumbler";
      }
      if (tx.title === "PromptGo - นั่งรถไฟฟ้ามหาวิทยาลัย" || tx.title === "EV Bus - เดินทางสาธารณะรถไฟฟ้า") {
        tx.title = "PromptGo - นั่ง Prompt go";
      }
      if (tx.title === "Coffee Coupon - คูปองกาแฟร้อน") {
        tx.title = "Café Amazon Coupon - คูปองเครื่องดื่ม Café Amazon";
      }
      if (tx.source === "EV Bus Linker") {
        tx.source = "PromptGo App";
      }
      return tx;
    });
    transactionsState = parsed;
  }
  
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
  
  // 5. Sync avatar images
  const currentAvatar = userState.avatar || "https://api.dicebear.com/7.x/adventurer/svg?seed=Somchai";
  const profileAvatar = document.getElementById("profile-avatar-img");
  if (profileAvatar) profileAvatar.src = currentAvatar;
  const sidebarAvatar = document.getElementById("sidebar-avatar-img");
  if (sidebarAvatar) sidebarAvatar.src = currentAvatar;
  const headerAvatar = document.getElementById("header-avatar-img");
  if (headerAvatar) headerAvatar.src = currentAvatar;
  const welcomeAvatar = document.getElementById("welcome-avatar-img");
  if (welcomeAvatar) welcomeAvatar.src = currentAvatar;
  
  // 6. Sync dashboard transactions and notifications
  renderDashboardTransactions();
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
    const title = (appLanguage === "th" ? item.titleTh : item.titleEn) || "";
    const description = (appLanguage === "th" ? item.descriptionTh : item.descriptionEn) || "";
    const matchesSearch = title.toLowerCase().includes(searchRewardQuery.toLowerCase()) || 
                          description.toLowerCase().includes(searchRewardQuery.toLowerCase());
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
    
    // Localize title
    const rewardTitle = appLanguage === "th" ? item.titleTh : item.titleEn;
    
    // Category readable name
    const categoryName = getCategoryName(item.category);
    const stockText = appLanguage === "th"
      ? `<i class="fa-solid fa-box"></i> คงเหลือ ${item.stock} ชิ้น`
      : `<i class="fa-solid fa-box"></i> ${item.stock} units remaining`;
    const redeemText = appLanguage === "th" ? "แลกเลย" : "Redeem";
    
    card.innerHTML = `
      <div class="reward-card-image-wrapper">
        <img src="${item.image}" alt="${rewardTitle}">
        <span class="category-tag">${categoryName}</span>
      </div>
      <div class="reward-card-body">
        <h3 class="reward-title">${rewardTitle}</h3>
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
  
  const title = appLanguage === "th" ? reward.titleTh : reward.titleEn;
  const description = appLanguage === "th" ? reward.descriptionTh : reward.descriptionEn;
  
  document.getElementById("detail-modal-image").src = reward.image;
  document.getElementById("detail-modal-category").innerText = getCategoryName(reward.category);
  document.getElementById("detail-modal-title").innerText = title;
  document.getElementById("detail-modal-points").innerText = `${reward.points} Points`;
  document.getElementById("detail-modal-stock").innerText = appLanguage === "th"
    ? `คงเหลือ ${reward.stock} ชิ้น`
    : `${reward.stock} units remaining`;
  document.getElementById("detail-modal-desc").innerText = description;
  
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
  
  const title = appLanguage === "th" ? reward.titleTh : reward.titleEn;
  
  // Bind preview details
  document.getElementById("confirm-modal-item-img").src = reward.image;
  document.getElementById("confirm-modal-item-title").innerText = title;
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
    
    const title = appLanguage === "th" ? reward.titleTh : reward.titleEn;
    
    const newTx = {
      id: newTxId,
      title: appLanguage === "th" ? `แลกรับของรางวัล - ${title}` : `Redeemed Reward - ${title}`,
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
      text: appLanguage === "th" ? `แลกของรางวัล ${title} สำเร็จแล้ว!` : `Redeemed ${title} successfully!`,
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
  const title = appLanguage === "th" ? reward.titleTh : reward.titleEn;
  const subtitleText = appLanguage === "th" 
    ? `คุณได้แลก <span id="success-item-name" class="highlight">${title}</span> เรียบร้อยแล้ว` 
    : `You have redeemed <span id="success-item-name" class="highlight">${title}</span> successfully.`;
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

function renderDashboardTransactions() {
  const container = document.getElementById("dashboard-tx-list");
  if (!container) return;
  
  container.innerHTML = "";
  
  // Show the latest 5 transactions
  const latestTx = transactionsState.slice(0, 5);
  
  if (latestTx.length === 0) {
    const emptyMsg = appLanguage === "th" ? "ไม่มีประวัติการทำรายการ" : "No point history available.";
    container.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
        <p>${emptyMsg}</p>
      </div>
    `;
    return;
  }
  
  latestTx.forEach(tx => {
    const item = document.createElement("div");
    item.className = "activity-item";
    
    const isPositive = tx.points >= 0;
    const sign = isPositive ? "+" : "";
    const pointsClass = isPositive ? "plus" : "minus";
    
    // Choose icon based on category/type
    let iconClass = "fa-coins";
    if (tx.title.includes("PromptGo") || tx.title.includes("Prompt go") || tx.title.includes("นั่ง Prompt")) {
      iconClass = "fa-van-shuttle";
    } else if (tx.title.includes("Helmet") || tx.title.includes("หมวกกันน็อก") || tx.title.includes("สวมหมวก")) {
      iconClass = "fa-helmet-safety";
    } else if (tx.title.includes("เดิน")) {
      iconClass = "fa-person-walking";
    } else if (tx.type === "used") {
      iconClass = "fa-gift";
    }
    
    let titleVal = tx.title;
    if (appLanguage === "en") {
      if (tx.title.includes("นั่ง Prompt go")) titleVal = "PromptGo - Ride EV Bus";
      else if (tx.title.includes("เดินลดคาร์บอน")) titleVal = "Walk & Save Carbon";
      else if (tx.title.includes("ขับขี่ปลอดภัยสวมหมวก")) titleVal = "Helmet App - Ride with Helmet";
      else if (tx.title.includes("Café Amazon Coupon - คูปองเครื่องดื่ม Café Amazon")) titleVal = "Café Amazon Coupon - Café Amazon Beverage Coupon";
      else if (tx.title.includes("แลกแก้วเก็บอุณหภูมิ")) titleVal = "Redeemed Reward - Tumbler";
      else if (tx.title.includes("แลกรับของรางวัล")) {
        titleVal = tx.title.replace("แลกรับของรางวัล - ", "Redeemed Reward - ")
                           .replace("คูปองเครื่องดื่ม Café Amazon", "Café Amazon Beverage Coupon")
                           .replace("คูปองแทนเงินสดเซ็นทรัล 200 บาท", "Central 200B Gift Voucher")
                           .replace("ตั๋วชมภาพยนตร์ Major Cineplex ฟรี 1 ที่นั่ง", "Major Cineplex Movie Ticket")
                           .replace("ตั๋วชมภาพยนตร์ SF Cinema ฟรี 1 ที่นั่ง", "SF Cinema Movie Ticket")
                           .replace("คูปองส่วนลด Grab 100 บาท", "Grab 100B Discount Coupon");
      }
    }
    
    let pointsLabel = `${sign}${tx.points}`;
    if (tx.type === "carbon") {
      pointsLabel = `${sign}${tx.points} Carbon Credit`;
    } else {
      pointsLabel = `${sign}${tx.points} Points`;
    }
    
    item.innerHTML = `
      <div class="activity-icon ${isPositive ? 'bg-green-light' : 'bg-orange-light'}">
        <i class="fa-solid ${iconClass}"></i>
      </div>
      <div class="activity-details">
        <h4>${titleVal}</h4>
        <p>${tx.date} · ${tx.time}</p>
      </div>
      <div class="activity-points ${pointsClass}">${pointsLabel}</div>
    `;
    
    container.appendChild(item);
  });
}

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
      if (tx.title.includes("นั่ง Prompt go")) titleVal = "PromptGo - Ride Prompt go";
      else if (tx.title.includes("เดินลดคาร์บอน")) titleVal = "Walk & Save Carbon";
      else if (tx.title.includes("ขับขี่ปลอดภัยสวมหมวก")) titleVal = "Helmet App - Ride with Helmet";
      else if (tx.title.includes("Café Amazon Coupon - คูปองเครื่องดื่ม Café Amazon")) titleVal = "Café Amazon Coupon - Café Amazon Beverage Coupon";
      else if (tx.title.includes("แลกรับของรางวัล")) {
        titleVal = tx.title.replace("แลกรับของรางวัล - ", "Redeemed Reward - ")
                           .replace("คูปองเครื่องดื่ม Café Amazon", "Café Amazon Beverage Coupon")
                           .replace("คูปองแทนเงินสดเซ็นทรัล 200 บาท", "Central 200B Gift Voucher")
                           .replace("ตั๋วชมภาพยนตร์ Major Cineplex ฟรี 1 ที่นั่ง", "Major Cineplex Movie Ticket")
                           .replace("ตั๋วชมภาพยนตร์ SF Cinema ฟรี 1 ที่นั่ง", "SF Cinema Movie Ticket")
                           .replace("คูปองส่วนลด Grab 100 บาท", "Grab 100B Discount Coupon");
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

  // Auth flow initialization
  initAuthFlow();
  checkAuthStatus();
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
    "stat-chart-title": "สถิติการใช้รถไฟฟ้า PromptGo รายสัปดาห์",
    "chart-summary-weekly": "สัปดาห์นี้: <b>8 ครั้ง</b>",
    "dashboard-history-title": "ประวัติคะแนนและการใช้งานล่าสุด",
    "chart-val-0": "0 ครั้ง",
    "chart-val-1": "1 ครั้ง",
    "chart-val-2": "2 ครั้ง",
    "chart-val-3": "3 ครั้ง",
    "chart-val-4": "4 ครั้ง",
    
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
    "act-1-title": "นั่ง Prompt go",
    "act-1-desc": "เรียกรถและเดินทางด้วยรถไฟฟ้ามหาลัยเพื่อรับคะแนน",
    "act-1-points": "+20 Carbon Credit",
    "act-2-title": "สวมหมวกกันน็อกขับขี่ปลอดภัย",
    "act-2-desc": "ระบบยืนยันความปลอดภัย",
    "act-3-title": "เดินสะสมครบ 10,000 ก้าว",
    "act-3-desc": "ลดคาร์บอน 1.5 kg",
    "nav-logout": "ออกจากระบบ",
    "auth-subtitle": "แพลตฟอร์มสะสมแต้มคาร์บอนและแลกของรางวัล",
    "tab-login": "เข้าสู่ระบบ",
    "tab-register": "สมัครสมาชิก",
    "email-label": "อีเมลมหาวิทยาลัย",
    "password-label": "รหัสผ่าน",
    "confirm-password-label": "ยืนยันรหัสผ่าน",
    "forgot-password": "ลืมรหัสผ่าน?",
    "btn-login": "เข้าสู่ระบบ",
    "btn-register": "สมัครสมาชิก",
    "social-divider": "หรือเชื่อมต่อด้วย",
    "google-login": "Google",
    "thaid-login": "ThaiD",
    "google-modal-title": "ลงชื่อเข้าใช้งานด้วย Google",
    "google-modal-subtitle": "เพื่อเข้าใช้งานระบบ CarbonWallet",
    "google-use-another": "ใช้บัญชีอื่น",
    "thaid-modal-desc": "กรุณาสแกน QR Code นี้ด้วยแอปพลิเคชัน ThaiD เพื่อยืนยันตัวตน",
    "qr-timeout": "QR Code จะหมดอายุใน",
    "seconds-unit": "วินาที",
    "thaid-step1": "เปิดแอปพลิเคชัน ThaiD บนมือถือของคุณ",
    "thaid-step2": "เลือกเมนู \"สแกน QR Code\"",
    "thaid-step3": "กดยืนยันการลงชื่อเข้าใช้งานบนมือถือ",
    "brand-welcome-title": "สะสมแต้มคาร์บอน<br>เพื่อโลกสีเขียวของเรา",
    "brand-welcome-desc": "ร่วมเป็นส่วนหนึ่งในการขับเคลื่อนมหาวิทยาลัยสีเขียว บันทึกกิจกรรมเพื่อสิ่งแวดล้อม และแลกรับของรางวัลพิเศษมากมาย",
    "feat-mobility": "PromptGo",
    "feat-mobility-desc": "นั่งรถรับส่งไฟฟ้าภายใน มรภ.พิบูลสงคราม สะสมแต้มได้ง่ายๆ",
    "feat-safety": "Eco Safety",
    "feat-safety-desc": "ขับขี่ปลอดภัย สวมหมวกนิรภัยเพื่อโลกและสุขภาพของคุณ",
    "feat-rewards": "Premium Rewards",
    "feat-rewards-desc": "แลกเปลี่ยนพอยท์เป็นของรางวัลสุดพรีเมียมและคูปองส่วนลดพิเศษ",
    "forgot-pwd-title": "กู้คืนรหัสผ่าน",
    "forgot-pwd-desc": "ระบุอีเมลของคุณที่ใช้สมัคร เพื่อรับลิงก์สำหรับตั้งรหัสผ่านใหม่",
    "btn-send-reset-link": "ส่งลิงก์กู้คืนรหัสผ่าน",
    "back-to-login": "กลับสู่หน้าเข้าสู่ระบบ"
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
    "stat-chart-title": "Weekly PromptGo EV Bus Usage",
    "chart-summary-weekly": "This week: <b>8 times</b>",
    "dashboard-history-title": "Recent Points & Activity History",
    "chart-val-0": "0 times",
    "chart-val-1": "1 time",
    "chart-val-2": "2 times",
    "chart-val-3": "3 times",
    "chart-val-4": "4 times",
    
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
    "act-1-title": "Ride Prompt go",
    "act-1-desc": "Rode university electric shuttle to earn points",
    "act-1-points": "+20 Carbon Credits",
    "act-2-title": "Safe Ride with Helmet (Helmet App)",
    "act-2-desc": "Journey recorded by AI safety system",
    "act-3-title": "Walked 10,000 steps",
    "act-3-desc": "Saved 1.5 kg CO₂e emissions",
    "nav-logout": "Log Out",
    "auth-subtitle": "Carbon Points Accumulation & Reward Platform",
    "tab-login": "Log In",
    "tab-register": "Register",
    "email-label": "University Email",
    "password-label": "Password",
    "confirm-password-label": "Confirm Password",
    "forgot-password": "Forgot password?",
    "btn-login": "Log In",
    "btn-register": "Register",
    "social-divider": "Or connect with",
    "google-login": "Google",
    "thaid-login": "ThaiD",
    "google-modal-title": "Sign in with Google",
    "google-modal-subtitle": "to access CarbonWallet System",
    "google-use-another": "Use another account",
    "thaid-modal-desc": "Please scan this QR Code with your ThaiD application to authenticate",
    "qr-timeout": "QR Code will expire in",
    "seconds-unit": "seconds",
    "thaid-step1": "Open the ThaiD app on your mobile device",
    "thaid-step2": "Select the \"Scan QR Code\" menu",
    "thaid-step3": "Confirm sign-in on your phone",
    "brand-welcome-title": "Accumulate Carbon Credits<br>For Our Green Planet",
    "brand-welcome-desc": "Join the green campus movement, record eco-friendly actions, and redeem premium rewards.",
    "feat-mobility": "PromptGo",
    "feat-mobility-desc": "Earn carbon points easily by using eco-friendly electric transport.",
    "feat-safety": "Eco Safety",
    "feat-safety-desc": "Verify helmet usage with AI to promote a safer, greener environment.",
    "feat-rewards": "Premium Rewards",
    "feat-rewards-desc": "Convert your carbon points into exclusive vouchers, discounts, and gear.",
    "forgot-pwd-title": "Reset Password",
    "forgot-pwd-desc": "Enter your registered email to receive a password reset link.",
    "btn-send-reset-link": "Send Reset Link",
    "back-to-login": "Back to Log In"
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

// ==========================================
// USER AUTHENTICATION & SOCIAL LOGIN FLOWS
// ==========================================
let thaidCountdownInterval = null;

function checkAuthStatus() {
  const isLoggedIn = localStorage.getItem("cw_logged_in") === "true";
  const authContainer = document.getElementById("auth-container");
  const appContainer = document.getElementById("app-container");
  
  if (isLoggedIn) {
    authContainer.classList.add("hidden");
    appContainer.classList.remove("hidden");
    syncUI();
  } else {
    appContainer.classList.add("hidden");
    authContainer.classList.remove("hidden");
  }
}

function initAuthFlow() {
  // 1. Tab switches (Login / Register / Forgot Password)
  const tabLogin = document.getElementById("tab-login");
  const tabRegister = document.getElementById("tab-register");
  const indicator = document.querySelector(".tab-indicator");
  const loginWrapper = document.getElementById("login-form-wrapper");
  const registerWrapper = document.getElementById("register-form-wrapper");
  const forgotWrapper = document.getElementById("forgot-form-wrapper");
  const authTabs = document.querySelector(".auth-tabs");

  tabLogin.addEventListener("click", () => {
    tabLogin.classList.add("active");
    tabRegister.classList.remove("active");
    indicator.style.transform = "translateX(0)";
    loginWrapper.classList.add("active");
    registerWrapper.classList.remove("active");
    forgotWrapper.classList.remove("active");
    authTabs.style.display = "flex";
  });

  tabRegister.addEventListener("click", () => {
    tabRegister.classList.add("active");
    tabLogin.classList.remove("active");
    indicator.style.transform = "translateX(100%)";
    registerWrapper.classList.add("active");
    loginWrapper.classList.remove("active");
    forgotWrapper.classList.remove("active");
    authTabs.style.display = "flex";
  });

  // Forgot password link navigation
  const linkForgotPwd = document.getElementById("link-forgot-pwd");
  if (linkForgotPwd) {
    linkForgotPwd.addEventListener("click", (e) => {
      e.preventDefault();
      loginWrapper.classList.remove("active");
      registerWrapper.classList.remove("active");
      forgotWrapper.classList.add("active");
      authTabs.style.display = "none";
    });
  }

  // Back to login navigation
  const linkBackToLogin = document.getElementById("link-back-to-login");
  if (linkBackToLogin) {
    linkBackToLogin.addEventListener("click", (e) => {
      e.preventDefault();
      forgotWrapper.classList.remove("active");
      loginWrapper.classList.add("active");
      authTabs.style.display = "flex";
      tabLogin.classList.add("active");
      tabRegister.classList.remove("active");
      indicator.style.transform = "translateX(0)";
    });
  }

  // Forgot password form submission
  const forgotForm = document.getElementById("forgot-password-form");
  if (forgotForm) {
    forgotForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("forgot-email").value.trim();
      if (!email) {
        showToast(appLanguage === "th" ? "กรุณากรอกอีเมล" : "Please enter your email.", "error");
        return;
      }

      showToast(
        appLanguage === "th" 
          ? "ส่งลิงก์สำหรับกู้คืนรหัสผ่านไปยังอีเมลของคุณเรียบร้อยแล้ว!" 
          : "Reset link has been sent to your email successfully!", 
        "success"
      );

      setTimeout(() => {
        linkBackToLogin.click();
        document.getElementById("forgot-email").value = "";
      }, 2000);
    });
  }

  // 2. Toggle password visibility
  setupPasswordToggle("toggle-login-password", "login-password");
  setupPasswordToggle("toggle-reg-password", "reg-password");
  setupPasswordToggle("toggle-reg-conf-password", "reg-confirm-password");

  // 3. Login submit
  document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const pass = document.getElementById("login-password").value.trim();

    if (!email || !pass) {
      showToast(appLanguage === "th" ? "กรุณากรอกข้อมูลให้ครบถ้วน" : "Please fill in all fields.", "error");
      return;
    }

    // Check if there is a cached user in localStorage
    const cached = localStorage.getItem("cw_user");
    let targetUser = { ...DEFAULT_USER };
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed.email === email) {
        targetUser = parsed;
      } else {
        targetUser = { ...parsed, email: email };
      }
    } else {
      targetUser.email = email;
    }

    userState = targetUser;
    localStorage.setItem("cw_logged_in", "true");
    saveToLocalStorage();
    syncUI();
    checkAuthStatus();
    showToast(appLanguage === "th" ? "เข้าสู่ระบบสำเร็จ!" : "Logged in successfully!", "success");
  });

  // 4. Register submit
  document.getElementById("register-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const firstName = document.getElementById("reg-firstname").value.trim();
    const lastName = document.getElementById("reg-lastname").value.trim();
    const studentId = document.getElementById("reg-student-id").value.trim();
    const phone = document.getElementById("reg-phone").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const faculty = document.getElementById("reg-faculty").value.trim();
    const major = document.getElementById("reg-major").value.trim();
    const password = document.getElementById("reg-password").value.trim();
    const confirmPassword = document.getElementById("reg-confirm-password").value.trim();

    if (password !== confirmPassword) {
      showToast(appLanguage === "th" ? "รหัสผ่านไม่ตรงกัน" : "Passwords do not match.", "error");
      return;
    }

    userState = {
      firstName,
      lastName,
      studentId,
      phone,
      email,
      faculty,
      major,
      points: 1250
    };

    localStorage.setItem("cw_logged_in", "true");
    saveToLocalStorage();
    syncUI();
    checkAuthStatus();
    showToast(appLanguage === "th" ? "สมัครสมาชิกและเข้าสู่ระบบสำเร็จ!" : "Registered and logged in successfully!", "success");
  });

  // 5. Google simulated login
  const googleBtn = document.getElementById("btn-google-login");
  const googleModal = document.getElementById("google-modal");
  const closeGoogle = document.getElementById("btn-close-google");

  googleBtn.addEventListener("click", () => {
    googleModal.classList.add("active");
  });

  closeGoogle.addEventListener("click", () => {
    googleModal.classList.remove("active");
  });

  const googleItems = document.querySelectorAll(".google-account-item");
  googleItems.forEach(item => {
    item.addEventListener("click", () => {
      const email = item.getAttribute("data-email");
      const name = item.getAttribute("data-name");
      const nameParts = name.split(" ");
      const firstName = nameParts[0] || "Google";
      const lastName = nameParts[1] || "User";

      userState = {
        firstName,
        lastName,
        studentId: "65" + Math.floor(1000000 + Math.random() * 9000000),
        phone: "089-" + Math.floor(100 + Math.random() * 900) + "-" + Math.floor(1000 + Math.random() * 9000),
        email,
        faculty: "Information Technology",
        major: "Software Engineering",
        points: 1250,
        avatar: item.querySelector("img").src
      };

      googleModal.classList.remove("active");
      localStorage.setItem("cw_logged_in", "true");
      saveToLocalStorage();
      syncUI();
      checkAuthStatus();
      showToast(appLanguage === "th" ? "เข้าสู่ระบบด้วย Google สำเร็จ!" : "Logged in with Google successfully!", "success");
    });
  });

  document.getElementById("google-use-another-account").addEventListener("click", () => {
    googleModal.classList.remove("active");
    tabLogin.click();
    document.getElementById("login-email").focus();
  });

  // 6. ThaiD simulated login
  const thaidBtn = document.getElementById("btn-thaid-login");
  const thaidModal = document.getElementById("thaid-modal");
  const closeThaid = document.getElementById("btn-close-thaid");
  const simulateThaidScan = document.getElementById("btn-simulate-thaid-scan");

  thaidBtn.addEventListener("click", () => {
    thaidModal.classList.add("active");
    startThaidCountdown();
  });

  closeThaid.addEventListener("click", () => {
    thaidModal.classList.remove("active");
    clearInterval(thaidCountdownInterval);
  });

  simulateThaidScan.addEventListener("click", () => {
    handleThaidSuccess();
  });

  document.getElementById("thaid-qr-box").addEventListener("click", () => {
    handleThaidSuccess();
  });

  // 7. Logout buttons
  const sidebarLogout = document.getElementById("sidebar-nav-logout");
  const navLogout = document.getElementById("nav-logout");

  const handleLogout = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    localStorage.removeItem("cw_logged_in");
    checkAuthStatus();
    showToast(appLanguage === "th" ? "ออกจากระบบเรียบร้อย" : "Logged out successfully", "success");
  };

  if (sidebarLogout) sidebarLogout.addEventListener("click", handleLogout);
  if (navLogout) navLogout.addEventListener("click", handleLogout);

  // 8. Auth screen top controls
  const authLangBtn = document.getElementById("auth-lang-toggle-btn");
  const authThemeBtn = document.getElementById("auth-theme-toggle-btn");

  if (authLangBtn) {
    authLangBtn.addEventListener("click", () => {
      document.getElementById("lang-toggle-btn").click();
      authLangBtn.innerText = appLanguage === "th" ? "EN" : "TH";
    });
  }

  if (authThemeBtn) {
    authThemeBtn.addEventListener("click", () => {
      document.getElementById("theme-toggle-btn").click();
    });
  }
}

function setupPasswordToggle(toggleId, inputId) {
  const toggle = document.getElementById(toggleId);
  const input = document.getElementById(inputId);
  if (toggle && input) {
    toggle.addEventListener("click", () => {
      const type = input.getAttribute("type") === "password" ? "text" : "password";
      input.setAttribute("type", type);
      toggle.classList.toggle("fa-eye");
      toggle.classList.toggle("fa-eye-slash");
    });
  }
}

function startThaidCountdown() {
  const countdownEl = document.getElementById("qr-countdown");
  if (!countdownEl) return;
  let timeLeft = 120;
  countdownEl.innerText = timeLeft;
  
  clearInterval(thaidCountdownInterval);
  thaidCountdownInterval = setInterval(() => {
    timeLeft--;
    countdownEl.innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(thaidCountdownInterval);
      document.getElementById("btn-close-thaid").click();
      showToast(appLanguage === "th" ? "หมดเวลาสแกน QR Code" : "QR Code expired", "error");
    }
  }, 1000);
}

function handleThaidSuccess() {
  clearInterval(thaidCountdownInterval);
  document.getElementById("thaid-modal").classList.remove("active");

  userState = {
    firstName: "วิทยา",
    lastName: "ใจดี",
    studentId: "650999999",
    phone: "081-999-8888",
    email: "wittaya.j@psru.ac.th",
    faculty: "Science and Technology",
    major: "Computer Engineering",
    points: 1250,
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Wittaya"
  };

  localStorage.setItem("cw_logged_in", "true");
  saveToLocalStorage();
  syncUI();
  checkAuthStatus();
  showToast(appLanguage === "th" ? "ยืนยันตัวตนด้วย ThaiD สำเร็จ!" : "Authenticated with ThaiD successfully!", "success");
}
