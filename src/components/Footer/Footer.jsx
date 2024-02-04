import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="ml-2  tertiary_bg px-8 py-16 mb-20">
      <div className="grid grid-cols-12 ">
        <div className="col-span-3 text-sm">
          <ul>
            <li className="font-bold mb-4 text-3xl">Company</li>
            <li className="text-gray-400 my-2 text-xl">About</li>
            <li className="text-gray-400 my-2 text-xl">Jobs</li>
            <li className="text-gray-400 my-2 text-xl">For the Record</li>
          </ul>
        </div>
        <div className="col-span-3">
          <ul>
            <li className="font-bold text-3xl">Communities</li>
            <li className="text-gray-400 my-2 text-xl">For Artists</li>
            <li className="text-gray-400 my-2 text-xl">Developers</li>
            <li className="text-gray-400 my-2 text-xl">Advertising</li>
            <li className="text-gray-400 my-2 text-xl">Investors</li>
            <li className="text-gray-400 my-2 text-xl">Vendors</li>
          </ul>
        </div>
        <div className="col-span-3">
          <ul>
            <li className="font-bold text-3xl">Useful links</li>
            <li className="text-gray-400 my-2 text-xl">Support</li>
            <li className="text-gray-400 my-2 text-xl">Free Mobile App</li>
          </ul>
        </div>
        <div className="col-span-3">
          <div className="flex justify-end gap-7">
            <FaFacebook className="text-5xl p-2 rounded-full bg-[#292929] shadow-2xl hover:bg-white/10" />
            <FaInstagram className="text-5xl p-2 rounded-full bg-[#292929] shadow-2xl hover:bg-white/10" />
            <FaTwitter className="text-5xl p-2 rounded-full bg-[#292929] shadow-2xl hover:bg-white/10" />
          </div>
        </div>
      </div>
      <div className="border-b border-white/10 my-8 w-full"></div>
      <div className="flex justify-between">
        <ul className="text-xl flex gap-4">
          <li className="text-gray-400 ">Legal</li>
          <li className="text-gray-400">Privacy Center</li>
          <li className="text-gray-400">Privacy Policy</li>
          <li className="text-gray-400">Cookies</li>
          <li className="text-gray-400">About Ads</li>
          <li className="text-gray-400">Accessibility</li>
        </ul>
        <h4 className="text-gray-400 text-sm">© 2024 Spotify AB</h4>
      </div>
    </div>
  );
};

export default Footer;
