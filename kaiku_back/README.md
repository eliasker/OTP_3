# Kaiku backend

Spring REST is listening by default port 8080. (can be reconfigured at file application.properties {server.port=***})   
SocketIO is by default on port 8083. (can be configured in boot config)

### Launching the server
CD in to the project root directory and run the following command:  
unix: `./mvnw spring-boot:run`
windows: `mvnw spring-boot:run`

### Running the application
Starting the application requires user input via terminal.  
kaiku_back comes with a guided setup, where:  
1. mongo location is defined
2. init type is defined
3. port, socketio hostname, origin address are defined

### Setup for external server
1. Make sure port default:8080 (REST api), default:8083 (SocketIO port) are exposed  
2. Make sure front-end knows external ip and port. frontend>src>util>config.js set BASEURI `yourExternalIPHere`:`8081` and SOCKETURI `yourExternalIPHere`:`8083`
3. At server boot config when "write port & hostname  origin",  
    set port `8083 / or custom`,  
    hostname ie. `localhost` or `10.10.10.10` and  
    origin, the address where from the fornt-end uses the server, ie. `http://localhost:3000`  

### Setup steps when launching on Windows
1. JAVA_HOME variable to match JDK installation locations
2. Run command 'mvnw spring-boot:run' at kaiku\kaiku-back