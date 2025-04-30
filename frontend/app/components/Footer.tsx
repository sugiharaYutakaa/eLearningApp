"use client";

import Link from "next/link";
import { FaGraduationCap } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#043E69] text-[#F3F3F3] pt-6 pb-4 px-6">
      <div className="border-t border-[#F3F3F3]/30 mb-6"></div>

      <div className="max-w-[700px] mx-auto flex flex-col md:flex-row justify-between items-start mb-6">
        {/* アイコン＋ロゴ */}
        <div className="flex flex-col items-center md:items-start">
          <FaGraduationCap size={36} className="mb-1" />
          <span className="text-xl font-semibold">elearning</span>
        </div>

        {/* リンク */}
        <div className="flex flex-col gap-2 text-sm text-right md:text-left">
          <Link
            href="/contents-list"
            className="hover:underline hover:opacity-90"
          >
            ＞ カテゴリー一覧
          </Link>
          <Link href="/my-page" className="hover:underline hover:opacity-90">
            ＞ マイページ
          </Link>
          <Link href="/contact" className="hover:underline hover:opacity-90">
            ＞ お問い合わせ
          </Link>
        </div>
      </div>

      <div className="text-center text-xs text-[#F3F3F3]/70">
        Copyright PEARE tenant assoc.
      </div>
    </footer>
  );
}
