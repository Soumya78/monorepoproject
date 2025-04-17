import 'package:flutter/material.dart';
import 'package:frontend/businesslayer/provider/loginprovider.dart';
import 'package:frontend/datalayer/model/login/loginmodel.dart';
import 'package:frontend/utils/routes.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class Loginscreen extends ConsumerStatefulWidget {
  final TextEditingController _emailcontroller = TextEditingController();

  final TextEditingController _passwordcontroller = TextEditingController();

  @override
  ConsumerState<Loginscreen> createState() => _LoginscreenState();
}

class _LoginscreenState extends ConsumerState<Loginscreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Stateful Scaffold")),
      body: SafeArea(
        child: Center(
          child: Column(
            children: [
              TextFormField(
                decoration: InputDecoration(labelText: "Email id"),
                controller: widget._emailcontroller,
              ),
              SizedBox(height: 10),
              TextFormField(
                decoration: InputDecoration(labelText: "Password"),
                controller: widget._passwordcontroller,
              ),

              SizedBox(height: 10),
              ElevatedButton(
                onPressed: () async {
                  final loginmodel = LoginModel(
                    emailid: widget._emailcontroller.text,
                    password: widget._passwordcontroller.text,
                  );
                  final loginsucess = await ref.watch(
                    loginprovider(loginmodel).future,
                  );
                  if (loginsucess) {
                    context.go(otproute);
                  } else {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text("Login unsuccesfull")),
                    );
                  }
                },
                child: Text("Sumbit"),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
