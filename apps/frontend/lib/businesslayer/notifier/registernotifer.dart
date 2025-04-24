import 'dart:convert';

import 'package:frontend/businesslayer/notifier/authtokennotifier.dart';
import 'package:frontend/businesslayer/provider/authtokenprovider.dart';
import 'package:frontend/datalayer/model/registermodel.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:riverpod/riverpod.dart';

import '../../utils/strings.dart';
import 'package:http/http.dart' as http;

class Registernotifier extends AutoDisposeAsyncNotifier<RegisterModel> {

  @override
  Future<RegisterModel> build() {
    // TODO: implement build
    throw UnimplementedError();
  }

Future<bool> registerapi(RegisterModel registermodel) async {
    Uri registerurl = Uri.parse(baseurl + registerendpoint);

    try {
      final response = await http.post(
        registerurl,
        headers: {"Content-Type": "application/json"},
        body: jsonEncode(registermodel.toJson()),
      );

      if (response.statusCode == 201) {
        final responsetoken = jsonDecode(response.body);
        final token = responsetoken["token"];
      if(token != null){
      await ref.read(authtokenprovider.notifier).settoken(token);
      }
        print("Token from response: $token");
       return true ;
      } else if (response.statusCode == 400) {
    return false ;
      } else {
      return false ;
      }
    } catch (e) {
     return false ;
    }
  }
}
