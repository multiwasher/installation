/**
 * Gerador de Formulários Dinâmicos para a Nova Estrutura Compliance
 * Este arquivo gera os elementos HTML para cada separador dinamicamente
 */

function generateFormSections() {
    const sections = [
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
                { key: 'customer', label: 'Customer', type: 'text' },
                { key: 'address', label: 'Adress', type: 'text' },
                { key: 'zip_code', label: 'Zip Code', type: 'text' },
                { key: 'city', label: 'City', type: 'text' },
                { key: 'country', label: 'Country', type: 'text' },
                { key: 'vat_number', label: 'VAT Number / Tx ID', type: 'text' },
                { key: 'customer_representative', label: 'Customer Representative Person', type: 'text' },
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
                { key: 'equipment_notes', label: 'Notes', type: 'textarea' }
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
                { key: 'manual_delivered', label: 'The machine manual was delivered and explained (YES / NO / Not Applicable)', type: 'radio', options: ['YES', 'NO', 'Not Applicable'] },
                { key: 'manual_delivered_who', label: 'If YES, please identify who', type: 'text' },
                { key: 'name1', label: 'Name', type: 'text' },
                { key: 'position1', label: 'Position', type: 'text' },
                { key: 'phone1', label: 'Phone', type: 'text' },
                { key: 'email1', label: 'Email', type: 'email' },
                { key: 'manual_not_delivered_why', label: 'If NO please explain why', type: 'textarea' }
            ]
        },
        {
            id: 'training-washing',
            title: '3 - Training (washing)',
            icon: '3',
            fields: [
                { key: 'washing_training', label: 'Daily Washing Training? (YES / NO)', type: 'radio', options: ['YES', 'NO'] },
                { key: 'washing_training_who', label: 'If YES, please identify Who', type: 'text' },
                { key: 'washing_training_name', label: 'Name', type: 'text' },
                { key: 'washing_training_position', label: 'Work Position', type: 'text' },
                { key: 'washing_training_phone', label: 'Phone', type: 'text' },
                { key: 'washing_training_email', label: 'Email', type: 'email' },
                { key: 'washing_training_not_why', label: 'If NO please explain why', type: 'textarea' }
            ]
        },
        {
            id: 'training-cleaning',
            title: '4 - Training (cleaning)',
            icon: '4',
            fields: [
                { key: 'cleaning_training', label: 'Daily Washing Training? (cleaning the machine) (YES / NO)', type: 'radio', options: ['YES', 'NO'] },
                { key: 'cleaning_training_who', label: 'If YES, please identify Who', type: 'text' },
                { key: 'cleaning_training_name', label: 'Name', type: 'text' },
                { key: 'cleaning_training_position', label: 'Work Position', type: 'text' },
                { key: 'cleaning_training_phone', label: 'Phone', type: 'text' },
                { key: 'cleaning_training_email', label: 'Email', type: 'email' },
                { key: 'cleaning_training_not_why', label: 'If NO please explain why', type: 'textarea' }
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
                { key: 'electrical_info', label: 'Electrical Info', type: 'text' },
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
                { key: 'washing_test', label: 'Washing Test? (YES / NO)', type: 'radio', options: ['YES', 'NO'] },
                { key: 'washing_quality', label: 'Please qualify washing quality', type: 'text' },
                { key: 'washing_quality_explanation', label: 'Please explain your answer', type: 'textarea' },
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
                { key: 'pm_training', label: 'Preventive Maintenance Training?', type: 'radio', options: ['YES', 'NO'] },
                { key: 'pm_training_who', label: 'If YES, please identify Who', type: 'text' },
                { key: 'pm_training_name', label: 'Name', type: 'text' },
                { key: 'pm_training_position', label: 'Work Position', type: 'text' },
                { key: 'pm_training_phone', label: 'Phone', type: 'text' },
                { key: 'pm_training_email', label: 'Email', type: 'email' },
                { key: 'pm_training_not_why', label: 'If NO please explain why', type: 'textarea' }
            ]
        },
        {
            id: 'programming-training',
            title: '8 - Programming',
            icon: '8',
            fields: [
                { key: 'programming_training', label: 'Programming training?', type: 'radio', options: ['YES', 'NO'] },
                { key: 'programming_training_who', label: 'If YES, please identify Who', type: 'text' },
                { key: 'programming_training_name', label: 'Name', type: 'text' },
                { key: 'programming_training_position', label: 'Work Position', type: 'text' },
                { key: 'programming_training_phone', label: 'Phone', type: 'text' },
                { key: 'programming_training_email', label: 'Email', type: 'email' },
                { key: 'programming_training_not_why', label: 'If NO please explain why', type: 'textarea' }
            ]
        },
        {
            id: 'machine-programming',
            title: '9 - Program',
            icon: '9',
            fields: [
                { key: 'programmed_machine', label: 'Programmed Machine? (YES / NO)', type: 'radio', options: ['YES', 'NO'] },
                { key: 'utensils_programmed', label: 'Was the machine programmed for the utensils to be washed?', type: 'radio', options: ['YES', 'NO'] },
                { key: 'program_number', label: 'Program Number', type: 'text' },
                { key: 'program1_photo', label: 'Program1 Photo', type: 'file' },
                { key: 'program2_photo', label: 'Program2 Photo', type: 'file' },
                { key: 'program3_photo', label: 'Program3 Photo', type: 'file' },
                { key: 'program4_photo', label: 'Program4 Photo', type: 'file' },
                { key: 'program5_photo', label: 'Program4 Photo', type: 'file' },
                { key: 'utensils_description', label: 'Utensils Description/Trolley', type: 'textarea' },
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
                { key: 'training_completed', label: 'Installation and training are successfully completed', type: 'checkbox' }
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
                { key: 'notes_summary', label: 'Notes', type: 'textarea' },
                { key: 'date_summary', label: 'Date', type: 'date' },
                { key: 'signature_technician', label: 'Signature Somengil Technician', type: 'textarea' },
                { key: 'signature_representative', label: 'Signature Customer Representative', type: 'textarea' }
            ]
        }
    ];

    return sections;
}

