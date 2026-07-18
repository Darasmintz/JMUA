// ============================================
// SUPABASE CONFIGURATION
// ============================================
const SUPABASE_URL = 'https://phqvhhvfdjfqxrmfblzh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBocXZoaHZmZGpmcXhybWZibHpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyNzc3NTQsImV4cCI6MjA5OTg1Mzc1NH0.RCa-3XP_rBfQLhRzv0Y0xXnp9cEv-vB5mtSxo7QhznU';

// ============================================
// EMAILJS CONFIGURATION
// ============================================
const EMAILJS_PUBLIC_KEY = 'm_IQ-aoVIyb7chd5X';
const EMAILJS_SERVICE_ID = 'service_dhr6mgh';
const EMAILJS_TEMPLATE_ID = 'template_9ryczl3';

// ============================================
// COLORS - 8 Colors Including Yellow
// ============================================
const COLORS = [
    { name: 'Deep Blue', value: '#1a237e', image: 'deepblue.png', duo: 'duo-deepblue.png', noImage: 'no-deepblue.png', noDuo: 'duo-no-deepblue.png' },
    { name: 'Sky-Blue', value: '#4fc3f7', image: 'skyblue.png', duo: 'duo-skyblue.png', noImage: 'no-skyblue.png', noDuo: 'duo-no-skyblue.png' },
    { name: 'White', value: '#ffffff', image: 'white.png', duo: 'duo-white.png', noImage: 'no-white.png', noDuo: 'duo-no-white.png' },
    { name: 'Grey', value: '#9e9e9e', image: 'grey.png', duo: 'duo-grey.png', noImage: 'no-grey.png', noDuo: 'duo-no-grey.png' },
    { name: 'Red', value: '#d32f2f', image: 'red.png', duo: 'duo-red.png', noImage: 'no-red.png', noDuo: 'duo-no-red.png' },
    { name: 'Pink', value: '#e91e63', image: 'pink.png', duo: 'duo-pink.png', noImage: 'no-pink.png', noDuo: 'duo-no-pink.png' },
    { name: 'Black', value: '#1a1a1a', image: 'black.png', duo: 'duo-black.png', noImage: 'no-black.png', noDuo: 'duo-no-black.png' },
    { name: 'Yellow', value: '#fdd835', image: 'yellow.png', duo: 'duo-yellow.png', noImage: 'no-yellow.png', noDuo: 'duo-no-yellow.png' }
];

// ============================================
// SIZES - Same for Adult and Children
// ============================================
const ADULT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const CHILDREN_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

// ============================================
// PRICES
// ============================================
const PRICES = {
    naira: { withName: 80000, noName: 70000 },
    dollar: { withName: 60, noName: 52 },
    pound: { withName: 43, noName: 32 },
    euro: { withName: 52, noName: 45 }
};

const CURRENCY_SYMBOLS = {
    naira: '₦',
    dollar: '$',
    pound: '£',
    euro: '€'
};

// ============================================
// PRODUCT DATA - 8 Products (Including Yellow)
// ============================================
const PRODUCTS = Array.from({ length: 8 }, (_, i) => ({
    id: String(i + 1),
    name: 'Jersey',
    category: 'Jerseys',
    price: 89.99,
    colors: COLORS,
    sizes: ADULT_SIZES,
    displayColor: COLORS[i % COLORS.length]
}));

// ============================================
// APPLICATION STATE
// ============================================
const state = {
    products: PRODUCTS,
    selectedProduct: PRODUCTS[0],
    customName: '',
    customNumber: '',
    selectedColor: COLORS[0],
    selectedSize: 'M',
    quantity: 1,
    currentView: 'front',
    orders: [],
    user: null,
    isAuthMode: 'signin',
    supabase: null,
    age: 'adult',
    currency: 'naira'
};

// ============================================
// DOM REFS
// ============================================
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ============================================
// INITIALIZE SUPABASE
// ============================================
try {
    state.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✅ Supabase initialized');
} catch (e) {
    console.warn('Supabase not available. Using localStorage fallback.');
    state.supabase = null;
}

// ============================================
// INITIALIZE EMAILJS
// ============================================
try {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    console.log('✅ EmailJS initialized');
} catch (e) {
    console.warn('EmailJS not available.');
}

// ============================================
// DOM ELEMENTS
// ============================================
const dom = {
    navbar: $('#navbar'),
    navToggle: $('#navToggle'),
    navMenu: $('#navMenu'),
    productGrid: $('#productGrid'),
    productSelect: $('#productSelect'),
    customName: $('#customName'),
    customNumber: $('#customNumber'),
    colorOptions: $('#colorOptions'),
    sizeOptions: $('#sizeOptions'),
    qtyMinus: $('#qtyMinus'),
    qtyPlus: $('#qtyPlus'),
    qtyInput: $('#qtyInput'),
    previewImageWithName: $('#previewImageWithName'),
    previewImageNoName: $('#previewImageNoName'),
    previewOverlayWithName: $('#previewOverlayWithName'),
    previewOverlayNoName: $('#previewOverlayNoName'),
    previewColor: $('#previewColor'),
    previewSize: $('#previewSize'),
    previewAge: $('#previewAge'),
    preOrderBtn: $('#preOrderBtn'),
    ordersBody: $('#ordersBody'),
    totalOrders: $('#totalOrders'),
    pendingOrders: $('#pendingOrders'),
    confirmedOrders: $('#confirmedOrders'),
    statusFilter: $('#statusFilter'),
    searchOrders: $('#searchOrders'),
    toast: $('#toast'),
    refreshOrdersBtn: $('#refreshOrdersBtn'),
    authOverlay: $('#authOverlay'),
    closeAuth: $('#closeAuth'),
    authBtn: $('#authBtn'),
    authTitle: $('#authTitle'),
    authForm: $('#authForm'),
    authEmail: $('#authEmail'),
    authPassword: $('#authPassword'),
    signupName: $('#signupName'),
    signupPhone: $('#signupPhone'),
    signupFields: $('#signupFields'),
    authSubmitBtn: $('#authSubmitBtn'),
    authSwitchLink: $('#authSwitchLink'),
    authSwitchText: $('#authSwitchText'),
    navUser: $('#navUser'),
    userNameDisplay: $('#userNameDisplay'),
    logoutBtn: $('#logoutBtn'),
    confirmationOverlay: $('#confirmationOverlay'),
    confirmationDetails: $('#confirmationDetails'),
    closeConfirmation: $('#closeConfirmation'),
    cancelConfirmation: $('#cancelConfirmation'),
    confirmOrderBtn: $('#confirmOrderBtn'),
    exploreBtn: $('#exploreBtn'),
    customizeBtn: $('#customizeBtn'),
    aboutCustomizeBtn: $('#aboutCustomizeBtn'),
    priceWithNameAmount: $('#priceWithNameAmount'),
    priceNoNameAmount: $('#priceNoNameAmount'),
    priceTotalAmount: $('#priceTotalAmount'),
    priceNameStatus: $('#priceNameStatus'),
    priceQtyInfo: $('#priceQtyInfo'),
    ageOptions: $('#ageOptions'),
    currencyOptions: $('#currencyOptions'),
    tourOverlay: $('#tourOverlay'),
    tourStep: $('#tourStep'),
    tourProgressFill: $('#tourProgressFill'),
    tourIcon: $('#tourIcon'),
    tourTitle: $('#tourTitle'),
    tourDesc: $('#tourDesc'),
    tourNext: $('#tourNext'),
    tourSkip: $('#tourSkip'),
    tourClose: $('#tourClose'),
    tourStartBtn: $('#tourStartBtn')
};

