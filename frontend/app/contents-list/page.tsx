"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ContentCard from "@/app/components/ContentCard";
import { contentsList } from "@/app/mockData/contents";
import { FaHtml5, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useState } from "react";

export default function ContentsListPage() {
  // カテゴリー情報
  const categoryTags = ["HTML", "CSS"];
  const categoryTitle = "HTML&CSS";
  const categoryDescription = "Webページの見た目を作る言語";

  // タグリスト（フィルター用、カテゴリータグ除外）
  const allTags = Array.from(
    new Set(
      contentsList
        .flatMap((content) => content.tags)
        .filter((tag) => !categoryTags.includes(tag))
    )
  );

  // 状態管理
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [keyword, setKeyword] = useState(""); // ←キーワード検索用
  const [sortKey, setSortKey] = useState<"createdAt" | "likes" | "views">(
    "createdAt"
  ); // ←プルダウン
  const [sortOrderAsc, setSortOrderAsc] = useState(false); // ←昇順/降順切り替え

  // フィルター＆検索＆ソートされたコンテンツリスト
  const filteredContents = contentsList
    .filter((content) => {
      // キーワード検索
      if (keyword) {
        const keywordLower = keyword.toLowerCase();
        const matchTitle = content.title.toLowerCase().includes(keywordLower);
        const matchTags = content.tags.some((tag) =>
          tag.toLowerCase().includes(keywordLower)
        );
        if (!matchTitle && !matchTags) {
          return false;
        }
      }

      // 言語フィルター
      if (selectedTags.length > 0) {
        return content.tags.some((tag) => selectedTags.includes(tag));
      }
      return true; // フィルターがない場合は全部表示
    })
    .sort((a, b) => {
      let compareValue = 0;
      if (sortKey === "createdAt") {
        compareValue =
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else {
        compareValue = (a[sortKey] as number) - (b[sortKey] as number);
      }
      return sortOrderAsc ? compareValue : -compareValue;
    });

  // タグのオンオフ切り替え
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#D9ECF4]">
      {/* ヘッダー */}
      <Header />

      <main className="flex-1 py-10 px-4">
        {/* 検索エリア */}
        <div className="max-w-6xl mx-auto flex justify-end mb-4">
          <input
            type="text"
            placeholder="キーワード検索..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-64"
          />
        </div>

        {/* タイトルと説明 */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-[#E06969] rounded-full flex items-center justify-center mr-4">
              <FaHtml5 size={32} color="#F3F3F3" />
            </div>
            <h1 className="text-3xl font-bold text-[#021F35]">
              {categoryTitle}
            </h1>
          </div>
          <p className="text-[#827979] text-sm">{categoryDescription}</p>
        </div>

        {/* ソートエリア */}
        <div className="max-w-6xl mx-auto flex justify-end items-center mb-6 gap-2">
          <select
            value={sortKey}
            onChange={(e) =>
              setSortKey(e.target.value as "createdAt" | "likes" | "views")
            }
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="createdAt">新着順</option>
            <option value="likes">いいね順</option>
            <option value="views">閲覧数順</option>
          </select>
          <button
            onClick={() => setSortOrderAsc(!sortOrderAsc)}
            className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded"
          >
            {sortOrderAsc ? <FaArrowUp /> : <FaArrowDown />}
          </button>
        </div>

        {/* フィルタータグ */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {allTags.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
                  isSelected
                    ? "bg-[#E06969] text-[#F3F3F3]"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* コンテンツ一覧 */}
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2">
          {filteredContents.map((content) => (
            <ContentCard key={content.id} content={content} />
          ))}
        </div>
        {/* Backボタン */}
        <div className="max-w-6xl mx-auto mt-10 mb-10">
          <button
            onClick={() => window.history.back()}
            className="border border-[#021F35] text-[#021F35] bg-transparent px-6 py-2 rounded-md text-sm font-semibold hover:bg-[#021F35] hover:text-[#F3F3F3] transition"
          >
            Back
          </button>
        </div>
      </main>

      {/* フッター */}
      <Footer />
    </div>
  );
}
