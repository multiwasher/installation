/**
 * GOOGLE APPS SCRIPT - COMPLIANCE SHEET
 * Usa a nova estrutura da Compliance Sheet
 * Arquivo gerado dinamicamente para funcionar com todos os 128 campos
 */

const SPREADSHEET_ID = '19fl3O8rNjyl7NdXjIBHC6X0nREFAZEsadycHiScL5ro'; // Sheet: Compliance

// Mapeamento dos campos camelCase para labels em português
const FIELD_MAPPING = {
    // Installation Responsibility (1.1)
    'status': 'Inst_Status_Planned_NotPlanned',
    'installation_date': 'Inst_Date',
    'somengil_technician': 'Inst_Company',
    'technician_name': 'Inst_Technician_Name',
    'technician_phone': 'Inst_Technician_Phone',
    'technician_email': 'Inst_Technician_Email',
    
    // Customer Identification (1.2)
    'customer': 'Cust_Name',
    'address': 'Cust_Address',
    'zip_code': 'Cust_ZipCode',
    'city': 'Cust_City',
    'country': 'Cust_Country',
    'vat_number': 'Cust_VAT_Number',
    'customer_representative': 'Cust_Representative_Person',
    'rep_phone': 'Cust_Representative_Phone',
    'rep_email': 'Cust_Representative_Email',
    
    // Service Identification (1.3)
    'installation': 'Svc_Installation',
    'preventive_maintenance': 'Svc_Preventive_Maintenance',
    'corrective_maintenance': 'Svc_Corrective_Maintenance',
    'warranty': 'Svc_Warranty',
    
    // Equipment and Accessories Identification (1.4)
    'quantity': 'Equip_Quantity',
    'model_product': 'Equip_Model_Product',
    'serial_number': 'Equip_Serial_Number',
    'delivered': 'Equip_Delivered_Yes_No',
    'equipment_notes': 'Equip_Notes',
    
    // EXTRAS (1.5)
    'sds': 'EXTRA_SDS',
    'drd': 'EXTRA_DRD',
    'dtc': 'EXTRA_DTC',
    'cre_drd': 'EXTRA_CRE_DRD',
    'ivs_drd': 'EXTRA_IVS_DRD',
    'efs': 'EXTRA_EFS',
    'exd': 'EXTRA_EXD',
    'hmi': 'EXTRA_HMI',
    'stm': 'EXTRA_STM',
    
    // Documentation (2)
    'manual_delivered': 'Doc_Manual_Delivered_Explained',
    'name1': 'Doc_Receiver_Name',
    'position1': 'Doc_Receiver_Position',
    'phone1': 'Doc_Receiver_Phone',
    'email1': 'Doc_Receiver_Email',
    'manual_not_delivered_why': 'Doc_No_Explain_Why',
    
    // Training (washing) (3)
    'washing_training': 'Train_Wash_Daily_Yes_No',
    'washing_training_name': 'Train_Wash_Who_Name',
    'washing_training_position': 'Train_Wash_Who_Position',
    'washing_training_phone': 'Train_Wash_Who_Phone',
    'washing_training_email': 'Train_Wash_Who_Email',
    'washing_training_not_why': 'Train_Wash_No_Explain_Why',
    
    // Training (cleaning) (4)
    'cleaning_training': 'Train_Clean_Daily_Yes_No',
    'cleaning_training_name': 'Train_Clean_Who_Name',
    'cleaning_training_position': 'Train_Clean_Who_Position',
    'cleaning_training_phone': 'Train_Clean_Who_Phone',
    'cleaning_training_email': 'Train_Clean_Who_Email',
    'cleaning_training_not_why': 'Train_Clean_No_Explain_Why',
    
    // Measurements (5)
    'water_input_temperature': 'Meas_Water_Input_Temp',
    'input_pressure': 'Meas_Input_Pressure',
    'water_quality': 'Meas_Water_Quality',
    'electrical_info': 'Meas_Electrical_Info',
    'electrical_consumption': 'Meas_Electrical_Consumption',
    'electrical_consumption_measurement': 'Meas_Consumption_Measurement',
    'electrical_measurement_who': 'Meas_Consumption_Who_Identified',
    
    // Washing (6)
    'washing_test': 'WashTest_Performed_Yes_No',
    'washing_quality': 'WashTest_Quality_Rating',
    'washing_quality_explanation': 'WashTest_Answer_Explanation',
    'detergent_used': 'WashTest_Detergent_Used',
    'debit': 'WashTest_Debit',
    'concentration': 'WashTest_Concentration',
    
    // Preventive Maintenance (7)
    'pm_training': 'PrevMaint_Training_Yes_No',
    'pm_training_name': 'PrevMaint_Who_Name',
    'pm_training_position': 'PrevMaint_Who_Position',
    'pm_training_phone': 'PrevMaint_Who_Phone',
    'pm_training_email': 'PrevMaint_Who_Email',
    'pm_training_not_why': 'PrevMaint_No_Explain_Why',
    
    // Programming (8)
    'programming_training': 'Prog_Training_Yes_No',
    'programming_training_name': 'Prog_Training_Who_Name',
    'programming_training_position': 'Prog_Training_Who_Position',
    'programming_training_phone': 'Prog_Training_Who_Phone',
    'programming_training_email': 'Prog_Training_Who_Email',
    'programming_training_not_why': 'Prog_Training_No_Explain_Why',
    
    // Program (9)
    'programmed_machine': 'Machine_Programmed_Yes_No',
    'utensils_programmed': 'Machine_Programmed_For_Utensils',
    'program_number': 'Program_Number',
    'program1_photo': 'Photo_Program1',
    'program2_photo': 'Photo_Program2',
    'program3_photo': 'Photo_Program3',
    'program4_photo': 'Photo_Program4_A',
    'program5_photo': 'Photo_Program4_B',
    'utensils_description': 'Utensils_Description_Trolley',
    'utensil1_photo': 'Photo_Utensil1',
    'utensil2_photo': 'Photo_Utensil2',
    'utensil3_photo': 'Photo_Utensil3',
    'utensil4_photo': 'Photo_Utensil4',
    'utensil5_photo': 'Photo_Utensil5',
    
    // Program Data (10)
    'wash_time': 'Data_Wash_Time',
    'rinse_time': 'Data_Rinse_Time',
    'spin_time': 'Data_Spin_Time',
    'wash_temperature': 'Data_Wash_Temperature',
    'rinse_temperature': 'Data_Rinse_Temperature',
    'final_ventilation': 'Data_Final_Ventilation',
    'open_door_ventilation': 'Data_Open_Door_Ventilation',
    
    // Status Training (11)
    'training_completed': 'Status_Installation_Training_Completed',
    
    // Points to evaluate (12)
    'machine_type': 'Eval_Machine_Type',
    'heating': 'Eval_Heating',
    'assembly': 'Eval_Assembly',
    'general_condition': 'Eval_General_Condition',
    'sensor_tank': 'Eval_Sensor_Level_Tank',
    'tank_solenoid_valve': 'Eval_Tank_Boiler_Solenoid_Valve',
    'steam_vat_ev': 'Eval_EV_Steam_Vat_Boiler',
    'detergent_dispenser': 'Eval_Detergent_Dispenser_Dryer',
    'sensor_safety': 'Eval_Sensor_Safety_Interlock',
    'inductive_sensor': 'Eval_Inductive_Position_Sensor',
    'unit_parameters': 'Eval_Unit_Parameters_Post_Discharge',
    'drive_parameters': 'Eval_Drive_Parameters_Reboot',
    'basket_rotation': 'Eval_Direction_Rotation_Basket',
    'wash_rinse_injectors': 'Eval_Wash_Rinse_Injectors',
    'screw_tightening': 'Eval_Screw_Tightening_Rinsing_Pump',
    'console_calibration': 'Eval_Console_Calibration_Procedure',
    'console_language': 'Eval_Language_Console',
    'unit_temperature': 'Eval_Unit_Setpoint_Temperature',
    
    // Consumption (13)
    'tension_tests': 'Cons_Tension_Tests',
    'consumption_heating1_tank': 'Cons_Heater_1_Tank_A',
    'consumption_heating2_tank': 'Cons_Heater_2_Tank_A',
    'consumption_heating3_tank': 'Cons_Heater_3_Tank_A',
    'consumption_heating4_tank': 'Cons_Heater_4_Tank_A',
    'consumption_heating1_boiler': 'Cons_Heater_Boiler_1_A',
    'consumption_heating2_boiler': 'Cons_Heater_Boiler_2_A',
    'washing_pump_consumption': 'Cons_Washing_Pump_A',
    'basket_motor_4hz': 'Cons_Basket_Motor_4_Hz_A',
    'basket_motor_80hz': 'Cons_Basket_Motor_80_Hz_A',
    'fan_consumption': 'Cons_Fan_A',
    'rising_pump_consumption': 'Cons_Rising_Pump_A',
    'tank_temperature': 'Temp_Confirm_Tank',
    'boiler_temperature': 'Temp_Confirm_Boiler',
    'regulation_relay': 'Relay_Supervision_Regulation_A',
    'thermal_rinsing_pump': 'Thermal_Reg_Rinsing_Pump_A',
    'thermal_fan': 'Thermal_Reg_Fan_A',
    'thermal_speed_drive': 'Thermal_Variable_Speed_Drive_A_P305',
    'washing_pressure': 'Washing_Pressure',
    
    // Summary (14)
    'notes_summary': 'Summary_Notes',
    'date_summary': 'Summary_Date',
    'signature_technician': 'Signature_Technician',
    'signature_representative': 'Signature_Customer'
};

