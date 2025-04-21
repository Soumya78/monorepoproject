import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class Authtokennotifer extends StateNotifier<String?>{
  Authtokennotifer():super(null){
    loadtoken();
  }
  final _storage = FlutterSecureStorage();

  Future<void> loadtoken()async{
    final token = await _storage.read( key: 'auth_token');
    state = token ;
  }
  Future<void> settoken(String token)async{
     await _storage.write( key: 'auth_token', value: token,);
    state = token ;
  }
  Future<void> cleartoken()async{
     await _storage.delete(key: 'auth_token');
    state = null ;
  }


}