import Category from "./components/Category";
import PageHeader from "./Layout/PageHeader";
import { category, videos } from "./data/home";
import { useState } from "react";
import VideoGridItem from "./components/VideoGridItem";
import { Sidebar } from "./components/Sidebar";
import { SidebarProvider } from "./context/sidebarContext";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(category[0]);

  return (
    <SidebarProvider>
      <div className="max-h-screen flex flex-col ">
        <PageHeader />
        <div className="grid grid-cols-[auto,1fr] flex-1 overflow-auto  pt-4">
          <Sidebar />

          <div className="overflow-x-hidden px-8 pb-4">
            <div className="sticky top-0 bg-white x-10 pb-4">
              <Category
                categories={category}
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]">
              {videos.map((video) => (
                <VideoGridItem key={video.id} {...video} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default App;
