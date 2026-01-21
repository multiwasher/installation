// --- SISTEMA DE TRADUÇÃO ---
window.currentLanguage = 'en'; // Default to English

// Traduções para a interface do login
const uiTranslations = {
    'Welcome': { pt: 'Bem-vindo', en: 'Welcome', es: 'Bienvenido', fr: 'Bienvenue' },
    'Secure Session': { pt: 'Sessão Segura', en: 'Secure Session', es: 'Sesión Segura', fr: 'Séance Sécurisée' },
    'Username': { pt: 'Utilizador', en: 'Username', es: 'Usuario', fr: 'Utilisateur' },
    'Password': { pt: 'Senha', en: 'Password', es: 'Contraseña', fr: 'Mot de passe' },
    'Invalid credentials.': { pt: 'Credenciais inválidas.', en: 'Invalid credentials.', es: 'Credenciales inválidas.', fr: 'Identifiants invalides.' },
    'Sign In': { pt: 'Entrar', en: 'Sign In', es: 'Iniciar sesión', fr: 'Se connecter' },
};

// Merge translations from translations.js
if (typeof translationsData !== 'undefined') {
    Object.assign(uiTranslations, translationsData);
}
window.uiTranslations = uiTranslations;

// Função para traduzir um texto
window.t = (key) => {
    if (window.uiTranslations && window.uiTranslations[key]) {
        return window.uiTranslations[key][window.currentLanguage] || window.uiTranslations[key]['en'];
    }
    return key;
};

// Função para mudar idioma
window.setLanguage = (lang) => {
    window.currentLanguage = lang;
    
    // Atualizar botões de idioma
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('text-white', 'bg-white/10');
        btn.classList.add('text-white/40');
    });
    document.getElementById(`lang-${lang}`).classList.remove('text-white/40');
    document.getElementById(`lang-${lang}`).classList.add('text-white', 'bg-white/10');
    
    // Atualizar textos visíveis
    updateLoginScreenTranslation();
    
    // Guardar no localStorage
    localStorage.setItem('preferredLanguage', lang);
};

// Função para atualizar a tradução do ecrã de login
window.updateLoginScreenTranslation = () => {
    const lang = window.currentLanguage;
    
    const welcomeTitle = document.querySelector('h2.text-white');
    const secureSession = document.querySelector('p.text-white\\/50.mb-8');
    const userInput = document.getElementById('login-user');
    const passInput = document.getElementById('login-pass');
    const submitBtn = document.querySelector('button[type="submit"].btn-entrar');
    
    if (welcomeTitle) welcomeTitle.innerText = window.t('Welcome');
    if (secureSession) secureSession.innerText = window.t('Secure Session');
    if (userInput) userInput.placeholder = window.t('Username');
    if (passInput) passInput.placeholder = window.t('Password');
    
    if (submitBtn) {
        submitBtn.innerText = window.t('Sign In');
        submitBtn.innerHTML = window.t('Sign In') + '<i data-lucide="arrow-right"></i>';
        lucide.createIcons();
    }
};

// Inicializar event listeners para botões de idioma
document.addEventListener('DOMContentLoaded', () => {
    // Restaurar idioma salvo ou usar padrão
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    window.setLanguage(savedLang);
    
    // Adicionar listeners aos botões de idioma
    document.getElementById('lang-pt')?.addEventListener('click', (e) => {
        e.preventDefault();
        window.setLanguage('pt');
    });
    document.getElementById('lang-en')?.addEventListener('click', (e) => {
        e.preventDefault();
        window.setLanguage('en');
    });
    document.getElementById('lang-fr')?.addEventListener('click', (e) => {
        e.preventDefault();
        window.setLanguage('fr');
    });
    document.getElementById('lang-es')?.addEventListener('click', (e) => {
        e.preventDefault();
        window.setLanguage('es');
    });
});

// --- EDIÇÃO DE VOOS ---
(async () => {
    // ...existing code...

    // Garante que flightsData está definido globalmente
    window.flightsData = [];

    // --- EDIÇÃO DE VOOS ---
    let editingFlightId = null;
    window.editFlight = (id) => {
        const flight = window.flightsData.find(f => f.id === id);
        if (!flight) {
            alert('Voo não encontrado.');
            return;
        }
        editingFlightId = id;
        document.getElementById('flight-modal').classList.remove('hidden');
        document.getElementById('flight-date').value = flight.date || '';
        document.getElementById('flight-date-arrival').value = flight.dateArrival || '';
        document.getElementById('flight-airport').value = flight.airport || '';
        document.getElementById('flight-destination').value = flight.destination || '';
        document.getElementById('flight-departure-time').value = flight.departureTime || '';
        document.getElementById('flight-arrival-time').value = flight.arrivalTime || '';
        updateFlightTechnicianList();
        document.getElementById('flight-technician').value = flight.technician || '';
        document.getElementById('flight-status').value = flight.status || '';
        document.getElementById('flight-notes').value = flight.notes || '';
    };

    const origShowFlightModal = window.showFlightModal;
    window.showFlightModal = function() {
        editingFlightId = null;
        origShowFlightModal();
    };
    const origCloseFlightModal = window.closeFlightModal;
    window.closeFlightModal = function() {
        editingFlightId = null;
        origCloseFlightModal();
    };

    // Remove any previous listeners to avoid duplicates
    const flightForm = document.getElementById('flight-form');
    if (flightForm) {
        flightForm.onsubmit = null;
        flightForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const dateDeparture = document.getElementById('flight-date').value;
            const dateArrival = document.getElementById('flight-date-arrival').value;
            const departureTime = document.getElementById('flight-departure-time').value;
            const arrivalTime = document.getElementById('flight-arrival-time').value;
            if (!dateDeparture || !dateArrival || !departureTime || !arrivalTime) {
                alert('Preencha data de partida, data de chegada, hora de partida e hora de chegada.');
                return;
            }
            const flightData = {
                date: dateDeparture,
                dateArrival: dateArrival,
                airport: document.getElementById('flight-airport').value,
                destination: document.getElementById('flight-destination').value,
                departureTime: departureTime,
                arrivalTime: arrivalTime,
                technician: document.getElementById('flight-technician').value,
                status: document.getElementById('flight-status').value,
                notes: document.getElementById('flight-notes').value,
            };
            try {
                let flightId = editingFlightId;
                if (flightId) {
                    // Edit mode: update existing
                    await window.fbSetDoc(window.fbDoc(window.db, 'artifacts', window.appId, 'public', 'data', 'flights', flightId), {
                        ...flightData,
                        createdAt: window.flightsData.find(f => f.id === flightId)?.createdAt || new Date().toISOString()
                    });
                } else {
                    // New flight
                    flightId = crypto.randomUUID();
                    await window.fbSetDoc(window.fbDoc(window.db, 'artifacts', window.appId, 'public', 'data', 'flights', flightId), {
                        ...flightData,
                        createdAt: new Date().toISOString()
                    });
                }
                closeFlightModal();
            } catch (err) {
                alert("Erro ao guardar voo.");
            }
        });
    }

    // ...existing code...

})();
(async () => {
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js");
    const { getAuth, signInAnonymously, onAuthStateChanged } = await import("https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js");
    const { getFirestore, collection, onSnapshot, doc, setDoc, deleteDoc } = await import("https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js");

    // Configuração Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyBMjm9Y3iPb77mEmwtNdenPsVpcBg9Wax0",
        authDomain: "somengil-compliance.firebaseapp.com",
        projectId: "somengil-compliance",
        storageBucket: "somengil-compliance.firebasestorage.app",
        messagingSenderId: "747040750200",
        appId: "1:747040750200:web:f022285b2f33f27c90cb8d"
    };

    const app = initializeApp(firebaseConfig);
    window.auth = getAuth(app);
    window.db = getFirestore(app);
    window.fbCollection = collection;
    window.fbOnSnapshot = onSnapshot;
    window.fbDoc = doc;
    window.fbSetDoc = setDoc;
    window.fbDeleteDoc = deleteDoc;
    window.appId = 'somengil-compliance-v3';
    
    // Inicializar autenticação
    signInAnonymously(window.auth).catch(err => console.error("Erro ao conectar Firebase:", err));
    onAuthStateChanged(window.auth, (user) => {
        if (user) {
            console.log("Firebase Conectado");
            listenToData();
        }
    });
})();

// Utilizadores Autorizados
const USERS = {
    "4827": { name: "Miguel Moura", role: "TECH" },
    "9053": { name: "Richard Carvalhais", role: "TECH" },
    "1749": { name: "Tiago Dias", role: "TECH" },
    "6382": { name: "Leonel Pereira", role: "TECH" },
    "2916": { name: "Diogo Martins", role: "TECH" },
    "112": { name: "GESTÃO", role: "ADMIN" },
    "999": { name: "VOOS", role: "ADMIN" }
};

// Estrutura Completa das Secções do Portal (Restaurada)
const FORM_STRUCTURE = [
    { id: "s1_1", label: "1.1 - Installation Responsability", fields: ["Inst_Status_Planned_NotPlanned", "Inst_Date", "Inst_Company", "Inst_Technician_Name", "Inst_Technician_Phone", "Inst_Technician_Email"] },
    { id: "s1_2", label: "1.2 - Customer Identification", fields: ["Cust_Name", "Cust_Address", "Cust_ZipCode", "Cust_City", "Cust_Country", "Cust_VAT_Number", "Cust_Representative_Person", "Cust_Representative_Phone", "Cust_Representative_Email"] },
    { id: "s1_3", label: "1.3 - Service Identification", fields: ["Svc_Installation", "Svc_Preventive_Maintenance", "Svc_Corrective_Maintenance", "Svc_Warranty"] },
    { id: "s1_4", label: "1.4 - Equipment and Accessories Identification", fields: ["Equip_Quantity", "Equip_Model_Product", "Equip_Serial_Number", "Equip_Delivered_Yes_No", "Equip_Notes"] },
    { id: "s1_5", label: "1.5 - EXTRAS", fields: ["EXTRA_SDS", "EXTRA_DRD", "EXTRA_DTC", "EXTRA_CRE_DRD", "EXTRA_IVS_DRD", "EXTRA_EFS", "EXTRA_EXD", "EXTRA_HMI", "EXTRA_STM"] },
    { id: "s2", label: "2 - Documentation", fields: ["Doc_Manual_Delivered_Explained", "Doc_Receiver_Name", "Doc_Receiver_Position", "Doc_Receiver_Phone", "Doc_Receiver_Email", "Doc_No_Explain_Why"] },
    { id: "s3", label: "3 - Training (washing)", fields: ["Train_Wash_Daily_Yes_No", "Train_Wash_No_Explain_Why"], specialType: "training_washing_section" },
    { id: "s4", label: "4 - Training (cleaning)", fields: ["Train_Clean_Daily_Yes_No", "Train_Clean_No_Explain_Why"], specialType: "training_cleaning_section" },
    { id: "s5", label: "5 - Measurements", fields: ["Meas_Water_Input_Temp", "Meas_Input_Pressure", "Meas_Water_Quality", "Meas_Electrical_Info", "Meas_Electrical_Consumption", "Meas_Consumption_Measurement", "Meas_Consumption_Who_Identified"] },
    { id: "s6", label: "6 - Washing", fields: ["WashTest_Performed_Yes_No", "WashTest_Quality_Rating", "WashTest_Answer_Explanation", "WashTest_Detergent_Used", "WashTest_Debit", "WashTest_Concentration"] },
    { id: "s7", label: "7 - Preventive Maintenance", fields: ["PrevMaint_Training_Yes_No", "PrevMaint_Who_Name", "PrevMaint_Who_Position", "PrevMaint_Who_Phone", "PrevMaint_Who_Email", "PrevMaint_No_Explain_Why"] },
    { id: "s8", label: "8 - Programming", fields: ["Prog_Training_Yes_No", "Prog_Training_Who_Name", "Prog_Training_Who_Position", "Prog_Training_Who_Phone", "Prog_Training_Who_Email", "Prog_Training_No_Explain_Why"] },
    { id: "s9", label: "9 - Program", fields: ["Machine_Programmed_Yes_No", "Machine_Programmed_For_Utensils"], specialType: "program_section" },
    { id: "s10", label: "10 - Program Data", fields: [], specialType: "program_data_section" },
    { id: "s11", label: "11 - Status Training", fields: ["Status_Installation_Training_Completed"] },
    { id: "s12", label: "12 - Points to evaluate", fields: ["Eval_Machine_Type", "Eval_Heating", "Eval_Assembly", "Eval_General_Condition", "Eval_Sensor_Level_Tank", "Eval_Tank_Boiler_Solenoid_Valve", "Eval_EV_Steam_Vat_Boiler", "Eval_Detergent_Dispenser_Dryer", "Eval_Sensor_Safety_Interlock", "Eval_Inductive_Position_Sensor", "Eval_Unit_Parameters_Post_Discharge", "Eval_Drive_Parameters_Reboot", "Eval_Direction_Rotation_Basket", "Eval_Wash_Rinse_Injectors", "Eval_Screw_Tightening_Rinsing_Pump", "Eval_Console_Calibration_Procedure", "Eval_Language_Console", "Eval_Unit_Setpoint_Temperature"] },
    { id: "s13", label: "13 - Consumption", fields: [], specialType: "consumption_measurements_section" },
    { id: "s14", label: "14 - Summary", fields: ["Summary_Notes", "Summary_Date", "Signature_Technician_Name", "Signature_Technician", "Signature_Customer_Name", "Signature_Customer"] }
];

let sessionUser = null;
let complianceData = [];
let editingDoc = null;
let sidebarExpanded = false;
let costsData = [];
// flightsData é sempre window.flightsData

// --- SIGNATURE PADS ---
let signaturePadTechnician = null;
let signaturePadCustomer = null;

const SIGNATURE_FIELDS = {
    technician: 'Signature_Technician',
    customer: 'Signature_Customer'
};

// --- INICIALIZAÇÃO ---
window.addEventListener('load', () => {
    lucide.createIcons();
    // Garante sidebar recolhido ao carregar a app
    sidebarExpanded = false;
    const sidebar = document.getElementById('sidebar');
    const sidebarTexts = document.querySelectorAll('.sidebar-text');
    const sidebarLogo = document.getElementById('sidebar-logo');
    const sidebarCollapsedLogo = document.getElementById('sidebar-collapsed-logo');
    if (sidebar) sidebar.classList.remove('expanded');
    sidebarTexts.forEach(t => t.classList.add('hidden'));
    if (sidebarLogo) sidebarLogo.classList.add('hidden');
    if (sidebarCollapsedLogo) sidebarCollapsedLogo.classList.remove('hidden');
});

const listenToData = () => {
    const colRef = window.fbCollection(window.db, 'artifacts', window.appId, 'public', 'data', 'compliance');
    window.fbOnSnapshot(colRef, (snap) => {
        complianceData = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        renderDashboard();
    });
    
    const costsRef = window.fbCollection(window.db, 'artifacts', window.appId, 'public', 'data', 'costs');
    window.fbOnSnapshot(costsRef, (snap) => {
        costsData = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    });
    
    const flightsRef = window.fbCollection(window.db, 'artifacts', window.appId, 'public', 'data', 'flights');
    window.fbOnSnapshot(flightsRef, (snap) => {
        window.flightsData = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    });
};

