# MERN Stack implementation of company website
For this project I am reworking the company website I made for STM Tuning to provide additional functionality for scheduling and managing customer appointments.

## Features:
- User/Vehicle/Appointment database
- Management route for employee activites
- Client-facing website for customer access

## Running in Development Mode:
1. Clone Project
2. Set up MongoDB Atlas account (free) [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/lp/try4?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_general_retarget-brand_gic-null_amers-us-ca_ps-all_desktop_eng_lead&utm_term=using%20mongodb&utm_medium=cpc_paid_search&utm_ad=p&utm_ad_campaign_id=14291004602&adgroup=151115416255&cq_cmp=14291004602&gad_source=1&gclid=CjwKCAiAuYuvBhApEiwAzq_YiW6QsF2upo7xdYB8xS2TcvGPrMbeHrVcPxwBhVqq1kp8qWz_zcZNaxoC0QsQAvD_BwE)
3. Add environment variables to /backend/.env
   - ```MONGO_URI=<YOUR_LINK>```
   - ```PORT=4000```
5. Install and start backend
   - Open terminal at project root
   - Navigate to /backend/: ```cd backend```
   - Install dependencies ```npm install```
   - Run backend dev ```npm run dev```
6. Install and start frontend
   - Open terminal at project root
   - Navigate to /frontend/: ```cd frontend```
   - Install dependencies ```npm install```
   - Run frontend dev ```npm start```
   - Frontend is served at ```localhost:300```