// ============================================
// AUTHENTICATION FUNCTIONS
// ============================================

// Check Auth State
async function checkAuth() {
    console.log('Checking auth state...');
    
    if (state.supabase) {
        try {
            const { data: { session } } = await state.supabase.auth.getSession();
            if (session?.user) {
                const { data: profile } = await state.supabase
                    .from('users')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                
                state.user = {
                    id: session.user.id,
                    email: session.user.email,
                    full_name: profile?.full_name || session.user.email,
                    phone: profile?.phone || ''
                };
                updateAuthUI();
                console.log('✅ User logged in:', state.user.email);
                return;
            }
        } catch (e) {
            console.warn('Auth check failed:', e);
        }
    }
    
    const savedUser = localStorage.getItem('jmua_user');
    if (savedUser) {
        try {
            state.user = JSON.parse(savedUser);
            updateAuthUI();
            console.log('✅ User loaded from localStorage:', state.user.email);
        } catch (e) {
            localStorage.removeItem('jmua_user');
        }
    }
}

// Update Auth UI
function updateAuthUI() {
    console.log('Updating Auth UI - User:', state.user);
    
    if (state.user) {
        if (dom.authBtn) {
            dom.authBtn.style.display = 'none';
        }
        if (dom.navUser) {
            dom.navUser.style.display = 'flex';
            if (dom.userNameDisplay) {
                dom.userNameDisplay.textContent = state.user.full_name || state.user.email?.split('@')[0] || 'User';
            }
        }
    } else {
        if (dom.authBtn) {
            dom.authBtn.style.display = 'flex';
        }
        if (dom.navUser) {
            dom.navUser.style.display = 'none';
        }
    }
}

// Open Auth Modal
function openAuthModal(mode = 'signin') {
    console.log('Opening auth modal - Mode:', mode);
    
    state.isAuthMode = mode;
    
    if (mode === 'signin') {
        dom.authTitle.textContent = 'Sign In';
        dom.authSubmitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
        dom.signupFields.style.display = 'none';
        dom.authSwitchText.textContent = "Don't have an account?";
        dom.authSwitchLink.textContent = 'Sign Up';
    } else {
        dom.authTitle.textContent = 'Create Account';
        dom.authSubmitBtn.innerHTML = '<i class="fas fa-user-plus"></i> Sign Up';
        dom.signupFields.style.display = 'block';
        dom.authSwitchText.textContent = "Already have an account?";
        dom.authSwitchLink.textContent = 'Sign In';
    }
    
    if (dom.authForm) {
        dom.authForm.reset();
    }
    
    dom.authOverlay.classList.add('show');
}

// Close Auth Modal
function closeAuthModal() {
    dom.authOverlay.classList.remove('show');
    if (dom.authForm) {
        dom.authForm.reset();
    }
}

// Handle Sign Up
async function handleSignUp(email, password, name, phone) {
    dom.authSubmitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating...';
    dom.authSubmitBtn.disabled = true;
    
    if (state.supabase) {
        try {
            const { data, error } = await state.supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        full_name: name,
                        phone: phone
                    }
                }
            });
            
            if (error) {
                if (error.message.includes('User already registered')) {
                    showToast('This email is already registered. Please sign in.', 'error');
                } else {
                    showToast('Sign up failed: ' + error.message, 'error');
                }
                dom.authSubmitBtn.innerHTML = '<i class="fas fa-user-plus"></i> Sign Up';
                dom.authSubmitBtn.disabled = false;
                return;
            }
            
            if (data.user) {
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                try {
                    const { data: profile } = await state.supabase
                        .from('users')
                        .select('*')
                        .eq('id', data.user.id)
                        .single();
                    
                    state.user = {
                        id: data.user.id,
                        email: data.user.email,
                        full_name: profile?.full_name || name,
                        phone: profile?.phone || phone
                    };
                } catch (profileErr) {
                    state.user = {
                        id: data.user.id,
                        email: data.user.email,
                        full_name: name,
                        phone: phone
                    };
                }
                
                updateAuthUI();
                closeAuthModal();
                showToast('🎉 Account created successfully! Welcome!', 'success');
                
                // Show tour after 3 seconds
                setTimeout(() => {
                    if (!localStorage.getItem('jmua_tour_completed')) {
                        startTour();
                    }
                }, 3000);
            }
        } catch (error) {
            console.error('Signup error:', error);
            showToast('Sign up failed: ' + (error.message || 'Unknown error'), 'error');
        }
    } else {
        const user = {
            id: 'user_' + Date.now(),
            email: email,
            full_name: name,
            phone: phone
        };
        state.user = user;
        localStorage.setItem('jmua_user', JSON.stringify(user));
        updateAuthUI();
        closeAuthModal();
        showToast('🎉 Account created successfully! Welcome!', 'success');
        
        setTimeout(() => {
            if (!localStorage.getItem('jmua_tour_completed')) {
                startTour();
            }
        }, 3000);
    }
    
    dom.authSubmitBtn.innerHTML = '<i class="fas fa-user-plus"></i> Sign Up';
    dom.authSubmitBtn.disabled = false;
}

