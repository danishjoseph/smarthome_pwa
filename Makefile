push: 
	docker build -t danishjoseph/smarthome_ui:latest .
publish:
	docker push danishjoseph/smarthome_ui:latest