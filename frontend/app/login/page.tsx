"use client";

import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen relative">
      {/* 背景グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#27A9C800] to-[#27A9C8CC] z-0" />

      {/* 背景 */}
      <Image
        src="/haikei.png"
        alt="背景画像"
        fill
        className="object-cover z-[-1]"
      />

      <div className="relative z-10 flex min-h-screen">
        {/* 左側 */}
        <div className="w-1/2 flex items-center justify-center">
          <div className="text-white font-bold leading-tight">
            <p className="text-5xl">welcome to</p>
            <p className="text-5xl ml-30 mt-10">elearning</p>
          </div>
        </div>

        {/* 右側 */}
        <div className="w-1/2 flex items-center justify-center">
          <div className="w-80 h-80 rounded-full bg-white/80 shadow-lg flex flex-col items-center justify-center text-center p-6">
            <p className="text-3xl  text-gray-700 mb-14">please sign in</p>
            <button className="bg-[#72A5CD] text-[#125A6C] px-6 py-2 rounded-full font-semibold shadow-md hover:brightness-105 transition">
              login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
