#!/usr/bin/env bash
# Render build script for Django backend
set -o errexit

pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate
# Note: Do not run seed_data in production builds; run manually in development if needed
