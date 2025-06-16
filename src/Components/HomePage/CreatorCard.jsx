import React from "react";

const CreatorCard = ({
  name = "George Johnson",
  title = "Creator of the Year",
  imageUrl = "https://images.unsplash.com/photo-1505866535066-ccebd6b2b98a?w=500&auto=format&fit=crop&q=60",
  buttonLabel = "Follow",
  width = "w-80",
  height = "h-72",
}) => {
  return (
    <div
      className={`
        group relative ${width} ${height} bg-slate-50 flex flex-col items-center justify-center gap-2 text-center 
        rounded-2xl overflow-hidden shadow-md
        before:content-[''] before:absolute before:top-0 before:left-0
        before:${width} before:h-24 before:rounded-t-2xl
        before:bg-gradient-to-bl before:from-sky-200 before:via-orange-200 before:to-orange-700
        before:transition-all before:duration-500 
        group-hover:before:h-44 group-hover:before:rounded-b-2xl
      `}
    >
      {/* Avatar */}
      <div
        className={`
          w-28 h-28 mt-8 rounded-full border-4 border-slate-50 bg-cover bg-center z-10
          transition-all duration-500 
          group-hover:scale-150 group-hover:-translate-x-24 group-hover:-translate-y-20
        `}
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>

      {/* Name & Title */}
      <div className="z-10 transition-all duration-500 group-hover:-translate-y-10">
        <span className="text-2xl font-semibold">{name}</span>
        <p className="text-gray-600">{title}</p>
      </div>

      {/* Button */}
      <a
        href="#"
        className="bg-blue-700 px-4 py-1 text-white rounded-md z-10 transition-all duration-500 hover:scale-110 hover:bg-blue-500"
      >
        {buttonLabel}
      </a>
    </div>
  );
};

export default CreatorCard;
