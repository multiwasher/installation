// Sistema de Traduções para a Plataforma Multi Washer
// Suporta: PT (Português), EN (Inglês), ES (Espanhol), FR (Francês)

// Dados do CSV translations_PTENESFR.csv
const translationsData = {
    "Timestamp": { pt: "Timestamp", en: "Timestamp", es: "Marca de tiempo", fr: "Horodatage" },
    "Serial Number": { pt: "Serial Number", en: "Serial Number", es: "Número de serie", fr: "Numéro de série" },
    "Nome do Técnico": { pt: "Nome do Técnico", en: "Technician Name", es: "Nombre del técnico", fr: "Nom du technicien" },
    "Email do Técnico": { pt: "Email do Técnico", en: "Technician Email", es: "Email del técnico", fr: "E-mail du technicien" },
    "Telefone do Técnico": { pt: "Telefone do Técnico", en: "Technician Phone", es: "Teléfono del técnico", fr: "Téléphone du technicien" },
    "Nome do Cliente": { pt: "Nome do Cliente", en: "Customer Name", es: "Nombre del cliente", fr: "Nom du client" },
    "NIF": { pt: "NIF", en: "Tax ID (VAT)", es: "NIF / CIF", fr: "N° de TVA" },
    "Email do Cliente": { pt: "Email do Cliente", en: "Customer Email", es: "Email del cliente", fr: "E-mail du client" },
    "Morada": { pt: "Morada", en: "Address", es: "Dirección", fr: "Adresse" },
    "Código Postal": { pt: "Código Postal", en: "Postal Code", es: "Código postal", fr: "Code postal" },
    "Cidade": { pt: "Cidade", en: "City", es: "Ciudad", fr: "Ville" },
    "País": { pt: "País", en: "Country", es: "País", fr: "Pays" },
    "Representante Cliente": { pt: "Representante Cliente", en: "Customer Rep.", es: "Representante cliente", fr: "Représentant client" },
    "Telefone do Cliente": { pt: "Telefone do Cliente", en: "Customer Phone", es: "Teléfono del cliente", fr: "Téléphone du client" },
    "Modelo": { pt: "Modelo", en: "Model", es: "Modelo", fr: "Modèle" },
    "Voltagem": { pt: "Voltagem", en: "Voltage", es: "Voltaje", fr: "Tension (Voltage)" },
    "Frequência": { pt: "Frequência", en: "Frequency", es: "Frecuencia", fr: "Fréquence" },
    "Aquecimento": { pt: "Aquecimento", en: "Heating", es: "Calefacción", fr: "Chauffage" },
    "Estado de Entrega": { pt: "Estado de Entrega", en: "Delivery Status", es: "Estado de entrega", fr: "État de livraison" },
    "Tipo de Instalação": { pt: "Tipo de Instalação", en: "Installation Type", es: "Tipo de instalación", fr: "Type d'installation" },
    "Responsab. Gradil": { pt: "Responsab. Gradil", en: "Gradil Responsibility", es: "Responsabilidad Gradil", fr: "Responsabilité Gradil" },
    "Pode receber TIR?": { pt: "Pode receber TIR?", en: "Can receive semi-truck?", es: "¿Recibe camión TIR?", fr: "Accès camion TIR ?" },
    "Tem empilhador?": { pt: "Tem empilhador?", en: "Forklift available?", es: "¿Tiene montacargas?", fr: "A un chariot élévateur ?" },
    "Descarga s/ Técnico": { pt: "Descarga s/ Técnico", en: "Unload w/o Tech?", es: "Descarga sin técnico", fr: "Déchargement sans Tech" },
    "Técnico auxiliar?": { pt: "Técnico auxiliar?", en: "Assistant technician?", es: "¿Técnico auxiliar?", fr: "Technicien d'aide ?" },
    "Armazenar equip.?": { pt: "Armazenar equip.?", en: "Can store equipment?", es: "¿Puede almacenar?", fr: "Peut stocker l'équipement?" },
    "Necessário cintas?": { pt: "Necessário cintas?", en: "Are straps needed?", es: "¿Necesita eslingas?", fr: "Sangles nécessaires ?" },
    "Tem água na sala?": { pt: "Tem água na sala?", en: "Water in the room?", es: "¿Tiene agua en sala?", fr: "Eau dans la pièce ?" },
    "Tam. adaptador água": { pt: "Tam. adaptador água", en: "Water adapter size", es: "Tamaño adaptador agua", fr: "Taille adaptateur eau" },
    "Energia eléctrica?": { pt: "Energia eléctrica?", en: "Electricity available?", es: "¿Tiene electricidad?", fr: "Électricité disponible ?" },
    "Tem escadas?": { pt: "Tem escadas?", en: "Are there stairs?", es: "¿Tiene escaleras?", fr: "Y a-t-il des escaliers ?" },
    "Tem ficha eléctrica?": { pt: "Tem ficha eléctrica?", en: "Electric plug available?", es: "¿Tiene enchufe?", fr: "Prise électrique ?" },
    "Opção dos Amperes": { pt: "Opção dos Amperes", en: "Amperage option", es: "Opción de amperios", fr: "Option d'ampérage" },
    "Tem detergentes?": { pt: "Tem detergentes?", en: "Detergents available?", es: "¿Tiene detergentes?", fr: "A des détergents ?" },
    "Doc. p/ Fábrica?": { pt: "Doc. p/ Fábrica?", en: "Factory entry docs?", es: "¿Docs para fábrica?", fr: "Doc. entrée usine ?" },
    "Equip. Proteção?": { pt: "Equip. Proteção?", en: "Mandatory PPE?", es: "¿EPI obligatorio?", fr: "Équip. de protection ?" },
    "Chão acabado?": { pt: "Chão acabado?", en: "Finished floor?", es: "¿Suelo terminado?", fr: "Sol fini ?" },
    "Dreno preparado?": { pt: "Dreno preparado?", en: "Drain ready?", es: "¿Drenaje preparado?", fr: "Drain préparé ?" },
    "Ventilação prep.?": { pt: "Ventilação prep.?", en: "Ventilation ready?", es: "¿Ventilación lista?", fr: "Ventilation préparée ?" },
    "Utensílios p/ teste?": { pt: "Utensílios p/ teste?", en: "Dirty tools for tests?", es: "¿Utensilios para test?", fr: "Ustensiles pour tests ?" },
    "Operador presente?": { pt: "Operador presente?", en: "Operator present?", es: "¿Operador presente?", fr: "Opérateur présent ?" },
    "Nome do Operador": { pt: "Nome do Operador", en: "Operator Name", es: "Nombre del operador", fr: "Nom de l'opérateur" },
    "Resp. Comission.": { pt: "Resp. Comission.", en: "Commissioning Mgr.", es: "Resp. comisionamiento", fr: "Resp. Mise en service" },
    "Pressão Água": { pt: "Pressão Água", en: "Water Pressure", es: "Presión de agua", fr: "Pression de l'eau" },
    "Marca Químicos": { pt: "Marca Químicos", en: "Chemical Brand", es: "Marca de químicos", fr: "Marque des produits" },
    "Largura Porta (cm)": { pt: "Largura Porta (cm)", en: "Door Width (cm)", es: "Ancho de puerta (cm)", fr: "Largeur porte (cm)" },
    "Altura Porta (cm)": { pt: "Altura Porta (cm)", en: "Door Height (cm)", es: "Altura de puerta (cm)", fr: "Hauteur porte (cm)" },
    "Chão ao Teto (cm)": { pt: "Chão ao Teto (cm)", en: "Floor to Ceiling (cm)", es: "Suelo a techo (cm)", fr: "Sol au plafond (cm)" },
    "Horário (Início)": { pt: "Horário (Início)", en: "Working Hours (Start)", es: "Horario (Inicio)", fr: "Heures (Début)" },
    "Horário (Fim)": { pt: "Horário (Fim)", en: "Working Hours (End)", es: "Horario (Fin)", fr: "Heures (Fin)" },
    "Data Entrega": { pt: "Data Entrega", en: "Est. Delivery Date", es: "Fecha entrega prevista", fr: "Date livraison prévue" },
    "Observações": { pt: "Observações", en: "General Remarks", es: "Observaciones", fr: "Remarques générales" },
    "Assemblada": { pt: "Assemblada", en: "Assembled", es: "Ensamblada", fr: "Assemblée" },
    "Parcialmente desmontada": { pt: "Parcialmente desmontada", en: "Partially disassembled", es: "Parcialmente desmontada", fr: "Partiellement démontée" },
    "Desmontada": { pt: "Desmontada", en: "Disassembled", es: "Desmontada", fr: "Démontée" },
    "Enterrada": { pt: "Enterrada", en: "Underground / Buried", es: "Soterrada / Enterrada", fr: "Enterrée" },
    "Solo": { pt: "Solo", en: "Ground level / Floor", es: "Suelo", fr: "Au sol" },
    "Responsabilidade Gradil": { pt: "Responsabilidade Gradil", en: "Fencing Responsibility", es: "Responsabilidad del Vallado", fr: "Responsabilité Clôture" },
    "Somengil": { pt: "Somengil", en: "Somengil", es: "Somengil", fr: "Somengil" },
    "Cliente": { pt: "Cliente", en: "Customer / Client", es: "Cliente", fr: "Client" },
    
    // ========== TRADUÇÕES DOS CAMPOS DO FORMULÁRIO ==========
    // 1.1 - INSTALLATION RESPONSIBILITY
    "Inst_Status_Planned_NotPlanned": { pt: "Status Instalação (Planejada/Não Planejada)", en: "Installation Status (Planned/Not Planned)", es: "Estado de instalación (Planificada/No planificada)", fr: "Statut installation (Prévue/Non prévue)" },
    "Inst_Date": { pt: "Data Instalação", en: "Installation Date", es: "Fecha de instalación", fr: "Date d'installation" },
    "Inst_Company": { pt: "Empresa Instalação", en: "Installation Company", es: "Empresa de instalación", fr: "Entreprise d'installation" },
    "Inst_Technician_Name": { pt: "Nome Técnico Instalação", en: "Installation Technician Name", es: "Nombre del técnico de instalación", fr: "Nom du technicien d'installation" },
    "Inst_Technician_Phone": { pt: "Telefone Técnico Instalação", en: "Installation Technician Phone", es: "Teléfono del técnico de instalación", fr: "Téléphone du technicien d'installation" },
    "Inst_Technician_Email": { pt: "Email Técnico Instalação", en: "Installation Technician Email", es: "Email del técnico de instalación", fr: "E-mail du technicien d'installation" },
    
    // 1.2 - CUSTOMER IDENTIFICATION
    "Cust_Name": { pt: "Nome Cliente", en: "Customer Name", es: "Nombre del cliente", fr: "Nom du client" },
    "Cust_Address": { pt: "Morada Cliente", en: "Customer Address", es: "Dirección del cliente", fr: "Adresse du client" },
    "Cust_ZipCode": { pt: "Código Postal Cliente", en: "Customer Postal Code", es: "Código postal del cliente", fr: "Code postal du client" },
    "Cust_City": { pt: "Cidade Cliente", en: "Customer City", es: "Ciudad del cliente", fr: "Ville du client" },
    "Cust_Country": { pt: "País Cliente", en: "Customer Country", es: "País del cliente", fr: "Pays du client" },
    "Cust_VAT_Number": { pt: "NIF/VAT Cliente", en: "Customer Tax ID (VAT)", es: "NIF/CIF del cliente", fr: "N° de TVA du client" },
    "Cust_Representative_Person": { pt: "Pessoa Representante Cliente", en: "Customer Representative Person", es: "Persona representante del cliente", fr: "Personne représentante du client" },
    "Cust_Representative_Phone": { pt: "Telefone Representante Cliente", en: "Customer Representative Phone", es: "Teléfono del representante del cliente", fr: "Téléphone du représentant du client" },
    "Cust_Representative_Email": { pt: "Email Representante Cliente", en: "Customer Representative Email", es: "Email del representante del cliente", fr: "E-mail du représentant du client" },
    
    // 1.3 - SERVICE IDENTIFICATION
    "Svc_Installation": { pt: "Serviço Instalação", en: "Installation Service", es: "Servicio de instalación", fr: "Service d'installation" },
    "Svc_Preventive_Maintenance": { pt: "Manutenção Preventiva", en: "Preventive Maintenance", es: "Mantenimiento preventivo", fr: "Maintenance préventive" },
    "Svc_Corrective_Maintenance": { pt: "Manutenção Corretiva", en: "Corrective Maintenance", es: "Mantenimiento correctivo", fr: "Maintenance corrective" },
    "Svc_Warranty": { pt: "Garantia", en: "Warranty", es: "Garantía", fr: "Garantie" },
    
    // 1.4 - EQUIPMENT AND ACCESSORIES IDENTIFICATION
    "Equip_Quantity": { pt: "Quantidade Equipamento", en: "Equipment Quantity", es: "Cantidad de equipos", fr: "Quantité d'équipement" },
    "Equip_Model_Product": { pt: "Modelo/Produto Equipamento", en: "Equipment Model/Product", es: "Modelo/Producto del equipo", fr: "Modèle/Produit d'équipement" },
    "Equip_Serial_Number": { pt: "Número Série Equipamento", en: "Equipment Serial Number", es: "Número de serie del equipo", fr: "Numéro de série d'équipement" },
    "Equip_Delivered_Yes_No": { pt: "Equipamento Entregue (Sim/Não)", en: "Equipment Delivered (Yes/No)", es: "Equipo entregado (Sí/No)", fr: "Équipement livré (Oui/Non)" },
    "Equip_Notes": { pt: "Notas Equipamento", en: "Equipment Notes", es: "Notas del equipo", fr: "Notes équipement" },
    
    // 1.5 - EXTRAS
    "EXTRA_SDS": { pt: "SDS (Fichas Segurança)", en: "SDS (Safety Data Sheets)", es: "SDS (Hojas de datos de seguridad)", fr: "SDS (Fiches de données de sécurité)" },
    "EXTRA_DRD": { pt: "DRD (Desenho Referência Técnica)", en: "DRD (Technical Reference Drawing)", es: "DRD (Dibujo de referencia técnica)", fr: "DRD (Dessin de référence technique)" },
    "EXTRA_DTC": { pt: "DTC (Desenho Técnico CAD)", en: "DTC (CAD Technical Drawing)", es: "DTC (Dibujo técnico CAD)", fr: "DTC (Dessin technique CAO)" },
    "EXTRA_CRE_DRD": { pt: "CRE/DRD (Referências)", en: "CRE/DRD (References)", es: "CRE/DRD (Referencias)", fr: "CRE/DRD (Références)" },
    "EXTRA_IVS_DRD": { pt: "IVS/DRD (Documentação)", en: "IVS/DRD (Documentation)", es: "IVS/DRD (Documentación)", fr: "IVS/DRD (Documentation)" },
    "EXTRA_EFS": { pt: "EFS (Especificações)", en: "EFS (Specifications)", es: "EFS (Especificaciones)", fr: "EFS (Spécifications)" },
    "EXTRA_EXD": { pt: "EXD (Equipamento Explosivo)", en: "EXD (Explosive Equipment)", es: "EXD (Equipamiento explosivo)", fr: "EXD (Équipement explosif)" },
    "EXTRA_HMI": { pt: "HMI (Interface Homem-Máquina)", en: "HMI (Human Machine Interface)", es: "HMI (Interfaz hombre-máquina)", fr: "HMI (Interface homme-machine)" },
    "EXTRA_STM": { pt: "STM (Sistemas de Transporte)", en: "STM (Transport Systems)", es: "STM (Sistemas de transporte)", fr: "STM (Systèmes de transport)" },
    
    // 2 - DOCUMENTATION
    "Doc_Manual_Delivered_Explained": { pt: "Manual Entregue/Explicado", en: "Manual Delivered/Explained", es: "Manual entregado/Explicado", fr: "Manuel livré/Expliqué" },
    "Doc_Receiver_Name": { pt: "Nome Responsável Documentação", en: "Documentation Receiver Name", es: "Nombre del responsable de documentación", fr: "Nom du responsable de documentation" },
    "Doc_Receiver_Position": { pt: "Posição Responsável Documentação", en: "Documentation Receiver Position", es: "Posición del responsable de documentación", fr: "Poste du responsable de documentation" },
    "Doc_Receiver_Phone": { pt: "Telefone Responsável Documentação", en: "Documentation Receiver Phone", es: "Teléfono del responsable de documentación", fr: "Téléphone du responsable de documentation" },
    "Doc_Receiver_Email": { pt: "Email Responsável Documentação", en: "Documentation Receiver Email", es: "Email del responsable de documentación", fr: "E-mail du responsable de documentation" },
    "Doc_No_Explain_Why": { pt: "Motivo Não Explicado", en: "Reason Not Explained", es: "Motivo no explicado", fr: "Raison non expliquée" },
    
    // 3 - TRAINING (WASHING)
    "Train_Wash_Daily_Yes_No": { pt: "Treinamento Lavagem Diária (Sim/Não)", en: "Daily Washing Training (Yes/No)", es: "Entrenamiento de lavado diario (Sí/No)", fr: "Formation lavage quotidien (Oui/Non)" },
    "Train_Wash_Who_Name": { pt: "Nome Responsável Lavagem", en: "Washing Training Person Name", es: "Nombre del responsable de lavado", fr: "Nom du responsable lavage" },
    "Train_Wash_Who_Position": { pt: "Posição Responsável Lavagem", en: "Washing Training Person Position", es: "Posición del responsable de lavado", fr: "Poste du responsable lavage" },
    "Train_Wash_Who_Phone": { pt: "Telefone Responsável Lavagem", en: "Washing Training Person Phone", es: "Teléfono del responsable de lavado", fr: "Téléphone du responsable lavage" },
    "Train_Wash_Who_Email": { pt: "Email Responsável Lavagem", en: "Washing Training Person Email", es: "Email del responsable de lavado", fr: "E-mail du responsable lavage" },
    "Train_Wash_No_Explain_Why": { pt: "Motivo Sem Treinamento Lavagem", en: "Reason No Washing Training", es: "Motivo sin entrenamiento de lavado", fr: "Raison pas de formation lavage" },
    
    // 4 - TRAINING (CLEANING)
    "Train_Clean_Daily_Yes_No": { pt: "Treinamento Limpeza Diária (Sim/Não)", en: "Daily Cleaning Training (Yes/No)", es: "Entrenamiento de limpieza diaria (Sí/No)", fr: "Formation nettoyage quotidien (Oui/Non)" },
    "Train_Clean_Who_Name": { pt: "Nome Responsável Limpeza", en: "Cleaning Training Person Name", es: "Nombre del responsable de limpieza", fr: "Nom du responsable nettoyage" },
    "Train_Clean_Who_Position": { pt: "Posição Responsável Limpeza", en: "Cleaning Training Person Position", es: "Posición del responsable de limpieza", fr: "Poste du responsable nettoyage" },
    "Train_Clean_Who_Phone": { pt: "Telefone Responsável Limpeza", en: "Cleaning Training Person Phone", es: "Teléfono del responsable de limpieza", fr: "Téléphone du responsable nettoyage" },
    "Train_Clean_Who_Email": { pt: "Email Responsável Limpeza", en: "Cleaning Training Person Email", es: "Email del responsable de limpieza", fr: "E-mail du responsable nettoyage" },
    "Train_Clean_No_Explain_Why": { pt: "Motivo Sem Treinamento Limpeza", en: "Reason No Cleaning Training", es: "Motivo sin entrenamiento de limpieza", fr: "Raison pas de formation nettoyage" },
    
    // 5 - MEASUREMENTS
    "Meas_Water_Input_Temp": { pt: "Temperatura Entrada Água", en: "Water Input Temperature", es: "Temperatura entrada de agua", fr: "Température entrée eau" },
    "Meas_Input_Pressure": { pt: "Pressão Entrada", en: "Input Pressure", es: "Presión entrada", fr: "Pression entrée" },
    "Meas_Water_Quality": { pt: "Qualidade Água", en: "Water Quality", es: "Calidad del agua", fr: "Qualité de l'eau" },
    "Meas_Electrical_Info": { pt: "Informação Elétrica", en: "Electrical Information", es: "Información eléctrica", fr: "Informations électriques" },
    "Meas_Electrical_Consumption": { pt: "Consumo Elétrico", en: "Electrical Consumption", es: "Consumo eléctrico", fr: "Consommation électrique" },
    "Meas_Consumption_Measurement": { pt: "Medição Consumo", en: "Consumption Measurement", es: "Medición de consumo", fr: "Mesure de consommation" },
    "Meas_Consumption_Who_Identified": { pt: "Quem Identificou Consumo", en: "Who Identified Consumption", es: "Quién identificó consumo", fr: "Qui a identifié consommation" },
    
    // 6 - WASHING
    "WashTest_Performed_Yes_No": { pt: "Teste Lavagem Realizado (Sim/Não)", en: "Washing Test Performed (Yes/No)", es: "Prueba de lavado realizada (Sí/No)", fr: "Test lavage réalisé (Oui/Non)" },
    "WashTest_Quality_Rating": { pt: "Classificação Qualidade Lavagem", en: "Washing Quality Rating", es: "Clasificación de calidad del lavado", fr: "Évaluation qualité lavage" },
    "WashTest_Answer_Explanation": { pt: "Explicação Resposta Lavagem", en: "Washing Answer Explanation", es: "Explicación respuesta lavado", fr: "Explication réponse lavage" },
    "WashTest_Detergent_Used": { pt: "Detergente Utilizado", en: "Detergent Used", es: "Detergente utilizado", fr: "Détergent utilisé" },
    "WashTest_Debit": { pt: "Débito Teste", en: "Test Flow Rate", es: "Flujo de prueba", fr: "Débit test" },
    "WashTest_Concentration": { pt: "Concentração Detergente", en: "Detergent Concentration", es: "Concentración de detergente", fr: "Concentration détergent" },
    
    // 7 - PREVENTIVE MAINTENANCE
    "PrevMaint_Training_Yes_No": { pt: "Treinamento Manutenção Preventiva (Sim/Não)", en: "Preventive Maintenance Training (Yes/No)", es: "Entrenamiento mantenimiento preventivo (Sí/No)", fr: "Formation maintenance préventive (Oui/Non)" },
    "PrevMaint_Who_Name": { pt: "Nome Responsável Manutenção Preventiva", en: "Preventive Maintenance Person Name", es: "Nombre del responsable mantenimiento preventivo", fr: "Nom du responsable maintenance préventive" },
    "PrevMaint_Who_Position": { pt: "Posição Responsável Manutenção Preventiva", en: "Preventive Maintenance Person Position", es: "Posición del responsable mantenimiento preventivo", fr: "Poste responsable maintenance préventive" },
    "PrevMaint_Who_Phone": { pt: "Telefone Responsável Manutenção Preventiva", en: "Preventive Maintenance Person Phone", es: "Teléfono del responsable mantenimiento preventivo", fr: "Téléphone responsable maintenance préventive" },
    "PrevMaint_Who_Email": { pt: "Email Responsável Manutenção Preventiva", en: "Preventive Maintenance Person Email", es: "Email del responsable mantenimiento preventivo", fr: "E-mail responsable maintenance préventive" },
    "PrevMaint_No_Explain_Why": { pt: "Motivo Sem Treinamento Manutenção Preventiva", en: "Reason No Preventive Maintenance Training", es: "Motivo sin entrenamiento mantenimiento preventivo", fr: "Raison pas formation maintenance préventive" },
    
    // 8 - PROGRAMMING
    "Prog_Training_Yes_No": { pt: "Treinamento Programação (Sim/Não)", en: "Programming Training (Yes/No)", es: "Entrenamiento programación (Sí/No)", fr: "Formation programmation (Oui/Non)" },
    "Prog_Training_Who_Name": { pt: "Nome Responsável Programação", en: "Programming Training Person Name", es: "Nombre del responsable programación", fr: "Nom du responsable programmation" },
    "Prog_Training_Who_Position": { pt: "Posição Responsável Programação", en: "Programming Training Person Position", es: "Posición del responsable programación", fr: "Poste responsable programmation" },
    "Prog_Training_Who_Phone": { pt: "Telefone Responsável Programação", en: "Programming Training Person Phone", es: "Teléfono del responsable programación", fr: "Téléphone responsable programmation" },
    "Prog_Training_Who_Email": { pt: "Email Responsável Programação", en: "Programming Training Person Email", es: "Email del responsable programación", fr: "E-mail responsable programmation" },
    "Prog_Training_No_Explain_Why": { pt: "Motivo Sem Treinamento Programação", en: "Reason No Programming Training", es: "Motivo sin entrenamiento programación", fr: "Raison pas formation programmation" },
    
    // 9 - PROGRAM
    "Machine_Programmed_Yes_No": { pt: "Máquina Programada (Sim/Não)", en: "Machine Programmed (Yes/No)", es: "Máquina programada (Sí/No)", fr: "Machine programmée (Oui/Non)" },
    "Machine_Programmed_For_Utensils": { pt: "Máquina Programada para Utensílios", en: "Machine Programmed for Utensils", es: "Máquina programada para utensilios", fr: "Machine programmée pour ustensiles" },
    "Program_Number": { pt: "Número Programa", en: "Program Number", es: "Número de programa", fr: "Numéro du programme" },
    "Photo_Program1": { pt: "Foto Programa 1", en: "Photo Program 1", es: "Foto Programa 1", fr: "Photo programme 1" },
    "Photo_Program2": { pt: "Foto Programa 2", en: "Photo Program 2", es: "Foto Programa 2", fr: "Photo programme 2" },
    "Photo_Program3": { pt: "Foto Programa 3", en: "Photo Program 3", es: "Foto Programa 3", fr: "Photo programme 3" },
    "Photo_Program4_A": { pt: "Foto Programa 4A", en: "Photo Program 4A", es: "Foto Programa 4A", fr: "Photo programme 4A" },
    "Photo_Program4_B": { pt: "Foto Programa 4B", en: "Photo Program 4B", es: "Foto Programa 4B", fr: "Photo programme 4B" },
    "Utensils_Description_Trolley": { pt: "Descrição Utensílios/Carrinho", en: "Utensils/Trolley Description", es: "Descripción utensilios/carro", fr: "Description ustensiles/chariot" },
    "Photo_Utensil1": { pt: "Foto Utensílio 1", en: "Photo Utensil 1", es: "Foto Utensilio 1", fr: "Photo ustensile 1" },
    "Photo_Utensil2": { pt: "Foto Utensílio 2", en: "Photo Utensil 2", es: "Foto Utensilio 2", fr: "Photo ustensile 2" },
    "Photo_Utensil3": { pt: "Foto Utensílio 3", en: "Photo Utensil 3", es: "Foto Utensilio 3", fr: "Photo ustensile 3" },
    "Photo_Utensil4": { pt: "Foto Utensílio 4", en: "Photo Utensil 4", es: "Foto Utensilio 4", fr: "Photo ustensile 4" },
    "Photo_Utensil5": { pt: "Foto Utensílio 5", en: "Photo Utensil 5", es: "Foto Utensilio 5", fr: "Photo ustensile 5" },
    
    // 10 - PROGRAM DATA
    "Data_Wash_Time": { pt: "Tempo Lavagem", en: "Wash Time", es: "Tiempo de lavado", fr: "Temps de lavage" },
    "Data_Rinse_Time": { pt: "Tempo Enxague", en: "Rinse Time", es: "Tiempo de enjuague", fr: "Temps de rinçage" },
    "Data_Spin_Time": { pt: "Tempo Centrifugação", en: "Spin Time", es: "Tiempo de centrifugado", fr: "Temps d'essorage" },
    "Data_Wash_Temperature": { pt: "Temperatura Lavagem", en: "Wash Temperature", es: "Temperatura de lavado", fr: "Température de lavage" },
    "Data_Rinse_Temperature": { pt: "Temperatura Enxague", en: "Rinse Temperature", es: "Temperatura de enjuague", fr: "Température de rinçage" },
    "Data_Final_Ventilation": { pt: "Ventilação Final", en: "Final Ventilation", es: "Ventilación final", fr: "Ventilation finale" },
    "Data_Open_Door_Ventilation": { pt: "Ventilação Porta Aberta", en: "Open Door Ventilation", es: "Ventilación puerta abierta", fr: "Ventilation porte ouverte" },
    
    // 11 - STATUS TRAINING
    "Status_Installation_Training_Completed": { pt: "Status Treinamento Instalação Completo", en: "Installation Training Status Completed", es: "Estado entrenamiento instalación completado", fr: "Statut formation installation terminée" },
    
    // 12 - POINTS TO EVALUATE
    "Eval_Machine_Type": { pt: "Tipo Máquina", en: "Machine Type", es: "Tipo de máquina", fr: "Type de machine" },
    "Eval_Heating": { pt: "Aquecimento", en: "Heating", es: "Calefacción", fr: "Chauffage" },
    "Eval_Assembly": { pt: "Montagem", en: "Assembly", es: "Montaje", fr: "Assemblage" },
    "Eval_General_Condition": { pt: "Estado Geral", en: "General Condition", es: "Estado general", fr: "État général" },
    "Eval_Sensor_Level_Tank": { pt: "Sensor Nível Tanque", en: "Tank Level Sensor", es: "Sensor nivel tanque", fr: "Capteur niveau réservoir" },
    "Eval_Tank_Boiler_Solenoid_Valve": { pt: "Tanque/Caldeira/Válvula Solenóide", en: "Tank/Boiler/Solenoid Valve", es: "Tanque/caldera/válvula solenoide", fr: "Réservoir/chaudière/électrovanne" },
    "Eval_EV_Steam_Vat_Boiler": { pt: "Válvula Vapor/Caldeira", en: "Steam Valve/Boiler", es: "Válvula vapor/caldeira", fr: "Vanne vapeur/chaudière" },
    "Eval_Detergent_Dispenser_Dryer": { pt: "Dispensador Detergente/Secador", en: "Detergent Dispenser/Dryer", es: "Dispensador detergente/secador", fr: "Distributeur détergent/séchoir" },
    "Eval_Sensor_Safety_Interlock": { pt: "Sensor Segurança Intertravamento", en: "Safety Interlock Sensor", es: "Sensor seguridad intertravamiento", fr: "Capteur sécurité verrouillage" },
    "Eval_Inductive_Position_Sensor": { pt: "Sensor Posição Indutivo", en: "Inductive Position Sensor", es: "Sensor posición inductivo", fr: "Capteur position inductif" },
    "Eval_Unit_Parameters_Post_Discharge": { pt: "Parâmetros Unidade Pós-Descarregamento", en: "Unit Parameters Post-Discharge", es: "Parámetros unidad post-descarga", fr: "Paramètres unité post-décharge" },
    "Eval_Drive_Parameters_Reboot": { pt: "Parâmetros Acionamento Reinicialização", en: "Drive Parameters Reboot", es: "Parámetros accionamiento reinicio", fr: "Paramètres entraînement redémarrage" },
    "Eval_Direction_Rotation_Basket": { pt: "Direção Rotação Cesto", en: "Basket Rotation Direction", es: "Dirección rotación cesta", fr: "Direction rotation panier" },
    "Eval_Wash_Rinse_Injectors": { pt: "Injetores Lavagem/Enxague", en: "Wash/Rinse Injectors", es: "Inyectores lavado/enjuague", fr: "Injecteurs lavage/rinçage" },
    "Eval_Screw_Tightening_Rinsing_Pump": { pt: "Aperto Parafuso Bomba Enxague", en: "Rinsing Pump Screw Tightening", es: "Apriete tornillo bomba enjuague", fr: "Serrage vis pompe rinçage" },
    "Eval_Console_Calibration_Procedure": { pt: "Procedimento Calibração Consola", en: "Console Calibration Procedure", es: "Procedimiento calibración consola", fr: "Procédure calibration console" },
    "Eval_Language_Console": { pt: "Idioma Consola", en: "Console Language", es: "Idioma consola", fr: "Langue console" },
    "Eval_Unit_Setpoint_Temperature": { pt: "Temperatura Setpoint Unidade", en: "Unit Setpoint Temperature", es: "Temperatura setpoint unidad", fr: "Température consigne unité" },
    
    // 13 - CONSUMPTION
    "Cons_Tension_Tests": { pt: "Testes Tensão", en: "Tension Tests", es: "Pruebas tensión", fr: "Tests tension" },
    "Cons_Heater_1_Tank_A": { pt: "Aquecedor 1 Tanque (A)", en: "Heater 1 Tank (A)", es: "Calentador 1 tanque (A)", fr: "Radiateur 1 réservoir (A)" },
    "Cons_Heater_2_Tank_A": { pt: "Aquecedor 2 Tanque (A)", en: "Heater 2 Tank (A)", es: "Calentador 2 tanque (A)", fr: "Radiateur 2 réservoir (A)" },
    "Cons_Heater_3_Tank_A": { pt: "Aquecedor 3 Tanque (A)", en: "Heater 3 Tank (A)", es: "Calentador 3 tanque (A)", fr: "Radiateur 3 réservoir (A)" },
    "Cons_Heater_4_Tank_A": { pt: "Aquecedor 4 Tanque (A)", en: "Heater 4 Tank (A)", es: "Calentador 4 tanque (A)", fr: "Radiateur 4 réservoir (A)" },
    "Cons_Heater_Boiler_1_A": { pt: "Aquecedor Caldeira 1 (A)", en: "Heater Boiler 1 (A)", es: "Calentador caldeira 1 (A)", fr: "Radiateur chaudière 1 (A)" },
    "Cons_Heater_Boiler_2_A": { pt: "Aquecedor Caldeira 2 (A)", en: "Heater Boiler 2 (A)", es: "Calentador caldeira 2 (A)", fr: "Radiateur chaudière 2 (A)" },
    "Cons_Washing_Pump_A": { pt: "Bomba Lavagem (A)", en: "Washing Pump (A)", es: "Bomba lavado (A)", fr: "Pompe lavage (A)" },
    "Cons_Basket_Motor_4_Hz_A": { pt: "Motor Cesto 4 Hz (A)", en: "Basket Motor 4 Hz (A)", es: "Motor cesta 4 Hz (A)", fr: "Moteur panier 4 Hz (A)" },
    "Cons_Basket_Motor_80_Hz_A": { pt: "Motor Cesto 80 Hz (A)", en: "Basket Motor 80 Hz (A)", es: "Motor cesta 80 Hz (A)", fr: "Moteur panier 80 Hz (A)" },
    "Cons_Fan_A": { pt: "Ventilador (A)", en: "Fan (A)", es: "Ventilador (A)", fr: "Ventilateur (A)" },
    "Cons_Rising_Pump_A": { pt: "Bomba Elevação (A)", en: "Rising Pump (A)", es: "Bomba elevación (A)", fr: "Pompe relevage (A)" },
    "Temp_Confirm_Tank": { pt: "Temperatura Confirmação Tanque", en: "Tank Temperature Confirmation", es: "Confirmación temperatura tanque", fr: "Confirmation température réservoir" },
    "Temp_Confirm_Boiler": { pt: "Temperatura Confirmação Caldeira", en: "Boiler Temperature Confirmation", es: "Confirmación temperatura caldeira", fr: "Confirmation température chaudière" },
    "Relay_Supervision_Regulation_A": { pt: "Relé Supervisão Regulação (A)", en: "Relay Supervision Regulation (A)", es: "Relé supervisión regulación (A)", fr: "Relais supervision régulation (A)" },
    "Thermal_Reg_Rinsing_Pump_A": { pt: "Regulação Térmica Bomba Enxague (A)", en: "Thermal Reg Rinsing Pump (A)", es: "Reg. térmica bomba enjuague (A)", fr: "Régulation thermique pompe rinçage (A)" },
    "Thermal_Reg_Fan_A": { pt: "Regulação Térmica Ventilador (A)", en: "Thermal Reg Fan (A)", es: "Reg. térmica ventilador (A)", fr: "Régulation thermique ventilateur (A)" },
    "Thermal_Variable_Speed_Drive_A_P305": { pt: "Accionamiento Velocidad Variable (A) P305", en: "Variable Speed Drive (A) P305", es: "Accionamiento velocidad variable (A) P305", fr: "Entraînement vitesse variable (A) P305" },
    "Washing_Pressure": { pt: "Pressão Lavagem", en: "Washing Pressure", es: "Presión lavado", fr: "Pression lavage" },
    
    // 14 - SUMMARY
    "Summary_Notes": { pt: "Notas Resumo", en: "Summary Notes", es: "Notas resumen", fr: "Notes résumé" },
    "Summary_Date": { pt: "Data Resumo", en: "Summary Date", es: "Fecha resumen", fr: "Date résumé" },
    "Signature_Technician_Name": { pt: "Nome Técnico", en: "Technician Name", es: "Nombre técnico", fr: "Nom technicien" },
    "Signature_Technician": { pt: "Assinatura Técnico", en: "Technician Signature", es: "Firma técnico", fr: "Signature technicien" },
    "Signature_Customer_Name": { pt: "Nome Cliente", en: "Customer Name", es: "Nombre cliente", fr: "Nom client" },
    "Signature_Customer": { pt: "Assinatura Cliente", en: "Customer Signature", es: "Firma cliente", fr: "Signature client" },
    
    // ========== SEÇÕES DO FORMULÁRIO ==========
    "1.1 - INSTALLATION RESPONSABILITY": { pt: "1.1 - RESPONSABILIDADE INSTALAÇÃO", en: "1.1 - INSTALLATION RESPONSIBILITY", es: "1.1 - RESPONSABILIDAD INSTALACIÓN", fr: "1.1 - RESPONSABILITÉ INSTALLATION" },
    "1.2 - CUSTOMER IDENTIFICATION": { pt: "1.2 - IDENTIFICAÇÃO CLIENTE", en: "1.2 - CUSTOMER IDENTIFICATION", es: "1.2 - IDENTIFICACIÓN CLIENTE", fr: "1.2 - IDENTIFICATION CLIENT" },
    "1.3 - SERVICE IDENTIFICATION": { pt: "1.3 - IDENTIFICAÇÃO SERVIÇO", en: "1.3 - SERVICE IDENTIFICATION", es: "1.3 - IDENTIFICACIÓN SERVICIO", fr: "1.3 - IDENTIFICATION SERVICE" },
    "1.4 - EQUIPMENT AND ACCESSORIES IDENTIFICATION": { pt: "1.4 - IDENTIFICAÇÃO EQUIPAMENTO E ACESSÓRIOS", en: "1.4 - EQUIPMENT AND ACCESSORIES IDENTIFICATION", es: "1.4 - IDENTIFICACIÓN EQUIPAMIENTO Y ACCESORIOS", fr: "1.4 - IDENTIFICATION ÉQUIPEMENT ET ACCESSOIRES" },
    "1.5 - EXTRAS": { pt: "1.5 - EXTRAS", en: "1.5 - EXTRAS", es: "1.5 - EXTRAS", fr: "1.5 - EXTRAS" },
    "2 - DOCUMENTATION": { pt: "2 - DOCUMENTAÇÃO", en: "2 - DOCUMENTATION", es: "2 - DOCUMENTACIÓN", fr: "2 - DOCUMENTATION" },
    "3 - TRAINING (WASHING)": { pt: "3 - TREINAMENTO (LAVAGEM)", en: "3 - TRAINING (WASHING)", es: "3 - ENTRENAMIENTO (LAVADO)", fr: "3 - FORMATION (LAVAGE)" },
    "4 - TRAINING (CLEANING)": { pt: "4 - TREINAMENTO (LIMPEZA)", en: "4 - TRAINING (CLEANING)", es: "4 - ENTRENAMIENTO (LIMPIEZA)", fr: "4 - FORMATION (NETTOYAGE)" },
    "5 - MEASUREMENTS": { pt: "5 - MEDIÇÕES", en: "5 - MEASUREMENTS", es: "5 - MEDICIONES", fr: "5 - MESURES" },
    "6 - WASHING": { pt: "6 - LAVAGEM", en: "6 - WASHING", es: "6 - LAVADO", fr: "6 - LAVAGE" },
    "7 - PREVENTIVE MAINTENANCE": { pt: "7 - MANUTENÇÃO PREVENTIVA", en: "7 - PREVENTIVE MAINTENANCE", es: "7 - MANTENIMIENTO PREVENTIVO", fr: "7 - MAINTENANCE PRÉVENTIVE" },
    "8 - PROGRAMMING": { pt: "8 - PROGRAMAÇÃO", en: "8 - PROGRAMMING", es: "8 - PROGRAMACIÓN", fr: "8 - PROGRAMMATION" },
    "9 - PROGRAM": { pt: "9 - PROGRAMA", en: "9 - PROGRAM", es: "9 - PROGRAMA", fr: "9 - PROGRAMME" },
    "10 - PROGRAM DATA": { pt: "10 - DADOS PROGRAMA", en: "10 - PROGRAM DATA", es: "10 - DATOS PROGRAMA", fr: "10 - DONNÉES PROGRAMME" },
    "11 - STATUS TRAINING": { pt: "11 - STATUS TREINAMENTO", en: "11 - STATUS TRAINING", es: "11 - ESTADO ENTRENAMIENTO", fr: "11 - STATUT FORMATION" },
    "12 - POINTS TO EVALUATE": { pt: "12 - PONTOS A AVALIAR", en: "12 - POINTS TO EVALUATE", es: "12 - PUNTOS A EVALUAR", fr: "12 - POINTS À ÉVALUER" },
    "13 - CONSUMPTION": { pt: "13 - CONSUMO", en: "13 - CONSUMPTION", es: "13 - CONSUMO", fr: "13 - CONSOMMATION" },
    "14 - SUMMARY": { pt: "14 - RESUMO", en: "14 - SUMMARY", es: "14 - RESUMEN", fr: "14 - RÉSUMÉ" },
    "HOJA TÉCNICA DE CUMPLIMIENTO": { pt: "FICHA TÉCNICA DE CONFORMIDADE", en: "TECHNICAL COMPLIANCE SHEET", es: "HOJA TÉCNICA DE CUMPLIMIENTO", fr: "FICHE TECHNIQUE DE CONFORMITÉ" },
    "Equipo": { pt: "Equipamento", en: "Equipment", es: "Equipo", fr: "Équipement" },
    "Exportado el": { pt: "Exportado em", en: "Exported on", es: "Exportado el", fr: "Exporté le" },
    
    // Traduções adicionais para a interface da aplicação
    "MULTI WASHER": { pt: "MULTI WASHER", en: "MULTI WASHER", es: "MULTI WASHER", fr: "MULTI WASHER" },
    "Checklist Instalação": { pt: "Checklist Instalação", en: "Installation Checklist", es: "Checklist Instalación", fr: "Checklist d'Installation" },
    "Checklist de Instalação Digital": { pt: "Checklist de Instalação Digital", en: "Digital Installation Checklist", es: "Lista de Instalación Digital", fr: "Liste d'Installation Numérique" },
    "Aceder Equipamento Existente": { pt: "Aceder Equipamento Existente", en: "Access Existing Equipment", es: "Acceder Equipo Existente", fr: "Accéder à l'Équipement Existant" },
    "Insira o número de série para continuar a editar uma checklist.": { 
        pt: "Insira o número de série para continuar a editar uma checklist.", 
        en: "Enter the serial number to continue editing a checklist.", 
        es: "Ingrese el número de serie para continuar editando una lista.", 
        fr: "Entrez le numéro de série pour continuer à éditer une liste." 
    },
    "Número de Série Ex:": { pt: "Número de Série Ex:", en: "Serial Number e.g.:", es: "Número de Serie ej.:", fr: "Numéro de Série ex:" },
    "Aceder e Editar": { pt: "Aceder e Editar", en: "Access and Edit", es: "Acceder y Editar", fr: "Accéder et Modifier" },
    "Serial não encontrado": { 
        pt: "Equipamento não encontrado. Crie um novo equipamento ou verifique o número de série.", 
        en: "Equipment not found. Create a new equipment or verify the serial number.", 
        es: "Equipo no encontrado. Cree un nuevo equipo o verifique el número de serie.", 
        fr: "Équipement introuvable. Créez un nouvel équipement ou vérifiez le numéro de série." 
    },
    "Adicionar nova instalação": { pt: "Adicionar nova instalação", en: "Add new installation", es: "Agregar nueva instalación", fr: "Ajouter nouvelle installation" },
    "Inicie uma nova checklist e crie um novo separador na Google Sheet.": { 
        pt: "Inicie uma nova checklist e crie um novo separador na Google Sheet.", 
        en: "Start a new checklist and create a new tab in Google Sheet.", 
        es: "Inicie una nueva lista y cree una nueva pestaña en Google Sheet.", 
        fr: "Démarrez une nouvelle liste et créez un nouvel onglet dans Google Sheet." 
    },
    "Iniciar Nova Checklist": { pt: "Iniciar Nova Checklist", en: "Start New Checklist", es: "Iniciar Nueva Lista", fr: "Démarrer Nouvelle Liste" },
    "Novo Equipamento - Dados Iniciais": { pt: "Novo Equipamento - Dados Iniciais", en: "New Equipment - Initial Data", es: "Nuevo Equipo - Datos Iniciales", fr: "Nouvel Équipement - Données Initiales" },
    "Estes dados serão usados para criar o novo separador da checklist.": { 
        pt: "Estes dados serão usados para criar o novo separador da checklist.", 
        en: "This data will be used to create the new checklist tab.", 
        es: "Estos datos se utilizarán para crear la nueva pestaña de la lista.", 
        fr: "Ces données seront utilisées pour créer le nouvel onglet de liste." 
    },
    "Número de Série (Nome do Separador na Sheet)": { 
        pt: "Número de Série (Nome do Separador na Sheet)", 
        en: "Serial Number (Sheet Tab Name)", 
        es: "Número de Serie (Nombre de Pestaña)", 
        fr: "Numéro de Série (Nom de l'Onglet)" 
    },
    "Introduza o novo Número de Série": { pt: "Introduza o novo Número de Série", en: "Enter new Serial Number", es: "Ingrese nuevo Número de Serie", fr: "Entrez nouveau Numéro de Série" },
    "I. Técnico": { pt: "I. Técnico", en: "I. Technician", es: "I. Técnico", fr: "I. Technicien" },
    "II. Cliente": { pt: "II. Cliente", en: "II. Customer", es: "II. Cliente", fr: "II. Client" },
    "III. Equipamento": { pt: "III. Equipamento", en: "III. Equipment", es: "III. Equipo", fr: "III. Équipement" },
    "IV. Montagem": { pt: "IV. Montagem", en: "IV. Assembly", es: "IV. Montaje", fr: "IV. Montage" },
    "V. Logística & Local": { pt: "V. Logística & Local", en: "V. Logistics & Site", es: "V. Logística & Sitio", fr: "V. Logistique & Site" },
    "VI. Info & Medições": { pt: "VI. Info & Medições", en: "VI. Info & Measurements", es: "VI. Info & Mediciones", fr: "VI. Info & Mesures" },
    "VII. Fotos e Ficheiros": { pt: "VII. Fotos e Ficheiros", en: "VII. Photos & Files", es: "VII. Fotos y Archivos", fr: "VII. Photos et Fichiers" },
    "Nome": { pt: "Nome", en: "Name", es: "Nombre", fr: "Nom" },
    "Email": { pt: "Email", en: "Email", es: "Email", fr: "E-mail" },
    "Telefone": { pt: "Telefone", en: "Phone", es: "Teléfono", fr: "Téléphone" },
    "Voltar": { pt: "Voltar", en: "Back", es: "Volver", fr: "Retour" },
    "Criar e Abrir Equipamento": { pt: "Criar e Abrir Equipamento", en: "Create and Open Equipment", es: "Crear y Abrir Equipo", fr: "Créer et Ouvrir Équipement" },
    "Guardar Progresso": { pt: "Guardar Progresso", en: "Save Progress", es: "Guardar Progreso", fr: "Enregistrer Progrès" },
    "Terminar Sessão": { pt: "Terminar Sessão", en: "Logout", es: "Cerrar Sesión", fr: "Déconnexion" },
    "Progresso Global": { pt: "Progresso Global", en: "Overall Progress", es: "Progreso Global", fr: "Progrès Global" },
    "Sim": { pt: "Sim", en: "Yes", es: "Sí", fr: "Oui" },
    "Não": { pt: "Não", en: "No", es: "No", fr: "Non" },
    "Selecione": { pt: "Selecione", en: "Select", es: "Seleccione", fr: "Sélectionnez" },
    "Selecione o idioma": { pt: "Selecione o idioma", en: "Select language", es: "Seleccione el idioma", fr: "Sélectionnez la langue" },
    "Identificação do Técnico SOMENGIL": { pt: "Identificação do Técnico SOMENGIL", en: "SOMENGIL Technician Identification", es: "Identificación del Técnico SOMENGIL", fr: "Identification du Technicien SOMENGIL" },
    "Identificação do Cliente": { pt: "Identificação do Cliente", en: "Customer Identification", es: "Identificación del Cliente", fr: "Identification du Client" },
    "Identificação do Equipamento": { pt: "Identificação do Equipamento", en: "Equipment Identification", es: "Identificación del Equipo", fr: "Identification de l'Équipement" },
    "Condições de Montagem": { pt: "Condições de Montagem", en: "Assembly Conditions", es: "Condiciones de Montaje", fr: "Conditions de Montage" },
    "Nº Contribuinte": { pt: "Nº Contribuinte", en: "Tax ID", es: "Nº Contribuyente", fr: "N° TVA" },
    "Representante": { pt: "Representante", en: "Representative", es: "Representante", fr: "Représentant" },
    "Checklist": { pt: "Checklist", en: "Checklist", es: "Lista de Verificación", fr: "Liste de Vérification" },
    
    // Seções da Sidebar
    "V. Logística & Local": { pt: "V. Logística & Local", en: "V. Logistics & Site", es: "V. Logística & Sitio", fr: "V. Logistique & Site" },
    "VI. Info & Medições": { pt: "VI. Info & Medições", en: "VI. Info & Measurements", es: "VI. Info & Mediciones", fr: "VI. Info & Mesures" },
    "VII. Fotos e Ficheiros": { pt: "VII. Fotos & Ficheiros", en: "VII. Photos & Files", es: "VII. Fotos & Archivos", fr: "VII. Photos & Fichiers" },
    "IV. Montagem": { pt: "IV. Condição de Montagem", en: "IV. Assembly Conditions", es: "IV. Condiciones de Montaje", fr: "IV. Conditions de Montage" },
    
    // Seções V - Subcategorias
    "Acesso e Descarga": { pt: "Acesso e Descarga", en: "Access & Unloading", es: "Acceso y Descarga", fr: "Accès et Déchargement" },
    "Infraestruturas": { pt: "Infraestruturas", en: "Infrastructure", es: "Infraestructuras", fr: "Infrastructures" },
    "Preparação": { pt: "Preparação", en: "Preparation", es: "Preparación", fr: "Préparation" },
    "Pessoal": { pt: "Pessoal", en: "Personnel", es: "Personal", fr: "Personnel" },
    
    // Traduções para Login
    "Bom-vindo": { pt: "Bom-vindo", en: "Welcome", es: "Bienvenido", fr: "Bienvenue" },
    "Nome do Utilizador": { pt: "Nome do Utilizador", en: "Username", es: "Nombre de usuario", fr: "Nom d'utilisateur" },
    "Senha": { pt: "Senha", en: "Password", es: "Contraseña", fr: "Mot de passe" },
    "Entrar": { pt: "Entrar", en: "Login", es: "Iniciar sesión", fr: "Se connecter" },
    "A entrar...": { pt: "A entrar...", en: "Logging in...", es: "Iniciando sesión...", fr: "Connexion en cours..." },
    "A carregar...": { pt: "A carregar...", en: "Loading...", es: "Cargando...", fr: "Chargement..." },
    "Credenciais inválidas": { pt: "Credenciais inválidas", en: "Invalid credentials", es: "Credenciales inválidas", fr: "Identifiants invalides" },
    "Sair": { pt: "Sair", en: "Logout", es: "Salir", fr: "Quitter" },
    
    // Traduções para tabs de criação
    "Criar Novo Equipamento": { pt: "Criar Novo Equipamento", en: "Create New Equipment", es: "Crear Nuevo Equipo", fr: "Créer Nouvel Équipement" },
    "Ver Todos os Equipamentos": { pt: "Ver Todos os Equipamentos", en: "View All Equipment", es: "Ver Todos los Equipos", fr: "Voir Tous les Équipements" },
    "Ver": { pt: "Ver", en: "View", es: "Ver", fr: "Voir" },
    "Criar Checklist": { pt: "Criar Checklist", en: "Create Checklist", es: "Crear Lista de Verificación", fr: "Créer la Liste de Contrôle" },
};

