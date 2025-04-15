// dart format width=80
// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'registermodel.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$RegisterModel {

 String get emailid; String get username; String get password;
/// Create a copy of RegisterModel
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$RegisterModelCopyWith<RegisterModel> get copyWith => _$RegisterModelCopyWithImpl<RegisterModel>(this as RegisterModel, _$identity);

  /// Serializes this RegisterModel to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is RegisterModel&&(identical(other.emailid, emailid) || other.emailid == emailid)&&(identical(other.username, username) || other.username == username)&&(identical(other.password, password) || other.password == password));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,emailid,username,password);

@override
String toString() {
  return 'RegisterModel(emailid: $emailid, username: $username, password: $password)';
}


}

/// @nodoc
abstract mixin class $RegisterModelCopyWith<$Res>  {
  factory $RegisterModelCopyWith(RegisterModel value, $Res Function(RegisterModel) _then) = _$RegisterModelCopyWithImpl;
@useResult
$Res call({
 String emailid, String username, String password
});




}
/// @nodoc
class _$RegisterModelCopyWithImpl<$Res>
    implements $RegisterModelCopyWith<$Res> {
  _$RegisterModelCopyWithImpl(this._self, this._then);

  final RegisterModel _self;
  final $Res Function(RegisterModel) _then;

/// Create a copy of RegisterModel
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? emailid = null,Object? username = null,Object? password = null,}) {
  return _then(_self.copyWith(
emailid: null == emailid ? _self.emailid : emailid // ignore: cast_nullable_to_non_nullable
as String,username: null == username ? _self.username : username // ignore: cast_nullable_to_non_nullable
as String,password: null == password ? _self.password : password // ignore: cast_nullable_to_non_nullable
as String,
  ));
}

}


/// @nodoc
@JsonSerializable()

class _RegisterModel implements RegisterModel {
  const _RegisterModel({required this.emailid, required this.username, required this.password});
  factory _RegisterModel.fromJson(Map<String, dynamic> json) => _$RegisterModelFromJson(json);

@override final  String emailid;
@override final  String username;
@override final  String password;

/// Create a copy of RegisterModel
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$RegisterModelCopyWith<_RegisterModel> get copyWith => __$RegisterModelCopyWithImpl<_RegisterModel>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$RegisterModelToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _RegisterModel&&(identical(other.emailid, emailid) || other.emailid == emailid)&&(identical(other.username, username) || other.username == username)&&(identical(other.password, password) || other.password == password));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,emailid,username,password);

@override
String toString() {
  return 'RegisterModel(emailid: $emailid, username: $username, password: $password)';
}


}

/// @nodoc
abstract mixin class _$RegisterModelCopyWith<$Res> implements $RegisterModelCopyWith<$Res> {
  factory _$RegisterModelCopyWith(_RegisterModel value, $Res Function(_RegisterModel) _then) = __$RegisterModelCopyWithImpl;
@override @useResult
$Res call({
 String emailid, String username, String password
});




}
/// @nodoc
class __$RegisterModelCopyWithImpl<$Res>
    implements _$RegisterModelCopyWith<$Res> {
  __$RegisterModelCopyWithImpl(this._self, this._then);

  final _RegisterModel _self;
  final $Res Function(_RegisterModel) _then;

/// Create a copy of RegisterModel
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? emailid = null,Object? username = null,Object? password = null,}) {
  return _then(_RegisterModel(
emailid: null == emailid ? _self.emailid : emailid // ignore: cast_nullable_to_non_nullable
as String,username: null == username ? _self.username : username // ignore: cast_nullable_to_non_nullable
as String,password: null == password ? _self.password : password // ignore: cast_nullable_to_non_nullable
as String,
  ));
}


}

// dart format on