// Mapeamento para os campos da création-form-view para os cabeçalhos do Compliance Sheet
const CREATION_FORM_MAPPING = {
    'tecnicoNome': 'Somengil Technician',
    'tecnicoEmail': 'Email',  // Email do técnico (coluna Email)
    'tecnicoTelefone': 'Phone',  // Phone do técnico (coluna Phone)
    'clienteNome': 'Customer',
    'clienteNIF': 'VAT Number / Tx ID',
    'clienteMorada': 'Address',
    'clienteEmail': 'Email',  // Email do cliente (coluna Email)
    'clienteCodigoPostal': 'Zip Code',
    'clienteCidade': 'City',
    'clientePais': 'Country',
    'clienteRepresentante': 'Customer Representative Person',
    'clienteTelefone': 'Phone',  // Phone do cliente (coluna Phone)
    'equipamentoModelo': 'Model/Product',
    'equipamentoVoltagem': 'Voltagem',  // Campo customizado
    'equipamentoFrequencia': 'Frequência',  // Campo customizado
    'equipamentoAquecimento': 'Heating',
    'condicaoMontagem': 'Assembly',
    'instalacaoTipo': 'Tipo de Instalação',  // Campo customizado
    'responsabilidadeGradil': 'Responsabilidade Gradil'  // Campo customizado
};

