#!/bin/bash
echo “Hello World”



s=("src/controllers/voteController.ts" "src/routes/voteRoutes.ts" "package-lock.json")

for i in "${s[@]}"
do
    echo git add $i
    read -p "Enter commit message: " commitMessage
    echo "git commit -m $commitMessage"
    echo "git push"
    git add $i
done
