"use client";

import Link from "next/link";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#087BD2] px-6 py-4 flex justify-between items-center">
      {/* ロゴ */}
      <Link href="/home" className="text-[#F3F3F3] text-2xl font-bold">
        elearning
      </Link>

      {/* アイコンとメニューをまとめるコンテナ */}
      <div
        className="relative"
        onMouseEnter={() => setMenuOpen(true)}
        onMouseLeave={() => setMenuOpen(false)}
      >
        {/* アイコンボタン */}
        <button>
          <FaUserCircle size={32} color="#F3F3F3" />
        </button>

        {/* ホバー時に表示されるメニュー */}
        <div
          className={`absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg py-2 flex flex-col transition-all duration-200 ${
            menuOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-2"
          }`}
        >
          <Link
            href="/my-page"
            className="px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            マイページ
          </Link>
          <Link
            href="/admin-users"
            className="px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            管理者
          </Link>
          <button
            onClick={() => alert("ログアウト処理をここに追加")}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
          >
            ログアウト
          </button>
        </div>
      </div>
    </header>
  );
}
