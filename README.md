# MERN Stack implementation of company website
For this project I am reworking the company website I made for STM Tuning to provide additional functionality for scheduling and managing customer appointments.

## Features:
- MongoDB, Express, React, Node
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
   - Frontend is served at ```localhost:3000```

## Production Deployment to AWS
1. Update apt
   ```
   sudo apt update
   sudo apt upgrade
   ```
2. Install bash
   ```
   sudo apt install bash
   ```
3. Install node and npm
   ```
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
   source ~/.bashrc
   nvm install --lts
   # Check running version
   node -e "console.log('Running Node.js ' + process.version)"
   ```
4. Install git
   ```
   sudo apt install git
   ```

5. Generate ssh key
   - Use Default location, no password
      ```
      ssh-keygen -t ed25519 -C "adaigh@asu.edu"
      ```
   - Ensure agent is running
      ```   
      eval $(ssh-agent)
      ```

   - Display public key to copy to github
      ```
      cat /home/ubuntu/.ssh/id_ed25519.pub
      ```
6. Clone repository
   ```
   git clone -b deployment git@github.com:Adaigh/stm_SPA.git
   ```

7. Install Docker
   - Dependency updates
      ```
      sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
      ```
   - Docker GPG Key
      ```
      curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
      ```
   - Docker APT Repo
      ```
      echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
      ```
   - Updates
      ```
      sudo apt update
      sudo apt upgrade
      ```
   - Docker Install
      ```
      sudo apt install -y docker-ce docker-ce-cli containerd.io
      ```
   - Start/enable docker
      ```
      sudo systemctl start docker
      sudo systemctl enable docker
      ```
   - Verify docker version
      ```
      sudo docker –-version
      ```
8. Install Docker-compose
   ```
   sudo apt install docker-compose
   ```
9. Build/run project
   ```
   cd stm_SPA
   sudo docker-compose up
   ```
