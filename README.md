# Auth0 ACUL React Boilerplate

This repository contains a boilerplate application for building custom login screens using Auth0's Advanced Customizations for Universal Login (ACUL) with React, TypeScript, and Vite. This project is designed to be bundled and served by Auth0 as part of your Universal Login experience.

## Project Structure

The key parts of this project include:

* `src/`: Your application's source code.
  * `src/main.tsx`: The main entry point for the React application, responsible for mounting the app.
  * `src/App.tsx`: Acts as a router to dynamically load and render different login/signup screens based on Auth0's context.
  * `src/screens/`: Contains individual screen implementations (e.g., `login-id/index.tsx`, `login-password/index.tsx`).
  * `src/components/ui/`: Custom UI components (like `Input`, `Button`, `Label`, `Text`, `Link`, `Card`) built with Tailwind CSS and potentially `@base-ui-components/react` primitives.
  * `src/index.css`, `src/custom-acul-styles.css`: Global and custom CSS for styling.
* `public/`: Static assets, including `index.html` which serves as the base template.
* `vite.config.ts`: Vite configuration for building the project.

## Getting Started

Follow these steps to set up and run the project locally, and then deploy it to Vercel for use with Auth0 ACUL.

### Prerequisites

* Node.js (>= 22.0.0)
* npm
* Git
* An Auth0 tenant with Universal Login configured and a Custom Domain enabled.
* Auth0 CLI (optional, but recommended for configuring ACUL screens).

### 1. Clone the Repository

```
git clone [https://github.com/auth0-samples/auth0-acul-samples.git](https://github.com/auth0-samples/auth0-acul-samples.git) # Replace with your forked repo URL
cd auth0-acul-samples

```

### 2. Install Dependencies

```
npm install

```

### 3. Local Development

To run the development server and test your custom screens locally:

```
npm run dev

```

This will typically start a Vite development server on `http://localhost:3000`.

To test the **production build locally** (recommended for simulating Auth0's environment):

```
npm run build
npx http-server dist -p 8080 --cors

```

This will build your project into the `dist` folder and serve it on `http://localhost:8080`.

### 4. Build for Production

To create the optimized production-ready bundles:

```
npm run build

```

This command generates your bundled `index.js` (main JavaScript) and `assets/style.css` (main CSS) in the `dist` directory. These files will **not** have hashes in their filenames.

### 5. Deployment to Vercel

1. **Create a New Project on Vercel:** Import your GitHub repository.

2. **Configure Build Settings:** Vercel should auto-detect Vite. Ensure the Node.js version is set to `>=22.0.0` (e.g., `22.x`) in your Vercel project settings or via a `vercel.json` file.

3. **Deploy:** Trigger a deployment. Vercel will build and host your `dist` folder.

4. **Get Hosted Asset URLs:** After a successful Vercel deployment, your `index.js` and `assets/style.css` files will be publicly accessible via URLs like:

   * `https://YOUR_VERCEL_PROJECT_NAME.vercel.app/index.js`

   * `https://YOUR_VERCEL_PROJECT_NAME.vercel.app/assets/style.css`

### 6. Configure Auth0 ACUL

This project is designed to be served by Auth0's Custom Universal Login.

1. **Create `settings/{SCREENNAME}.json`:** In the root of your project, create a `settings` folder and a JSON file for each screen you want to customize (e.g., `settings/login-id.json`, `settings/login-password.json`).

2. **Populate `settings.json`:** Use the following structure, replacing the `src` and `href` URLs with your actual Vercel deployment URLs.

   * **Generate SHA256 Hashes:** For security, you should generate Subresource Integrity (SRI) SHA256 hashes for your `index.js` and `assets/style.css` files. You can do this using `openssl dgst -sha256 -binary dist/index.js | openssl base64` locally after `npm run build`, or using an online SRI hash generator for the files hosted on Vercel.

   ```json
   {
     "rendering_mode": "advanced",
     "context_configuration": [
       "screen.texts"
     ],
     "head_tags": [
       {
         "attributes": {
           "async": true,
           "defer": true,
           "integrity": [
             "sha256-YOUR_INDEX_JS_SHA256_HASH_HERE"
           ],
           "src": "https://YOUR_VERCEL_PROJECT_NAME.vercel.app/index.js"
         },
         "tag": "script"
       },
       {
         "attributes": {
           "href": "https://YOUR_VERCEL_PROJECT_NAME.vercel.app/assets/style.css",
           "rel": "stylesheet"
         },
         "tag": "link"
       }
     ]
   }
   ```

3. **Apply Configuration to Auth0:** Use the Auth0 CLI or Management API to push this configuration to your Auth0 tenant for the respective Universal Login screen:

   ```bash
   # Example for login-id screen
   auth0 ul customize --rendering-mode advanced --prompt login-id --screen login-id --settings-file ./settings/login-id.json

   # Example for login-password screen
   auth0 ul customize --rendering-mode advanced --prompt login-password --screen login-password --settings-file ./settings/login-password.json
   ```

## Customization

* **Styling:** Modify `src/index.css` and `src/custom-acul-styles.css` to adjust global styles and custom overrides.

* **UI Components:** Customize the components in `src/components/ui/` to match your design system.

* **Screen Logic:** Edit files in `src/screens/` to change the behavior and appearance of individual login/signup/password screens.

* **Layout:** The overall centering and card styling are controlled by classes in `src/screens/login-id/index.tsx` (and `login-password/index.tsx`) and global CSS in `src/custom-acul-styles.css`.

