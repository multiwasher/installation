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