// Estado global do idioma
let currentLanguage = 'pt';

// Inicializar idioma do localStorage
function initLanguage() {
    const savedLang = localStorage.getItem('appLanguage');
    if (savedLang && ['pt', 'en', 'es', 'fr'].includes(savedLang)) {
        currentLanguage = savedLang;
    }
    updateAllTranslations();
}

// Mudar idioma
function setLanguage(lang) {
    if (!['pt', 'en', 'es', 'fr'].includes(lang)) {
        console.warn(`Idioma não suportado: ${lang}`);
        return;
    }
    currentLanguage = lang;
    localStorage.setItem('appLanguage', lang);
    updateAllTranslations();
    
    // Atualizar o atributo lang do HTML
    document.documentElement.lang = lang;
}

// Obter idioma atual
function getCurrentLanguage() {
    return currentLanguage;
}

// Traduzir uma chave específica
function translate(key, lang = null) {
    const targetLang = lang || currentLanguage;
    
    // Procurar tradução no dicionário
    if (translationsData[key] && translationsData[key][targetLang]) {
        return translationsData[key][targetLang];
    }
    
    // Se não encontrar, usar tradução automática básica
    return autoTranslate(key, targetLang);
}

// Tradução automática básica (fallback)
function autoTranslate(text, targetLang) {
    // Dicionário de traduções básicas para palavras comuns
    const basicTranslations = {
        en: {
            "campo": "field", "obrigatório": "required", "opcional": "optional",
            "dados": "data", "informação": "information", "editar": "edit",
            "salvar": "save", "cancelar": "cancel", "confirmar": "confirm",
            "adicionar": "add", "remover": "remove", "buscar": "search",
            "filtrar": "filter", "exportar": "export", "importar": "import"
        },
        es: {
            "campo": "campo", "obrigatório": "obligatorio", "opcional": "opcional",
            "dados": "datos", "informação": "información", "editar": "editar",
            "salvar": "guardar", "cancelar": "cancelar", "confirmar": "confirmar",
            "adicionar": "agregar", "remover": "eliminar", "buscar": "buscar",
            "filtrar": "filtrar", "exportar": "exportar", "importar": "importar"
        },
        fr: {
            "campo": "champ", "obrigatório": "obligatoire", "opcional": "optionnel",
            "dados": "données", "informação": "information", "editar": "modifier",
            "salvar": "enregistrer", "cancelar": "annuler", "confirmar": "confirmer",
            "adicionar": "ajouter", "remover": "supprimer", "buscar": "rechercher",
            "filtrar": "filtrer", "exportar": "exporter", "importar": "importer"
        }
    };
    
    // Se for português ou não houver tradução, retornar o texto original
    if (targetLang === 'pt') {
        return text;
    }
    
    // Tentar tradução de palavras individuais
    const lowerText = text.toLowerCase();
    if (basicTranslations[targetLang] && basicTranslations[targetLang][lowerText]) {
        return basicTranslations[targetLang][lowerText];
    }
    
    // Retornar o texto original se não houver tradução
    console.warn(`Tradução não encontrada para: "${text}" em ${targetLang}`);
    return text;
}

