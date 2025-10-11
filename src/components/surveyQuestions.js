// 🛫 BEAUVAIS AIRPORT PASSENGER SURVEY
// Comprehensive survey for airport passengers (arrivals and departures)

export const templateSurveyQuestions = [
    // 🛬 Q0. Passenger Status (Work Station equivalent)
    {
        id: "Q0",
        text: "Êtes-vous :",
        type: 'singleChoice',
        options: [
            { id: 1, text: "La personne arrive en avion", next: "Q1" },
            { id: 2, text: "La personne repart en avion", next: "Q1" }
        ]
    },

    // ✈️ Q1. Flight Number
    {
        id: "Q1",
        text: "Quel est votre numéro de vol, s'il vous plaît ?",
        type: 'freeText',
        freeTextPlaceholder: "Ex: AF1234",
        next: "Q2"
    },

    // 🎫 Q2. Flight Type
    {
        id: "Q2",
        text: "Ce vol correspond-il à :",
        type: 'singleChoice',
        conditionalNext: {
            condition: "Q0",
            routes: [
                { value: 1, next: "Q3_A" },  // If Q0 == 1, show Q3_A (origin)
                { value: 2, next: "Q3_B" }   // If Q0 == 2, show Q3_B (destination)
            ]
        },
        options: [
            { id: 1, text: "Un vol aller" },
            { id: 2, text: "Un vol retour" }
        ]
    },

    // 🌍 Q3_A. Flight Origin (for arriving passengers)
    {
        id: "Q3_A",
        text: "quel est l'origine de votre vol ? (Ville + pays)",
        type: 'freeText',
        freeTextPlaceholder: "Ex: Paris, France",
        next: "Q4",
        condition: { questionId: "Q0", value: 1 },
        fallbackNext: "Q3_B"
    },
    // 🌍 Q3_B. Flight Destination (for departing passengers)
    {
        id: "Q3_B",
        text: "quelle est la destination de votre vol ? (Ville + pays)",
        type: 'freeText',
        freeTextPlaceholder: "Ex: Rome, Italie",
        next: "Q4",
        condition: { questionId: "Q0", value: 2 },
        fallbackNext: "Q4"
    },

    // 🏢 Q4. Airline
    {
        id: "Q4",
        text: "Avec quelle compagnie aérienne voyagez-vous ?",
        type: 'freeText',
        freeTextPlaceholder: "Ex: Air France, Ryanair...",
        next: "Q5"
    },

    // 👥 Q5. Travel Group Size
    {
        id: "Q5",
        text: "Combien de personnes voyagent avec vous (vous compris) ?",
        type: 'singleChoice',
        options: [
            { id: 1, text: "Seul", next: "Q6" },
            { id: 2, text: "2 personnes", next: "Q6" },
            { id: 3, text: "3 personnes", next: "Q6" },
            { id: 4, text: "Plus", next: "Q5_PLUS" }
        ]
    },

    // 📝 Q5 Group Size Specification
    {
        id: "Q5_PLUS",
        text: "Précisez le nombre de personnes :",
        type: 'freeText',
        validation: "numeric",
        freeTextPlaceholder: "Nombre de personnes",
        next: "Q6"
    },

    // 🎯 Q6. Travel Purpose
    {
        id: "Q6",
        text: "Quel est le motif principal de votre voyage ?",
        type: 'singleChoice',
        next: "Q7_A",  // Default next for departing passengers (will be overridden by conditionalNext)
        conditionalNext: {
            condition: "Q0",
            routes: [
                { value: 1, next: "Q7_B" },  // If Q0 == 1 (arriving), show Q7_B
                { value: 2, next: "Q7_A" }   // If Q0 == 2 (departing), show Q7_A
            ]
        },
        options: [
            { id: 1, text: "Vacances / Loisirs" },
            { id: 2, text: "Visite famille / amis" },
            { id: 3, text: "Travail / affaires" },
            { id: 4, text: "Études" },
            { id: 5, text: "Autre", next: "Q6_AUTRE" }
        ]
    },

    // 📝 Q6 Travel Purpose Other
    {
        id: "Q6_AUTRE",
        text: "Précisez le motif de votre voyage :",
        type: 'freeText',
        freeTextPlaceholder: "Décrivez le motif...",
        next: "Q7_A",  // Default next for departing passengers (will be overridden by conditionalNext)
        conditionalNext: {
            condition: "Q0",
            routes: [
                { value: 1, next: "Q7_B" },  // If Q0 == 1 (arriving), show Q7_B
                { value: 2, next: "Q7_A" }   // If Q0 == 2 (departing), show Q7_A
            ]
        }
    },

    // 🚗 Q7_A. Transport to Airport (for departing passengers)
    {
        id: "Q7_A",
        text: "Quel moyen de transport avez-vous utilisé pour venir à l'aéroport de Beauvais ?",
        type: 'singleChoice',
        next: "Q8_A",
        condition: { questionId: "Q0", value: 2 },
        fallbackNext: "Q8_A",
        options: [
            { id: 1, text: "Voiture personnelle", next: "Q8_A" },
            { id: 2, text: "Covoiturage", next: "Q8_A" },
            { id: 3, text: "Taxi / VTC", next: "Q8_A" },
            { id: 4, text: "Train + Navette", next: "Q8_A" },
            { id: 5, text: "Navette Beauvais–Paris", next: "Q8_A" },
            { id: 6, text: "Autre précisez", next: "Q7_A_AUTRE" }
        ]
    },

    // 📝 Q7_A Other Transport to Airport 
    {
        id: "Q7_A_AUTRE",
        text: "Précisez le moyen de transport utilisé pour venir à l'aéroport :",
        type: 'freeText',
        freeTextPlaceholder: "Décrivez le moyen de transport...",
        next: "Q8_A",
        condition: { questionId: "Q0", value: 2 },
        fallbackNext: "Q8_A"
    },

    // 🚗 Q7_B. Transport from Airport (for arriving passengers)
    {
        id: "Q7_B",
        text: "Quel moyen de transport allez-vous utiliser en sortant de l'aéroport ?",
        type: 'singleChoice',
        next: "Q8_B",
        condition: { questionId: "Q0", value: 1 },
        fallbackNext: "Q8_B",
        options: [
            { id: 1, text: "Voiture personnelle", next: "Q8_B" },
            { id: 2, text: "Covoiturage", next: "Q8_B" },
            { id: 3, text: "Taxi / VTC", next: "Q8_B" },
            { id: 4, text: "Train + Navette", next: "Q8_B" },
            { id: 5, text: "Navette Beauvais–Paris", next: "Q8_B" },
            { id: 6, text: "Autre", next: "Q7_B_AUTRE" }
        ]
    },

    // 📝 Q7_B Other Transport from Airport 
    {
        id: "Q7_B_AUTRE",
        text: "Précisez le moyen de transport que vous allez utiliser en sortant de l'aéroport :",
        type: 'freeText',
        freeTextPlaceholder: "Décrivez le moyen de transport...",
        next: "Q8_B",
        condition: { questionId: "Q0", value: 1 },
        fallbackNext: "Q8_B"
    },

    // 🔄 Q8_A. Same Transport for Return (for departing passengers)
    {
        id: "Q8_A",
        text: "Allez-vous utiliser le même moyen de transport pour le retour ?",
        type: 'singleChoice',
        next: "Q9",  // Go to Q9 if navette was selected in Q7_A
        condition: { questionId: "Q0", value: 2 },
        fallbackNext: "Q9_a",  // Fallback if needed
        options: [
            { id: 1, text: "Oui", next: "Q9" },
            { id: 2, text: "Non", next: "Q8_A_AUTRE" }
        ]
    },

    // 📝 Q8_A Other Transport for Return
    {
        id: "Q8_A_AUTRE",
        text: "Précisez le moyen de transport que vous utiliserez pour le retour :",
        type: 'freeText',
        freeTextPlaceholder: "Décrivez le moyen de transport...",
        next: "Q9",  // Always go to Q9, but Q9 will be conditionally shown  
        condition: { questionId: "Q0", value: 2 },
        fallbackNext: "Q9_a"  // Fallback if needed
    },

    // 🔄 Q8_B. Same Transport for Arrival (for arriving passengers)
    {
        id: "Q8_B",
        text: "Aviez-vous utilisé le même moyen de transport pour venir à l'aéroport lors de votre vol aller ?",
        type: 'singleChoice',
        next: "Q9",  // Always go to Q9, but Q9 will be conditionally shown
        condition: { questionId: "Q0", value: 1 },
        fallbackNext: "Q9_a",  // Fallback if needed
        options: [
            { id: 1, text: "Oui", next: "Q9" },
            { id: 2, text: "Non", next: "Q8_B_AUTRE" }
        ]
    },

    // 📝 Q8_B Other Transport for Arrival
    {
        id: "Q8_B_AUTRE",
        text: "Précisez le moyen de transport que vous aviez utilisé pour venir à l'aéroport :",
        type: 'freeText',
        freeTextPlaceholder: "Décrivez le moyen de transport...",
        next: "Q9",  // Always go to Q9, but Q9 will be conditionally shown  
        condition: { questionId: "Q0", value: 1 },
        fallbackNext: "Q9_a"  // Fallback if needed
    },

    // 🚌 Q9. Navette Choice Reason 
    {
        id: "Q9",
        text: "Pourquoi avez-vous choisi la navette Beauvais–Paris ?",
        type: 'singleChoice',
        next: "Q9_a",  // Default next
        condition: "Q7_A == 5 OR Q7_B == 5",  // Only show if navette was selected
        fallbackNext: "Q9_a",  // Non-navette users will go to Q9_a, which will be skipped but its conditional logic used
        options: [
            { id: 1, text: "Prix", next: "Q9_a" },
            { id: 2, text: "Rapidité", next: "Q9_a" },
            { id: 3, text: "Facilité d'accès", next: "Q9_a" },
            { id: 4, text: "Pas d'alternative pratique", next: "Q9_a" },
            { id: 5, text: "Autre", next: "Q9_AUTRE" }
        ]
    },

    // 📝 Q9 Other Reason
    {
        id: "Q9_AUTRE",
        text: "Précisez pourquoi vous avez choisi la navette Beauvais–Paris :",
        type: 'freeText',
        freeTextPlaceholder: "Décrivez la raison...",
        next: "Q9_a",
        fallbackNext: "Q9_a"  // Consistent fallback
    },

    // ⭐ Q9_a. Navette Satisfaction Rating
    {
        id: "Q9_a",
        text: "Sur une échelle de 1 à 5, comment évaluez-vous la navette Beauvais–Paris ? (1 = pas du tout satisfait, 5 = très satisfait)",
        type: 'singleChoice',
        next: "Q14",  // Default: go directly to profile questions
        conditionalNext: {
            condition: "Q0 == 2 AND Q2 == 2",
            routes: [
                { value: true, next: "Q10" },   // If Q0==2 AND Q2==2, go to stay questions
                { value: false, next: "Q14" }   // Otherwise, go to profile questions
            ]
        },
        condition: "Q7_A == 5 OR Q7_B == 5",  // Only show to navette users
        fallbackNext: "Q10",  // For non-navette users who skip Q9_a, go to Q10 which has the condition
        options: [
            { id: 1, text: "Pas du tout satisfait" },
            { id: 2, text: "Peu satisfait" },
            { id: 3, text: "Moyennement satisfait" },
            { id: 4, text: "Satisfait" },
            { id: 5, text: "Très satisfait" }
        ]
    },



    // ✈️ Q10. Stay Location
    {
        id: "Q10",
        text: "Où avez-vous séjourné principalement ?",
        type: 'singleChoice',
        condition: "Q0 == 2 AND Q2 == 2",
        fallbackNext: "Q14",
        options: [
            { id: 1, text: "Beauvaisis", next: "Q11" },
            { id: 2, text: "Oise (hors Beauvaisis)", next: "Q11" },
            { id: 3, text: "Hauts-de-France (hors Oise)", next: "Q11" },
            { id: 4, text: "Ile-de-France", next: "Q11" },
            { id: 5, text: "Autre", next: "Q10_AUTRE" }
        ]
    },

    // 📝 Q10 Other Stay Location
    {
        id: "Q10_AUTRE",
        text: "Précisez où vous avez séjourné principalement :",
        type: 'commune',
        next: "Q11",
        condition: "Q0 == 2 AND Q2 == 2",
        fallbackNext: "Q14"
    },

    // 📅 Q11. Stay Duration
    {
        id: "Q11",
        text: "Combien de jours a duré votre séjour ?",
        type: 'freeText',
        freeTextPlaceholder: "Nombre de jours",
        validation: "numeric",
        next: "Q12",
        condition: "Q0 == 2 AND Q2 == 2",
        fallbackNext: "Q14"
    },

    // 💰 Q12. Budget Details
    {
        id: "Q12",
        text: "Quel budget approximatif avez-vous consacré à ce séjour ? Total :",
        type: 'freeText',
        freeTextPlaceholder: "Montant total en €",
        validation: "numeric",
        next: "Q12_a",
        condition: "Q0 == 2 AND Q2 == 2",
        fallbackNext: "Q14"
    },

    // 💰 Q12_a. Budget - Airfare
    {
        id: "Q12_a",
        text: "Dont environ : Billet d'avion",
        type: 'freeText',
        freeTextPlaceholder: "Montant billet d'avion en €",
        validation: "numeric",
        next: "Q12_b",
        condition: "Q0 == 2 AND Q2 == 2",
        fallbackNext: "Q14"
    },

    // 💰 Q12_b. Budget - Transport
    {
        id: "Q12_b",
        text: "Transport pendant le séjour",
        type: 'freeText',
        freeTextPlaceholder: "Montant transport en €",
        validation: "numeric",
        next: "Q12_c",
        condition: "Q0 == 2 AND Q2 == 2",
        fallbackNext: "Q14"
    },

    // 💰 Q12_c. Budget - Accommodation
    {
        id: "Q12_c",
        text: "Hébergement",
        type: 'freeText',
        freeTextPlaceholder: "Montant hébergement en €",
        validation: "numeric",
        next: "Q12_d",
        condition: "Q0 == 2 AND Q2 == 2",
        fallbackNext: "Q14"
    },

    // 💰 Q12_d. Budget - Food
    {
        id: "Q12_d",
        text: "Restauration",
        type: 'freeText',
        freeTextPlaceholder: "Montant restauration en €",
        validation: "numeric",
        next: "Q12_e",
        condition: "Q0 == 2 AND Q2 == 2",
        fallbackNext: "Q14"
    },

    // 💰 Q12_e. Budget - Leisure
    {
        id: "Q12_e",
        text: "Loisirs",
        type: 'freeText',
        freeTextPlaceholder: "Montant loisirs en €",
        validation: "numeric",
        next: "Q13",
        condition: "Q0 == 2 AND Q2 == 2",
        fallbackNext: "Q14"
    },

    // 🛍️ Q13. Airport Expenses
    {
        id: "Q13",
        text: "Avez-vous effectué des dépenses à l'aéroport (boutiques, restauration, parking, etc.) ?",
        type: 'singleChoice',
        condition: "Q0 == 2 AND Q2 == 2",
        fallbackNext: "Q14",
        options: [
            { id: 1, text: "Oui", next: "Q13bis" },
            { id: 2, text: "Non", next: "Q14" }
        ]
    },

    // 💶 Q13bis. Airport Expense Amount
    {
        id: "Q13bis",
        text: "Si oui, environ quel montant ?",
        type: 'freeText',
        freeTextPlaceholder: "Montant en €",
        validation: "numeric",
        next: "Q14",
        condition: "Q0 == 2 AND Q2 == 2",
        fallbackNext: "Q14"
    },

    // 👥 Q14. Gender
    {
        id: "Q14",
        text: "Sexe :",
        type: 'singleChoice',
        next: "Q15",
        options: [
            { id: 1, text: "Homme", next: "Q15" },
            { id: 2, text: "Femme", next: "Q15" },
            { id: 3, text: "Autre", next: "Q15" }
        ]
    },

    // 🌍 Q15. Nationality
    {
        id: "Q15",
        text: "Nationalité :",
        type: 'freeText',
        freeTextPlaceholder: "Votre nationalité",
        next: "Q16"
    },
    // 🎂 Q16_A. Age Group
    {
        id: "Q16",
        text: "À quelle tranche d'âge appartenez-vous ?",
        type: 'singleChoice',
        next: "Q17",
        options: [
            { id: 1, text: "Moins de 18 ans", next: "Q17" },
            { id: 2, text: "18–24 ans", next: "Q17" },
            { id: 3, text: "25–34 ans", next: "Q17" },
            { id: 4, text: "35–49 ans", next: "Q17" },
            { id: 5, text: "50–64 ans", next: "Q17" },
            { id: 6, text: "65 ans et plus", next: "Q17" }
        ]
    },

    // 👔 Q17. Socio-professional Category
    {
        id: "Q17",
        text: "Quelle est votre catégorie socio-professionnelle principale ?",
        type: 'singleChoice',
        next: "Q18",
        options: [
            { id: 1, text: "Dirigeant d'entreprise / indépendant", next: "Q18" },
            { id: 2, text: "Cadre supérieur, ingénieur, profession intellectuelle", next: "Q18" },
            { id: 3, text: "Profession intermédiaire (technicien, enseignant, contremaître, etc.)", next: "Q18" },
            { id: 4, text: "Employé / ouvrier", next: "Q18" },
            { id: 5, text: "Profession libérale, artiste, expert", next: "Q18" },
            { id: 6, text: "Étudiant", next: "Q18" },
            { id: 7, text: "Retraité", next: "Q18" },
            { id: 8, text: "Sans activité / en recherche d'emploi", next: "Q18" },
            { id: 9, text: "Autre", next: "Q17_AUTRE" }
        ]
    },

    // 📝 Q17 Other Socio-professional Category
    {
        id: "Q17_AUTRE",
        text: "Précisez votre catégorie socio-professionnelle :",
        type: 'freeText',
        freeTextPlaceholder: "Décrivez votre profession...",
        next: "Q18"
    },

    // 🏠 Q18. Main Residence
    {
        id: "Q18",
        text: "Quel est votre lieu de résidence principale ?",
        type: 'commune',
        freeTextPlaceholder: "Votre ville et pays de résidence",
        next: "end"
    },
];
   