// Handle Sign In
async function handleSignIn(email, password) {
    dom.authSubmitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
    dom.authSubmitBtn.disabled = true;
    
    if (state.supabase) {
        try {
            const { data, error } = await state.supabase.auth.signInWithPassword({
                email: email,
                password: password
            });
            
            if (error) {
                if (error.message.includes('Invalid login credentials')) {
                    showToast('Invalid email or password. Please try again.', 'error');
                } else if (error.message.includes('Email not confirmed')) {
                    showToast('Please confirm your email before signing in.', 'error');
                } else {
                    showToast('Sign in failed: ' + error.message, 'error');
                }
                dom.authSubmitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
                dom.authSubmitBtn.disabled = false;
                return;
            }
            
            if (data.user) {
                try {
                    const { data: profile } = await state.supabase
                        .from('users')
                        .select('*')
                        .eq('id', data.user.id)
                        .single();
                    
                    state.user = {
                        id: data.user.id,
                        email: data.user.email,
                        full_name: profile?.full_name || data.user.email,
                        phone: profile?.phone || ''
                    };
                } catch (profileErr) {
                    state.user = {
                        id: data.user.id,
                        email: data.user.email,
                        full_name: data.user.email,
                        phone: ''
                    };
                }
                
                updateAuthUI();
                closeAuthModal();
                showToast('🎉 Welcome back!', 'success');
            }
        } catch (error) {
            console.error('Signin error:', error);
            showToast('Sign in failed: ' + (error.message || 'Unknown error'), 'error');
        }
    } else {
        const savedUser = localStorage.getItem('jmua_user');
        if (savedUser) {
            try {
                const user = JSON.parse(savedUser);
                if (user.email === email) {
                    state.user = user;
                    updateAuthUI();
                    closeAuthModal();
                    showToast('🎉 Welcome back!', 'success');
                } else {
                    showToast('Invalid email or password.', 'error');
                }
            } catch (e) {
                showToast('Invalid email or password.', 'error');
            }
        } else {
            showToast('No account found. Please sign up.', 'error');
        }
    }
    
    dom.authSubmitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
    dom.authSubmitBtn.disabled = false;
}

// Setup Auth Event Listeners
function setupAuthListeners() {
    console.log('Setting up auth event listeners...');
    
    if (dom.authBtn) {
        console.log('Auth button found, adding click listener...');
        dom.authBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Auth button clicked!');
            openAuthModal('signin');
        });
    } else {
        console.warn('Auth button not found in DOM');
    }
    
    if (dom.closeAuth) {
        dom.closeAuth.addEventListener('click', function(e) {
            e.preventDefault();
            closeAuthModal();
        });
    }
    
    if (dom.authOverlay) {
        dom.authOverlay.addEventListener('click', function(e) {
            if (e.target === dom.authOverlay) {
                closeAuthModal();
            }
        });
    }
    
    if (dom.authSwitchLink) {
        dom.authSwitchLink.addEventListener('click', function(e) {
            e.preventDefault();
            const newMode = state.isAuthMode === 'signin' ? 'signup' : 'signin';
            openAuthModal(newMode);
        });
    }
    
    if (dom.authForm) {
        dom.authForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('Auth form submitted');
            
            const email = dom.authEmail.value.trim();
            const password = dom.authPassword.value;
            
            if (!email || !password) {
                showToast('Please fill in all fields.', 'error');
                return;
            }
            
            if (state.isAuthMode === 'signup') {
                const name = dom.signupName.value.trim();
                const phone = dom.signupPhone.value.trim();
                
                if (!name || !phone) {
                    showToast('Please fill in all fields.', 'error');
                    return;
                }
                
                await handleSignUp(email, password, name, phone);
            } else {
                await handleSignIn(email, password);
            }
        });
    }
    
    if (dom.logoutBtn) {
        dom.logoutBtn.addEventListener('click', async function(e) {
            e.preventDefault();
            console.log('Logout clicked');
            
            if (state.supabase) {
                try {
                    await state.supabase.auth.signOut();
                } catch (e) {
                    console.warn('Logout error:', e);
                }
            }
            
            state.user = null;
            localStorage.removeItem('jmua_user');
            updateAuthUI();
            showToast('Logged out successfully.', 'info');
        });
    }
}

// ============================================
// RENDER FUNCTIONS
// ============================================

function renderProducts() {
    if (!dom.productGrid) return;
    
    dom.productGrid.innerHTML = PRODUCTS.map((product, index) => `
        <div class="product-card" data-id="${product.id}" onclick="selectProduct('${product.id}')">
            <div class="product-card-image">
                <img src="${product.displayColor.image}" alt="${product.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x400/1A1A1A/D4AF37?text=JMUA'" />
                <div class="product-card-badge">${index === 0 ? 'Featured' : 'New'}</div>
                <div class="product-card-hover">
                    <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); selectProduct('${product.id}')">
                        <i class="fas fa-pen-fancy"></i> Customize
                    </button>
                </div>
            </div>
            <div class="product-card-content">
                <h3>${product.name}</h3>
                <div class="product-card-category">${product.category}</div>
            </div>
        </div>
    `).join('');
}

function renderProductSelect() {
    if (!dom.productSelect) return;
    
    dom.productSelect.innerHTML = PRODUCTS.map(product => `
        <button class="product-select-btn ${product.id === state.selectedProduct?.id ? 'active' : ''}" 
                data-id="${product.id}" 
                onclick="selectProduct('${product.id}')">
            ${product.name} ${product.id}
        </button>
    `).join('');
}

function renderColors() {
    if (!dom.colorOptions || !state.selectedProduct) return;
    
    dom.colorOptions.innerHTML = state.selectedProduct.colors.map(color => `
        <button class="color-btn ${color.value === state.selectedColor.value ? 'active' : ''}" 
                style="background: ${color.value}" 
                onclick="selectColor('${color.value}')"
                aria-label="Select color ${color.name}"
                title="${color.name}">
        </button>
    `).join('');
}

