/**
 * Image sources for the portfolio.
 *
 * `wispHome`, `wispMap`, `resonanceCurve`, `dampingCurve`, `energyVsTime` and `timeDomain`
 * are genuine assets: real screenshots of the live WISP site and real figures from the
 * resonance study. Everything else (hero, map, oscillator, code, chess, pulse, ink2)
 * is a generated placeholder — replace those imports with original work.
 */
import hero from "@/assets/hero.jpg";
import map from "@/assets/work-map.jpg";
import oscillator from "@/assets/work-oscillator.jpg";
import code from "@/assets/work-code.jpg";
import chess from "@/assets/work-chess.jpg";
import pulse from "@/assets/work-pulse.jpg";
import ink2 from "@/assets/ink-sample-2.jpg";
import wispHome from "@/assets/wisp-home.png.asset.json";
import wispMap from "@/assets/wisp-map.png.asset.json";
import resonanceCurve from "@/assets/resonance-curve.png.asset.json";
import dampingCurve from "@/assets/damping-curve.png.asset.json";
import energyVsTime from "@/assets/energy-vs-time.png.asset.json";
import timeDomain from "@/assets/time-domain-resonance.png.asset.json";

export const images = {
  hero,
  map,
  oscillator,
  code,
  chess,
  pulse,
  ink2,
  wispHome: wispHome.url,
  wispMap: wispMap.url,
  resonanceCurve: resonanceCurve.url,
  dampingCurve: dampingCurve.url,
  energyVsTime: energyVsTime.url,
  timeDomain: timeDomain.url,
};
