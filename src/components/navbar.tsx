import { useEffect, useState } from "react";

import { SquareChartGantt } from "lucide-react";
import { Link } from "react-router-dom";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import Image from "../assets/img/looooooggooo.png";

const Navbar = () => {
  const [_, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed left-1/2 z-50 mx-auto mt-[20px] flex h-14 w-[95%] max-w-[1360px] -translate-x-1/2 transform items-center justify-between rounded-[70px] bg-[#244d7fdd] px-10 py-4 shadow-sm transition-all duration-300`}
    >
      <Link to="/" className="z-30 flex items-center font-semibold">
        <img src={Image} alt="Logo" className="h-12 w-28 rounded-sm" />
      </Link>

      <div className="hidden h-full items-center gap-4 lg:flex lg:gap-8">
        {[
          { id: "", label: "Home" },
          { id: "task-list", label: "Task List" },
          { id: "levels", label: "Levels" },
          { id: "profit", label: "Profit" },
          { id: "profile", label: "My" },
        ].map((item) => (
          <Link
            key={item.id}
            to={`/${item.id}`}
            className={`cursor-pointer rounded-md p-2 font-semibold text-white backdrop-blur-lg transition-colors hover:bg-blue-500/20 lg:text-lg`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <SquareChartGantt className="size-6 cursor-pointer" />
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-5">
            <nav className="flex flex-col gap-4 text-lg font-medium">
              {[
                { id: "hero", label: "Home" },
                { id: "features", label: "Features" },
                { id: "mathology-work", label: "How It Works" },
                { id: "testimonials", label: "Testimonials" },
                { id: "faq", label: "FAQ's" },
              ].map((item) => (
                <Link
                  key={item.id}
                  to={`/#${item.id}`}
                  className={`cursor-pointer transition-colors hover:text-blue-600`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="https://student.mathology.io"
                className="rounded-bl-full rounded-br-full rounded-tl-full rounded-tr-lg bg-[#2431DD] p-4 capitalize text-white"
              >
                Get Started
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Navbar;
