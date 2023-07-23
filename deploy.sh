echo "Switching to branch master"
git checkout master

echo "Building"
npm run build

echo "Deploying files to server...."
scp -r dist/* david@10.0.0.60:/var/www/sdcmlookup.com

echo "Done!"