// Array de headers (coluna 1 = ID, coluna 2 = Timestamp, depois os outros campos)
// Seções com subsecções (labels com números e pontos)
const SECTION_HEADERS = [
    '1.1 - Installation Responsability',
    '1.2 - Customer Identification',
    '1.3 - Service Identification',
    '1.4 - Equipment and Accessories Identification',
    '1.5 - EXTRAS',
    '2 - Documentation',
    '3 - Training (washing)',
    '4 - Training (cleaning)',
    '5 - Measurements',
    '6 - Washing',
    '7 - Preventive Maintenance',
    '8 - Programming',
    '9 - Program',
    '10 - Program Data',
    '11 - Status Training',
    '12 - Points to evaluate',
    '13 - Consumption',
    '14 - Summary'
];

// Colunas customizadas da création-form-view
const CUSTOM_HEADERS = [];

// Construir COLUMN_HEADERS com as seções intercaladas
// Cada slice começa onde o anterior terminou
const COLUMN_HEADERS = [
    'ID',
    'TimeStamp',
    SECTION_HEADERS[0], // '1.1 - Installation Responsability'
    ...Object.values(FIELD_MAPPING).slice(0, 6), 
    SECTION_HEADERS[1], // '1.2 - Customer Identification'
    ...Object.values(FIELD_MAPPING).slice(6, 15), 
    SECTION_HEADERS[2], // '1.3 - Service Identification'
    ...Object.values(FIELD_MAPPING).slice(15, 19), 
    SECTION_HEADERS[3], // '1.4 - Equipment and Accessories Identification'
    ...Object.values(FIELD_MAPPING).slice(19, 24), 
    SECTION_HEADERS[4], // '1.5 - EXTRAS'
    ...Object.values(FIELD_MAPPING).slice(24, 33), 
    SECTION_HEADERS[5], // '2 - Documentation'
    ...Object.values(FIELD_MAPPING).slice(33, 39), 
    SECTION_HEADERS[6], // '3 - Training (washing)'
    ...Object.values(FIELD_MAPPING).slice(39, 45), 
    SECTION_HEADERS[7], // '4 - Training (cleaning)'
    ...Object.values(FIELD_MAPPING).slice(45, 51), 
    SECTION_HEADERS[8], // '5 - Measurements'
    ...Object.values(FIELD_MAPPING).slice(51, 58), 
    SECTION_HEADERS[9], // '6 - Washing'
    ...Object.values(FIELD_MAPPING).slice(58, 64), 
    SECTION_HEADERS[10], // '7 - Preventive Maintenance'
    ...Object.values(FIELD_MAPPING).slice(64, 70), 
    SECTION_HEADERS[11], // '8 - Programming'
    ...Object.values(FIELD_MAPPING).slice(70, 76), 
    SECTION_HEADERS[12], // '9 - Program'
    ...Object.values(FIELD_MAPPING).slice(76, 90), 
    SECTION_HEADERS[13], // '10 - Program Data'
    ...Object.values(FIELD_MAPPING).slice(90, 97), 
    SECTION_HEADERS[14], // '11 - Status Training'
    ...Object.values(FIELD_MAPPING).slice(97, 98), 
    SECTION_HEADERS[15], // '12 - Points to evaluate'
    ...Object.values(FIELD_MAPPING).slice(98, 116), 
    SECTION_HEADERS[16], // '13 - Consumption'
    ...Object.values(FIELD_MAPPING).slice(116, 135), 
    SECTION_HEADERS[17], // '14 - Summary'
    ...Object.values(FIELD_MAPPING).slice(135), 
];

