import 'dart:convert';

import 'package:frontend/datalayer/model/registermodel.dart';
import 'package:http/http.dart' as http;

import '../../../utils/strings.dart';

void registerapi(RegisterModel registermodel) async {
  Uri registerurl = Uri.parse(baseurl + registerendpoint);

  try {
    final response =   await http.post(registerurl, headers: {"Content-Type": "application/json"},
        body: jsonEncode(registermodel.toJson()));

    if(response.statusCode == 201 ){
      print("User create succesfully");
    }else if(response.statusCode == 400){
      print("User already exists");
    }else{
      print("Something went wrong");
    }
  }
  catch (e) {
    print(e.toString());
  }
}
