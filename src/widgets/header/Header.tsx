import {Navbar} from './Navbar'
import {TypographyH1} from '@/components/ui/typography-h1'

export const Header = () => {
    return (
        <header className="flex h-14 items-center bg-gray-500">
            <TypographyH1 className="pb-1 pl-5 pr-10 text-gray-300">
                Movies
            </TypographyH1>
            <Navbar />
        </header>
    )
}
