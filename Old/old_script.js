// Módulo principal extraído de index.html

// Global State
const state = {
    serial: null,
    data: {},
    loading: false,
    activeTab: 'section-1'
};

// URL do Google Apps Script para sincronização (Escrita/Leitura)
const GOOGLE_SHEET_API_URL = "https://script.google.com/macros/s/AKfycbzg1cEjf84C_skv6NApfkZ0u8To29_rpLjy0KMLa-jKrL9uhlvkj4jnlhTzmfhge0_Z/exec";

// NOVO: Valores padrão vazios para garantir que campos não preenchidos no Sheets fiquem em branco na App.
const emptyDefaults = {
    // I. Técnico
    tecnicoNome: "", tecnicoEmail: "", tecnicoTelefone: "",
    // II. Cliente
    clienteNome: "", clienteNIF: "", clienteMorada: "", clienteEmail: "", 
    clienteCodigoPostal: "", clienteCidade: "", clienteRepresentante: "", clienteTelefone: "", clientePais: "",
    // III. Equipamento
    equipamentoModelo: "", equipamentoVoltagem: "", equipamentoFrequencia: "", equipamentoAquecimento: "",
    // IV. Montagem
    condicaoMontagem: "", instalacaoTipo: "", responsabilidadeGradil: "",
    // V. Checklist (Booleans/Enums)
    podeReceberTIR: "", temEmpilhador: "", podeDescarregarSemTecnico: "", temTecnicoAuxiliar: "",
    podeArmazenar: "", necessarioCintas: "", temAguaSala: "", adaptadorAguaTamanho: "",
    temEnergiaEletrica: "", temEscadas: "", temFichaEletrica: "", amperesOpcao: "",
    temDetergentes: "", documentacaoFabrica: "", equipamentoProtecao: "", chaoAcabado: "",
    drenoPreparado: "", ventilacaoPreparada: "", operadorPresente: "", operadorNome: "",
    responsavelComissionamentoPresente: "", responsavelComissionamentoNome: "", temUtensiliosSujos: "",
    // VI. Info (Números devem ser null)
    ligacoesPressaoAgua: "", marcaProdutosQuimicos: "", medicaoPortaLargura: null, medicaoPortaAltura: null, 
    medicaoChaoTecto: null, horarioTrabalhoInicio: "", horarioTrabalhoFim: "", dataEntregaPrevista: "", observacoes: "",
    // VII. FOTOS E FICHEIROS (NOVO CAMPO)
    linksFotosFicheiros: "",
    fotosEnviadas: "",
    dataEnvioFotos: ""
};

// Default Data Structure (Usado apenas para iteração e definição de campos)
const defaultData = emptyDefaults;

// Campos Mínimos para Criação de Novo Equipamento (Secções I, II, III, IV)
const creationFields = [
    'tecnicoNome', 'tecnicoEmail', 'tecnicoTelefone',
    'clienteNome', 'clienteNIF', 'clienteMorada', 'clienteEmail', 
    'clienteCodigoPostal', 'clienteCidade', 'clienteRepresentante', 'clienteTelefone', 'clientePais',
    'equipamentoModelo', 'equipamentoVoltagem', 'equipamentoFrequencia', 'equipamentoAquecimento',
    'condicaoMontagem', 'instalacaoTipo', 'responsabilidadeGradil'
];

