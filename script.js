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
    { id: "s3", label: "3 - Training (washing)", fields: ["Train_Wash_Daily_Yes_No", "Train_Wash_Who_Name", "Train_Wash_Who_Position", "Train_Wash_Who_Phone", "Train_Wash_Who_Email", "Train_Wash_No_Explain_Why"] },
    { id: "s4", label: "4 - Training (cleaning)", fields: ["Train_Clean_Daily_Yes_No", "Train_Clean_Who_Name", "Train_Clean_Who_Position", "Train_Clean_Who_Phone", "Train_Clean_Who_Email", "Train_Clean_No_Explain_Why"] },
    { id: "s5", label: "5 - Measurements", fields: ["Meas_Water_Input_Temp", "Meas_Input_Pressure", "Meas_Water_Quality", "Meas_Electrical_Info", "Meas_Electrical_Consumption", "Meas_Consumption_Measurement", "Meas_Consumption_Who_Identified"] },
    { id: "s6", label: "6 - Washing", fields: ["WashTest_Performed_Yes_No", "WashTest_Quality_Rating", "WashTest_Answer_Explanation", "WashTest_Detergent_Used", "WashTest_Debit", "WashTest_Concentration"] },
    { id: "s7", label: "7 - Preventive Maintenance", fields: ["PrevMaint_Training_Yes_No", "PrevMaint_Who_Name", "PrevMaint_Who_Position", "PrevMaint_Who_Phone", "PrevMaint_Who_Email", "PrevMaint_No_Explain_Why"] },
    { id: "s8", label: "8 - Programming", fields: ["Prog_Training_Yes_No", "Prog_Training_Who_Name", "Prog_Training_Who_Position", "Prog_Training_Who_Phone", "Prog_Training_Who_Email", "Prog_Training_No_Explain_Why"] },
    { id: "s9", label: "9 - Program", fields: ["Machine_Programmed_Yes_No", "Machine_Programmed_For_Utensils", "Program_Number", "Photo_Program1", "Photo_Program2", "Photo_Program3", "Photo_Program4_A", "Photo_Program4_B", "Utensils_Description_Trolley", "Photo_Utensil1", "Photo_Utensil2", "Photo_Utensil3", "Photo_Utensil4", "Photo_Utensil5"] },
    { id: "s10", label: "10 - Program Data", fields: ["Data_Wash_Time", "Data_Rinse_Time", "Data_Spin_Time", "Data_Wash_Temperature", "Data_Rinse_Temperature", "Data_Final_Ventilation", "Data_Open_Door_Ventilation"] },
    { id: "s11", label: "11 - Status Training", fields: ["Status_Installation_Training_Completed"] },
    { id: "s12", label: "12 - Points to evaluate", fields: ["Eval_Machine_Type", "Eval_Heating", "Eval_Assembly", "Eval_General_Condition", "Eval_Sensor_Level_Tank", "Eval_Tank_Boiler_Solenoid_Valve", "Eval_EV_Steam_Vat_Boiler", "Eval_Detergent_Dispenser_Dryer", "Eval_Sensor_Safety_Interlock", "Eval_Inductive_Position_Sensor", "Eval_Unit_Parameters_Post_Discharge", "Eval_Drive_Parameters_Reboot", "Eval_Direction_Rotation_Basket", "Eval_Wash_Rinse_Injectors", "Eval_Screw_Tightening_Rinsing_Pump", "Eval_Console_Calibration_Procedure", "Eval_Language_Console", "Eval_Unit_Setpoint_Temperature"] },
    { id: "s13", label: "13 - Consumption", fields: ["Cons_Tension_Tests", "Cons_Heater_1_Tank_A", "Cons_Heater_2_Tank_A", "Cons_Heater_3_Tank_A", "Cons_Heater_4_Tank_A", "Cons_Heater_Boiler_1_A", "Cons_Heater_Boiler_2_A", "Cons_Washing_Pump_A", "Cons_Basket_Motor_4_Hz_A", "Cons_Basket_Motor_80_Hz_A", "Cons_Fan_A", "Cons_Rising_Pump_A", "Temp_Confirm_Tank", "Temp_Confirm_Boiler", "Relay_Supervision_Regulation_A", "Thermal_Reg_Rinsing_Pump_A", "Thermal_Reg_Fan_A", "Thermal_Variable_Speed_Drive_A_P305", "Washing_Pressure"] },
    { id: "s14", label: "14 - Summary", fields: ["Summary_Notes", "Summary_Date", "Signature_Technician", "Signature_Customer"] }
];

let sessionUser = null;
let complianceData = [];
let editingDoc = null;
let sidebarExpanded = false;
let costsData = [];
// flightsData é sempre window.flightsData

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
        // Forçar sidebar recolhido ao entrar
        sidebarExpanded = false;
        const sidebar = document.getElementById('sidebar');
        const sidebarTexts = document.querySelectorAll('.sidebar-text');
        sidebar.classList.remove('expanded');
        sidebarTexts.forEach(t => t.classList.add('hidden'));
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

