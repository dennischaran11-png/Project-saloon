/* ============================================================
   LumiSalon — Smart Queue Management System
   script.js  |  Core Application Logic
   ============================================================ */

'use strict';

// ============================================================
// STATE  — Central application data store
// ============================================================
const state = {
  queueCounter: 101,   // Next queue number to assign
  currentFilter: 'all',
  currentSort: 'time-asc',
  salonOpen: true,
  notifications: [],
  charts: {},          // Holds Chart.js instances

  // ---------- SERVICES ----------
  services: [
    { id: 1, name: 'Haircut',       category: 'Hair',     duration: 30, price: 350,  status: 'active' },
    { id: 2, name: 'Hair Styling',  category: 'Hair',     duration: 45, price: 550,  status: 'active' },
    { id: 3, name: 'Hair Coloring', category: 'Hair',     duration: 90, price: 1800, status: 'active' },
    { id: 4, name: 'Facial',        category: 'Skin',     duration: 60, price: 900,  status: 'active' },
    { id: 5, name: 'Manicure',      category: 'Nail',     duration: 40, price: 450,  status: 'active' },
    { id: 6, name: 'Pedicure',      category: 'Nail',     duration: 50, price: 500,  status: 'active' },
    { id: 7, name: 'Waxing',        category: 'Skin',     duration: 35, price: 400,  status: 'active' },
    { id: 8, name: 'Head Massage',  category: 'Wellness', duration: 30, price: 350,  status: 'active' },
    { id: 9, name: 'Bridal Makeup', category: 'Makeup',   duration: 120, price: 5000, status: 'active' },
  ],

  // ---------- STAFF ----------
  staff: [
    { id: 1, name: 'Priya Sharma',   role: 'Senior Stylist', specialization: 'Hair Coloring', status: 'available', servedToday: 12, currentCustomer: null, color: '#8b1e19' },
    { id: 2, name: 'Meena Reddy',    role: 'Beautician',     specialization: 'Facials',        status: 'busy',      servedToday: 9,  currentCustomer: 'Q-103', color: '#a82d27' },
    { id: 3, name: 'Arjun Verma',    role: 'Stylist',        specialization: 'Haircut',        status: 'busy',      servedToday: 14, currentCustomer: 'Q-101', color: '#1e2026' },
    { id: 4, name: 'Sunita Das',     role: 'Nail Technician',specialization: 'Nail Art',       status: 'available', servedToday: 7,  currentCustomer: null, color: '#7b5ea7' },
    { id: 5, name: 'Kavya Iyer',     role: 'Stylist',        specialization: 'Hair Styling',   status: 'break',     servedToday: 10, currentCustomer: null, color: '#2d6a9f' },
    { id: 6, name: 'Divya Nair',     role: 'Senior Stylist', specialization: 'Bridal Makeup',  status: 'available', servedToday: 8,  currentCustomer: null, color: '#c49a58' },
    { id: 7, name: 'Ravi Kumar',     role: 'Stylist',        specialization: 'Hair Coloring',  status: 'busy',      servedToday: 11, currentCustomer: 'Q-102', color: '#4a7c59' },
    { id: 8, name: 'Anita Singh',    role: 'Beautician',     specialization: 'Waxing',         status: 'available', servedToday: 6,  currentCustomer: null, color: '#9e3d3d' },
    { id: 9, name: 'Pooja Menon',    role: 'Nail Technician',specialization: 'Pedicure',       status: 'offline',   servedToday: 0,  currentCustomer: null, color: '#565a65' },
    { id: 10,name: 'Rekha Pillai',   role: 'Receptionist',   specialization: 'Front Desk',     status: 'available', servedToday: 0,  currentCustomer: null, color: '#8b1e19' },
  ],

  // ---------- QUEUE ----------
  queue: [
    { id: 'Q-101', name: 'Ananya Gupta',  phone: '9876543210', serviceId: 1, staffId: 3, priority: 'normal',   status: 'in-service',joinedAt: Date.now() - 35*60000, notes: '' },
    { id: 'Q-102', name: 'Rahul Mehta',   phone: '9812345678', serviceId: 4, staffId: 7, priority: 'priority', status: 'in-service',joinedAt: Date.now() - 20*60000, notes: 'Sensitive skin' },
    { id: 'Q-103', name: 'Sneha Pillai',  phone: '9834567890', serviceId: 3, staffId: 2, priority: 'normal',   status: 'in-service',joinedAt: Date.now() - 15*60000, notes: '' },
    { id: 'Q-104', name: 'Arjun Kapoor',  phone: '9890123456', serviceId: 1, staffId: null, priority: 'vip',  status: 'called',    joinedAt: Date.now() - 10*60000, notes: 'Regular customer' },
    { id: 'Q-105', name: 'Divya Sharma',  phone: '9856789012', serviceId: 2, staffId: null, priority: 'normal',status: 'waiting',   joinedAt: Date.now() - 8*60000,  notes: '' },
    { id: 'Q-106', name: 'Karan Singh',   phone: '9878901234', serviceId: 5, staffId: null, priority: 'normal',status: 'waiting',   joinedAt: Date.now() - 6*60000,  notes: '' },
    { id: 'Q-107', name: 'Preethi Nair',  phone: '9812098765', serviceId: 6, staffId: null, priority: 'normal',status: 'waiting',   joinedAt: Date.now() - 4*60000,  notes: '' },
    { id: 'Q-108', name: 'Rohit Verma',   phone: '9845678901', serviceId: 1, staffId: null, priority: 'normal',status: 'waiting',   joinedAt: Date.now() - 3*60000,  notes: '' },
  ],

  // ---------- CUSTOMERS (history) ----------
  customers: [
    { id: 1, name: 'Ananya Gupta',  phone: '9876543210', lastVisit: '2026-10-07', visits: 24, favService: 'Haircut',       totalSpent: 8400 },
    { id: 2, name: 'Rahul Mehta',   phone: '9812345678', lastVisit: '2026-10-07', visits: 8,  favService: 'Facial',         totalSpent: 7200 },
    { id: 3, name: 'Sneha Pillai',  phone: '9834567890', lastVisit: '2026-10-05', visits: 15, favService: 'Hair Coloring',  totalSpent: 27000 },
    { id: 4, name: 'Arjun Kapoor',  phone: '9890123456', lastVisit: '2026-10-07', visits: 32, favService: 'Haircut',        totalSpent: 11200 },
    { id: 5, name: 'Divya Sharma',  phone: '9856789012', lastVisit: '2026-10-03', visits: 12, favService: 'Hair Styling',   totalSpent: 6600 },
    { id: 6, name: 'Karan Singh',   phone: '9878901234', lastVisit: '2026-09-28', visits: 5,  favService: 'Manicure',       totalSpent: 2250 },
    { id: 7, name: 'Preethi Nair',  phone: '9812098765', lastVisit: '2026-10-01', visits: 18, favService: 'Pedicure',       totalSpent: 9000 },
    { id: 8, name: 'Rohit Verma',   phone: '9845678901', lastVisit: '2026-10-07', visits: 3,  favService: 'Haircut',        totalSpent: 1050 },
  ],

  // ---------- HISTORY ----------
  history: [
    { id:'H-1', customer:'Meera Joshi',  service:'Facial',        staff:'Meena Reddy',  duration:60, amount:900,  datetime:'2026-10-07 09:15', rating:5 },
    { id:'H-2', customer:'Suresh Patel', service:'Haircut',        staff:'Arjun Verma',  duration:30, amount:350,  datetime:'2026-10-07 09:50', rating:4 },
    { id:'H-3', customer:'Lakshmi Rao',  service:'Hair Coloring',  staff:'Priya Sharma', duration:90, amount:1800, datetime:'2026-10-07 10:30', rating:5 },
    { id:'H-4', customer:'Anil Kumar',   service:'Head Massage',   staff:'Kavya Iyer',   duration:30, amount:350,  datetime:'2026-10-07 11:00', rating:4 },
    { id:'H-5', customer:'Nisha Gupta',  service:'Manicure',       staff:'Sunita Das',   duration:40, amount:450,  datetime:'2026-10-07 11:45', rating:5 },
    { id:'H-6', customer:'Ramesh Shetty',service:'Haircut',        staff:'Arjun Verma',  duration:30, amount:350,  datetime:'2026-10-07 12:10', rating:3 },
    { id:'H-7', customer:'Geetha Nair',  service:'Waxing',         staff:'Anita Singh',  duration:35, amount:400,  datetime:'2026-10-07 12:40', rating:5 },
    { id:'H-8', customer:'Vivek Menon',  service:'Pedicure',       staff:'Pooja Menon',  duration:50, amount:500,  datetime:'2026-10-07 13:15', rating:4 },
  ],
};

// ============================================================
// UTILITY HELPERS
// ============================================================

