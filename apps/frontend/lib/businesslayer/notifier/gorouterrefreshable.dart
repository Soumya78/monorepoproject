import 'package:flutter/foundation.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import '../provider/authtokenprovider.dart';

class GoRouterRefreshNotifier extends ChangeNotifier {
  GoRouterRefreshNotifier(this.ref) {
    ref.listen<String?>(authtokenprovider, (_, __) => notifyListeners());
  }

  final Ref ref;
}
