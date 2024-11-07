import {
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Clock,
  Home,
  Library,
  PlaySquare,
  Repeat,
  History,
  ListVideo,
  Flame,
  ShoppingBag,
  Music2,
  Film,
} from "lucide-react";
import { Children, ElementType, ReactNode, useState } from "react";
import { buttonStyles } from "./Button";
import { twMerge } from "tailwind-merge";
import Button from "../components/Button";
import { playlists, subscriptions } from "../data/sidebar";
import { useSidebarContext } from "../context/sidebarContext";
import { PageHeaderFirstSections } from "../Layout/PageHeader";

export const Sidebar = () => {
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext();
  return (
    <>
      <aside
        className={`sticky top-0 overflow-y-auto scrollbar-hidden ml-1  ${
          isLargeOpen ? "lg:hidden" : "lg:block"
        }`}
      >
        <SmallSidebarItem Icon={Home} title="Home" url="/" />
        <SmallSidebarItem Icon={Repeat} title="Shorts" url="/short" />
        <SmallSidebarItem
          Icon={Clapperboard}
          title="Subscriptions"
          url="/subscriptions"
        />
        <SmallSidebarItem Icon={Library} title="Libray" url="/libray" />
      </aside>
      {/* ============ */}
      {isSmallOpen && (
        <div
          onClick={close}
          className="lg:hidden fixed inset-0  z-[999] bg-secondary-dark opacity-50"
        />
      )}
      {/* ============ */}
      <aside
        className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2  ${
          isLargeOpen ? "lg:flex" : "lg:hidden"
        } ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}
      >
        <div className="lg:hidden pt-2 pb-4 px-2 sticky  top-0 bg-white">
          <PageHeaderFirstSections />
        </div>

        <LargSidebarSection>
          <LargeSidebarItem
            isActive
            IconOrImgUrl={Home}
            title="Home"
            url="/Home"
          />
          <LargeSidebarItem
            IconOrImgUrl={Clapperboard}
            title="Subscription"
            url="/Subscription"
          />
        </LargSidebarSection>
        <hr />
        <LargSidebarSection visibleItemCount={5}>
          <LargeSidebarItem
            IconOrImgUrl={Library}
            title="Library"
            url="/library"
          />
          <LargeSidebarItem
            IconOrImgUrl={History}
            title="History"
            url="/history"
          />
          <LargeSidebarItem
            IconOrImgUrl={PlaySquare}
            title="Your Video"
            url="/your-video"
          />
          <LargeSidebarItem
            IconOrImgUrl={Clock}
            title="Watch Later"
            url="/playlist?list=WL"
          />
          {/* -============- */}
          {playlists.map((playlist) => (
            <LargeSidebarItem
              key={playlist.id}
              IconOrImgUrl={ListVideo}
              title={playlist.name}
              url={`/playlist=${playlist.id}`}
            />
          ))}
        </LargSidebarSection>
        <hr />
        <LargSidebarSection title="subscriptions">
          {subscriptions.map((subscription) => (
            <LargeSidebarItem
              key={subscription.id}
              IconOrImgUrl={subscription.imgUrl}
              title={subscription.channelName}
              url={`/@${subscription.id}`}
            />
          ))}
        </LargSidebarSection>
        <LargSidebarSection title="Explore">
          <LargeSidebarItem
            IconOrImgUrl={Flame}
            title="Trending"
            url="/trending"
          />
          <LargeSidebarItem
            IconOrImgUrl={ShoppingBag}
            title="Shopping"
            url="/shopping"
          />
          <LargeSidebarItem IconOrImgUrl={Music2} title="Music" url="/music" />
          <LargeSidebarItem IconOrImgUrl={Film} title="Film" url="/film" />
        </LargSidebarSection>
      </aside>
    </>
  );
};

// =============================>

type SmallSidebarItemprops = {
  Icon: ElementType;
  title: string;
  url: string;
};
function SmallSidebarItem({ Icon, title, url }: SmallSidebarItemprops) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        "py-4 px-1 flex flex-col items-center rounded-lg gap-1"
      )}
    >
      <Icon className="w-6 h-6" />
      <div className="text-sm">{title}</div>
    </a>
  );
}
//===============================>
type Props = {
  children: ReactNode;
  title?: string;
  visibleItemCount?: number;
};

function LargSidebarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: Props) {
  const [isExpand, setIsExpanded] = useState(false);
  const childrenArray = Children.toArray(children).flat();
  const showExpandButton = childrenArray.length > visibleItemCount;
  const visibleChildren = isExpand
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount);
  const ButtonIcon = isExpand ? ChevronUp : ChevronDown;

  return (
    <div>
      {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
      {visibleChildren}
      {showExpandButton && (
        <Button
          onClick={() => setIsExpanded((e) => !e)}
          variant="ghost"
          className="w-full flex items-center rounded-lg gap-4 p-3"
        >
          <ButtonIcon className="w-6 h-6" />
          <div>{isExpand ? "Show Less" : "Show More"}</div>
        </Button>
      )}
    </div>
  );
}

//=================================>
type LargeSidebarItemProps = {
  IconOrImgUrl: ElementType | string;
  title: string;
  url: string;
  isActive?: boolean;
};
function LargeSidebarItem({
  IconOrImgUrl,
  title,
  url,
  isActive = false,
}: LargeSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `w-full flex items-center rounded-lg gap-4 p-3 ${
          isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined
        }`
      )}
    >
      {/* ============== */}
      {typeof IconOrImgUrl === "string" ? (
        <img src={IconOrImgUrl} className="w-6 h-6 rounded-full" />
      ) : (
        <IconOrImgUrl className="w-6 h-6" />
      )}
      {/* ==================== */}

      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  );
}
