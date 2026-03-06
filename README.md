# GlobeFlow – Immigration Command Center

**GlobeFlow** ist eine hochmoderne Fintech-Plattform, die speziell für vermögende Privatpersonen (High-Net-Worth Individuals) entwickelt wurde, um den Einwanderungsprozess nach Indonesien (z. B. via Golden Visa) sicher, transparent und exklusiv zu gestalten.

Das Design folgt dem Konzept **"Bali Fintech"**: Eine Kombination aus professioneller Revolut-Ästhetik (Sicherheit, Kompetenz) und indonesischem Lebensgefühl (warme Sandtöne, subtile Batik-Muster).

---

## 🚀 Zentrale Funktionen

### 1. Command Center (Dashboard)
Ein zentraler Überblick über den gesamten Relocation-Prozess. Fortschrittsbalken, Meilensteine und die Visualisierung der Flugroute (Zürich -> Jakarta) geben dem Nutzer jederzeit volle Kontrolle.

### 2. Document Vault (KI-gestützt)
Ein sicherer Ort für alle benötigten Dokumente. 
- **AI Guidance**: Integrierter Genkit-Flow, der personalisierte Anweisungen gibt, wie und wo spezifische Dokumente (z. B. Steuersitzbescheinigungen) im Heimatland zu beschaffen sind.
- **Milestone-Tracking**: Schaltet Folgeschritte wie den Kapitaltransfer erst bei Erreichen einer Mindestanzahl an Dokumenten frei.

### 3. Guided Asset Transfer
Ein hochsensibler, dreistufiger Prozess zur Überführung von Kapital:
- **Schritt 1**: Erfassung der Bankdaten und des Transferumfangs.
- **Schritt 2**: Digitale Unterzeichnung einer Vollmacht (Power of Attorney) auf einem HTML5-Canvas.
- **Schritt 3**: Finaler Abschluss mit Echtzeit-Wechselkursen und Transparenz-Garantie.

### 4. Case Manager Chat (Sarah Hamilton)
Direkter Draht zum persönlichen Experten.
- **KI-Berater**: Nutzt Genkit und Gemini, um professionelle, beruhigende und kompetente Antworten auf Deutsch oder Englisch zu geben.

### 5. Life in Indonesia & Housing
- **Expat-Guide**: Vergleich der Lebenshaltungskosten (CH vs. ID), Städte-Guides und Lifestyle-Tipps.
- **Premium Housing**: Ein verifiziertes Immobilienportal für Luxusvillen und Penthouses in Jakarta, Bali und Surabaya.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Komponenten**: [ShadCN UI](https://ui.shadcn.com/) (Radix Primitives)
- **KI-Integration**: [Firebase Genkit](https://firebase.google.com/docs/genkit) mit Google AI (Gemini 2.5 Flash)
- **Daten & State**: 
  - `CaseContext`: In-Memory State-Management für den Prototyp (Reset bei Browser-Refresh).
  - `LanguageContext`: Unterstützung für Englisch und Deutsch.

---

## ⚙️ Installation & Setup

1. **Abhängigkeiten installieren**:
   ```bash
   npm install
   ```

2. **Umgebungsvariablen**:
   Erstellen Sie eine `.env` Datei im Root-Verzeichnis (Vorlage siehe `.env.example` oder bestehende `.env`) und fügen Sie Ihren API-Key hinzu:
   ```env
   GEMINI_API_KEY=Ihr_Google_AI_Key
   ```

3. **Entwicklungsserver starten**:
   ```bash
   npm run dev
   ```
   Die App ist nun unter `http://localhost:9002` erreichbar.

---

## 📖 Nutzung des Prototyps

Der Prototyp ist so konzipiert, dass er die Reise von **Alexander Sterling** (unserer Persona) widerspiegelt:

1. **Startseite**: Beginnen Sie die Reise und landen Sie im Dashboard.
2. **Dokumente**: Laden Sie beispielhaft Dokumente hoch. Ab 3 Dokumenten wird der Meilenstein erreicht und der Button zum Kapitaltransfer erscheint.
3. **Transfer**: Folgen Sie dem geführten 3-Stufen-Flow. Unterschreiben Sie die Vollmacht digital.
4. **Dashboard**: Kehren Sie zurück und sehen Sie den Fortschritt von 100%. Entdecken Sie nun optional das "Leben in Indonesien".
5. **Sprachwechsel**: Nutzen Sie den Toggle in der Sidebar, um zwischen Deutsch und Englisch zu wechseln.

---

## 📄 Lizenz
© 2024 GlobeFlow Relocation Services. Lizenziert durch das indonesische Ministerium für Recht und Menschenrechte (Simulation).