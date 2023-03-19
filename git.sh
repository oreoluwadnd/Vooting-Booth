#!/bin/bash
echo “Hello World”



s=("src/controllers/voteController.ts" "src/routes/voteRoutes.ts" "package-lock.json")

for i in "${s[@]}"
do
     git add $i
     read -p "Enter commit message: " commitMessage
     git commit -m $commitMessage"
     git push"
     git add $i
done
