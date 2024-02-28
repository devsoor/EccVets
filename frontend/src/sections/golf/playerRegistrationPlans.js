import golfer from '../../assets/pricing/golfer.png';
import team from '../../assets/pricing/team.png';
import ticket from '../../assets/pricing/ticket.png';

export const _pricingPlans = [
    {
        subscription: 'Single Player',
        icon: golfer,
        price: 250,
        caption: 'Shotgun Start: 9:15 am',
        lists: [
            { text: 'Beverage Cart on Course', isAvailable: true },
            { text: 'Sponsorship & Advertising', isAvailable: true },
            { text: 'Hole Sponsorship', isAvailable: true },
            { subtext: 'Advertising on Hole', isAvailable: true },
        ],
        labelAction: 'choose single player',
    },
    {
        subscription: 'Foursome',
        icon: team,
        price: 900,
        caption: 'Shotgun Start: 9:15 am',
        lists: [
            { text: 'Format - Scramble', isAvailable: true },
            { text: 'Golf cart and fees included', isAvailable: true },
            { text: 'Beverage Cart on Course', isAvailable: true },
            { text: 'Huge Goodie Bag', isAvailable: true },
            { text: 'Golf Balls', isAvailable: true },
            { text: 'Meal After Play', isAvailable: true },
        ],
        labelAction: 'choose foursome',
    },
    // {
    //     subscription: '2023 Super Ticket',
    //     icon: ticket,
    //     price: 100,
    //     caption: 'Contests and credits',
    //     lists: [
    //         { text: 'Putting Contest (at the Turn)', isAvailable: true },
    //         { text: 'Ticket Drawing held at the Golf Banquet', isAvailable: true },
    //         { text: 'Ball Laucher (Hole 8)', isAvailable: true },
    //         { text: 'Drone Drop (Hole 13)', isAvailable: true },
    //         { text: '$20 credit toward team cost', isAvailable: true },
    //         { text: 'Pro Drive (Hole 18)', isAvailable: true },
    //         { footnote: 'See details below', isAvailable: true },
    //     ],
    //     labelAction: 'choose super ticket',
    // },
];
