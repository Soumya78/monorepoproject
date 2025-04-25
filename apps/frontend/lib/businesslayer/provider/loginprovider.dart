// import 'dart:convert';
//
// import 'package:flutter_secure_storage/flutter_secure_storage.dart';
// import 'package:frontend/businesslayer/provider/authprovider.dart';
// import 'package:frontend/datalayer/model/login/loginmodel.dart';
// import 'package:hooks_riverpod/hooks_riverpod.dart';
// import 'package:http/http.dart' as http;
//
// import '../../utils/strings.dart';
//
// final loginprovider = AutoDisposeFutureProvider.family<bool, LoginModel>((
//   /// it takes a loginmodel(email and password) and exposes a bool value
//   ref,
//   loginmodel,
// ) async {
//   try {
//     final _storgae = FlutterSecureStorage();
//     Uri loginurl = Uri.parse(baseurl + loginendpoint);
//     final response = await http.post(
//       loginurl,
//       headers: {"Content-Type": "application/json"},
//       body: jsonEncode(loginmodel.toJson()),
//     );
//
//     if (response.statusCode == 200) {
//       final data = jsonDecode(response.body);
//       print(data);
//       final token = data['token'];
//       print(token);
//       await _storgae.write(key: 'auth_token', value: token);
//       ref.read(authtokenprovider.notifier).settoken(token);
//
//       /// Stroting the token generated during
//       /// login here in flutter securte storgae
//
//       return true;
//     } else {
//       return false;
//     }
//   } catch (err) {
//     print(err);
//     return false;
//   }
// });
