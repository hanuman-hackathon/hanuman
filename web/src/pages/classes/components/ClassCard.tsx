import { Link } from "react-router-dom";
import CardArrowIcon from "../assets/CardArrowIcon";
import { Class } from "../../class/types";

type ClassCardProps = Class;

export default function ClassCard({
  class_id,
  created_at,
  name,
}: ClassCardProps) {
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
          Created on {created_at.toISOString()}
        </span>
      </div>
    </div>
  );
}
