import 'package:flutter/cupertino.dart';
import 'package:frontend/businesslayer/notifier/gorouterrefreshable.dart';
import 'package:frontend/businesslayer/provider/authtokenprovider.dart';
import 'package:frontend/presentationlayer/views/dashboardscreen.dart';
import 'package:frontend/presentationlayer/views/loginscreen.dart';
import 'package:frontend/presentationlayer/views/otpscreen.dart';

import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import '../../presentationlayer/views/mainview.dart';
import '../../utils/routes.dart';

final routerprovider = Provider<GoRouter>((ref) {
  final token = ref.read(authtokenprovider);

  return GoRouter(
    refreshListenable: GoRouterRefreshNotifier(ref),
    redirect: (context, state) {
      final isloggingin = state.matchedLocation == loginroute;
      final isregistering = state.matchedLocation == initalroute;
      if (token == null && !isloggingin && !isregistering) {
        return initalroute;
      } else if (token != null && (isloggingin || isregistering)) {
        return loginroute;
      }
      return null;
    },
    routes: <RouteBase>[
      GoRoute(
        path: initalroute,
        builder: (BuildContext context, GoRouterState state) {
          return Mainview();
        },
      ),
      GoRoute(
        path: loginroute,
        builder: (BuildContext context, GoRouterState state) {
          return Loginscreen();
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
    ],
  );
});
