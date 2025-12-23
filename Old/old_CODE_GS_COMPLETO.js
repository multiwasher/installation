/**
 * GOOGLE APPS SCRIPT - COMPLIANCE CHECKLIST
 * Sistema de checklist para instalações de equipamentos
 * Estrutura modular com sheets por serial number
 * 
 * INSTRUÇÕES:
 * 1. Abra Google Sheets
 * 2. Clique em "Extensions" > "Apps Script"
 * 3. Elimine todo o código (se houver)
 * 4. Cole TODO este código
 * 5. Clique em "Deploy" > "New Deployment" > "Web App"
 * 6. Configure: Execute as "Your Account", Access "Anyone"
 * 7. Copie o URL e cole no index.html (GOOGLE_SHEET_API_URL)
 */

const SPREADSHEET_ID = '19fl3O8rNjyl7NdXjIBHC6X0nREFAZEsadycHiScL5ro'; // ID da folha Somengil

// Ordem das colunas na Google Sheet (estrutura original com seções numeradas)
const COLUMN_HEADERS = [
    "ID", "TimeStamp",
    "1.1 - Installation Responsability", "Inst_Status_Planned_NotPlanned", "Inst_Date", "Inst_Company", "Inst_Technician_Name", "Inst_Technician_Phone", "Inst_Technician_Email",
    "1.2 - Customer Identification", "Cust_Name", "Cust_Address", "Cust_ZipCode", "Cust_City", "Cust_Country", "Cust_VAT_Number", "Cust_Representative_Person", "Cust_Representative_Phone", "Cust_Representative_Email",
    "1.3 - Service Identification", "Svc_Installation", "Svc_Preventive_Maintenance", "Svc_Corrective_Maintenance", "Svc_Warranty",
    "1.4 - Equipment and Accessories Identification", "Equip_Quantity", "Equip_Model_Product", "Equip_Serial_Number", "Equip_Delivered_Yes_No", "Equip_Notes",
    "1.5 - EXTRAS", "EXTRA_SDS", "EXTRA_DRD", "EXTRA_DTC", "EXTRA_CRE_DRD", "EXTRA_IVS_DRD", "EXTRA_EFS", "EXTRA_EXD", "EXTRA_HMI", "EXTRA_STM",
    "2 - Documentation", "Doc_Manual_Delivered_Explained", "Doc_Receiver_Name", "Doc_Receiver_Position", "Doc_Receiver_Phone", "Doc_Receiver_Email", "Doc_No_Explain_Why",
    "3 - Training (washing)", "Train_Wash_Daily_Yes_No", "Train_Wash_Who_Name", "Train_Wash_Who_Position", "Train_Wash_Who_Phone", "Train_Wash_Who_Email", "Train_Wash_No_Explain_Why",
    "4 - Training (cleaning)", "Train_Clean_Daily_Yes_No", "Train_Clean_Who_Name", "Train_Clean_Who_Position", "Train_Clean_Who_Phone", "Train_Clean_Who_Email", "Train_Clean_No_Explain_Why",
    "5 - Measurements", "Meas_Water_Input_Temp", "Meas_Input_Pressure", "Meas_Water_Quality", "Meas_Electrical_Info", "Meas_Electrical_Consumption", "Meas_Consumption_Measurement", "Meas_Consumption_Who_Identified",
    "6 - Washing", "WashTest_Performed_Yes_No", "WashTest_Quality_Rating", "WashTest_Answer_Explanation", "WashTest_Detergent_Used", "WashTest_Debit", "WashTest_Concentration",
    "7 - Preventive Maintenance", "PrevMaint_Training_Yes_No", "PrevMaint_Who_Name", "PrevMaint_Who_Position", "PrevMaint_Who_Phone", "PrevMaint_Who_Email", "PrevMaint_No_Explain_Why",
    "8 - Programming", "Prog_Training_Yes_No", "Prog_Training_Who_Name", "Prog_Training_Who_Position", "Prog_Training_Who_Phone", "Prog_Training_Who_Email", "Prog_Training_No_Explain_Why",
    "9 - Program", "Machine_Programmed_Yes_No", "Machine_Programmed_For_Utensils", "Program_Number", "Photo_Program1", "Photo_Program2", "Photo_Program3", "Photo_Program4_A", "Photo_Program4_B", "Utensils_Description_Trolley", "Photo_Utensil1", "Photo_Utensil2", "Photo_Utensil3", "Photo_Utensil4", "Photo_Utensil5",
    "10 - Program Data", "Data_Wash_Time", "Data_Rinse_Time", "Data_Spin_Time", "Data_Wash_Temperature", "Data_Rinse_Temperature", "Data_Final_Ventilation", "Data_Open_Door_Ventilation",
    "11 - Status Training", "Status_Installation_Training_Completed",
    "12 - Points to evaluate", "Eval_Machine_Type", "Eval_Heating", "Eval_Assembly", "Eval_General_Condition", "Eval_Sensor_Level_Tank", "Eval_Tank_Boiler_Solenoid_Valve", "Eval_EV_Steam_Vat_Boiler", "Eval_Detergent_Dispenser_Dryer", "Eval_Sensor_Safety_Interlock", "Eval_Inductive_Position_Sensor", "Eval_Unit_Parameters_Post_Discharge", "Eval_Drive_Parameters_Reboot", "Eval_Direction_Rotation_Basket", "Eval_Wash_Rinse_Injectors", "Eval_Screw_Tightening_Rinsing_Pump", "Eval_Console_Calibration_Procedure", "Eval_Language_Console", "Eval_Unit_Setpoint_Temperature",
    "13 - Consumption", "Cons_Tension_Tests", "Cons_Heater_1_Tank_A", "Cons_Heater_2_Tank_A", "Cons_Heater_3_Tank_A", "Cons_Heater_4_Tank_A", "Cons_Heater_Boiler_1_A", "Cons_Heater_Boiler_2_A", "Cons_Washing_Pump_A", "Cons_Basket_Motor_4_Hz_A", "Cons_Basket_Motor_80_Hz_A", "Cons_Fan_A", "Cons_Rising_Pump_A", "Temp_Confirm_Tank", "Temp_Confirm_Boiler", "Relay_Supervision_Regulation_A", "Thermal_Reg_Rinsing_Pump_A", "Thermal_Reg_Fan_A", "Thermal_Variable_Speed_Drive_A_P305", "Washing_Pressure",
    "14 - Summary", "Summary_Notes", "Summary_Date", "Signature_Technician", "Signature_Customer"
];

