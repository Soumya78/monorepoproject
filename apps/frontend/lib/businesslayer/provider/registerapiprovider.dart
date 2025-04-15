import 'package:frontend/businesslayer/notifier/registernotifer.dart';
import 'package:frontend/datalayer/model/registermodel.dart';
import 'package:riverpod/riverpod.dart';

final registerprovider =
    AutoDisposeAsyncNotifierProvider<Registernotifier, RegisterModel>(
      () => Registernotifier(),
    );
