import Config from "@/config";
import * as React from "react";
import Image from "next/image";

interface MovieCardInterface {
  title: string;
  score: number;
  photoPath: string;
  year: number;
  description: string;
  id: number; 
}

const MovieCard: React.FC<MovieCardInterface> = ({
  title,
  score,
  photoPath,
  year,
  description,
}) => {
  const photo = Config.IMAGE_SOURCE + photoPath;
  const fullStars = Math.round(score / 2);

  return (
    <div className="flex flex-col justify-between items-center rounded-3xl max-w-[290px] min-h-[580px] shadow-md group border-2 border-blue-500 bg-[#0f172a] text-white font-sans overflow-hidden hover:shadow-blue-500/30 hover:scale-105 transition-transform duration-200">
      
      <Image
        src={photo}
        width={290}
        height={390}
        alt={title}
        className="w-full h-[390px] object-cover rounded-t-3xl"
      />

      <div className="flex flex-col items-center px-4 text-center">
        <p className="pt-3 pb-1.5 group-hover:font-bold text-xl font-bold">{title}</p>
        <p className="pb-2 text-base text-gray-300">({year})</p>

        {/* Estrellas caricaturescas */}
        <div className="flex justify-center gap-1 pb-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Image
              key={i}
              src="/star-full.png"
              alt="Estrella"
              width={24}
              height={24}
              className={i < fullStars ? "" : "opacity-20"}
            />
          ))}
        </div>

        <p className="text-center text-yellow-400 text-lg font-[cursive] tracking-wide">
          {score.toFixed(1)} / 10
        </p>
      </div>

      <div className="pb-6" />
    </div>
  );
};

export default MovieCard;
