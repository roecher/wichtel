PRP: “Azure Static Wichtel App”

Goal

Create a small, modern, cool-looking Wichtel (Secret Santa) web app that can be hosted on Azure Static Web Apps.
The solution should:
	•	Use a static frontend (React + Vite preferred, or plain TypeScript/JS).
	•	Use no runtime server state; assignments are generated offline and provided via a static JSON file.
	•	Allow each participant to open a personal link that reveals their drawn Wichtel (recipient).

⸻

Functional Requirements
	1.	Participants configuration
	•	Participants are defined in a local wichtel.json during development.
	•	Example structure:

    [
  { "name": "Mario",    "contact": "mario@roecher.de",    "contactType": "email",    "id": "mario" },
  { "name": "Bettina",  "contact": "bettina@roecher.de",  "contactType": "email",    "id": "bettina" },
  { "name": "Lina",     "contact": "lina@roecher.de",     "contactType": "email",    "id": "lina" },
  { "name": "Stefanie", "contact": null,                  "contactType": "whatsapp", "id": "stefanie" },
  { "name": "Florian",  "contact": null,                  "contactType": "whatsapp", "id": "florian" },
  { "name": "Sigrid",   "contact": null,                  "contactType": "whatsapp", "id": "sigrid" },
  { "name": "Marvin",   "contact": "marvin@roecher.de",   "contactType": "email",    "id": "marvin" }
]

	2.	Assignment generation (offline tool)
	•	Implement a small tool (preferred: .NET 8 console app or node script) AssignmentGenerator.
	•	It should:
	•	Load wichtel.json.
	•	Generate a Secret Santa derangement:
	•	Every participant is assigned exactly one different participant.
	•	No one is assigned to themselves.
	•	Generate a random, unguessable token per participant (GUID or similar).
	•	Produce an assignments.json file with structure:

{
  "assignments": [
    {
      "token": "<unguessable-token>",
      "giverId": "<id-of-participant-from-wichtel.json>",
      "receiverName": "<name-of-assigned-person>"
    }
  ]
}

	Do not include emails, WhatsApp numbers, or other personal contact data in assignments.json.

	3.	Frontend routing
	•	Build a SPA with client-side routing (React Router or similar).
	•	Routes:
	•	/ – Simple landing page:
	•	Title: “Wichteln 2025”
	•	Text: something like “You should have received a personal link. Open it to discover who you’re gifting!”
	•	/wichtel/:token – Secret Santa reveal page:
	•	Reads :token from URL.
	•	Loads assignments.json (static file in /data/assignments.json or similar path).
	•	Looks up the assignment by token.
	•	If found:
	•	Show the drawn receiver name in a prominent, stylish card.
	•	Example text:
	•	“Ho ho ho! 🎅”
	•	“You are the Wichtel for:  🎁”
	•	If not found:
	•	Show a friendly error:
	•	“This link is not valid. Please check with the organizer.”
	4.	Reveal interaction
	•	On /wichtel/:token, the user should see a “Reveal” button or similar interaction:
	•	Initial state:
	•	Card text: “Click below to reveal your Wichtel!”
	•	Button: “Reveal”
	•	After click:
	•	Animate and show the receiver name.
	•	The receiver name must not be visible in the DOM before clicking (for fun), but security-wise it’s okay if it’s downloadable in JSON.
	5.	Config for deployment
	•	Provide a configuration / documentation section for Azure Static Web Apps, including:
	•	How to structure the final app folder (e.g., dist).
	•	Example staticwebapp.config.json or similar to ensure SPA routing:
	•	All routes should fall back to index.html for client-side routing.
	•	Where to place assignments.json (e.g., public/data/assignments.json).

⸻

Non-Functional Requirements
	1.	Tech stack
	•	Frontend:
	•	React + TypeScript
	•	Vite as bundler (preferred)
	•	CSS:
	•	Tailwind CSS or a simple custom CSS with modern look.
	•	AssignmentGenerator:
	•	Option A (preferred): .NET 8 console app (C#) that:
	•	Reads wichtel.json
	•	Uses a derangement algorithm
	•	Outputs assignments.json
	•	Option B (alternative): Node.js script.
	2.	Security & privacy
	•	Tokens must be unguessable (e.g., random GUID).
	•	assignments.json:
	•	Must not contain contact details (email/WhatsApp).
	•	Must only contain: token, giverId, receiverName.
	•	No authentication is needed; it’s a family Wichteln scenario.
	•	Do not log secrets or personal data in the browser console.
	3.	Performance
	•	App must be light and fast:
	•	Minimize bundle size.
	•	Only one static JSON fetch (assignments.json) per page load.
	•	Should work smoothly on mobile (responsive layout).
	4.	Design / UX
	•	Make it visually appealing, “Christmas/Wichteln” themed, but not kitschy:
	•	Use a gradient background or subtle pattern.
	•	Centered glassmorphism-like card with rounded corners and shadow.
	•	Use emojis 🎄🎁❄️ as small accents.
	•	Responsive:
	•	Works well on mobile (phone vertical).
	•	Works on desktop.
	5.	Code quality
	•	Use TypeScript types for:
	•	Participant
	•	Assignment
	•	Organize React components cleanly:
	•	App.tsx
	•	pages/Home.tsx
	•	pages/WichtelReveal.tsx
	•	components/WichtelCard.tsx
	•	Provide a short README.md with:
	•	How to run locally.
	•	How to run the AssignmentGenerator.
	•	How to build & deploy to Azure Static Web Apps.

⸻

Deliverables
	1.	Frontend project (React + Vite + TS)
	2.	AssignmentGenerator:
	•	.NET 8 console app (C#) or Node script
	•	Includes derangement algorithm and generation of assignments.json
	3.	wichtel.json sample file with the given participants.
	4.	assignments.json sample output (for testing).
	5.	README.md with:
	•	Local run instructions
	•	Assignment generation steps
	•	Build & deploy steps for Azure Static Web Apps
	•	Example of personal Wichtel link.
