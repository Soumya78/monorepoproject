import 'package:flutter/cupertino.dart';
import 'package:frontend/businesslayer/notifier/gorouterrefreshable.dart';
import 'package:frontend/businesslayer/provider/authprovider.dart';
import 'package:frontend/presentationlayer/views/animation/paymentfailedanimation.dart';
import 'package:frontend/presentationlayer/views/animation/paymentloadinganimation.dart';
import 'package:frontend/presentationlayer/views/animation/paymentsuccessanimation.dart';
import 'package:frontend/presentationlayer/views/dashboardscreen.dart';
import 'package:frontend/presentationlayer/views/loginscreen.dart';
import 'package:frontend/presentationlayer/views/otpscreen.dart';
import 'package:frontend/presentationlayer/views/paymentstatus/paymentstatusscreens/Paymentfailurescreen.dart';
import 'package:frontend/presentationlayer/views/paymentstatus/paymentstatusscreens/paymentloadingscreen.dart';
import 'package:frontend/presentationlayer/views/paymentstatus/paymentstatusscreens/paymentsuccesscreen.dart';
import 'package:frontend/presentationlayer/views/splashscreen.dart';
import 'package:frontend/presentationlayer/views/transactionlistscreen.dart';

import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import '../../presentationlayer/views/mainview.dart';
import '../../utils/routes.dart';

final routerprovider = Provider<GoRouter>((ref) {
  final token = ref.read(authprovider);

  return GoRouter(
    routes: <RouteBase>[
      GoRoute(
        path: initalroute,
        builder: (BuildContext context, GoRouterState state) {
          return Splashscreen();
        },
      ),

      GoRoute(
        path: otproute,
        builder: (BuildContext context, GoRouterState state) {
          return Otpscreen();
        },
      ),
      GoRoute(
        path: dashboardroute,
        builder: (BuildContext context, GoRouterState state) {
          return Dashboardscreen();
        },
      ),
      GoRoute(
        path: transactionlistscreen,
        builder: (BuildContext context, GoRouterState state) {
          return Transactionlistscreen(state.extra.toString());
        },
      ),
      GoRoute(
        path: paymentsuccessscreen,
        builder: (BuildContext context, GoRouterState state) {
          return Paymentsuccessscreen();
        },
      ),
      GoRoute(
        path: paymentfailurescreen,
        builder: (BuildContext context, GoRouterState state) {
          return Paymentfailurescreen();
        },
      ),
      GoRoute(
        path: paymentloadingscreen,
        builder: (BuildContext context, GoRouterState state) {
          return Paymentloadingscreen();
        },
      ),
    ],
  );
});
