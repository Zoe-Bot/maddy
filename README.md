# Maddy - Feedback-Management-Tool für Vorlesungsfolien

Maddy ist ein Tool zur Erfassung und Verwaltung von Feedback zu Vorlesungsfolien. Es wurde im Rahmen einer Bachelorarbeit an der Hochschule der Medien Stuttgart entwickelt.

## Beschreibung

Das Tool ermöglicht es Studierenden, bei Vorlesungsfolien anzugeben, ob sie eine Folie verstanden haben, eine Frage zu einer Folie haben oder die Folie komplett nicht verstanden haben. Dozenten können neue Foliensätze hinzufügen und bearbeiten sowie Statistiken zum Verständnis der Studierenden einsehen.

## Installation

### Repository einrichten

1. Repository klonen:

```
git clone git@github.com:Zoe-Bot/maddy.git
```

2. Abhängigkeiten installieren:

```
npm install
```

3. .env Datei erstellen und Inhalt aus example.env kopieren und anpassen

### Datenbank einrichten

1. Vercel Projekt erstellen und verknüpfen
2. Vercel Postgres und Vercel Blob Store erstellen
3. Umgebungsvariablen von Vercel in .env kopieren

Weitere Informationen zur Einrichtung in der [Vercel Dokumentation](https://vercel.com/docs).

## Befehle

- Entwicklermodus starten:

```
npm run dev
```

- Projekt bauen:

```
npm run build
```

- Datenbankschema aktualisieren:

```
npm run db-update
```

- Prisma Studio öffnen:

```
npm run prisma-studio
```

## Technologien

- [Next.js](https://nextjs.org/) Framework
- [Material UI (MUI)](https://mui.com/) für UI Komponenten
- [Tailwind CSS](https://tailwindcss.com/) für CSS Utilities
- [React-PDF](https://github.com/wojtekmaj/react-pdf) für die Darstellung der PDF-Folien
- [PostgreSQL](https://www.postgresql.org/) Datenbank
- [Prisma](https://www.prisma.io/nextjs) als ORM
- [Vercel](https://vercel.com/) fürs Deployment
