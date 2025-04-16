import 'package:flutter/material.dart';
import 'package:frontend/businesslayer/provider/registerapiprovider.dart';
import 'package:frontend/datalayer/model/registermodel.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:riverpod/riverpod.dart';

class Registerscreen extends ConsumerWidget {
  TextEditingController _emailcontroller = TextEditingController();
  TextEditingController _usernamecontroller = TextEditingController();
  TextEditingController _passwordcontroller = TextEditingController();

  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(title: Text("Stateful Scaffold")),
      body: SafeArea(
        child: Center(
          child: Padding(
            padding: EdgeInsets.all(8.0),
            child: Column(
              children: [
                TextFormField(
                  decoration: InputDecoration(labelText: "Email id"),
                  controller: _emailcontroller,
                ),
                SizedBox(height: 10),
                TextFormField(
                  decoration: InputDecoration(labelText: "Username"),
                  controller: _usernamecontroller,
                ),
                SizedBox(height: 10),
                TextFormField(
                  decoration: InputDecoration(labelText: "Password"),
                  controller: _passwordcontroller,
                ),

                SizedBox(height: 20),
                ElevatedButton(
                  onPressed: () async {
                    final registermodel = RegisterModel(
                      emailid: _emailcontroller.text,
                      password: _passwordcontroller.text,
                      username: _usernamecontroller.text,
                    );
                    await ref
                        .read(registerprovider.notifier)
                        .registerapi(registermodel);
                  },
                  child: Text("Sumbit"),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
