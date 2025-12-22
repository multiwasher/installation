/**
 * COMPLIANCE SECTIONS STRUCTURE
 * Configuração completa com 1.1 a 1.5 como subsecções do Ponto 1
 * Seguido pelas seções 2-14 (documentation, training, measurements, etc)
 */

const COMPLIANCE_SECTIONS = [
    // POINT 1 - Installation Info (Subsections 1.1 to 1.5)
    {
        id: 'installation-responsibility',
        title: '1.1 - Installation Responsability',
        icon: '1.1',
        fields: [
            { key: 'status', label: 'STATUS (Planned / Not Planned)', type: 'text' },
            { key: 'installation_date', label: 'Installation Date', type: 'date' },
            { key: 'somengil_technician', label: 'Company', type: 'text' },
            { key: 'technician_name', label: 'Technician Name', type: 'text' },
            { key: 'technician_phone', label: 'Phone', type: 'text' },
            { key: 'technician_email', label: 'Email', type: 'email' }
        ]
    },
    {
        id: 'customer-identification',
        title: '1.2 - Customer Identification',
        icon: '1.2',
        fields: [
            { key: 'customer', label: 'Customer', type: 'text', fullWidth: true },
            { key: 'address', label: 'Adress', type: 'text', fullWidth: true },
            { key: 'zip_code', label: 'Zip Code', type: 'text' },
            { key: 'city', label: 'City', type: 'text' },
            { key: 'country', label: 'Country', type: 'text' },
            { key: 'vat_number', label: 'VAT Number / Tx ID', type: 'text', fullWidth: true },
            { key: 'customer_representative', label: 'Customer Representative Person', type: 'text', fullWidth: true },
            { key: 'rep_phone', label: 'Phone', type: 'text' },
            { key: 'rep_email', label: 'Email', type: 'email' }
        ]
    },
    {
        id: 'service-identification',
        title: '1.3 - Service Identification',
        icon: '1.3',
        fields: [
            { key: 'installation', label: 'Installation', type: 'checkbox' },
            { key: 'preventive_maintenance', label: 'Preventive Maintenance', type: 'checkbox' },
            { key: 'corrective_maintenance', label: 'Corrective Maintenance', type: 'checkbox' },
            { key: 'warranty', label: 'Warranty', type: 'checkbox' }
        ]
    },
    {
        id: 'equipment-identification',
        title: '1.4 - Equipment and Accessories Identification',
        icon: '1.4',
        fields: [
            { key: 'quantity', label: 'Quantity', type: 'number' },
            { key: 'model_product', label: 'Model/Product', type: 'text' },
            { key: 'serial_number', label: 'Serial N.º', type: 'text' },
            { key: 'delivered', label: 'Delivered (Yes / No)', type: 'radio', options: ['Yes', 'No'] },
            { key: 'equipment_notes', label: 'Notes', type: 'textarea', fullWidth: true }
        ]
    },
    {
        id: 'extras',
        title: '1.5 - EXTRAS',
        icon: '1.5',
        fields: [
            { key: 'sds', label: 'SDS', type: 'checkbox' },
            { key: 'drd', label: 'DRD', type: 'checkbox' },
            { key: 'dtc', label: 'DTC', type: 'checkbox' },
            { key: 'cre_drd', label: 'CRE+DRD', type: 'checkbox' },
            { key: 'ivs_drd', label: 'IVS+DRD', type: 'checkbox' },
            { key: 'efs', label: 'EFS', type: 'checkbox' },
            { key: 'exd', label: 'EXD', type: 'checkbox' },
            { key: 'hmi', label: 'HMI', type: 'checkbox' },
            { key: 'stm', label: 'STM', type: 'checkbox' }
        ]
    },
    {
        id: 'documentation',
        title: '2 - Documentation',
        icon: '2',
        fields: [
            { key: 'manual_delivered', label: 'The machine manual was delivered and explained (YES / NO / Not Applicable)', type: 'radio', options: ['YES', 'NO', 'Not Applicable'], fullWidth: true },
            { key: 'manual_delivered_who', label: 'If YES, please identify who', type: 'text', fullWidth: true },
            { key: 'name1', label: 'Name', type: 'text' },
            { key: 'position1', label: 'Position', type: 'text' },
            { key: 'phone1', label: 'Phone', type: 'text' },
            { key: 'email1', label: 'Email', type: 'email' },
            { key: 'manual_not_delivered_why', label: 'If NO please explain why', type: 'textarea', fullWidth: true }
        ]
    },
    {
        id: 'training-washing',
        title: '3 - Training (washing)',
        icon: '3',
        fields: [
            { key: 'washing_training', label: 'Daily Washing Training? (YES / NO)', type: 'radio', options: ['YES', 'NO'], fullWidth: true },
            { key: 'washing_training_who', label: 'If YES, please identify Who', type: 'text', fullWidth: true },
            { key: 'washing_training_name', label: 'Name', type: 'text' },
            { key: 'washing_training_position', label: 'Work Position', type: 'text' },
            { key: 'washing_training_phone', label: 'Phone', type: 'text' },
            { key: 'washing_training_email', label: 'Email', type: 'email' },
            { key: 'washing_training_not_why', label: 'If NO please explain why', type: 'textarea', fullWidth: true }
        ]
    },
    {
        id: 'training-cleaning',
        title: '4 - Training (cleaning)',
        icon: '4',
        fields: [
            { key: 'cleaning_training', label: 'Daily Washing Training? (cleaning the machine) (YES / NO)', type: 'radio', options: ['YES', 'NO'], fullWidth: true },
            { key: 'cleaning_training_who', label: 'If YES, please identify Who', type: 'text', fullWidth: true },
            { key: 'cleaning_training_name', label: 'Name', type: 'text' },
            { key: 'cleaning_training_position', label: 'Work Position', type: 'text' },
            { key: 'cleaning_training_phone', label: 'Phone', type: 'text' },
            { key: 'cleaning_training_email', label: 'Email', type: 'email' },
            { key: 'cleaning_training_not_why', label: 'If NO please explain why', type: 'textarea', fullWidth: true }
        ]
    },
    {
        id: 'measurements',
        title: '5 - Measurements',
        icon: '5',
        fields: [
            { key: 'water_input_temperature', label: 'Water input temperature', type: 'text' },
            { key: 'input_pressure', label: 'Input pressure', type: 'text' },
            { key: 'water_quality', label: 'Water quality', type: 'text' },
            { key: 'electrical_info', label: 'Electrical Info', type: 'text', fullWidth: true },
            { key: 'electrical_consumption', label: 'Eletrical consumption', type: 'text' },
            { key: 'electrical_consumption_measurement', label: 'Measurement electical consumption', type: 'text' },
            { key: 'electrical_measurement_who', label: 'If YES, please identify Who', type: 'text' }
        ]
    },
    {
        id: 'washing',
        title: '6 - Washing',
        icon: '6',
        fields: [
            { key: 'washing_test', label: 'Washing Test? (YES / NO)', type: 'radio', options: ['YES', 'NO'], fullWidth: true },
            { key: 'washing_quality', label: 'Please qualify washing quality', type: 'text', fullWidth: true },
            { key: 'washing_quality_explanation', label: 'Please explain your answer', type: 'textarea', fullWidth: true },
            { key: 'detergent_used', label: 'Detergent used', type: 'text' },
            { key: 'debit', label: 'Debit', type: 'text' },
            { key: 'concentration', label: 'Concentration', type: 'text' }
        ]
    },
    {
        id: 'preventive-maintenance',
        title: '7 - Preventive Maintenance',
        icon: '7',
        fields: [
            { key: 'pm_training', label: 'Preventive Maintenance Training?', type: 'radio', options: ['YES', 'NO'], fullWidth: true },
            { key: 'pm_training_who', label: 'If YES, please identify Who', type: 'text', fullWidth: true },
            { key: 'pm_training_name', label: 'Name', type: 'text' },
            { key: 'pm_training_position', label: 'Work Position', type: 'text' },
            { key: 'pm_training_phone', label: 'Phone', type: 'text' },
            { key: 'pm_training_email', label: 'Email', type: 'email' },
            { key: 'pm_training_not_why', label: 'If NO please explain why', type: 'textarea', fullWidth: true }
        ]
    },
    {
        id: 'programming-training',
        title: '8 - Programming',
        icon: '8',
        fields: [
            { key: 'programming_training', label: 'Programming training?', type: 'radio', options: ['YES', 'NO'], fullWidth: true },
            { key: 'programming_training_who', label: 'If YES, please identify Who', type: 'text', fullWidth: true },
            { key: 'programming_training_name', label: 'Name', type: 'text' },
            { key: 'programming_training_position', label: 'Work Position', type: 'text' },
            { key: 'programming_training_phone', label: 'Phone', type: 'text' },
            { key: 'programming_training_email', label: 'Email', type: 'email' },
            { key: 'programming_training_not_why', label: 'If NO please explain why', type: 'textarea', fullWidth: true }
        ]
    },
    {
        id: 'machine-programming',
        title: '9 - Program',
        icon: '9',
        fields: [
            { key: 'programmed_machine', label: 'Programmed Machine? (YES / NO)', type: 'radio', options: ['YES', 'NO'], fullWidth: true },
            { key: 'utensils_programmed', label: 'Was the machine programmed for the utensils to be washed?', type: 'radio', options: ['YES', 'NO'], fullWidth: true },
            { key: 'program_number', label: 'Program Number', type: 'text' },
            { key: 'program1_photo', label: 'Program1 Photo', type: 'file' },
            { key: 'program2_photo', label: 'Program2 Photo', type: 'file' },
            { key: 'program3_photo', label: 'Program3 Photo', type: 'file' },
            { key: 'program4_photo', label: 'Program4 Photo', type: 'file' },
            { key: 'program5_photo', label: 'Program4 Photo', type: 'file' },
            { key: 'utensils_description', label: 'Utensils Description/Trolley', type: 'textarea', fullWidth: true },
            { key: 'utensil1_photo', label: 'Utensil1 Photo', type: 'file' },
            { key: 'utensil2_photo', label: 'Utensil2 Photo', type: 'file' },
            { key: 'utensil3_photo', label: 'Utensil3 Photo', type: 'file' },
            { key: 'utensil4_photo', label: 'Utensil4 Photo', type: 'file' },
            { key: 'utensil5_photo', label: 'Utensil5 Photo', type: 'file' }
        ]
    },
    {
        id: 'program-data',
        title: '10 - Program Data',
        icon: '10',
        fields: [
            { key: 'wash_time', label: 'Wash', type: 'text' },
            { key: 'rinse_time', label: 'Rinse', type: 'text' },
            { key: 'spin_time', label: 'Spin', type: 'text' },
            { key: 'wash_temperature', label: 'Washing Temperature', type: 'text' },
            { key: 'rinse_temperature', label: 'Rinsing Temperature', type: 'text' },
            { key: 'final_ventilation', label: 'Final Ventilation', type: 'text' },
            { key: 'open_door_ventilation', label: 'Open Door Ventilation', type: 'text' }
        ]
    },
    {
        id: 'status-training',
        title: '11 - Status Training',
        icon: '11',
        fields: [
            { key: 'training_completed', label: 'Installation and training are successfully completed', type: 'checkbox', fullWidth: true }
        ]
    },
    {
        id: 'points-evaluation',
        title: '12 - Points to evaluate',
        icon: '12',
        fields: [
            { key: 'machine_type', label: 'Machine Type', type: 'text' },
            { key: 'heating', label: 'Heating', type: 'text' },
            { key: 'assembly', label: 'Assembly', type: 'text' },
            { key: 'general_condition', label: 'General Condition of the equipment', type: 'text' },
            { key: 'sensor_tank', label: 'Sensor level Minimum / maximum tank', type: 'text' },
            { key: 'tank_solenoid_valve', label: 'Tank / boiler water solenoid valve', type: 'text' },
            { key: 'steam_vat_ev', label: 'EV\'s Steam vat/boiler/direct', type: 'text' },
            { key: 'detergent_dispenser', label: 'Detergent dispenser/dryer', type: 'text' },
            { key: 'sensor_safety', label: 'Sensor/Safety interlock', type: 'text' },
            { key: 'inductive_sensor', label: 'Inductive position sensor', type: 'text' },
            { key: 'unit_parameters', label: 'Unit parameters (after discharge)', type: 'text' },
            { key: 'drive_parameters', label: 'Drive parameters (after switching the equipment off and on)', type: 'text' },
            { key: 'basket_rotation', label: 'Direction of rotation Basket', type: 'text' },
            { key: 'wash_rinse_injectors', label: 'Wash/rinse injectors', type: 'text' },
            { key: 'screw_tightening', label: 'Screw tightening rinsing pump', type: 'text' },
            { key: 'console_calibration', label: 'Console calibration procedure', type: 'text' },
            { key: 'console_language', label: 'Language Console', type: 'text' },
            { key: 'unit_temperature', label: 'Unit set point temperature', type: 'text' }
        ]
    },
    {
        id: 'consumption',
        title: '13 - Consumption',
        icon: '13',
        fields: [
            { key: 'tension_tests', label: 'Tension in the tests', type: 'text' },
            { key: 'consumption_heating1_tank', label: 'Consumption Heating Element 1 Tank (A)', type: 'text' },
            { key: 'consumption_heating2_tank', label: 'Consumption Heating Element 2 Tank (A)', type: 'text' },
            { key: 'consumption_heating3_tank', label: 'Consumption Heating Element 3 Tank (A)', type: 'text' },
            { key: 'consumption_heating4_tank', label: 'Consumption Heating Element 4 Tank (A)', type: 'text' },
            { key: 'consumption_heating1_boiler', label: 'Consumption Heating Element Boiler 1 (A)', type: 'text' },
            { key: 'consumption_heating2_boiler', label: 'Consumption Heating Element Boiler 2 (A)', type: 'text' },
            { key: 'washing_pump_consumption', label: 'Washing Pump Consumption (A)', type: 'text' },
            { key: 'basket_motor_4hz', label: 'Cons. Basket Motor 4Hz (A)', type: 'text' },
            { key: 'basket_motor_80hz', label: 'Cons. Basket Motor 80Hz (A)', type: 'text' },
            { key: 'fan_consumption', label: 'Fan Consumption (A)', type: 'text' },
            { key: 'rising_pump_consumption', label: 'Consumption Rising Pump (A)', type: 'text' },
            { key: 'tank_temperature', label: 'Temperature confirmation Tank', type: 'text' },
            { key: 'boiler_temperature', label: 'Boiler Temperature Confirmation', type: 'text' },
            { key: 'regulation_relay', label: 'Supervision of the regulation relay (A)', type: 'text' },
            { key: 'thermal_rinsing_pump', label: 'Thermal regulation of the rinsing pump (A)', type: 'text' },
            { key: 'thermal_fan', label: 'Fan thermal regulation (A)', type: 'text' },
            { key: 'thermal_speed_drive', label: 'Thermal variable speed drive control (A) (P305)', type: 'text' },
            { key: 'washing_pressure', label: 'Washing pressure', type: 'text' }
        ]
    },
    {
        id: 'summary',
        title: '14 - Summary',
        icon: '14',
        fields: [
            { key: 'notes_summary', label: 'Notes', type: 'textarea', fullWidth: true },
            { key: 'date_summary', label: 'Date', type: 'date' },
            { key: 'signature_technician', label: 'Signature Somengil Technician', type: 'textarea' },
            { key: 'signature_representative', label: 'Signature Customer Representative', type: 'textarea' }
        ]
    }
];

