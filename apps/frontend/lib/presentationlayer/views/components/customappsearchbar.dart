import 'package:flutter/material.dart';
import 'package:frontend/businesslayer/provider/authprovider.dart';
import 'package:frontend/businesslayer/service/socketservice.dart';
import 'package:frontend/utils/routes.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class Gpaytopsection extends ConsumerStatefulWidget {
  const Gpaytopsection({super.key});

  @override
 ConsumerState<Gpaytopsection> createState() => _GpaytopsectionState() ;
}

class _GpaytopsectionState extends ConsumerState<Gpaytopsection> {
  final TextEditingController _upicontroller = TextEditingController();
  final SocketService _socketService = SocketService();
  List<String> _upisuggestion = [];
  String? _myupiid ;


  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _socketService.connecttosocket();
    _loadMyUpiId();
  }
  Future<void> _loadMyUpiId() async {
    final upiId = await ref.read(authprovider.notifier).loadmyupiid();
    print(upiId!+" excluded");// async call
    setState(() {
      _myupiid = upiId;
      print(_myupiid! + " exculuded");
    });
  }


  void _onsearchchanged(String value,String? myupid) {
    if (value.isEmpty) {
      setState(() {
        _upisuggestion.clear();
      });
      return;
    } else {
      _socketService.searchupi(value,myupid ,(data) {
        setState(() {
          _upisuggestion = data;
        });

      });
    }
  }

  @override
  void dispose() {
    _upicontroller.dispose();
    _socketService.dispose();
    // TODO: implement dispose
    super.dispose();
  }

  @override
  Widget build(BuildContext context ) {
  final myupiid = _myupiid ;
    return Container(
      color: Color(0xFFE8F0FE), // Light blue background
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 26),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(height: 40),
          TextField(
            controller: _upicontroller,
            onChanged:(value) => _onsearchchanged(value,myupiid),
            decoration: InputDecoration(
              hintText: 'Pay by name or phone number',
              prefixIcon: Icon(Icons.search),
              filled: true,
              fillColor: Colors.white,
              contentPadding: EdgeInsets.symmetric(vertical: 0),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(30),
                borderSide: BorderSide.none,
              ),
            ),
          ),
          if (_upisuggestion.isNotEmpty)
            ..._upisuggestion.map((upi) => ListTile(title: Text(upi),onTap: (){
              context.go(transactionlistscreen,extra: upi);
              print("Selected upi,$upi");
              _upicontroller.text = upi ;
              setState(() {
                _upisuggestion.clear();
              });
            },)),
        ],
      ),
    );
  }
}
