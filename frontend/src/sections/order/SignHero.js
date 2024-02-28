import { Hero } from 'src/sections/common/Hero';

// ----------------------------------------------------------------------

export default function SignHero() {
    const title = `Veterans Community Support Signs`;
    const content = ` We are expanding display of the Community Supporting Veterans Signs to other days dedicated
    to honoring our Country and those who served. The Signs will be displayed in conjunction
    with our traditional "Flags on Encanterra" to include Memorial Day, Fourth of July, Veterans
    Day and our Annual Charity Golf Event.`

    return <Hero title={title} content={content}/>
}