// Mapeamento inverso para leitura
const REVERSE_MAPPING = {};
for (const [key, label] of Object.entries(FIELD_MAPPING)) {
    REVERSE_MAPPING[label] = key;
}

/**
 * Gera um ID único: serial + & + 3 números aleatórios
 * Exemplo: 12371265&045
 */
function generateUniqueId(serialNumber) {
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return serialNumber + '&' + randomNum;
}

/**
 * Função principal para processar requisições POST
 */
function doPost(request) {
    const output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);
    
    // IMPORTANTE: Adicionar headers CORS para permitir requisições do frontend
    // Nota: Google Apps Script não suporta headers CORS personalizados diretamente,
    // mas o deploy como webapp com "Execute as me" e "Anyone" permite acesso
    
    if (!request) {
        return output.setContent(JSON.stringify({
            result: "error",
            message: "Objeto de requisição não fornecido."
        }));
    }

    let payload = request.parameter;
    let action = payload.action;
    let serialNumber = payload.serialNumber;

    // Tenta SOBRESCREVER com o payload JSON
    if (request.postData && request.postData.contents) {
        try {
            const jsonPayload = JSON.parse(request.postData.contents);
            if (jsonPayload) {
                payload = jsonPayload;
                serialNumber = jsonPayload.serial || serialNumber;
                action = jsonPayload.action || 'write';
            }
        } catch(e) {
            Logger.log("Aviso: Falha na análise JSON. Usando URL parameters como fallback. Erro: " + e.toString());
        }
    }

    try {
        if (action === 'fetch') {
            if (!serialNumber) {
                throw new Error("O Número de Série (serial/serialNumber) é obrigatório para a ação 'fetch'.");
            }
            return handleFetchData(serialNumber);
        }
        else if (action === 'fetchAll') {
            return handleFetchAllData();
        }
        else if (action === 'write' && payload.data) {
            if (!serialNumber) {
                throw new Error("O Número de Série (serial/serialNumber) é obrigatório para a ação 'write'.");
            }
            return handleWriteData(serialNumber, payload);
        }
        else {
            return output.setContent(JSON.stringify({
                result: "error",
                message: "Ação inválida ou faltante. Use 'fetch', 'fetchAll' ou 'write'."
            }));
        }

    } catch (e) {
        Logger.log("Erro na função doPost: " + e.toString());
        return output.setContent(JSON.stringify({
            result: "error",
            message: "Erro interno: " + e.toString()
        }));
    }
}