// Mapeamento dos campos do formulário (chaves camelCase) para os cabeçalhos do Sheets
// Para a estrutura original, alguns campos podem não estar mapeados e serão deixados em branco
const FORM_TO_SHEET_MAP = {
    // Instalação (1.1)
    "status": "Inst_Status_Planned_NotPlanned",
    "installation_date": "Inst_Date",
    "somengil_technician": "Inst_Company",
    "technician_name": "Inst_Technician_Name",
    "technician_phone": "Inst_Technician_Phone",
    "technician_email": "Inst_Technician_Email",
    
    // Cliente (1.2)
    "customer": "Cust_Name",
    "address": "Cust_Address",
    "zip_code": "Cust_ZipCode",
    "city": "Cust_City",
    "country": "Cust_Country",
    "vat_number": "Cust_VAT_Number",
    "customer_representative": "Cust_Representative_Person",
    "rep_phone": "Cust_Representative_Phone",
    "rep_email": "Cust_Representative_Email",
    
    // Serviço (1.3)
    "installation": "Svc_Installation",
    "preventive_maintenance": "Svc_Preventive_Maintenance",
    "corrective_maintenance": "Svc_Corrective_Maintenance",
    "warranty": "Svc_Warranty",
    
    // Equipamento (1.4)
    "quantity": "Equip_Quantity",
    "model_product": "Equip_Model_Product",
    "serial_number": "Equip_Serial_Number",
    "delivered": "Equip_Delivered_Yes_No",
    "equipment_notes": "Equip_Notes",
    
    // EXTRAS (1.5)
    "sds": "EXTRA_SDS",
    "drd": "EXTRA_DRD",
    "dtc": "EXTRA_DTC",
    "cre_drd": "EXTRA_CRE_DRD",
    "ivs_drd": "EXTRA_IVS_DRD",
    "efs": "EXTRA_EFS",
    "exd": "EXTRA_EXD",
    "hmi": "EXTRA_HMI",
    "stm": "EXTRA_STM",
    
    // Documentação (2)
    "manual_delivered": "Doc_Manual_Delivered_Explained",
    "name1": "Doc_Receiver_Name",
    "position1": "Doc_Receiver_Position",
    "phone1": "Doc_Receiver_Phone",
    "email1": "Doc_Receiver_Email",
    "manual_not_delivered_why": "Doc_No_Explain_Why",
    
    // Formação - Lavagem (3)
    "washing_training": "Train_Wash_Daily_Yes_No",
    "washing_training_name": "Train_Wash_Who_Name",
    "washing_training_position": "Train_Wash_Who_Position",
    "washing_training_phone": "Train_Wash_Who_Phone",
    "washing_training_email": "Train_Wash_Who_Email",
    "washing_training_not_why": "Train_Wash_No_Explain_Why",
    
    // Formação - Limpeza (4)
    "cleaning_training": "Train_Clean_Daily_Yes_No",
    "cleaning_training_name": "Train_Clean_Who_Name",
    "cleaning_training_position": "Train_Clean_Who_Position",
    "cleaning_training_phone": "Train_Clean_Who_Phone",
    "cleaning_training_email": "Train_Clean_Who_Email",
    "cleaning_training_not_why": "Train_Clean_No_Explain_Why",
    
    // Medições (5)
    "water_input_temperature": "Meas_Water_Input_Temp",
    "input_pressure": "Meas_Input_Pressure",
    "water_quality": "Meas_Water_Quality",
    "electrical_info": "Meas_Electrical_Info",
    "electrical_consumption": "Meas_Electrical_Consumption",
    "electrical_consumption_measurement": "Meas_Consumption_Measurement",
    "electrical_measurement_who": "Meas_Consumption_Who_Identified",
    
    // Teste de Lavagem (6)
    "washing_test": "WashTest_Performed_Yes_No",
    "washing_quality": "WashTest_Quality_Rating",
    "washing_quality_explanation": "WashTest_Answer_Explanation",
    "detergent_used": "WashTest_Detergent_Used",
    "debit": "WashTest_Debit",
    "concentration": "WashTest_Concentration",
    
    // Manutenção Preventiva (7)
    "pm_training": "PrevMaint_Training_Yes_No",
    "pm_training_name": "PrevMaint_Who_Name",
    "pm_training_position": "PrevMaint_Who_Position",
    "pm_training_phone": "PrevMaint_Who_Phone",
    "pm_training_email": "PrevMaint_Who_Email",
    "pm_training_not_why": "PrevMaint_No_Explain_Why",
    
    // Programação (8)
    "programming_training": "Prog_Training_Yes_No",
    "programming_training_name": "Prog_Training_Who_Name",
    "programming_training_position": "Prog_Training_Who_Position",
    "programming_training_phone": "Prog_Training_Who_Phone",
    "programming_training_email": "Prog_Training_Who_Email",
    "programming_training_not_why": "Prog_Training_No_Explain_Why",
    
    // Programa (9)
    "programmed_machine": "Machine_Programmed_Yes_No",
    "utensils_programmed": "Machine_Programmed_For_Utensils",
    "program_number": "Program_Number",
    "program1_photo": "Photo_Program1",
    "program2_photo": "Photo_Program2",
    "program3_photo": "Photo_Program3",
    "program4_photo": "Photo_Program4_A",
    "program5_photo": "Photo_Program4_B",
    "utensils_description": "Utensils_Description_Trolley",
    "utensil1_photo": "Photo_Utensil1",
    "utensil2_photo": "Photo_Utensil2",
    "utensil3_photo": "Photo_Utensil3",
    "utensil4_photo": "Photo_Utensil4",
    "utensil5_photo": "Photo_Utensil5",
    
    // Dados do Programa (10)
    "wash_time": "Data_Wash_Time",
    "rinse_time": "Data_Rinse_Time",
    "spin_time": "Data_Spin_Time",
    "wash_temperature": "Data_Wash_Temperature",
    "rinse_temperature": "Data_Rinse_Temperature",
    "final_ventilation": "Data_Final_Ventilation",
    "open_door_ventilation": "Data_Open_Door_Ventilation",
    
    // Status Formação (11)
    "training_completed": "Status_Installation_Training_Completed",
    
    // Pontos a Avaliar (12)
    "machine_type": "Eval_Machine_Type",
    "heating": "Eval_Heating",
    "assembly": "Eval_Assembly",
    "general_condition": "Eval_General_Condition",
    "sensor_tank": "Eval_Sensor_Level_Tank",
    "tank_solenoid_valve": "Eval_Tank_Boiler_Solenoid_Valve",
    "steam_vat_ev": "Eval_EV_Steam_Vat_Boiler",
    "detergent_dispenser": "Eval_Detergent_Dispenser_Dryer",
    "sensor_safety": "Eval_Sensor_Safety_Interlock",
    "inductive_sensor": "Eval_Inductive_Position_Sensor",
    "unit_parameters": "Eval_Unit_Parameters_Post_Discharge",
    "drive_parameters": "Eval_Drive_Parameters_Reboot",
    "basket_rotation": "Eval_Direction_Rotation_Basket",
    "wash_rinse_injectors": "Eval_Wash_Rinse_Injectors",
    "screw_tightening": "Eval_Screw_Tightening_Rinsing_Pump",
    "console_calibration": "Eval_Console_Calibration_Procedure",
    "console_language": "Eval_Language_Console",
    "unit_temperature": "Eval_Unit_Setpoint_Temperature",
    
    // Consumo (13)
    "tension_tests": "Cons_Tension_Tests",
    "consumption_heating1_tank": "Cons_Heater_1_Tank_A",
    "consumption_heating2_tank": "Cons_Heater_2_Tank_A",
    "consumption_heating3_tank": "Cons_Heater_3_Tank_A",
    "consumption_heating4_tank": "Cons_Heater_4_Tank_A",
    "consumption_heating1_boiler": "Cons_Heater_Boiler_1_A",
    "consumption_heating2_boiler": "Cons_Heater_Boiler_2_A",
    "washing_pump_consumption": "Cons_Washing_Pump_A",
    "basket_motor_4hz": "Cons_Basket_Motor_4_Hz_A",
    "basket_motor_80hz": "Cons_Basket_Motor_80_Hz_A",
    "fan_consumption": "Cons_Fan_A",
    "rising_pump_consumption": "Cons_Rising_Pump_A",
    "tank_temperature": "Temp_Confirm_Tank",
    "boiler_temperature": "Temp_Confirm_Boiler",
    "regulation_relay": "Relay_Supervision_Regulation_A",
    "thermal_rinsing_pump": "Thermal_Reg_Rinsing_Pump_A",
    "thermal_fan": "Thermal_Reg_Fan_A",
    "thermal_speed_drive": "Thermal_Variable_Speed_Drive_A_P305",
    "washing_pressure": "Washing_Pressure",
    
    // Resumo (14)
    "notes_summary": "Summary_Notes",
    "date_summary": "Summary_Date",
    "signature_technician": "Signature_Technician",
    "signature_representative": "Signature_Customer"
};

