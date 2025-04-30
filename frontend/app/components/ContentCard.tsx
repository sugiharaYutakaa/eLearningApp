"use client";

import Link from "next/link";
import { useState } from "react";
import { FaHeart, FaRegHeart, FaStar, FaRegStar } from "react-icons/fa";
import { Content } from "@/app/mockData/contents";

type Props = {
  content: Content;
};

export default function ContentCard({ content }: Props) {
  const [liked, setLiked] = useState(content.liked);
  const [bookmarked, setBookmarked] = useState(content.bookmarked);
  const [likesCount, setLikesCount] = useState(content.likes);

  const difficultyColor = {
    初級: "bg-[#043E69]",
    中級: "bg-yellow-500",
    上級: "bg-red-600",
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (liked) {
      setLikesCount((prev) => prev - 1);
    } else {
      setLikesCount((prev) => prev + 1);
    }
    setLiked(!liked);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setBookmarked(!bookmarked);
  };

  return (
    <Link href={`/content-detail/${content.id}`} passHref>
      <div className="bg-[#F3F3F3] rounded-lg p-4 shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform duration-300">
        {/* 上部：難易度・いいね・ブックマーク */}
        <div className="flex justify-between items-start mb-4">
          <div
            className={`px-3 py-1 text-white text-sm rounded-full ${
              difficultyColor[content.difficulty]
            }`}
          >
            {content.difficulty}
          </div>

          <div className="flex items-center gap-4">
            {/* いいねアイコン＋数 */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleLikeClick}
                className="flex items-center justify-center"
              >
                {liked ? (
                  <FaHeart size={20} color="#E06969" />
                ) : (
                  <FaRegHeart size={20} color="#827979" />
                )}
              </button>
              <span className="text-xs text-gray-600">{likesCount}</span>
            </div>

            {/* ブックマーク */}
            <button
              onClick={handleBookmarkClick}
              className="flex items-center justify-center"
            >
              {bookmarked ? (
                <FaStar size={20} color="#FFD700" />
              ) : (
                <FaRegStar size={20} color="#827979" />
              )}
            </button>
          </div>
        </div>

        {/* タイトル */}
        <h2 className="text-[#021F35] text-xl font-semibold mb-3">
          {content.title}
        </h2>

        {/* 使用言語タグ */}
        <div className="flex flex-wrap gap-2 mb-4">
          {content.tags.map((tag) => (
            <span
              key={tag}
              className="bg-[#E06969] text-[#F3F3F3] text-xs px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 制作日・閲覧数 */}
        <div className="flex justify-between text-sm text-gray-600">
          <span>制作日：{content.createdAt}</span>
          <span>閲覧数：{content.views}</span>
        </div>
      </div>
    </Link>
  );
}
