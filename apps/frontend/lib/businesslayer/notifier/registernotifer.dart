import 'dart:convert';

import 'package:frontend/datalayer/model/registermodel.dart';
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