// Mapeamento inverso para Leitura (Sheets Header -> HTML Key)
const SHEET_TO_FORM_MAP = {};
for (const key in FORM_TO_SHEET_MAP) {
    SHEET_TO_FORM_MAP[FORM_TO_SHEET_MAP[key]] = key;
}

/**
 * Função principal para processar requisições POST
 * Suporta: fetch, fetchAll, write, sendEmail
 */
function doPost(request) {
  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);

  // CRITICAL SAFETY CHECK contra execução manual/malformada
  if (!request) {
      Logger.log("Erro: Objeto de requisição (request) não fornecido.");
      return output.setContent(JSON.stringify({ 
          result: "error", 
          message: "Erro interno: A requisição não pôde ser processada (Objeto 'request' ausente)." 
      }));
  }

  // 1. Inicializa com URL-encoded parameters (default para 'fetch')
  let payload = request.parameter; 
  let action = payload.action;
  let serialNumber = payload.serialNumber;

  // 2. Tenta SOBRESCREVER com o payload JSON (modo de ESCRITA da app HTML)
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
  
  // 3. Execução final
  try {
    if (action === 'fetch') {
      if (!serialNumber) {
        throw new Error("O Número de Série (serial/serialNumber) é obrigatório para a ação 'fetch'.");
      }
      return handleFetchData(serialNumber, output);
    } 
    else if (action === 'fetchAll') {
      return handleFetchAllData(output);
    }
    else if (action === 'write' && payload.data) {
        if (!serialNumber) {
          throw new Error("O Número de Série (serial/serialNumber) é obrigatório para a ação 'write'.");
        }
        return handleWriteData(serialNumber, payload, output);
    }
    else if (action === 'sendEmail') {
        return handleSendEmail(payload, output);
    }
    else {
      return output.setContent(JSON.stringify({ 
        result: "error", 
        message: "Ação de Apps Script inválida ou faltante. Use 'fetch', 'fetchAll', 'write' ou 'sendEmail'." 
      }));
    }

  } catch (e) {
    Logger.log("Erro na função doPost: " + e.toString());
    return output.setContent(JSON.stringify({ 
      result: "error", 
      message: "Erro interno no servidor: " + e.toString() 
    }));
  }
}

