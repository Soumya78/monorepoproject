import { Server } from 'socket.io';
import User from '../../config/model/users';

export const setupsocketio = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("Socket connected", socket.id);

    socket.on('search_upi', async ({searchText,excludeupi}) => {
      if (!searchText) return;

      try {
        const matchingUpis = await User.find({
          upiid: { $regex: searchText, $options: "i",$ne:excludeupi }
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
};
