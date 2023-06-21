#!/bin/bash

# Get the PM2 process number from the command line argument
process_number=$1

process_location=$(pm2 show $process_number | grep "pwd" | awk '{print $5}')


repo_url=$(cd $process_location && git config --get remote.origin.url)

# Get the branch name from the existing Git repository
branch_name=$(cd $process_location && git rev-parse --abbrev-ref HEAD)

# Get the location of the PM2 process

# Get the Git username from the command line argument
git_username=teceads

# Get the token from the command line argument
token=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


# Get the location of the PM2 process
process_location=$(pm2 describe $process_number | grep "cwd" | awk '{print $2}')



echo "Starting update at $(date)" | tee -a update.log

# Log the process number
echo "Process number: $process_number" | tee -a update.log

# Log the repository URL
echo "Repository URL: $repo_url" | tee -a update.log

# Log the branch name
echo "Branch name: $branch_name" | tee -a update.log

# Log the process location
echo "Process location: $process_location" | tee -a update.log

# Change to the location of the PM2 process
cd $process_location

# Remove the existing Git repository
rm -rf $(basename $process_location)

echo "Removing existing repository" | tee -a update.log

# Clone a new repository with the specified branch and authentication
git clone -b $branch_name https://$git_username:$token@$repo_url

echo "Cloning new repository" | tee -a update.log

# Change to the cloned repository directory
cd $(basename $process_location)

echo "Installing dependencies" | tee -a update.log

# Install the dependencies
npm i
echo "buldig production" | tee -a update.log

# Install the dependencies
npm run build

echo "Restarting PM2 process" | tee -a update.log

# Restart the PM2 process
pm2 restart $process_number