/**
 * Função auxiliar para tratar a ESCRITA (substituição da Linha 2)
 */
function handleWriteData(serialNumber, payload, output) {
    try {
        const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
        let sheet = ss.getSheetByName(serialNumber);

        // Cria o separador se não existir
        if (!sheet) {
            sheet = ss.insertSheet(serialNumber);
            sheet.appendRow(COLUMN_HEADERS);
        }

        const checklistData = payload.data;
        const timestamp = payload.timestamp || new Date().toISOString();
        
        // Cria a linha de valores
        const rowValues = COLUMN_HEADERS.map(header => {
            if (header === "Timestamp") return timestamp;
            if (header === "Serial Number") return serialNumber;
            if (header === "Equip_Serial_Number") return serialNumber;
            
            const formKey = SHEET_TO_FORM_MAP[header];
            let value = (formKey && checklistData.hasOwnProperty(formKey)) ? checklistData[formKey] : '';
            
            if (value === null || value === undefined) return ''; 
            return value; 
        });
        
        Logger.log('Escrita para Serial: ' + serialNumber);
        Logger.log('Número de colunas: ' + COLUMN_HEADERS.length);
        Logger.log('Número de valores: ' + rowValues.length);

        try {
            sheet.getRange(2, 1, 1, rowValues.length).setValues([rowValues]);
        } catch (e) {
            if (sheet.getLastRow() < 2) {
                 sheet.appendRow(rowValues);
            } else {
                 throw new Error("Falha ao escrever na Linha 2.");
            }
        }

        return output.setContent(JSON.stringify({ 
            result: "success", 
            message: `Dados salvos no separador: ${serialNumber}` 
        }))
        .setHeader('Access-Control-Allow-Origin', '*')
        .setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        .setHeader('Access-Control-Allow-Headers', 'Content-Type');
    } catch (e) {
        Logger.log("Erro ao escrever: " + e.toString());
        return output.setContent(JSON.stringify({ 
            result: "error", 
            message: "Falha ao escrever dados: " + e.toString() 
        }));
    }
}

