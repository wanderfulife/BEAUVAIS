// 🛫 BEAUVAIS AIRPORT PASSENGER SURVEY
// Comprehensive survey for airport passengers (arrivals and departures)

export const templateSurveyQuestions = [
    // 🛬 Q0. Passenger Status (Work Station equivalent)
    {
        id: "Q0",
        text: "Êtes-vous : / Are you:",
        type: 'singleChoice',
        options: [
            { id: 1, text: "La personne arrive en avion / The person is arriving by plane", next: "Q1" },
            { id: 2, text: "La personne repart en avion / The person is departing by plane", next: "Q1" }
        ]
    },

    // ✈️ Q1. Flight Number
    {
        id: "Q1",
        text: "Quel est votre numéro de vol, s'il vous plaît ? / What is your flight number, please?",
        type: 'freeText',
        freeTextPlaceholder: "Ex: AF1234",
        next: "Q2"
    },

    // 🎫 Q2. Flight Type
    {
        id: "Q2",
        text: "Ce vol correspond-il à : / Is this flight :",
        type: 'singleChoice',
        conditionalNext: {
            condition: "Q0",
            routes: [
                { value: 1, next: "Q3_A" },  // If Q0 == 1, show Q3_A (origin)
                { value: 2, next: "Q3_B" }   // If Q0 == 2, show Q3_B (destination)
            ]
        },
        options: [
            { id: 1, text: "Un vol aller / An outbound flight" },
            { id: 2, text: "Un vol retour / A return flight" }
        ]
    },

    // 🌍 Q3_A. Flight Origin (for arriving passengers)
    {
        id: "Q3_A",
        text: "quel est l'origine de votre vol ? (Ville + pays) / What is the origin of your flight ?",
        type: 'freeText',
        freeTextPlaceholder: "Ex: Paris, France",
        next: "Q4",
        condition: { questionId: "Q0", value: 1 },
        fallbackNext: "Q3_B"
    },
    // 🌍 Q3_B. Flight Destination (for departing passengers)
    {
        id: "Q3_B",
        text: "quelle est la destination de votre vol ? (Ville + pays) / What is the destination of your flight ?",
        type: 'freeText',
        freeTextPlaceholder: "Ex: Rome, Italie",
        next: "Q4",
        condition: { questionId: "Q0", value: 2 },
        fallbackNext: "Q4"
    },

    // 🏢 Q4. Airline
    {
        id: "Q4",
        text: "Avec quelle compagnie aérienne voyagez-vous ? / Which airline are you flying with ?",
        type: 'freeText',
        freeTextPlaceholder: "Ex: Air France, Ryanair...",
        next: "Q5"
    },

    // 👥 Q5. Travel Group Size
    {
        id: "Q5",
        text: "Combien de personnes voyagent avec vous (vous compris) ? / How many persons are traveling with you (including yourself) ?",
        type: 'singleChoice',
        options: [
            { id: 1, text: "Seul / Alone", next: "Q6" },
            { id: 2, text: "2 personnes / 2 persons", next: "Q6" },
            { id: 3, text: "3 personnes / 3 persons", next: "Q6" },
            { id: 4, text: "Plus / More", next: "Q5_PLUS" }
        ]
    },

    // 📝 Q5 Group Size Specification
    {
        id: "Q5_PLUS",
        text: "Précisez le nombre de personnes : / Please specify the number of persons :",
        type: 'freeText',
        validation: "numeric",
        freeTextPlaceholder: "Nombre de personnes",
        next: "Q6"
    },

    // 🎯 Q6. Travel Purpose
    {
        id: "Q6",
        text: "Quel est le motif principal de votre voyage ? / What is the main reason for your trip ?",
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
            { id: 1, text: "Vacances - Loisirs / Holidays - Leisure" },
            { id: 2, text: "Visite famille - amis / Family - Friends visit" },
            { id: 3, text: "Travail - affaires / Work - Business" },
            { id: 4, text: "Études / Studies" },
            { id: 5, text: "Autre / Other", next: "Q6_AUTRE" }
        ]
    },

    // 📝 Q6 Travel Purpose Other
    {
        id: "Q6_AUTRE",
        text: "Précisez le motif de votre voyage : / Please specify :",
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
        text: "Quel moyen de transport avez-vous utilisé pour venir à l'aéroport de Beauvais ? / What mode of transport did you use to get to Beauvais Airport ?",
        type: 'singleChoice',
        next: "Q8_A",
        condition: { questionId: "Q0", value: 2 },
        fallbackNext: "Q8_A",
        options: [
            { id: 1, text: "Voiture personnelle / Private car", next: "Q8_A" },
            { id: 2, text: "Covoiturage / Carpooling", next: "Q8_A" },
            { id: 3, text: "Taxi / VTC", next: "Q8_A" },
            { id: 4, text: "Train + Navette / Train + Shuttle", next: "Q8_A" },
            { id: 5, text: "Navette Beauvais–Paris / Beauvais–Paris Shuttle", next: "Q8_A" },
            { id: 6, text: "Autre précisez / Other please specify", next: "Q7_A_AUTRE" }
        ]
    },

    // 📝 Q7_A Other Transport to Airport 
    {
        id: "Q7_A_AUTRE",
        text: "Précisez le moyen de transport utilisé pour venir à l'aéroport : / Please specify :",
        type: 'freeText',
        freeTextPlaceholder: "Décrivez le moyen de transport...",
        next: "Q8_A",
        condition: { questionId: "Q0", value: 2 },
        fallbackNext: "Q8_A"
    },

    // 🚗 Q7_B. Transport from Airport (for arriving passengers)
    {
        id: "Q7_B",
        text: "Quel moyen de transport allez-vous utiliser en sortant de l'aéroport ? / What mode of transport will you use when leaving the airport ?",
        type: 'singleChoice',
        next: "Q8_B",
        condition: { questionId: "Q0", value: 1 },
        fallbackNext: "Q8_B",
        options: [
            { id: 1, text: "Voiture personnelle / Private car", next: "Q8_B" },
            { id: 2, text: "Covoiturage / Carpooling", next: "Q8_B" },
            { id: 3, text: "Taxi / VTC", next: "Q8_B" },
            { id: 4, text: "Train + Navette / Train + Shuttle", next: "Q8_B" },
            { id: 5, text: "Navette Beauvais–Paris / Beauvais–Paris Shuttle", next: "Q8_B" },
            { id: 6, text: "Autre / Other please specify", next: "Q7_B_AUTRE" }
        ]
    },

    // 📝 Q7_B Other Transport from Airport 
    {
        id: "Q7_B_AUTRE",
        text: "Précisez le moyen de transport que vous allez utiliser en sortant de l'aéroport : / Please specify :",
        type: 'freeText',
        freeTextPlaceholder: "Décrivez le moyen de transport...",
        next: "Q8_B",
        condition: { questionId: "Q0", value: 1 },
        fallbackNext: "Q8_B"
    },

    // 🔄 Q8_A. Same Transport for Return (for departing passengers)
    {
        id: "Q8_A",
        text: "Allez-vous utiliser le même moyen de transport pour le retour ? / Will you use the same mode of transport for your return journey ?",
        type: 'singleChoice',
        next: "Q9",  // Go to Q9 if navette was selected in Q7_A
        condition: { questionId: "Q0", value: 2 },
        fallbackNext: "Q9_a",  // Fallback if needed
        options: [
            { id: 1, text: "Oui / Yes", next: "Q9" },
            { id: 2, text: "Non / No", next: "Q8_A_AUTRE" }
        ]
    },

    // 📝 Q8_A Other Transport for Return
    {
        id: "Q8_A_AUTRE",
        text: "Précisez le moyen de transport que vous utiliserez pour le retour : / Please specify :",
        type: 'freeText',
        freeTextPlaceholder: "Décrivez le moyen de transport...",
        next: "Q9",  // Always go to Q9, but Q9 will be conditionally shown  
        condition: { questionId: "Q0", value: 2 },
        fallbackNext: "Q9_a"  // Fallback if needed
    },

    // 🔄 Q8_B. Same Transport for Arrival (for arriving passengers)
    {
        id: "Q8_B",
        text: "Aviez-vous utilisé le même moyen de transport pour venir à l'aéroport lors de votre vol aller ? / Did you use the same mode of transport to get to the airport for your outbound flight ?",
        type: 'singleChoice',
        next: "Q9",  // Always go to Q9, but Q9 will be conditionally shown
        condition: { questionId: "Q0", value: 1 },
        fallbackNext: "Q9_a",  // Fallback if needed
        options: [
            { id: 1, text: "Oui / Yes", next: "Q9" },
            { id: 2, text: "Non / No", next: "Q8_B_AUTRE" }
        ]
    },

    // 📝 Q8_B Other Transport for Arrival
    {
        id: "Q8_B_AUTRE",
        text: "Précisez le moyen de transport que vous aviez utilisé pour venir à l'aéroport : / Please specify :",
        type: 'freeText',
        freeTextPlaceholder: "Décrivez le moyen de transport...",
        next: "Q9",  // Always go to Q9, but Q9 will be conditionally shown  
        condition: { questionId: "Q0", value: 1 },
        fallbackNext: "Q9_a"  // Fallback if needed
    },

    // 🚌 Q9. Navette Choice Reason 
    {
        id: "Q9",
        text: "Pourquoi avez-vous choisi la navette Beauvais–Paris ? / Why did you choose the Beauvais–Paris Shuttle ?",
        type: 'singleChoice',
        next: "Q9_a",  // Default next
        condition: "Q7_A == 5 OR Q7_B == 5",  // Only show if navette was selected
        fallbackNext: "Q9_a",  // Non-navette users will go to Q9_a, which will be skipped but its conditional logic used
        options: [
            { id: 1, text: "Prix / Price", next: "Q9_a" },
            { id: 2, text: "Rapidité / Speed", next: "Q9_a" },
            { id: 3, text: "Facilité d'accès / Ease of access", next: "Q9_a" },
            { id: 4, text: "Pas d'alternative pratique / No practical alternative", next: "Q9_a" },
            { id: 5, text: "Autre / Other", next: "Q9_AUTRE" }
        ]
    },

    // 📝 Q9 Other Reason
    {
        id: "Q9_AUTRE",
        text: "Précisez pourquoi vous avez choisi la navette Beauvais–Paris : / Please specify :",
        type: 'freeText',
        freeTextPlaceholder: "Décrivez la raison...",
        next: "Q9_a",
        fallbackNext: "Q9_a"  // Consistent fallback
    },

    // ⭐ Q9_a. Navette Satisfaction Rating
    {
        id: "Q9_a",
        text: "Sur une échelle de 1 à 5, comment évaluez-vous la navette Beauvais–Paris ? (1 = pas du tout satisfait, 5 = très satisfait) / On a scale from 1 to 5, how would you rate the Beauvais–Paris Shuttle?",
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
            { id: 1, text: "Pas du tout satisfait / Not at all satisfied" },
            { id: 2, text: "Peu satisfait / Slightly satisfied" },
            { id: 3, text: "Moyennement satisfait / Moderately satisfied" },
            { id: 4, text: "Satisfait / Satisfied" },
            { id: 5, text: "Très satisfait / Very satisfied" }
        ]
    },



    // ✈️ Q10. Stay Location
    {
        id: "Q10",
        text: "Où avez-vous séjourné principalement ? / Where did you mainly stay ?",
        type: 'singleChoice',
        condition: "Q0 == 2 AND Q2 == 2",
        fallbackNext: "Q14",
        options: [
            { id: 1, text: "Beauvais", next: "Q11" },
            { id: 2, text: "Oise (hors Beauvais) / Oise (outside Beauvais)", next: "Q11" },
            { id: 3, text: "Hauts-de-France (hors Oise) / Hauts-de-France (outside Oise)", next: "Q11" },
            { id: 4, text: "Ile-de-France", next: "Q11" },
            { id: 5, text: "Autre / Other", next: "Q10_AUTRE" }
        ]
    },

    // 📝 Q10 Other Stay Location
    {
        id: "Q10_AUTRE",
        text: "Précisez où vous avez séjourné principalement : / Please specify :",
        type: 'commune',
        next: "Q11",
        condition: "Q0 == 2 AND Q2 == 2",
        fallbackNext: "Q14"
    },

    // 📅 Q11. Stay Duration
    {
        id: "Q11",
        text: "Combien de jours a duré votre séjour ? / How many days did your stay last ?",
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
        text: "Quel budget approximatif avez-vous consacré à ce séjour ? Total : / What was your approximate budget for this stay ?",
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
        text: "Dont environ : Billet d'avion / Of which: Airfare",
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
        text: "Transport pendant le séjour / Transport during the stay",
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
        text: "Hébergement / Accommodation",
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
        text: "Restauration / Food = Restaurant",
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
        text: "Loisirs / Leisure , Activities",
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
        text: "Avez-vous effectué des dépenses à l'aéroport (boutiques, restauration, parking, etc.) ? / Did you make any purchases at the airport (shops, restaurants, parking, etc.) ?",
        type: 'singleChoice',
        condition: "Q0 == 2 AND Q2 == 2",
        fallbackNext: "Q14",
        options: [
            { id: 1, text: "Oui / Yes", next: "Q13bis" },
            { id: 2, text: "Non / No", next: "Q14" }
        ]
    },

    // 💶 Q13bis. Airport Expense Amount
    {
        id: "Q13bis",
        text: "Si oui, environ quel montant ? / If yes, approximately how much ?",
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
        text: "Sexe : / Gender",
        type: 'singleChoice',
        next: "Q15",
        options: [
            { id: 1, text: "Homme / Male", next: "Q15" },
            { id: 2, text: "Femme / Female", next: "Q15" },
            { id: 3, text: "Autre / Other", next: "Q15" }
        ]
    },

    // 🌍 Q15. Nationality
    {
        id: "Q15",
        text: "Nationalité : / Nationality",
        type: 'freeText',
        freeTextPlaceholder: "Votre nationalité",
        next: "Q16"
    },
    // 🎂 Q16_A. Age Group
    {
        id: "Q16",
        text: "À quelle tranche d'âge appartenez-vous ? / What is your age group ?",
        type: 'singleChoice',
        next: "Q17",
        options: [
            { id: 1, text: "Moins de 18 ans / Under 18", next: "Q17" },
            { id: 2, text: "18–24 ans / 18–24", next: "Q17" },
            { id: 3, text: "25–34 ans / 25–34", next: "Q17" },
            { id: 4, text: "35–49 ans / 35–49", next: "Q17" },
            { id: 5, text: "50–64 ans / 50–64", next: "Q17" },
            { id: 6, text: "65 ans et plus / 65 and over", next: "Q17" }
        ]
    },

    // 👔 Q17. Socio-professional Category
    {
        id: "Q17",
        text: "Quelle est votre catégorie socio-professionnelle principale ? / What is your main occupational category ?",
        type: 'singleChoice',
        next: "Q18",
        options: [
            { id: 1, text: "Dirigeant d'entreprise - indépendant / Business owner - Self-employed", next: "Q18" },
            { id: 2, text: "Cadre supérieur, ingénieur, profession intellectuelle / Senior manager, engineer, professional", next: "Q18" },
            { id: 3, text: "Profession intermédiaire (technicien, enseignant, contremaître, etc.) / Intermediate occupation (technician, teacher, supervisor, etc.)", next: "Q18" },
            { id: 4, text: "Employé - ouvrier / Employee - Worker", next: "Q18" },
            { id: 5, text: "Profession libérale, artiste, expert / Liberal profession, artist, expert", next: "Q18" },
            { id: 6, text: "Étudiant / Student", next: "Q18" },
            { id: 7, text: "Retraité / Retired", next: "Q18" },
            { id: 8, text: "Sans activité / en recherche d'emploi / Unemployed", next: "Q18" },
            { id: 9, text: "Autre / Other", next: "Q17_AUTRE" }
        ]
    },

    // 📝 Q17 Other Socio-professional Category
    {
        id: "Q17_AUTRE",
        text: "Précisez votre catégorie socio-professionnelle : / Please specify :",
        type: 'freeText',
        freeTextPlaceholder: "Décrivez votre profession...",
        next: "Q18"
    },

    // 🏠 Q18. Main Residence
    {
        id: "Q18",
        text: "Quel est votre lieu de résidence principale ? / What is your main place of residence ?",
        type: 'commune',
        freeTextPlaceholder: "Votre ville et pays de résidence",
        next: "end"
    },
];
   