function renderSizeOptions() {
    if (!dom.sizeOptions) return;
    
    const sizes = state.age === 'adult' ? ADULT_SIZES : CHILDREN_SIZES;
    const currentSize = state.selectedSize;
    
    if (!sizes.includes(currentSize)) {
        state.selectedSize = sizes[0];
    }
    
    dom.sizeOptions.innerHTML = sizes.map(size => `
        <button class="size-btn ${size === state.selectedSize ? '[active]' : ''}" 
                ${size === state.selectedSize ? 'active' : ''}
                onclick="selectSize('${size}')">
            ${size}
        </button>
    `).join('');
}

// ============================================
// PRODUCT SELECTION FUNCTIONS
// ============================================

window.selectProduct = function(productId) {
    console.log('Selecting product:', productId);
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    
    state.selectedProduct = product;
    state.selectedColor = product.colors[0];
    state.selectedSize = state.age === 'adult' ? 'M' : 'M';
    
    renderProductSelect();
    renderColors();
    renderSizeOptions();
    updatePreview();
    updatePrice();
    
    showToast(`Selected: ${product.name} ${productId}`, 'success');
    scrollToCustomize();
};

window.selectColor = function(colorValue) {
    console.log('Selecting color:', colorValue);
    const color = COLORS.find(c => c.value === colorValue);
    if (!color) return;
    
    state.selectedColor = color;
    renderColors();
    updatePreview();
    updatePreviewDetails();
    updatePrice();
};

window.selectSize = function(size) {
    console.log('Selecting size:', size);
    state.selectedSize = size;
    renderSizeOptions();
    updatePreviewDetails();
    updatePrice();
};

function selectAge(age) {
    state.age = age;
    
    $$('.age-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.age === age);
    });
    
    renderSizeOptions();
    updatePreviewDetails();
    updatePreview();
    updatePrice();
}

function selectCurrency(currency) {
    state.currency = currency;
    
    $$('.currency-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.currency === currency);
    });
    
    updatePrice();
}

// ============================================
// PREVIEW UPDATE
// ============================================

function updatePreview() {
    const view = state.currentView;
    const color = state.selectedColor;
    const hasName = state.customName.trim().length > 0;
    const nameText = state.customName || 'YOUR NAME';
    const numberText = state.customNumber || '07';
    
    // Update With Name preview
    if (view === 'front') {
        dom.previewImageWithName.src = color.image;
    } else {
        dom.previewImageWithName.src = color.duo;
    }
    
    // Update No Name preview - ALWAYS use duo images
    dom.previewImageNoName.src = color.duo;
    
    // Update Name & Number Display (Below Cards)
    const nameDisplay = document.getElementById('previewNameText');
    const numberDisplay = document.getElementById('previewNumberText');
    const statusDot = document.getElementById('previewStatusDot');
    const statusText = document.getElementById('previewStatusText');
    
    if (hasName) {
        nameDisplay.textContent = nameText;
        nameDisplay.className = 'preview-name-text';
        numberDisplay.textContent = numberText;
        numberDisplay.className = 'preview-number-text';
        statusDot.className = 'status-dot has-name';
        statusText.textContent = 'With Name Selected';
    } else {
        nameDisplay.textContent = 'NO NAME';
        nameDisplay.className = 'preview-name-text empty';
        numberDisplay.textContent = '--';
        numberDisplay.className = 'preview-number-text empty';
        statusDot.className = 'status-dot no-name';
        statusText.textContent = 'No Name Selected';
    }
    
    updatePreviewDetails();
    updatePrice();
}
function updatePreviewDetails() {
    if (dom.previewColor) {
        dom.previewColor.textContent = `Color: ${state.selectedColor.name}`;
    }
    if (dom.previewSize) {
        dom.previewSize.textContent = `Size: ${state.selectedSize}`;
    }
    if (dom.previewAge) {
        dom.previewAge.textContent = `Age: ${state.age === 'adult' ? 'Adult' : 'Children'}`;
    }
}

window.setView = function(view) {
    state.currentView = view;
    updatePreview();
    
    $$('.preview-view').forEach(btn => {
        btn.removeAttribute('active');
        if (btn.dataset.view === view) {
            btn.setAttribute('active', '');
        }
    });
};

// ============================================
// PRICE UPDATE
// ============================================

function updatePrice() {
    const hasName = state.customName.trim().length > 0;
    const currency = state.currency;
    const prices = PRICES[currency];
    const symbol = CURRENCY_SYMBOLS[currency];
    const qty = state.quantity;
    
    const withNamePrice = prices.withName;
    const noNamePrice = prices.noName;
    const activePrice = hasName ? withNamePrice : noNamePrice;
    const total = activePrice * qty;
    
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    
    if (dom.priceWithNameAmount) {
        dom.priceWithNameAmount.textContent = `${symbol}${formatNumber(withNamePrice)}`;
        const row = dom.priceWithNameAmount.closest('.price-row');
        if (row) row.classList.toggle('active', hasName);
    }
    
    if (dom.priceNoNameAmount) {
        dom.priceNoNameAmount.textContent = `${symbol}${formatNumber(noNamePrice)}`;
        const row = dom.priceNoNameAmount.closest('.price-row');
        if (row) row.classList.toggle('active', !hasName);
    }
    
    if (dom.priceTotalAmount) {
        dom.priceTotalAmount.textContent = `${symbol}${formatNumber(total)}`;
    }
    
    if (dom.priceNameStatus) {
        dom.priceNameStatus.textContent = hasName ? '✅ With Name Selected' : '❌ No Name Selected';
        dom.priceNameStatus.style.color = hasName ? '#4CAF50' : '#FFC107';
    }
    
    if (dom.priceQtyInfo) {
        dom.priceQtyInfo.textContent = `Qty: ${qty} | ${state.age === 'adult' ? 'Adult' : 'Children'}`;
    }
}

// ============================================
// TOAST NOTIFICATION
// ============================================

window.showToast = function(message, type = 'info') {
    if (!dom.toast) return;
    
    dom.toast.textContent = message;
    dom.toast.className = 'toast ' + type;
    dom.toast.classList.add('show');
    
    clearTimeout(dom.toast._timeout);
    dom.toast._timeout = setTimeout(() => {
        dom.toast.classList.remove('show');
    }, 4000);
};