window.exportCostsPDF = () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 20;
    
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
    doc.text("RELATÓRIO DE DESPESAS", pageWidth / 2, y, { align: "center" });
    
    y += 15;
    doc.setDrawColor(200, 200, 200);
    doc.line(20, y, pageWidth - 20, y);
    
    y += 10;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-PT')}`, 20, y);
    y += 7;
    doc.text(`Utilizador: ${sessionUser.name}`, 20, y);
    y += 15;
    
    // Tabela
    doc.setFont("helvetica", "bold");
    doc.setFillColor(240, 240, 240);
    doc.rect(20, y, pageWidth - 40, 8, "F");
    doc.text("Data", 25, y + 6);
    doc.text("Tipo", 60, y + 6);
    doc.text("Descrição", 90, y + 6);
    doc.text("Valor", 170, y + 6);
    doc.text("Técnico", 195, y + 6);
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
    doc.text(`TOTAL: ${totalValue.toFixed(2)}€`, 170, y);
    
    doc.save(`Despesas_${new Date().toISOString().split('T')[0]}.pdf`);
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
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 20;
    
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
    doc.text("RELATÓRIO DE VOOS", pageWidth / 2, y, { align: "center" });
    
    y += 15;
    doc.setDrawColor(200, 200, 200);
    doc.line(20, y, pageWidth - 20, y);
    
    y += 10;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-PT')}`, 20, y);
    y += 7;
    doc.text(`Utilizador: ${sessionUser.name}`, 20, y);
    y += 15;
    
    // Tabela
    doc.setFont("helvetica", "bold");
    doc.setFillColor(240, 240, 240);
    doc.rect(20, y, pageWidth - 40, 8, "F");
    doc.setFontSize(9);
    doc.text("Data", 22, y + 6);
    doc.text("Aerop.", 45, y + 6);
    doc.text("Destino", 65, y + 6);
    doc.text("Partida", 100, y + 6);
    doc.text("Chegada", 125, y + 6);
    doc.text("Técnico", 150, y + 6);
    doc.text("Status", 180, y + 6);
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
    
    doc.save(`Voos_${new Date().toISOString().split('T')[0]}.pdf`);
};

