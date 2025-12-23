/**
 * GOOGLE APPS SCRIPT - COMPLIANCE CHECKLIST
 * Sistema de checklist para instalações de equipamentos
 * Estrutura modular com sheets por serial number
 */

const SPREADSHEET_ID = '19fl3O8rNjyl7NdXjIBHC6X0nREFAZEsadycHiScL5ro'; // ID da folha Somengil

// Ordem das colunas na Google Sheet (Com "Serial Number" em vez de "Serial")
const COLUMN_HEADERS = [
    "Timestamp", "Serial Number", 
    "Nome do Técnico", "Email do Técnico", "Telefone do Técnico", 
    "Nome do Cliente", "Nº Contribuinte (NIF)", "Email do Cliente", "Morada", 
    "Código Postal", "Cidade", "País", "Representante do Cliente", "Telefone do Cliente", 
    "Modelo", "Voltagem", "Frequência", "Aquecimento", 
    "Estado de Entrega", "Tipo de Instalação", "Responsabilidade Gradil", 
    "Pode receber um camião TIR?", "Tem empilhador (2.5Ton)?", 
    "Capacidade descarregar sem Técnico Somengil?", "Tem técnico para auxiliar na instalação?", 
    "Pode armazenar equipamento?", "É necessário cintas?", "Tem água na sala?", 
    "Tamanho adaptator de água", "Tem energia eléctrica?", "Tem escadas?", 
    "Tem ficha eléctrica?", "Opção dos Amperes", "Tem detergentes?", 
    "Documentação p/ entrar na Fábrica?", "Equipamento Proteção Obrigatório?", 
    "Chão acabado?", "Dreno preparado?", "Ventilação preparada?", 
    "Utensílios sujos para testes?",
    "Operador presente na formação?", "Nome do Operador", 
    "Responsável Comissionamento presente?", "Nome do Responsável Comissionamento", 
    "Ligações Pressão Água (2bar rec.)", "Marca Produtos Químicos", 
    "Medição Porta (Largura - cm)", "Medição Porta (Altura - cm)", "Medição Chão ao Teto (cm)", 
    "Horário Trabalho (Início)", "Horário Trabalho (Fim)", "Data Entrega Prevista", 
    "Observações Gerais", "Fotos Enviadas", "Data Envio Fotos"
];

// Mapeamento dos campos do formulário (chaves camelCase) para os cabeçalhos do Sheets
const FORM_TO_SHEET_MAP = {
    // Dados Técnico
    "tecnicoNome": "Nome do Técnico", "tecnicoEmail": "Email do Técnico", "tecnicoTelefone": "Telefone do Técnico",
    // Dados Cliente
    "clienteNome": "Nome do Cliente", "clienteNIF": "Nº Contribuinte (NIF)", "clienteEmail": "Email do Cliente",
    "clienteMorada": "Morada", "clienteCodigoPostal": "Código Postal", "clienteCidade": "Cidade",
    "clientePais": "País", "clienteRepresentante": "Representante do Cliente", "clienteTelefone": "Telefone do Cliente",
    // Equipamento
    "equipamentoModelo": "Modelo", "equipamentoVoltagem": "Voltagem", "equipamentoFrequencia": "Frequência",
    "equipamentoAquecimento": "Aquecimento", "condicaoMontagem": "Estado de Entrega", 
    "instalacaoTipo": "Tipo de Instalação", "responsabilidadeGradil": "Responsabilidade Gradil",
    // Pré-requisitos
    "podeReceberTIR": "Pode receber um camião TIR?", "temEmpilhador": "Tem empilhador (2.5Ton)?", 
    "podeDescarregarSemTecnico": "Capacidade descarregar sem Técnico Somengil?", 
    "temTecnicoAuxiliar": "Tem técnico para auxiliar na instalação?", 
    "podeArmazenar": "Pode armazenar equipamento?", "necessarioCintas": "É necessário cintas?", 
    "temAguaSala": "Tem água na sala?", "adaptadorAguaTamanho": "Tamanho adaptator de água",
    "temEnergiaEletrica": "Tem energia eléctrica?", "temEscadas": "Tem escadas?", 
    "temFichaEletrica": "Tem ficha eléctrica?", "amperesOpcao": "Opção dos Amperes", 
    "temDetergentes": "Tem detergentes?", "documentacaoFabrica": "Documentação p/ entrar na Fábrica?", 
    "equipamentoProtecao": "Equipamento Proteção Obrigatório?", "chaoAcabado": "Chão acabado?", 
    "drenoPreparado": "Dreno preparado?", "ventilacaoPreparada": "Ventilação preparada?", 
    "temUtensiliosSujos": "Utensílios sujos para testes?",
    // Formação
    "operadorPresente": "Operador presente na formação?", "operadorNome": "Nome do Operador", 
    "responsavelComissionamentoPresente": "Responsável Comissionamento presente?", 
    "responsavelComissionamentoNome": "Nome do Responsável Comissionamento", 
    // Finais
    "ligacoesPressaoAgua": "Ligações Pressão Água (2bar rec.)", 
    "marcaProdutosQuimicos": "Marca Produtos Químicos", 
    "medicaoPortaLargura": "Medição Porta (Largura - cm)", "medicaoPortaAltura": "Medição Porta (Altura - cm)", 
    "medicaoChaoTecto": "Medição Chão ao Teto (cm)", 
    "horarioTrabalhoInicio": "Horário Trabalho (Início)", "horarioTrabalhoFim": "Horário Trabalho (Fim)", 
    "dataEntregaPrevista": "Data Entrega Prevista", "observacoes": "Observações Gerais", "fotosEnviadas": "Fotos Enviadas",
    "dataEnvioFotos": "Data Envio Fotos"
};

