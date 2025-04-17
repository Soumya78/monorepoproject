import 'package:freezed_annotation/freezed_annotation.dart';
part 'loginmodel.freezed.dart';
part 'loginmodel.g.dart';


@freezed
abstract class Loginmodel with _$Loginmodel {
  const factory Loginmodel ({
    required String emailid,
    required String password,
  }) = _Loginmodel ;

  factory Loginmodel.fromJson(Map<String, dynamic> json) => _$LoginmodelFromJson(json);
}