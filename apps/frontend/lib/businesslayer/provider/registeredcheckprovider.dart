import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:frontend/businesslayer/globaldioinstance.dart';
import 'package:frontend/businesslayer/provider/authprovider.dart';
import 'package:frontend/utils/authstate.dart';
import 'package:frontend/utils/strings.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

final registercheckprovider = AutoDisposeFutureProvider<AuthState>((ref) async{
   final storage = FlutterSecureStorage();
   final dio = ref.read(dioprovider);
   final usrid = await  storage.read(key: "id");

   if(usrid != null){
     try{
       final response = await dio.get("/auth/$usrid");
       print("api fetched");
       if(response.statusCode == 200){
         return AuthState.loggedIn ;
       }else{
         await storage.deleteAll();
         return AuthState.needsRegistration;
       }
     }on DioException catch(e){
       if(e.response?.statusCode == 404){
         await storage.deleteAll();
         return AuthState.needsRegistration ;
       }
     }
   }else{
     return AuthState.needsRegistration ;
   }
   return AuthState.needsRegistration ;

});