import 'package:flutter/material.dart';
import 'package:frontend/businesslayer/routes/approutes.dart';

import 'package:hooks_riverpod/hooks_riverpod.dart';

void main() {
  runApp(ProviderScope(child: MyApp()));
}

class MyApp extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {

    final route = ref.watch(routerprovider);
    return MaterialApp.router(routerConfig: route,);
  }
}