/**
 * Handle WRITE data to the Compliance sheet
 */
function handleWriteData(serialNumber, payload) {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName('Compliance');

    if (!sheet) {
        return ContentService.createTextOutput(JSON.stringify({
            result: "error",
            message: "Separador 'Compliance' não encontrado no Sheet."
        })).setMimeType(ContentService.MimeType.JSON);
    }

    // Se a sheet está vazia, adiciona os headers
    if (sheet.getLastRow() < 1) {
        sheet.appendRow(COLUMN_HEADERS);
    }

    const checklistData = payload.data;
    const timestamp = payload.timestamp || new Date().toISOString();
    const isInitialCreation = payload.isInitialCreation || false;

    // Gera o ID único (serial + & + 3 números aleatórios)
    const uniqueId = generateUniqueId(serialNumber);

    // Cria a linha de valores a ser inserida
    const rowValues = [uniqueId, timestamp];
    
    // Adiciona os dados em ordem dos COLUMN_HEADERS
    for (let i = 2; i < COLUMN_HEADERS.length; i++) {
        const header = COLUMN_HEADERS[i];
        
        // Ignora as seções (headers que estão em SECTION_HEADERS)
        if (SECTION_HEADERS.includes(header)) {
            rowValues.push(''); // Adiciona vazio para a seção
            continue;
        }
        
        // Primeiro tenta encontrar no REVERSE_MAPPING (campos normais)
        let formKey = REVERSE_MAPPING[header];
        let value = '';
        
        if (formKey && checklistData.hasOwnProperty(formKey)) {
            value = checklistData[formKey];
        }
        
        if (value === null || value === undefined) {
            value = '';
        }
        rowValues.push(value);
    }

    Logger.log('Escrita para Serial: ' + serialNumber);
    Logger.log('ID Gerado: ' + uniqueId);
    Logger.log('É Criação Inicial: ' + isInitialCreation);
    Logger.log('Número de colunas: ' + COLUMN_HEADERS.length);
    Logger.log('Número de valores: ' + rowValues.length);

    try {
        // SEMPRE adicionar uma nova linha para novo equipamento
        // Para edição, procurar a linha do serial e atualizar
        if (isInitialCreation || sheet.getLastRow() < 2) {
            // Criar novo equipamento: adiciona nova linha
            sheet.appendRow(rowValues);
            Logger.log('Nova linha adicionada ao Compliance sheet');
        } else {
            // Editar equipamento existente: procura o serial correto na coluna ID
            const allData = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn()).getValues();
            let targetRowIndex = -1;
            
            // Procura a linha com o serial na coluna ID (índice 0)
            for (let row = 1; row < allData.length; row++) {
                if (String(allData[row][0]).includes(serialNumber)) {
                    targetRowIndex = row + 1; // Converter para 1-indexed
                    break;
                }
            }
            
            if (targetRowIndex !== -1) {
                // Encontrou o serial: atualiza essa linha
                sheet.getRange(targetRowIndex, 1, 1, rowValues.length).setValues([rowValues]);
                Logger.log('Linha ' + targetRowIndex + ' atualizada para Serial: ' + serialNumber);
            } else {
                // Serial não encontrado: adiciona como nova linha
                sheet.appendRow(rowValues);
                Logger.log('Serial não encontrado. Nova linha adicionada para Serial: ' + serialNumber);
            }
        }
        
        SpreadsheetApp.flush();

        return ContentService.createTextOutput(JSON.stringify({
            result: "success",
            message: `Dados salvos para Serial: ${serialNumber}`,
            id: uniqueId
        })).setMimeType(ContentService.MimeType.JSON);

    } catch (e) {
        Logger.log("Erro ao escrever: " + e.toString());
        return ContentService.createTextOutput(JSON.stringify({
            result: "error",
            message: "Falha ao escrever dados: " + e.toString()
        })).setMimeType(ContentService.MimeType.JSON);
    }
}