// Atualizar todos os elementos com data-translate
function updateAllTranslations() {
    // Elementos com data-translate
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = translate(key);
    });
    
    // Elementos com data-translate-key (para mensagens de erro dinâmicas)
    document.querySelectorAll('[data-translate-key]').forEach(element => {
        const key = element.getAttribute('data-translate-key');
        element.textContent = translate(key);
    });
    
    // Placeholders
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        element.placeholder = translate(key);
    });
    
    // Títulos (title attribute)
    document.querySelectorAll('[data-translate-title]').forEach(element => {
        const key = element.getAttribute('data-translate-title');
        element.title = translate(key);
    });
    
    // Labels
    document.querySelectorAll('label[data-translate-label]').forEach(element => {
        const key = element.getAttribute('data-translate-label');
        // Preservar HTML interno se houver
        const hasHTML = element.querySelector('*');
        if (!hasHTML) {
            element.textContent = translate(key);
        }
    });
    
    // Auto-traduzir labels sem data-translate que tenham texto conhecido
    autoTranslateLabels();

    console.log(`Traduções atualizadas para: ${currentLanguage.toUpperCase()}`);
}

// Traduzir automaticamente labels baseado no texto existente
function autoTranslateLabels() {
    // Selecionar todos os labels que não têm data-translate
    document.querySelectorAll('label:not([data-translate]):not([data-auto-translated])').forEach(label => {
        const text = label.textContent.trim();
        
        // Se houver uma tradução para este texto, aplicar
        if (translationsData[text]) {
            label.setAttribute('data-auto-translated', 'true');
            const originalText = text;
            
            // Criar um observer para atualizar quando o idioma mudar
            Object.defineProperty(label, '_originalText', {
                value: originalText,
                writable: false
            });
        }
    });
    
    // Atualizar labels com tradução automática
    document.querySelectorAll('label[data-auto-translated]').forEach(label => {
        if (label._originalText) {
            const translated = translate(label._originalText);
            // Preservar formatação (ex: "+351", "(cm)")
            const match = label.textContent.match(/^(.+?)(\s*\([^)]+\)|\s*\+\d+)?$/);
            if (match) {
                label.textContent = translated + (match[2] || '');
            } else {
                label.textContent = translated;
            }
        }
    });
    
    // Títulos de seção (h3)
    document.querySelectorAll('h3:not([data-translate]):not([data-auto-translated])').forEach(h3 => {
        const text = h3.textContent.trim();
        const patterns = [
            /^I\.\s*(.+)$/,
            /^II\.\s*(.+)$/,
            /^III\.\s*(.+)$/,
            /^IV\.\s*(.+)$/,
            /^V\.\s*(.+)$/,
            /^VI\.\s*(.+)$/,
            /^VII\.\s*(.+)$/
        ];
        
        patterns.forEach(pattern => {
            const match = text.match(pattern);
            if (match) {
                const originalContent = match[1];
                h3.setAttribute('data-auto-translated', 'true');
                Object.defineProperty(h3, '_originalText', {
                    value: originalContent,
                    writable: false
                });
                Object.defineProperty(h3, '_prefix', {
                    value: text.replace(originalContent, '').trim(),
                    writable: false
                });
            }
        });
    });
    
    // Atualizar h3 com tradução automática
    document.querySelectorAll('h3[data-auto-translated]').forEach(h3 => {
        if (h3._originalText && h3._prefix) {
            const translated = translate(h3._originalText);
            h3.textContent = `${h3._prefix} ${translated}`;
        }
    });
}

// Exportar funções globalmente
window.initLanguage = initLanguage;
window.setLanguage = setLanguage;
window.getCurrentLanguage = getCurrentLanguage;
window.translate = translate;
window.updateAllTranslations = updateAllTranslations;

// Atualizar botões de idioma para mostrar o idioma ativo
function updateLanguageButtons() {
    const currentLang = getCurrentLanguage();
    document.querySelectorAll('.language-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Sobrescrever setLanguage original para incluir atualização de botões
const originalSetLanguage = setLanguage;
window.setLanguage = function(lang) {
    originalSetLanguage(lang);
    updateLanguageButtons();
};

// Exportar updateLanguageButtons
window.updateLanguageButtons = updateLanguageButtons;

// Exportar translationsData para uso global
window.translationsData = translationsData;
