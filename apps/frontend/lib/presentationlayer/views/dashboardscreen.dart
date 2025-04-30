import 'package:flutter/material.dart';
import 'package:frontend/presentationlayer/views/components/customappsearchbar.dart';
import 'package:frontend/presentationlayer/views/components/logoutbutton.dart';

class Dashboardscreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    TextEditingController _searchcontroller = TextEditingController();
    return Scaffold( body: Column(children: [GpayTopSection()],));
  }
}
