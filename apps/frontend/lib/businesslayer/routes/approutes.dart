import 'package:flutter/cupertino.dart';
import 'package:frontend/presentationlayer/views/loginscreen.dart';

import 'package:go_router/go_router.dart';

import '../../presentationlayer/views/mainview.dart';
import '../../utils/routes.dart';

final GoRouter route = GoRouter(
  initialLocation: initalroute,
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
  ],
);
