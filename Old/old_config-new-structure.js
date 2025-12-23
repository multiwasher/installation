/**
 * CONFIGURAÇÃO DA NOVA ESTRUTURA - COMPLIANCE SHEET
 * Separadores e campos conforme solicitado
 */

// Nova estrutura de separadores (tabs)
const NEW_SECTIONS = {
    'installation-info': {
        name: 'Installation Info',
        icon: 'I',
        fields: [
            'idioma', 'status', 'somengil_technician', 'name', 'phone', 'email',
            'customer_identification', 'customer', 'address', 'zip_code', 'city', 'country',
            'vat_number', 'customer_representative', 'rep_phone', 'rep_email',
            'service_identification', 'installation', 'preventive_maintenance', 'corrective_maintenance', 'warranty',
            'equipment_identification', 'quantity', 'model_product', 'serial_number', 'delivered', 'notes'
        ]
    },
    'documentation': {
        name: 'Documentation',
        icon: 'II',
        fields: [
            'manual_delivered', 'manual_delivered_who', 'name1', 'position1', 'phone1', 'email1',
            'manual_not_delivered_why'
        ]
    },
    'training-washing': {
        name: 'Training (washing)',
        icon: 'III',
        fields: [
            'washing_training', 'washing_training_who', 'name2', 'position2', 'phone2', 'email2',
            'washing_training_not_why'
        ]
    },
    'training-cleaning': {
        name: 'Training (cleaning)',
        icon: 'IV',
        fields: [
            'cleaning_training', 'cleaning_training_who', 'name3', 'position3', 'phone3', 'email3',
            'cleaning_training_not_why'
        ]
    },
    'measurements': {
        name: 'Measurements',
        icon: 'V',
        fields: [
            'water_input_temperature', 'input_pressure', 'water_quality',
            'electrical_consumption', 'electrical_consumption_measurement', 'electrical_measurement_who'
        ]
    },
    'washing': {
        name: 'Washing',
        icon: 'VI',
        fields: [
            'washing_test', 'washing_quality', 'washing_quality_explanation', 'detergent_used', 'debit', 'concentration'
        ]
    },
    'preventive-maintenance': {
        name: 'Preventive Maintenance',
        icon: 'VII',
        fields: [
            'pm_training', 'pm_training_who', 'name5', 'position5', 'phone5', 'email5', 'pm_training_not_why'
        ]
    },
    'programming-training': {
        name: 'Programming',
        icon: 'VIII',
        fields: [
            'programming_training', 'programming_training_who', 'name6', 'position6', 'phone6', 'email6', 'programming_training_not_why'
        ]
    },
    'programming-machine': {
        name: 'Machine Programming',
        icon: 'IX',
        fields: [
            'programmed_machine', 'utensils_programmed', 'program_number',
            'program1_photo', 'program2_photo', 'program3_photo', 'program4_photo', 'program5_photo',
            'utensils_description', 'utensil1_photo', 'utensil2_photo', 'utensil3_photo', 'utensil4_photo', 'utensil5_photo',
            'program_data1', 'wash_time', 'rinse_time', 'spin_time', 'wash_temperature', 'rinse_temperature',
            'final_ventilation', 'open_door_ventilation'
        ]
    },
    'status-training': {
        name: 'Status Training',
        icon: 'X',
        fields: [
            'training_completed'
        ]
    },
    'extras': {
        name: 'EXTRAS',
        icon: 'XI',
        fields: [
            'sds', 'drd', 'dtc', 'cre_drd', 'ivs_drd', 'efs', 'exd', 'hmi', 'stm'
        ]
    },
    'general-evaluation': {
        name: 'General Evaluation',
        icon: 'XII',
        fields: [
            'machine_type', 'heating', 'assembly', 'general_condition', 'sensor_tank',
            'tank_solenoid_valve', 'steam_vat_ev', 'detergent_dispenser', 'sensor_safety',
            'inductive_sensor', 'unit_parameters', 'drive_parameters', 'basket_rotation',
            'wash_rinse_injectors', 'screw_tightening', 'console_calibration', 'console_language', 'unit_temperature'
        ]
    },
    'summary': {
        name: 'Summary',
        icon: 'XIII',
        fields: [
            'notes_summary', 'date_summary', 'signature_technician', 'signature_representative'
        ]
    }
};

