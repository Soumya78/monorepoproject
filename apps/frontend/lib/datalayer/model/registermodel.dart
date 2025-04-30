import 'package:freezed_annotation/freezed_annotation.dart';

part 'registermodel.freezed.dart';
part 'registermodel.g.dart';

@freezed
abstract class RegisterModel with _$RegisterModel {
  const factory RegisterModel({
    required String emailid,

    required String password,
  }) = _RegisterModel;

  factory RegisterModel.fromJson(Map<String, dynamic> json) => _$RegisterModelFromJson(json);
}