/**
 * Função auxiliar para tratar a LEITURA (fetch) de dados
 */
function handleFetchData(serialNumber, output) {
    try {
        const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
        const sheet = ss.getSheetByName(serialNumber); 

        if (!sheet || sheet.getLastRow() < 2) {
            return output.setContent(JSON.stringify({ 
                result: "not_found", 
                message: `Nenhum separador encontrado ou o separador '${serialNumber}' está vazio.` 
            }));
        }

        const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
        const dataRow = sheet.getRange(2, 1, 1, sheet.getLastColumn()).getValues()[0];
        
        const finalData = {};
        
        for (let i = 0; i < headers.length; i++) {
            const sheetHeader = headers[i];
            let value = dataRow[i];
            
            const formKey = SHEET_TO_FORM_MAP[sheetHeader] || sheetHeader;
            
            if (value instanceof Date) {
                if (formKey === 'dataEntregaPrevista') {
                    value = Utilities.formatDate(value, Session.getScriptTimeZone(), 'yyyy-MM-dd');
                } else {
                    value = "";
                }
            }
            
            finalData[formKey] = value === "" ? null : value;
        }
        
        finalData.serial = serialNumber;

        return output.setContent(JSON.stringify({ 
            result: "success", 
            data: finalData 
        }))
        .setHeader('Access-Control-Allow-Origin', '*')
        .setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        .setHeader('Access-Control-Allow-Headers', 'Content-Type');
    } catch (e) {
        Logger.log("Erro ao ler: " + e.toString());
        return output.setContent(JSON.stringify({ 
            result: "error", 
            message: "Falha ao ler dados: " + e.toString() 
        }));
    }
}

