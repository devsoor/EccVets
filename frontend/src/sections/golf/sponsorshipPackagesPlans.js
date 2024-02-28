import { PlanFreeIcon, PlanStarterIcon, PlanPremiumIcon } from '../../assets';
import goodconduct from '../../assets/pricing/good-rating.svg';
import purpleheart from '../../assets/pricing/purpleheart.svg';
import bronzestar from '../../assets/pricing/bronzestar.png';
import silverstar from '../../assets/pricing/silverstar.jpeg';
import medalofhonor from '../../assets/pricing/medalofhonor.svg';
import preseindentialaward from '../../assets/pricing/presidential-chair.svg';

export const _pricingPlans = [
    {
        subscription: 'good conduct',
        icon: goodconduct,
        price: 2000,
        caption: 'No Extra Meal Tickets',
        lists: [
            { text: 'Beverage Cart on Course', isAvailable: true },
            { text: 'Sponsorship & Advertising', isAvailable: true },
            { text: 'Hole Sponsorship - Advertising on Hole', isAvailable: true },
            { text: 'Putting & Target Putting Contest', isAvailable: true },
            { text: 'Continual Advertising on Main Screen', isAvailable: false },
            { text: 'Advertising Recognition on Website, Social Media & Email Blasts', isAvailable: false },
            { text: 'Recognition of Your Sponsorship on the course', isAvailable: false },
            { text: 'Access to "soft marketing" for your company', isAvailable: false },
            // { text: 'Interact with full field of golfers', isAvailable: false },
            {
                text: 'Gift Advertising & Recognition in Gift Bag to full field of Golfers (sponsor provided)',
                isAvailable: false,
            },
        ],
        labelAction: 'choose good conduct',
    },
    {
        subscription: 'purple heart',
        icon: purpleheart,
        price: 3000,
        caption: 'Extra Meal Tickets $35',
        lists: [
            { text: '0ne Foursome - Golf Entry and Cart Fee', isAvailable: true },
            { text: 'One Sponsor Meal', isAvailable: true },
            { text: 'Sponsorship Recognition on Course', isAvailable: true },
            { text: 'Continual Advertising on Main Screen', isAvailable: false },
            { text: 'Sponsor seating at Meal Event & Prize Presentation', isAvailable: false },
            { text: 'Advertising Recognition on Website, Social Media & Email Blasts', isAvailable: false },
            { text: 'Access to "soft marketing" for your company', isAvailable: false },
            { text: 'Interact with full field of golfers', isAvailable: false },
            {
                text: 'Gift Advertising & Recognition in Gift Bag to full field of Golfers (sponsor provided)',
                isAvailable: false,
            },
        ],
        labelAction: 'choose purple heart',
    },
    {
        subscription: 'bronze star',
        icon: bronzestar,
        price: 4500,
        caption: 'Extra Meal Tickets $35',
        lists: [
            { text: 'One Foursome', isAvailable: true },
            { text: 'Golf Entry and Cart Fees', isAvailable: true },
            { text: 'Two sponsor seating at Meal Event & Prize Presentation', isAvailable: true },
            { text: 'Sponsorship Recognition on Course', isAvailable: true },
            { text: 'Access to "soft marketing" for your company', isAvailable: true },
            { text: 'Interact with full field of golfers', isAvailable: true },
            { text: 'Continual Advertising on Main Screen', isAvailable: true },
            { text: 'Advertising Recognition on Website, Social Media & Email Blasts', isAvailable: true },
            {
                text: 'Gift Advertising & Recognization in Gift Bag to full field of Golfers (sponsor provided)',
                isAvailable: true,
            },
        ],
        labelAction: 'choose bronze star',
    },
    {
        subscription: 'silver star',
        icon: silverstar,
        price: 6500,
        caption: 'Extra Meal Tickets $35',
        lists: [
            { text: 'Two Foursomes - Golf Entry & Golf Cart Fees', isAvailable: true },
            { text: 'Two sponsor seating at Meal Event & Prize Presentation', isAvailable: true },
            { text: 'Sponsorship Recognition on Course', isAvailable: true },
            { text: 'Access to "soft marketing" for your company', isAvailable: true },
            { text: 'Interact with full field of golfers', isAvailable: true },
            { text: 'Continual Advertising on Main Screen', isAvailable: true },
            { text: 'Advertising Recognition on Website, Social Media & Email Blasts', isAvailable: true },
            {
                text: 'Gift Advertising & Recognization in Gift Bag to full field of Golfers (sponsor provided)',
                isAvailable: true,
            },
            { text: 'Recognization Award', isAvailable: false },
        ],
        labelAction: 'choose silver star',
    },
    {
        subscription: 'medal of honor award',
        icon: medalofhonor,
        price: 10000,
        caption: 'Extra Meal Tickets $35',
        lists: [
            { text: 'Three Foursomes - Golf Entry & Golf Cart Fees', isAvailable: true },
            { text: 'Three sponsor seating at Meal Event & Prize Presentation', isAvailable: true },
            { text: 'Sponsorship Recognition on Course', isAvailable: true },
            { text: 'Access to "soft marketing" for your company', isAvailable: true },
            { text: 'Interact with full field of golfers', isAvailable: true },
            { text: 'Continual Advertising on Main Screen', isAvailable: true },
            { text: 'Advertising Recognition on Website, Social Media & Email Blasts', isAvailable: true },
            {
                text: 'Gift Advertising & Recognization in Gift Bag to full field of Golfers (sponsor provided)',
                isAvailable: true,
            },
            { text: 'Recognization Award', isAvailable: false },
        ],
        labelAction: 'choose medal of honor award',
    },
    {
        subscription: 'Presidential Unit Citation Award',
        icon: preseindentialaward,
        price: 15000,
        caption: 'Extra Meal Tickets $35',
        lists: [
            { text: 'Foure Foursomes - Golf Entry & Golf Cart Fees', isAvailable: true },
            { text: 'Recognization Award', isAvailable: true },
            { text: 'Four sponsor seating at Meal Event & Prize Presentation', isAvailable: true },
            { text: 'Sponsorship Recognition on Course', isAvailable: true },
            { text: 'Access to "soft marketing" for your company', isAvailable: true },
            { text: 'Interact with full field of golfers', isAvailable: true },
            { text: 'Continual Advertising on Main Screen', isAvailable: true },
            { text: 'Advertising Recognition on Website, Social Media & Email Blasts', isAvailable: true },
            {
                text: 'Gift Advertising & Recognization in Gift Bag to full field of Golfers (sponsor provided)',
                isAvailable: true,
            },
        ],
        labelAction: 'choose PUCA',
    },
];