/** Get service object by ID */
function getService(id) { return state.services.find(s => s.id === id) || null; }
/** Get staff object by ID */
function getStaff(id)   { return state.staff.find(s => s.id === id) || null; }

/** Format waiting time in minutes */
function formatWait(minutes) {
  if (minutes <= 0) return 'Now';
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60), m = minutes % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}

/** Calculate elapsed minutes since timestamp */
function elapsedMin(ts) { return Math.floor((Date.now() - ts) / 60000); }

/**
 * Queue Wait Time Calculation
 * - Groups customers by status; counts active staff
 * - Distributes waiting customers across available staff slots
 * - Returns estimated wait in minutes for a new customer
 */
function calculateEstimatedWait(newServiceId) {
  const svc = getService(newServiceId);
  if (!svc) return 0;

  // Count available staff (not offline)
  const availableStaff = state.staff.filter(s => s.status === 'available').length;
  const busySlots       = state.staff.filter(s => s.status === 'busy').length;
  const totalActiveSlots = Math.max(availableStaff + busySlots, 1);

  // Customers still needing service (waiting or called)
  const pending = state.queue.filter(q => q.status === 'waiting' || q.status === 'called');
  // Customers currently being served
  const inService = state.queue.filter(q => q.status === 'in-service');

  // Sum remaining time for in-service customers (approximate: service duration - elapsed)
  let busyTime = 0;
  inService.forEach(q => {
    const s = getService(q.serviceId);
    if (s) {
      const elapsed = elapsedMin(q.joinedAt);
      busyTime += Math.max(s.duration - elapsed, 0);
    }
  });

  // Add pending service durations
  let pendingTime = 0;
  pending.forEach(q => {
    const s = getService(q.serviceId);
    if (s) pendingTime += s.duration;
  });

  // Estimated wait = total work remaining / parallel staff capacity
  const totalWork = busyTime + pendingTime;
  const estimatedWait = Math.ceil(totalWork / totalActiveSlots);
  return estimatedWait;
}

/** Generate initials from name */
function initials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

/** Avatar background from name (deterministic color) */
const avatarColors = ['#8b1e19','#1e2026','#a82d27','#4a7c59','#7b5ea7','#2d6a9f','#c49a58','#9e3d3d'];
function avatarColor(name) {
  let hash = 0;
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) & 0xffffffff;
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

/** Escape HTML to prevent XSS */
function esc(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

/** Format a date string nicely */
function fmtDate(str) {
  const d = new Date(str);
  return d.toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });
}

