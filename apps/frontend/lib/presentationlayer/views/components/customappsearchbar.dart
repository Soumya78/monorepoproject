import 'package:flutter/material.dart';

class GpayTopSection extends StatelessWidget {
  const GpayTopSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Color(0xFFE8F0FE), // Light blue background
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 26),
      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
        SizedBox(height: 40,),
          TextField(
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
        ],
      ),
    );
  }
}
