import 'package:flutter/material.dart';
import 'package:frontend/businesslayer/routes/approutes.dart';
import 'package:frontend/presentationlayer/views/mainview.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

void main() {
  runApp(ProviderScope(child: MyApp()));
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(routerConfig: route,);
  }
}
