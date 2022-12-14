function Header() {
  return (
    <ul className="flex ml-auto w-full font-bold headeroptions mx-20">
      <li className="text-xs text-gray-800 mr-6 mt-2 alert-notice border-b-2 border-green-400 cursor-pointer">
        Weather
      </li>
      <li className="text-xs text-gray-800 mr-6 mt-2 cursor-pointer border-b-2 hover:border-green-400">
        Map
      </li>
      <li className="text-xs text-gray-800 mt-2 cursor-pointer border-b-2 hover:border-green-400">
        News
      </li>
    </ul>
  );
}
export default Header;
