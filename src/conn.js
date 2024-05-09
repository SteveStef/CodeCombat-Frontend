const socket = new WebSocket('ws://localhost:8081/ws');

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

const connect = () => {
 try {
    console.log('Attempting Connection...');
    socket.onopen = () => {
      console.log('WebSocket is open now.');

      const cookie = getCookie('session_id');
      console.log(cookie);

      const data = JSON.stringify({ uuid: cookie });
      socket.send(data);
    };

    socket.onclose = (event) => {
      console.log('Disconnected from server', event.code, event.reason);
    };

 } catch(err) {
    console.error(err);
 }
}

connect();

export default socket;
