# Deliverable D2 – Prototyping-Logbuch: GlobeFlow

## 1. Zentrale Designentscheidungen & Identität
**Konzept: "Bali Fintech" (Revolut meets Bali)**
Wir haben uns entschieden, GlobeFlow nicht als klassisches Reisebüro, sondern als hochmoderne **Fintech-Plattform** zu positionieren. Da unsere Zielgruppe (High-Net-Worth Individuals) Vermögenswerte in Millionenhöhe bewegt, muss das Design **Sicherheit, Kompetenz und Exklusivität** ausstrahlen.

*   **Farbpalette:** Tiefe Ozean-Blautöne (#1A3C45) für Vertrauen, kombiniert mit warmen Sand-Neutraltönen (#FDFBF7) für das indonesische Lebensgefühl.
*   **Stilelemente:** Subtile Batik-Hintergrundmuster und fließende Wasserlinien als "Glints" auf Karten, um die kulturelle Verbindung herzustellen, ohne "touristisch" zu wirken.
*   **Navigation:** Ein hybrides System aus Sidebar (Desktop) und Bottom-Nav (Mobile) sorgt für maximale Usability, wie man sie von Banking-Apps gewohnt ist.

## 2. Verworfene Alternativen
*   **Verworfen: Touristisches Design.** Ein Design mit vielen großflächigen Strandfotos und verspielten Schriftarten wurde abgelehnt, da es die Ernsthaftigkeit des Finanztransfers und der rechtlichen Einwanderung untergraben hätte.
*   **Verworfen: Klassisches Datenbank-CRUD Layout.** Ein rein funktionales "Listen-und-Formular"-System (wie viele Behörden-Tools) wurde verworfen, da der Prozess für den Nutzer emotional besetzt ist ("Ein neues Leben").
*   **Verworfen: Permanente Datenbank-Persistenz.** Wir haben uns gegen eine dauerhafte Speicherung (LocalStorage/Firebase) im Prototyp entschieden. Stattdessen setzt ein Browser-Refresh den Prozess zurück. Dies erlaubt es Testern, den Flow beliebig oft von vorn zu erleben, während die interne Navigation stabil bleibt.

## 3. Die User-Perspektive (Alexander Sterling)
Der Prototyp spiegelt die Reise von Alexander wider:
*   **Das "Command Center":** Gibt ihm sofort das Gefühl von Kontrolle über einen komplexen Prozess.
*   **Die Weltkarte:** Emotionalisiert den Umzug von Zürich nach Jakarta durch eine animierte Kurve – es ist kein Formular, sondern eine Reise.
*   **Der Asset Transfer:** Durch die digitale Unterschrift auf dem Canvas und die schrittweise Freischaltung (Review -> Transit -> Completed) wird ein hochsensibler Prozess transparent und greifbar gemacht.

## 4. Überprüfung der Erfolgskriterien
| Erfolgskriterium | Überprüfung im Prototyp |
| :--- | :--- |
| **Vertrauensaufbau** | Durch das Fintech-Design und die Power-of-Attorney-Signatur erfolgreich validiert. |
| **Prozessklarheit** | Die kombinierte Fortschrittsanzeige (Dokumente + Transfer) zeigt dem Nutzer jederzeit, wo er steht (Ziel: 100%). |
| **Mehrwert durch KI** | Die AI-Guidance im Dokumenten-Tresor demonstriert, wie komplexe bürokratische Hürden automatisiert erklärt werden können. |
| **Emotionale Bindung** | Die "Life in Indonesia" Sektion mit Housing-Search zeigt dem Nutzer bereits das Ziel seiner Reise. |

## 5. Technisches Log (Key Changes)
*   **Alignment-Fixes:** Umstellung auf vertikale Stacks für Partner-Sektionen zur Vermeidung von Überschneidungen.
*   **Interaktive Weltkarte:** Integration von SVG-Animationen für die Visualisierung der Flugroute.
*   **State-Management:** Implementierung eines In-Memory CaseContext, der Navigation überlebt, aber bei Refresh terminiert (für saubere Test-Iterationen).
*   **Signatur-Canvas:** Einbindung einer HTML5 Canvas-Komponente für digitale Vollmachten.