// ============================================
// SCROLL TO CUSTOMIZE
// ============================================

function scrollToCustomize() {
    const section = document.getElementById('customize');
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ============================================
// NAVIGATION
// ============================================

if (dom.navToggle) {
    dom.navToggle.addEventListener('click', function() {
        dom.navToggle.classList.toggle('active');
        dom.navMenu.classList.toggle('active');
    });
}

if (dom.navMenu) {
    dom.navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            dom.navToggle.classList.remove('active');
            dom.navMenu.classList.remove('active');
        });
    });
}

window.addEventListener('scroll', function() {
    if (dom.navbar) {
        if (window.scrollY > 50) {
            dom.navbar.classList.add('scrolled');
        } else {
            dom.navbar.classList.remove('scrolled');
        }
    }
});

// ============================================
// BUTTON INTERACTIVITY
// ============================================

function setupEventListeners() {
    if (dom.exploreBtn) {
        dom.exploreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
            showToast('Exploring our collection...', 'info');
        });
    }
    
    if (dom.customizeBtn) {
        dom.customizeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('customize')?.scrollIntoView({ behavior: 'smooth' });
            showToast('Start customizing your jersey!', 'info');
        });
    }
    
    if (dom.aboutCustomizeBtn) {
        dom.aboutCustomizeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('customize')?.scrollIntoView({ behavior: 'smooth' });
            showToast('Let\'s create something unique!', 'info');
        });
    }
}

// ============================================
// CUSTOMIZATION EVENTS
// ============================================

if (dom.customName) {
    dom.customName.addEventListener('input', function(e) {
        state.customName = e.target.value.toUpperCase();
        updatePreview();
        updatePrice();
    });
}

if (dom.customNumber) {
    dom.customNumber.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        state.customNumber = e.target.value;
        updatePreview();
    });
}

if (dom.qtyMinus) {
    dom.qtyMinus.addEventListener('click', function() {
        let currentValue = parseInt(dom.qtyInput.value) || 1;
        if (currentValue > 1) {
            currentValue--;
            dom.qtyInput.value = currentValue;
            state.quantity = currentValue;
            updatePrice();
        }
    });
}

if (dom.qtyPlus) {
    dom.qtyPlus.addEventListener('click', function() {
        let currentValue = parseInt(dom.qtyInput.value) || 1;
        if (currentValue < 999) {
            currentValue++;
            dom.qtyInput.value = currentValue;
            state.quantity = currentValue;
            updatePrice();
        }
    });
}

if (dom.qtyInput) {
    dom.qtyInput.addEventListener('input', function() {
        let value = parseInt(this.value) || 1;
        if (value < 1) value = 1;
        if (value > 999) value = 999;
        this.value = value;
        state.quantity = value;
        updatePrice();
    });
    
    dom.qtyInput.addEventListener('blur', function() {
        if (this.value === '' || parseInt(this.value) < 1) {
            this.value = 1;
            state.quantity = 1;
            updatePrice();
        }
    });
}

$$('.preview-view').forEach(btn => {
    btn.addEventListener('click', function() {
        window.setView(this.dataset.view);
    });
});

$$('.age-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        selectAge(this.dataset.age);
    });
});

$$('.currency-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        selectCurrency(this.dataset.currency);
    });
});

// ============================================
// PRE-ORDER FUNCTION
// ============================================

if (dom.preOrderBtn) {
    dom.preOrderBtn.addEventListener('click', function() {
        if (!state.selectedProduct) {
            showToast('Please select a product first.', 'error');
            return;
        }
        
        if (!state.user) {
            showToast('Please sign in to place a pre-order.', 'error');
            openAuthModal('signin');
            return;
        }
        
        showConfirmation();
    });
}

// ============================================
// CONFIRMATION MODAL
// ============================================

function showConfirmation() {
    const color = state.selectedColor;
    const hasName = state.customName.trim().length > 0;
    const prices = PRICES[state.currency];
    const symbol = CURRENCY_SYMBOLS[state.currency];
    const activePrice = hasName ? prices.withName : prices.noName;
    const total = activePrice * state.quantity;
    const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    dom.confirmationDetails.innerHTML = `
        <div class="order-detail">
            <span class="label">Order Reference</span>
            <span class="value">JMUA-${String(Date.now()).slice(-6)}</span>
        </div>
        <div class="order-detail">
            <span class="label">Product</span>
            <span class="value">${state.selectedProduct.name}</span>
        </div>
        <div class="order-detail">
            <span class="label">Color</span>
            <span class="value">${color.name}</span>
        </div>
        <div class="order-detail">
            <span class="label">Size</span>
            <span class="value">${state.selectedSize}</span>
        </div>
        <div class="order-detail">
            <span class="label">Age</span>
            <span class="value">${state.age === 'adult' ? 'Adult' : 'Children'}</span>
        </div>
        <div class="order-detail">
            <span class="label">Custom Name</span>
            <span class="value">${hasName ? state.customName : 'NONE'}</span>
        </div>
        <div class="order-detail">
            <span class="label">Custom Number</span>
            <span class="value">${hasName ? (state.customNumber || '07') : 'NONE'}</span>
        </div>
        <div class="order-detail">
            <span class="label">Quantity</span>
            <span class="value">${state.quantity}</span>
        </div>
        <div class="order-detail">
            <span class="label">Currency</span>
            <span class="value">${state.currency.toUpperCase()}</span>
        </div>
        <div class="order-detail">
            <span class="label">Customization Type</span>
            <span class="value" style="color:${hasName ? '#4CAF50' : '#FFC107'}">${hasName ? '✅ WITH NAME' : '❌ NO NAME'}</span>
        </div>
        <div class="order-detail">
            <span class="label">Customer</span>
            <span class="value">${state.user?.full_name || 'Guest'}</span>
        </div>
        <div class="order-detail">
            <span class="label">Email</span>
            <span class="value">${state.user?.email || 'guest@example.com'}</span>
        </div>
        <div class="order-detail">
            <span class="label">Phone</span>
            <span class="value">${state.user?.phone || 'Not provided'}</span>
        </div>
        <div class="total">Total: ${symbol}${formatNumber(total)}</div>
    `;
    
    dom.confirmationOverlay.classList.add('show');
}

