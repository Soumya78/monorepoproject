import 'package:frontend/utils/strings.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:dio/dio.dart';

final dioprovider = Provider<Dio>((ref) {
  final dio = Dio(
    BaseOptions(
      baseUrl: baseurl,
      connectTimeout: const Duration(seconds: 10),
      receiveTimeout: const Duration(seconds: 10),
    ),
  );

  dio.interceptors.add(
    InterceptorsWrapper(
      onRequest: (options, handler) {
        print('➡️ Request: ${options.method} ${options.uri}');
        return handler.next(options);
      },
      onResponse: (response, handler) {
        print('✅ Response: ${response.statusCode} ${response.data}');
        return handler.next(response);
      },
      onError: (DioException e, handler) {
        print('❌ Error: ${e.message}');
        return handler.next(e);
      },
    ),
  );
  return dio ;
}
);
