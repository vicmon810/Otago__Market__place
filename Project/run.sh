#!/bin/bash
cd server
npm install
node server.js &

cd ../client
npm install
npm start
