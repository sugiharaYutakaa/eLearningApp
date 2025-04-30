"use client";

import { useState } from "react";
import { FaEdit, FaTrash, FaArrowUp, FaArrowDown } from "react-icons/fa";
import Header from "@/app/components/Header";
import AdminSidebar from "@/app/components/AdminSidebar";
import { contentsList } from "@/app/mockData/contents";

const CATEGORIES = ["すべて", "HTML&CSS", "JavaScript", "PHP", "TypeScript"];

export default function AdminContentsListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const [sortKey, setSortKey] = useState<"difficulty" | "createdAt" | null>(
    null
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (key: "difficulty" | "createdAt") => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const filteredContents = contentsList.filter((content) => {
    const matchesTitle = content.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "すべて" || content.tags.includes(selectedCategory);

    return matchesTitle && matchesCategory;
  });

  const sortedContents = [...filteredContents].sort((a, b) => {
    if (!sortKey) return 0;
    if (sortKey === "difficulty") {
      return sortOrder === "asc"
        ? a.difficulty.localeCompare(b.difficulty)
        : b.difficulty.localeCompare(a.difficulty);
    } else {
      return sortOrder === "asc"
        ? a.createdAt.localeCompare(b.createdAt)
        : b.createdAt.localeCompare(a.createdAt);
    }
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#F3F3F3]">
      <Header />

      <div className="flex flex-1">
        {/* サイドバー */}
        <AdminSidebar />

        <main className="flex-1 p-10">
          <div className="max-w-7xl mx-auto">
            {/* タイトル-新規作成ボタン */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-[#021F35]">
                コンテンツ一覧
              </h1>
              <button className="bg-[#087BD2] text-white px-6 py-2 rounded hover:opacity-90 transition">
                新規作成
              </button>
            </div>

            {/* 検索-プルダウン */}
            <div className="flex items-center gap-4 mb-6">
              <input
                type="text"
                placeholder="タイトルで検索"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 w-80 text-[#021F35] placeholder-gray-400"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-[#021F35]"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* テーブル */}
            <div className="bg-white rounded-lg shadow-md overflow-x-auto">
              <table className="min-w-full table-fixed">
                <thead className="bg-[#021F35] text-[#F3F3F3]">
                  <tr>
                    <th className="px-4 py-3 w-2/5 text-left">タイトル</th>
                    <th className="px-4 py-3 w-1/5 text-left">カテゴリー</th>
                    <th
                      className="px-4 py-3 w-1/12 text-left cursor-pointer hover:underline"
                      onClick={() => handleSort("difficulty")}
                    >
                      難易度
                      {sortKey === "difficulty" ? (
                        sortOrder === "asc" ? (
                          <FaArrowUp className="inline ml-1 text-yellow-400" />
                        ) : (
                          <FaArrowDown className="inline ml-1 text-yellow-400" />
                        )
                      ) : (
                        <FaArrowDown className="inline ml-1 opacity-50" />
                      )}
                    </th>
                    <th
                      className="px-4 py-3 w-1/6 text-left cursor-pointer hover:underline"
                      onClick={() => handleSort("createdAt")}
                    >
                      作成日
                      {sortKey === "createdAt" ? (
                        sortOrder === "asc" ? (
                          <FaArrowUp className="inline ml-1 text-yellow-400" />
                        ) : (
                          <FaArrowDown className="inline ml-1 text-yellow-400" />
                        )
                      ) : (
                        <FaArrowDown className="inline ml-1 opacity-50" />
                      )}
                    </th>
                    <th className="px-4 py-3 w-1/12 text-center">いいね数</th>
                    <th className="px-4 py-3 w-1/12 text-center">
                      ブックマーク数
                    </th>
                    <th className="px-4 py-3 w-1/6 text-center">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedContents.map((content) => (
                    <tr
                      key={content.id}
                      className="border-b hover:bg-gray-100 text-[#021F35]"
                    >
                      <td className="px-4 py-3">{content.title}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {content.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="bg-[#E06969] text-white px-2 py-1 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">{content.difficulty}</td>
                      <td className="px-4 py-3">
                        {content.createdAt.replace(/-/g, "/")}
                      </td>
                      <td className="px-4 py-3 text-center">{content.likes}</td>
                      <td className="px-4 py-3 text-center">
                        {content.bookmarked}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center gap-4">
                          <button className="text-[#087BD2] hover:opacity-80">
                            <FaEdit size={18} />
                          </button>
                          <button className="text-[#E06969] hover:opacity-80">
                            <FaTrash size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
