import 'package:frontend/businesslayer/notifier/authtokennotifier.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

final authtokenprovider = StateNotifierProvider<Authtokennotifer,String?>((ref){
  return Authtokennotifer();
});