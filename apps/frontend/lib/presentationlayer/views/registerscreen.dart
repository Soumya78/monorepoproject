import 'package:flutter/material.dart';

class Registerscreen extends StatefulWidget {
  TextEditingController _emailcontroller = TextEditingController();
  TextEditingController _usernamecontroller = TextEditingController();
  TextEditingController _passwordcontroller = TextEditingController();

  @override
  _RegisterscreenState createState() => _RegisterscreenState();
}

class _RegisterscreenState extends State<Registerscreen> {
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
                decoration: InputDecoration(labelText: "Username"),
                controller: widget._usernamecontroller,
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
