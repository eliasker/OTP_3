# Kaiku backend

Spring REST is listening by default port 8080. (can be reconfigured at file application.properties {server.port=***})   
SocketIO is by default on port 8083. (can be configured in boot config)

## Setup steps when launching on Windows
1. JAVA_HOME variable to match JDK installation locations
2. Run command 'mvnw spring-boot:run' at kaiku\kaiku-back

## Launching the server
CD in to the project root directory and run the following command:  
unix: `./mvnw spring-boot:run`
windows: `mvnw spring-boot:run`

if mvnw is undefined, run:  
unix: `./mvnw clean install` 
windows: ` mvnw clean install`  

## Running the application
Starting the application requires user input via terminal.  
kaiku_back comes with a guided setup, where:  
1. mongo location is defined
2. init type is defined
3. port, socketio hostname, origin address are defined

## Running and terminating production release

### Running
1. Change directory to where your .jar file is located and create a directory called `secrets`.  
`mkdir secrets`
2. Create a configuration file for MongoDB called `mongoCredentials.txt` in the secrets directory.  
`echo "Your mongodb URL here" >> ./secrets/mongoCredentials.txt`
3. Run through the initial set-up with the following command  
`java -jar ./kaiku-0.1.0-a.jar run-config`
4. You can then run the application with  
`nohup java -jar ./kaiku-0.1.0-a.jar production &`

### Terminating
1. The application needs to be terminated manually for now. For this you can find the running process with `htop` and terminate it through there. A systemd service will be provided later.

## Setup for external server
1. Make sure port default:8080 (REST api), default:8083 (SocketIO port) are exposed  
2. Make sure front-end knows external ip and port. frontend>src>util>config.js set BASEURI `yourExternalIPHere`:`8081` and SOCKETURI `yourExternalIPHere`:`8083`
3. At server boot config when "write port & hostname  origin",  
    set port `8083 / or custom`,  
    hostname ie. `localhost` or `10.10.10.10` and  
    origin, the address where from the fornt-end uses the server, ie. `http://localhost:3000`  
