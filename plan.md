Below is the detailed step‐by‐step plan with all dependent files, modifications, error handling, and best practice considerations. This plan breaks the project into manageable phases and explains the UI/UX details for each feature with a modern, clean interface using only typography, spacing, and layout.

---

### 1. Environment & Dependencies Setup

- **package.json**  
  - Add dependencies for Supabase client (e.g. "supabase-js").  
  - Ensure Next.js and Typescript versions remain consistent.

- **next.config.ts**  
  - Add support to load environment variables (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY) for Supabase authentication.  
  - Validate these variables on server startup.

- **.env.local (not listed but required)**  
  - Create this file for local testing with Supabase credentials (using free test keys).

---

### 2. Authentication & Global Layout

- **src/lib/supabaseClient.ts**  
  - Create a new file to initialize the Supabase client using template literals for URL and key.  
  - Include try/catch error handling on initialization.  
  - Example snippet:  
    ```typescript
    import { createClient } from '@supabase/supabase-js';
    const supabaseUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}`;
    const supabaseAnonKey = `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`;
    export const supabase = createClient(supabaseUrl, supabaseAnonKey);
    ```

- **src/hooks/useAuth.ts**  
  - Build a custom hook to manage the user session and role verification.  
  - Handle cases where the user is not logged in (redirect to login).

- **src/app/layout.tsx**  
  - Modify the global layout to include a header and sidebar (navigation).  
  - Include conditional rendering based on authentication status.  
  - Use error boundaries to catch layout errors.

- **src/components/Sidebar.tsx & src/components/Navbar.tsx**  
  - Create new UI components for sidebar and header navigation (using divs, buttons with text labels and CSS for modern spacing, colors and typography).  
  - Ensure navigation links to: Dashboard, Citations, Tasks, Shifts, Dues, Calendar.

---

### 3. Login Page

- **src/app/login/page.tsx**  
  - Build a login page that uses Supabase Auth to sign in with Google.  
  - The form must check for institutional emails (restrict by domain if not provided by Supabase, do an additional client-side domain check).  
  - Provide error messages if login fails (using a modern alert style with proper typography and spacing).

---

### 4. Dashboard & Main Navigation

- **src/app/dashboard/page.tsx**  
  - Create a dashboard view that displays summary cards for “Citations”, “Tasks” and “Shifts”.  
  - Use existing UI card components (from ui/card.tsx) to display counts and quick links.  
  - Add error handling for data fetch (e.g. loading state, error alerts).

---

### 5. Feature Pages & Forms

Each page below must implement modern, clean form layouts with proper spacing and font styles. Error handling includes field validations and API error messages.

- **Citations Page (src/app/citations/page.tsx)**  
  - Build a form with fields:  
    - Date (input type="date")  
    - Time (input type="time")  
    - Uniform Type (dropdown with options: “Estructural”, “Rescate”, “Parada”)  
    - Selection: Radio buttons or multi-select for choosing either a group or one/multiple volunteers.  
  - On submission, call a Supabase function to create a new citation.  
  - Render a list of citations with response options (Yes/No) for volunteers.

- **Tasks Page (src/app/tasks/page.tsx)**  
  - Build a form with fields:  
    - Start Date (input type="date")  
    - End Date (input type="date")  
    - Multi-select list for assigning volunteers  
  - On form submission, insert the task into the database and display a confirmation message.

- **Shifts (Guardias) Page (src/app/shifts/page.tsx)**  
  - Provide options to create shifts by selecting a group or individual volunteers along with date and time fields.  
  - When a shift is created, ensure it’s automatically added to the volunteer’s calendar.  
  - Show a summary list of upcoming shifts.

- **Dues (Cuotas) Page (src/app/dues/page.tsx)**  
  - For volunteers, display a simple grid/table with checkboxes representing dues paid per month and outstanding debts.  
  - For the treasurer role, allow checkboxes to be editable.  
  - On change, trigger a backend notification if the debt is six months or longer.  
  - Ensure UI visual indicators are clear (e.g., using red text for overdue dues).

- **Calendar Page (src/app/calendar/page.tsx)**  
  - Render a calendar view (e.g., using a grid layout) that lists all company events marked as “visible for everyone”.  
  - Each event should list key details (date, title).  
  - Provide clean typography and spacing to ensure readability in the calendar view.

---

### 6. Role-Based Admin Features

- **Admin Group Creation (src/app/admin/officers/page.tsx)**  
  - Build a page for administrators to create groups of officials.  
  - Include input fields for group name, description, and selection of officers.  
  - Validate that only users with the “admin” role access this page.

- **Role Restrictions**  
  - Throughout pages, use the `useAuth` hook to check user roles (admin, officer, treasurer, volunteer).  
  - Hide or disable UI elements for features not allowed for a given role.

---

### 7. Notifications & Error Handling

- **Notification Components (src/components/NotificationBanner.tsx)**  
  - Create a reusable component for displaying notifications (e.g., dues overdue alerts).  
  - Use a modern style with a prominent color (red or orange) for errors/warnings.

- **General Form Handling**  
  - Wrap API calls in try/catch blocks, display user-friendly error messages on failure.  
  - Disable submit buttons while processing and handle network errors gracefully.

---

### 8. Testing & Validation

- Manually test each form by signing in with test credentials via Supabase Auth.  
- Use browser dev tools to simulate error cases (e.g., network failures, invalid inputs).  
- For backend endpoint testing, use curl commands (if endpoints are exposed via API routes) to ensure response status codes and timings.

---

### Summary

- Initialize Supabase authentication and create a dedicated client in src/lib/supabaseClient.ts.  
- Set up a global layout with role-based navigation in layout.tsx, Sidebar.tsx, and Navbar.tsx.  
- Implement a login page (src/app/login/page.tsx) with email domain validation and error handling.  
- Build main dashboard and individual pages (citations, tasks, shifts, dues, calendar) with modern, clean UI forms and card components.  
- Incorporate role-based access control using a custom hook (src/hooks/useAuth.ts) and dedicated admin pages.  
- Ensure all API calls include error and loading states, with clear notifications using NotificationBanner.tsx.  
- Validate integration with Supabase and manually test with curl and in-browser scenarios to verify functionality and error handling.
