import { AnimationTriggerMetadata, animate, keyframes, state, style, transition, trigger } from '@angular/animations';

// navbar animations
export const NavAnimation: AnimationTriggerMetadata =
  trigger('navMenu', [
    state('active', style({height: '*', opacity: 1})),
    state('inactive', style({height: 0, opacity: 0})),
    transition('inactive => active', animate(200)),
    transition('active => inactive', animate(200))
  ]);

// component transition animations
export const FadeAnimation: AnimationTriggerMetadata =
  trigger('fade', [
    state('*', style({opacity: 1})),
    transition(':enter', [
      style({opacity: 0}),
      animate('250ms 250ms', style({opacity: 1}))
    ]),
    transition(':leave', [
      style({opacity: 1}),
      animate(250, style({opacity: 0}))
    ])
  ]);

// quick fade animations
export const QuickFade: AnimationTriggerMetadata =
  trigger('quickFade', [
    state('*', style({opacity: 1})),
    transition(':enter', [
      style({opacity: 0}),
      animate('100ms 100ms', style({opacity: 1}))
    ]),
    transition(':leave', [
      style({opacity: 1}),
      animate(100, style({opacity: 0}))
    ])
  ]);

// top down animations
export const TopDownAnimation: AnimationTriggerMetadata =
  trigger('topDown', [
    state('*', style({height: '*', opacity: 1})),
    transition(':enter', [
      style({height: 0, opacity: 0}),
      animate(100, style({height: '*', opacity: 1}))
    ]),
    transition(':leave', [
      style({height: '*', opacity: 1}),
      animate(100, style({height: 0, opacity: 0}))
    ])
  ]);

// bottom up animations
export const BottomUpAnimation: AnimationTriggerMetadata =
  trigger('bottomUp', [
    state('*', style({bottom: 0})),
    transition(':enter', [
      style({bottom: '-50%'}),
      animate('500ms 1000ms', style({bottom: 0}))
    ]),
    transition(':leave', [
      style({bottom: 0}),
      animate(500, style({bottom: '-50%'}))
    ])
  ]);

// admin points animations
export const AddPoints: AnimationTriggerMetadata =
  trigger('addPoints', [
    state('*', style({transform: 'translateY(0)'})),
    transition(':enter', [
      animate(500, keyframes([
        style({opacity: 0, transform: 'translateY(100%)'}),
        style({opacity: 1, transform: 'translateY(0)'})
      ]))
    ]),
    transition(':leave', [
      animate(500, keyframes([
        style({opacity: 1, transform: 'translateY(0)'}),
        style({opacity: 0, transform: 'translateY(-100%)'})
      ]))
    ])
  ]);

export const SubPoints: AnimationTriggerMetadata =
  trigger('subPoints', [
    state('*', style({transform: 'translateY(0)'})),
    transition(':enter', [
      animate(500, keyframes([
        style({opacity: 0, transform: 'translateY(-100%)'}),
        style({opacity: 1, transform: 'translateY(0)'})
      ]))
    ]),
    transition(':leave', [
      animate(500, keyframes([
        style({opacity: 1, transform: 'translateY(0)'}),
        style({opacity: 0, transform: 'translateY(100%)'})
      ]))
    ])
  ]);
