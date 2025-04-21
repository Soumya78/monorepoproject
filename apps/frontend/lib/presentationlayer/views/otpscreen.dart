import 'package:flutter/material.dart';
import 'package:frontend/utils/routes.dart';
import 'package:go_router/go_router.dart';

class Otpscreen extends StatelessWidget {
  const Otpscreen({super.key});

  @override
  Widget build(BuildContext context) {
    final TextEditingController _phonenocontroller = TextEditingController();
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: EdgeInsets.all(10),
          child: Column(
            children: [
              TextFormField(controller: _phonenocontroller),
              SizedBox(height: 50),
              ElevatedButton(onPressed: () {
                context.go(dashboardroute);
              }, child: Text("Proceed")),
            ],
          ),
        ),
      ),
    );
  }
}