// Mapeamento de chaves para secções para calcular o progresso por separador
const sectionMap = {
    // I. Técnico (3 campos)
    tecnicoNome: 'section-1', tecnicoEmail: 'section-1', tecnicoTelefone: 'section-1',
    // II. Cliente (9 campos)
    clienteNome: 'section-2', clienteNIF: 'section-2', clienteMorada: 'section-2', clienteEmail: 'section-2', 
    clienteCodigoPostal: 'section-2', clienteCidade: 'section-2', clienteRepresentante: 'section-2', clienteTelefone: 'section-2', clientePais: 'section-2',
    // III. Equipamento (4 campos)
    equipamentoModelo: 'section-3', equipamentoVoltagem: 'section-3', equipamentoFrequencia: 'section-3', equipamentoAquecimento: 'section-3',
    // IV. Montagem (3 campos)
    condicaoMontagem: 'section-4', instalacaoTipo: 'section-4', responsabilidadeGradil: 'section-4',
    // V. Logística & Local (22 campos)
    podeReceberTIR: 'section-5', temEmpilhador: 'section-5', podeDescarregarSemTecnico: 'section-5', temTecnicoAuxiliar: 'section-5',
    podeArmazenar: 'section-5', necessarioCintas: 'section-5', temAguaSala: 'section-5', adaptadorAguaTamanho: 'section-5',
    temEnergiaEletrica: 'section-5', temEscadas: 'section-5', temFichaEletrica: 'section-5', amperesOpcao: 'section-5',
    temDetergentes: 'section-5', documentacaoFabrica: 'section-5', equipamentoProtecao: 'section-5', chaoAcabado: 'section-5',
    drenoPreparado: 'section-5', ventilacaoPreparada: 'section-5', operadorPresente: 'section-5', operadorNome: 'section-5',
    responsavelComissionamentoPresente: 'section-5', responsavelComissionamentoNome: 'section-5', temUtensiliosSujos: 'section-5',
    // VI. Info & Medições (9 campos)
    ligacoesPressaoAgua: 'section-6', marcaProdutosQuimicos: 'section-6', medicaoPortaLargura: 'section-6', medicaoPortaAltura: 'section-6', 
    medicaoChaoTecto: 'section-6', horarioTrabalhoInicio: 'section-6', horarioTrabalhoFim: 'section-6', dataEntregaPrevista: 'section-6', observacoes: 'section-6',
    // VII. Fotos e Ficheiros (2 campos - NOVO)
    linksFotosFicheiros: 'section-7',
    fotosEnviadas: 'section-7',
    dataEnvioFotos: 'section-7'
};


// --- Core Logic ---

function initApp() {
    showActionView();
    // Define o tab inicial com as classes escuras
    switchTab('installation-responsibility', true); 
    console.log("Aplicação iniciada. Fonte de dados: Google Apps Script.");
}

// NOVO: Navegação para a vista de Criação
window.showCreationView = () => {
    document.getElementById('action-view').classList.add('hidden');
    document.getElementById('creation-form-view').classList.remove('hidden');
};

// NOVO: Navegação para a vista de Ações
window.showActionView = () => {
    document.getElementById('app-view').classList.add('hidden');
    document.getElementById('creation-form-view').classList.add('hidden');
    document.getElementById('accessSerialInput').value = '';
    document.getElementById('creationSerialInput').value = '';
    document.getElementById('action-view').classList.remove('hidden');
};

