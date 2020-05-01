# Kaiku back-end

Listening on port 8080.

### Launching the server
CD in to the project root directory and run the following command:  
unix: `./mvnw spring-boot:run`
windows: `mvnw spring-boot:run`

### Setup for external server
1. Make sure port 8081 (REST api), default:8083 (SocketIO port) are exposed  
2. Make sure front-end knows external ip and port. frontend>src>util>config.js set BASEURI `yourExternalIPHere`:`8081` and SOCKETURI `yourExternalIPHere`:`8083`
3. At server boot config when "write port & hostname", set port `8083 / or custom` and hostname `yourExternalIPhere`

### Setup steps when launching on Windows
1. JAVA_HOME variable to match JDK installation locations
2. Run command 'mvnw spring-boot:run' at kaiku\kaiku-back