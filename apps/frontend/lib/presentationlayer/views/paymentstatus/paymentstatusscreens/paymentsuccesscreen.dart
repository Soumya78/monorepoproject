import 'package:flutter/material.dart';
import 'package:frontend/presentationlayer/views/animation/paymentloadinganimation.dart';
import 'package:frontend/presentationlayer/views/animation/paymentsuccessanimation.dart';
import 'package:go_router/go_router.dart';

import '../../../../utils/routes.dart';
import '../../components/custommodalsheet.dart';

class Paymentsuccessscreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Paymentsuccessanimation(),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
               context.go(transactionlistscreen);
              },
              child: Text("Done"),
            ),
          ],
        ),

    );
  }
}
