import { Tab } from "@/types/Project";
const links: Tab[] = [Tab.PDF, Tab.NOTES, Tab.TASKS, Tab.GPT];

const NavMenu = ({setCurrentTab}: {setCurrentTab: React.Dispatch<React.SetStateAction<Tab>>}) => {
  return (
   <div className="flex  justify-between">
    {links.map((link: Tab) => (
      <div key={link}
       onClick={() => setCurrentTab(link)}
       className="flex justify-center
       text-white bg-zinc-700 hover:bg-zinc-500 cursor-pointer rounded-sm p-2 w-28">  
        <p className="text-lg font-bold">{link}</p>
      </div>
    ))}
   </div>    
  )
}

export default NavMenu
