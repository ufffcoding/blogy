import React from "react";
import { Link } from "react-router-dom";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IconButton } from "@mui/material";

const navigation = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Profile",
    link: "/profile",
  },
];

const social = [
  {
    name: "X",
    link: "https://x.com/ideepanshuverma",
  },
  {
    name: "Linkedin",
    link: "https://linkedin.com/in/yourdeepanshuverma",
  },
  {
    name: "Instagram",
    link: "https://instagram.com/ufffcoding",
  },
];

export default function Footer({ isDarkMode, toggleDarkMode }) {
  return (
    <footer className="relative flex min-h-40 w-full flex-col justify-center divide-y divide-gray-500 border-t-2 border-black p-4 font-poppins lg:flex-row lg:gap-40 lg:divide-none lg:pt-4 bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      <div className="py-4 lg:self-center lg:py-0">
        <Link className="text-xl font-bold">Blogy</Link>
      </div>
      <div className="flex flex-col gap-4 py-4 lg:flex-row lg:gap-8 lg:self-center lg:py-0">
        <div className="flex flex-col gap-2">
          <h6 className="text-lg font-semibold">Navigation</h6>
          <div className="flex flex-col gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className="text-xs font-medium hover:text-gray-600 dark:hover:text-gray-300"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h6 className="text-lg font-semibold">Social Media</h6>
          <div className="flex flex-col gap-1">
            {social.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className="text-xs font-medium hover:text-gray-600 dark:hover:text-gray-300"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute flex items-center bottom-2 right-2">
        {isDarkMode ? "Dark" : "Light"}
        <IconButton sx={{ ml: 1 }} onClick={toggleDarkMode} color="inherit">
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </div>
    </footer>
  );
}
