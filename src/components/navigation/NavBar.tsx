import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { AvatarImage } from "../ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Menu, UserRound } from "lucide-react";
import { useMood } from "@/utils/MoodContext";


export default function NavBar () {
    const [open, setOpen] = useState(false);
    const {isAuthenticated, user, loginWithRedirect, logout} = useAuth0();

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "History", path: "/history" },
        { name: "Mood Calendar", path: "/calendar" },
        { name: "Get Help", path: "/help" },
    ]

    const handleLogout = () => {
        logout({ 
          logoutParams: { 
            returnTo: window.location.origin 
          } 
        })
      }

    const handleLogin = async() => {
      await loginWithRedirect({
        appState: {
          returnTo: "/",
        }
      })
    }    

    const handleLogoutOrLogin = () => {
        if (isAuthenticated) {
            handleLogout();
        } else {
            handleLogin();
        }
    };

    const {theme} = useMood();

  return (
    <header className={`flex items-center justify-between px-4 py-2 border-b ${theme.background} min-h-24`}>
        <div className="flex items-center gap-2">
            <img src="/love-frame-icon.png" alt="Love Frame Icon" className="w-18 h-18 ml-4" />
            {/* <span className="text-lg font-semibold">Truth Mirror</span> */}
        </div>
        {/*Desktop Navigation*/}
        <div className="flex items-end gap-8 align-middle">
         {isAuthenticated && (
            <nav className="hidden md:flex items-center pb-1.5 gap-8">
                {navLinks.map((link) => (
                    <Link key={link.name} to={link.path} className="hover:underline">
                        {link.name}
                    </Link>
                ))}
            </nav>)}
            <div className="hidden md:flex items-center gap-8 mr-4">
                {isAuthenticated &&  (
                    <Avatar className="w-8 h-8 align-bottom">
                        <AvatarImage src={user?.picture} alt={user?.name+'-picture'} className="rounded-full"/>
                        <AvatarFallback> 
                            <UserRound className={`${theme.heading}`} />
                        </AvatarFallback>
                    </Avatar>
                )}
                <Button variant="outline" className={`${theme.accent} ${theme.text}`} onClick={handleLogoutOrLogin}> {isAuthenticated? "Logout" :"Login"} </Button> 
            </div>
        </div>
        {/*Mobile Navigation*/}
        <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <div className="flex items-center justify-between mb-4 p-2.5">
                        <span className="text-lg font-semibold">Truth Mirror</span>
                    </div>
                    <nav className="flex flex-col gap-4 p-2.5">
                        {navLinks.map((link)=> (
                            isAuthenticated && (
                            <Link key={link.name} to={link.path} className="text-base" onClick={() => setOpen(false)}>
                                {link.name}
                            </Link>)
                        ))}
                        {isAuthenticated &&  (
                            <Avatar className="w-10 h-10 mb-4">
                                <AvatarImage src={user?.picture} alt={user?.name+'-picture'} className="rounded-full"/>
                                <AvatarFallback> CN </AvatarFallback>
                            </Avatar>
                        )}
                        <Button variant="outline"> {isAuthenticated?"Logout" :"Login"} </Button> 
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    </header>
  );
}
