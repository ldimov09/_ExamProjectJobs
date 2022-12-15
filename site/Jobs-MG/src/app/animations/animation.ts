import { trigger, transition, state, animate, style, keyframes, animation, useAnimation, query, stagger } from "@angular/animations";

export let bounceOutLeftAnimation = animation(
    animate("1s ease-in", keyframes([
        style({
            offset: .2,
            opacity: 1,
            transform: 'translateX(20px)'
        }),
        style({
            offset: 1,
            opacity: 0,
            transform: 'translateX(-100%)'
        }),
    ]))
)


export let slide = trigger('slide', [
    /*
    transition('* => *', [ 
        query(':enter', [
            style({ opacity: 0 }),
            stagger(1000, [animate('0.5s', style({ opacity: 1 }))])
          ]
        )
    ])
    */    

    
    transition('void => *', [
        style({ transform: 'translateX(-100px)' }),
        animate("0.5s ease-out")
    ]),
    

    
    transition('* => void', [
        animate("0.25s ease-in", style({transform: 'translateX(-100%)'}))
    ])
    
    
    
    /*
    transition('* => void', [
        useAnimation(bounceOutLeftAnimation)
    ])
    */
])




export let fade = trigger('fade', [
    /*
    transition('void => *', [
        style({backgroundColor: 'yellow', opacity: 0}),
        animate("1s ease-in", style({ backgroundColor: 'white', opacity: 1}))
    ]),
    transition('* => void', [
        animate("1s ease-out", style({ opacity: 0}))
    ]),
    */
    state('void', style({ opacity: 0 })),
    transition('void => *', [
        animate("1s ease-in", style({ opacity: 1 }))
    ]),
    /*
    transition('* => void', [
        animate("1s ease-out", )
    ]),
    */


])