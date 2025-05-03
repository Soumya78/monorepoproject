import 'package:frontend/businesslayer/globaldioinstance.dart';
import 'package:frontend/utils/strings.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';


final transactionprovider = StreamProvider.autoDispose.family<bool,
    Map<String, dynamic>>((ref, payload) {
  final dio = ref.read(dioprovider);
  return Stream.fromFuture(
      dio.post(baseurl + kafkatransaction, data: payload).then((
          response) {
        if (response.statusCode == 200) {
          print(payload);
      return true ;
        }else{
          throw Exception("Transaction failed");
        }
      }));
});