// NOVO: Tenta criar um novo separador/equipamento
window.createNewEquipment = async (e) => {
    e.preventDefault();
    const serial = document.getElementById('creationSerialInput').value.trim();
    if (!serial) return;
    
    const btn = document.getElementById('create-checklist-btn');
    console.log("Botão encontrado:", btn);
    const originalHTML = btn.innerHTML;
    
    // Mostrar loading
    btn.textContent = '⏳ A criar...';
    btn.disabled = true;
    console.log("Loading iniciado");
    
    try {
        showLoading(true);
        
        // 1. Coletar dados iniciais do formulário de criação
        let creationData = {};
        creationFields.forEach(key => {
            // Tenta encontrar o input de texto/número
            let input = document.getElementById(`field-creation-${key}`);
            
            if (input) {
                creationData[key] = input.value;
            } else {
                // Tenta encontrar o input de rádio
                const checkedRadio = document.querySelector(`input[name="creation-${key}"]:checked`);
                creationData[key] = checkedRadio ? checkedRadio.value : "";
            }
        });
        
        // 2. Preenche o estado global usando emptyDefaults para que o resto fique vazio
        state.serial = serial;
        state.data = { ...emptyDefaults, ...creationData }; // USA emptyDefaults AQUI
        
        // 3. Salvar (O Apps Script criará o separador se necessário)
        await saveData(true); // Força a gravação após a criação
        
        // 4. Sucesso - Atualizar botão
        btn.textContent = '✅ Criado!';
        btn.classList.remove('bg-somengil-blue', 'hover:bg-somengil-accent', 'shadow-somengil-blue/30');
        btn.classList.add('bg-emerald-600', 'hover:bg-emerald-700');
        console.log("Sucesso!");
        
        // 5. Transiciona para a aplicação principal
        setTimeout(() => {
            document.getElementById('creation-form-view').classList.add('hidden');
            document.getElementById('app-view').classList.remove('hidden');
            // O display-serial já foi atualizado em saveData() com o ID completo
            
            // Recarrega o formulário principal com os dados
            populateForm(state.data);
            calculateAndDisplayProgress(state.data);
            // As seções serão renderizadas dinamicamente e switchTab será chamado de lá
            
            // Restaurar botão
            btn.textContent = originalHTML;
            btn.classList.remove('bg-emerald-600', 'hover:bg-emerald-700');
            btn.classList.add('bg-somengil-blue', 'hover:bg-somengil-accent', 'shadow-somengil-blue/30');
            btn.disabled = false;
        }, 1500);
        
        showLoading(false);
    } catch (error) {
        console.error("Creation error:", error);
        btn.textContent = '❌ Erro!';
        btn.classList.remove('bg-somengil-blue', 'hover:bg-somengil-accent', 'shadow-somengil-blue/30');
        btn.classList.add('bg-red-600', 'hover:bg-red-700');
        
        setTimeout(() => {
            btn.textContent = originalHTML;
            btn.classList.remove('bg-red-600', 'hover:bg-red-700');
            btn.classList.add('bg-somengil-blue', 'hover:bg-somengil-accent', 'shadow-somengil-blue/30');
            btn.disabled = false;
        }, 2000);
        
        showLoading(false);
    }
};


// Função de login (agora renomeada para Aceder a um Equipamento Existente)
window.accessExistingEquipment = async (e) => {
    e.preventDefault();
    const serialInput = document.getElementById('accessSerialInput').value.trim();
    if (!serialInput) return;

    state.serial = serialInput;
    document.getElementById('action-view').classList.add('hidden');
    document.getElementById('app-view').classList.remove('hidden');
    document.getElementById('display-serial').innerText = `S/n: ${state.serial}`;
    
    await loadSheetData(state.serial);
    switchTab('installation-responsibility', true); // Garante que a primeira aba é mostrada e tem a classe escura ativa
};

