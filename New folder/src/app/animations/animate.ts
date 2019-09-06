import {
  trigger,
  transition,
  state,
  animate,
  animation,
  style,
  keyframes,
  useAnimation
} from "@angular/animations";

export let bounceOutLeftAnimation = animation(
  animate(
    "1.3s ease-out",
    keyframes([
      style({
        offset: 0,
        opacity: 0,
        transform: "translateX(-3000px)"
      }),
      style({
        offset: 0.6,
        opacity: 1,
        transform: "translateX(25px)"
      }),
      style({
        offset: 0.75,
        transform: "translateX(-250px)"
      }),
      style({
        offset: 1,
        opacity: 1,
        transform: "translateX(0)"
      })
    ])
  )
);

export let slide = trigger("slide", [
  transition(":enter", [
    style({ transform: "translateX(-10px)" }),
    animate(500)
  ]),

  transition(":leave", useAnimation(bounceOutLeftAnimation))
]);

export let fadeInAnimation = animation(
  [style({ opacity: 0 }), animate("{{ duration }} {{ easing }}")],
  {
    params: {
      duration: "2s",
      easing: "ease-out"
    }
  }
);

export let bounceOutLeftAnimation1 = animation(
  animate(
    "3s ease-out",
    keyframes([
      style({
        offset: 0,
        opacity: 1,
        transform: "translateX(0) translateY(0)"
      }),
      style({
        offset: 0.25,
        opacity: 1,
        transform: "translateX(500px) translateY(-200px)"
      }),
      style({
        offset: 0.5,
        transform: "translateX(900px) translateY(-400px)"
      }),
      style({
        offset: 0.75,
        transform: "translateX(1350px) translateY(-600px)"
      }),
      style({
        offset: 1,
        opacity: 1,
        transform: "translateX(3000px) translateY(-1000px)"
      })
    ])
  )
);
export let fade = trigger("fade", [
  transition(":enter", useAnimation(bounceOutLeftAnimation)),

  transition(":leave", [])
]);
export let fade1 = trigger("fade1", [
  transition(":enter", useAnimation(bounceOutLeftAnimation1)),

  transition(":leave", [])
]);

export let adi = animation(
  animate(
    "1.3s ease-out",
    keyframes([
      style({
        offset: 0.5,
        transform: "translate(100%) translateY(-100%)"
      }),
      style({
        offset: 1,
        transform: "translate(4500%) translateY(-600px)"
      })
    ])
  )
);

export let adai = animation(
  animate(
    "1.3s ease-out",
    keyframes([
      style({
        offset: 0.5,
        transform: "translate(100%) translateY(-100%)"
      }),
      style({
        offset: 1,
        transform: "translate(4500%) translateY(-600px)"
      })
    ])
  )
);

export let throws = trigger("slide", [transition(":leave", useAnimation(adi))]);
