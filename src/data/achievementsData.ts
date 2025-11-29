export interface TeamMember {
    name: string;
    role: string;
    contributions: string[];
}

export interface Achievement {
    id: string;
    title: string;
    subtitle: string;
    event: string;
    date: string;
    team: string;
    description: string;
    challenge: string;
    solution: string;
    technicalDetails: {
        title: string;
        icon: string;
        description: string;
        details: string[];
    }[];
    workflow: {
        phase: string;
        description: string;
    }[];
    teamMembers: TeamMember[];
    resources: {
        video?: string;
        github?: string;
        demo?: string;
    };
    tags: string[];
}

export const achievements: Achievement[] = [
    {
        id: '1',
        title: '🥈 2° Posto - Track Crittografia Avanzata',
        subtitle: 'Privacy-Preserving Blockchain Gaming',
        event: 'IXH25 – Italian XRPL Hackathon',
        date: 'November 2025',
        team: 'Team πve',
        description: 'Il Team πve ha ottenuto il secondo posto nella Track di Crittografia Avanzata sviluppando una soluzione privacy-preserving per il gaming sicuro basato su blockchain. Il progetto combina la Fully Homomorphic Encryption (FHE) con la Distributed Key Generation (DKG) per creare una piattaforma di corse F1-AI trustless dove i calcoli avvengono su dati crittografati, garantendo completa privacy e correttezza per tutti i partecipanti.',
        challenge: 'La sfida di 24 ore richiedeva di progettare e implementare un protocollo crittografico che permettesse a un gioco di corse di funzionare in modo sicuro su infrastruttura blockchain mantenendo privacy assoluta dei parametri di gioco e assicurando che nessuna singola parte—incluso il server—possa manipolare o visualizzare dati sensibili.',
        solution: 'La soluzione combina due potenti primitive crittografiche per ottenere sia privacy che fiducia decentralizzata: FHE permette calcoli su dati crittografati, DKGassicura che non ci sia un singolo punto di controllo o fallimento, e Blockchain XRPL gestisce le transazioni di pagamento utilizzando la criptovaluta XRP.',
        technicalDetails: [
            {
                title: 'Fully Homomorphic Encryption',
                icon: '🔐',
                description: 'Schema BFV basato su RLWE',
                details: [
                    'Permette al server di eseguire calcoli di velocità su parametri crittografati',
                    'Processa vettori di flags crittografati senza mai decriptarli',
                    'Applica formule complesse mantenendo privacy completa',
                ],
            },
            {
                title: 'Distributed Key Generation',
                icon: '🔑',
                description: '5 giudici con chiavi distribuite',
                details: [
                    'Generazione collaborativa della chiave di crittografia',
                    'Ogni giudice detiene solo una parte del segreto',
                    'Eliminazione di singoli punti di fallimento',
                    'La chiave privata non viene mai completamente ricostruita',
                ],
            },
            {
                title: 'XRPL Blockchain Integration',
                icon: '💰',
                description: 'Gestione pagamenti e transazioni',
                details: [
                    'Gestione del layer economico con XRP',
                    'Transazioni per sessioni di allenamento',
                    'Quote di partecipazione alle gare',
                    'Infrastruttura di pagamento senza soluzione di continuità',
                ],
            },
        ],
        workflow: [
            {
                phase: 'Setup',
                description: 'I giudici generano collaborativamente chiavi parziali che si combinano in una singola chiave pubblica. La chiave privata rimane distribuita, mai ricostruita.',
            },
            {
                phase: 'Computazione',
                description: 'I parametri crittografati delle auto arrivano al server, che esegue tutti i calcoli di velocità interamente su ciphertexts.',
            },
            {
                phase: 'Allenamento',
                description: 'I giocatori regolano i flags delle auto aggiungendo delta random crittografati, mantenendo privacy end-to-end.',
            },
            {
                phase: 'Interfaccia Web',
                description: "Un'applicazione web completa F1-AI fornisce un'esperienza utente accessibile, astraendo le operazioni crittografiche complesse.",
            },
        ],
        teamMembers: [
            {
                name: 'Emanuele Nardone',
                role: 'Full Stack Developer',
                contributions: [
                    'Sviluppo full stack dell\'applicazione web',
                    'Implementazione interfaccia utente',
                    'Integrazione blockchain XRPL',
                ],
            },
            {
                name: 'Sara Marchetti',
                role: 'Cryptography Specialist',
                contributions: [
                    'Selezione algoritmi crittografici',
                    'Formalizzazione della soluzione',
                    'Contributo alla presentazione del framework',
                ],
            },
            {
                name: 'Rosa Fera',
                role: 'Cryptographic Designer',
                contributions: [
                    'Progettazione approccio crittografico',
                    'Formalizzazione della soluzione',
                    'Presentazione del framework',
                ],
            },
            {
                name: 'Gabriele Lozupone',
                role: 'Cryptographic Engineer',
                contributions: [
                    'Implementazione motore crittografico',
                    'Progettazione architettura del framework',
                    'Presentazione pitch finale',
                ],
            },
            {
                name: 'Emanuele Vita',
                role: 'Backend & Frontend Developer',
                contributions: [
                    'Sviluppo backend e frontend',
                    'Creazione diagrammi architetturali',
                    'Supporto alla presentazione',
                ],
            },
        ],
        resources: {
            video: 'https://www.youtube.com/watch?v=CfjHgaJD_uc',
            github: 'https://github.com/Narden91/f1_ai_race_xrp',
        },
        tags: [
            'Blockchain',
            'Cryptography',
            'XRPL',
            'Fully Homomorphic Encryption',
            'Distributed Key Generation',
            'Privacy-Preserving Computing',
            'Decentralized Trust',
            'Secure Gaming',
            'XRP',
            'Hackathon',
        ],
    },
];
