#!/bin/bash

# Function to run Next.js server
run_nextjs() {
  if [ "$1" == "development" ]; then
    echo "Running Next.js in development mode..."
    npm run dev
  elif [ "$1" == "production" ]; then
    echo "Running Next.js in production mode..."
    npm run build && npm start
  else
    echo "Invalid mode for Next.js"
  fi
}

# Function to run Flask server
run_flask() {
  if [ "$1" == "development" ]; then
    echo "Running Flask in development mode..."
        source .venv/bin/activate
        ./manager.sh -r
  elif [ "$1" == "production" ]; then
    echo "Running Flask in production mode..."
        source .venv/bin/activate
        ./manager.sh -p
  else
    echo "Invalid mode for Flask"
  fi
}

# Function to run Spring Boot server (Gradle version)
run_springboot() {
  if [ "$1" == "development" ]; then
    echo "Running Spring Boot in development mode (Gradle)..."
    ./gradlew bootRun --args='--spring.profiles.active=dev'
  elif [ "$1" == "production" ]; then
    echo "Running Spring Boot in production mode (Gradle)..."
    ./gradlew clean build && java -jar build/libs/*.jar --spring.profiles.active=prod
  else
    echo "Invalid mode for Spring Boot"
  fi
}

# Function to run all servers
run_all_servers() {
  mode=$1
  cd 'client'
  run_nextjs $mode &
  cd '../middleware'
  run_flask $mode &
  cd '../server'
  run_springboot $mode &
  
  # Wait for all background jobs to finish
  wait
}

# Check for -p or -d option
if [ "$1" == "-d" ]; then
  echo "Starting all servers in development mode..."
  run_all_servers "development"
elif [ "$1" == "-p" ]; then
  echo "Starting all servers in production mode..."
  run_all_servers "production"
else
  echo "Usage: $0 [-d | -p]"
  echo "-d: Run all servers in development mode"
  echo "-p: Run all servers in production mode"
  exit 1
fi