// Função para gerar HTML de um campo
function generateFieldHTML(field, isCreationMode = false) {
    const fieldId = `field-${field.key}`;
    const creationId = `field-creation-${field.key}`;
    const id = isCreationMode ? creationId : fieldId;
    
    let html = `<div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">${field.label}</label>`;
    
    switch(field.type) {
        case 'text':
        case 'email':
        case 'number':
            html += `<input type="${field.type}" id="${id}" class="w-full p-2 border border-gray-300 rounded focus:border-somengil-blue focus:ring-1 focus:ring-somengil-blue outline-none" oninput="saveData()">`;
            break;
        case 'textarea':
            html += `<textarea id="${id}" rows="4" class="w-full p-2 border border-gray-300 rounded focus:border-somengil-blue focus:ring-1 focus:ring-somengil-blue outline-none" oninput="saveData()"></textarea>`;
            break;
        case 'date':
            html += `<input type="date" id="${id}" class="w-full p-2 border border-gray-300 rounded focus:border-somengil-blue focus:ring-1 focus:ring-somengil-blue outline-none" oninput="saveData()">`;
            break;
        case 'file':
            html += `<input type="file" id="${id}" class="w-full p-2 border border-gray-300 rounded focus:border-somengil-blue focus:ring-1 focus:ring-somengil-blue outline-none" oninput="saveData()">`;
            break;
        case 'checkbox':
            html += `<input type="checkbox" id="${id}" class="w-4 h-4 text-somengil-blue border-gray-300 rounded focus:ring-somengil-blue" onchange="saveData()">`;
            break;
        case 'radio':
            if(field.options) {
                field.options.forEach(option => {
                    html += `<label class="inline-block mr-4"><input type="radio" name="${field.key}" value="${option}" onchange="saveData()"> ${option}</label>`;
                });
            }
            break;
    }
    
    html += `</div>`;
    return html;
}
