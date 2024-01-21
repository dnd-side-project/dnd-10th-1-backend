# server.service 위치 경로 & systemd 의 service 가 존재하는 위치 경로
sudo mv /home/ubuntu/services/dnd-server/scripts/deploy/dnd-server.service /usr/lib/systemd/system/dnd-server.service
sudo systemctl daemon-reload
sudo systemctl start dnd-server.service
sudo systemctl enable dnd-server.service