import 'package:flutter/material.dart';
import 'package:frontend/businesslayer/provider/authprovider.dart';
import 'package:frontend/presentationlayer/views/components/bottomnavbar.dart';
import 'package:frontend/utils/routes.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class Transactionlistscreen extends ConsumerStatefulWidget {
  final String? reciverupid;

  const Transactionlistscreen(this.reciverupid, {super.key});

  @override
  ConsumerState<Transactionlistscreen> createState() =>
      _TransactionlistscreenState();
}

class _TransactionlistscreenState extends ConsumerState<Transactionlistscreen> {
  @override
  Widget build(BuildContext context) {



    setState(() {
      widget.reciverupid!;
      ref.read(authprovider.notifier).setreciverupiid(widget.reciverupid!);

    });
    return Scaffold(
      bottomNavigationBar: BottomNavBar(),
      appBar: AppBar(
        title: Text(widget.reciverupid!),

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
          return Card(
            color: Colors.blue,
            child: (ListTile(title: Text("100"))),
          );
        },
      ),
    );
  }
}