/**
 * Gera HTML para um campo individual
 */
function generateFieldHTML(field, sectionId) {
    const fieldId = `field-${field.key}`;
    const colSpan = field.fullWidth ? 'md:col-span-2' : '';
    let html = `<div class="col-span-1 ${colSpan}">`;
    
    switch(field.type) {
        case 'text':
        case 'email':
        case 'number':
            html += `
                <label class="block text-sm font-medium text-gray-700 mb-1">${field.label}</label>
                <input type="${field.type}" id="${fieldId}" class="w-full p-2 border border-gray-300 rounded focus:border-somengil-blue focus:ring-1 focus:ring-somengil-blue outline-none" oninput="saveData()">
            `;
            break;
        case 'textarea':
            html += `
                <label class="block text-sm font-medium text-gray-700 mb-1">${field.label}</label>
                <textarea id="${fieldId}" rows="3" class="w-full p-2 border border-gray-300 rounded focus:border-somengil-blue focus:ring-1 focus:ring-somengil-blue outline-none" oninput="saveData()"></textarea>
            `;
            break;
        case 'date':
            html += `
                <label class="block text-sm font-medium text-gray-700 mb-1">${field.label}</label>
                <input type="date" id="${fieldId}" class="w-full p-2 border border-gray-300 rounded focus:border-somengil-blue focus:ring-1 focus:ring-somengil-blue outline-none" oninput="saveData()">
            `;
            break;
        case 'file':
            html += `
                <label class="block text-sm font-medium text-gray-700 mb-1">${field.label}</label>
                <input type="file" id="${fieldId}" class="w-full p-2 border border-gray-300 rounded focus:border-somengil-blue focus:ring-1 focus:ring-somengil-blue outline-none" onchange="saveData()">
            `;
            break;
        case 'checkbox':
            html += `
                <label class="flex items-center">
                    <input type="checkbox" id="${fieldId}" class="w-4 h-4 text-somengil-blue border-gray-300 rounded focus:ring-somengil-blue mr-2" onchange="saveData()">
                    <span class="text-sm font-medium text-gray-700">${field.label}</span>
                </label>
            `;
            break;
        case 'radio':
            html += `
                <label class="block text-sm font-medium text-gray-700 mb-2">${field.label}</label>
                <div class="flex gap-4">
            `;
            if(field.options) {
                field.options.forEach(option => {
                    html += `<label class="flex items-center"><input type="radio" name="${field.key}" value="${option}" onchange="saveData()"> <span class="ml-2">${option}</span></label>`;
                });
            }
            html += `</div>`;
            break;
    }
    
    html += `</div>`;
    return html;
}