// --- GESTÃO DE LOGIN ---
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const u = document.getElementById('login-user').value;
    const p = document.getElementById('login-pass').value;

    if (USERS[p] && USERS[p].name.toLowerCase() === u.toLowerCase()) {
        sessionUser = USERS[p];
        document.getElementById('view-login').classList.add('hidden');
        document.getElementById('app-container').classList.remove('hidden');
        document.getElementById('header-user-name').innerText = sessionUser.name;
        document.getElementById('header-user-role').innerText = sessionUser.role === 'ADMIN' ? 'Gestão Somengil' : 'Técnico';
        document.getElementById('user-avatar').innerText = sessionUser.name.charAt(0);
        // Expandir sidebar automaticamente em desktop após login
        const isMobile = window.innerWidth <= 768;
        if (!isMobile) {
            sidebarExpanded = true;
            const sidebar = document.getElementById('sidebar');
            const sidebarTexts = document.querySelectorAll('.sidebar-text');
            const sidebarLogo = document.getElementById('sidebar-logo');
            const sidebarCollapsedLogo = document.getElementById('sidebar-collapsed-logo');
            sidebar.classList.add('expanded');
            sidebarTexts.forEach(t => t.classList.remove('hidden'));
            if (sidebarLogo) sidebarLogo.classList.remove('hidden');
            if (sidebarCollapsedLogo) sidebarCollapsedLogo.classList.add('hidden');
        } else {
            // Em mobile, manter sidebar recolhido
            sidebarExpanded = false;
            const sidebar = document.getElementById('sidebar');
            const sidebarTexts = document.querySelectorAll('.sidebar-text');
            sidebar.classList.remove('expanded');
            sidebarTexts.forEach(t => t.classList.add('hidden'));
        }
        lucide.createIcons();
        setView('dashboard');
        renderDashboard();
    } else {
        document.getElementById('login-error').classList.remove('hidden');
    }
});

// --- NAVEGAÇÃO E UI ---
window.setView = (view) => {
    document.getElementById('view-dashboard').classList.add('hidden');
    document.getElementById('view-form').classList.add('hidden');
    document.getElementById('view-voos').classList.add('hidden');
    document.getElementById('view-costs').classList.add('hidden');
    document.getElementById('sidebar-sections').classList.add('hidden');
    document.getElementById('nav-dashboard').classList.remove('active');
    document.getElementById('nav-voos').classList.remove('active');
    document.getElementById('nav-costs').classList.remove('active');
    // Garantir que o botão Sair nunca é escondido
    const sairBtn = document.querySelector('.nav-item.text-red-400');
    if (sairBtn) sairBtn.classList.remove('hidden');
    
    // Close sidebar on mobile when navigating
    if (window.innerWidth <= 768) {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.remove('mobile-open');
        document.body.classList.remove('sidebar-open');
    }

    if (view === 'dashboard') {
        document.getElementById('view-dashboard').classList.remove('hidden');
        document.getElementById('nav-dashboard').classList.add('active');
        // Mostrar botão Nova Ficha só para ADMIN
        const btnNewForm = document.querySelector('button[onclick="createNewForm()"]');
        if (btnNewForm) {
            btnNewForm.style.display = (sessionUser && sessionUser.role === 'ADMIN') ? '' : 'none';
        }
        renderDashboard();
    } else if (view === 'form') {
        document.getElementById('view-form').classList.remove('hidden');
        document.getElementById('sidebar-sections').classList.remove('hidden');
    } else if (view === 'voos') {
        document.getElementById('view-voos').classList.remove('hidden');
        document.getElementById('nav-voos').classList.add('active');
        renderFlightsView();
    } else if (view === 'costs') {
        document.getElementById('view-costs').classList.remove('hidden');
        document.getElementById('nav-costs').classList.add('active');
        renderCostsView();
    }
};

window.toggleSidebar = () => {
    const isMobile = window.innerWidth <= 768;
    const sidebar = document.getElementById('sidebar');
    const body = document.body;
    
    if (isMobile) {
        // Mobile: Toggle overlay and slide-in sidebar
        const isOpen = sidebar.classList.contains('mobile-open');
        if (isOpen) {
            sidebar.classList.remove('mobile-open');
            body.classList.remove('sidebar-open');
        } else {
            sidebar.classList.add('mobile-open');
            body.classList.add('sidebar-open');
        }
    } else {
        // Desktop: Toggle expanded width
        sidebarExpanded = !sidebarExpanded;
        const sidebarTexts = document.querySelectorAll('.sidebar-text');
        const sidebarLogo = document.getElementById('sidebar-logo');
        const sidebarCollapsedLogo = document.getElementById('sidebar-collapsed-logo');
        
        if (sidebarExpanded) {
            sidebar.classList.add('expanded');
            sidebarTexts.forEach(t => t.classList.remove('hidden'));
            if (sidebarLogo) sidebarLogo.classList.remove('hidden');
            if (sidebarCollapsedLogo) sidebarCollapsedLogo.classList.add('hidden');
        } else {
            sidebar.classList.remove('expanded');
            sidebarTexts.forEach(t => t.classList.add('hidden'));
            if (sidebarLogo) sidebarLogo.classList.add('hidden');
            if (sidebarCollapsedLogo) sidebarCollapsedLogo.classList.remove('hidden');
        }
    }
};

window.handleLogout = () => {
    location.reload();
};

// --- MÓDULO DE DESPESAS ---
window.showCostModal = () => {
    document.getElementById('cost-modal').classList.remove('hidden');
    document.getElementById('cost-date').valueAsDate = new Date();
};

window.closeCostModal = () => {
    document.getElementById('cost-modal').classList.add('hidden');
    document.getElementById('cost-form').reset();
};

document.getElementById('cost-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const costData = {
        date: document.getElementById('cost-date').value,
        type: document.getElementById('cost-type').value,
        description: document.getElementById('cost-description').value,
        value: parseFloat(document.getElementById('cost-value').value),
        technician: sessionUser.name,
        createdAt: new Date().toISOString()
    };
    
    try {
        const costId = crypto.randomUUID();
        await window.fbSetDoc(window.fbDoc(window.db, 'artifacts', window.appId, 'public', 'data', 'costs', costId), costData);
        closeCostModal();
    } catch (err) {
        alert("Erro ao guardar custo.");
    }
});

const renderCostsView = () => {
    const filtersContainer = document.getElementById('cost-filters');
    if (sessionUser.role === 'ADMIN') {
        filtersContainer.classList.remove('hidden');
        updateTechnicianFilter();
    } else {
        filtersContainer.classList.add('hidden');
    }
    renderCostsTable();
};

const updateTechnicianFilter = () => {
    const select = document.getElementById('filter-technician');
    const techs = new Set(costsData.map(c => c.technician).filter(Boolean));
    const currentValue = select.value;
    select.innerHTML = '<option value="">Todos</option>';
    techs.forEach(tech => {
        const option = document.createElement('option');
        option.value = tech;
        option.textContent = tech;
        select.appendChild(option);
    });
    select.value = currentValue;
};

window.applyFilters = () => {
    renderCostsTable();
};

const renderCostsTable = () => {
    const tbody = document.getElementById('costs-table-body');
    let dataToShow = costsData;
    
    if (sessionUser.role === 'TECH') {
        dataToShow = costsData.filter(c => c.technician === sessionUser.name);
    } else if (sessionUser.role === 'ADMIN') {
        const dateFrom = document.getElementById('filter-date-from').value;
        const dateTo = document.getElementById('filter-date-to').value;
        const techFilter = document.getElementById('filter-technician').value;
        
        dataToShow = costsData.filter(c => {
            if (dateFrom && c.date < dateFrom) return false;
            if (dateTo && c.date > dateTo) return false;
            if (techFilter && c.technician !== techFilter) return false;
            return true;
        });
    }
    
    if (dataToShow.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="px-8 py-20 text-center text-slate-400 italic">Sem despesas registadas.</td></tr>`;
        return;
    }
    
    const totalValue = dataToShow.reduce((sum, c) => sum + (c.value || 0), 0);
    
    tbody.innerHTML = dataToShow.map(item => `
        <tr class="hover:bg-blue-50/30 transition-colors">
            <td class="px-8 py-6 font-mono">${item.date || '---'}</td>
            <td class="px-8 py-6 font-bold text-blue-600">${item.type || '---'}</td>
            <td class="px-8 py-6 text-slate-700">${item.description || '---'}</td>
            <td class="px-8 py-6 font-black text-emerald-600">${item.value?.toFixed(2) || '0.00'}€</td>
            <td class="px-8 py-6 text-slate-600">${item.technician || '---'}</td>
            <td class="px-8 py-6 text-right">
                <button onclick="deleteCost('${item.id}')" class="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 border border-red-100">
                    <i data-lucide="trash-2" style="width:18px"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    // Adicionar linha de total
    if (dataToShow.length > 0) {
        tbody.innerHTML += `
            <tr class="bg-slate-50 font-black">
                <td colspan="3" class="px-8 py-4 text-right">TOTAL:</td>
                <td class="px-8 py-4 text-emerald-700">${totalValue.toFixed(2)}€</td>
                <td colspan="2"></td>
            </tr>
        `;
    }
    
    lucide.createIcons();
};

window.deleteCost = async (id) => {
    if (confirm("Apagar este custo?")) {
        try {
            await window.fbDeleteDoc(window.fbDoc(window.db, 'artifacts', window.appId, 'public', 'data', 'costs', id));
        } catch (err) {
            alert("Erro ao apagar custo.");
        }
    }
};

// Mostrar modal de seleção de idioma para PDF
// Variável para armazenar o callback da seleção de idioma
let pdfLanguageCallback = null;

window.testPDFModal = () => {
    console.log('[PDF TEST] Testing modal display');
    window.showPDFLanguageSelector((lang) => {
        console.log('[PDF TEST] Language selected:', lang);
        alert('You selected: ' + lang);
    });
};

window.selectPDFLanguage = (lang) => {
    const modal = document.getElementById('pdf-language-modal');
    if (modal) modal.remove();
    
    if (pdfLanguageCallback) {
        pdfLanguageCallback(lang);
        pdfLanguageCallback = null;
    }
};

window.showPDFLanguageSelector = (callback) => {
    console.log('[PDF] Showing language selector modal');
    pdfLanguageCallback = callback;
    
    // Criar overlay
    const overlay = document.createElement('div');
    overlay.id = 'pdf-language-modal';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        padding: 1rem;
    `;
    
    // Criar container do modal
    const container = document.createElement('div');
    container.style.cssText = `
        background: white;
        border-radius: 1.5rem;
        padding: 2rem;
        max-width: 28rem;
        width: 100%;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        animation: slideUp 0.3s ease-out;
    `;
    
    // Adicionar CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .pdf-lang-btn {
            width: 100%;
            background-color: #2563eb;
            color: white;
            padding: 0.875rem;
            border-radius: 0.75rem;
            font-weight: bold;
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            border: none;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        .pdf-lang-btn:hover {
            background-color: #1d4ed8;
        }
        .pdf-lang-btn-cancel {
            width: 100%;
            margin-top: 1rem;
            background-color: #e2e8f0;
            color: #0f172a;
            padding: 0.875rem;
            border-radius: 0.75rem;
            font-weight: bold;
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            border: none;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        .pdf-lang-btn-cancel:hover {
            background-color: #cbd5e1;
        }
    `;
    if (!document.querySelector('style[data-pdf-modal]')) {
        style.setAttribute('data-pdf-modal', 'true');
        document.head.appendChild(style);
    }
    
    container.innerHTML = `
        <h2 style="font-size: 1.5rem; font-weight: 900; color: #0f172a; margin-bottom: 0.5rem; margin-top: 0;">Select PDF Language</h2>
        <p style="font-size: 0.875rem; color: #475569; margin-bottom: 1.5rem; margin-top: 0.5rem;">Choose the language for the exported PDF:</p>
        
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <button onclick="window.selectPDFLanguage('pt')" class="pdf-lang-btn">🇵🇹 Português</button>
            <button onclick="window.selectPDFLanguage('en')" class="pdf-lang-btn">🇬🇧 English</button>
            <button onclick="window.selectPDFLanguage('es')" class="pdf-lang-btn">🇪🇸 Español</button>
            <button onclick="window.selectPDFLanguage('fr')" class="pdf-lang-btn">🇫🇷 Français</button>
        </div>
        
        <button onclick="document.getElementById('pdf-language-modal').remove(); window.pdfLanguageCallback = null;" class="pdf-lang-btn-cancel">Cancel</button>
    `;
    
    overlay.appendChild(container);
    document.body.appendChild(overlay);
    console.log('[PDF] Modal created and appended to body');
};

window.exportCostsPDF = () => {
    window.showPDFLanguageSelector((lang) => {
        window.generateCostsPDF(lang);
    });
};

window.generateCostsPDF = (lang = 'en') => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 20;
    
    // Função auxiliar para traduzir com fallback
    const translateField = (text, targetLang) => {
        if (!window.translationsData) return text;
        if (window.translationsData[text]) {
            return window.translationsData[text][targetLang] || window.translationsData[text]['en'] || text;
        }
        if (window.translate) {
            return window.translate(text, targetLang);
        }
        return text;
    };
    
    // Traduções para o PDF
    const pdfTexts = {
        title: { pt: "RELATÓRIO DE DESPESAS", en: "EXPENSE REPORT", es: "INFORME DE GASTOS", fr: "RAPPORT DE DÉPENSES" },
        generatedAt: { pt: "Gerado em:", en: "Generated on:", es: "Generado en:", fr: "Généré le:" },
        user: { pt: "Utilizador:", en: "User:", es: "Usuario:", fr: "Utilisateur:" },
        date: { pt: "Data", en: "Date", es: "Fecha", fr: "Date" },
        type: { pt: "Tipo", en: "Type", es: "Tipo", fr: "Type" },
        description: { pt: "Descrição", en: "Description", es: "Descripción", fr: "Description" },
        value: { pt: "Valor (€)", en: "Value (€)", es: "Valor (€)", fr: "Valeur (€)" },
        technician: { pt: "Técnico", en: "Technician", es: "Técnico", fr: "Technicien" },
        total: { pt: "Total:", en: "Total:", es: "Total:", fr: "Total:" }
    };
    
    let dataToExport = costsData;
    if (sessionUser.role === 'ADMIN') {
        const dateFrom = document.getElementById('filter-date-from').value;
        const dateTo = document.getElementById('filter-date-to').value;
        const techFilter = document.getElementById('filter-technician').value;
        
        dataToExport = costsData.filter(c => {
            if (dateFrom && c.date < dateFrom) return false;
            if (dateTo && c.date > dateTo) return false;
            if (techFilter && c.technician !== techFilter) return false;
            return true;
        });
    } else {
        dataToExport = costsData.filter(c => c.technician === sessionUser.name);
    }
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(0, 74, 173);
    doc.text("SOMENGIL", pageWidth / 2, y, { align: "center" });
    
    y += 10;
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(pdfTexts.title[lang], pageWidth / 2, y, { align: "center" });
    
    y += 15;
    doc.setDrawColor(200, 200, 200);
    doc.line(20, y, pageWidth - 20, y);
    
    y += 10;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    const dateFormatted = new Date().toLocaleDateString(lang === 'pt' ? 'pt-PT' : lang === 'en' ? 'en-US' : lang === 'es' ? 'es-ES' : 'fr-FR');
    doc.text(`${pdfTexts.generatedAt[lang]} ${dateFormatted}`, 20, y);
    y += 7;
    doc.text(`${pdfTexts.user[lang]} ${sessionUser.name}`, 20, y);
    y += 15;
    
    // Tabela
    doc.setFont("helvetica", "bold");
    doc.setFillColor(240, 240, 240);
    doc.rect(20, y, pageWidth - 40, 8, "F");
    doc.text(pdfTexts.date[lang], 25, y + 6);
    doc.text(pdfTexts.type[lang], 60, y + 6);
    doc.text(pdfTexts.description[lang], 90, y + 6);
    doc.text(pdfTexts.value[lang], 170, y + 6);
    doc.text(pdfTexts.technician[lang], 195, y + 6);
    y += 12;
    
    doc.setFont("helvetica", "normal");
    let totalValue = 0;
    dataToExport.forEach(item => {
        if (y > 270) { doc.addPage(); y = 20; }
        doc.text(item.date || '---', 25, y);
        doc.text((item.type || '---').substring(0, 15), 60, y);
        doc.text((item.description || '---').substring(0, 20), 90, y);
        doc.text(`${item.value?.toFixed(2) || '0.00'}€`, 170, y);
        doc.text(item.technician || '---', 195, y);
        y += 7;
        totalValue += item.value || 0;
    });
    
    y += 5;
    doc.setFont("helvetica", "bold");
    doc.text(`${pdfTexts.total[lang]} ${totalValue.toFixed(2)}€`, 170, y);
    
    const filename = lang === 'pt' ? `Despesas_${new Date().toISOString().split('T')[0]}.pdf` : 
                     lang === 'en' ? `Expenses_${new Date().toISOString().split('T')[0]}.pdf` :
                     lang === 'es' ? `Gastos_${new Date().toISOString().split('T')[0]}.pdf` :
                     `Depenses_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(filename);
};

// --- MÓDULO DE VOOS ---
window.showFlightModal = () => {
    editingFlightId = null;
    document.getElementById('flight-modal').classList.remove('hidden');
    document.getElementById('flight-form').reset();
    document.getElementById('flight-date').valueAsDate = new Date();
    updateFlightTechnicianList();
};

window.closeFlightModal = () => {
    document.getElementById('flight-modal').classList.add('hidden');
    document.getElementById('flight-form').reset();
    editingFlightId = null;
};

window.updateFlightTechnicianList = () => {
    const select = document.getElementById('flight-technician');
    select.innerHTML = '<option value="">Selecionar...</option>';
    Object.values(USERS).forEach(user => {
        if (user.role === 'TECH') {
            const option = document.createElement('option');
            option.value = user.name;
            option.textContent = user.name;
            select.appendChild(option);
        }
    });
};



const renderFlightsView = () => {
    const filtersContainer = document.getElementById('flight-filters');
    const btnNewFlight = document.getElementById('btn-new-flight');
    
    if (sessionUser.role === 'ADMIN') {
        filtersContainer.classList.remove('hidden');
        btnNewFlight.classList.remove('hidden');
        updateFlightTechnicianFilter();
    } else {
        filtersContainer.classList.add('hidden');
        btnNewFlight.classList.add('hidden');
    }
    renderFlightsTable();
};

const updateFlightTechnicianFilter = () => {
    const select = document.getElementById('filter-flight-technician');
    const techs = new Set(flightsData.map(f => f.technician).filter(Boolean));
    const currentValue = select.value;
    select.innerHTML = '<option value="">Todos</option>';
    techs.forEach(tech => {
        const option = document.createElement('option');
        option.value = tech;
        option.textContent = tech;
        select.appendChild(option);
    });
    select.value = currentValue;
};

window.applyFlightFilters = () => {
    renderFlightsTable();
};

const renderFlightsTable = () => {
    const tbody = document.getElementById('flights-table-body');
    let dataToShow = flightsData;
    
    if (sessionUser.role === 'TECH') {
        dataToShow = flightsData.filter(f => f.technician === sessionUser.name);
    } else if (sessionUser.role === 'ADMIN') {
        const dateFrom = document.getElementById('filter-flight-date-from').value;
        const dateTo = document.getElementById('filter-flight-date-to').value;
        const techFilter = document.getElementById('filter-flight-technician').value;
        const statusFilter = document.getElementById('filter-flight-status').value;
        
        dataToShow = flightsData.filter(f => {
            if (dateFrom && f.date < dateFrom) return false;
            if (dateTo && f.date > dateTo) return false;
            if (techFilter && f.technician !== techFilter) return false;
            if (statusFilter && f.status !== statusFilter) return false;
            return true;
        });
    }
    
    if (dataToShow.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" class="px-8 py-20 text-center text-slate-400 italic">Sem voos registados.</td></tr>`;
        return;
    }
    
    tbody.innerHTML = dataToShow.map(item => {
        const statusColors = {
            'Planeado': 'bg-blue-50 text-blue-600',
            'Confirmado': 'bg-purple-50 text-purple-600',
            'Realizado': 'bg-emerald-50 text-emerald-600',
            'Cancelado': 'bg-red-50 text-red-600'
        };
        const statusClass = statusColors[item.status] || 'bg-slate-50 text-slate-600';
        const editBtn = sessionUser.role === 'ADMIN' ? `<button onclick=\"editFlight('${item.id}')\" title=\"Editar\" class=\"p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 border border-blue-100\"><i data-lucide=\"pencil\" style=\"width:18px\"></i></button>` : '';
        const deleteBtn = sessionUser.role === 'ADMIN' ? `<button onclick=\"deleteFlight('${item.id}')\" class=\"p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 border border-red-100\"><i data-lucide=\"trash-2\" style=\"width:18px\"></i></button>` : '';
        return `
            <tr class=\"hover:bg-blue-50/30 transition-colors\">
                <td class=\"px-8 py-6 font-mono\">${item.date || '---'}</td>
                <td class=\"px-8 py-6 font-mono\">${item.dateArrival || '---'}</td>
                <td class=\"px-8 py-6 font-bold text-slate-700\">${item.airport || '---'}</td>
                <td class=\"px-8 py-6 font-bold text-blue-600\">${item.destination || '---'}</td>
                <td class=\"px-8 py-6 font-mono text-slate-600\">${item.departureTime || '---'}</td>
                <td class=\"px-8 py-6 font-mono text-slate-600\">${item.arrivalTime || '---'}</td>
                <td class=\"px-8 py-6 text-slate-600\">${item.technician || '---'}</td>
                <td class=\"px-8 py-6\"><span class=\"px-3 py-1 rounded-full text-[10px] font-black ${statusClass}\">${item.status || '---'}</span></td>
                <td class=\"px-8 py-6 text-right flex justify-end gap-2\">
                    ${editBtn}
                    ${deleteBtn}
                </td>
            </tr>
        `;
    }).join('');
    
    lucide.createIcons();
};