if (dom.closeConfirmation) {
    dom.closeConfirmation.addEventListener('click', function() {
        dom.confirmationOverlay.classList.remove('show');
    });
}

if (dom.cancelConfirmation) {
    dom.cancelConfirmation.addEventListener('click', function() {
        dom.confirmationOverlay.classList.remove('show');
    });
}

if (dom.confirmOrderBtn) {
    dom.confirmOrderBtn.addEventListener('click', async function() {
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        this.disabled = true;
        
        try {
            await placeOrder();
        } catch (error) {
            showToast('Error placing order: ' + error.message, 'error');
            this.innerHTML = '<i class="fas fa-check"></i> Confirm Pre-Order';
            this.disabled = false;
        }
    });
}

// ============================================
// PLACE ORDER
// ============================================

async function placeOrder() {
    const color = state.selectedColor;
    const orderRef = 'JMUA-' + String(Date.now()).slice(-6);
    const hasName = state.customName.trim().length > 0;
    const prices = PRICES[state.currency];
    const symbol = CURRENCY_SYMBOLS[state.currency];
    const activePrice = hasName ? prices.withName : prices.noName;
    const total = activePrice * state.quantity;
    const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const orderDate = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    const orderData = {
        reference: orderRef,
        customerName: state.user?.full_name || 'Guest',
        customerEmail: state.user?.email || 'guest@example.com',
        customerPhone: state.user?.phone || 'Not provided',
        customerWhatsapp: state.user?.phone || 'Not provided',
        productName: state.selectedProduct.name,
        color: color.name,
        size: state.selectedSize,
        age: state.age === 'adult' ? 'Adult' : 'Children',
        customName: hasName ? state.customName : 'NONE',
        customNumber: hasName ? (state.customNumber || '07') : 'NONE',
        quantity: state.quantity,
        currency: state.currency.toUpperCase(),
        totalPrice: `${symbol}${formatNumber(total)}`,
        customizationType: hasName ? 'WITH NAME' : 'NO NAME',
        orderDate: orderDate,
        status: 'Pending'
    };
    
    try {
        const emailParams = {
            to_email: 'ayoolajamiu16@gmail.com',
            order_reference: orderData.reference,
            customer_name: orderData.customerName,
            customer_email: orderData.customerEmail,
            customer_phone: orderData.customerPhone,
            customer_whatsapp: orderData.customerWhatsapp,
            product_name: orderData.productName,
            color: orderData.color,
            size: orderData.size,
            age: orderData.age,
            custom_name: orderData.customName,
            custom_number: orderData.customNumber,
            quantity: String(orderData.quantity),
            currency: orderData.currency,
            total_price: orderData.totalPrice,
            customization_type: orderData.customizationType,
            order_date: orderData.orderDate,
            status: orderData.status
        };
        
        console.log('Sending email with params:', emailParams);
        
        const response = await emailjs.send(
            EMAILJS_SERVICE_ID, 
            EMAILJS_TEMPLATE_ID, 
            emailParams
        );
        
        console.log('✅ Email sent successfully!', response);
        showToast('📧 Order confirmation sent to business email!', 'success');
        
    } catch (error) {
        console.error('❌ Email send failed:', error);
        showToast('⚠️ Order placed but email failed. We have your order!', 'warning');
    }
    
    if (state.supabase) {
        try {
            const { error } = await state.supabase
                .from('Tree')
                .insert([{
                    order_reference: orderData.reference,
                    customer_name: orderData.customerName,
                    email: orderData.customerEmail,
                    phone: orderData.customerPhone,
                    whatsapp_number: orderData.customerWhatsapp,
                    product_name: orderData.productName,
                    color: orderData.color,
                    size: orderData.size,
                    custom_name: orderData.customName === 'NONE' ? '' : orderData.customName,
                    custom_number: orderData.customNumber === 'NONE' ? '' : orderData.customNumber,
                    quantity: orderData.quantity,
                    status: orderData.status,
                    user_id: state.user?.id || null,
                    notes: `Age: ${orderData.age} | Currency: ${orderData.currency} | Customization: ${orderData.customizationType}`
                }]);
                
            if (error) console.warn('Supabase insert error:', error);
        } catch (e) {
            console.warn('Supabase save failed:', e);
        }
    }
    
    const stored = localStorage.getItem('jmua_orders');
    const orders = stored ? JSON.parse(stored) : [];
    orders.unshift({
        id: Date.now().toString(),
        reference: orderData.reference,
        customerName: orderData.customerName,
        email: orderData.customerEmail,
        phone: orderData.customerPhone,
        product: orderData.productName,
        color: orderData.color,
        size: orderData.size,
        age: orderData.age,
        customName: orderData.customName,
        customNumber: orderData.customNumber,
        quantity: orderData.quantity,
        currency: orderData.currency,
        totalPrice: orderData.totalPrice,
        customizationType: orderData.customizationType,
        status: orderData.status,
        date: new Date().toISOString()
    });
    localStorage.setItem('jmua_orders', JSON.stringify(orders));
    
    showToast(`✅ Order ${orderRef} placed successfully!`, 'success');
    dom.confirmationOverlay.classList.remove('show');
    
    dom.confirmOrderBtn.innerHTML = '<i class="fas fa-check"></i> Confirm Pre-Order';
    dom.confirmOrderBtn.disabled = false;
    
    state.customName = '';
    state.customNumber = '';
    state.quantity = 1;
    dom.customName.value = '';
    dom.customNumber.value = '';
    dom.qtyInput.value = '1';
    
    const message = `
Hello JMUA COUTURE,

I would like to place a pre-order.

Order Reference: ${orderData.reference}
Product: ${orderData.productName}
Color: ${orderData.color}
Size: ${orderData.size}
Age: ${orderData.age}
Custom Name: ${orderData.customName}
Custom Number: ${orderData.customNumber}
Quantity: ${orderData.quantity}
Currency: ${orderData.currency}
Total: ${orderData.totalPrice}

Customer: ${orderData.customerName}
Email: ${orderData.customerEmail}
Phone: ${orderData.customerPhone}

${orderData.customizationType === 'WITH NAME' ? '✅ WITH NAME CUSTOMIZATION' : '❌ NO NAME CUSTOMIZATION'}

Please provide payment details and next steps.
    `.trim();
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/2347063615829?text=${encodedMessage}`;
    
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
    }, 1000);
    
    loadOrders();
    updateAdminStats();
}

// ============================================
// ORDER MANAGEMENT
// ============================================

function loadOrders() {
    const stored = localStorage.getItem('jmua_orders');
    if (stored) {
        state.orders = JSON.parse(stored);
        renderOrders();
        updateAdminStats();
    }
}

function renderOrders() {
    if (!dom.ordersBody) return;
    
    const filter = dom.statusFilter?.value || 'all';
    const search = dom.searchOrders?.value?.toLowerCase() || '';
    
    let filtered = state.orders;
    
    if (filter !== 'all') {
        filtered = filtered.filter(o => o.status === filter);
    }
    
    if (search) {
        filtered = filtered.filter(o => 
            o.reference?.toLowerCase().includes(search) ||
            o.customerName?.toLowerCase().includes(search) ||
            o.product?.toLowerCase().includes(search)
        );
    }
    
    if (filtered.length === 0) {
        dom.ordersBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center;padding:2rem;color:rgba(255,255,255,0.4);">
                    <i class="fas fa-box-open" style="font-size:2rem;display:block;margin-bottom:0.5rem;"></i>
                    No orders found
                </td>
            </tr>
        `;
        return;
    }
    
    dom.ordersBody.innerHTML = filtered.map(order => `
        <tr>
            <td><strong>${order.reference}</strong></td>
            <td>${order.customerName}</td>
            <td>${order.product}</td>
            <td>${order.customName || '-'} #${order.customNumber || '-'}</td>
            <td>
                <span class="status-badge status-${order.status?.toLowerCase() || 'pending'}">
                    ${order.status || 'Pending'}
                </span>
            </td>
            <td>${new Date(order.date).toLocaleDateString()}</td>
            <td>
                <select class="status-select" onchange="updateOrderStatus('${order.id}', this.value)">
                    <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="Contacted" ${order.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
                    <option value="Payment Pending" ${order.status === 'Payment Pending' ? 'selected' : ''}>Payment Pending</option>
                    <option value="Confirmed" ${order.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                    <option value="In Production" ${order.status === 'In Production' ? 'selected' : ''}>In Production</option>
                    <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                    <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
            </td>
        </tr>
    `).join('');
}

