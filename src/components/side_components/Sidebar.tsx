import { CurrentCondition } from "./CurrentCondition";
import CurrentLocation from "./CurrentLocation";
import Searchbar from "./Searchbar";
import FadeModalDialog from "./Modal";
import ModeToggle from "../NightButton";

export default function Sidebar() {
    return (
        <div className="lg:shadow-md p-4 h-screen max-customlg:min-h-80vh max-customlg:max-h-max flex flex-col items-center bg-slate-50">
            <div className="">
                <Searchbar />
                <ModeToggle />
            </div>
            <div className="mt-10 max-customlg:mt-5">
                <CurrentCondition />
            </div>
            <div className="w-full mt-auto max-customlg:mt-5">
                <CurrentLocation />
                {/* <p className="text-xs font-extralight mt-2 cursor-pointer text-center hover:text-yellow-600 transition-colors">MADE BY ADAM ABU SAAB</p> */}
                <FadeModalDialog />
            </div>
        </div>
    )
}