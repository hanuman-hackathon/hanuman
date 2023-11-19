import { Link } from "react-router-dom";
import CardArrowIcon from "../assets/CardArrowIcon";
import { Class } from "../../class/types";

type ClassCardProps = Class;

export default function ClassCard({
  class_id,
  created_at,
  name,
}: ClassCardProps) {
  const date = new Date(created_at);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDate = date.toLocaleDateString(undefined, options as any);

  return (
    <div className="w-[380px] h-[200px] bg-white rounded-xl shadow-standard px-8 py-6 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-off-black">{name}</span>
        <Link to={`/classes/${class_id}`}>
          <CardArrowIcon />
        </Link>
      </div>
      <div>
        <span className="text-gray-400 text-md">
          Created on {formattedDate}
        </span>
      </div>
    </div>
  );
}
