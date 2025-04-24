import 'package:frontend/businesslayer/provider/logoutprovider.dart';
import 'package:frontend/utils/routes.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:flutter/material.dart';

class LogoutButton extends ConsumerWidget {
  const LogoutButton();

  Widget build(BuildContext context, WidgetRef ref) {
    return IconButton(
      onPressed: () async {
    try{
      final resposne = await ref.watch(logoutprocvider.future);
      print(resposne);
      if (resposne) {
        // Logout successful, navigate to login

          context.go(loginroute);

      } else {
        // Show logout failure
        if (context.mounted) {
          ScaffoldMessenger.of(
            context,
          ).showSnackBar(const SnackBar(content: Text('Logout failed')));
        }
      }
    }catch(e){
      print(e);
    }

      },
      icon: Icon(Icons.logout),
    );

  }
}
