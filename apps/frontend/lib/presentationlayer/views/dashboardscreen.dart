import 'package:flutter/material.dart';
import 'package:frontend/presentationlayer/views/components/logoutbutton.dart';

class Dashboardscreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text("Dashboard"),
          actions: [LogoutButton()],
        ),
      ),
    );
  }
}
