import 'package:flutter/material.dart';
import 'package:frontend/businesslayer/provider/authprovider.dart';
import 'package:frontend/businesslayer/provider/transactionprovider.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

void showFullScreenModalBottomSheet(BuildContext context) {

  showModalBottomSheet(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.white,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
    ),
    builder: (context) {
      final _amountcontroller = TextEditingController();
      return Consumer(
        builder: (context, ref, child) {


          return DraggableScrollableSheet(
            expand: false,
            initialChildSize: 0.95,
            minChildSize: 0.6,
            maxChildSize: 1.0,
            builder: (context, scrollController) {
              return Padding(
                padding: EdgeInsets.only(
                  bottom: MediaQuery.of(context).viewInsets.bottom,
                ),
                child: Scaffold(
                  backgroundColor: Colors.transparent,
                  body: Column(
                    children: [
                      // Top Row with dismiss button
                      Padding(
                        padding: const EdgeInsets.fromLTRB(8, 16, 8, 0),
                        child: Row(
                          children: [
                            IconButton(
                              icon: Icon(Icons.close),
                              onPressed: () => Navigator.pop(context),
                            ),
                            Spacer(),
                            Center(
                              child: Container(
                                height: 5,
                                width: 40,
                                margin: EdgeInsets.only(right: 8),
                                decoration: BoxDecoration(
                                  color: Colors.grey[300],
                                  borderRadius: BorderRadius.circular(10),
                                ),
                              ),
                            ),
                            Spacer(flex: 2),
                          ],
                        ),
                      ),
                      Expanded(
                        child: SingleChildScrollView(
                          controller: scrollController,
                          padding: EdgeInsets.all(16),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                "Enter Amount",
                                style: TextStyle(
                                  fontSize: 22,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              SizedBox(height: 20),
                              TextField(
                                keyboardType: TextInputType.number,
                                controller: _amountcontroller,
                                decoration: InputDecoration(
                                  labelText: "Amount",
                                  border: OutlineInputBorder(),
                                ),
                              ),
                              SizedBox(height: 80), // Padding for FAB
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                  floatingActionButton: FloatingActionButton.extended(
                    onPressed: () async{
                      final reciverupid =
                     await ref.read(authprovider.notifier).loadreceiverupiid();
                      final myupid = await ref.read(authprovider.notifier).loadmyupiid();
                      Map<String, dynamic> payload = {
                        "amount": double.tryParse(_amountcontroller.text) ?? 0,
                        "fromupid": myupid,
                        "toupiid": reciverupid,
                      };
                      print(payload);
                    await  ref.read(transactionprovider(payload));
                    },
                    label: Text("Submit"),
                    icon: Icon(Icons.check),
                  ),
                  floatingActionButtonLocation:
                      FloatingActionButtonLocation.centerFloat,
                ),
              );
            },
          );
        },
      );
    },
  );
}
