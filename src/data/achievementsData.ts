import type { TeamMember, Achievement } from '../types';

export type { TeamMember, Achievement };

export const achievements: Achievement[] = [
    {
        id: '1',
        title: '🥈 2nd Place - Advanced Cryptography Track',
        subtitle: 'Privacy-Preserving Blockchain Gaming',
        event: 'IXH25 – Italian XRPL Hackathon',
        date: 'November 2025',
        team: 'πve',
        description: 'Team πve achieved second place in the Advanced Cryptography Track by developing a privacy-preserving solution for secure blockchain-based gaming. The project combines Fully Homomorphic Encryption (FHE) with Distributed Key Generation (DKG) to create a trustless F1-AI racing platform where computations occur on encrypted data, ensuring complete privacy and correctness for all participants.',
        challenge: 'The 24-hour challenge required designing and implementing a cryptographic protocol that would allow a racing game to operate securely on blockchain infrastructure while maintaining absolute privacy of game parameters and ensuring that no single party—including the server—could manipulate or view sensitive data.',
        solution: 'The solution combines two powerful cryptographic primitives to achieve both privacy and decentralized trust: FHE enables computations on encrypted data, DKG ensures there is no single point of control or failure, and XRPL Blockchain handles payment transactions using XRP cryptocurrency.',
        technicalDetailsTitle: 'Cryptographic Components',
        technicalDetails: [
            {
                title: 'Fully Homomorphic Encryption',
                icon: '🔐',
                description: 'BFV scheme based on RLWE',
                details: [
                    'Allows server to perform speed calculations on encrypted parameters',
                    'Processes encrypted flag vectors without ever decrypting them',
                    'Applies complex formulas while maintaining complete privacy',
                ],
            },
            {
                title: 'Distributed Key Generation',
                icon: '🔑',
                description: '5 judges with distributed keys',
                details: [
                    'Collaborative generation of encryption key',
                    'Each judge holds only a portion of the secret',
                    'Elimination of single points of failure',
                    'Private key is never fully reconstructed',
                ],
            },
            {
                title: 'XRPL Blockchain Integration',
                icon: '💰',
                description: 'Payment and transaction management',
                details: [
                    'Economic layer management with XRP',
                    'Transactions for training sessions',
                    'Race participation fees',
                    'Seamless payment infrastructure',
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
                description: 'Players adjust car flags by adding encrypted random deltas, maintaining end-to-end privacy.',
            },
            {
                phase: 'Web Interface',
                description: 'A complete F1-AI web application provides an accessible user experience, abstracting the complex cryptographic operations.',
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