// Mapeamento de chaves camelCase para nomes descritivos (português)
const FIELD_LABELS = {
    // Installation Info
    'idioma': 'Idioma',
    'status': 'Status',
    'somengil_technician': 'Somengil Technician',
    'name': 'Name',
    'phone': 'Phone',
    'email': 'Email',
    'customer_identification': 'Customer Identification',
    'customer': 'Customer',
    'address': 'Address',
    'zip_code': 'Zip Code',
    'city': 'City',
    'country': 'Country',
    'vat_number': 'VAT Number / Tx ID',
    'customer_representative': 'Customer Representative Person',
    'rep_phone': 'Phone',
    'rep_email': 'Email',
    'service_identification': 'Service Identification',
    'installation': 'Installation',
    'preventive_maintenance': 'Preventive Maintenance',
    'corrective_maintenance': 'Corrective Maintenance',
    'warranty': 'Warranty',
    'equipment_identification': 'Equipment & Accessories Identification',
    'quantity': 'Quantity',
    'model_product': 'Model/Product',
    'serial_number': 'Serial N.º',
    'delivered': 'Delivered',
    'notes': 'Notes',
    
    // Documentation
    'manual_delivered': 'The machine manual was delivered and explained',
    'manual_delivered_who': '1- If YES, please identify who',
    'name1': 'Name1',
    'position1': 'Position1',
    'phone1': 'Phone1',
    'email1': 'Email1',
    'manual_not_delivered_why': '1 - If NO please explain who',
    
    // Training (washing)
    'washing_training': 'Daily Washing Training?',
    'washing_training_who': '2- If YES, please identify Who',
    'name2': 'Name2',
    'position2': 'Work Position2',
    'phone2': 'Phone2',
    'email2': 'Email2',
    'washing_training_not_why': '2- If NO please explain why',
    
    // Training (cleaning)
    'cleaning_training': 'Daily Washing Training? (cleaning the machine)',
    'cleaning_training_who': '3- If YES, please identify Who',
    'name3': 'Name3',
    'position3': 'Work Position3',
    'phone3': 'Phone3',
    'email3': 'Email3',
    'cleaning_training_not_why': '3- If NO please explain why',
    
    // Measurements
    'water_input_temperature': 'Water input temperature',
    'input_pressure': 'Input pressure',
    'water_quality': 'Water quality',
    'electrical_consumption': 'Eletrical consumption',
    'electrical_consumption_measurement': 'Measurement electical consumption',
    'electrical_measurement_who': '4- If YES, please identify Who',
    
    // Washing
    'washing_test': 'Washing Test?',
    'washing_quality': 'Please qualify washing quality',
    'washing_quality_explanation': 'Please explain your answer',
    'detergent_used': 'Detergent used',
    'debit': 'Debit',
    'concentration': 'Concentration',
    
    // Preventive Maintenance
    'pm_training': 'Preventive Maintenance Training?',
    'pm_training_who': '5- If YES, please identify Who',
    'name5': 'Name5',
    'position5': 'Work Position5',
    'phone5': 'Phone5',
    'email5': 'Email5',
    'pm_training_not_why': '5- If NO please explain why',
    
    // Programming Training
    'programming_training': 'Programming training?',
    'programming_training_who': '6- If YES, please identify Who',
    'name6': 'Name6',
    'position6': 'Work Position6',
    'phone6': 'Phone6',
    'email6': 'Email6',
    'programming_training_not_why': '6- If NO please explain why',
    
    // Machine Programming
    'programmed_machine': 'Programmed Machine',
    'utensils_programmed': 'Was the machine programmed for the utensils to be washed?',
    'program_number': 'Program Number',
    'program1_photo': 'Program1 Photo',
    'program2_photo': 'Program2 Photo',
    'program3_photo': 'Program3 Photo',
    'program4_photo': 'Program4 Photo',
    'program5_photo': 'Program5 Photo',
    'utensils_description': 'Utensils Description/Trolley',
    'utensil1_photo': 'Utensil1 Photo',
    'utensil2_photo': 'Utensil2 Photo',
    'utensil3_photo': 'Utensil3 Photo',
    'utensil4_photo': 'Utensil4 Photo',
    'utensil5_photo': 'Utensil5 Photo',
    'program_data1': 'Program Data 1',
    'wash_time': 'Wash',
    'rinse_time': 'Rinse',
    'spin_time': 'Spin',
    'wash_temperature': 'Washing Temperature',
    'rinse_temperature': 'Rinsing Temperature',
    'final_ventilation': 'Final Ventilation',
    'open_door_ventilation': 'Open Door Ventilation',
    
    // Status Training
    'training_completed': 'Installation and training are successfully completed',
    
    // EXTRAS
    'sds': 'SDS',
    'drd': 'DRD',
    'dtc': 'DTC',
    'cre_drd': 'CRE+DRD',
    'ivs_drd': 'IVS+DRD',
    'efs': 'EFS',
    'exd': 'EXD',
    'hmi': 'HMI',
    'stm': 'STM',
    
    // General Evaluation
    'machine_type': 'Machine Type',
    'heating': 'Heating',
    'assembly': 'Assembly',
    'general_condition': 'General Condition of the equipment',
    'sensor_tank': 'Sensor level Minimum / maximum tank',
    'tank_solenoid_valve': 'Tank / boiler water solenoid valve',
    'steam_vat_ev': 'EV\'s Steam vat/boiler/direct',
    'detergent_dispenser': 'Detergent dispenser/dryer',
    'sensor_safety': 'Sensor/Safety interlock',
    'inductive_sensor': 'Inductive position sensor',
    'unit_parameters': 'Unit parameters (after discharge)',
    'drive_parameters': 'Drive parameters (after switching the equipment off and on)',
    'basket_rotation': 'Direction of rotation Basket',
    'wash_rinse_injectors': 'Wash/rinse injectors',
    'screw_tightening': 'Screw tightening rinsing pump',
    'console_calibration': 'Console calibration procedure',
    'console_language': 'Language Console',
    'unit_temperature': 'Unit set point temperature',
    
    // Summary
    'notes_summary': 'Notes',
    'date_summary': 'Date',
    'signature_technician': 'Signature Somengil Technician',
    'signature_representative': 'Signature Customer Representative'
};