/**
 * Função para ler TODOS os dados (para listagem e filtros)
 */
function handleFetchAllData(output) {
    try {
        Logger.log("handleFetchAllData: Iniciando");
        const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
        const allSheets = ss.getSheets();
        const allEquipments = [];

        Logger.log(`Total de sheets encontradas: ${allSheets.length}`);

        for (let sheetIndex = 0; sheetIndex < allSheets.length; sheetIndex++) {
            const sheet = allSheets[sheetIndex];
            const sheetName = sheet.getName();
            
            if (['Index', 'README', 'Compliance', 'Main', 'Info'].includes(sheetName)) {
                continue;
            }

            Logger.log(`Processando sheet: ${sheetName}`);

            if (sheet.getLastRow() < 2) {
                Logger.log(`Sheet vazia: ${sheetName}`);
                continue;
            }

            const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
            const dataRow = sheet.getRange(2, 1, 1, sheet.getLastColumn()).getValues()[0];
            
            const equipmentData = {};

            for (let i = 0; i < headers.length; i++) {
                const sheetHeader = headers[i];
                let value = dataRow[i];

                if (sheetHeader === 'Serial Number') {
                    equipmentData.serial = value || sheetName;
                } else if (sheetHeader === 'Timestamp') {
                    equipmentData.timestamp = value;
                } else {
                    const formKey = SHEET_TO_FORM_MAP[sheetHeader] || sheetHeader;
                    
                    if (value instanceof Date) {
                        value = Utilities.formatDate(value, Session.getScriptTimeZone(), 'yyyy-MM-dd');
                    }
                    
                    equipmentData[formKey] = value === "" ? null : value;
                }
            }

            allEquipments.push(equipmentData);
        }

        Logger.log(`✓ ${allEquipments.length} equipamento(s) recuperado(s)`);

        return output.setContent(JSON.stringify({ 
            result: "success", 
            data: allEquipments,
            count: allEquipments.length
        }))
        .setHeader('Access-Control-Allow-Origin', '*')
        .setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        .setHeader('Access-Control-Allow-Headers', 'Content-Type');
    } catch (e) {
        Logger.log("Erro ao ler todos: " + e.toString());
        return output.setContent(JSON.stringify({ 
            result: "error", 
            message: "Falha ao ler dados: " + e.toString() 
        }));
    }
}

/**
 * NOVA FUNÇÃO: Enviar email com imagens anexadas e atualizar status
 */
