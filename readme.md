# LandTrust — সহজ ভূমিসেবা

A Bengali-first, frontend-only prototype for the LandTech 2026 Digital Land Records, Verification & Digitization track.

- **Primary problem:** P4 — Smart e-Mutation & Registry
- **Supporting problem:** P2 — Verify Deeds & Ownership
- **Status:** Prototype only; synthetic data; no backend or government integration.

## What it demonstrates

- Bengali-first landing page designed for citizens with limited digital literacy.
- Smart Land Journey for purchase, inheritance, gift/heba, and court/auction scenarios.
- Four-step mutation guidance with a document checklist and missing-information checks.
- Ownership-transfer roadmap and an illustrative cost estimator.
- Sample deed lookup, QR-flow demonstration, and browser-side SHA-256 file-integrity checking.
- Sample mutation case tracker with a five-step timeline.
- Land Record Consistency Checker comparing synthetic deed/khatian/plot/land-area fields.
- Printable Land Transaction Risk Passport.
- Bengali FAQ, land-terms dictionary, font-size control, and optional browser text-to-speech.

## Tech stack

- Vite
- React
- JavaScript (not TypeScript)
- React Router
- Tailwind CSS
- shadcn/ui-style reusable components (as present in the project)
- Lucide React icons
- Web Crypto API  for client-side SHA-256
- Web Speech API for optional text-to-speech
- Local JavaScript mock data; no backend/database/API/authentication

## Requirements

- Node.js (LTS recommended)
- npm
## Links

- Public repository:https://github.com/mhrudro7/landtrust-landtech-2026
- Demo video (90 seconds maximum):https://drive.google.com/file/d/1YSrzouJXPYi-ETVGTtmGcmI_4ua14sQE/view
- Live demo:https://landtrust-landtech-2026.vercel.app/

## Suggested demo path

1. Open the Bengali landing page.
2. Select “আমি জমি কিনেছি” in Smart Land Journey.
3. Show the mutation checklist and missing-information warning.
4. Run a synthetic deed/record comparison.
5. Demonstrate SHA-256 integrity checking with a sample file.
6. Open a sample case tracker and the printable Risk Passport.
7. End on the disclaimer: synthetic data only; no official government integration.

## Run locally

1. Clone the public repository:

   ```bash
   git clone <YOUR_PUBLIC_GITHUB_REPOSITORY_URL>
   cd <REPOSITORY_FOLDER>
   ```

2. Install dependencies:

   ```bash
   cd frontend
   npm install
   ```

   If the repository root is already the `frontend` folder, do not run `cd frontend`.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local URL printed by Vite, usually `http://localhost:5173`.

5. Create a production build:

   ```bash
   npm run build
   ```

   Preview the production build locally:

   ```bash
   npm run preview
   ```

Check `package.json` for the exact available scripts.

## Data used

This prototype uses synthetic/mock data stored in local JavaScript files, including sample deed metadata, khatian/plot fields, mutation case IDs, case timelines, and illustrative risk passport examples. These are not actual government records. Do not add real citizens' names, NIDs, phone numbers, or private land records.

## AI tools used

The team reports using **Google Antigravity IDE with Gemini** to assist development. Add any other AI tools actually used. The team is responsible for reviewing and testing generated code and must be able to explain the implementation.

## Important limitations

- No login, backend, database, or live government API.
- No actual mutation application is submitted, and no official case status is retrieved.
- QR code and registry lookup flows are demonstrations using sample data.
- A SHA-256 hash only checks file integrity against a reference hash. It does not prove government issuance, legal validity, or current ownership.
- “Match,” “mismatch,” risk percentages, case IDs, SMS logs, fees, and sample statuses are demo content. They must not be treated as official results. Verify all fee amounts and legal guidance against current official sources before any real-world use.
- A record mismatch is not, by itself, proof of fraud. It indicates that further checking may be needed.
- The prototype is not an official government service and does not provide legal advice.

## Team and mentors

- Student 1: Mahtab Hasan
- Student 2: Ataher Islam
- Faculty Mentor: MD.Ashraful Islam Talukder
- Industry Mentor: MD. Tahamid Hassan Sadib


