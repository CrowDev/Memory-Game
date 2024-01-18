import { animate, state, style, transition, trigger } from '@angular/animations';

export const animation = {
  reveal: trigger('reveal', [
    state('not-revealed', style({ transform: 'rotateY(0deg)'})),
    state('revealed', style({ transform: 'rotateY(180deg)' })),
    transition('void => *', animate('1s ease')),
    transition('* => void', animate('1s ease')),
  ])
}