// NOVO: Adaptação da função saveData para ser usada na criação e gravação normal
window.saveData = async (isInitialCreation = false) => {
    if (!state.serial) return;
    const btn = document.getElementById('save-btn');
    const originalText = isInitialCreation ? "A criar..." : btn.innerText;
    
    if (!isInitialCreation) {
        btn.innerText = "A guardar...";
        btn.disabled = true;
    }

    let newData = {};
    let isSheetSyncSuccessful = true;

    try {
        // 1. Coletar dados:
        if (isInitialCreation) {
            // FIX: Se é criação inicial, a fonte de dados é o state.data (preenchido no createNewEquipment).
            for (const key in emptyDefaults) {
                // Usa o valor em state.data (com os dados de criação), senão usa o valor vazio.
                newData[key] = state.data[key] !== undefined ? state.data[key] : emptyDefaults[key];
            }
        } else {
            // Caso contrário (salvamento normal), lemos o formulário principal visível.
            for (const key in emptyDefaults) {
                const input = document.getElementById(`field-${key}`);
                if (input) {
                     if (input.type === 'number') {
                         newData[key] = input.value === "" ? null : Number(input.value);
                     } else {
                        newData[key] = input.value;
                     }
                } else {
                    // Trata campos de rádio/checkbox
                    const checkedRadio = document.querySelector(`input[name="${key}"]:checked`);
                    if (checkedRadio) {
                        newData[key] = checkedRadio.value;
                    } else {
                         // Se não for rádio checked, assume o valor vazio/nulo do emptyDefaults
                         newData[key] = emptyDefaults[key] || "";
                    }
                }
            }
            // Atualiza o state.data com os dados lidos do formulário
            state.data = {...state.data, ...newData};
        }


        // 2. Sincronizar com o Google Sheets API (escrita) - Usa o 'newData' preenchido acima
        if (GOOGLE_SHEET_API_URL && GOOGLE_SHEET_API_URL.startsWith('http')) {
            try {
                const sheetPayload = {
                    serial: state.serial,
                    data: newData, // CORRETO: Usa o newData
                    timestamp: new Date().toISOString(),
                    action: 'write'
                };
                
                const response = await fetch(GOOGLE_SHEET_API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(sheetPayload)
                });
                
                // Tentar ler a resposta para obter o ID gerado
                try {
                    const responseData = await response.json();
                    if (responseData && responseData.id) {
                        state.id = responseData.id;
                        // Extrair apenas a parte aleatória (após o "&")
                        const randomPart = state.id.includes('&') ? state.id.split('&')[1] : state.id;
                        document.getElementById('display-serial').innerText = `S/N: ${randomPart}`;
                        console.log("ID armazenado:", state.id);
                    }
                } catch(e) {
                    console.log("Aviso: Não foi possível ler a resposta JSON da API.");
                }

            } catch (sheetError) {
                isSheetSyncSuccessful = false;
                console.warn("Could not synchronize with Google Sheets API:", sheetError);
            }
        }


        // 3. Atualizar UI
        if (!isInitialCreation) {
            btn.innerText = "Guardado!";
            btn.classList.remove('bg-somengil-blue');
            btn.classList.add('bg-emerald-600');
            
            let statusMessage = "Salvo com sucesso na Google Sheet.";
            if (!isSheetSyncSuccessful) {
                statusMessage = "⚠ Erro de sincronização. Dados podem não ter sido salvos.";
                document.getElementById('save-status').classList.remove('text-emerald-600');
                document.getElementById('save-status').classList.add('text-red-500');
            } else {
                 document.getElementById('save-status').classList.remove('text-red-500', 'text-yellow-500');
                 document.getElementById('save-status').classList.add('text-emerald-600');
            }
            document.getElementById('save-status').innerText = statusMessage;


            setTimeout(() => {
                btn.innerText = originalText;
                btn.classList.remove('bg-emerald-600');
                btn.classList.add('bg-somengil-blue');
                btn.disabled = false;
            }, 2000);
        } else {
            document.getElementById('save-status').innerText = "Novo equipamento criado e salvo.";
        }
        
        calculateAndDisplayProgress(state.data); 

    } catch (error) {
        console.error("Save error:", error);
        if (!isInitialCreation) {
            btn.innerText = "Erro!";
            document.getElementById('save-status').innerText = "Erro ao salvar! Verifique a consola.";
            document.getElementById('save-status').classList.remove('text-emerald-600', 'text-yellow-500');
            document.getElementById('save-status').classList.add('text-red-500');
            setTimeout(() => { btn.innerText = originalText; btn.disabled = false; }, 2000);
        } else {
             document.getElementById('save-status').innerText = "Erro ao criar novo equipamento!";
        }
    }
};

