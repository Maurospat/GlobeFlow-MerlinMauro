export type Language = 'en' | 'de';

export const translations = {
  en: {
    nav: {
      dashboard: 'Command Center',
      documents: 'Documents',
      transfer: 'Asset Transfer',
      costs: 'Total Costs',
      manager: 'Case Manager',
      admin: 'Admin Console'
    },
    common: {
      nextSteps: 'Next Best Actions',
      status: 'Status',
      progress: 'Overall Progress',
      upload: 'Upload',
      view: 'View',
      save: 'Save',
      back: 'Back',
      start: 'Start',
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      under_review: 'Under Review',
      not_started: 'Not Started',
      uploaded: 'Uploaded',
      close: 'Close',
      details: 'Details',
      search: 'Search',
      active: 'Active',
      delayed: 'Delayed',
      review: 'In Review',
      actions: 'Actions',
      login: 'Login',
      signup: 'Sign Up',
      logout: 'Logout',
      book: 'Book Consultation',
      select: 'Select',
      typeMessage: 'Type your message...',
      send: 'Send',
      viewMore: 'View more slots'
    },
    landing: {
      heroTitle: 'Your secure path to Indonesia.',
      heroSub: 'The premium financial immigration command center for high-net-worth individuals.',
      cta: 'Begin Your Journey',
      trust: 'Transparent Fees • Dedicated Manager • Secure Vault',
      experience: 'The GlobeFlow Experience',
      features: {
        command: { title: 'Command Center', desc: 'A centralized dashboard to monitor your entire immigration status in real-time.' },
        manager: { title: 'Dedicated Manager', desc: 'Direct access to your personal relocation expert with guaranteed response times.' },
        transfers: { title: 'Transparent Transfers', desc: 'Secure asset movement with real-time tracking and competitive FX rates.' }
      },
      successRate: '100% Success Rate',
      goldenVisa: 'For Golden Visa applicants in 2024'
    },
    dashboard: {
      welcome: 'Welcome back,',
      journeyProgress: 'Your Indonesia relocation journey is {progress}% complete.',
      stats: {
        docs: 'Documents',
        transfer: 'Transfer',
        costs: 'Total Costs',
        manager: 'Case Manager'
      },
      milestones: {
        identity: 'Identity',
        financials: 'Financials',
        visa: 'Visa Issuance'
      },
      nextStepAction: 'Upload Tax Residency Certificate',
      nextStepDesc: 'Needed for initial visa pre-approval.',
      nextStepTransfer: 'Initiate or complete your asset transfer.',
      nextStepFinished: 'All relocation steps are completed!',
      targets: 'Success Targets',
      accuracy: 'Document Accuracy',
      targetLabel: 'Target'
    },
    documents: {
      title: 'Document Vault',
      subtitle: 'Secure document storage for your residency application.',
      priority: 'Priority Checklist',
      completed: '{count} of {total} Completed',
      howTo: 'How to obtain:',
      aiGuide: 'AI Guidance',
      aiAnalyzing: 'Analyzing document requirements...',
      milestoneTitle: 'Pre-approval Milestone',
      milestoneDesc: 'You are close to your initial eligibility certificate. This will accelerate your process.',
      items: {
        passport: { title: 'Passport Copy', why: 'Required for identity verification and visa issuance.', how: 'Scan the biographical page of your valid passport.' },
        address: { title: 'Proof of Address', why: 'To verify your current place of residence.', how: 'A utility bill or bank statement from the last 3 months.' },
        tax: { title: 'Tax Residency Certificate', why: 'Determines your tax eligibility.', how: 'Apply via your local tax authority portal.' },
        bank: { title: 'Bank Statements (6 months)', why: 'Proof of financial standing.', how: 'Download as PDF from your online banking portal.' },
        funds: { title: 'Source of Funds', why: 'Anti-money laundering requirement.', how: 'Use the GlobeFlow template provided in the vault.' },
        visa: { title: 'Indonesian Visa Paperwork', why: 'Formal residency application.', how: 'Generated automatically after approval.' }
      }
    },
    transfer: {
      title: 'Asset Transfer',
      subtitle: 'Manage your capital transfer to Indonesian banking partners.',
      status: 'Transfer Status',
      eta: 'ETA: {days} Business Days',
      arrival: 'Exp. Arrival: {date}',
      sourceBank: 'Source Bank',
      setup: 'Transfer Setup',
      begin: 'Begin Secure Transfer',
      processing: 'Transfer In Progress',
      transparency: 'Cost Transparency',
      guarantee: 'GlobeFlow guarantees no hidden surprise fees.',
      midMarket: 'Mid-Market Rate',
      institution: 'Institution',
      amount: 'Amount',
      inTransit: 'In Transit'
    },
    costs: {
      title: 'Total Costs',
      subtitle: 'Total transparency on your immigration financial commitment.',
      estTotal: 'Estimated Total Cost',
      liveRate: 'Live Exchange Rate',
      payStatus: 'Payment Status',
      breakdown: 'Detailed Breakdown',
      description: 'Description',
      amount: 'Amount (USD)',
      drivers: 'What drives cost?',
      driversText: 'Our fees are structured for maximum clarity. GlobeFlow leverages institutional bank rates to save you money.',
      quote: 'Need a custom quote?',
      quoteSub: 'For transfers above $1M, contact us.',
      totalCommit: 'Total Commitment',
      items: {
        transfer: 'Transfer Fee',
        transferDesc: 'Bank to Bank wiring costs',
        fx: 'FX Conversion',
        fxDesc: 'Based on 0.15% margin on mid-market',
        visa: 'Visa Processing',
        visaDesc: 'Government fees & administration',
        consult: 'Consultancy',
        consultDesc: 'Personal case manager fee (6 months)',
        vault: 'Secure Vaulting',
        vaultDesc: 'Digital document storage & security'
      }
    },
    manager: {
      title: 'Case Manager',
      subtitle: 'Your dedicated relocation expert.',
      specialist: 'Senior Relocation Manager',
      certified: 'Certified Immigration Specialist',
      responseSLA: 'Response SLA',
      book: 'Book Consultation',
      messages: 'Secure Messages',
      faq: 'Frequently Asked Questions',
      profileSub: 'Reserve a dedicated strategy session.',
      slots: {
        tomorrow10: 'Tomorrow, 10:00 AM',
        tomorrow2: 'Tomorrow, 2:30 PM'
      },
      chat: {
        m1: "Hello Alexander! I've reviewed your Passport copy. Everything looks perfect.",
        u1: "Thanks, Sarah. When should I expect the tax review to finish?",
        m2: "Our tax team is finalizing it now. Expect an update by tomorrow morning."
      },
      faqs: [
        { q: "How long does the visa take?", a: "Typically 4-6 weeks after document submission." },
        { q: "Can I transfer multiple currencies?", a: "Yes, we support all major G10 currencies." },
        { q: "Is my data secure?", a: "We use bank-grade AES-256 encryption." }
      ]
    },
    admin: {
      title: 'Admin Console',
      subtitle: 'Management oversight for all immigration cases.',
      sync: 'Sync CRM',
      logs: 'System Logs',
      activeCases: 'Active Cases',
      pending: 'Pending Reviews',
      aum: 'Total AUM Transfers',
      management: 'Case Management',
      compliance: 'Compliance Alert',
      applicant: 'Applicant',
      progress: 'Progress',
      manager: 'Manager',
      caseId: 'Case ID',
      complianceText: 'New Indonesian FATCA reporting requirements are effective next month. Please ensure all "Proof of Funds" documents include the additional declaration.'
    }
  },
  de: {
    nav: {
      dashboard: 'Kommandozentrale',
      documents: 'Dokumente',
      transfer: 'Kapitaltransfer',
      costs: 'Gesamtkosten',
      manager: 'Fallmanager',
      admin: 'Admin-Bereich'
    },
    common: {
      nextSteps: 'Nächste Schritte',
      status: 'Status',
      progress: 'Gesamtfortschritt',
      upload: 'Hochladen',
      view: 'Ansehen',
      save: 'Speichern',
      back: 'Zurück',
      start: 'Starten',
      pending: 'Ausstehend',
      approved: 'Genehmigt',
      rejected: 'Abgelehnt',
      under_review: 'Wird geprüft',
      not_started: 'Nicht gestartet',
      uploaded: 'Hochgeladen',
      close: 'Schließen',
      details: 'Details',
      search: 'Suchen',
      active: 'Aktiv',
      delayed: 'Verzögert',
      review: 'In Prüfung',
      actions: 'Aktionen',
      login: 'Anmelden',
      signup: 'Registrieren',
      logout: 'Abmelden',
      book: 'Beratung buchen',
      select: 'Auswählen',
      typeMessage: 'Nachricht eingeben...',
      send: 'Senden',
      viewMore: 'Weitere Termine'
    },
    landing: {
      heroTitle: 'Ihr sicherer Weg nach Indonesien.',
      heroSub: 'Die Premium-Finanz-Einwanderungszentrale für vermögende Privatpersonen.',
      cta: 'Reise beginnen',
      trust: 'Transparente Gebühren • Eigener Manager • Sicherer Tresor',
      experience: 'Das GlobeFlow Erlebnis',
      features: {
        command: { title: 'Kommandozentrale', desc: 'Ein zentrales Dashboard zur Echtzeit-Überwachung Ihres gesamten Einwanderungsstatus.' },
        manager: { title: 'Eigener Berater', desc: 'Direkter Zugang zu Ihrem persönlichen Experten mit garantierten Antwortzeiten.' },
        transfers: { title: 'Transparente Transfers', desc: 'Sichere Vermögensbewegung mit Echtzeit-Tracking und wettbewerbsfähigen Kursen.' }
      },
      successRate: '100% Erfolgsquote',
      goldenVisa: 'Für Golden Visa Antragsteller im Jahr 2024'
    },
    dashboard: {
      welcome: 'Willkommen zurück,',
      journeyProgress: 'Ihre Indonesien-Einwanderung ist zu {progress}% abgeschlossen.',
      stats: {
        docs: 'Dokumente',
        transfer: 'Transfer',
        costs: 'Gesamtkosten',
        manager: 'Berater'
      },
      milestones: {
        identity: 'Identität',
        financials: 'Finanzen',
        visa: 'Visumerteilung'
      },
      nextStepAction: 'Steuersitzbescheinigung hochladen',
      nextStepDesc: 'Wichtig für die erste Visum-Vorabgenehmigung.',
      nextStepTransfer: 'Kapitaltransfer einleiten oder abschließen.',
      nextStepFinished: 'Alle Schritte für Ihren Umzug sind abgeschlossen!',
      targets: 'Erfolgsziele',
      accuracy: 'Dokumentengenauigkeit',
      targetLabel: 'Ziel'
    },
    documents: {
      title: 'Dokumenten-Tresor',
      subtitle: 'Sicherer Speicher für Ihren Aufenthaltsantrag.',
      priority: 'Prioritäts-Checkliste',
      completed: '{count} von {total} abgeschlossen',
      howTo: 'So erhalten Sie es:',
      aiGuide: 'KI-Anleitung',
      aiAnalyzing: 'Anforderungen werden analysiert...',
      milestoneTitle: 'Vorabgenehmigungs-Meilenstein',
      milestoneDesc: 'Sie sind kurz vor Ihrem Berechtigungszertifikat. Dies beschleunigt den Prozess.',
      items: {
        passport: { title: 'Reisepass-Kopie', why: 'Erforderlich für Identitätsprüfung und Visumerteilung.', how: 'Scannen Sie die Seite mit Ihren persönlichen Daten.' },
        address: { title: 'Adressnachweis', why: 'Zur Überprüfung Ihres aktuellen Wohnsitzes.', how: 'Eine Rechnung oder ein Kontoauszug (max. 3 Monate alt).' },
        tax: { title: 'Steuersitzbescheinigung', why: 'Bestimmt Ihre steuerliche Berechtigung.', how: 'Beantragen Sie dies über Ihr Finanzamtsportal.' },
        bank: { title: 'Kontoauszüge (6 Monate)', why: 'Nachweis der finanziellen Leistungsfähigkeit.', how: 'Als PDF von Ihrem Online-Banking herunterladen.' },
        funds: { title: 'Mittelherkunftsnachweis', why: 'Geldwäschepräventions-Vorschrift.', how: 'Nutzen Sie die GlobeFlow-Vorlage aus dem Tresor.' },
        visa: { title: 'Indonesische Visa-Unterlagen', why: 'Formeller Aufenthaltsantrag.', how: 'Wird nach der Genehmigung automatisch erstellt.' }
      }
    },
    transfer: {
      title: 'Kapitaltransfer',
      subtitle: 'Verwalten Sie Ihren Kapitaltransfer zu indonesischen Bankpartnern.',
      status: 'Transferstatus',
      eta: 'ETA: {days} Werktage',
      arrival: 'Erwartete Ankunft: {date}',
      sourceBank: 'Quellbank',
      setup: 'Transfer-Einrichtung',
      begin: 'Sicheren Transfer starten',
      processing: 'Transfer läuft...',
      transparency: 'Kostentransparenz',
      guarantee: 'GlobeFlow garantiert keine versteckten Gebühren.',
      midMarket: 'Marktkurs',
      institution: 'Institut',
      amount: 'Betrag',
      inTransit: 'Unterwegs'
    },
    costs: {
      title: 'Gesamtkosten',
      subtitle: 'Vollständige Transparenz über Ihre finanzielle Verpflichtung.',
      estTotal: 'Geschätzte Gesamtkosten',
      liveRate: 'Live-Wechselkurs',
      payStatus: 'Zahlungsstatus',
      breakdown: 'Detaillierte Aufschlüsselung',
      description: 'Beschreibung',
      amount: 'Betrag (USD)',
      drivers: 'Was beeinflusst die Kosten?',
      driversText: 'Unsere Gebühren sind klar strukturiert. GlobeFlow nutzt institutionelle Bankkurse, um Ihnen Geld zu sparen.',
      quote: 'Individuelles Angebot?',
      quoteSub: 'Kontaktieren Sie uns für Transfers über 1 Mio. $.',
      totalCommit: 'Gesamtverpflichtung',
      items: {
        transfer: 'Überweisungsgebühr',
        transferDesc: 'Bank-zu-Bank Transferkosten',
        fx: 'Währungsumrechnung',
        fxDesc: 'Basierend auf 0,15% Marge auf Marktkurs',
        visa: 'Visumbearbeitung',
        visaDesc: 'Behördengebühren & Verwaltung',
        consult: 'Beratung',
        consultDesc: 'Beratergebühr (6 Monate)',
        vault: 'Sicherer Tresor',
        vaultDesc: 'Digitaler Speicher & Sicherheit'
      }
    },
    manager: {
      title: 'Fallmanager',
      subtitle: 'Ihr persönlicher Relocation-Experte.',
      specialist: 'Senior Relocation Manager',
      certified: 'Zertifizierter Einwanderungsspezialist',
      responseSLA: 'Reaktionszeit (SLA)',
      book: 'Beratung buchen',
      messages: 'Sichere Nachrichten',
      faq: 'Häufig gestellte Fragen',
      profileSub: 'Reservieren Sie eine Strategie-Sitzung.',
      slots: {
        tomorrow10: 'Morgen, 10:00 Uhr',
        tomorrow2: 'Morgen, 14:30 Uhr'
      },
      chat: {
        m1: "Hallo Alexander! Ich habe Ihre Passkopie geprüft. Alles sieht perfekt aus.",
        u1: "Danke, Sarah. Wann ist die Prüfung der Steuersitzbescheinigung fertig?",
        m2: "Unser Steuerteam schließt dies gerade ab. Erwarten Sie ein Update morgen früh."
      },
      faqs: [
        { q: "Wie lange dauert das Visum?", a: "Normalerweise 4-6 Wochen nach Einreichung." },
        { q: "Mehrere Währungen möglich?", a: "Ja, wir unterstützen alle G10-Währungen." },
        { q: "Sind meine Daten sicher?", a: "Wir nutzen Bankenstandard AES-256 Verschlüsselung." }
      ]
    },
    admin: {
      title: 'Admin-Bereich',
      subtitle: 'Management-Übersicht für alle Fälle.',
      sync: 'CRM Abgleich',
      logs: 'Systemprotokolle',
      activeCases: 'Aktive Fälle',
      pending: 'Prüfungen ausstehend',
      aum: 'Gesamt-Kapitaltransfer',
      management: 'Fallverwaltung',
      compliance: 'Compliance Hinweis',
      applicant: 'Antragsteller',
      progress: 'Fortschritt',
      manager: 'Berater',
      caseId: 'Fall ID',
      complianceText: 'Neue FATCA-Berichtspflichten treten nächsten Monat in Kraft. Bitte stellen Sie sicher, dass alle Mittelherkunftsnachweise die Zusatzerklärung enthalten.'
    }
  }
};
