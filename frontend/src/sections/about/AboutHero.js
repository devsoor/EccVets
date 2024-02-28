import { Hero } from 'src/sections/common/Hero';

// ----------------------------------------------------------------------

export default function GolfHero() {
    const title = `Veterans Club at Encanterra`;
    const content = ` Since 2008, more than 200 veterans living at Encanterra have come together for Camaraderie
    and Fellowship and to honor Veterans. In 2016, we expanded our Mission to assist Arizona
    veterans and their families. Organizations supported by the club have been the Arizona State
    Veteran Home, Project Veterans Pride/James Walton Home, Veterans First LTD and the American
    Service Animal Society. The club is a 501c3 nonprofit. We are an all volunteer organization.`
    return <Hero title={title} content={content}/>

}