// ============================================================
// TOAST NOTIFICATIONS
// ============================================================
function showToast(title, message = '', type = 'success') {
  const container = document.getElementById('toast-container');
  const icons = {
    success: 'fa-circle-check',
    error:   'fa-circle-xmark',
    info:    'fa-circle-info',
    warning: 'fa-triangle-exclamation',
  };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="fa-solid ${icons[type]} toast-icon"></i>
    <div class="toast-body">
      <div class="toast-title">${esc(title)}</div>
      ${message ? `<div class="toast-msg">${esc(message)}</div>` : ''}
    </div>
    <button class="toast-close" aria-label="Dismiss"><i class="fa-solid fa-xmark"></i></button>
  `;
  container.appendChild(toast);
  toast.querySelector('.toast-close').addEventListener('click', () => dismissToast(toast));
  setTimeout(() => dismissToast(toast), 4500);
}

function dismissToast(toast) {
  toast.classList.add('toast-out');
  toast.addEventListener('animationend', () => toast.remove(), { once: true });
}

// ============================================================
// CONFIRM DIALOG
// ============================================================
let _confirmResolve = null;
function confirmAction(message) {
  return new Promise(resolve => {
    _confirmResolve = resolve;
    document.getElementById('confirm-message').textContent = message;
    openModal('confirm-modal');
  });
}
document.getElementById('confirm-ok-btn').addEventListener('click', () => {
  closeModal('confirm-modal');
  if (_confirmResolve) { _confirmResolve(true); _confirmResolve = null; }
});

// ============================================================
// MODAL MANAGEMENT
// ============================================================
function openModal(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.remove('hidden'); document.body.style.overflow = 'hidden'; }
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.add('hidden'); document.body.style.overflow = ''; }
}

// Close modals on overlay click or [data-close-modal] button
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) {
      const id = overlay.id;
      closeModal(id);
      if (_confirmResolve) { _confirmResolve(false); _confirmResolve = null; }
    }
  });
});
document.querySelectorAll('[data-close-modal]').forEach(btn => {
  btn.addEventListener('click', () => {
    closeModal(btn.dataset.closeModal);
    if (_confirmResolve) { _confirmResolve(false); _confirmResolve = null; }
  });
});

// ============================================================
// NAVIGATION — PAGE ROUTING
// ============================================================
function navigateTo(page) {
  // Hide all sections
  document.querySelectorAll('.page-section').forEach(s => s.classList.add('hidden'));
  // Show target
  const target = document.getElementById(`page-${page}`);
  if (target) target.classList.remove('hidden');

  // Update active nav item
  document.querySelectorAll('.nav-item').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
    a.setAttribute('aria-current', a.dataset.page === page ? 'page' : 'false');
  });

  // Page-specific init
  switch (page) {
    case 'dashboard':  renderDashboard(); break;
    case 'queue':      renderQueuePage(); break;
    case 'customers':  renderCustomers(); break;
    case 'services':   renderServices(); break;
    case 'staff':      renderStaff(); break;
    case 'history':    renderHistory(); break;
    case 'reports':    renderReports(); break;
    case 'display':    renderDisplay(); startDisplayClock(); break;
    case 'settings':   /* static */ break;
  }

  // Close sidebar on mobile after navigation
  closeSidebar();
}

// Sidebar nav items
document.querySelectorAll('.nav-item[data-page]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    navigateTo(a.dataset.page);
  });
});

// Dashboard card links
document.querySelectorAll('[data-page]').forEach(el => {
  if (!el.classList.contains('nav-item') && el.tagName !== 'BUTTON') {
    el.addEventListener('click', e => { e.preventDefault(); navigateTo(el.dataset.page); });
  }
});

// Dropdown nav
document.querySelectorAll('.dropdown-item[data-page]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    navigateTo(a.dataset.page);
    document.getElementById('topnav-profile').classList.remove('open');
  });
});

// ============================================================
// SIDEBAR TOGGLE
// ============================================================
function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sidebar-overlay').classList.add('active');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('active');
}
document.getElementById('hamburger').addEventListener('click', openSidebar);
document.getElementById('sidebar-close').addEventListener('click', closeSidebar);
document.getElementById('sidebar-overlay').addEventListener('click', closeSidebar);

// ============================================================
// LOGIN
// ============================================================
document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-password').value;
  let valid = true;

  // Simple validation
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById('email-error').textContent = 'Please enter a valid email.';
    valid = false;
  } else { document.getElementById('email-error').textContent = ''; }
  if (!pass || pass.length < 3) {
    document.getElementById('password-error').textContent = 'Password is required.';
    valid = false;
  } else { document.getElementById('password-error').textContent = ''; }

  if (!valid) return;

  const btn = document.getElementById('login-btn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Signing in…';

  setTimeout(() => {
    document.getElementById('login-page').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    navigateTo('dashboard');
    addNotification('Login successful', 'Welcome back, Admin!', 'fa-circle-check');
    showToast('Welcome back!', 'You are now logged in.', 'success');
    btn.disabled = false;
    btn.innerHTML = '<span class="btn-text">Sign In</span><i class="fa-solid fa-arrow-right"></i>';
  }, 900);
});

// Toggle password visibility
document.querySelector('.toggle-password').addEventListener('click', function() {
  const inp = document.getElementById('login-password');
  const icon = this.querySelector('i');
  if (inp.type === 'password') {
    inp.type = 'text';
    icon.className = 'fa-solid fa-eye-slash';
  } else {
    inp.type = 'password';
    icon.className = 'fa-solid fa-eye';
  }
});

// Forgot password link
document.getElementById('forgot-link').addEventListener('click', e => {
  e.preventDefault();
  showToast('Password Reset', 'A reset link has been sent to your email.', 'info');
});

// Logout
function logout() {
  document.getElementById('app').classList.add('hidden');
  document.getElementById('login-page').classList.remove('active');
  document.getElementById('login-page').classList.remove('hidden');
  document.getElementById('login-page').style.display = '';
  showToast('Logged out', 'See you again!', 'info');
}
document.getElementById('sidebar-logout').addEventListener('click', logout);
document.getElementById('dropdown-logout').addEventListener('click', e => { e.preventDefault(); logout(); });

// Topnav profile dropdown
document.getElementById('topnav-profile').addEventListener('click', function(e) {
  this.classList.toggle('open');
  e.stopPropagation();
});
document.addEventListener('click', () => {
  document.getElementById('topnav-profile').classList.remove('open');
  if (!document.getElementById('notifications-panel').contains(document.activeElement)) {
    document.getElementById('notifications-panel').classList.add('hidden');
  }
});

// ============================================================
// SALON STATUS TOGGLE
// ============================================================
document.getElementById('salon-status-toggle').addEventListener('click', () => {
  state.salonOpen = !state.salonOpen;
  const dot  = document.getElementById('topnav-status-dot');
  const text = document.getElementById('topnav-status-text');
  if (state.salonOpen) {
    dot.className = 'status-dot open';
    text.textContent = 'Open';
    showToast('Salon Open', 'Salon is now accepting customers.', 'success');
  } else {
    dot.className = 'status-dot closed';
    text.textContent = 'Closed';
    showToast('Salon Closed', 'Salon is now closed.', 'warning');
  }
});

// ============================================================
// NOTIFICATIONS
// ============================================================
function addNotification(title, text, icon = 'fa-bell') {
  state.notifications.unshift({ title, text, icon, time: 'Just now', read: false });
  updateNotifBadge();
  renderNotifications();
}
function updateNotifBadge() {
  const dot = document.getElementById('notif-dot');
  const unread = state.notifications.filter(n => !n.read).length;
  dot.style.display = unread > 0 ? 'block' : 'none';
}
function renderNotifications() {
  const list = document.getElementById('notif-list');
  if (!state.notifications.length) {
    list.innerHTML = '<div style="padding:1.5rem;text-align:center;color:var(--color-text-3);font-size:.85rem;">No notifications</div>';
    return;
  }
  list.innerHTML = state.notifications.slice(0, 10).map(n => `
    <div class="notif-item ${n.read ? '' : 'unread'}">
      <div class="notif-icon"><i class="fa-solid ${n.icon}"></i></div>
      <div class="notif-content">
        <div class="notif-text">${esc(n.title)}</div>
        <div class="notif-time">${esc(n.text)}</div>
      </div>
    </div>
  `).join('');
}
document.getElementById('notifications-btn').addEventListener('click', e => {
  const panel = document.getElementById('notifications-panel');
  panel.classList.toggle('hidden');
  e.stopPropagation();
});
document.getElementById('mark-all-read').addEventListener('click', () => {
  state.notifications.forEach(n => n.read = true);
  updateNotifBadge();
  renderNotifications();
});
// Seed initial notifications
addNotification('Queue updated', 'Q-104 has been called.', 'fa-list-ol');
addNotification('New customer', 'Rohit Verma joined the queue.', 'fa-user-plus');
addNotification('Staff break', 'Kavya Iyer is on break.', 'fa-mug-hot');

// ============================================================
// GLOBAL SEARCH
// ============================================================
document.getElementById('global-search').addEventListener('input', function() {
  const q = this.value.trim().toLowerCase();
  if (!q) return;
  // Auto-navigate to queue if we have matches
  const match = state.queue.find(c => c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q));
  if (match) {
    navigateTo('queue');
    document.getElementById('queue-search').value = q;
    renderQueueTable(q);
  }
});

// ============================================================
// DASHBOARD RENDER
// ============================================================
function renderDashboard() {
  updateDashboardStats();
  renderDashLiveQueue();
  renderDashStaff();
  renderDashCharts();
}

function updateDashboardStats() {
  const waiting   = state.queue.filter(q => q.status === 'waiting').length;
  const serving   = state.queue.filter(q => q.status === 'in-service').length;
  const available = state.staff.filter(s => s.status === 'available').length;
  const completed = state.history.length + state.queue.filter(q => q.status === 'completed').length;

  document.getElementById('stat-waiting').textContent   = waiting;
  document.getElementById('stat-serving').textContent   = serving;
  document.getElementById('stat-available').textContent = available;
  document.getElementById('stat-completed').textContent = completed;
  document.getElementById('stat-total').textContent     = 128 + state.queue.filter(q => q.status === 'completed').length;

  // Update waiting badge in sidebar
  document.getElementById('waiting-badge').textContent = waiting + state.queue.filter(q=>q.status==='called').length;
}

function renderDashLiveQueue() {
  const list = document.getElementById('dash-live-queue');
  const active = state.queue.filter(q => q.status === 'waiting' || q.status === 'called' || q.status === 'in-service').slice(0, 5);
  if (!active.length) { list.innerHTML = '<p style="text-align:center;color:var(--color-text-3);padding:1rem 0;font-size:.85rem;">No active customers</p>'; return; }
  list.innerHTML = active.map(q => {
    const svc  = getService(q.serviceId);
    const wait = elapsedMin(q.joinedAt);
    return `
      <div class="live-queue-item">
        <span class="lq-num">${esc(q.id)}</span>
        <div class="lq-info">
          <div class="lq-name">${esc(q.name)}</div>
          <div class="lq-service">${svc ? esc(svc.name) : '—'}</div>
        </div>
        <span class="lq-wait">${formatWait(wait)}</span>
        ${statusBadge(q.status)}
      </div>`;
  }).join('');
}

function renderDashStaff() {
  const list = document.getElementById('dash-staff-list');
  const shown = state.staff.slice(0, 6);
  list.innerHTML = shown.map(s => {
    const abbr = s.status === 'available' ? 'av' : s.status === 'busy' ? 'bu' : s.status === 'break' ? 'br' : 'of';
    const pillClass = `pill-${s.status === 'break' ? 'break' : s.status}`;
    const pillText = s.status === 'break' ? 'On Break' : s.status.charAt(0).toUpperCase() + s.status.slice(1);
    return `
      <div class="staff-status-item">
        <div class="staff-avatar ${abbr}" style="background:${s.color}">${initials(s.name)}</div>
        <div class="staff-item-info">
          <div class="staff-item-name">${esc(s.name)}</div>
          <div class="staff-item-task">${s.currentCustomer ? esc(s.currentCustomer) : s.role}</div>
        </div>
        <span class="staff-status-pill ${pillClass}">${pillText}</span>
      </div>`;
  }).join('');
}

function renderDashCharts() {
  // Service mix doughnut
  destroyChart('dash-service-chart');
  const svcCounts = {};
  state.history.forEach(h => { svcCounts[h.service] = (svcCounts[h.service]||0) + 1; });
  state.queue.filter(q=>q.status==='completed').forEach(q => {
    const s = getService(q.serviceId);
    if (s) svcCounts[s.name] = (svcCounts[s.name]||0) + 1;
  });
  const svcLabels = Object.keys(svcCounts);
  const svcData   = Object.values(svcCounts);
  const svcColors = ['#8b1e19','#1e2026','#a82d27','#4a7c59','#7b5ea7','#2d6a9f','#c49a58','#9e3d3d','#68110d'];

  state.charts['dash-service-chart'] = new Chart(document.getElementById('dash-service-chart'), {
    type: 'doughnut',
    data: { labels: svcLabels, datasets: [{ data: svcData, backgroundColor: svcColors, borderWidth: 0, hoverOffset: 6 }] },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'right', labels: { font: { family: 'Inter', size: 11 }, boxWidth: 12, padding: 10 } } },
      cutout: '65%',
    }
  });

  // Hourly trend line
  destroyChart('dash-trend-chart');
  const hours = ['9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm'];
  const data  = [5,12,18,22,16,20,25,19,14,8];
  state.charts['dash-trend-chart'] = new Chart(document.getElementById('dash-trend-chart'), {
    type: 'line',
    data: {
      labels: hours,
      datasets: [{
        data, fill: true,
        backgroundColor: 'rgba(139,30,25,.08)',
        borderColor: '#8b1e19', borderWidth: 2.5,
        tension: 0.4, pointRadius: 3, pointBackgroundColor: '#8b1e19', pointBorderColor: '#fff', pointBorderWidth: 2,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { font: { family:'Inter', size:10 }, color:'#8d929f' } },
        y: { grid: { color:'#ede4d8' }, ticks: { font: { family:'Inter', size:10 }, color:'#8d929f' }, beginAtZero: true }
      }
    }
  });
}

function destroyChart(id) {
  if (state.charts[id]) { state.charts[id].destroy(); delete state.charts[id]; }
}

// ============================================================
// QUEUE PAGE — Render
// ============================================================
function renderQueuePage() {
  renderQueueFilterCounts();
  renderQueueTable();
  renderQueueMobileCards();
}

function renderQueueFilterCounts() {
  const counts = { all: state.queue.length };
  ['waiting','called','in-service','completed','cancelled'].forEach(s => {
    counts[s] = state.queue.filter(q => q.status === s).length;
  });
  document.getElementById('count-all').textContent        = counts.all;
  document.getElementById('count-waiting').textContent    = counts.waiting;
  document.getElementById('count-called').textContent     = counts.called;
  document.getElementById('count-inservice').textContent  = counts['in-service'];
  document.getElementById('count-completed').textContent  = counts.completed;
  document.getElementById('count-cancelled').textContent  = counts.cancelled;
}

function getFilteredSortedQueue(search = '', filter = state.currentFilter, sort = state.currentSort) {
  let q = [...state.queue];
  if (filter !== 'all') q = q.filter(c => c.status === filter);
  if (search) {
    const s = search.toLowerCase();
    q = q.filter(c => c.name.toLowerCase().includes(s) || c.id.toLowerCase().includes(s) || c.phone.includes(s));
  }
  const priorityOrder = { vip: 0, priority: 1, normal: 2 };
  switch (sort) {
    case 'time-asc':  q.sort((a,b) => a.joinedAt - b.joinedAt); break;
    case 'time-desc': q.sort((a,b) => b.joinedAt - a.joinedAt); break;
    case 'priority':  q.sort((a,b) => (priorityOrder[a.priority]||2) - (priorityOrder[b.priority]||2)); break;
    case 'wait-asc':  q.sort((a,b) => a.joinedAt - b.joinedAt); break;
  }
  return q;
}

function renderQueueTable(search = document.getElementById('queue-search')?.value || '') {
  const tbody = document.getElementById('queue-tbody');
  const empty = document.getElementById('queue-empty');
  const rows = getFilteredSortedQueue(search);

  if (!rows.length) {
    tbody.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');

  tbody.innerHTML = rows.map(q => {
    const svc   = getService(q.serviceId);
    const staff = getStaff(q.staffId);
    const wait  = elapsedMin(q.joinedAt);
    return `
      <tr data-id="${q.id}">
        <td class="td-qnum">${esc(q.id)}</td>
        <td class="td-customer">
          <div class="cust-name">${esc(q.name)}</div>
          <div class="cust-phone">${esc(q.phone)}</div>
        </td>
        <td class="td-service">${svc ? esc(svc.name) : '—'}</td>
        <td class="td-duration">${svc ? svc.duration + ' min' : '—'}</td>
        <td>${staff ? esc(staff.name) : '<span style="color:var(--color-text-3)">Unassigned</span>'}</td>
        <td class="td-wait">${formatWait(wait)}</td>
        <td>${priorityBadge(q.priority)}</td>
        <td>${statusBadge(q.status)}</td>
        <td class="td-actions">
          ${actionButtons(q)}
        </td>
      </tr>`;
  }).join('');
}

function renderQueueMobileCards(search = document.getElementById('queue-search')?.value || '') {
  const container = document.getElementById('queue-cards-mobile');
  const rows = getFilteredSortedQueue(search);
  if (!rows.length) { container.innerHTML = ''; return; }
  container.innerHTML = rows.map(q => {
    const svc   = getService(q.serviceId);
    const staff = getStaff(q.staffId);
    const wait  = elapsedMin(q.joinedAt);
    return `
      <div class="queue-card-mobile" data-id="${q.id}">
        <div class="qcm-header">
          <span class="qcm-num">${esc(q.id)}</span>
          ${statusBadge(q.status)}
        </div>
        <div class="qcm-body">
          <div class="qcm-field"><label>Customer</label><span>${esc(q.name)}</span></div>
          <div class="qcm-field"><label>Service</label><span>${svc ? esc(svc.name) : '—'}</span></div>
          <div class="qcm-field"><label>Staff</label><span>${staff ? esc(staff.name) : 'Unassigned'}</span></div>
          <div class="qcm-field"><label>Wait</label><span>${formatWait(wait)}</span></div>
          <div class="qcm-field"><label>Priority</label><span>${priorityBadge(q.priority)}</span></div>
          <div class="qcm-field"><label>Duration</label><span>${svc ? svc.duration+' min' : '—'}</span></div>
        </div>
        <div class="qcm-actions">${actionButtons(q)}</div>
      </div>`;
  }).join('');
}

function statusBadge(status) {
  const map = {
    'waiting':    ['badge-waiting',    '<i class="fa-solid fa-hourglass-half"></i> Waiting'],
    'called':     ['badge-called',     '<i class="fa-solid fa-bullhorn"></i> Called'],
    'in-service': ['badge-in-service', '<i class="fa-solid fa-scissors"></i> In Service'],
    'completed':  ['badge-completed',  '<i class="fa-solid fa-circle-check"></i> Completed'],
    'cancelled':  ['badge-cancelled',  '<i class="fa-solid fa-circle-xmark"></i> Cancelled'],
  };
  const [cls, html] = map[status] || ['','—'];
  return `<span class="status-badge ${cls}">${html}</span>`;
}

function priorityBadge(priority) {
  const map = {
    normal:   ['priority-normal',   '● Normal'],
    priority: ['priority-priority', '▲ Priority'],
    vip:      ['priority-vip',      '★ VIP'],
  };
  const [cls, text] = map[priority] || ['priority-normal', 'Normal'];
  return `<span class="priority-badge ${cls}">${text}</span>`;
}

function actionButtons(q) {
  const btns = [];
  if (q.status === 'waiting') {
    btns.push(`<button class="btn-icon btn-call" title="Call Customer" data-action="call" data-id="${q.id}"><i class="fa-solid fa-bullhorn"></i></button>`);
    btns.push(`<button class="btn-icon btn-assign" title="Assign Staff" data-action="assign" data-id="${q.id}"><i class="fa-solid fa-user-tie"></i></button>`);
    btns.push(`<button class="btn-icon btn-cancel" title="Cancel" data-action="cancel" data-id="${q.id}"><i class="fa-solid fa-xmark"></i></button>`);
  }
  if (q.status === 'called') {
    btns.push(`<button class="btn-icon btn-start" title="Start Service" data-action="start" data-id="${q.id}"><i class="fa-solid fa-play"></i></button>`);
    btns.push(`<button class="btn-icon btn-cancel" title="Cancel" data-action="cancel" data-id="${q.id}"><i class="fa-solid fa-xmark"></i></button>`);
  }
  if (q.status === 'in-service') {
    btns.push(`<button class="btn-icon btn-complete" title="Complete" data-action="complete" data-id="${q.id}"><i class="fa-solid fa-circle-check"></i></button>`);
  }
  if (q.status !== 'completed' && q.status !== 'cancelled') {
    btns.push(`<button class="btn-icon btn-delete" title="Remove" data-action="remove" data-id="${q.id}"><i class="fa-solid fa-trash"></i></button>`);
  }
  return btns.join('');
}

// Queue action delegation
['queue-tbody', 'queue-cards-mobile'].forEach(containerId => {
  const el = document.getElementById(containerId);
  if (el) el.addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    handleQueueAction(btn.dataset.action, btn.dataset.id);
  });
});

async function handleQueueAction(action, queueId) {
  const entry = state.queue.find(q => q.id === queueId);
  if (!entry) return;

  switch (action) {
    case 'call':
      entry.status = 'called';
      addNotification('Customer Called', `${entry.name} (${entry.id}) has been called.`, 'fa-bullhorn');
      showToast('Customer Called', `${entry.name} — ${entry.id}`, 'info');
      break;
    case 'start':
      entry.status = 'in-service';
      // Auto-mark first available staff as busy
      if (!entry.staffId) {
        const avail = state.staff.find(s => s.status === 'available');
        if (avail) { avail.status = 'busy'; avail.currentCustomer = entry.id; entry.staffId = avail.id; }
      } else {
        const s = getStaff(entry.staffId);
        if (s) { s.status = 'busy'; s.currentCustomer = entry.id; }
      }
      showToast('Service Started', `${entry.name} — ${entry.id}`, 'success');
      break;
    case 'complete': {
      const confirmed = await confirmAction(`Mark ${entry.name} (${entry.id}) as completed?`);
      if (!confirmed) return;
      entry.status = 'completed';
      // Free up staff
      if (entry.staffId) {
        const s = getStaff(entry.staffId);
        if (s) { s.status = 'available'; s.currentCustomer = null; s.servedToday++; }
      }
      // Add to history
      const svc = getService(entry.serviceId);
      state.history.unshift({
        id: `H-${Date.now()}`,
        customer: entry.name,
        service:  svc ? svc.name : 'Unknown',
        staff:    entry.staffId ? (getStaff(entry.staffId)?.name || '—') : '—',
        duration: svc ? svc.duration : 0,
        amount:   svc ? svc.price : 0,
        datetime: new Date().toLocaleString('en-IN', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' }),
        rating:   Math.floor(Math.random() * 2) + 4,
      });
      showToast('Service Completed', `${entry.name} — ${entry.id}`, 'success');
      addNotification('Service Completed', `${entry.name} completed ${svc?.name || ''}.`, 'fa-circle-check');
      break;
    }
    case 'cancel': {
      const confirmed = await confirmAction(`Cancel ${entry.name} (${entry.id})?`);
      if (!confirmed) return;
      entry.status = 'cancelled';
      if (entry.staffId) {
        const s = getStaff(entry.staffId);
        if (s && s.currentCustomer === entry.id) { s.status = 'available'; s.currentCustomer = null; }
      }
      showToast('Customer Cancelled', `${entry.name} removed from queue.`, 'warning');
      break;
    }
    case 'remove': {
      const confirmed = await confirmAction(`Remove ${entry.name} (${entry.id}) from the queue?`);
      if (!confirmed) return;
      state.queue.splice(state.queue.indexOf(entry), 1);
      showToast('Removed', `${entry.name} removed.`, 'warning');
      break;
    }
    case 'assign':
      document.getElementById('assign-queue-id').value = queueId;
      renderAssignStaffList(queueId);
      openModal('assign-staff-modal');
      return;
  }

  // Re-render
  renderQueuePage();
  updateDashboardStats();
  if (!document.getElementById('page-dashboard').classList.contains('hidden')) renderDashLiveQueue();
}

// Queue search & sort
document.getElementById('queue-search').addEventListener('input', function() {
  renderQueueTable(this.value.trim());
  renderQueueMobileCards(this.value.trim());
});
document.getElementById('queue-sort').addEventListener('change', function() {
  state.currentSort = this.value;
  renderQueueTable();
  renderQueueMobileCards();
});

// Filter tabs
document.getElementById('queue-filter-tabs').addEventListener('click', e => {
  const tab = e.target.closest('.filter-tab');
  if (!tab) return;
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  state.currentFilter = tab.dataset.filter;
  renderQueueTable();
  renderQueueMobileCards();
});

// Empty state button
document.getElementById('add-customer-empty').addEventListener('click', () => openAddCustomerModal());

// ============================================================
// ADD CUSTOMER MODAL
// ============================================================
function openAddCustomerModal() {
  // Populate services dropdown
  const svcSel = document.getElementById('c-service');
  svcSel.innerHTML = state.services.filter(s=>s.status==='active').map(s =>
    `<option value="${s.id}">${esc(s.name)} (${s.duration} min)</option>`
  ).join('');

  // Populate staff dropdown
  const staffSel = document.getElementById('c-staff');
  const available = state.staff.filter(s => s.status === 'available' || s.status === 'break');
  staffSel.innerHTML = `<option value="">Any available</option>` +
    available.map(s => `<option value="${s.id}">${esc(s.name)} — ${esc(s.role)}</option>`).join('');

  // Update wait estimate on service change
  updateEstimatedWait();
  document.getElementById('c-service').addEventListener('change', updateEstimatedWait);
  document.getElementById('add-customer-form').reset();
  // Re-populate after reset
  document.getElementById('c-service').innerHTML = state.services.filter(s=>s.status==='active').map(s =>
    `<option value="${s.id}">${esc(s.name)} (${s.duration} min)</option>`
  ).join('');
  updateEstimatedWait();

  openModal('add-customer-modal');
}

function updateEstimatedWait() {
  const svcId = parseInt(document.getElementById('c-service').value);
  const wait  = calculateEstimatedWait(svcId);
  document.getElementById('est-wait-val').textContent = formatWait(wait);
}

// Hook all "Add Customer" buttons
['add-customer-btn-dash','add-customer-btn-queue','add-customer-btn-cust','add-customer-empty'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('click', openAddCustomerModal);
});

// Add Customer Form Submit
document.getElementById('add-customer-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name    = document.getElementById('c-name').value.trim();
  const phone   = document.getElementById('c-phone').value.trim();
  const svcId   = parseInt(document.getElementById('c-service').value);
  const staffId = parseInt(document.getElementById('c-staff').value) || null;
  const priority= document.getElementById('c-priority').value;
  const notes   = document.getElementById('c-notes').value.trim();

  if (!name || !phone || !svcId) {
    showToast('Missing Fields', 'Please fill in all required fields.', 'error'); return;
  }

  const qNum = `Q-${state.queueCounter++}`;
  state.queue.push({
    id: qNum, name, phone, serviceId: svcId,
    staffId: staffId || null, priority, status: 'waiting',
    joinedAt: Date.now(), notes,
  });

  // Add to customers list if new
  if (!state.customers.find(c => c.phone === phone)) {
    const svc = getService(svcId);
    state.customers.unshift({
      id: state.customers.length + 1, name, phone,
      lastVisit: new Date().toISOString().slice(0, 10),
      visits: 1, favService: svc?.name || '', totalSpent: 0,
    });
  }

  closeModal('add-customer-modal');
  showToast('Customer Added', `${name} joined queue as ${qNum}`, 'success');
  addNotification('New Customer', `${name} added to queue as ${qNum}.`, 'fa-user-plus');

  // Refresh current page
  if (!document.getElementById('page-queue').classList.contains('hidden')) renderQueuePage();
  if (!document.getElementById('page-dashboard').classList.contains('hidden')) renderDashboard();
  if (!document.getElementById('page-customers').classList.contains('hidden')) renderCustomers();
  updateDashboardStats();
});

// ============================================================
// ASSIGN STAFF
// ============================================================
function renderAssignStaffList(queueId) {
  const entry = state.queue.find(q => q.id === queueId);
  const list  = document.getElementById('assign-staff-list');
  const avail = state.staff.filter(s => s.status !== 'offline');
  list.innerHTML = avail.map(s => `
    <div class="assign-staff-item" data-staff-id="${s.id}">
      <div class="staff-avatar-sm-color" style="background:${s.color}">${initials(s.name)}</div>
      <div>
        <div class="assign-name">${esc(s.name)}</div>
        <div class="assign-status">${esc(s.role)} · ${esc(s.specialization)}</div>
      </div>
      <span class="assign-badge ${s.status==='available'?'badge-completed':'badge-'+s.status}" style="font-size:.72rem;padding:.2rem .55rem;border-radius:9999px">
        ${s.status==='available'?'Free':s.status==='busy'?'Busy':'Break'}
      </span>
    </div>
  `).join('');

  list.querySelectorAll('.assign-staff-item').forEach(item => {
    item.addEventListener('click', () => {
      const staffId = parseInt(item.dataset.staffId);
      if (entry) entry.staffId = staffId;
      closeModal('assign-staff-modal');
      showToast('Staff Assigned', `${getStaff(staffId)?.name} assigned to ${queueId}.`, 'success');
      renderQueuePage();
    });
  });
}

// ============================================================
// CUSTOMERS PAGE
// ============================================================
function renderCustomers(search = '') {
  const tbody = document.getElementById('customer-tbody');
  let data = [...state.customers];
  if (search) {
    const s = search.toLowerCase();
    data = data.filter(c => c.name.toLowerCase().includes(s) || c.phone.includes(s));
  }
  tbody.innerHTML = data.map(c => `
    <tr>
      <td>
        <span class="cust-avatar" style="background:${avatarColor(c.name)};color:#fff">${initials(c.name)}</span>
        <strong>${esc(c.name)}</strong>
      </td>
      <td>${esc(c.phone)}</td>
      <td>${fmtDate(c.lastVisit)}</td>
      <td><strong>${c.visits}</strong></td>
      <td>${esc(c.favService)}</td>
      <td>&#8377;${c.totalSpent.toLocaleString('en-IN')}</td>
      <td>
        <button class="btn-icon btn-edit" title="Add to queue" onclick="openAddCustomerModal()"><i class="fa-solid fa-plus"></i></button>
        <button class="btn-icon btn-delete" title="Delete" onclick="deleteCustomer(${c.id})"><i class="fa-solid fa-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

window.deleteCustomer = async function(id) {
  const confirmed = await confirmAction('Delete this customer record?');
  if (!confirmed) return;
  state.customers = state.customers.filter(c => c.id !== id);
  renderCustomers();
  showToast('Deleted', 'Customer record removed.', 'warning');
};

document.getElementById('customer-search').addEventListener('input', function() {
  renderCustomers(this.value.trim());
});

// ============================================================
// SERVICES PAGE
// ============================================================
const categoryIcons = { Hair: 'fa-scissors', Skin: 'fa-face-smile-wink', Nail: 'fa-hand', Wellness: 'fa-spa', Makeup: 'fa-wand-magic-sparkles' };

function renderServices() {
  const grid = document.getElementById('services-grid');
  grid.innerHTML = state.services.map(s => `
    <div class="service-card">
      <div class="service-card-top">
        <div class="service-icon"><i class="fa-solid ${categoryIcons[s.category] || 'fa-star'}"></i></div>
        <span class="service-status ${s.status}">${s.status.charAt(0).toUpperCase()+s.status.slice(1)}</span>
      </div>
      <div class="service-name">${esc(s.name)}</div>
      <div class="service-cat">${esc(s.category)}</div>
      <div class="service-meta">
        <div class="service-meta-item"><i class="fa-solid fa-clock"></i>${s.duration} min</div>
        <div class="service-meta-item"><i class="fa-solid fa-indian-rupee-sign"></i>${s.price.toLocaleString('en-IN')}</div>
      </div>
      <div class="service-actions">
        <button class="btn-icon btn-edit" title="Edit" data-edit-svc="${s.id}"><i class="fa-solid fa-pen"></i></button>
        <button class="btn-icon btn-delete" title="Delete" data-del-svc="${s.id}"><i class="fa-solid fa-trash"></i></button>
        <button class="btn-icon" title="Toggle status" data-toggle-svc="${s.id}">
          <i class="fa-solid ${s.status==='active'?'fa-toggle-on':'fa-toggle-off'}"></i>
        </button>
      </div>
    </div>
  `).join('');

  // Edit
  grid.querySelectorAll('[data-edit-svc]').forEach(btn => {
    btn.addEventListener('click', () => openEditService(parseInt(btn.dataset.editSvc)));
  });
  // Delete
  grid.querySelectorAll('[data-del-svc]').forEach(btn => {
    btn.addEventListener('click', () => deleteService(parseInt(btn.dataset.delSvc)));
  });
  // Toggle
  grid.querySelectorAll('[data-toggle-svc]').forEach(btn => {
    btn.addEventListener('click', () => {
      const svc = state.services.find(s => s.id === parseInt(btn.dataset.toggleSvc));
      if (svc) { svc.status = svc.status === 'active' ? 'inactive' : 'active'; renderServices(); }
    });
  });
}

document.getElementById('add-service-btn').addEventListener('click', () => {
  document.getElementById('s-edit-id').value = '';
  document.getElementById('service-modal-title-text').textContent = 'Add Service';
  document.getElementById('add-service-form').reset();
  openModal('add-service-modal');
});

function openEditService(id) {
  const svc = state.services.find(s => s.id === id);
  if (!svc) return;
  document.getElementById('s-edit-id').value = id;
  document.getElementById('service-modal-title-text').textContent = 'Edit Service';
  document.getElementById('s-name').value     = svc.name;
  document.getElementById('s-category').value = svc.category;
  document.getElementById('s-duration').value = svc.duration;
  document.getElementById('s-price').value    = svc.price;
  document.getElementById('s-status').value   = svc.status;
  openModal('add-service-modal');
}

document.getElementById('add-service-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const editId = document.getElementById('s-edit-id').value;
  const obj = {
    name:     document.getElementById('s-name').value.trim(),
    category: document.getElementById('s-category').value,
    duration: parseInt(document.getElementById('s-duration').value),
    price:    parseInt(document.getElementById('s-price').value),
    status:   document.getElementById('s-status').value,
  };
  if (!obj.name || !obj.duration || !obj.price) { showToast('Missing fields', 'Fill in all required fields.', 'error'); return; }

  if (editId) {
    const svc = state.services.find(s => s.id === parseInt(editId));
    if (svc) Object.assign(svc, obj);
    showToast('Service Updated', obj.name, 'success');
  } else {
    state.services.push({ id: Date.now(), ...obj });
    showToast('Service Added', obj.name, 'success');
  }
  closeModal('add-service-modal');
  renderServices();
});

