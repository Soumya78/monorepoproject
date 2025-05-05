import 'package:flutter/cupertino.dart';
import 'package:frontend/presentationlayer/views/components/animationcomponents/lottieanimationenum.dart';
import 'package:lottie/lottie.dart';

class LottieAnimationview extends StatelessWidget {
  final LottieAnimation lottieAnimation;

  final bool reverse;

  final bool repeat;

  const LottieAnimationview({
    super.key,
    required this.lottieAnimation,
    this.reverse = true,
    this.repeat = false,
  });

  @override
  Widget build(BuildContext context) =>
      Lottie.asset(lottieAnimation.fullPath, repeat: repeat, reverse: reverse);
}

extension GetfullPath on LottieAnimation {
  String get fullPath => "lib/presentationlayer/assets/animations/$name.json";
}