/**
 * Handle FETCH data from the Compliance sheet
 */
function handleFetchData(serialNumber) {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName('Compliance');

    if (!sheet || sheet.getLastRow() < 2) {
        return ContentService.createTextOutput(JSON.stringify({
            result: "not_found",
            message: `Nenhum dado encontrado para Serial: ${serialNumber}`
        })).setMimeType(ContentService.MimeType.JSON);
    }

    // Obtém todos os dados
    const allData = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn()).getValues();
    const headers = allData[0];

    // Coluna AB é a coluna 28 (A=1, B=2, ... Z=26, AA=27, AB=28)
    const SERIAL_COLUMN_INDEX = 27; // AB (0-indexed)

    // Procura a linha com o serial na coluna AB
    let targetRowIndex = -1;
    for (let row = 1; row < allData.length; row++) {
        if (allData[row][SERIAL_COLUMN_INDEX] == serialNumber) {
            targetRowIndex = row;
            break;
        }
    }

    // Se não encontrou o serial na coluna AB
    if (targetRowIndex === -1) {
        return ContentService.createTextOutput(JSON.stringify({
            result: "not_found",
            message: `Equipamento não encontrado. Crie um novo equipamento ou verifique o número de série.`
        })).setMimeType(ContentService.MimeType.JSON);
    }

    // Obtém a linha encontrada
    const dataRow = allData[targetRowIndex];
    const finalData = {};

    // Mapeia os dados para chaves camelCase
    for (let i = 0; i < headers.length; i++) {
        const header = headers[i];
        let value = dataRow[i];

        if (header === 'ID') {
            finalData.serial = value;
        } else if (header === 'Timestamp') {
            finalData.timestamp = value;
        } else {
            const formKey = REVERSE_MAPPING[header] || header;
            
            // Converte valores Date para string se necessário
            if (value instanceof Date) {
                value = Utilities.formatDate(value, Session.getScriptTimeZone(), 'yyyy-MM-dd');
            }
            
            finalData[formKey] = value === "" ? null : value;
        }
    }

    return ContentService.createTextOutput(JSON.stringify({
        result: "success",
        data: finalData
    })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handle FETCH ALL data from the Compliance sheet
 * Retorna todas as linhas (headers + dados)
 */
function handleFetchAllData() {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName('Compliance');

    if (!sheet || sheet.getLastRow() < 2) {
        return ContentService.createTextOutput(JSON.stringify({
            result: "success",
            data: [],
            headers: COLUMN_HEADERS
        })).setMimeType(ContentService.MimeType.JSON);
    }

    // Obtém todos os dados
    const allData = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn()).getValues();
    const headers = allData[0];

    // Mapeia todos os dados para objetos com as chaves corretas
    const allEquipments = [];
    for (let row = 1; row < allData.length; row++) {
        const dataRow = allData[row];
        const equipmentData = {};

        for (let i = 0; i < headers.length; i++) {
            const header = headers[i];
            let value = dataRow[i];

            if (header === 'ID') {
                equipmentData.serial = value;
            } else if (header === 'Timestamp') {
                equipmentData.timestamp = value;
            } else {
                const formKey = REVERSE_MAPPING[header] || header;
                
                // Converte valores Date para string se necessário
                if (value instanceof Date) {
                    value = Utilities.formatDate(value, Session.getScriptTimeZone(), 'yyyy-MM-dd');
                }
                
                equipmentData[formKey] = value === "" ? null : value;
            }
        }

        allEquipments.push(equipmentData);
    }

    return ContentService.createTextOutput(JSON.stringify({
        result: "success",
        data: allEquipments,
        headers: COLUMN_HEADERS,
        count: allEquipments.length
    })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Função de teste (GET request)
 */
function doGet(request) {
    return ContentService.createTextOutput("✓ Endpoint Google Apps Script ativo. Compatibility Sheet. Use POST para 'fetch' ou 'write'.").setMimeType(ContentService.MimeType.TEXT);
}
