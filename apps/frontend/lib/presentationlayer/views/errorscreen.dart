import 'package:flutter/material.dart';

class Errorscreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Simple Scaffold App")),
      body: Center(child: Text("Sorry encounterd some error")),
    );
  }
}
