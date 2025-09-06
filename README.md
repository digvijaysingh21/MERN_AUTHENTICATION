🔹 Step 1: Remove .env from Git tracking

Run this in your project root:

git rm --cached .env


This removes .env from Git tracking, but keeps the file locally.

🔹 Step 2: Commit the removal
git commit -m "Remove .env file from tracking"

🔹 Step 3: Push the change
git push origin main

🔹 Step 4: Confirm .gitignore has .env

Your .gitignore should contain at least:

# Ignore environment files
.env
.env.local