function handleSendEmail(payload, output) {
    try {
        const { serial, to, subject, images } = payload;
        
        if (!to) {
            throw new Error("O destinatário (to) é obrigatório para enviar email.");
        }
        
        if (!images || images.length === 0) {
            throw new Error("Nenhuma imagem fornecida para envio.");
        }
        
        if (!serial) {
            throw new Error("O número de série (serial) é obrigatório para identificar o equipamento.");
        }

        const emailBody = `
            <html>
                <body style="font-family: Arial, sans-serif; color: #333;">
                    <h2 style="color: #0066cc;">Fotos de Instalação - Equipamento ${serial}</h2>
                    <p>Este email contém <strong>${images.length}</strong> foto(s) de comprovação da instalação do equipamento.</p>
                    <hr style="border: 1px solid #ddd;">
                    <p style="font-size: 12px; color: #666;">
                        <strong>Número de Série:</strong> ${serial}<br>
                        <strong>Data de Envio:</strong> ${new Date().toLocaleString('pt-PT')}<br>
                        <strong>Origem:</strong> Plataforma Multi Washer Checklist
                    </p>
                    <p style="font-size: 11px; color: #999; margin-top: 20px;">
                        Este é um email automático. Por favor, não responda diretamente.
                    </p>
                </body>
            </html>
        `;

        const attachments = images.map(img => {
            const blob = Utilities.newBlob(
                Utilities.base64Decode(img.data), 
                img.mimeType, 
                img.name
            );
            return blob;
        });

        GmailApp.sendEmail(to, subject || `Fotos Instalação - Equipamento ${serial}`, '', {
            htmlBody: emailBody,
            attachments: attachments,
            name: 'Plataforma Multi Washer'
        });

        Logger.log(`Email enviado com sucesso para ${to} com ${images.length} anexo(s). Serial: ${serial}`);

        try {
            const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
            const sheet = ss.getSheetByName(serial);
            
            if (sheet && sheet.getLastRow() >= 2) {
                const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
                const fotosEnviadasIndex = headers.indexOf("Fotos Enviadas");
                
                if (fotosEnviadasIndex !== -1) {
                    const targetCell = sheet.getRange(2, fotosEnviadasIndex + 1);
                    targetCell.setValue("Sim");
                    
                    const dataEnvioIndex = headers.indexOf("Data Envio Fotos");
                    if (dataEnvioIndex !== -1) {
                        const timestampCell = sheet.getRange(2, dataEnvioIndex + 1);
                        const currentTimestamp = new Date().toLocaleString('pt-PT', { 
                            timeZone: 'Europe/Lisbon',
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                        });
                        
                        const existingValue = timestampCell.getValue();
                        const newValue = existingValue ? `${existingValue}\n${currentTimestamp}` : currentTimestamp;
                        timestampCell.setValue(newValue);
                    }
                    
                    SpreadsheetApp.flush();
                    Logger.log(`✓ Status 'Fotos Enviadas' atualizado para 'Sim' no sheet ${serial}`);
                }
            }
        } catch (updateError) {
            Logger.log("⚠️ ERRO ao atualizar coluna Fotos Enviadas: " + updateError.toString());
        }

        return output.setContent(JSON.stringify({ 
            result: "success", 
            message: `Email enviado com sucesso para ${to} com ${images.length} foto(s).` 
        }))
        .setHeader('Access-Control-Allow-Origin', '*')
        .setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        .setHeader('Access-Control-Allow-Headers', 'Content-Type');

    } catch (e) {
        Logger.log("Erro ao enviar email: " + e.toString());
        return output.setContent(JSON.stringify({ 
            result: "error", 
            message: "Erro ao enviar email: " + e.toString() 
        }));
    }
}

/**
 * Função de teste (GET request)
 */
function doGet(request) {
    return ContentService.createTextOutput("✓ Endpoint Google Apps Script ativo. Multi Washer Compliance Checklist. Use POST para 'fetch', 'fetchAll', 'write' ou 'sendEmail'.").setMimeType(ContentService.MimeType.TEXT);
}
