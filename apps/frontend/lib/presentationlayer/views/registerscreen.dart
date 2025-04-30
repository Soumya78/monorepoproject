import 'package:flutter/material.dart';
import 'package:frontend/businesslayer/provider/registerapiprovider.dart';
import 'package:frontend/datalayer/model/registermodel.dart';
import 'package:frontend/presentationlayer/views/components/custombutton.dart';
import 'package:frontend/presentationlayer/views/components/customtextformfield.dart';
import 'package:frontend/presentationlayer/views/components/headercomponent.dart';
import 'package:frontend/utils/routes.dart';
import 'package:frontend/utils/strings.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class Registerscreen extends ConsumerWidget {
  final _emailcontroller = TextEditingController();
  final _usernamecontroller = TextEditingController();
  final _passwordcontroller = TextEditingController();

  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: EdgeInsets.all(10.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              BoldText(text: createaccount),
              SizedBox(height: 20),
              Text(pleaseenteryourdetails),
              SizedBox(height: 40),
              CustomTextField(
                controller: _emailcontroller,
                label: youremail,
                hint: hintemail,
                icon: Icons.email_outlined,
              ),
              SizedBox(height: 20),
              CustomTextField(
                label: yourpassword,
                controller: _passwordcontroller,
                hint: hintpassword,
                icon: Icons.password_outlined,
                obscureText: true,
              ),
              SizedBox(height: 20),
              CustomTextField(
                label: repeatpassword,
                hint: hintrepeatpassword,
                obscureText: true,
                icon: Icons.password_outlined,
              ),
              SizedBox(height: 20),

              SquareButton(
                text: register,
                onPressed: () async {
                  final registermodel = RegisterModel(
                    // passing the data to registermodel
                    emailid: _emailcontroller.text,
                    password: _passwordcontroller.text,
                  );

                  final isuscess =
                      await ref // accessing the values incase of success or dailure
                          .watch(registerprovider.notifier)
                           .registerapi(registermodel);

                  if (isuscess) {
                    if (context.mounted) {
                      context.go(dashboardroute);
                    }
                  } else {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text("Registration unsuccessfull")),
                    );
                  }
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
