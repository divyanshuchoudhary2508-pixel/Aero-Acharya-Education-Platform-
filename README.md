# Aero Acharya

A zero-backend static learning website. Every file needed for deployment is inside this folder.

## Current modules

1. Air Is a Fluid
2. Drag Hunter
3. Lift & Downforce
4. Airfoil Mastery
5. Front Wing Engineer
6. Rear Wing Master
7. Venturi Theory
8. Diffusers & Floors
9. Aero Balance
10. Cooling & Packaging

## Local preview

From this folder, run:

```bash
python -m http.server 4173
```

Then open `http://localhost:4173`.

## Netlify

Drag this entire `Aero Acharya` folder into Netlify Drop, or connect it as the publish directory. No build command is required.

The 3D viewer loads the open-source Google `<model-viewer>` component from a CDN. Models are stored locally and credited on the lesson pages where they appear. Heavy models are click-to-load so the lessons stay fast on mobile.
