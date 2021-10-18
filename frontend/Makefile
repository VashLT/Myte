qdep:
	git add .
	git commit -m "$m"
	git push -u origin main
main2dev:
	git checkout dev
	git merge main
	git push origin dev
	git checkout main
	git rebase dev