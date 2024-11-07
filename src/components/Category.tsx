import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";
import { useEffect, useRef, useState } from "react";
type CategoryPillProps = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};
const TRANSLATE_AMOUNT = 200;

const Category = ({
  categories,
  selectedCategory,
  onSelect,
}: CategoryPillProps) => {
  const [translate, settranslate] = useState(0);
  const [isLeftVisible, setIsLeftVisible] = useState(true);
  const [isRightVisible, setIsRightVisible] = useState(true);
  const contenerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contenerRef.current === null) return;
    const observer = new ResizeObserver((entry) => {
      const containner = entry[0]?.target;
      if (containner == null) return;

      setIsLeftVisible(translate > 0);
      setIsRightVisible(
        translate + containner.clientWidth < containner.scrollWidth
      );
    });
    observer.observe(contenerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [categories, translate]);

  // ==========================>

  return (
    <div ref={contenerRef} className="overflow-hidden relative">
      <div
        className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]"
        style={{ transform: `translateX(-${translate}px)` }}
      >
        {categories.map((category, index) => (
          <Button
            key={index}
            onClick={() => onSelect(category)}
            variant={selectedCategory === category ? "dark" : "default"}
            className="py-1 px-3 rounded-lg whitespace-nowrap"
          >
            {category}
          </Button>
        ))}
      </div>
      {isLeftVisible && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
          <Button
            variant="ghost"
            size="icon"
            className="h-full aspect-square w-auto p-1.5"
            onClick={() => {
              settranslate((translate) => {
                const newtranslate = translate - TRANSLATE_AMOUNT;
                if (newtranslate <= 0) return 0;
                return newtranslate;
              });
            }}
          >
            <ChevronLeft />
          </Button>
        </div>
      )}
      {isRightVisible && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="h-full aspect-square w-auto p-1.5"
            onClick={() => {
              settranslate((translate) => {
                if (contenerRef.current == null) {
                  return translate;
                }
                const newtranslate = translate + TRANSLATE_AMOUNT;
                const edge = contenerRef.current.scrollWidth;
                const width = contenerRef.current.clientWidth;
                if (newtranslate + width >= edge) {
                  const su = edge - width;
                  console.log(su);
                  return su;
                }
                return newtranslate;
              });
            }}
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Category;
