import 'package:freezed_annotation/freezed_annotation.dart';
part 'loginmodel.freezed.dart';
part 'loginmodel.g.dart';


@freezed
abstract class LoginModel with _$LoginModel {
  const factory LoginModel ({
    required String emailid,
    required String password,
  }) = _LoginModel ;

  factory LoginModel.fromJson(Map<String, dynamic> json) => _$LoginModelFromJson(json);

}