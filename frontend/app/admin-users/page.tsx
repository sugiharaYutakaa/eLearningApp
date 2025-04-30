"use client";

import { useState } from "react";
import { FaUserShield, FaArrowUp, FaArrowDown } from "react-icons/fa";
import Header from "@/app/components/Header";
import AdminSidebar from "@/app/components/AdminSidebar";

const LANGUAGES = ["すべて", "HTML&CSS", "JavaScript", "PHP"];

const mockUsers = [
  {
    id: 1,
    employeeNumber: "0001",
    name: "山田 太郎",
    joinYear: 2020,
    totalLearnTime: 30,
    isAdmin: false,
    learnTimes: {
      "HTML&CSS": 10,
      JavaScript: 8,
      PHP: 12,
    },
  },
  {
    id: 2,
    employeeNumber: "0002",
    name: "佐藤 花子",
    joinYear: 2021,
    totalLearnTime: 20,
    isAdmin: true,
    learnTimes: {
      "HTML&CSS": 12,
      JavaScript: 5,
      PHP: 3,
    },
  },
  {
    id: 3,
    employeeNumber: "0003",
    name: "鈴木 一郎",
    joinYear: 2019,
    totalLearnTime: 50,
    isAdmin: false,
    learnTimes: {
      "HTML&CSS": 20,
      JavaScript: 15,
      PHP: 15,
    },
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState(mockUsers);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isGranting, setIsGranting] = useState(true);
  const [sortKey, setSortKey] = useState<"joinYear" | "totalLearnTime" | null>(
    null
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("すべて");

  const handleOpenModal = (userId: number, grant: boolean) => {
    setSelectedUserId(userId);
    setIsGranting(grant);
    setModalOpen(true);
  };

  const handleToggleAdmin = () => {
    if (selectedUserId !== null) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === selectedUserId ? { ...user, isAdmin: isGranting } : user
        )
      );
    }
    setModalOpen(false);
  };

  const handleSort = (key: "joinYear" | "totalLearnTime") => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    const matchesNameOrId =
      user.name.toLowerCase().includes(term) ||
      user.employeeNumber.includes(term);

    const matchesAdmin = term.includes("管理者") ? user.isAdmin : true;

    return matchesNameOrId && matchesAdmin;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortKey) return 0;
    if (sortOrder === "asc") {
      return a[sortKey] - b[sortKey];
    } else {
      return b[sortKey] - a[sortKey];
    }
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#F3F3F3]">
      <Header />

      <div className="flex flex-1">
        {/* サイドバー */}
        <AdminSidebar />

        <main className="flex-1 p-10">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold text-[#021F35] mb-6">
              ユーザー一覧
            </h1>

            {/* 検索＋プルダウン */}
            <div className="flex items-center gap-4 mb-6">
              <input
                type="text"
                placeholder="氏名または社員番号で検索"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 w-80 text-[#021F35] placeholder-gray-400"
              />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-[#021F35]"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* テーブル */}
            <div className="bg-white rounded-lg shadow-md overflow-x-auto">
              <table className="min-w-full table-fixed">
                <thead className="bg-[#021F35] text-[#F3F3F3]">
                  <tr>
                    <th className="px-4 py-3 w-32 text-left">社員番号</th>
                    <th className="px-4 py-3 w-48 text-left">氏名</th>
                    <th
                      className="px-4 py-3 w-40 text-left cursor-pointer hover:underline"
                      onClick={() => handleSort("joinYear")}
                    >
                      入社年度{" "}
                      {sortKey === "joinYear" ? (
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
                      className="px-4 py-3 w-48 text-left cursor-pointer hover:underline"
                      onClick={() => handleSort("totalLearnTime")}
                    >
                      {selectedLanguage === "すべて"
                        ? "総学習時間"
                        : `${selectedLanguage}学習時間`}{" "}
                      {sortKey === "totalLearnTime" ? (
                        sortOrder === "asc" ? (
                          <FaArrowUp className="inline ml-1 text-yellow-400" />
                        ) : (
                          <FaArrowDown className="inline ml-1 text-yellow-400" />
                        )
                      ) : (
                        <FaArrowDown className="inline ml-1 opacity-50" />
                      )}
                    </th>
                    <th className="px-4 py-3 w-32 text-center">管理者</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b hover:bg-gray-100 text-[#021F35]"
                    >
                      <td className="px-4 py-3">{user.employeeNumber}</td>
                      <td className="px-4 py-3">{user.name}</td>
                      <td className="px-4 py-3">{user.joinYear}</td>
                      <td className="px-4 py-3">
                        {selectedLanguage === "すべて"
                          ? `${user.totalLearnTime}時間`
                          : `${
                              user.learnTimes[
                                selectedLanguage as keyof typeof user.learnTimes
                              ] ?? 0
                            }時間`}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() =>
                            handleOpenModal(user.id, !user.isAdmin)
                          }
                          className={
                            user.isAdmin
                              ? "text-green-500"
                              : "text-[#087BD2] hover:opacity-80 transition"
                          }
                        >
                          <div className="flex flex-col items-center">
                            <FaUserShield size={20} />
                            {user.isAdmin && (
                              <span className="text-xs mt-1 font-bold">
                                管理者
                              </span>
                            )}
                          </div>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* モーダル */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-xl font-bold text-[#021F35] mb-4">
              {isGranting ? "権限付与の確認" : "権限剥奪の確認"}
            </h2>
            <p className="text-gray-700 mb-6">
              このユーザーに権限を{isGranting ? "付与" : "剥奪"}しますか？
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleToggleAdmin}
                className="bg-[#087BD2] text-[#F3F3F3] px-4 py-2 rounded hover:opacity-90 transition"
              >
                {isGranting ? "付与する" : "剥奪する"}
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="border border-gray-400 text-gray-600 px-4 py-2 rounded hover:bg-gray-100 transition"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
