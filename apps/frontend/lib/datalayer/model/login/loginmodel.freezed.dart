// dart format width=80
// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'loginmodel.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$Loginmodel {

 String get emailid; String get password;
/// Create a copy of Loginmodel
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$LoginmodelCopyWith<Loginmodel> get copyWith => _$LoginmodelCopyWithImpl<Loginmodel>(this as Loginmodel, _$identity);

  /// Serializes this Loginmodel to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is Loginmodel&&(identical(other.emailid, emailid) || other.emailid == emailid)&&(identical(other.password, password) || other.password == password));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,emailid,password);

@override
String toString() {
  return 'Loginmodel(emailid: $emailid, password: $password)';
}


}

/// @nodoc
abstract mixin class $LoginmodelCopyWith<$Res>  {
  factory $LoginmodelCopyWith(Loginmodel value, $Res Function(Loginmodel) _then) = _$LoginmodelCopyWithImpl;
@useResult
$Res call({
 String emailid, String password
});




}
/// @nodoc
class _$LoginmodelCopyWithImpl<$Res>
    implements $LoginmodelCopyWith<$Res> {
  _$LoginmodelCopyWithImpl(this._self, this._then);

  final Loginmodel _self;
  final $Res Function(Loginmodel) _then;

/// Create a copy of Loginmodel
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? emailid = null,Object? password = null,}) {
  return _then(_self.copyWith(
emailid: null == emailid ? _self.emailid : emailid // ignore: cast_nullable_to_non_nullable
as String,password: null == password ? _self.password : password // ignore: cast_nullable_to_non_nullable
as String,
  ));
}

}


/// @nodoc
@JsonSerializable()

class _Loginmodel implements Loginmodel {
  const _Loginmodel({required this.emailid, required this.password});
  factory _Loginmodel.fromJson(Map<String, dynamic> json) => _$LoginmodelFromJson(json);

@override final  String emailid;
@override final  String password;

/// Create a copy of Loginmodel
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$LoginmodelCopyWith<_Loginmodel> get copyWith => __$LoginmodelCopyWithImpl<_Loginmodel>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$LoginmodelToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _Loginmodel&&(identical(other.emailid, emailid) || other.emailid == emailid)&&(identical(other.password, password) || other.password == password));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,emailid,password);

@override
String toString() {
  return 'Loginmodel(emailid: $emailid, password: $password)';
}


}

/// @nodoc
abstract mixin class _$LoginmodelCopyWith<$Res> implements $LoginmodelCopyWith<$Res> {
  factory _$LoginmodelCopyWith(_Loginmodel value, $Res Function(_Loginmodel) _then) = __$LoginmodelCopyWithImpl;
@override @useResult
$Res call({
 String emailid, String password
});




}
/// @nodoc
class __$LoginmodelCopyWithImpl<$Res>
    implements _$LoginmodelCopyWith<$Res> {
  __$LoginmodelCopyWithImpl(this._self, this._then);

  final _Loginmodel _self;
  final $Res Function(_Loginmodel) _then;

/// Create a copy of Loginmodel
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? emailid = null,Object? password = null,}) {
  return _then(_Loginmodel(
emailid: null == emailid ? _self.emailid : emailid // ignore: cast_nullable_to_non_nullable
as String,password: null == password ? _self.password : password // ignore: cast_nullable_to_non_nullable
as String,
  ));
}


}

// dart format on
