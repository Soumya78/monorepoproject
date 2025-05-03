import 'package:flutter/cupertino.dart';
import 'package:frontend/businesslayer/notifier/gorouterrefreshable.dart';
import 'package:frontend/businesslayer/provider/authprovider.dart';
import 'package:frontend/presentationlayer/views/dashboardscreen.dart';
import 'package:frontend/presentationlayer/views/loginscreen.dart';
import 'package:frontend/presentationlayer/views/otpscreen.dart';
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
    ],
  );
});
