import 'package:flutter/material.dart';
import 'package:frontend/businesslayer/provider/registerapiprovider.dart';
import 'package:frontend/datalayer/model/registermodel.dart';
import 'package:frontend/utils/routes.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class Registerscreen extends ConsumerWidget {
  final _emailcontroller = TextEditingController();
  final _usernamecontroller = TextEditingController();
  final _passwordcontroller = TextEditingController();

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
                    final registermodel = RegisterModel(      // passing the data to registermodel
                      emailid: _emailcontroller.text,
                      password: _passwordcontroller.text,
                      username: _usernamecontroller.text,
                    );

                    final isuscess = await ref         // accessing the values incase of success or dailure
                        .watch(registerprovider.notifier)
                        .registerapi(registermodel);

                    if (isuscess) {
                      if(context.mounted){
                      context.go(dashboardroute);
                    } }else {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text("Registration unsuccessfull")),
                      );
                    }
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