window.updateOrderStatus = function(orderId, newStatus) {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return;
    
    order.status = newStatus;
    
    const stored = localStorage.getItem('jmua_orders');
    if (stored) {
        const orders = JSON.parse(stored);
        const idx = orders.findIndex(o => o.id === orderId);
        if (idx !== -1) {
            orders[idx].status = newStatus;
            localStorage.setItem('jmua_orders', JSON.stringify(orders));
        }
    }
    
    updateAdminStats();
    renderOrders();
    showToast(`✅ Order ${order.reference} updated to ${newStatus}`, 'success');
};

function updateAdminStats() {
    if (!dom.totalOrders) return;
    
    const total = state.orders.length;
    const pending = state.orders.filter(o => o.status === 'Pending').length;
    const confirmed = state.orders.filter(o => 
        ['Confirmed', 'In Production', 'Delivered'].includes(o.status)
    ).length;
    
    dom.totalOrders.textContent = total;
    dom.pendingOrders.textContent = pending;
    dom.confirmedOrders.textContent = confirmed;
}

// ============================================
// FILTER EVENTS
// ============================================

if (dom.statusFilter) {
    dom.statusFilter.addEventListener('change', renderOrders);
}

if (dom.searchOrders) {
    dom.searchOrders.addEventListener('input', renderOrders);
}

if (dom.refreshOrdersBtn) {
    dom.refreshOrdersBtn.addEventListener('click', function() {
        loadOrders();
        showToast('Orders refreshed!', 'success');
    });
}

// ============================================
// TOUR FUNCTIONALITY - FIXED
// ============================================

const tourSteps = [
    {
        icon: '👋',
        title: 'Welcome to JMUA COUTURE!',
        desc: 'Welcome to your premium custom jersey destination! Let us show you how to create your perfect personalized jersey.'
    },
    {
        icon: '👕',
        title: 'Explore Our Collection',
        desc: 'Browse through our premium jersey collection. Each jersey is crafted with quality materials and attention to detail.'
    },
    {
        icon: '🎨',
        title: 'Customize Your Jersey',
        desc: 'Personalize your jersey with your name, number, and choose from 8 premium colors. Also select adult or children sizes.'
    },
    {
        icon: '✏️',
        title: 'Add Your Name & Number',
        desc: 'Type your name to see it appear on the jersey. The price updates automatically! Leave it empty for a lower "No Name" price.'
    },
    {
        icon: '🎯',
        title: 'Choose Your Color',
        desc: 'Select from 8 premium colors. Both "With Name" and "No Name" previews update instantly!'
    },
    {
        icon: '👀',
        title: 'Live Preview',
        desc: 'Switch between Front and Back views. The "With Name" preview shows your name, while "No Name" stays clean.'
    },
    {
        icon: '💰',
        title: 'Price & Currency',
        desc: 'Select your currency (Naira, Dollar, Pound, or Euro). The total updates automatically based on your selections.'
    },
    {
        icon: '🛒',
        title: 'Place Your Pre-Order!',
        desc: 'Click "Pre-Order Now" to review your order. It will be sent via WhatsApp and email. The JMUA team will reach out shortly!'
    }
];

let currentTourStep = 0;
let isTourActive = false;
let tourTimeout = null;

// DOM Elements for Tour
const tourOverlay = document.getElementById('tourOverlay');
const tourStep = document.getElementById('tourStep');
const tourProgressFill = document.getElementById('tourProgressFill');
const tourIcon = document.getElementById('tourIcon');
const tourTitle = document.getElementById('tourTitle');
const tourDesc = document.getElementById('tourDesc');
const tourNext = document.getElementById('tourNext');
const tourSkip = document.getElementById('tourSkip');
const tourClose = document.getElementById('tourClose');
const tourStartBtn = document.getElementById('tourStartBtn');

