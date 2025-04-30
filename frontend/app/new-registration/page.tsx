"use client";

import { useState } from "react";

const LANGUAGES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "Go",
  "Ruby",
  "PHP",
  "Swift",
  "Kotlin",
];

export default function NewRegistrationPage() {
  const years = Array.from({ length: 21 }, (_, i) => 2010 + i);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const [name, setName] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [joinYear, setJoinYear] = useState("");

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const isFormValid =
    name.trim() !== "" &&
    employeeNumber.trim() !== "" &&
    joinYear.trim() !== "";

  const handleEmployeeNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      // 数字だけ許可
      setEmployeeNumber(value);
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-left text-[#021F35] mb-10">
          新規登録
        </h1>

        {/* 名前 */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-[#021F35] mb-2">
            名前 <span className="text-red-500 text-sm ml-2">※必須</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="名前を入力"
            className="w-full border border-gray-300 rounded px-4 py-2 text-[#021F35] placeholder-gray-400"
          />
        </div>

        {/* 社員番号 */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-[#021F35] mb-2">
            社員番号 <span className="text-red-500 text-sm ml-2">※必須</span>
          </label>
          <input
            type="text"
            value={employeeNumber}
            onChange={handleEmployeeNumberChange}
            placeholder="社員番号を入力（数字のみ）"
            className="w-full border border-gray-300 rounded px-4 py-2 text-[#021F35] placeholder-gray-400"
          />
        </div>

        {/* 入社年度 */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-[#021F35] mb-2">
            入社年度 <span className="text-red-500 text-sm ml-2">※必須</span>
          </label>
          <select
            value={joinYear}
            onChange={(e) => setJoinYear(e.target.value)}
            className="w-60 border border-gray-300 rounded px-3 py-2 text-[#021F35]"
          >
            <option value="">選択してください</option>
            {years.map((year) => (
              <option key={year} value={String(year)}>
                {year}年
              </option>
            ))}
          </select>
        </div>

        {/* 興味のあるコンテンツ */}
        <div className="mb-4">
          <label className="block text-lg font-semibold text-[#021F35] mb-2">
            興味のあるコンテンツ
          </label>
        </div>

        {/* 選択ボタン */}
        <div className="mb-4">
          <button
            onClick={() => setModalOpen(true)}
            className="border border-[#021F35] text-[#021F35] px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            カテゴリーを選択
          </button>
        </div>

        {/* 選択結果表示枠 */}
        <div className="min-h-[60px] border border-gray-300 rounded p-3 mb-10 text-[#021F35]">
          {selectedLanguages.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedLanguages.map((lang) => (
                <span
                  key={lang}
                  className="bg-[#E06969] text-white px-3 py-1 rounded-full text-sm"
                >
                  {lang}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">選択されたカテゴリーはありません</p>
          )}
        </div>

        {/* 下部 登録ボタン */}
        <div className="flex justify-center">
          <button
            disabled={!isFormValid}
            className={`px-6 py-2 rounded text-sm font-semibold transition ${
              isFormValid
                ? "bg-[#087BD2] text-[#F3F3F3] hover:opacity-90"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            登録
          </button>
        </div>
      </div>

      {/* モーダル */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-[#021F35] mb-4">
              カテゴリーを選択
            </h2>
            <div className="flex flex-wrap gap-3 mb-6">
              {LANGUAGES.map((lang) => {
                const isSelected = selectedLanguages.includes(lang);
                return (
                  <button
                    key={lang}
                    onClick={() => toggleLanguage(lang)}
                    className={`px-4 py-2 rounded-full border transition ${
                      isSelected
                        ? "bg-[#E06969] text-white border-[#E06969]"
                        : "text-[#021F35] border-[#021F35] hover:bg-gray-100"
                    }`}
                  >
                    {lang}
                  </button>
                );
              })}
            </div>

            {/* 登録ボタン */}
            <div className="flex justify-center">
              <button
                onClick={() => setModalOpen(false)}
                className="w-40 bg-[#087BD2] text-[#F3F3F3] py-2 rounded hover:opacity-90 transition"
              >
                登録
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
