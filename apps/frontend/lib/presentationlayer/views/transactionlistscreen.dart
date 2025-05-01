import 'package:flutter/material.dart';
import 'package:frontend/presentationlayer/views/components/bottomnavbar.dart';
import 'package:frontend/utils/routes.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class Transactionlistscreen extends ConsumerStatefulWidget {
  const Transactionlistscreen({super.key});

  @override
  ConsumerState<Transactionlistscreen> createState() =>
      _TransactionlistscreenState();
}

class _TransactionlistscreenState extends ConsumerState<Transactionlistscreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: BottomNavBar(),
      appBar: AppBar(
        title: Text("Stateful Scaffold"),
        leading: IconButton(
          onPressed: () {
            context.go(dashboardroute);
          },
          icon: Icon(Icons.arrow_back),
        ),
      ),
      body: ListView.builder(
        itemCount: 2,
        itemBuilder: (context, index) {
          return (ListTile(title: Text("100")));
        },
      ),
    );
  }
}
