import logo from "../assets/logo.png";
import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react"; // iconc => npm i lucide-react
import Button from "../components/Button";
import { useState } from "react";
import { useSidebarContext } from "../context/sidebarContext";

// =========================>

const PageHeader = () => {
  const [showFullWidthSearch, setshowFullWidthSearch] = useState(false);

  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 md-6 mx-4">
      {/* ============= */}
      <PageHeaderFirstSections hidden={showFullWidthSearch} />

      {/* =============== */}
      <form
        className={`gap-4 flex-grow justify-center ${
          showFullWidthSearch ? "flex" : "hidden md:flex"
        }`}
      >
        {showFullWidthSearch && (
          <Button
            onClick={() => setshowFullWidthSearch(false)}
            type="button"
            size="icon"
            variant="ghost"
            className="flex-shrink-0"
          >
            <ArrowLeft />
          </Button>
        )}
        <div className="flex flex-grow max-w-[600px]">
          <input
            type="input"
            placeholder="Search"
            className="rounded-l-full border border-secendary-border shadow-inner shadow-secendary py-1 px-4 w-full focus:border-blue-500 outline-none"
          />
          <Button className="py-2 px-4 rounded-r-full border-secondary border border-l-0 flex-shrink-0">
            <Search />
          </Button>
        </div>
        <Button type="button" size="icon" className="flex-shrink-0">
          <Mic />
        </Button>
      </form>

      {/* =============== */}
      <div
        className={`flex-shrink-0 md:gap-2 ${
          showFullWidthSearch ? "hidden" : "flex"
        }`}
      >
        <Button
          onClick={() => setshowFullWidthSearch(true)}
          size="icon"
          variant="ghost"
          className="md:hidden"
        >
          <Search />
        </Button>
        <Button size="icon" variant="ghost" className="md:hidden">
          <Mic />
        </Button>
        <Button size="icon" variant="ghost">
          <Upload />
        </Button>
        <Button size="icon" variant="ghost">
          <Bell />
        </Button>
        <Button size="icon" variant="ghost">
          <User />
        </Button>
      </div>
    </div>
  );
};

export default PageHeader;
type PageHeaderFirstSecttionProps = {
  hidden?: boolean; // hide first section when full width search is active  // =============
};

export function PageHeaderFirstSections({
  hidden = false,
}: PageHeaderFirstSecttionProps) {
  const { toggle } = useSidebarContext();
  return (
    <div
      className={`flex gap-4 items-center flex-shrink-0 ${
        hidden ? "hidden" : "flex"
      }`}
    >
      <Button
        onClick={toggle}
        variant="ghost"
        size="icon"
        className="flex-shrink-0"
      >
        <Menu />
      </Button>
      <a href="/">
        <img src={logo} className="h-10" />
      </a>
    </div>
  );
}
