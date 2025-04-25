import 'package:frontend/businesslayer/notifier/authnotifer.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

final authprovider = StateNotifierProvider<Authnotifer,String?>((ref){
  return Authnotifer();
});