/**
 * Gera HTML para uma seção completa
 */
function generateSectionHTML(section, sectionNumber) {
    let html = `
        <div id="${section.id}" class="content-section hidden">
            <div style="background-color: #dfe4e4;" class="rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mb-4 md:mb-6">
                <h3 class="text-base md:text-lg font-semibold text-somengil-blue mb-3 md:mb-4 pb-2 border-b border-gray-100">${section.icon}. ${section.title}</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    `;
    
    section.fields.forEach(field => {
        html += generateFieldHTML(field, section.id);
    });
    
    html += `
                </div>
                <div class="mt-6 flex justify-between items-center">
                    <div class="flex gap-2">
                        <button onclick="goToPreviousSection()" class="bg-somengil-blue hover:bg-somengil-accent text-white font-bold py-2 px-3 rounded-lg shadow-lg hover:shadow-xl transition-all text-lg">«</button>
                        <button onclick="goToNextSection()" class="bg-somengil-blue hover:bg-somengil-accent text-white font-bold py-2 px-3 rounded-lg shadow-lg hover:shadow-xl transition-all text-lg">»</button>
                    </div>
                    <button onclick="saveDataWithFeedback(this)" class="bg-somengil-blue hover:bg-somengil-accent text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-sm">
                        <span class="text-lg">💾</span>
                        <span data-translate="Guardar Progresso">Guardar Alterações</span>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return html;
}

/**
 * Renderiza todos os separadores dinamicamente
 */
function renderAllSections() {
    const container = document.getElementById('sections-container');
    if (!container) {
        console.error('Contentor de seções não encontrado (ID: sections-container)');
        return;
    }
    
    let html = '';
    COMPLIANCE_SECTIONS.forEach((section, index) => {
        html += generateSectionHTML(section, index + 1);
    });
    
    container.innerHTML = html;
    console.log('✓ Separadores Compliance gerados dinamicamente');
}

/**
 * Obtém todos os IDs de campo do estado global
 */
function getEmptyDefaultsFromSections() {
    const defaults = {};
    COMPLIANCE_SECTIONS.forEach(section => {
        section.fields.forEach(field => {
            if (field.type === 'checkbox') {
                defaults[field.key] = false;
            } else if (field.type === 'number') {
                defaults[field.key] = null;
            } else {
                defaults[field.key] = '';
            }
        });
    });
    return defaults;
}

/**
 * Cria mapping de campos para cálculo de progresso
 */
function createSectionMap() {
    const map = {};
    COMPLIANCE_SECTIONS.forEach((section, idx) => {
        const sectionId = section.id;
        section.fields.forEach(field => {
            map[field.key] = sectionId;
        });
    });
    return map;
}

/**
 * Renderiza os botões de navegação do sidebar
 */
function renderNavigation() {
    const navContainer = document.getElementById('nav-compliance-sections');
    if (!navContainer) {
        console.error('Contentor de navegação não encontrado (ID: nav-compliance-sections)');
        return;
    }
    
    let html = '';
    COMPLIANCE_SECTIONS.forEach((section, idx) => {
        const isFirst = idx === 0;
        const classList = isFirst ? 'sidebar-dark-active' : 'sidebar-dark-inactive';
        
        html += `
            <button id="btn-${section.id}" onclick="switchTab('${section.id}')" class="nav-item ${classList} w-full text-left px-4 md:px-6 py-1.5 md:py-2 text-xs md:text-sm font-medium transition-colors flex items-center justify-between group">
                <div class="flex items-center">
                    <span class="section-icon w-6 h-6 rounded-full bg-gray-700 text-slate-400 flex items-center justify-center text-xs mr-3">${section.icon}</span>
                    <span>${section.title}</span>
                </div>
                <span id="pct-${section.id}" class="text-xs font-bold w-12 text-slate-500 text-right">0%</span>
            </button>
        `;
    });
    
    navContainer.innerHTML = html;
    console.log('✓ Navegação Compliance renderizada');
}

/**
 * Inicializa sistema de seções
 */
window.initComplianceSections = function() {
    renderAllSections();
    renderNavigation();
    const emptyDefaults = getEmptyDefaultsFromSections();
    window.complianceSectionMap = createSectionMap();
    window.complianceEmptyDefaults = emptyDefaults;
    console.log('Campos totais:', Object.keys(emptyDefaults).length);
    console.log('Seções:', COMPLIANCE_SECTIONS.length);
};
/**
 * Manipulador para foto do técnico
 */
window.handleTechnicianPhoto = function(inputElement) {
    const file = inputElement.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const previewElement = document.getElementById('field-technician_photo-preview');
        if (previewElement) {
            previewElement.innerHTML = `<img src="${e.target.result}" alt="Técnico" class="w-full h-full object-cover rounded-full">`;
        }
        // Salva os dados
        window.saveData();
    };
    reader.readAsDataURL(file);
};