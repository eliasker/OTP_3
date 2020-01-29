package Ryhma_3.Kaiku_BE.server;

/**
 * @author Panu Lindqvist
 * Runs a global chat server, can be connected to from same network.
 * 
 * JS code that sends has been used to test functionality
 * 
 * const init = () => {
   socket = socketIO.connect('http://localhost:9991');

   socket.on('connect', function(){
     console.log('connect');
   });
  
   socket.on('chatevent', function(data){
     console.log('chatevent');
     console.log(data);

  
   socket.on('disconnect', function(){
     console.log('disconnect');
     socket.disconnect();
   });
 }

 * 
 * 
 * const sendMessage = (message) => {
  	const jsonObj = {
    user: userName,
    message: message
  }

  socket.emit('chatevent', jsonObj);
}
 */
public class Test_ServerRunner {
	public static void main(String[] args) throws InterruptedException {
		ChatServerInit init = new ChatServerInit();
		GlobalChatServer server = new GlobalChatServer(init);
		
		server.start();
		
		Thread.sleep(Integer.MAX_VALUE);
	}
}