// Start Tour
function startTour() {
    console.log('🎯 Starting tour...');
    isTourActive = true;
    currentTourStep = 0;
    
    // Make sure overlay exists and show it
    if (!tourOverlay) {
        console.error('❌ Tour overlay not found!');
        return;
    }
    
    showTourStep(0);
    tourOverlay.classList.add('active');
    console.log('✅ Tour started, overlay active');
}

// Show Tour Step
function showTourStep(index) {
    if (index >= tourSteps.length) {
        endTour();
        return;
    }
    
    const step = tourSteps[index];
    
    if (tourStep) tourStep.textContent = `${index + 1}/${tourSteps.length}`;
    if (tourProgressFill) tourProgressFill.style.width = `${((index + 1) / tourSteps.length) * 100}%`;
    if (tourIcon) tourIcon.textContent = step.icon;
    if (tourTitle) tourTitle.textContent = step.title;
    if (tourDesc) tourDesc.textContent = step.desc;
    
    if (tourNext) {
        if (index === tourSteps.length - 1) {
            tourNext.innerHTML = '🎉 Done!';
        } else {
            tourNext.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
        }
    }
}

// Next Step
function nextTourStep() {
    currentTourStep++;
    if (currentTourStep >= tourSteps.length) {
        endTour();
    } else {
        showTourStep(currentTourStep);
    }
}

// End Tour
function endTour() {
    console.log('🎯 Ending tour...');
    isTourActive = false;
    if (tourOverlay) tourOverlay.classList.remove('active');
    showToast('🎉 Tour complete! Start customizing your jersey!', 'success');
    localStorage.setItem('jmua_tour_completed', 'true');
}

// Skip Tour
function skipTour() {
    console.log('🎯 Skipping tour...');
    isTourActive = false;
    if (tourOverlay) tourOverlay.classList.remove('active');
    showToast('Tour skipped. You can restart anytime!', 'info');
}

// ============================================
// TOUR EVENT LISTENERS
// ============================================

if (tourNext) {
    tourNext.addEventListener('click', nextTourStep);
}

if (tourSkip) {
    tourSkip.addEventListener('click', skipTour);
}

if (tourClose) {
    tourClose.addEventListener('click', skipTour);
}

if (tourStartBtn) {
    tourStartBtn.addEventListener('click', function() {
        console.log('🔘 Tour start button clicked');
        localStorage.removeItem('jmua_tour_completed');
        startTour();
    });
}

if (tourOverlay) {
    tourOverlay.addEventListener('click', function(e) {
        if (e.target === tourOverlay && isTourActive) {
            nextTourStep();
        }
    });
}

// Keyboard support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && isTourActive) {
        nextTourStep();
    }
    if (e.key === 'Escape' && isTourActive) {
        skipTour();
    }
});

// ============================================
// AUTO-START TOUR AFTER SIGNUP
// ============================================

// Function to show tour after signup
function showTourAfterSignup() {
    console.log('🔍 Checking if tour should show...');
    
    const tourCompleted = localStorage.getItem('jmua_tour_completed');
    console.log('📌 Tour completed flag:', tourCompleted);
    console.log('📌 User logged in:', state.user ? 'Yes' : 'No');
    
    // Only show if user is logged in and tour not completed
    if (state.user && !tourCompleted) {
        console.log('✅ Conditions met! Starting tour in 3 seconds...');
        
        // Clear any existing timeout
        if (tourTimeout) {
            clearTimeout(tourTimeout);
        }
        
        // Show tour after 3 seconds
        tourTimeout = setTimeout(() => {
            console.log('⏰ Timer triggered! Starting tour now...');
            if (!isTourActive) {
                startTour();
            }
        }, 3000);
    } else {
        console.log('❌ Conditions not met for tour');
        if (!state.user) console.log('   - User is not logged in');
        if (tourCompleted) console.log('   - Tour already completed');
    }
}

// Override handleSignUp to trigger tour after signup
const originalHandleSignUp = handleSignUp;
handleSignUp = async function(email, password, name, phone) {
    console.log('📝 Sign up called - will trigger tour after success');
    await originalHandleSignUp(email, password, name, phone);
    
    // After signup success, show tour after 3 seconds
    if (state.user) {
        console.log('✅ Signup successful! Tour will show in 3 seconds...');
        setTimeout(() => {
            if (!isTourActive && !localStorage.getItem('jmua_tour_completed')) {
                console.log('🚀 Starting tour after signup...');
                startTour();
            }
        }, 3000);
    }
};

// Also check when auth state changes
const originalUpdateAuthUI = updateAuthUI;
updateAuthUI = function() {
    console.log('🔄 Auth UI updated...');
    originalUpdateAuthUI();
    
    // If user just logged in, show tour after delay
    if (state.user) {
        console.log('👤 User detected in auth UI update');
        showTourAfterSignup();
    }
};

// Check on page load
setTimeout(() => {
    console.log('🔍 Checking on page load...');
    if (state.user && !localStorage.getItem('jmua_tour_completed')) {
        console.log('✅ User logged in on load - showing tour...');
        showTourAfterSignup();
    } else {
        console.log('❌ No tour needed on load');
        if (!state.user) console.log('   - No user logged in');
        if (localStorage.getItem('jmua_tour_completed')) console.log('   - Tour already completed');
    }
}, 5000);

console.log('🗺️ Tour Guide: Will appear 3 seconds after signup!');

// ============================================
// EXPOSE FUNCTIONS TO GLOBAL SCOPE
// ============================================

window.selectProduct = selectProduct;
window.selectColor = selectColor;
window.selectSize = selectSize;
window.selectAge = selectAge;
window.selectCurrency = selectCurrency;
window.setView = setView;
window.updateOrderStatus = updateOrderStatus;
window.showToast = showToast;
window.openAuthModal = openAuthModal;
window.closeAuthModal = closeAuthModal;

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 JMUA COUTURE - Initializing...');
    
    renderProducts();
    renderProductSelect();
    renderColors();
    renderSizeOptions();
    setupEventListeners();
    setupAuthListeners();
    updatePreview();
    updatePrice();
    loadOrders();
    updateAdminStats();
    checkAuth();
});

console.log('✅ JMUA COUTURE - Fully Loaded and Interactive!');