window.deleteFlight = async (id) => {
    if (confirm("Apagar este voo?")) {
        try {
            await window.fbDeleteDoc(window.fbDoc(window.db, 'artifacts', window.appId, 'public', 'data', 'flights', id));
        } catch (err) {
            alert("Erro ao apagar voo.");
        }
    }
};

window.exportFlightsPDF = () => {
    window.showPDFLanguageSelector((lang) => {
        window.generateFlightsPDF(lang);
    });
};

window.generateFlightsPDF = (lang = 'en') => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 20;
    
    // Função auxiliar para traduzir com fallback
    const translateField = (text, targetLang) => {
        if (!window.translationsData) return text;
        if (window.translationsData[text]) {
            return window.translationsData[text][targetLang] || window.translationsData[text]['en'] || text;
        }
        if (window.translate) {
            return window.translate(text, targetLang);
        }
        return text;
    };
    
    // Traduções para o PDF
    const pdfTexts = {
        title: { pt: "RELATÓRIO DE VOOS", en: "FLIGHT REPORT", es: "INFORME DE VUELOS", fr: "RAPPORT DE VOLS" },
        generatedAt: { pt: "Gerado em:", en: "Generated on:", es: "Generado en:", fr: "Généré le:" },
        user: { pt: "Utilizador:", en: "User:", es: "Usuario:", fr: "Utilisateur:" },
        date: { pt: "Data", en: "Date", es: "Fecha", fr: "Date" },
        airport: { pt: "Aerop.", en: "Airport", es: "Aeropto.", fr: "Aérop." },
        destination: { pt: "Destino", en: "Destination", es: "Destino", fr: "Destination" },
        departure: { pt: "Partida", en: "Departure", es: "Salida", fr: "Départ" },
        arrival: { pt: "Chegada", en: "Arrival", es: "Llegada", fr: "Arrivée" },
        technician: { pt: "Técnico", en: "Technician", es: "Técnico", fr: "Technicien" },
        status: { pt: "Status", en: "Status", es: "Estado", fr: "Statut" }
    };
    
    let dataToExport = flightsData;
    const dateFrom = document.getElementById('filter-flight-date-from').value;
    const dateTo = document.getElementById('filter-flight-date-to').value;
    const techFilter = document.getElementById('filter-flight-technician').value;
    const statusFilter = document.getElementById('filter-flight-status').value;
    
    dataToExport = flightsData.filter(f => {
        if (dateFrom && f.date < dateFrom) return false;
        if (dateTo && f.date > dateTo) return false;
        if (techFilter && f.technician !== techFilter) return false;
        if (statusFilter && f.status !== statusFilter) return false;
        return true;
    });
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(0, 74, 173);
    doc.text("SOMENGIL", pageWidth / 2, y, { align: "center" });
    
    y += 10;
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(pdfTexts.title[lang], pageWidth / 2, y, { align: "center" });
    
    y += 15;
    doc.setDrawColor(200, 200, 200);
    doc.line(20, y, pageWidth - 20, y);
    
    y += 10;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    const dateFormatted = new Date().toLocaleDateString(lang === 'pt' ? 'pt-PT' : lang === 'en' ? 'en-US' : lang === 'es' ? 'es-ES' : 'fr-FR');
    doc.text(`${pdfTexts.generatedAt[lang]} ${dateFormatted}`, 20, y);
    y += 7;
    doc.text(`${pdfTexts.user[lang]} ${sessionUser.name}`, 20, y);
    y += 15;
    
    // Tabela
    doc.setFont("helvetica", "bold");
    doc.setFillColor(240, 240, 240);
    doc.rect(20, y, pageWidth - 40, 8, "F");
    doc.setFontSize(9);
    doc.text(pdfTexts.date[lang], 22, y + 6);
    doc.text(pdfTexts.airport[lang], 45, y + 6);
    doc.text(pdfTexts.destination[lang], 65, y + 6);
    doc.text(pdfTexts.departure[lang], 100, y + 6);
    doc.text(pdfTexts.arrival[lang], 125, y + 6);
    doc.text(pdfTexts.technician[lang], 150, y + 6);
    doc.text(pdfTexts.status[lang], 180, y + 6);
    y += 12;
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    dataToExport.forEach(item => {
        if (y > 270) { doc.addPage(); y = 20; }
        doc.text(item.date || '---', 22, y);
        doc.text((item.airport || '---').substring(0, 8), 45, y);
        doc.text((item.destination || '---').substring(0, 15), 65, y);
        doc.text(item.departureTime || '---', 100, y);
        doc.text(item.arrivalTime || '---', 125, y);
        doc.text((item.technician || '---').substring(0, 12), 150, y);
        doc.text(item.status || '---', 180, y);
        y += 7;
    });
    
    const filename = lang === 'pt' ? `Voos_${new Date().toISOString().split('T')[0]}.pdf` : 
                     lang === 'en' ? `Flights_${new Date().toISOString().split('T')[0]}.pdf` :
                     lang === 'es' ? `Vuelos_${new Date().toISOString().split('T')[0]}.pdf` :
                     `Vols_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(filename);
};

// --- RENDERIZAÇÃO DA TABELA ---
const renderTable = () => {
    if (!sessionUser) return;
    const tbody = document.getElementById('table-body');
    const theadRow = document.querySelector('thead tr');
    const dataToShow = sessionUser.role === 'ADMIN' 
        ? complianceData 
        : complianceData.filter(d => d.Inst_Technician_Name === sessionUser.name);

    // Update table headers based on user role
    if (theadRow && sessionUser.role === 'TECH') {
        theadRow.innerHTML = `
            <th class="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase">Serial</th>
            <th class="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase">Cliente</th>
            <th class="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase">Data</th>
            <th class="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase">Progresso</th>
            <th class="px-8 py-4 text-right text-[10px] font-black text-slate-400 uppercase">Ações</th>
        `;
    }

    if (dataToShow.length === 0) {
        const colspan = sessionUser.role === 'TECH' ? 5 : 5;
        tbody.innerHTML = `<tr><td colspan="${colspan}" class="px-8 py-20 text-center text-slate-400 italic">${sessionUser.role === 'TECH' ? 'Nenhuma ficha atribuída.' : 'Sem registos encontrados.'}</td></tr>`;
        return;
    }

    tbody.innerHTML = dataToShow.map(item => {
        const prog = calculateTotalProgress(item);
        if (sessionUser.role === 'TECH') {
            return `
                <tr class="hover:bg-blue-50/30 transition-colors">
                    <td class="px-8 py-6 font-mono font-black text-blue-700">${item.Equip_Serial_Number || '---'}</td>
                    <td class="px-8 py-6 text-slate-700">${item.Cust_Name || '---'}</td>
                    <td class="px-8 py-6 text-slate-700 text-sm">${item.Inst_Date ? new Date(item.Inst_Date).toLocaleDateString('pt-PT') : '---'}</td>
                    <td class="px-8 py-6">
                        <div class="flex items-center gap-2">
                            <div class="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div class="h-full ${prog === 100 ? 'bg-emerald-500' : 'bg-blue-500'}" style="width: ${prog}%"></div>
                            </div>
                            <span class="text-[10px] font-bold text-slate-600 min-w-[30px]">${prog}%</span>
                        </div>
                    </td>
                    <td class="px-8 py-6 text-right">
                        <button onclick="editForm('${item.id}')" title="Editar" class="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 border border-blue-100"><i data-lucide="edit" style="width:18px"></i></button>
                    </td>
                </tr>
            `;
        } else {
            return `
                <tr class="hover:bg-blue-50/30 transition-colors">
                    <td class="px-8 py-6 font-mono font-black text-blue-700">${item.Equip_Serial_Number || '---'}</td>
                    <td class="px-8 py-6 text-slate-700">${item.Cust_Name || '---'}</td>
                    <td class="px-8 py-6 text-slate-700">${item.Inst_Technician_Name || '---'}</td>
                    <td class="px-8 py-6">
                        <div class="flex items-center gap-2">
                            <div class="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                                <div class="h-full ${prog === 100 ? 'bg-emerald-500' : 'bg-blue-500'}" style="width: ${prog}%"></div>
                            </div>
                            <span class="text-[10px]">${prog}%</span>
                        </div>
                    </td>
                    <td class="px-8 py-6 text-right flex justify-end gap-2">
                        <button onclick="editForm('${item.id}')" title="Editar" class="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 border border-blue-100"><i data-lucide="search" style="width:18px"></i></button>
                        <button onclick="deleteHandler('${item.id}')" title="Apagar" class="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 border border-red-100"><i data-lucide="trash-2" style="width:18px"></i></button>
                    </td>
                </tr>
            `;
        }
    }).join('');
    lucide.createIcons();
};

const renderDashboard = () => {
    if (!sessionUser) return; // Verificação de segurança
    renderTable();
    
    if (sessionUser.role === 'ADMIN') {
        const activeTechs = new Set(complianceData.map(d => d.Inst_Technician_Name).filter(Boolean)).size;
        const completedInstalls = complianceData.filter(d => d.Inst_Date).length;
        
        const statsContainer = document.querySelector('.flex.justify-between.items-end');
        if (statsContainer && !document.getElementById('stats-cards')) {
            statsContainer.innerHTML = `
                <div class="flex flex-col gap-4 w-full">
                    <div>
                        <h1 class="text-4xl font-black text-slate-900 tracking-tighter">Compliance Central</h1>
                        <p class="text-slate-500 font-medium">Gestão de Fichas Técnicas Somengil.</p>
                    </div>
                    <div class="flex gap-4 flex-col md:flex-row dashboard-header-cards w-full" id="stats-cards">
                        <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 flex-1">
                            <p class="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Técnicos Ativos</p>
                            <p class="text-4xl font-black text-blue-900">${activeTechs}</p>
                        </div>
                        <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border border-emerald-200 flex-1">
                            <p class="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">Instalações</p>
                            <p class="text-4xl font-black text-emerald-900">${completedInstalls}</p>
                        </div>
                        <button onclick="createNewForm()" class="bg-[#0f172a] text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-lg hover:bg-black transition-all flex-1 justify-center">
                            <i data-lucide="plus"></i> Nova Ficha
                        </button>
                    </div>
                </div>
            `;
        } else if (!statsContainer) {
            return;
        } else {
            // Atualizar apenas os números se já existem os cards
            const statsCard1 = document.querySelector('[id="stats-cards"] > div:nth-child(1) p:last-child');
            const statsCard2 = document.querySelector('[id="stats-cards"] > div:nth-child(2) p:last-child');
            if (statsCard1) statsCard1.textContent = activeTechs;
            if (statsCard2) statsCard2.textContent = completedInstalls;
        }
        lucide.createIcons();
    } else if (sessionUser.role === 'TECH') {
        // Dashboard para TECH - Mostrar apenas fichas atribuídas
        const myForms = complianceData.filter(d => d.Inst_Technician_Name === sessionUser.name);
        const completedForms = myForms.filter(d => calculateTotalProgress(d) === 100).length;
        
        const statsContainer = document.querySelector('.flex.justify-between.items-end');
        if (statsContainer && !document.getElementById('stats-cards')) {
            statsContainer.innerHTML = `
                <div class="flex flex-col gap-4 w-full">
                    <div>
                        <h1 class="text-3xl font-black text-slate-900 tracking-tighter">Minhas Fichas</h1>
                        <p class="text-slate-500 font-medium">Fichas de Instalação Somengil atribuídas a si.</p>
                    </div>
                    <div class="flex gap-4 flex-col md:flex-row dashboard-header-cards w-full" id="stats-cards">
                        <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 flex-1">
                            <p class="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Total de Fichas</p>
                            <p class="text-4xl font-black text-blue-900">${myForms.length}</p>
                        </div>
                        <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border border-emerald-200 flex-1">
                            <p class="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">Concluídas</p>
                            <p class="text-4xl font-black text-emerald-900">${completedForms}</p>
                        </div>
                        <div class="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-200 flex-1">
                            <p class="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-2">Em Progresso</p>
                            <p class="text-4xl font-black text-amber-900">${myForms.length - completedForms}</p>
                        </div>
                    </div>
                </div>
            `;
        } else if (!statsContainer) {
            return;
        } else {
            // Atualizar apenas os números se já existem os cards
            const statsCard1 = document.querySelector('[id="stats-cards"] > div:nth-child(1) p:last-child');
            const statsCard2 = document.querySelector('[id="stats-cards"] > div:nth-child(2) p:last-child');
            const statsCard3 = document.querySelector('[id="stats-cards"] > div:nth-child(3) p:last-child');
            if (statsCard1) statsCard1.textContent = myForms.length;
            if (statsCard2) statsCard2.textContent = completedForms;
            if (statsCard3) statsCard3.textContent = myForms.length - completedForms;
        }
        lucide.createIcons();
    }
};

// --- PROGRAM DATA ENTRY MANAGEMENT ---
window.addProgramDataEntry = () => {
    if (!editingDoc.programData) editingDoc.programData = [];
    editingDoc.programData.push({ 
        Data_Wash_Time: '', 
        Data_Rinse_Time: '', 
        Data_Spin_Time: '', 
        Data_Wash_Temperature: '', 
        Data_Rinse_Temperature: '', 
        Data_Final_Ventilation: '', 
        Data_Open_Door_Ventilation: '' 
    });
    renderForm();
    lucide.createIcons();
};

window.removeProgramDataEntry = (idx) => {
    editingDoc.programData.splice(idx, 1);
    renderForm();
    lucide.createIcons();
};

window.updateProgramDataField = (idx, field, value) => {
    if (!editingDoc.programData) editingDoc.programData = [];
    editingDoc.programData[idx] = editingDoc.programData[idx] || {};
    editingDoc.programData[idx][field] = value;
};

// --- TRAINING CLEANING ENTRY MANAGEMENT ---
window.addTrainingCleaningEntry = () => {
    if (!editingDoc.trainingCleaning) editingDoc.trainingCleaning = [];
    editingDoc.trainingCleaning.push({ name: '', position: '', phone: '', email: '' });
    renderForm();
    lucide.createIcons();
};

window.removeTrainingCleaningEntry = (idx) => {
    if (editingDoc.trainingCleaning) {
        editingDoc.trainingCleaning.splice(idx, 1);
        renderForm();
        lucide.createIcons();
    }
};

window.updateTrainingCleaningField = (idx, field, value) => {
    if (!editingDoc.trainingCleaning) editingDoc.trainingCleaning = [];
    editingDoc.trainingCleaning[idx] = editingDoc.trainingCleaning[idx] || {};
    editingDoc.trainingCleaning[idx][field] = value;
};

// --- TRAINING WASHING ENTRY MANAGEMENT ---
window.addTrainingWashingEntry = () => {
    if (!editingDoc.trainingWashing) editingDoc.trainingWashing = [];
    editingDoc.trainingWashing.push({ name: '', position: '', phone: '', email: '' });
    renderForm();
    lucide.createIcons();
};

window.removeTrainingWashingEntry = (idx) => {
    if (editingDoc.trainingWashing) {
        editingDoc.trainingWashing.splice(idx, 1);
        renderForm();
        lucide.createIcons();
    }
};

window.updateTrainingWashingField = (idx, field, value) => {
    if (!editingDoc.trainingWashing) editingDoc.trainingWashing = [];
    editingDoc.trainingWashing[idx] = editingDoc.trainingWashing[idx] || {};
    editingDoc.trainingWashing[idx][field] = value;
};

// --- PROGRAM & UTENSIL ENTRY MANAGEMENT ---
window.addProgramEntry = () => {
    if (!editingDoc.programs) editingDoc.programs = [];
    editingDoc.programs.push({ number: '', photos: [] });
    renderForm();
    lucide.createIcons();
};

window.removeProgramEntry = (idx) => {
    editingDoc.programs.splice(idx, 1);
    renderForm();
    lucide.createIcons();
};

window.updateProgramField = (idx, field, value) => {
    if (!editingDoc.programs) editingDoc.programs = [];
    editingDoc.programs[idx] = editingDoc.programs[idx] || {};
    editingDoc.programs[idx][field] = value;
};

window.addProgramPhoto = (idx) => {
    if (!editingDoc.programs) editingDoc.programs = [];
    if (!editingDoc.programs[idx].photos) editingDoc.programs[idx].photos = [];
    editingDoc.programs[idx].photos.push('');
    renderForm();
    lucide.createIcons();
};

window.removeProgramPhoto = (idx, photoIdx) => {
    if (editingDoc.programs && editingDoc.programs[idx] && editingDoc.programs[idx].photos) {
        editingDoc.programs[idx].photos.splice(photoIdx, 1);
        renderForm();
        lucide.createIcons();
    }
};

window.updateProgramPhoto = (idx, photoIdx, input) => {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (!editingDoc.programs) editingDoc.programs = [];
            if (!editingDoc.programs[idx].photos) editingDoc.programs[idx].photos = [];
            editingDoc.programs[idx].photos[photoIdx] = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
};

window.addUtensilEntry = () => {
    if (!editingDoc.utensils) editingDoc.utensils = [];
    editingDoc.utensils.push({ description: '', photos: [] });
    renderForm();
    lucide.createIcons();
};

window.removeUtensilEntry = (idx) => {
    editingDoc.utensils.splice(idx, 1);
    renderForm();
    lucide.createIcons();
};

window.updateUtensilField = (idx, field, value) => {
    if (!editingDoc.utensils) editingDoc.utensils = [];
    editingDoc.utensils[idx] = editingDoc.utensils[idx] || {};
    editingDoc.utensils[idx][field] = value;
};

window.addUtensilPhoto = (idx) => {
    if (!editingDoc.utensils) editingDoc.utensils = [];
    if (!editingDoc.utensils[idx].photos) editingDoc.utensils[idx].photos = [];
    editingDoc.utensils[idx].photos.push('');
    renderForm();
    lucide.createIcons();
};

window.removeUtensilPhoto = (idx, photoIdx) => {
    if (editingDoc.utensils && editingDoc.utensils[idx] && editingDoc.utensils[idx].photos) {
        editingDoc.utensils[idx].photos.splice(photoIdx, 1);
        renderForm();
        lucide.createIcons();
    }
};

window.updateUtensilPhoto = (idx, photoIdx, input) => {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (!editingDoc.utensils) editingDoc.utensils = [];
            if (!editingDoc.utensils[idx].photos) editingDoc.utensils[idx].photos = [];
            editingDoc.utensils[idx].photos[photoIdx] = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
};

// --- LÓGICA DO FORMULÁRIO ---
window.createNewForm = () => {
    editingDoc = { id: crypto.randomUUID() };
    if (sessionUser.role === 'TECH') editingDoc.Inst_Technician_Name = sessionUser.name;
    renderForm();
    setView('form');
};

window.editForm = (id) => {
    editingDoc = complianceData.find(d => d.id === id);
    renderForm();
    setView('form');
};

// --- SIGNATURE PAD HELPERS ---
window.initializeSignaturePads = () => {
    // Technician signature pad
    const techCanvasEl = document.getElementById('signature-technician-canvas');
    if (techCanvasEl && !signaturePadTechnician) {
        signaturePadTechnician = new SignaturePad(techCanvasEl, {
            penColor: '#0f172a',
            backgroundColor: '#ffffff',
            minWidth: 1,
            maxWidth: 2.5
        });
    }

    // Customer signature pad
    const custCanvasEl = document.getElementById('signature-customer-canvas');
    if (custCanvasEl && !signaturePadCustomer) {
        signaturePadCustomer = new SignaturePad(custCanvasEl, {
            penColor: '#0f172a',
            backgroundColor: '#ffffff',
            minWidth: 1,
            maxWidth: 2.5
        });
    }

    // Load existing signatures if available
    if (editingDoc && editingDoc.Signature_Technician && signaturePadTechnician) {
        const img = new Image();
        img.src = editingDoc.Signature_Technician;
        img.onload = () => {
            signaturePadTechnician.fromDataURL(editingDoc.Signature_Technician);
        };
    }
    if (editingDoc && editingDoc.Signature_Customer && signaturePadCustomer) {
        const img = new Image();
        img.src = editingDoc.Signature_Customer;
        img.onload = () => {
            signaturePadCustomer.fromDataURL(editingDoc.Signature_Customer);
        };
    }
};

window.clearSignatureTechnician = () => {
    if (signaturePadTechnician) signaturePadTechnician.clear();
};

window.clearSignatureCustomer = () => {
    if (signaturePadCustomer) signaturePadCustomer.clear();
};

window.saveSignatureTechnician = () => {
    if (signaturePadTechnician && !signaturePadTechnician.isEmpty()) {
        editingDoc.Signature_Technician = signaturePadTechnician.toDataURL();
    }
};

window.saveSignatureCustomer = () => {
    if (signaturePadCustomer && !signaturePadCustomer.isEmpty()) {
        editingDoc.Signature_Customer = signaturePadCustomer.toDataURL();
    }
};

// Function to get clean field label by removing section-specific prefixes
window.getFieldLabel = (fieldName, sectionId) => {
    // First, check if there's a translation for this field
    if (window.uiTranslations && window.uiTranslations[fieldName]) {
        return window.uiTranslations[fieldName][window.currentLanguage] || window.uiTranslations[fieldName]['en'];
    }
    
    let label = fieldName.replace(/_/g, ' ');
    
    // Define prefix patterns to remove based on section
    const prefixPatterns = {
        's1_1': ['INST '],  // 1.1 - Installation Responsibility
        's1_2': ['CUST '],  // 1.2 - Customer Identification
        's1_3': ['SVC '],  // 1.3 - Service Identification
        's1_4': ['EQUIP '],  // 1.4 - Equipment and Accessories Identification
        's1_5': ['EXTRA '],  // 1.5 - EXTRAS
        's2': ['DOC '],  // 2 - Documentation
        's3': ['TRAIN WASH WHO ', 'TRAIN WASH NO ', 'TRAIN WASH '],  // 3 - Training (washing)
        's4': ['TRAIN CLEAN WHO ', 'TRAIN CLEAN NO ', 'TRAIN CLEAN '],  // 4 - Training (cleaning)
        's5': ['MEAS ', 'MEAS CONSUMPTION '],  // 5 - Measurements
        's6': ['WASHTEST '],  // 6 - Washing
        's7': ['PREVMAINT '],  // 7 - Preventive Maintenance
        's8': ['PROG TRAINING WHO ', 'PROG TRAINING NO ', 'PROG TRAINING '],  // 8 - Programming
        's10': ['DATA '],  // 10 - Program Data
        's12': ['EVAL '],  // 12 - Points to evaluate
        's13': ['CONS ', 'THERMAL ', 'RELAY '],  // 13 - Consumption
    };
    
    // Get the patterns for this section
    const patterns = prefixPatterns[sectionId] || [];
    
    // Remove the matching prefix
    for (const pattern of patterns) {
        if (label.toUpperCase().startsWith(pattern)) {
            label = label.substring(pattern.length);
            break;
        }
    }
    
    // Clean up special cases
    label = label.replace(/^WHO /, '').trim();
    label = label.replace(/No Explain Why/i, 'IF NO,  EXPLAIN WHY');
    if (!label.includes('IF NO,')) {
        label = label.replace(/Explain Why/i, 'IF NO, EXPLAIN WHY');
    }
    label = label.replace(/DAILY YES NO/, 'Daily Training');
    
    return label;
};

// Constants for form rendering (outside renderForm so they're accessible)
const EQUIP_MODEL_OPTIONS = ["MWS200", "MWS300", "MWS500", "MWS700", "MWS715", "Outro"];
const COUNTRY_LIST = [
    "Portugal", "Espanha", "França", "Alemanha", "Itália", "Reino Unido", "Irlanda", "Bélgica", "Holanda", "Luxemburgo", "Suíça", "Áustria", "Polónia", "República Checa", "Hungria", "Roménia", "Bulgária", "Grécia", "Turquia", "Estados Unidos", "Brasil", "Angola", "Moçambique", "Cabo Verde", "Outros"
];

// Section 12 - Points to Evaluate dropdown options
const EVAL_DROPDOWN_OPTIONS = {
    "Eval_Machine_Type": ["Left", "Right"],
    "Eval_Heating": ["Steam", "Electrical"],
    "Eval_Assembly": ["Disassembled", "Assembled"],
    "Eval_Language_Console": ["PT", "HR", "FR", "RU", "CZ", "PL", "IT", "RO", "NO", "DE", "ES", "EV", "HU", "DA", "EN", "FI", "LT", "ZH"],
    "Eval_Unit_Setpoint_Temperature": ["°C", "°F"]
};

// Fields that should have Yes/No buttons in section 12
const EVAL_YESNO_FIELDS = [
    "Eval_General_Condition", "Eval_Sensor_Level_Tank", "Eval_Tank_Boiler_Solenoid_Valve", 
    "Eval_EV_Steam_Vat_Boiler", "Eval_Detergent_Dispenser_Dryer", "Eval_Sensor_Safety_Interlock", 
    "Eval_Inductive_Position_Sensor", "Eval_Unit_Parameters_Post_Discharge", "Eval_Drive_Parameters_Reboot", 
    "Eval_Direction_Rotation_Basket", "Eval_Wash_Rinse_Injectors", "Eval_Screw_Tightening_Rinsing_Pump", 
    "Eval_Console_Calibration_Procedure"
];

const RATING_FIELDS = {
    "WashTest_Quality_Rating": [
        { value: "very bad", label: "😡 Muito Mau" },
        { value: "bad", label: "😕 Mau" },
        { value: "good", label: "🙂 Bom" },
        { value: "very good", label: "😃 Muito Bom" }
    ]
};

// --- FIELD ACCESS CONTROL ---
// Fields that TECH users should not edit (read-only for TECH)
const READONLY_FOR_TECH = [
    "Inst_Company",
    "Inst_Status_Planned_NotPlanned",
    "Svc_Installation",
    "Svc_Preventive_Maintenance",
    "Svc_Corrective_Maintenance",
    "Svc_Warranty",
    "Doc_Manual_Delivered_Explained"
];

const isFieldReadOnly = (fieldName) => {
    if (sessionUser && sessionUser.role === 'TECH') {
        return READONLY_FOR_TECH.includes(fieldName);
    }
    return false;
};

const renderForm = () => {
    const container = document.getElementById('form-sections-container');
    const sidebarContainer = document.getElementById('sidebar-sections');

    // Field type configurations
    const YESNO_BUTTON_FIELDS = [
        "Equip_Delivered_Yes_No",
        "Train_Wash_Daily_Yes_No",
        "Train_Clean_Daily_Yes_No",
        "PrevMaint_Training_Yes_No",
        "Prog_Training_Yes_No",
        "Machine_Programmed_Yes_No",
        "Machine_Programmed_For_Utensils",
        "WashTest_Performed_Yes_No",
        "EXTRA_SDS",
        "EXTRA_DRD",
        "EXTRA_DTC",
        "EXTRA_CRE_DRD",
        "EXTRA_IVS_DRD",
        "EXTRA_EFS",
        "EXTRA_EXD",
        "EXTRA_HMI",
        "EXTRA_STM",
        "Inst_Status_Planned_NotPlanned",
        "Svc_Installation",
        "Svc_Preventive_Maintenance",
        "Svc_Corrective_Maintenance",
        "Svc_Warranty",
        "Doc_Manual_Delivered_Explained",
        "Status_Installation_Training_Completed"
    ];
    const YESNO_DROPDOWN_FIELDS = [];
    const TECHNICIAN_FIELD = "Inst_Technician_Name";
    const getTechnicianOptions = () => {
        return Object.values(USERS)
            .filter(u => u.role === "TECH")
            .map(u => `<option value="${u.name}">${u.name}</option>`)
            .join("");
    };
    container.innerHTML = FORM_STRUCTURE.map(section => {
        const prog = calculateProgress(section);
        return `
            <div id="${section.id}" class="form-card scroll-mt-32">
                <div class="flex justify-between items-center mb-8 border-b pb-2">
                    <h3 class="text-xs font-black text-blue-600 uppercase tracking-widest">${section.label}</h3>
                    <div class="flex items-center gap-2">
                        <div class="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div class="h-full bg-blue-500" style="width: ${prog}%"></div>
                        </div>
                        <span class="text-[10px] font-black text-slate-400">${prog}%</span>
                    </div>
                </div>
                ${section.specialType === 'training_washing_section' ? `
                    <div class="space-y-12">
                        <!-- Daily Training Field -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="text-[10px] font-black text-slate-400 uppercase block pl-1 mb-2 tracking-wider">${getFieldLabel('Train_Wash_Daily_Yes_No', section.id)}</label>
                                <div class="yes-no-buttons">
                                    <button type="button" class="btn-yes ${editingDoc['Train_Wash_Daily_Yes_No'] === 'Sim' ? 'active' : ''}" onclick="updateDocField('Train_Wash_Daily_Yes_No', 'Sim')">YES</button>
                                    <button type="button" class="btn-no ${editingDoc['Train_Wash_Daily_Yes_No'] === 'Não' ? 'active' : ''}" onclick="updateDocField('Train_Wash_Daily_Yes_No', 'Não')">NO</button>
                                </div>
                            </div>
                            <div>
                                <label class="text-[10px] font-black text-slate-400 uppercase block pl-1 mb-2 tracking-wider">${getFieldLabel('Train_Wash_No_Explain_Why', section.id)}</label>
                                <textarea class="form-input" placeholder="Enter reason if no training..." onchange="updateDocField('Train_Wash_No_Explain_Why', this.value)">${editingDoc['Train_Wash_No_Explain_Why'] || ''}</textarea>
                            </div>
                        </div>

                        <!-- Training Entries Section -->
                        <div class="border-t pt-8">
                            <div class="flex justify-between items-center mb-6">
                                <h4 class="text-sm font-black text-slate-600 uppercase tracking-wide">Training Personnel</h4>
                                <button type="button" onclick="addTrainingWashingEntry()" class="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 flex items-center gap-2">
                                    <i data-lucide="plus" class="w-4 h-4"></i> Add Person
                                </button>
                            </div>
                            <div id="training-washing-container" class="space-y-6">
                                ${(editingDoc.trainingWashing || []).map((person, idx) => `
                                    <div class="bg-slate-50 rounded-lg p-4 border border-slate-200">
                                        <div class="flex justify-between items-start mb-4">
                                            <span class="text-sm font-bold text-slate-600">Person ${idx + 1}</span>
                                            <button type="button" onclick="removeTrainingWashingEntry(${idx})" class="text-red-500 hover:text-red-700 font-bold text-sm">
                                                <i data-lucide="trash-2" class="w-4 h-4"></i>
                                            </button>
                                        </div>
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label class="text-[10px] font-black text-slate-400 uppercase block mb-2">Name</label>
                                                <input type="text" class="form-input" value="${person.name || ''}" onchange="updateTrainingWashingField(${idx}, 'name', this.value)" placeholder="Enter name">
                                            </div>
                                            <div>
                                                <label class="text-[10px] font-black text-slate-400 uppercase block mb-2">Position</label>
                                                <input type="text" class="form-input" value="${person.position || ''}" onchange="updateTrainingWashingField(${idx}, 'position', this.value)" placeholder="Enter position">
                                            </div>
                                            <div>
                                                <label class="text-[10px] font-black text-slate-400 uppercase block mb-2">Phone</label>
                                                <input type="tel" class="form-input" value="${person.phone || ''}" onchange="updateTrainingWashingField(${idx}, 'phone', this.value)" placeholder="Enter phone">
                                            </div>
                                            <div>
                                                <label class="text-[10px] font-black text-slate-400 uppercase block mb-2">Email</label>
                                                <input type="email" class="form-input" value="${person.email || ''}" onchange="updateTrainingWashingField(${idx}, 'email', this.value)" placeholder="Enter email">
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                ` : section.specialType === 'training_cleaning_section' ? `
                    <div class="space-y-12">
                        <!-- Daily Training Field -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="text-[10px] font-black text-slate-400 uppercase block pl-1 mb-2 tracking-wider">${getFieldLabel('Train_Clean_Daily_Yes_No', section.id)}</label>
                                <div class="yes-no-buttons">
                                    <button type="button" class="btn-yes ${editingDoc['Train_Clean_Daily_Yes_No'] === 'Sim' ? 'active' : ''}" onclick="updateDocField('Train_Clean_Daily_Yes_No', 'Sim')">YES</button>
                                    <button type="button" class="btn-no ${editingDoc['Train_Clean_Daily_Yes_No'] === 'Não' ? 'active' : ''}" onclick="updateDocField('Train_Clean_Daily_Yes_No', 'Não')">NO</button>
                                </div>
                            </div>
                            <div>
                                <label class="text-[10px] font-black text-slate-400 uppercase block pl-1 mb-2 tracking-wider">${getFieldLabel('Train_Clean_No_Explain_Why', section.id)}</label>
                                <textarea class="form-input" placeholder="Enter reason if no training..." onchange="updateDocField('Train_Clean_No_Explain_Why', this.value)">${editingDoc['Train_Clean_No_Explain_Why'] || ''}</textarea>
                            </div>
                        </div>

                        <!-- Training Entries Section -->
                        <div class="border-t pt-8">
                            <div class="flex justify-between items-center mb-6">
                                <h4 class="text-sm font-black text-slate-600 uppercase tracking-wide">Training Personnel</h4>
                                <button type="button" onclick="addTrainingCleaningEntry()" class="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 flex items-center gap-2">
                                    <i data-lucide="plus" class="w-4 h-4"></i> Add Person
                                </button>
                            </div>
                            <div id="training-cleaning-container" class="space-y-6">
                                ${(editingDoc.trainingCleaning || []).map((person, idx) => `
                                    <div class="bg-slate-50 rounded-lg p-4 border border-slate-200">
                                        <div class="flex justify-between items-start mb-4">
                                            <span class="text-sm font-bold text-slate-600">Person ${idx + 1}</span>
                                            <button type="button" onclick="removeTrainingCleaningEntry(${idx})" class="text-red-500 hover:text-red-700 font-bold text-sm">
                                                <i data-lucide="trash-2" class="w-4 h-4"></i>
                                            </button>
                                        </div>
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label class="text-[10px] font-black text-slate-400 uppercase block mb-2">Name</label>
                                                <input type="text" class="form-input" value="${person.name || ''}" onchange="updateTrainingCleaningField(${idx}, 'name', this.value)" placeholder="Enter name">
                                            </div>
                                            <div>
                                                <label class="text-[10px] font-black text-slate-400 uppercase block mb-2">Position</label>
                                                <input type="text" class="form-input" value="${person.position || ''}" onchange="updateTrainingCleaningField(${idx}, 'position', this.value)" placeholder="Enter position">
                                            </div>
                                            <div>
                                                <label class="text-[10px] font-black text-slate-400 uppercase block mb-2">Phone</label>
                                                <input type="tel" class="form-input" value="${person.phone || ''}" onchange="updateTrainingCleaningField(${idx}, 'phone', this.value)" placeholder="Enter phone">
                                            </div>
                                            <div>
                                                <label class="text-[10px] font-black text-slate-400 uppercase block mb-2">Email</label>
                                                <input type="email" class="form-input" value="${person.email || ''}" onchange="updateTrainingCleaningField(${idx}, 'email', this.value)" placeholder="Enter email">
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                ` : section.specialType === 'program_section' ? `
                    <div class="space-y-12">
                        <!-- Machine Programmed Fields -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            ${section.fields.map(field => {
                                const yesActive = editingDoc[field] === 'Sim' ? 'active' : '';
                                const noActive = editingDoc[field] === 'Não' ? 'active' : '';
                                return `
                                    <div>
                                        <label class="text-[10px] font-black text-slate-400 uppercase block pl-1 mb-2 tracking-wider">${getFieldLabel(field, section.id)}</label>
                                        <div class="yes-no-buttons">
                                            <button type="button" class="btn-yes ${yesActive}" data-field="${field}" data-value="Sim" onclick="updateDocField('${field}', 'Sim')">YES</button>
                                            <button type="button" class="btn-no ${noActive}" data-field="${field}" data-value="Não" onclick="updateDocField('${field}', 'Não')">NO</button>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>

                        <!-- Programs Section -->
                        <div class="border-t pt-8">
                            <div class="flex justify-between items-center mb-6">
                                <h4 class="text-sm font-black text-slate-600 uppercase tracking-wide">Program Entries</h4>
                                <button type="button" onclick="addProgramEntry()" class="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 flex items-center gap-2">
                                    <i data-lucide="plus" class="w-4 h-4"></i> Add Program
                                </button>
                            </div>
                            <div id="programs-container" class="space-y-6">
                                ${(editingDoc.programs || []).map((prog, idx) => `
                                    <div class="bg-slate-50 rounded-lg p-4 border border-slate-200">
                                        <div class="flex justify-between items-start mb-4">
                                            <span class="text-sm font-bold text-slate-600">Program ${idx + 1}</span>
                                            <button type="button" onclick="removeProgramEntry(${idx})" class="text-red-500 hover:text-red-700 font-bold text-sm">
                                                <i data-lucide="trash-2" class="w-4 h-4"></i>
                                            </button>
                                        </div>
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label class="text-[10px] font-black text-slate-400 uppercase block mb-2">Program Number</label>
                                                <input type="text" class="form-input" value="${prog.number || ''}" onchange="updateProgramField(${idx}, 'number', this.value)" placeholder="Enter program number">
                                            </div>
                                        </div>
                                        <div class="mb-4">
                                            <label class="text-[10px] font-black text-slate-400 uppercase block mb-2">Photos (Max 3)</label>
                                            <div class="space-y-2" id="program-photos-${idx}">
                                                ${(prog.photos || []).map((photo, photoIdx) => `
                                                    <div class="flex items-end gap-2">
                                                        <input type="file" accept="image/*" class="flex-1 form-input" onchange="updateProgramPhoto(${idx}, ${photoIdx}, this)">
                                                        <button type="button" onclick="removeProgramPhoto(${idx}, ${photoIdx})" class="px-3 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 font-bold text-sm">Remove</button>
                                                    </div>
                                                    ${photo ? `<div class="relative inline-block"><img src="${photo}" alt="Program photo" class="w-20 h-20 object-cover rounded"><button type="button" onclick="removeProgramPhoto(${idx}, ${photoIdx})" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">×</button></div>` : ''}
                                                `).join('')}
                                            </div>
                                            ${(prog.photos || []).length < 3 ? `
                                                <button type="button" onclick="addProgramPhoto(${idx})" class="mt-2 text-blue-600 hover:text-blue-700 font-bold text-sm flex items-center gap-1">
                                                    <i data-lucide="plus" class="w-4 h-4"></i> Add Photo
                                                </button>
                                            ` : ''}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Utensils Section -->
                        <div class="border-t pt-8">
                            <div class="flex justify-between items-center mb-6">
                                <h4 class="text-sm font-black text-slate-600 uppercase tracking-wide">Utensils Entries</h4>
                                <button type="button" onclick="addUtensilEntry()" class="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 flex items-center gap-2">
                                    <i data-lucide="plus" class="w-4 h-4"></i> Add Utensils
                                </button>
                            </div>
                            <div id="utensils-container" class="space-y-6">
                                ${(editingDoc.utensils || []).map((utensil, idx) => `
                                    <div class="bg-slate-50 rounded-lg p-4 border border-slate-200">
                                        <div class="flex justify-between items-start mb-4">
                                            <span class="text-sm font-bold text-slate-600">Utensil Set ${idx + 1}</span>
                                            <button type="button" onclick="removeUtensilEntry(${idx})" class="text-red-500 hover:text-red-700 font-bold text-sm">
                                                <i data-lucide="trash-2" class="w-4 h-4"></i>
                                            </button>
                                        </div>
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label class="text-[10px] font-black text-slate-400 uppercase block mb-2">Description Trolley</label>
                                                <input type="text" class="form-input" value="${utensil.description || ''}" onchange="updateUtensilField(${idx}, 'description', this.value)" placeholder="Enter trolley description">
                                            </div>
                                        </div>
                                        <div class="mb-4">
                                            <label class="text-[10px] font-black text-slate-400 uppercase block mb-2">Photos</label>
                                            <div class="space-y-2" id="utensil-photos-${idx}">
                                                ${(utensil.photos || []).map((photo, photoIdx) => `
                                                    <div class="flex items-end gap-2">
                                                        <input type="file" accept="image/*" class="flex-1 form-input" onchange="updateUtensilPhoto(${idx}, ${photoIdx}, this)">
                                                        <button type="button" onclick="removeUtensilPhoto(${idx}, ${photoIdx})" class="px-3 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 font-bold text-sm">Remove</button>
                                                    </div>
                                                    ${photo ? `<div class="relative inline-block"><img src="${photo}" alt="Utensil photo" class="w-20 h-20 object-cover rounded"><button type="button" onclick="removeUtensilPhoto(${idx}, ${photoIdx})" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">×</button></div>` : ''}
                                                `).join('')}
                                            </div>
                                            <button type="button" onclick="addUtensilPhoto(${idx})" class="mt-2 text-blue-600 hover:text-blue-700 font-bold text-sm flex items-center gap-1">
                                                <i data-lucide="plus" class="w-4 h-4"></i> Add Photo
                                            </button>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                ` : section.specialType === 'program_data_section' ? `
                    <div class="space-y-8">
                        <div class="flex justify-between items-center mb-6">
                            <h4 class="text-sm font-black text-slate-600 uppercase tracking-wide">Program Data Entries</h4>
                            <button type="button" onclick="addProgramDataEntry()" class="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 flex items-center gap-2">
                                <i data-lucide="plus" class="w-4 h-4"></i> Add Program Data
                            </button>
                        </div>
                        <div id="program-data-container" class="space-y-6">
                            ${(editingDoc.programData || []).map((programData, idx) => `
                                <div class="bg-slate-50 rounded-lg p-4 border border-slate-200">
                                    <div class="flex justify-between items-start mb-4">
                                        <span class="text-sm font-bold text-slate-600">Program Data ${idx + 1}</span>
                                        <button type="button" onclick="removeProgramDataEntry(${idx})" class="text-red-500 hover:text-red-700 font-bold text-sm">
                                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                                        </button>
                                    </div>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label class="text-[10px] font-black text-slate-400 uppercase block mb-2">Wash Time</label>
                                            <input type="text" class="form-input" value="${programData.Data_Wash_Time || ''}" onchange="updateProgramDataField(${idx}, 'Data_Wash_Time', this.value)" placeholder="Enter wash time">
                                        </div>
                                        <div>
                                            <label class="text-[10px] font-black text-slate-400 uppercase block mb-2">Rinse Time</label>
                                            <input type="text" class="form-input" value="${programData.Data_Rinse_Time || ''}" onchange="updateProgramDataField(${idx}, 'Data_Rinse_Time', this.value)" placeholder="Enter rinse time">
                                        </div>
                                        <div>
                                            <label class="text-[10px] font-black text-slate-400 uppercase block mb-2">Spin Time</label>
                                            <input type="text" class="form-input" value="${programData.Data_Spin_Time || ''}" onchange="updateProgramDataField(${idx}, 'Data_Spin_Time', this.value)" placeholder="Enter spin time">
                                        </div>
                                        <div>
                                            <label class="text-[10px] font-black text-slate-400 uppercase block mb-2">Wash Temperature</label>
                                            <input type="text" class="form-input" value="${programData.Data_Wash_Temperature || ''}" onchange="updateProgramDataField(${idx}, 'Data_Wash_Temperature', this.value)" placeholder="Enter wash temperature">
                                        </div>
                                        <div>
                                            <label class="text-[10px] font-black text-slate-400 uppercase block mb-2">Rinse Temperature</label>
                                            <input type="text" class="form-input" value="${programData.Data_Rinse_Temperature || ''}" onchange="updateProgramDataField(${idx}, 'Data_Rinse_Temperature', this.value)" placeholder="Enter rinse temperature">
                                        </div>
                                        <div>
                                            <label class="text-[10px] font-black text-slate-400 uppercase block mb-2">Final Ventilation</label>
                                            <input type="text" class="form-input" value="${programData.Data_Final_Ventilation || ''}" onchange="updateProgramDataField(${idx}, 'Data_Final_Ventilation', this.value)" placeholder="Enter final ventilation">
                                        </div>
                                        <div>
                                            <label class="text-[10px] font-black text-slate-400 uppercase block mb-2">Open Door Ventilation</label>
                                            <input type="text" class="form-input" value="${programData.Data_Open_Door_Ventilation || ''}" onchange="updateProgramDataField(${idx}, 'Data_Open_Door_Ventilation', this.value)" placeholder="Enter open door ventilation">
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : section.specialType === 'consumption_measurements_section' ? `
                    <div class="space-y-8">
                        <!-- Table 1: Tension Tests -->
                        <div class="overflow-x-auto">
                            <table class="w-full border-collapse border border-slate-300" style="min-width: 100%; table-layout: fixed;">
                                <thead>
                                    <tr class="bg-blue-100">
                                        <th class="border border-slate-300 px-2 md:px-3 py-3 text-left text-sm md:text-xs font-bold">Tension in the tests</th>
                                        <th class="border border-slate-300 px-2 md:px-3 py-3 text-center text-sm md:text-xs font-bold">Value (V)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-sm md:text-xs">Tension in the tests</td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.Tension_Tests_Value || ''}" onchange="updateDocField('Tension_Tests_Value', this.value)" placeholder="Enter value"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Table 2: Consumption Elements -->
                        <div class="overflow-x-auto">
                            <table class="w-full border-collapse border border-slate-300" style="min-width: 100%; table-layout: fixed;">
                                <thead>
                                    <tr class="bg-blue-100">
                                        <th class="border border-slate-300 px-2 md:px-3 py-3 text-left text-sm md:text-xs font-bold">Element</th>
                                        <th class="border border-slate-300 px-2 md:px-3 py-3 text-center text-sm md:text-xs font-bold">ID</th>
                                        <th class="border border-slate-300 px-2 md:px-3 py-3 text-center text-sm md:text-xs font-bold">Phase 1 (A)</th>
                                        <th class="border border-slate-300 px-2 md:px-3 py-3 text-center text-sm md:text-xs font-bold">Phase 2 (A)</th>
                                        <th class="border border-slate-300 px-2 md:px-3 py-3 text-center text-sm md:text-xs font-bold">Phase 3 (A)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-sm md:text-xs">Consumption Heating Element 1 Tank</td>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-center text-sm md:text-xs">R4</td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_R4_Phase1 || ''}" onchange="updateDocField('ConsMeas_R4_Phase1', this.value)"></td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_R4_Phase2 || ''}" onchange="updateDocField('ConsMeas_R4_Phase2', this.value)"></td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_R4_Phase3 || ''}" onchange="updateDocField('ConsMeas_R4_Phase3', this.value)"></td>
                                    </tr>
                                    <tr>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-sm md:text-xs">Consumption Heating Element 2 Tank</td>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-center text-sm md:text-xs">R5</td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_R5_Phase1 || ''}" onchange="updateDocField('ConsMeas_R5_Phase1', this.value)"></td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_R5_Phase2 || ''}" onchange="updateDocField('ConsMeas_R5_Phase2', this.value)"></td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_R5_Phase3 || ''}" onchange="updateDocField('ConsMeas_R5_Phase3', this.value)"></td>
                                    </tr>
                                    <tr>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-sm md:text-xs">Consumption Heating Element 3 Tank</td>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-center text-sm md:text-xs">R6</td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_R6_Phase1 || ''}" onchange="updateDocField('ConsMeas_R6_Phase1', this.value)"></td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_R6_Phase2 || ''}" onchange="updateDocField('ConsMeas_R6_Phase2', this.value)"></td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_R6_Phase3 || ''}" onchange="updateDocField('ConsMeas_R6_Phase3', this.value)"></td>
                                    </tr>
                                    <tr>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-sm md:text-xs">Consumption Heating Element 4 Tank</td>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-center text-sm md:text-xs">R7</td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_R7_Phase1 || ''}" onchange="updateDocField('ConsMeas_R7_Phase1', this.value)"></td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_R7_Phase2 || ''}" onchange="updateDocField('ConsMeas_R7_Phase2', this.value)"></td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_R7_Phase3 || ''}" onchange="updateDocField('ConsMeas_R7_Phase3', this.value)"></td>
                                    </tr>
                                    <tr>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-sm md:text-xs">Consumption Heating Boiler 1</td>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-center text-sm md:text-xs">R2</td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_R2_Phase1 || ''}" onchange="updateDocField('ConsMeas_R2_Phase1', this.value)"></td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_R2_Phase2 || ''}" onchange="updateDocField('ConsMeas_R2_Phase2', this.value)"></td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_R2_Phase3 || ''}" onchange="updateDocField('ConsMeas_R2_Phase3', this.value)"></td>
                                    </tr>
                                    <tr>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-sm md:text-xs">Consumption Heating Boiler 2</td>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-center text-sm md:text-xs">R3</td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_R3_Phase1 || ''}" onchange="updateDocField('ConsMeas_R3_Phase1', this.value)"></td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_R3_Phase2 || ''}" onchange="updateDocField('ConsMeas_R3_Phase2', this.value)"></td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_R3_Phase3 || ''}" onchange="updateDocField('ConsMeas_R3_Phase3', this.value)"></td>
                                    </tr>
                                    <tr>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-sm md:text-xs">Washing pump consumption</td>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-center text-sm md:text-xs">M1</td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_M1_Pump_Phase1 || ''}" onchange="updateDocField('ConsMeas_M1_Pump_Phase1', this.value)"></td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_M1_Pump_Phase2 || ''}" onchange="updateDocField('ConsMeas_M1_Pump_Phase2', this.value)"></td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_M1_Pump_Phase3 || ''}" onchange="updateDocField('ConsMeas_M1_Pump_Phase3', this.value)"></td>
                                    </tr>
                                    <tr>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-sm md:text-xs">Cons. Basket Motor 4 Hz</td>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-center text-sm md:text-xs">M11</td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_M11_4Hz_Phase1 || ''}" onchange="updateDocField('ConsMeas_M11_4Hz_Phase1', this.value)"></td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_M11_4Hz_Phase2 || ''}" onchange="updateDocField('ConsMeas_M11_4Hz_Phase2', this.value)"></td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_M11_4Hz_Phase3 || ''}" onchange="updateDocField('ConsMeas_M11_4Hz_Phase3', this.value)"></td>
                                    </tr>
                                    <tr>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-sm md:text-xs">Cons. Basket Motor 80 Hz</td>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-center text-sm md:text-xs">M11</td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_M11_80Hz_Phase1 || ''}" onchange="updateDocField('ConsMeas_M11_80Hz_Phase1', this.value)"></td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_M11_80Hz_Phase2 || ''}" onchange="updateDocField('ConsMeas_M11_80Hz_Phase2', this.value)"></td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_M11_80Hz_Phase3 || ''}" onchange="updateDocField('ConsMeas_M11_80Hz_Phase3', this.value)"></td>
                                    </tr>
                                    <tr>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-sm md:text-xs">Fan Consumption- M10</td>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-center text-sm md:text-xs">M10</td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_M10_Fan_Phase1 || ''}" onchange="updateDocField('ConsMeas_M10_Fan_Phase1', this.value)"></td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_M10_Fan_Phase2 || ''}" onchange="updateDocField('ConsMeas_M10_Fan_Phase2', this.value)"></td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_M10_Fan_Phase3 || ''}" onchange="updateDocField('ConsMeas_M10_Fan_Phase3', this.value)"></td>
                                    </tr>
                                    <tr>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-sm md:text-xs">Consumption Rising Pump</td>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-center text-sm md:text-xs">M1</td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_Rising_Pump_Phase1 || ''}" onchange="updateDocField('ConsMeas_Rising_Pump_Phase1', this.value)"></td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_Rising_Pump_Phase2 || ''}" onchange="updateDocField('ConsMeas_Rising_Pump_Phase2', this.value)"></td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_Rising_Pump_Phase3 || ''}" onchange="updateDocField('ConsMeas_Rising_Pump_Phase3', this.value)"></td>
                                    </tr>
                                    <tr class="bg-yellow-50">
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-sm md:text-xs font-bold">Total Consumption in operation</td>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-center text-sm md:text-xs">-</td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_Total_Phase1 || ''}" onchange="updateDocField('ConsMeas_Total_Phase1', this.value)"></td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_Total_Phase2 || ''}" onchange="updateDocField('ConsMeas_Total_Phase2', this.value)"></td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_Total_Phase3 || ''}" onchange="updateDocField('ConsMeas_Total_Phase3', this.value)"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Table 3: Temperature Confirmation -->
                        <div class="overflow-x-auto">
                            <table class="w-full border-collapse border border-slate-300" style="min-width: 100%; table-layout: fixed;">
                                <thead>
                                    <tr class="bg-blue-100">
                                        <th class="border border-slate-300 px-2 md:px-3 py-3 text-left text-sm md:text-xs font-bold">Element</th>
                                        <th class="border border-slate-300 px-2 md:px-3 py-3 text-center text-sm md:text-xs font-bold">Machine (°C/°F)</th>
                                        <th class="border border-slate-300 px-2 md:px-3 py-3 text-center text-sm md:text-xs font-bold">Multimeter (°C/°F)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-sm md:text-xs">Temperature confirmation Tank</td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_Temp_Tank_Machine || ''}" onchange="updateDocField('ConsMeas_Temp_Tank_Machine', this.value)"></td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_Temp_Tank_Multimeter || ''}" onchange="updateDocField('ConsMeas_Temp_Tank_Multimeter', this.value)"></td>
                                    </tr>
                                    <tr>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-sm md:text-xs">Boiler Temperature confirmation</td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_Temp_Boiler_Machine || ''}" onchange="updateDocField('ConsMeas_Temp_Boiler_Machine', this.value)"></td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_Temp_Boiler_Multimeter || ''}" onchange="updateDocField('ConsMeas_Temp_Boiler_Multimeter', this.value)"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Table 4: Supervision -->
                        <div class="overflow-x-auto">
                            <table class="w-full border-collapse border border-slate-300" style="min-width: 100%; table-layout: fixed;">
                                <thead>
                                    <tr class="bg-blue-100">
                                        <th class="border border-slate-300 px-2 md:px-3 py-3 text-left text-sm md:text-xs font-bold">Element</th>
                                        <th class="border border-slate-300 px-2 md:px-3 py-3 text-center text-sm md:text-xs font-bold">Minimum (A)</th>
                                        <th class="border border-slate-300 px-2 md:px-3 py-3 text-center text-sm md:text-xs font-bold">Maximum (A)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-sm md:text-xs">Supervision of the rising pump</td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_Supervision_Min || ''}" onchange="updateDocField('ConsMeas_Supervision_Min', this.value)"></td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_Supervision_Max || ''}" onchange="updateDocField('ConsMeas_Supervision_Max', this.value)"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Table 5: Variable Speed Drive -->
                        <div class="overflow-x-auto">
                            <table class="w-full border-collapse border border-slate-300" style="min-width: 100%; table-layout: fixed;">
                                <thead>
                                    <tr class="bg-blue-100">
                                        <th class="border border-slate-300 px-2 md:px-3 py-3 text-left text-sm md:text-xs font-bold">Element</th>
                                        <th class="border border-slate-300 px-2 md:px-3 py-3 text-center text-sm md:text-xs font-bold">Value (A)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-sm md:text-xs">Thermal variable speed drive control [P305]</td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_Variable_Speed_Value || ''}" onchange="updateDocField('ConsMeas_Variable_Speed_Value', this.value)"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Table 6: Washing Pressure -->
                        <div class="overflow-x-auto">
                            <table class="w-full border-collapse border border-slate-300" style="min-width: 100%; table-layout: fixed;">
                                <thead>
                                    <tr class="bg-blue-100">
                                        <th class="border border-slate-300 px-2 md:px-3 py-3 text-left text-sm md:text-xs font-bold">Element</th>
                                        <th class="border border-slate-300 px-2 md:px-3 py-3 text-center text-sm md:text-xs font-bold">Value (bar/PSI)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-sm md:text-xs">Washing pressure</td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_Washing_Pressure_Value || ''}" onchange="updateDocField('ConsMeas_Washing_Pressure_Value', this.value)"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Table 7: Thermal Values -->
                        <div class="overflow-x-auto">
                            <table class="w-full border-collapse border border-slate-300" style="min-width: 100%; table-layout: fixed;">
                                <thead>
                                    <tr class="bg-blue-100">
                                        <th class="border border-slate-300 px-2 md:px-3 py-3 text-left text-sm md:text-xs font-bold">Element</th>
                                        <th class="border border-slate-300 px-2 md:px-3 py-3 text-center text-sm md:text-xs font-bold">ID</th>
                                        <th class="border border-slate-300 px-2 md:px-3 py-3 text-center text-sm md:text-xs font-bold">Value Thermics (A)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-sm md:text-xs">Consumption Heating Element 1 Tank</td>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-center text-sm md:text-xs">R4</td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_Thermal_R4_Value || ''}" onchange="updateDocField('ConsMeas_Thermal_R4_Value', this.value)"></td>
                                    </tr>
                                    <tr>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-sm md:text-xs">Consumption Heating Element 2 Tank</td>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-center text-sm md:text-xs">R5</td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_Thermal_R5_Value || ''}" onchange="updateDocField('ConsMeas_Thermal_R5_Value', this.value)"></td>
                                    </tr>
                                    <tr>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-sm md:text-xs">Consumption Heating Element 3 Tank</td>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-center text-sm md:text-xs">R6</td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_Thermal_R6_Value || ''}" onchange="updateDocField('ConsMeas_Thermal_R6_Value', this.value)"></td>
                                    </tr>
                                    <tr>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-sm md:text-xs">Consumption Heating Element 4 Tank</td>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-center text-sm md:text-xs">R7</td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_Thermal_R7_Value || ''}" onchange="updateDocField('ConsMeas_Thermal_R7_Value', this.value)"></td>
                                    </tr>
                                    <tr>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-sm md:text-xs">Consumption Heating Boiler 1</td>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-center text-sm md:text-xs">R2</td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_Thermal_R2_Value || ''}" onchange="updateDocField('ConsMeas_Thermal_R2_Value', this.value)"></td>
                                    </tr>
                                    <tr>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-sm md:text-xs">Consumption Heating Boiler 2</td>
                                        <td class="border border-slate-300 px-2 md:px-3 py-3 text-center text-sm md:text-xs">R3</td>
                                        <td class="border border-slate-300 px-1 md:px-2 py-2"><input type="text" class="form-input w-full text-sm md:text-xs" style="min-width: 80px; padding: 0.25rem 0.5rem; font-size: 0.875rem;" value="${editingDoc.ConsMeas_Thermal_R3_Value || ''}" onchange="updateDocField('ConsMeas_Thermal_R3_Value', this.value)"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                ` : `
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${section.fields.map(field => {
                        // YES/NO Button fields
                        if (YESNO_BUTTON_FIELDS.includes(field)) {
                            const yesActive = editingDoc[field] === 'Sim' ? 'active' : '';
                            const noActive = editingDoc[field] === 'Não' ? 'active' : '';
                            return `
                                <div>
                                    <label class="text-[10px] font-black text-slate-400 uppercase block pl-1 mb-2 tracking-wider">${getFieldLabel(field, section.id)}</label>
                                    <div class="yes-no-buttons">
                                        <button type="button" class="btn-yes ${yesActive}" data-field="${field}" data-value="Sim" onclick="updateDocField('${field}', 'Sim')">YES</button>
                                        <button type="button" class="btn-no ${noActive}" data-field="${field}" data-value="Não" onclick="updateDocField('${field}', 'Não')">NO</button>
                                    </div>
                                </div>
                            `;
                        }
                        // Dropdown for YES/NO fields
                        if (YESNO_DROPDOWN_FIELDS.includes(field)) {
                            return `
                                <div>
                                    <label class="text-[10px] font-black text-slate-400 uppercase block pl-1 mb-2 tracking-wider">${getFieldLabel(field, section.id)}</label>
                                    <select class="form-input" data-field="${field}" onchange="updateDocField('${field}', this.value)">
                                        <option value="">Selecionar...</option>
                                        <option value="Sim" ${editingDoc[field]==='Sim'?'selected':''}>Sim</option>
                                        <option value="Não" ${editingDoc[field]==='Não'?'selected':''}>Não</option>
                                    </select>
                                </div>
                            `;
                        }
                        // Button options for Equip_Model_Product
                        if (field === "Equip_Model_Product") {
                            const showOtherInput = editingDoc[field] === 'Outro';
                            return `
                                <div>
                                    <label class="text-[10px] font-black text-slate-400 uppercase block pl-1 mb-2 tracking-wider">${getFieldLabel(field, section.id)}</label>
                                    <div class="space-y-2">
                                        <div class="grid grid-cols-2 gap-2">
                                            ${EQUIP_MODEL_OPTIONS.map(opt => {
                                                const isActive = editingDoc[field] === opt ? 'active' : '';
                                                const btnClass = `px-4 py-2 rounded-lg border-2 font-bold text-sm transition-all cursor-pointer ${isActive ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-900 border-slate-300 hover:border-blue-600'}`;
                                                return `<button type="button" class="${btnClass}" onclick="updateDocField('${field}', '${opt}')">${opt}</button>`;
                                            }).join('')}
                                        </div>
                                        ${showOtherInput ? `
                                            <div class="mt-3">
                                                <label class="text-[10px] font-black text-slate-400 uppercase block pl-1 mb-2 tracking-wider">Machine Description</label>
                                                <textarea 
                                                       class="form-input" 
                                                       data-field="Machine_Description" 
                                                       placeholder="Enter machine description"
                                                       oninput="updateDocField('Machine_Description', this.value)">${editingDoc['Machine_Description'] || ''}</textarea>
                                            </div>
                                        ` : ''}
                                    </div>
                                </div>
                            `;
                        }
                        // Dropdown for WashTest_Quality_Rating
                        if (RATING_FIELDS[field]) {
                            return `
                                <div>
                                    <label class="text-[10px] font-black text-slate-400 uppercase block pl-1 mb-2 tracking-wider">${getFieldLabel(field, section.id)}</label>
                                    <select class="form-input" data-field="${field}" onchange="updateDocField('${field}', this.value)">
                                        <option value="">Selecionar...</option>
                                        ${RATING_FIELDS[field].map(opt => `<option value=\"${opt.value}\" ${editingDoc[field]===opt.value?'selected':''}>${opt.label}</option>`).join('')}
                                    </select>
                                </div>
                            `;
                        }
                        // Dropdown for Cust_Country
                        if (field === "Cust_Country") {
                            return `
                                <div>
                                    <label class="text-[10px] font-black text-slate-400 uppercase block pl-1 mb-2 tracking-wider">${getFieldLabel(field, section.id)}</label>
                                    <select class="form-input" data-field="${field}" onchange="updateDocField('${field}', this.value)">
                                        <option value="">Selecionar...</option>
                                        ${COUNTRY_LIST.map(opt => `<option value="${opt}" ${editingDoc[field]===opt?'selected':''}>${opt}</option>`).join('')}
                                    </select>
                                </div>
                            `;
                        }
                        // Dropdown for Inst_Technician_Name (ADMIN only)
                        if (field === TECHNICIAN_FIELD && sessionUser.role === 'ADMIN') {
                            return `
                                <div>
                                    <label class="text-[10px] font-black text-slate-400 uppercase block pl-1 mb-2 tracking-wider">${getFieldLabel(field, section.id)}</label>
                                    <select class="form-input" data-field="${field}" onchange="updateDocField('${field}', this.value)">
                                        <option value="">Selecionar...</option>
                                        ${getTechnicianOptions().replace(`value=\"${editingDoc[field]}\"`, `value=\"${editingDoc[field]}\" selected`)}
                                    </select>
                                </div>
                            `;
                        }
                        // Technician field for TECH (disabled input)
                        if (field === TECHNICIAN_FIELD && sessionUser.role === 'TECH') {
                            return `
                                <div>
                                    <label class="text-[10px] font-black text-slate-400 uppercase block pl-1 mb-2 tracking-wider">${getFieldLabel(field, section.id)}</label>
                                    <input type="text" class="form-input" data-field="${field}" value="${editingDoc[field] || ''}" disabled>
                                </div>
                            `;
                        }
                        // Inst_Date as date input
                        if (field === "Inst_Date") {
                            return `
                                <div>
                                    <label class="text-[10px] font-black text-slate-400 uppercase block pl-1 mb-2 tracking-wider">${getFieldLabel(field, section.id)}</label>
                                    <input type="date" 
                                           class="form-input" 
                                           data-field="${field}" 
                                           value="${editingDoc[field] || ''}" 
                                           oninput="updateDocField('${field}', this.value)">
                                </div>
                            `;
                        }
                        // Summary_Date as date input
                        if (field === "Summary_Date") {
                            return `
                                <div>
                                    <label class="text-[10px] font-black text-slate-400 uppercase block pl-1 mb-2 tracking-wider">${getFieldLabel(field, section.id)}</label>
                                    <input type="date" 
                                           class="form-input" 
                                           data-field="${field}" 
                                           value="${editingDoc[field] || ''}" 
                                           oninput="updateDocField('${field}', this.value)">
                                </div>
                            `;
                        }
                        // Section 12 - Eval dropdown fields
                        if (EVAL_DROPDOWN_OPTIONS[field]) {
                            return `
                                <div>
                                    <label class="text-[10px] font-black text-slate-400 uppercase block pl-1 mb-2 tracking-wider">${getFieldLabel(field, section.id)}</label>
                                    <select class="form-input" data-field="${field}" onchange="updateDocField('${field}', this.value)">
                                        <option value="">Selecionar...</option>
                                        ${EVAL_DROPDOWN_OPTIONS[field].map(opt => `<option value="${opt}" ${editingDoc[field] === opt ? 'selected' : ''}>${opt}</option>`).join('')}
                                    </select>
                                </div>
                            `;
                        }
                        // Section 12 - Eval Yes/No button fields
                        if (EVAL_YESNO_FIELDS.includes(field)) {
                            const yesActive = editingDoc[field] === 'Sim' ? 'active' : '';
                            const noActive = editingDoc[field] === 'Não' ? 'active' : '';
                            return `
                                <div>
                                    <label class="text-[10px] font-black text-slate-400 uppercase block pl-1 mb-2 tracking-wider">${getFieldLabel(field, section.id)}</label>
                                    <div class="yes-no-buttons">
                                        <button type="button" class="btn-yes ${yesActive}" data-field="${field}" data-value="Sim" onclick="updateDocField('${field}', 'Sim')">OK</button>
                                        <button type="button" class="btn-no ${noActive}" data-field="${field}" data-value="Não" onclick="updateDocField('${field}', 'Não')">NOK</button>
                                    </div>
                                </div>
                            `;
                        }
                        // Signature fields - Special handling
                        if (field === "Signature_Technician" || field === "Signature_Customer") {
                            const canvasId = field === "Signature_Technician" ? "signature-technician-canvas" : "signature-customer-canvas";
                            const label = field === "Signature_Technician" ? "Assinatura Técnico" : "Assinatura Cliente";
                            const hasSignature = !!editingDoc[field];
                            return `
                                <div class="md:col-span-1 lg:col-span-1">
                                    <label class="text-[10px] font-black text-slate-400 uppercase block pl-1 mb-2 tracking-wider">${label}</label>
                                    <div class="signature-pad-container">
                                        <canvas id="${canvasId}" class="signature-pad-canvas"></canvas>
                                        <div class="signature-pad-controls">
                                            <button type="button" class="signature-clear-btn" onclick="${field === 'Signature_Technician' ? 'clearSignatureTechnician()' : 'clearSignatureCustomer()'}">Limpar</button>
                                            <button type="button" class="signature-save-btn" onclick="${field === 'Signature_Technician' ? 'saveSignatureTechnician()' : 'saveSignatureCustomer()'}">Guardar</button>
                                        </div>
                                        ${hasSignature ? `<div class="signature-display"><img src="${editingDoc[field]}" alt="Signature"></div>` : ''}
                                    </div>
                                </div>
                            `;
                        }
                        // Default: text input
                        return `
                            <div>
                                <label class="text-[10px] font-black text-slate-400 uppercase block pl-1 mb-2 tracking-wider">${getFieldLabel(field, section.id)}</label>
                                <input type="text" 
                                       class="form-input" 
                                       data-field="${field}" 
                                       value="${editingDoc[field] || ''}" 
                                       oninput="updateDocField('${field}', this.value)">
                            </div>
                        `;
                    }).join('')}
                </div>
                `}
            </div>
        `;
    }).join('');

    sidebarContainer.innerHTML = `
        <p class="px-3 text-[10px] font-black text-slate-500 uppercase mb-4 tracking-widest">Progresso Secções</p>
        ${FORM_STRUCTURE.map(s => {
            const prog = calculateProgress(s);
            return `
                <div onclick="document.getElementById('${s.id}').scrollIntoView({behavior:'smooth'})" 
                     class="group flex flex-col px-3 py-3 rounded-lg cursor-pointer transition-all hover:bg-white/5 mb-1">
                    <div class="flex items-center justify-between gap-2 mb-2">
                        <div class="flex items-center gap-2 overflow-hidden">
                            <span class="text-[10px] font-black text-blue-500 min-w-[22px]">${s.label.split(' - ')[0]}</span>
                            <span class="text-[11px] font-bold text-slate-300 truncate group-hover:text-white transition-colors">
                                ${s.label.split(' - ')[1] || s.label}
                            </span>
                        </div>
                        <span class="text-[10px] font-black ${prog === 100 ? 'text-emerald-400' : 'text-slate-500'}">${prog}%</span>
                    </div>
                    <div class="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div class="h-full transition-all duration-500 ${prog === 100 ? 'bg-emerald-500' : 'bg-blue-500'}" style="width: ${prog}%"></div>
                    </div>
                </div>
            `;
        }).join('')}
    `;
    lucide.createIcons();
    
    // Initialize signature pads after form is rendered
    setTimeout(() => {
        initializeSignaturePads();
    }, 100);
};

window.updateDocField = (field, value) => {
    editingDoc[field] = value;
    
    // Update button states for YES/NO button fields
    const YESNO_BUTTON_FIELDS = [
        "Equip_Delivered_Yes_No",
        "Train_Wash_Daily_Yes_No",
        "Train_Clean_Daily_Yes_No",
        "PrevMaint_Training_Yes_No",
        "Prog_Training_Yes_No",
        "Machine_Programmed_Yes_No",
        "Machine_Programmed_For_Utensils",
        "WashTest_Performed_Yes_No",
        "EXTRA_SDS",
        "EXTRA_DRD",
        "EXTRA_DTC",
        "EXTRA_CRE_DRD",
        "EXTRA_IVS_DRD",
        "EXTRA_EFS",
        "EXTRA_EXD",
        "EXTRA_HMI",
        "EXTRA_STM",
        "Inst_Status_Planned_NotPlanned",
        "Svc_Installation",
        "Svc_Preventive_Maintenance",
        "Svc_Corrective_Maintenance",
        "Svc_Warranty",
        "Doc_Manual_Delivered_Explained",
        "Status_Installation_Training_Completed",
        // Section 12 - Points to evaluate Yes/No fields
        "Eval_General_Condition",
        "Eval_Sensor_Level_Tank",
        "Eval_Tank_Boiler_Solenoid_Valve",
        "Eval_EV_Steam_Vat_Boiler",
        "Eval_Detergent_Dispenser_Dryer",
        "Eval_Sensor_Safety_Interlock",
        "Eval_Inductive_Position_Sensor",
        "Eval_Unit_Parameters_Post_Discharge",
        "Eval_Drive_Parameters_Reboot",
        "Eval_Direction_Rotation_Basket",
        "Eval_Wash_Rinse_Injectors",
        "Eval_Screw_Tightening_Rinsing_Pump",
        "Eval_Console_Calibration_Procedure"
    ];
    
    if (YESNO_BUTTON_FIELDS.includes(field)) {
        // Find all buttons for this field using data attribute
        const buttons = document.querySelectorAll(`button[data-field="${field}"]`);
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-value') === value) {
                btn.classList.add('active');
            }
        });
    }
    
    // Re-render form for fields that need dynamic content updates
    if (field === "Equip_Model_Product") {
        renderForm();
        lucide.createIcons();
    }
    
    updateUIsForProgress();
    
    // Atualiza também o sidebar das secções
    const sidebarContainer = document.getElementById('sidebar-sections');
    if (sidebarContainer && !sidebarContainer.classList.contains('hidden')) {
        // Re-renderiza o sidebar para refletir a % correta
        sidebarContainer.innerHTML = `
            <p class="px-3 text-[10px] font-black text-slate-500 uppercase mb-4 tracking-widest">Progresso Secções</p>
            ${FORM_STRUCTURE.map(s => {
                const prog = calculateProgress(s);
                return `
                    <div onclick="document.getElementById('${s.id}').scrollIntoView({behavior:'smooth'})" 
                         class="group flex flex-col px-3 py-3 rounded-lg cursor-pointer transition-all hover:bg-white/5 mb-1">
                        <div class="flex items-center justify-between gap-2 mb-2">
                            <div class="flex items-center gap-2 overflow-hidden">
                                <span class="text-[10px] font-black text-blue-500 min-w-[22px]">${s.label.split(' - ')[0]}</span>
                                <span class="text-[11px] font-bold text-slate-300 truncate group-hover:text-white transition-colors">
                                    ${s.label.split(' - ')[1] || s.label}
                                </span>
                            </div>
                            <span class="text-[10px] font-black ${prog === 100 ? 'text-emerald-400' : 'text-slate-500'}">${prog}%</span>
                        </div>
                        <div class="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                            <div class="h-full transition-all duration-500 ${prog === 100 ? 'bg-emerald-500' : 'bg-blue-500'}" style="width: ${prog}%"></div>
                        </div>
                    </div>
                `;
            }).join('')}
        `;
        lucide.createIcons();
    }
};

const updateUIsForProgress = () => {
    FORM_STRUCTURE.forEach(s => {
        const prog = calculateProgress(s);
        const sectionHeader = document.querySelector(`#${s.id} .bg-blue-500`);
        const sectionText = document.querySelector(`#${s.id} .text-slate-400`);
        if (sectionHeader) sectionHeader.style.width = prog + '%';
        if (sectionText) sectionText.innerText = prog + '%';
    });
};

const calculateProgress = (section) => {
    if (!editingDoc) return 0;
    
    // Special handling for program_data_section
    if (section.specialType === 'program_data_section') {
        const programDataList = editingDoc.programData || [];
        if (programDataList.length === 0) return 0;
        
        // Check if at least one entry has data in any of the required fields
        const dataFields = ["Data_Wash_Time", "Data_Rinse_Time", "Data_Spin_Time", "Data_Wash_Temperature", "Data_Rinse_Temperature", "Data_Final_Ventilation", "Data_Open_Door_Ventilation"];
        const hasData = programDataList.some(entry => 
            dataFields.some(field => entry[field] && entry[field].toString().trim() !== "")
        );
        return hasData ? 100 : 0;
    }
    
    // Special handling for program_section
    if (section.specialType === 'program_section') {
        const hasPrograms = (editingDoc.programs || []).length > 0;
        const hasUtensils = (editingDoc.utensils || []).length > 0;
        if (hasPrograms || hasUtensils) return 100;
        // Check if the regular fields are filled
        const filled = section.fields.filter(f => editingDoc[f] && editingDoc[f].toString().trim() !== "");
        return filled.length > 0 ? 50 : 0;
    }
    
    // Default calculation for regular sections
    if (section.fields.length === 0) return 0;
    const filled = section.fields.filter(f => editingDoc[f] && editingDoc[f].toString().trim() !== "");
    return Math.round((filled.length / section.fields.length) * 100);
};

const calculateTotalProgress = (item) => {
    let total = 0, filled = 0;
    FORM_STRUCTURE.forEach(s => {
        total += s.fields.length;
        filled += s.fields.filter(f => item[f] && item[f].toString().trim() !== "").length;
    });
    return total > 0 ? Math.round((filled / total) * 100) : 0;
};

window.saveForm = async () => {
    if (!editingDoc) return;
    try {
        // Save any pending signatures before saving the form
        saveSignatureTechnician();
        saveSignatureCustomer();
        
        const id = editingDoc.id;
        await window.fbSetDoc(window.fbDoc(window.db, 'artifacts', window.appId, 'public', 'data', 'compliance', id), {
            ...editingDoc,
            lastUpdate: new Date().toISOString()
        }, { merge: true });
        setView('dashboard');
        editingDoc = null;
        signaturePadTechnician = null;
        signaturePadCustomer = null;
    } catch (err) {
        alert("Erro ao gravar. Verifique as suas permissões.");
    }
};

window.deleteHandler = async (id) => {
    if (confirm("Apagar permanentemente este registo?")) {
        await window.fbDeleteDoc(window.fbDoc(window.db, 'artifacts', window.appId, 'public', 'data', 'compliance', id));
    }
};

// --- EXPORTAÇÃO PARA PDF ---
window.exportToPDF = (id) => {
    const item = complianceData.find(d => d.id === id);
    if (item) window.generatePDF(item);
};

window.exportCurrentToPDF = () => {
    console.log('[PDF] exportCurrentToPDF called');
    console.log('[PDF] editingDoc:', editingDoc);
    
    if (!editingDoc) {
        console.log('[PDF] ERROR: No document being edited');
        alert('Please open or create an equipment record first.');
        return;
    }
    
    console.log('[PDF] Showing modal for language selection');
    window.showPDFLanguageSelector((lang) => {
        console.log('[PDF] User selected language:', lang);
        window.generatePDF(editingDoc, lang);
    });
};

window.generatePDF = (item, lang = 'en') => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 20;
    
    // Função auxiliar para traduzir com fallback
    const translateField = (text, targetLang) => {
        if (!window.translationsData) return text;
        if (window.translationsData[text]) {
            return window.translationsData[text][targetLang] || window.translationsData[text]['en'] || text;
        }
        if (window.translate) {
            return window.translate(text, targetLang);
        }
        return text;
    };
    
    // Traduções para o PDF
    const pdfTexts = {
        title: { pt: "FICHA TÉCNICA DE CONFORMIDADE", en: "TECHNICAL COMPLIANCE SHEET", es: "HOJA TÉCNICA DE CUMPLIMIENTO", fr: "FICHE TECHNIQUE DE CONFORMITÉ" },
        equipment: { pt: "Equipamento:", en: "Equipment:", es: "Equipo:", fr: "Équipement:" },
        customer: { pt: "Cliente:", en: "Customer:", es: "Cliente:", fr: "Client:" },
        technician: { pt: "Técnico:", en: "Technician:", es: "Técnico:", fr: "Technicien:" },
        exportedAt: { pt: "Exportado em:", en: "Exported on:", es: "Exportado el:", fr: "Exporté le:" },
        signatureImage: { pt: "[Imagem de Assinatura]", en: "[Signature Image]", es: "[Imagen de Firma]", fr: "[Image de Signature]" },
        signaturePresent: { pt: "[Assinatura Presente]", en: "[Signature Present]", es: "[Firma Presente]", fr: "[Signature Présente]" }
    };

    // Add logo to top left (40mm width, aspect ratio maintained automatically)
    try {
        doc.addImage('https://static.wixstatic.com/media/a6967f_d83f45c5e4f446009fcfd984d5d85f6f~mv2.png', 'PNG', 20, 10, 35, 0);
        y = 50;
    } catch (e) {
        console.log("Could not load logo image");
        y = 20;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(0, 74, 173);
    doc.text("SOMENGIL", pageWidth / 2, y, { align: "center" });
    
    y += 10;
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(pdfTexts.title[lang], pageWidth / 2, y, { align: "center" });
    
    y += 15;
    doc.setDrawColor(200, 200, 200);
    doc.line(20, y, pageWidth - 20, y);
    
    y += 10;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    const dateFormatted = new Date().toLocaleDateString(lang === 'pt' ? 'pt-PT' : lang === 'en' ? 'en-US' : lang === 'es' ? 'es-ES' : 'fr-FR');
    doc.text(`${pdfTexts.equipment[lang]} ${item.Equip_Serial_Number || '---'}`, 20, y);
    doc.text(`${pdfTexts.customer[lang]} ${item.Cust_Name || '---'}`, 100, y);
    y += 7;
    doc.text(`${pdfTexts.technician[lang]} ${item.Inst_Technician_Name || '---'}`, 20, y);
    doc.text(`${pdfTexts.exportedAt[lang]} ${dateFormatted}`, 100, y);

    y += 15;

    FORM_STRUCTURE.forEach((section) => {
        if (y > 270) { doc.addPage(); y = 20; }
        doc.setFont("helvetica", "bold");
        doc.setFillColor(240, 240, 240);
        doc.rect(20, y, pageWidth - 40, 8, "F");
        // Traduzir o título da seção se existir tradução
        const sectionLabel = translateField(section.label, lang);
        doc.text(sectionLabel.toUpperCase(), 25, y + 6);
        y += 12;

        doc.setFont("helvetica", "normal");
        section.fields.forEach(field => {
            if (y > 280) { doc.addPage(); y = 20; }
            const val = item[field] || "---";
            // Traduzir o rótulo do campo se existir tradução
            const translatedLabel = translateField(field, lang);
            doc.setFont("helvetica", "bold");
            doc.text(`${translatedLabel}:`, 25, y);
            
            // Handle signature fields as images
            if ((field === 'Signature_Technician' || field === 'Signature_Customer') && val !== "---") {
                // Signature is stored as base64 PNG
                if (val.startsWith('data:image')) {
                    // Image is already base64 encoded
                    try {
                        doc.addImage(val, 'PNG', 80, y - 2, 60, 30);
                        y += 35;
                    } catch (e) {
                        doc.setFont("helvetica", "normal");
                        doc.text(pdfTexts.signatureImage[lang], 80, y);
                        y += 7;
                    }
                } else {
                    doc.setFont("helvetica", "normal");
                    doc.text(pdfTexts.signaturePresent[lang], 80, y);
                    y += 7;
                }
            } else {
                doc.setFont("helvetica", "normal");
                doc.text(`${val}`, 80, y);
                y += 7;
            }
        });
        y += 5;
    });

    const filename = lang === 'pt' ? `Ficha_${item.Equip_Serial_Number || 'Somengil'}.pdf` : 
                     lang === 'en' ? `Sheet_${item.Equip_Serial_Number || 'Somengil'}.pdf` :
                     lang === 'es' ? `Hoja_${item.Equip_Serial_Number || 'Somengil'}.pdf` :
                     `Fiche_${item.Equip_Serial_Number || 'Somengil'}.pdf`;
    doc.save(filename);
};

// Mobile sidebar overlay handler
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && e.target === document.body) {
            const sidebar = document.getElementById('sidebar');
            if (sidebar && sidebar.classList.contains('mobile-open')) {
                sidebar.classList.remove('mobile-open');
                document.body.classList.remove('sidebar-open');
            }
        }
    });
});