// Mapeamento inverso para Leitura (Sheets Header -> HTML Key)
const SHEET_TO_FORM_MAP = {};
for (const key in FORM_TO_SHEET_MAP) {
    SHEET_TO_FORM_MAP[FORM_TO_SHEET_MAP[key]] = key;
}

// Mapeamento dos campos camelCase para labels em português (LEGADO - para compatibilidade)
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
        // Atualiza payload, action e serialNumber se forem válidos
        if (jsonPayload) {
            payload = jsonPayload;
            serialNumber = jsonPayload.serial || serialNumber;
            action = jsonPayload.action || 'write'; // Se JSON, assume 'write' se não especificado
        }
    } catch(e) {
        Logger.log("Aviso: Falha na análise JSON. Usando URL parameters como fallback. Erro: " + e.toString());
    }
  }
  
  // 3. Execução final
  try {
    // --- 1. MODO DE LEITURA (FETCH) ---
    if (action === 'fetch') {
      if (!serialNumber) {
        throw new Error("O Número de Série (serial/serialNumber) é obrigatório para a ação 'fetch'.");
      }
      return handleFetchData(serialNumber, output);
    } 
    
    // --- 2. MODO DE LEITURA COMPLETA (FETCHALL) ---
    else if (action === 'fetchAll') {
      return handleFetchAllData(output);
    }
    
    // --- 3. MODO DE ESCRITA (WRITE) ---
    else if (action === 'write' && payload.data) {
        if (!serialNumber) {
          throw new Error("O Número de Série (serial/serialNumber) é obrigatório para a ação 'write'.");
        }
        return handleWriteData(serialNumber, payload, output);
    }
    
    // --- 4. NOVO: MODO DE ENVIO DE EMAIL (SEND EMAIL) ---
    else if (action === 'sendEmail') {
        return handleSendEmail(payload, output);
    }
    
    // Caso a ação não seja reconhecida ou esteja faltando
    return output.setContent(JSON.stringify({ 
      result: "error", 
      message: "Ação de Apps Script inválida ou faltante. Use 'fetch', 'fetchAll', 'write' ou 'sendEmail'." 
    }));

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
 * Inclui log de debugging para verificar a array de valores antes da escrita
 */
function handleWriteData(serialNumber, payload, output) {
    try {
        const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
        let sheet = ss.getSheetByName(serialNumber);

        // Cria o separador se não existir
        if (!sheet) {
            sheet = ss.insertSheet(serialNumber);
            sheet.appendRow(COLUMN_HEADERS); // Insere os cabeçalhos
        }

        const checklistData = payload.data;
        const timestamp = payload.timestamp || new Date().toISOString();
        
        // Cria a linha de valores a ser inserida (baseada na ordem de COLUMN_HEADERS)
        const rowValues = COLUMN_HEADERS.map(header => {
            if (header === "Timestamp") return timestamp;
            
            // Mapeamento especial para 'Serial Number'
            if (header === "Serial Number") return serialNumber; 
            
            // Mapear o cabeçalho completo para a chave camelCase
            const formKey = SHEET_TO_FORM_MAP[header];
            
            // Usar o valor do formulário ou string vazia se ausente/nulo
            let value = (formKey && checklistData.hasOwnProperty(formKey)) ? checklistData[formKey] : '';
            
            if (value === null || value === undefined) return ''; 
            
            return value; 
        });
        
        // --- LOGS DE DEBUGGING ---
        Logger.log('----------------------------------------------------');
        Logger.log(`Escrita para Serial: ${serialNumber}`);
        Logger.log('Dados do payload: ' + JSON.stringify(checklistData));
        Logger.log('Número de colunas (Esperado): ' + COLUMN_HEADERS.length);
        Logger.log('Número de valores (Gerado): ' + rowValues.length);
        Logger.log('----------------------------------------------------');

        try {
            // Substituir a linha 2
            sheet.getRange(2, 1, 1, rowValues.length).setValues([rowValues]);
        } catch (e) {
            // Se a Linha 2 não existe, tenta adicionar
            if (sheet.getLastRow() < 2) {
                 sheet.appendRow(rowValues);
            } else {
                 Logger.log("Erro ao escrever Linha 2 existente: " + e.toString());
                 throw new Error("Falha ao escrever na Linha 2. Verifique se o número de colunas do Sheet corresponde ao App Script.");
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

        // Assumimos que a linha 1 contém os cabeçalhos
        const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
        // A linha 2 contém os dados mais recentes
        const dataRow = sheet.getRange(2, 1, 1, sheet.getLastColumn()).getValues()[0];
        
        const finalData = {};
        
        // Itera sobre os dados e mapeia para chaves camelCase
        for (let i = 0; i < headers.length; i++) {
            const sheetHeader = headers[i];
            let value = dataRow[i];
            
            // Obtém a chave camelCase usando o mapeamento SHEET_TO_FORM_MAP
            const formKey = SHEET_TO_FORM_MAP[sheetHeader] || sheetHeader;
            
            // Converte valores Date para string vazio
            if (value instanceof Date) {
                if (formKey === 'dataEntregaPrevista') {
                    value = Utilities.formatDate(value, Session.getScriptTimeZone(), 'yyyy-MM-dd');
                } else {
                    value = "";
                }
            }
            
            finalData[formKey] = value === "" ? null : value;
        }
        
        // Adicionar o serial number
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

        // Iterar sobre todas as sheets (excluindo a primeira que pode ser informativa)
        for (let sheetIndex = 0; sheetIndex < allSheets.length; sheetIndex++) {
            const sheet = allSheets[sheetIndex];
            const sheetName = sheet.getName();
            
            // Pular sheets de informação (como "Index", "README", etc)
            if (['Index', 'README', 'Compliance', 'Main', 'Info'].includes(sheetName)) {
                continue;
            }

            Logger.log(`Processando sheet: ${sheetName}`);

            if (sheet.getLastRow() < 2) {
                Logger.log(`  ⚠️ Sheet vazia: ${sheetName}`);
                continue;
            }

            // Obtém headers (linha 1) e dados (linha 2)
            const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
            const dataRow = sheet.getRange(2, 1, 1, sheet.getLastColumn()).getValues()[0];
            
            const equipmentData = {};

            // Mapeia os dados
            for (let i = 0; i < headers.length; i++) {
                const sheetHeader = headers[i];
                let value = dataRow[i];

                if (sheetHeader === 'Serial Number') {
                    equipmentData.serial = value || sheetName;
                } else if (sheetHeader === 'Timestamp') {
                    equipmentData.timestamp = value;
                } else {
                    const formKey = SHEET_TO_FORM_MAP[sheetHeader] || sheetHeader;
                    
                    // Converte valores Date para string
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
        
        // Validações
        if (!to) {
            throw new Error("O destinatário (to) é obrigatório para enviar email.");
        }
        
        if (!images || images.length === 0) {
            throw new Error("Nenhuma imagem fornecida para envio.");
        }
        
        if (!serial) {
            throw new Error("O número de série (serial) é obrigatório para identificar o equipamento.");
        }

        // Construir corpo do email em HTML
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

        // Converter imagens base64 para blobs
        const attachments = images.map(img => {
            const blob = Utilities.newBlob(
                Utilities.base64Decode(img.data), 
                img.mimeType, 
                img.name
            );
            return blob;
        });

        // Enviar email com anexos
        GmailApp.sendEmail(to, subject || `Fotos Instalação - Equipamento ${serial}`, '', {
            htmlBody: emailBody,
            attachments: attachments,
            name: 'Plataforma Multi Washer'
        });

        Logger.log(`Email enviado com sucesso para ${to} com ${images.length} anexo(s). Serial: ${serial}`);

        // Atualizar o status no Sheet
        try {
            const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
            const sheet = ss.getSheetByName(serial);
            
            if (sheet && sheet.getLastRow() >= 2) {
                const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
                const fotosEnviadasIndex = headers.indexOf("Fotos Enviadas");
                
                if (fotosEnviadasIndex !== -1) {
                    const targetCell = sheet.getRange(2, fotosEnviadasIndex + 1);
                    targetCell.setValue("Sim");
                    
                    // Registrar timestamp do envio
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

        if (!sheet || sheet.getLastRow() < 2) {
            return {
                result: "not_found",
                message: `Nenhum dado encontrado para Serial: ${serialNumber}`
            };
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
            return {
                result: "not_found",
                message: `Equipamento não encontrado. Crie um novo equipamento ou verifique o número de série.`
            };
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

        return {
            result: "success",
            data: finalData
        };
    } catch (e) {
        Logger.log("Erro ao ler: " + e.toString());
        return {
            result: "error",
            message: "Falha ao ler dados: " + e.toString()
        };
    }
}

/**
 * Função de teste (GET request)
 */
function doGet(request) {
    return ContentService.createTextOutput("✓ Endpoint Google Apps Script ativo. Multi Washer Compliance Checklist. Use POST para 'fetch', 'fetchAll', 'write' ou 'sendEmail'.").setMimeType(ContentService.MimeType.TEXT);
