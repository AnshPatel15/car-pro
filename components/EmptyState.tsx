"use client";

import { useRouter } from "next/navigation";
import ButtonTwo from "./ButtonTwo";
import Heading from "./Heading";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  onRemoveFilters?: () => void;
  buttonLabel?: string;
}

const EmptyState = ({
  title = "No exact matches",
  subtitle = "Try changing some of your filters",
  showReset,
  onRemoveFilters,
  buttonLabel,
}: EmptyStateProps) => {
  const router = useRouter();
  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading center title={title} subtitle={subtitle} />
      <div className=" w-48 mt-4">
        {showReset && (
          <ButtonTwo
            outline
            label={buttonLabel ? buttonLabel : "Remove all filters"}
            //TODO onClick={() => router.push("/")} add when converted back to server side
            onClick={onRemoveFilters}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
