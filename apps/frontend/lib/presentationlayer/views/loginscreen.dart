import 'package:flutter/material.dart';

class Loginscreen extends StatefulWidget {

  final TextEditingController _emailcontroller = TextEditingController();
 final  TextEditingController _usernamecontroller = TextEditingController();
final   TextEditingController _passwordcontroller = TextEditingController();



  @override
  _LoginscreenState createState() => _LoginscreenState();
}

class _LoginscreenState extends State<Loginscreen> {
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
              ElevatedButton(onPressed: () {}, child: Text("Sumbit")),
            ],
          ),
        ),
      ),
    );
  }
}
