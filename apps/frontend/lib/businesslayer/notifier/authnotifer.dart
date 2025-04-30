
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class Authnotifer extends StateNotifier<String?> {
  Authnotifer():super(null);
  final _storage = FlutterSecureStorage();

  Future<void> loadid()async{
    final token = await _storage.read( key: 'id');
    state = token ;

  }
  Future<void> setid(String token)async{
     await _storage.write( key: 'id', value: token,);
    state = token ;

  }
  Future<void> clearid()async{
     await _storage.delete(key: 'id');
    state = null ;

  }


}