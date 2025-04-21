import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:frontend/utils/strings.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:http/http.dart' as http;

final logoutprocvider = AutoDisposeFutureProvider<bool>((ref) async {
  final _storgae = FlutterSecureStorage();
  final token = await _storgae.read(key: 'auth_token');
  print(token);

  final logouturl = Uri.parse(baseurl + logoutendpoint);
  final response = await http.post(
    logouturl,
    headers: {
      'Content-type':'application/json',
      'Authorization': 'Bearer $token',     /// T
    },
  );
  print(response.headers);
  if (response.statusCode == 200) {
    await _storgae.delete(key: 'auth_token');
    return true;
  } else {
    throw Exception('Logout failed with status code ${response.statusCode}');
  }
});