async function deleteService(id) {
  const confirmed = await confirmAction('Delete this service? This cannot be undone.');
  if (!confirmed) return;
  state.services = state.services.filter(s => s.id !== id);
  renderServices();
  showToast('Deleted', 'Service removed.', 'warning');
}

// ============================================================
// STAFF PAGE
// ============================================================
function renderStaff() {
  const grid = document.getElementById('staff-grid');
  grid.innerHTML = state.staff.map(s => {
    const ringClass = { available:'ring-available', busy:'ring-busy', break:'ring-break', offline:'ring-offline' }[s.status] || 'ring-offline';
    const pillClass = { available:'pill-available', busy:'pill-busy', break:'pill-break', offline:'pill-offline' }[s.status] || 'pill-offline';
    const pillText  = { available:'Available', busy:'Busy', break:'On Break', offline:'Offline' }[s.status] || 'Offline';
    const workload  = Math.min(Math.round((s.servedToday / 20) * 100), 100);
    const wClass    = workload < 40 ? 'low' : workload < 70 ? 'mid' : 'high';
    return `
      <div class="staff-card">
        <div class="staff-card-header">
          <div class="staff-avatar-lg" style="background:${s.color}">
            ${initials(s.name)}
            <span class="status-ring ${ringClass}"></span>
          </div>
          <div class="staff-card-info">
            <div class="staff-card-name">${esc(s.name)}</div>
            <div class="staff-card-role">${esc(s.role)}</div>
            <span class="staff-status-pill ${pillClass}">${pillText}</span>
          </div>
        </div>
        <div class="staff-card-body">
          <div class="staff-meta-row"><i class="fa-solid fa-star"></i><span>${esc(s.specialization)}</span></div>
          <div class="staff-meta-row"><i class="fa-solid fa-scissors"></i><strong>${s.servedToday}</strong>&nbsp;customers served today</div>
          ${s.currentCustomer ? `<div class="staff-meta-row"><i class="fa-solid fa-user"></i>Currently: <strong>${esc(s.currentCustomer)}</strong></div>` : ''}
        </div>
        <div class="workload-bar">
          <div class="workload-label"><span>Workload</span><span>${workload}%</span></div>
          <div class="workload-track"><div class="workload-fill ${wClass}" style="width:${workload}%"></div></div>
        </div>
        <div class="staff-card-footer" style="margin-top:.85rem">
          <button class="btn-icon btn-edit" title="Edit" data-edit-staff="${s.id}"><i class="fa-solid fa-pen"></i></button>
          <button class="btn-icon btn-delete" title="Delete" data-del-staff="${s.id}"><i class="fa-solid fa-trash"></i></button>
          <select class="select-control" style="flex:1;font-size:.78rem;padding:.4rem .6rem" data-status-staff="${s.id}">
            <option value="available" ${s.status==='available'?'selected':''}>Available</option>
            <option value="busy"      ${s.status==='busy'     ?'selected':''}>Busy</option>
            <option value="break"     ${s.status==='break'    ?'selected':''}>On Break</option>
            <option value="offline"   ${s.status==='offline'  ?'selected':''}>Offline</option>
          </select>
        </div>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('[data-edit-staff]').forEach(btn => {
    btn.addEventListener('click', () => openEditStaff(parseInt(btn.dataset.editStaff)));
  });
  grid.querySelectorAll('[data-del-staff]').forEach(btn => {
    btn.addEventListener('click', () => deleteStaff(parseInt(btn.dataset.delStaff)));
  });
  grid.querySelectorAll('[data-status-staff]').forEach(sel => {
    sel.addEventListener('change', function() {
      const staff = state.staff.find(s => s.id === parseInt(this.dataset.statusStaff));
      if (staff) { staff.status = this.value; showToast('Status Updated', `${staff.name} is now ${this.value}.`, 'info'); renderStaff(); }
    });
  });
}

document.getElementById('add-staff-btn').addEventListener('click', () => {
  document.getElementById('st-edit-id').value = '';
  document.getElementById('staff-modal-title-text').textContent = 'Add Staff Member';
  document.getElementById('add-staff-form').reset();
  openModal('add-staff-modal');
});

function openEditStaff(id) {
  const s = state.staff.find(m => m.id === id);
  if (!s) return;
  document.getElementById('st-edit-id').value         = id;
  document.getElementById('staff-modal-title-text').textContent = 'Edit Staff Member';
  document.getElementById('st-name').value            = s.name;
  document.getElementById('st-role').value            = s.role;
  document.getElementById('st-specialization').value  = s.specialization;
  document.getElementById('st-status').value          = s.status;
  openModal('add-staff-modal');
}

document.getElementById('add-staff-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const editId = document.getElementById('st-edit-id').value;
  const obj = {
    name:           document.getElementById('st-name').value.trim(),
    role:           document.getElementById('st-role').value,
    specialization: document.getElementById('st-specialization').value.trim(),
    status:         document.getElementById('st-status').value,
  };
  if (!obj.name) { showToast('Missing fields', 'Name is required.', 'error'); return; }

  if (editId) {
    const s = state.staff.find(m => m.id === parseInt(editId));
    if (s) Object.assign(s, obj);
    showToast('Staff Updated', obj.name, 'success');
  } else {
    state.staff.push({ id: Date.now(), ...obj, servedToday: 0, currentCustomer: null, color: avatarColor(obj.name) });
    showToast('Staff Added', obj.name, 'success');
  }
  closeModal('add-staff-modal');
  renderStaff();
});

async function deleteStaff(id) {
  const confirmed = await confirmAction('Delete this staff member?');
  if (!confirmed) return;
  state.staff = state.staff.filter(s => s.id !== id);
  renderStaff();
  showToast('Deleted', 'Staff member removed.', 'warning');
}

// ============================================================
// SERVICE HISTORY
// ============================================================
function renderHistory() {
  const tbody = document.getElementById('history-tbody');
  tbody.innerHTML = state.history.map(h => `
    <tr>
      <td style="font-weight:700;color:var(--color-primary)">${esc(h.id)}</td>
      <td>${esc(h.customer)}</td>
      <td>${esc(h.service)}</td>
      <td>${esc(h.staff)}</td>
      <td>${h.duration} min</td>
      <td>&#8377;${h.amount.toLocaleString('en-IN')}</td>
      <td>${esc(h.datetime)}</td>
      <td><span class="rating-stars">${'★'.repeat(h.rating)}${'☆'.repeat(5-h.rating)}</span></td>
    </tr>
  `).join('');
}

// ============================================================
// REPORTS PAGE — Comprehensive Analytics & Multi-Range Support
// ============================================================
let _currentReportRange = 'day';

function renderReports(range = _currentReportRange) {
  _currentReportRange = range;
  renderReportStats(range);
  renderStaffPerformance(range);
  renderReportCharts(range);
}

function renderReportStats(range) {
  const servedEl  = document.getElementById('rep-stat-served');
  const waitEl    = document.getElementById('rep-stat-wait');
  const serviceEl = document.getElementById('rep-stat-service');
  const popularEl = document.getElementById('rep-stat-popular');
  const revenueEl = document.getElementById('rep-stat-revenue');
  const ratingEl  = document.getElementById('rep-stat-rating');
  const revLblEl  = document.getElementById('rep-revenue-label');
  const trendTitleEl = document.getElementById('rep-trend-title');

  if (range === 'day') {
    if (servedEl) servedEl.textContent = '128';
    if (waitEl) waitEl.textContent = '16 min';
    if (serviceEl) serviceEl.textContent = '38 min';
    if (popularEl) popularEl.textContent = 'Haircut (42)';
    if (revenueEl) revenueEl.innerHTML = '&#8377;14,850';
    if (ratingEl) ratingEl.textContent = '4.9/5';
    if (revLblEl) revLblEl.textContent = 'Revenue Today';
    if (trendTitleEl) trendTitleEl.textContent = "Today's Hourly Customer Flow";
  } else if (range === 'week') {
    if (servedEl) servedEl.textContent = '814';
    if (waitEl) waitEl.textContent = '18 min';
    if (serviceEl) serviceEl.textContent = '42 min';
    if (popularEl) popularEl.textContent = 'Hair Coloring';
    if (revenueEl) revenueEl.innerHTML = '&#8377;96,400';
    if (ratingEl) ratingEl.textContent = '4.8/5';
    if (revLblEl) revLblEl.textContent = 'Revenue This Week';
    if (trendTitleEl) trendTitleEl.textContent = 'Daily Customer Trend (This Week)';
  } else if (range === 'month') {
    if (servedEl) servedEl.textContent = '3,420';
    if (waitEl) waitEl.textContent = '19 min';
    if (serviceEl) serviceEl.textContent = '44 min';
    if (popularEl) popularEl.textContent = 'Bridal & Haircut';
    if (revenueEl) revenueEl.innerHTML = '&#8377;4,18,500';
    if (ratingEl) ratingEl.textContent = '4.9/5';
    if (revLblEl) revLblEl.textContent = 'Revenue This Month';
    if (trendTitleEl) trendTitleEl.textContent = 'Weekly Volume Trend (This Month)';
  }
}

function renderStaffPerformance(range = 'day') {
  const list = document.getElementById('staff-perf-list');
  if (!list) return;

  const multiplier = range === 'week' ? 6 : range === 'month' ? 24 : 1;
  const sorted = [...state.staff]
    .map(s => ({ ...s, rangeServed: s.servedToday * multiplier + (range !== 'day' ? (s.id * 3) : 0) }))
    .sort((a,b) => b.rangeServed - a.rangeServed)
    .slice(0, 6);

  const max = sorted[0]?.rangeServed || 1;
  list.innerHTML = sorted.map(s => `
    <div class="perf-item">
      <div class="perf-name" title="${esc(s.name)}">${esc(s.name.split(' ')[0])}</div>
      <div class="perf-bar-track">
        <div class="perf-bar-fill" style="width:${Math.round((s.rangeServed/max)*100)}%;background:${s.color || 'var(--color-primary)'}"></div>
      </div>
      <div class="perf-count">${s.rangeServed}</div>
    </div>
  `).join('');
}

function renderReportCharts(range = 'day') {
  // 1. Trend Chart
  destroyChart('weekly-trend-chart');
  const trendCanvas = document.getElementById('weekly-trend-chart');
  if (trendCanvas) {
    let labels, data, chartLabel;
    if (range === 'day') {
      labels = ['9 AM', '11 AM', '1 PM', '3 PM', '5 PM', '7 PM'];
      data   = [14, 28, 22, 35, 22, 7];
      chartLabel = 'Customers Today';
    } else if (range === 'week') {
      labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      data   = [98, 112, 128, 95, 145, 162, 74];
      chartLabel = 'Daily Customers';
    } else {
      labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
      data   = [820, 890, 940, 770];
      chartLabel = 'Weekly Customers';
    }

    state.charts['weekly-trend-chart'] = new Chart(trendCanvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: chartLabel,
          data,
          backgroundColor: 'rgba(139,30,25,0.85)',
          hoverBackgroundColor: '#8b1e19',
          borderRadius: 6,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { family:'Inter', size:11 }, color:'#8d929f' } },
          y: { grid: { color:'#ede4d8' }, ticks: { font: { family:'Inter', size:11 }, color:'#8d929f' }, beginAtZero: true }
        }
      }
    });
  }

  // 2. Service Popularity
  destroyChart('service-popularity-chart');
  const popCanvas = document.getElementById('service-popularity-chart');
  if (popCanvas) {
    const svcCounts = {};
    state.history.forEach(h => { svcCounts[h.service] = (svcCounts[h.service]||0) + 1; });
    state.services.forEach(s => { if (!svcCounts[s.name]) svcCounts[s.name] = Math.floor(Math.random()*15)+5; });

    const mult = range === 'week' ? 5 : range === 'month' ? 20 : 1;
    const labels = Object.keys(svcCounts);
    const vals   = Object.values(svcCounts).map(v => v * mult);
    const popColors = ['#8b1e19','#a82d27','#1e2026','#4a7c59','#7b5ea7','#2d6a9f','#c49a58','#9e3d3d','#68110d'];

    state.charts['service-popularity-chart'] = new Chart(popCanvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Count',
          data: vals,
          indexAxis: 'y',
          backgroundColor: popColors.slice(0, labels.length),
          borderRadius: 4,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color:'#ede4d8' }, ticks: { font: { family:'Inter', size:10 }, color:'#8d929f' } },
          y: { grid: { display: false }, ticks: { font: { family:'Inter', size:10 }, color:'#1e2026' } }
        }
      }
    });
  }

  // 3. Peak Hours Distribution
  destroyChart('peak-hours-chart');
  const peakCanvas = document.getElementById('peak-hours-chart');
  if (peakCanvas) {
    const hrs = ['9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm'];
    const mult = range === 'week' ? 6 : range === 'month' ? 25 : 1;
    const basePeak = [6, 14, 22, 28, 18, 24, 32, 27, 20, 15, 9];
    const peakData = basePeak.map(v => v * mult);

    state.charts['peak-hours-chart'] = new Chart(peakCanvas, {
      type: 'line',
      data: {
        labels: hrs,
        datasets: [{
          label: 'Customer Volume',
          data: peakData,
          fill: true,
          backgroundColor: 'rgba(139,30,25,0.10)',
          borderColor: '#8b1e19',
          borderWidth: 2.5,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#8b1e19',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { family:'Inter', size:10 }, color:'#8d929f' } },
          y: { grid: { color:'#ede4d8' }, ticks: { font: { family:'Inter', size:10 }, color:'#8d929f' }, beginAtZero: true }
        }
      }
    });
  }
}

// Date range buttons click handler
document.querySelectorAll('.date-range-picker [data-range]').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.date-range-picker [data-range]').forEach(b => b.classList.remove('active-range'));
    this.classList.add('active-range');
    const range = this.dataset.range;
    renderReports(range);
    showToast('Report Range Updated', `Now viewing data for: ${this.textContent}`, 'info');
  });
});

// ============================================================
// QUEUE DISPLAY SCREEN
// ============================================================
let _displayClockInterval = null;
function renderDisplay() {
  const serving = state.queue.find(q => q.status === 'in-service');
  const waiting = state.queue.filter(q => q.status === 'waiting' || q.status === 'called');

  if (serving) {
    const svc = getService(serving.serviceId);
    document.getElementById('display-now-num').textContent     = serving.id;
    document.getElementById('display-now-name').textContent    = serving.name;
    document.getElementById('display-now-service').textContent = svc?.name || '—';
    document.getElementById('display-wait-time').textContent   = formatWait(calculateEstimatedWait(serving.serviceId)).toUpperCase();
  } else {
    document.getElementById('display-now-num').textContent     = '—';
    document.getElementById('display-now-name').textContent    = 'No one in service';
    document.getElementById('display-now-service').textContent = '—';
    document.getElementById('display-wait-time').textContent   = '—';
  }

  const nextList = document.getElementById('display-next-list');
  if (!waiting.length) {
    nextList.innerHTML = '<div style="color:rgba(255,255,255,.4);font-size:.9rem;padding:.5rem 0">Queue is empty</div>';
  } else {
    nextList.innerHTML = waiting.slice(0, 4).map(q => `
      <div class="display-next-item">
        <div class="dni-num">${esc(q.id)}</div>
        <div class="dni-name">${esc(q.name)}</div>
      </div>
    `).join('');
  }
}

function startDisplayClock() {
  if (_displayClockInterval) clearInterval(_displayClockInterval);
  function tick() {
    const now = new Date();
    const t = now.toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', second:'2-digit', hour12: true });
    const el = document.getElementById('display-clock');
    if (el) el.textContent = t;
  }
  tick();
  _displayClockInterval = setInterval(tick, 1000);
}

// ============================================================
// CUSTOMER TRACKING PAGE
// ============================================================
document.getElementById('track-btn').addEventListener('click', trackCustomer);
document.getElementById('track-input').addEventListener('keydown', e => { if (e.key === 'Enter') trackCustomer(); });

function trackCustomer() {
  const input = document.getElementById('track-input').value.trim().toUpperCase();
  const result = document.getElementById('tracking-result');

  const entry = state.queue.find(q => q.id === input || q.id === `Q-${input}` || q.id.includes(input));
  if (!entry) {
    result.classList.remove('hidden');
    result.innerHTML = `
      <div style="text-align:center;padding:2rem">
        <i class="fa-solid fa-circle-xmark" style="font-size:2rem;color:var(--status-cancelled);margin-bottom:.75rem;display:block"></i>
        <h3 style="color:var(--charcoal)">Queue not found</h3>
        <p style="color:var(--color-text-2);margin-top:.5rem">No customer found for <strong>${esc(input)}</strong>. Please check your queue number.</p>
      </div>`;
    return;
  }

  const svc   = getService(entry.serviceId);
  const staff = getStaff(entry.staffId);
  const waiting = state.queue.filter(q => (q.status === 'waiting' || q.status === 'called') && q.joinedAt < entry.joinedAt);
  const position = waiting.length + 1;
  const ahead    = Math.max(waiting.length, 0);
  const waitTime = calculateEstimatedWait(entry.serviceId);

  const steps = ['waiting','called','in-service','completed'];
  const currentStep = steps.indexOf(entry.status);

  const stepLabels = ['Joined','Waiting','In Service','Done'];
  const stepIcons  = ['fa-user-plus','fa-hourglass-half','fa-scissors','fa-circle-check'];

  result.classList.remove('hidden');
  result.innerHTML = `
    <div class="tr-header">
      <div>
        <div class="tr-queue-num">${esc(entry.id)}</div>
        <div>${statusBadge(entry.status)}</div>
      </div>
      <div style="text-align:right">
        <div style="font-size:1.5rem;font-weight:800;color:var(--color-primary)">${formatWait(waitTime)}</div>
        <div style="font-size:.75rem;color:var(--color-text-3)">Estimated wait</div>
      </div>
    </div>
    <div class="tr-fields-grid">
      <div class="tr-field"><label>Customer</label><span>${esc(entry.name)}</span></div>
      <div class="tr-field"><label>Service</label><span>${svc ? esc(svc.name) : '—'}</span></div>
      <div class="tr-field"><label>Queue Position</label><span>#${position}</span></div>
      <div class="tr-field"><label>People Ahead</label><span>${ahead}</span></div>
      <div class="tr-field"><label>Assigned Staff</label><span>${staff ? esc(staff.name) : 'Not yet assigned'}</span></div>
      <div class="tr-field"><label>Priority</label><span>${priorityBadge(entry.priority)}</span></div>
    </div>
    <div class="tr-progress">
      <div class="tr-progress-label">Journey Progress</div>
      <div class="progress-steps">
        ${stepLabels.map((label, i) => {
          const isDone   = i < currentStep + 1;
          const isActive = i === currentStep;
          return `
            ${i > 0 ? `<div class="step-connector ${i <= currentStep ? 'done' : ''}"></div>` : ''}
            <div class="progress-step">
              <div class="step-dot ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}">
                <i class="fa-solid ${stepIcons[i]}"></i>
              </div>
              <div class="step-label ${isActive ? 'active' : ''}">${label}</div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// ============================================================
// SETTINGS
// ============================================================
document.getElementById('settings-tabs-nav').addEventListener('click', e => {
  const btn = e.target.closest('.settings-tab-btn');
  if (!btn) return;
  document.querySelectorAll('.settings-tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.settings-panel').forEach(p => p.classList.add('hidden'));
  document.getElementById(`settings-${btn.dataset.tab}`).classList.remove('hidden');
});

document.getElementById('save-settings-btn').addEventListener('click', () => {
  showToast('Settings Saved', 'Your preferences have been updated.', 'success');
});

// Theme & accent
document.querySelectorAll('.theme-option').forEach(opt => {
  opt.addEventListener('click', function() {
    document.querySelectorAll('.theme-option').forEach(o => o.classList.remove('active'));
    this.classList.add('active');
    const theme = this.dataset.theme;
    if (theme === 'dark') {
      document.documentElement.style.setProperty('--color-bg', '#15171c');
      document.documentElement.style.setProperty('--color-surface', '#1e2026');
      document.documentElement.style.setProperty('--color-border', '#2e333d');
      document.documentElement.style.setProperty('--color-border-2', '#3e4452');
      document.documentElement.style.setProperty('--color-text', '#faf4eb');
      document.documentElement.style.setProperty('--color-text-2', '#a0a5b3');
      document.documentElement.style.setProperty('--color-text-3', '#707584');
      document.documentElement.style.setProperty('--charcoal', '#faf4eb');
    } else if (theme === 'warm') {
      document.documentElement.style.setProperty('--color-bg', '#faf4eb');
      document.documentElement.style.setProperty('--color-surface', '#ffffff');
      document.documentElement.style.setProperty('--color-border', '#e5dbcca6');
      document.documentElement.style.setProperty('--color-border-2', '#d5c8b7');
      document.documentElement.style.setProperty('--color-text', '#1e2026');
      document.documentElement.style.setProperty('--color-text-2', '#575b66');
      document.documentElement.style.setProperty('--color-text-3', '#8d929f');
      document.documentElement.style.setProperty('--charcoal', '#1e2026');
    } else {
      document.documentElement.style.setProperty('--color-bg', '#f7f2e9');
      document.documentElement.style.setProperty('--color-surface', '#ffffff');
      document.documentElement.style.setProperty('--color-border', '#e5dbcca6');
      document.documentElement.style.setProperty('--color-border-2', '#d5c8b7');
      document.documentElement.style.setProperty('--color-text', '#1e2026');
      document.documentElement.style.setProperty('--color-text-2', '#575b66');
      document.documentElement.style.setProperty('--color-text-3', '#8d929f');
      document.documentElement.style.setProperty('--charcoal', '#1e2026');
    }
    showToast('Theme Changed', `Switched to ${theme} theme.`, 'info');
  });
});
document.querySelectorAll('.accent-swatch').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.accent-swatch').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const accent = this.dataset.accent;
    document.documentElement.style.setProperty('--color-primary', accent);
    document.documentElement.style.setProperty('--crimson', accent);
    showToast('Accent Updated', 'Color scheme changed.', 'info');
  });
});

// ============================================================
// AUTO-REFRESH DASHBOARD STATS (every 30s)
// ============================================================
setInterval(() => {
  if (!document.getElementById('page-dashboard').classList.contains('hidden')) {
    updateDashboardStats();
    renderDashLiveQueue();
  }
}, 30000);

// ============================================================
// INIT — Boot the app on login
// ============================================================
// The app is fully initialized when the user logs in.
console.log('%cLumiSalon Queue System Loaded ✓', 'color:#8b1e19;font-weight:bold;font-size:14px;');
