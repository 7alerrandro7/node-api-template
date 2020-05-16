
dockerlogin:
	docker login -u user -p 'password' registry.io

release: dockerlogin
	npm test --prefix src/
	sudo docker build -t registry/node-api:latest .
	sudo docker push registry/node-api:latest

run: dockerlogin
	npm test --prefix src/
	sudo docker build -t registry/node-api:latest .
	docker run -d -p 3030:3030 registry/node-api:latest
