react_build: 
	npm run build
push: 
	docker build -t danishjoseph/smarthome_ui:latest .
publish:
	docker push danishjoseph/smarthome_ui:latest