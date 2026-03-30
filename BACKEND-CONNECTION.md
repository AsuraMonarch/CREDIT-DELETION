# CREDIT-DELETION Frontend to Backend Connection

This guide explains how to connect the CREDIT-DELETION frontend with the Credit-deletion-backend API.

## 🔗 Connection Overview

The frontend form now automatically sends consultation requests to the backend API running on `http://localhost:5000`.

### Files Modified:
- **index.html** — Updated form with proper IDs and structure
- **main.js** — New JavaScript file handling form submission and API calls

## 🚀 Setup Instructions

### Step 1: Start the Backend Server

Open a terminal and navigate to the backend folder:

```bash
cd "c:\Users\USER\Downloads\Credit-deletion-backend"
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

✅ Backend will run at: `http://localhost:5000`

### Step 2: Open Frontend in Browser

Open the CREDIT-DELETION folder and simply open `index.html` in a browser:

```
c:\Users\USER\Downloads\CREDIT-DELETION\index.html
```

Or use a local server (optional but recommended):

```bash
# Using Python
cd "c:\Users\USER\Downloads\CREDIT-DELETION"
python -m http.server 3000
```

Then open: `http://localhost:3000`

### Step 3: Test the Connection

1. Scroll to the **"Request a free consultation"** section
2. Fill in the form:
   - Name: `Jane Doe`
   - Email: `jane@example.com`
   - Phone: `214-801-5331`
   - Message: `I need help with credit repair`
3. Click **SEND**

✅ If successful, you'll see: **"✓ Consultation request submitted successfully!"**

## 📡 API Endpoints

The frontend connects to these backend endpoints:

- **POST `/consultation`** — Submit a new consultation request

### Example Request (automatically handled by main.js):

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "214-801-5331",
  "message": "I need help with credit repair"
}
```

### Example Response (201 Created):

```json
{
  "success": true,
  "message": "Consultation request saved successfully",
  "data": {
    "id": 1,
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "214-801-5331",
    "message": "I need help with credit repair",
    "status": "pending",
    "created_at": "2026-03-30T10:30:00",
    "updated_at": "2026-03-30T10:30:00"
  }
}
```

## 🛠️ Troubleshooting

### Error: "Network error. Make sure the backend is running..."

- ✅ Check that backend is running: `python app.py` in the backend folder
- ✅ Verify backend is on `http://localhost:5000`
- ✅ Check browser console (F12) for detailed error messages

### Error: "Invalid email" or validation errors

- ✅ Ensure email format is correct (user@domain.com)
- ✅ Phone must have at least 10 digits
- ✅ All required fields (name, email, phone) must be filled

### Form data not saving

- ✅ Backend database file is created at: `Credit-deletion-backend\instance\app.db`
- ✅ Check that folder has write permissions

## 📊 View Submitted Consultations

Backend API provides endpoints to view submitted consultations:

```bash
# Get all consultations
curl http://localhost:5000/consultation

# Get consultation by ID
curl http://localhost:5000/consultation/1

# Get statistics
curl http://localhost:5000/consultation/stats
```

## 🔄 Development Tips

1. **Local Testing**: Backend and frontend run on different ports
   - Frontend: File or `localhost:3000`
   - Backend: `localhost:5000`

2. **CORS Enabled**: The backend allows requests from any origin during development

3. **Auto-clear Success Messages**: Success messages disappear after 5 seconds

4. **Form Reset**: Form automatically clears after successful submission

## 📝 Configuration

### Change Backend URL (if needed)

Edit `main.js` line 4:

```javascript
const API_BASE_URL = "http://localhost:5000"; // Change this
```

### Production Deployment

For production:
1. Deploy backend to a server (e.g., Heroku, AWS)
2. Update `API_BASE_URL` in `main.js` to the production URL
3. Deploy frontend to a CDN or web server

Example:
```javascript
const API_BASE_URL = "https://api.creditdeletion.com"; // Production URL
```

## ✅ You're Connected!

Your CREDIT-DELETION frontend is now fully connected to the Credit-deletion-backend. All consultation requests will be stored in the database and can be managed via the backend API.

Questions? Check the backend README.md for more details on API usage and deployment.
