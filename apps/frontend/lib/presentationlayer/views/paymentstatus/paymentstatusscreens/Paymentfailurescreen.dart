import 'package:flutter/material.dart';
import 'package:frontend/presentationlayer/views/animation/paymentfailedanimation.dart';
import 'package:frontend/presentationlayer/views/animation/paymentloadinganimation.dart';
import 'package:frontend/utils/routes.dart';
import 'package:go_router/go_router.dart';

import '../../components/custommodalsheet.dart';

class Paymentfailurescreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body:  Column(
        mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Paymentfailedanimation(),
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
