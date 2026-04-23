# The Project Constitution (gemini.md)

## Data Schemas
```json
{
  "Appointment": {
    "id": "UUID",
    "patient_name": "STRING",
    "patient_email": "STRING",
    "patient_phone": "STRING",
    "service": "STRING",
    "appointment_date": "DATE",
    "appointment_time": "TIME",
    "message": "TEXT (optional)",
    "status": "ENUM ('pending', 'confirmed', 'completed', 'cancelled')",
    "created_at": "TIMESTAMP"
  }
}
```

## Behavioral Rules
- **Protocol Adherence**: Strict adherence to the B.L.A.S.T. framework.
- **Execution Halt**: No scripts or components will be built until the Discovery Session is complete, the JSON Data Schema is defined here, and the Task Plan blueprint is approved.
- **Reliability First**: Always prioritize deterministic logic and reliability over speed. Refer to this document as the Source of Truth when bugs occur.
- **Aesthetic Standard**: "Unicorn" design principles apply. High-end UI/UX, no "boring white walls," premium transitions, and consistent design systems.

## Architectural Invariants
- **Logic Separation**: Frontend UI components must be separated from backend/server-side logic and APIs.
- **Self-Healing / Deterministic Execution**: System must have a defined path to retry or report failures.
- **Data-First**: Coding begins *only* after the Payload shape is confirmed.
- **Design Philosophy**: Mobile-first, Glassmorphism aesthetics, Deterministic scheduling.
- **Visual Palette**: Dark-mode-first (#0F172A), Vibrant Violets (#8B5CF6), Mesh Gradients.