// --- RENDERIZAÇÃO DA TABELA ---
const renderTable = () => {
    if (!sessionUser) return;
    const tbody = document.getElementById('table-body');
    const dataToShow = sessionUser.role === 'ADMIN' 
        ? complianceData 
        : complianceData.filter(d => d.Inst_Technician_Name === sessionUser.name);

    if (dataToShow.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="px-8 py-20 text-center text-slate-400 italic">Sem registos encontrados.</td></tr>`;
        return;
    }

    tbody.innerHTML = dataToShow.map(item => {
        const prog = calculateTotalProgress(item);
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
                    <button onclick="exportToPDF('${item.id}')" title="PDF" class="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 border border-emerald-100"><i data-lucide="file-down" style="width:18px"></i></button>
                    <button onclick="editForm('${item.id}')" title="Editar" class="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 border border-blue-100"><i data-lucide="search" style="width:18px"></i></button>
                    <button onclick="deleteHandler('${item.id}')" title="Apagar" class="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 border border-red-100"><i data-lucide="trash-2" style="width:18px"></i></button>
                </td>
            </tr>
        `;
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

const renderForm = () => {
    const container = document.getElementById('form-sections-container');
    const sidebarContainer = document.getElementById('sidebar-sections');

    // Dropdown config for GESTÃO
    const YESNO_FIELDS = [
        "Inst_Status_Planned_NotPlanned",
        "Equip_Delivered_Yes_No",
        "Doc_Manual_Delivered_Explained",
        "Train_Wash_Daily_Yes_No",
        "Train_Clean_Daily_Yes_No",
        "PrevMaint_Training_Yes_No",
        "Prog_Training_Yes_No",
        "Machine_Programmed_Yes_No",
        "WashTest_Performed_Yes_No"
    ];
    const COUNTRY_LIST = [
        "Portugal", "Espanha", "França", "Alemanha", "Itália", "Reino Unido", "Irlanda", "Bélgica", "Holanda", "Luxemburgo", "Suíça", "Áustria", "Polónia", "República Checa", "Hungria", "Roménia", "Bulgária", "Grécia", "Turquia", "Estados Unidos", "Brasil", "Angola", "Moçambique", "Cabo Verde", "Outros"
    ];
    const RATING_FIELDS = {
        "WashTest_Quality_Rating": [
            { value: "very bad", label: "😡 Muito Mau" },
            { value: "bad", label: "😕 Mau" },
            { value: "good", label: "🙂 Bom" },
            { value: "very good", label: "😃 Muito Bom" }
        ]
    };
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
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${section.fields.map(field => {
                        // Dropdown for YES/NO fields
                        if (YESNO_FIELDS.includes(field)) {
                            return `
                                <div>
                                    <label class="text-[10px] font-black text-slate-400 uppercase block pl-1 mb-2 tracking-wider">${field.replace(/_/g, ' ')}</label>
                                    <select class="form-input" data-field="${field}" onchange="updateDocField('${field}', this.value)">
                                        <option value="">Selecionar...</option>
                                        <option value="Sim" ${editingDoc[field]==='Sim'?'selected':''}>Sim</option>
                                        <option value="Não" ${editingDoc[field]==='Não'?'selected':''}>Não</option>
                                    </select>
                                </div>
                            `;
                        }
                        // Dropdown for WashTest_Quality_Rating
                        if (RATING_FIELDS[field]) {
                            return `
                                <div>
                                    <label class="text-[10px] font-black text-slate-400 uppercase block pl-1 mb-2 tracking-wider">${field.replace(/_/g, ' ')}</label>
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
                                    <label class="text-[10px] font-black text-slate-400 uppercase block pl-1 mb-2 tracking-wider">${field.replace(/_/g, ' ')}</label>
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
                                    <label class="text-[10px] font-black text-slate-400 uppercase block pl-1 mb-2 tracking-wider">${field.replace(/_/g, ' ')}</label>
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
                                    <label class="text-[10px] font-black text-slate-400 uppercase block pl-1 mb-2 tracking-wider">${field.replace(/_/g, ' ')}</label>
                                    <input type="text" class="form-input" data-field="${field}" value="${editingDoc[field] || ''}" disabled>
                                </div>
                            `;
                        }
                        // Inst_Date as date input
                        if (field === "Inst_Date") {
                            return `
                                <div>
                                    <label class="text-[10px] font-black text-slate-400 uppercase block pl-1 mb-2 tracking-wider">${field.replace(/_/g, ' ')}</label>
                                    <input type="date" 
                                           class="form-input" 
                                           data-field="${field}" 
                                           value="${editingDoc[field] || ''}" 
                                           oninput="updateDocField('${field}', this.value)">
                                </div>
                            `;
                        }
                        // Default: text input
                        return `
                            <div>
                                <label class="text-[10px] font-black text-slate-400 uppercase block pl-1 mb-2 tracking-wider">${field.replace(/_/g, ' ')}</label>
                                <input type="text" 
                                       class="form-input" 
                                       data-field="${field}" 
                                       value="${editingDoc[field] || ''}" 
                                       oninput="updateDocField('${field}', this.value)">
                            </div>
                        `;
                    }).join('')}
                </div>
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
};

window.updateDocField = (field, value) => {
    editingDoc[field] = value;
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
        const id = editingDoc.id;
        await window.fbSetDoc(window.fbDoc(window.db, 'artifacts', window.appId, 'public', 'data', 'compliance', id), {
            ...editingDoc,
            lastUpdate: new Date().toISOString()
        }, { merge: true });
        setView('dashboard');
        editingDoc = null;
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
    if (item) generatePDF(item);
};

window.exportCurrentToPDF = () => {
    if (editingDoc) generatePDF(editingDoc);
};

const generatePDF = (item) => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 20;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(0, 74, 173);
    doc.text("SOMENGIL", pageWidth / 2, y, { align: "center" });
    
    y += 10;
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text("FICHA TÉCNICA DE COMPLIANCE", pageWidth / 2, y, { align: "center" });
    
    y += 15;
    doc.setDrawColor(200, 200, 200);
    doc.line(20, y, pageWidth - 20, y);
    
    y += 10;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Equipamento: ${item.Equip_Serial_Number || '---'}`, 20, y);
    doc.text(`Cliente: ${item.Cust_Name || '---'}`, 100, y);
    y += 7;
    doc.text(`Técnico: ${item.Inst_Technician_Name || '---'}`, 20, y);
    doc.text(`Exportado em: ${new Date().toLocaleDateString('pt-PT')}`, 100, y);

    y += 15;

    FORM_STRUCTURE.forEach((section) => {
        if (y > 270) { doc.addPage(); y = 20; }
        doc.setFont("helvetica", "bold");
        doc.setFillColor(240, 240, 240);
        doc.rect(20, y, pageWidth - 40, 8, "F");
        doc.text(section.label.toUpperCase(), 25, y + 6);
        y += 12;

        doc.setFont("helvetica", "normal");
        section.fields.forEach(field => {
            if (y > 280) { doc.addPage(); y = 20; }
            const val = item[field] || "---";
            const label = field.replace(/_/g, ' ');
            doc.setFont("helvetica", "bold");
            doc.text(`${label}:`, 25, y);
            doc.setFont("helvetica", "normal");
            doc.text(`${val}`, 80, y);
            y += 7;
        });
        y += 5;
    });

    doc.save(`Ficha_${item.Equip_Serial_Number || 'Somengil'}.pdf`);
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
})();