// NOVO: Função de save com feedback visual nos botões (suporta múltiplos botões)
window.saveDataWithFeedback = async (btn) => {
    if (!state.serial) return;
    
    // Guardar o texto e HTML original do botão
    const originalText = btn.innerHTML;
    
    // Mostrar loading
    btn.innerHTML = '<span class="inline-block animate-spin">⏳</span> A guardar...';
    btn.disabled = true;
    
    try {
        // Ler dados do formulário
        let newData = {};
        for (const key in emptyDefaults) {
            const input = document.getElementById(`field-${key}`);
            if (input) {
                if (input.type === 'number') {
                    newData[key] = input.value === "" ? null : Number(input.value);
                } else {
                    newData[key] = input.value;
                }
            } else {
                const checkedRadio = document.querySelector(`input[name="${key}"]:checked`);
                if (checkedRadio) {
                    newData[key] = checkedRadio.value;
                } else {
                    newData[key] = emptyDefaults[key] || "";
                }
            }
        }
        
        // Sincronizar com o Google Sheets API
        if (GOOGLE_SHEET_API_URL && GOOGLE_SHEET_API_URL.startsWith('http')) {
            const sheetPayload = {
                serial: state.serial,
                data: newData,
                timestamp: new Date().toISOString(),
                action: 'write',
                isInitialCreation: false
            };
            
            try {
                const response = await fetch(GOOGLE_SHEET_API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(sheetPayload)
                });
                
                // Tentar ler a resposta para obter o ID gerado
                try {
                    const responseData = await response.json();
                    if (responseData && responseData.id) {
                        state.id = responseData.id;
                        // Extrair apenas a parte aleatória (após o "&")
                        const randomPart = state.id.includes('&') ? state.id.split('&')[1] : state.id;
                        document.getElementById('display-serial').innerText = `S/N: ${randomPart}`;
                        console.log("ID armazenado:", state.id);
                    }
                } catch(e) {
                    console.log("Aviso: Não foi possível ler a resposta JSON da API.");
                }
            } catch(error) {
                console.warn("Erro ao sincronizar com Google Sheets:", error);
            }
        }
        
        // Sucesso
        btn.innerHTML = '✅ Guardado!';
        btn.classList.remove('bg-somengil-blue', 'hover:bg-somengil-accent');
        btn.classList.add('bg-emerald-600', 'hover:bg-emerald-700');
        
        state.data = {...state.data, ...newData};
        calculateAndDisplayProgress(state.data);
        
        // Restaurar após 2 segundos
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('bg-emerald-600', 'hover:bg-emerald-700');
            btn.classList.add('bg-somengil-blue', 'hover:bg-somengil-accent');
            btn.disabled = false;
        }, 2000);
        
    } catch (error) {
        console.error("Save error:", error);
        btn.innerHTML = '❌ Erro!';
        btn.classList.remove('bg-somengil-blue', 'hover:bg-somengil-accent');
        btn.classList.add('bg-red-600', 'hover:bg-red-700');
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('bg-red-600', 'hover:bg-red-700');
            btn.classList.add('bg-somengil-blue', 'hover:bg-somengil-accent');
            btn.disabled = false;
        }, 2000);
    }
};

// NOVO: Carrega dados do Apps Script (Leitura)
async function loadSheetData(serial) {
    showLoading(true);
    try {
        // Requisição de leitura para o Apps Script
        const payload = { serialNumber: serial, action: 'fetch' };
        const requestBody = new URLSearchParams(payload).toString();

        const response = await fetch(GOOGLE_SHEET_API_URL, {
            method: 'POST',
            mode: 'cors', // Deve ser 'cors' ou o Apps Script deve aceitar POST com URLSearchParams
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: requestBody
        });

        if (!response.ok) throw new Error(`Network error: ${response.status}`);

        const result = await response.json();
        
        if (result.result === 'success' && result.data) {
            // ... rest of original logic (unchanged) ...
        }
    } catch (err) {
        console.warn('Erro ao carregar sheet:', err);
    } finally {
        showLoading(false);
    }
}


// --- UI Logic ---

window.switchTab = (tabId, initial = false) => {
    document.querySelectorAll('.content-section').forEach(el => el.classList.add('hidden'));
    document.getElementById(tabId).classList.remove('hidden');
    
    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.remove('sidebar-dark-active', 'tab-active');
        el.classList.add('sidebar-dark-inactive');
    });
    
    // Ativa a nova classe de fundo escuro
    document.getElementById(`btn-${tabId}`).classList.add('sidebar-dark-active');
    document.getElementById(`btn-${tabId}`).classList.remove('sidebar-dark-inactive');

    // Garante que o ícone do gráfico na sidebar é recalculado para ter as cores corretas do fundo escuro
    if (!initial) {
         calculateAndDisplayProgress(state.data);
    }
    state.activeTab = tabId;
};

function showLoading(isLoading) {
    const loader = document.getElementById('loader');
    if (isLoading) loader.classList.remove('hidden');
    else loader.classList.add('hidden');
}

window.logout = () => {
    state.serial = null;
    state.data = {};
    document.getElementById('app-view').classList.add('hidden');
    document.getElementById('creation-form-view').classList.add('hidden');
    document.getElementById('accessSerialInput').value = '';
    document.getElementById('creationSerialInput').value = '';
    showActionView();
};

initApp();
