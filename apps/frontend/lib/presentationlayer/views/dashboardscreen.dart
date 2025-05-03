import 'package:flutter/material.dart';
import 'package:frontend/presentationlayer/views/components/customappsearchbar.dart';
import 'package:frontend/presentationlayer/views/components/logoutbutton.dart';

class Dashboardscreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {

    return Scaffold( body: Column(children: [Gpaytopsection()],));
  }
}
