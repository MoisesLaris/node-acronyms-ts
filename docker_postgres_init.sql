-- Create database if not exists

SELECT 'CREATE DATABASE acronym'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'acronym')\gexec