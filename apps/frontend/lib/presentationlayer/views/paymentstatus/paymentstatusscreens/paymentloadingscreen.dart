import 'package:flutter/material.dart';
import 'package:frontend/presentationlayer/views/animation/paymentloadinganimation.dart';

class Paymentloadingscreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(body: Center(child: Column(
      children: [
        Paymentloadinganimation(),

      ],
    )));
  }
}
