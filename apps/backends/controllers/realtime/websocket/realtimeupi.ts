import { Server } from 'socket.io';
import User from '../../../config/model/users';
let io: Server;

export const setupsocketio = (server: any) : Server =>{
 io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("Socket connected", socket.id);

    // Set up a listener for the 'search_upi' event
    // This event is triggered when a user searches for UPI IDs
    // The 'searchText' parameter is the text entered by the user in the search box
    // The 'exculde_upi' parameter is the UPI ID to be excluded from the search results
    // The server searches for UPI IDs in the database that match the search text
    // and sends the results back to the client
    // The search is case-insensitive and excludes the specified UPI ID
    // The results are limited to 10 matching UPI IDs
    // The results are sent back to the client using the 'upi-results' event
    // If an error occurs during the search, an empty array is sent back to the client

    socket.on('search_upi', async ({searchText,exculde_upi}) => {
      if (!searchText) return;

      try {
        const matchingUpis = await User.find({
          upiid: { $regex: searchText, $options: "i",$ne:exculde_upi }
        }).limit(10);

        const upiList = matchingUpis.map((user) => user.upiid);
        socket.emit('upi-results', upiList);
      } catch (err) {
        console.error("Error fetching UPI IDs:", err);
        socket.emit('upi-results', []);
      }
    });

    socket.on('disconnect', () => {
      console.log("Socket disconnected", socket.id);
    });
  });
  return io ;
};

export const getIoInstance = () => io;
