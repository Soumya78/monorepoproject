
import 'package:frontend/utils/strings.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class Authnotifer extends StateNotifier<String?> {
  Authnotifer():super(null);
  final _storage = FlutterSecureStorage();

  Future<String?> loadid()async{
    final token = await _storage.read( key: tokenkey);
    state = token ;
    return state ;

  }
  Future<void> setid(String token)async{
     await _storage.write( key: tokenkey, value: token,);
    state = token ;

  }

  Future<void> clearid()async{
     await _storage.delete(key: tokenkey);
    state = null ;

  }

  //<_____________   Store my upiid locally    _____________>
  Future<String?> setmyupiid(String upiid)async{
    await _storage.write( key: myupiidkey, value: upiid,);
    state = upiid ;
    return state ;

  }
  Future<String?> loadmyupiid() async{
    final upiid = await _storage.read( key: myupiidkey);
    state = upiid ;
    return state ;
  }



  Future<String?> setreciverupiid(String upiid)async{
    await _storage.write( key: receiverupidkey, value: upiid,);
    state = upiid ;
    return state ;

  }
  Future<String?> loadreceiverupiid() async{
    final upiid = await _storage.read( key: receiverupidkey);
    state = upiid ;
    return state ;
  }


}