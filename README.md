# DontGoBroke – ProbeIPA (Frontend)

Webbasierte Ausgabenverwaltungs‑Applikation (SPA) zur manuellen Erfassung von Ausgaben und Auswertung nach Zeitperioden und Kategorien.

## Features (aktueller Stand)
- **CRUD Ausgaben**: Erstellen / Bearbeiten / Löschen von Ausgaben (JSON‑Server Persistenz)
- **Dashboard**: Gesamtsumme für gewählte Zeitperiode (Tag/Woche/Monat/Jahr)
- **Kategorien‑Auswertung**: Pie‑Chart (Chart.js via ng2‑charts)
- **Routing**: Navigation u.a. zu `dashboard` und `alltransactions`

## Nicht umgesetzt / bekanntes (Simulation)
- Authentifizierung (Login/Logout/Guards), Filter/Sortierung in Alltransactions, Formular‑Validierungen
- Toast‑Meldungen, Responsive Design, automatisierte Tests (Unit/Integration)

## Tech Stack / Tools
- **Angular 21** (TypeScript), **Angular Material**
- **RxJS** + Angular **Signals** (`toSignal`, `computed`) für reaktive UI‑Updates
- **ng2-charts** + **chart.js** für Charts
- **date-fns** für Datums-/Periodenlogik
- **json-server** als Mock‑Backend (`db.json`)
- **Node.js + npm**, **Git**, **Chrome**

## Projekt starten (lokal)

### 1) Mock‑Backend starten (JSON‑Server)
Im Projekt‑Root:

```bash
cd json-server
json-server --watch db.json --port 3000
```

API Basis‑URL: `http://localhost:3000`

### 2) Frontend starten (Angular)
Im Frontend‑Ordner:

```bash
cd dontgobroke-frontend
npm install
ng serve
```

App: `http://localhost:4200/`

## Verzeichnisstruktur (Auszug)
- `src/app/`
  - `dashboard/` – Dashboard View (Summe/Zeiträume, Chart Einbindung)
  - `expenseform/` – Dialog/Form für Erstellen/Bearbeiten
  - `expense-chart/` – Chart‑Komponente (Pie‑Chart)
  - `alltransactions/` – View für Gesamtübersicht (geplant/teilweise)
  - `login/` – View‑Grundstruktur (Auth nicht implementiert)
  - `app.routes.ts` – Routing Definition
- `src/services/`
  - `expense-form-service.ts` – CRUD / HTTP / Refresh‑Trigger
  - `dashboard-service.ts` – Aggregationen (Summen, Gruppierung nach Kategorien)
  - `category-service.ts` – Kategorie‑Hilfsdaten
- `src/models/`
  - `expense-dto.ts` – DTOs für Expense

## Mini API‑Spezifikation (json-server)

### Resource: `expenses`
- **GET** `/expenses` → Liste aller Ausgaben
- **POST** `/expenses` → Neue Ausgabe erstellen
- **PUT** `/expenses/{id}` → Ausgabe aktualisieren (ID im Pfad)
- **DELETE** `/expenses/{id}` → Ausgabe löschen

**Beispiel (Expense)**

```json
{
  "id": "6",
  "userId": 0,
  "title": "Expense eins",
  "amount": 89.5,
  "category": "Unterhaltung",
  "date": "2025-11-19T23:00:00.000Z",
  "description": "Neuer controller",
  "createdAt": "2025-12-22T09:54:32.037Z"
}
```

### Resource: `categories`
- **GET** `/categories` → Liste der Kategorien (Name + Farbe)

## State‑Management / Datenfluss (Kurz)
- `ExpenseFormService` hält einen **Refresh‑Trigger** (`Subject<void>`).
- `getExpenses()` nutzt `switchMap` auf **HTTP GET** und wird über `toSignal(...)` als **Signal** der UI zur Verfügung gestellt.
- Nach **POST/PUT/DELETE** wird `refresh()` aufgerufen, wodurch die Liste neu geladen wird.
- `DashboardService` nutzt `computed(...)` auf der Expense‑Liste, um Summen/Chart‑Daten abzuleiten.

## Scripts
- `npm start` → Dev Server
- `npm run build` → Production Build
- `npm test` → Unit Test Runner (vorhanden, aber Testabdeckung aktuell nicht aufgebaut)
