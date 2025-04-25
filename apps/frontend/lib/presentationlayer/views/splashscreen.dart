import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:frontend/businesslayer/provider/registeredcheckprovider.dart';
import 'package:frontend/presentationlayer/views/dashboardscreen.dart';
import 'package:frontend/presentationlayer/views/errorscreen.dart';
import 'package:frontend/presentationlayer/views/registerscreen.dart';
import 'package:frontend/utils/authstate.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class Splashscreen extends ConsumerWidget{
  Widget build(BuildContext context,WidgetRef ref){
    final registrationcheck = ref.watch(registercheckprovider);
    return registrationcheck.when(data: (data){
      switch(data){

        case AuthState.loggedIn:
          return Dashboardscreen();
          // TODO: Handle this case.
          throw UnimplementedError();
        case AuthState.needsRegistration:
          return Registerscreen();
          // TODO: Handle this case.
          throw UnimplementedError();

      }
    }, error:(e,_){
      return Errorscreen();
    }, loading: (){
      return Scaffold(body: Center(child: CircularProgressIndicator(),),);
    });
  }
}