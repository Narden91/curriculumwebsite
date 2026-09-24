interface TeamMember {
  name: string;
  role: string;
  contributions: string[];
}

interface TechnicalDetail {
  title: string;
  description: string;
  details: string[];
}

interface WorkflowPhase {
  phase: string;
  description: string;
}

interface AchievementResources {
  video?: string;
  github?: string;
}

/** Hackathon/Competition achievements */
interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  event: string;
  date: string;
  team: string;
  description: string;
  challenge: string;
  solution: string;
  technicalDetails: TechnicalDetail[];
  workflow: WorkflowPhase[];
  teamMembers: TeamMember[];
  resources: AchievementResources;
  tags: string[];
  /** Optional: section title for technical details (defaults to "Technical Details") */
  technicalDetailsTitle?: string;
}

export const achievements: Achievement[] = [
    {
        id: '1',
        title: '2nd Place - Advanced Cryptography Track',
        subtitle: 'Privacy-Preserving Blockchain Gaming',
        event: 'IXH25 – Italian XRPL Hackathon',
        date: 'November 2025',
        team: 'πve',
        description: 'Second place in the Advanced Cryptography Track. We built an F1 racing game on the XRP Ledger in which the server computes race results on encrypted car parameters: fully homomorphic encryption (FHE) keeps the parameters private, and distributed key generation (DKG) means no single party, the server included, can decrypt them.',
        challenge: 'In 24 hours, design and implement a protocol that lets a blockchain racing game run without any party, the server included, being able to read or alter the players\' secret parameters.',
        solution: 'FHE (BFV scheme) to compute on encrypted data, DKG among five judges so the decryption key never exists in one place, and the XRP Ledger for entry fees and payments.',
        technicalDetailsTitle: 'Cryptographic Components',
        technicalDetails: [
            {
                title: 'Fully Homomorphic Encryption',
                description: 'BFV scheme based on RLWE',
                details: [
                    'Allows server to perform speed calculations on encrypted parameters',
                    'Processes encrypted flag vectors without ever decrypting them',
                    'Evaluates the race formulas on ciphertexts',
                ],
            },
            {
                title: 'Distributed Key Generation',
                description: '5 judges with distributed keys',
                details: [
                    'Collaborative generation of encryption key',
                    'Each judge holds only a portion of the secret',
                    'No single point of failure',
                    'Private key is never fully reconstructed',
                ],
            },
            {
                title: 'XRPL Blockchain Integration',
                description: 'Payment and transaction management',
                details: [
                    'Payments in XRP',
                    'Transactions for training sessions',
                    'Race participation fees',
                ],
            },
        ],
        workflow: [
            {
                phase: 'Setup',
                description: 'Judges collaboratively generate partial keys that combine into a single public key. The private key remains distributed, never reconstructed.',
            },
            {
                phase: 'Computation',
                description: 'Encrypted car parameters arrive at the server, which performs all speed calculations entirely on ciphertexts.',
            },
            {
                phase: 'Training',
                description: 'Players adjust car flags by adding encrypted random deltas, so the server never sees the plain values.',
            },
            {
                phase: 'Web Interface',
                description: 'A web application for players that hides the cryptography behind a normal game interface.',
            },
        ],
        teamMembers: [
            {
                name: 'Emanuele Nardone',
                role: 'Full Stack Developer',
                contributions: [
                    'Full stack web application development',
                    'User interface implementation',
                    'XRPL blockchain integration',
                ],
            },
            {
                name: 'Sara Marchetti',
                role: 'Cryptography Specialist',
                contributions: [
                    'Cryptographic algorithm selection',
                    'Solution formalization',
                    'Framework presentation contribution',
                ],
            },
            {
                name: 'Rosa Fera',
                role: 'Cryptographic Designer',
                contributions: [
                    'Cryptographic approach design',
                    'Solution formalization',
                    'Framework presentation',
                ],
            },
            {
                name: 'Gabriele Lozupone',
                role: 'Cryptographic Engineer',
                contributions: [
                    'Cryptographic engine implementation',
                    'Framework architecture design',
                    'Final pitch presentation',
                ],
            },
            {
                name: 'Emanuele Vita',
                role: 'Support',
                contributions: [
                    'Architectural diagrams creation',
                    'Presentation support',
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
