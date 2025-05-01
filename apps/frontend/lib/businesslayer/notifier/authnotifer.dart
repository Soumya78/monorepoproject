
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class Authnotifer extends StateNotifier<String?> {
  Authnotifer():super(null);
  final _storage = FlutterSecureStorage();

  Future<String?> loadid()async{
    final token = await _storage.read( key: 'id');
    state = token ;
    return state ;

  }
  Future<void> setid(String token)async{
     await _storage.write( key: 'id', value: token,);
    state = token ;

  }

  Future<void> clearid()async{
     await _storage.delete(key: 'id');
    state = null ;

  }

  //<__________________________>
  Future<String?> setupiid(String upiid)async{
    await _storage.write( key: 'upi-id', value: upiid,);
    state = upiid ;
    return state ;

  }
  Future<String?> loadupiid() async{
    final upiid = await _storage.read( key: 'upi-id');
    state = upiid ;
    return state ;
  }


}