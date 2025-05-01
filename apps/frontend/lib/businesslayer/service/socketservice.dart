import 'package:frontend/utils/strings.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;

class SocketService {
  late IO.Socket socket;

  void connecttosocket() {
    socket = IO.io(
      baseurl,
      IO.OptionBuilder()
          .setTransports(['websocket'])
          .disableAutoConnect()
          .build(),
    );
    socket.connect();
    socket.onConnect((_) {
      print("Connected to server: ${socket.id}");
    });

    socket.onDisconnect((_) {
      print("Disconnected from server");
    });
  }

  void searchupi(String text,String? myupiid, Function(List<String>) onresult) {
    print("Seraching");
    socket.emit('search_upi', {'searchText':text,'exculde_upi':myupiid});
    socket.once('upi-results', (data) {
      final List<String> results = List<String>.from(data);
      print(results);
      onresult(results);
    });
  }

  void dispose() {
    socket.disconnect();
  }
}
