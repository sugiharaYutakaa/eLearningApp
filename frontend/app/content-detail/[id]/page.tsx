"use client";

import { useParams } from "next/navigation";
import Modal from "react-modal";
import { contentsList } from "@/app/mockData/contents";
import ContentCard from "@/app/components/ContentCard";
import { useState } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

import {
  FaClipboardList,
  FaExternalLinkAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaStar,
  FaRegStar,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";

Modal.setAppElement("body");

// テスト用ダミーデータ
const testQuestions = [
  {
    question: "HTMLとは何の略ですか？",
    options: [
      "HyperText Markup Language",
      "HighText Machine Language",
      "HyperTabular Markup Language",
      "None of these",
    ],
    correct: 0,
  },
  {
    question: "CSSは何に使われますか？",
    options: [
      "コンテンツの構造定義",
      "データベース管理",
      "ページデザイン・スタイル",
      "サーバーサイドプログラミング",
    ],
    correct: 2,
  },
  {
    question: "JavaScriptは主にどの側で動作しますか？",
    options: ["サーバー側", "クライアント側", "両方", "どちらでもない"],
    correct: 1,
  },
  {
    question: "Reactは何のためのライブラリですか？",
    options: [
      "サーバー管理",
      "データベース設計",
      "ユーザーインターフェース構築",
      "OS開発",
    ],
    correct: 2,
  },
];

export default function ContentDetailPage() {
  const { id } = useParams();
  const contentId = Number(id);
  const content = contentsList.find((c) => c.id === contentId);
  const relatedContents = contentsList
    .filter((c) => c.id !== contentId)
    .slice(0, 3);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(testQuestions.length).fill(null)
  );
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  if (!content) {
    return (
      <div className="text-center py-20">
        コンテンツが見つかりませんでした。
      </div>
    );
  }

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleSubmitAnswers = () => {
    let correctCount = 0;
    testQuestions.forEach((q, idx) => {
      if (answers[idx] === q.correct) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setIsModalOpen(false);
    setShowResult(true);
  };

  // いいね・ブックマークの状態管理（仮）
  const [liked, setLiked] = useState(content?.liked ?? false);
  const [likesCount, setLikesCount] = useState(content?.likes ?? 0);
  const [bookmarked, setBookmarked] = useState(content?.bookmarked ?? false);

  return (
    <div>
      <Header />
      <main>
        <div className="min-h-screen bg-[#D9ECF4] py-10 px-4">
          <div className="max-w-6xl mx-auto">
            {/* 上部カード */}
            <div className="bg-[#F3F3F3] p-6 rounded-lg shadow-md mb-10">
              {/* 難易度 */}
              <div className="flex justify-between items-start mb-4">
                <div className="px-3 py-1 text-white text-sm rounded-full bg-[#043E69]">
                  {content.difficulty}
                </div>

                <div className="flex items-center gap-4">
                  {/* いいね */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setLiked(!liked);
                        setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
                      }}
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
                    onClick={(e) => {
                      e.preventDefault();
                      setBookmarked(!bookmarked);
                    }}
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
              <h1 className="text-2xl font-bold text-[#021F35] mb-2">
                {content.title}
              </h1>
              <hr className="border-t border-gray-300 mb-4" />

              {/* タグと作成日 */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2 flex-wrap">
                  {content.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#E06969] text-[#F3F3F3] text-xs px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  作成日：{content.createdAt.replace(/-/g, "/")}
                </div>
              </div>

              {/* 概要 */}
              <p className="text-gray-700 leading-relaxed mb-6">
                {content.description}
              </p>

              {/* 閲覧数と受講ボタン */}
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  閲覧数：{content.views}
                </span>
                <button className="bg-[#087BD2] text-[#F3F3F3] px-6 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition">
                  受講する
                </button>
              </div>
            </div>
            {/* TESTセクション */}
            <div className="bg-[#F3F3F3] p-6 rounded-lg shadow-md mb-10">
              <div className="flex items-center mb-4">
                <FaClipboardList size={20} className="text-[#021F35] mr-2" />
                <h2 className="text-xl font-bold text-[#021F35]">TEST</h2>
              </div>

              {!showResult ? (
                <>
                  <p className="text-center text-xs text-[#827979] mb-6">
                    受講後に下記のボタンをクリックしてください
                  </p>
                  <div className="text-center">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="bg-[#087BD2] text-[#F3F3F3] px-6 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition"
                    >
                      TESTを受ける
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-center text-xl font-bold text-[#021F35] mb-4">
                    あなたは {score} / {testQuestions.length} 点でした！
                  </h3>

                  {/* 正誤マーク＋選択肢ラジオボタン表示 */}
                  <div className="flex flex-col gap-6 mt-6">
                    {testQuestions.map((q, idx) => {
                      const isCorrect = answers[idx] === q.correct;
                      return (
                        <div
                          key={idx}
                          className="bg-white p-6 rounded-md shadow-sm flex flex-col gap-4"
                        >
                          {/* 問題文と丸バツ */}
                          <div className="flex items-center gap-2">
                            {isCorrect ? (
                              <FaCheckCircle
                                className="text-green-500"
                                size={24}
                              />
                            ) : (
                              <FaTimesCircle
                                className="text-red-500"
                                size={24}
                              />
                            )}
                            <p className="font-semibold text-[#021F35]">
                              問題{idx + 1}. {q.question}
                            </p>
                          </div>

                          {/* 選択肢リスト（ラジオボタン形式） */}
                          <div className="flex flex-col gap-3 pl-8">
                            {q.options.map((opt, optIdx) => {
                              const isSelected = answers[idx] === optIdx;
                              const isAnswer = q.correct === optIdx;

                              // ラジオボタンと文字色の判定
                              let radioColor = "bg-gray-300 border-gray-300"; // デフォルト
                              let textColor = "text-gray-700"; // デフォルト

                              if (isSelected && isAnswer) {
                                // 正解を選んだ
                                radioColor = "bg-green-500 border-green-500";
                                textColor = "text-[#021F35]";
                              } else if (isSelected && !isAnswer) {
                                // 間違った選択
                                radioColor = "bg-blue-500 border-blue-500";
                                textColor = "text-[#021F35]";
                              } else if (!isSelected && isAnswer) {
                                // 選ばなかったけど正解
                                radioColor = "bg-red-500 border-red-500";
                                textColor = "text-red-500";
                              }

                              return (
                                <div
                                  key={optIdx}
                                  className="flex items-center gap-3"
                                >
                                  {/* ラジオボタン風丸 */}
                                  <div
                                    className={`w-4 h-4 rounded-full border-2 ${radioColor}`}
                                  ></div>
                                  {/* 選択肢テキスト */}
                                  <p className={`text-sm ${textColor}`}>
                                    {opt}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* 関連コンテンツ */}
            <div className="bg-[#FFFFFF] p-6 rounded-lg shadow-md mb-10">
              <div className="flex items-center mb-4">
                <FaExternalLinkAlt size={20} className="text-[#021F35] mr-2" />
                <h2 className="text-xl font-bold text-[#021F35]">
                  Related contents
                </h2>
              </div>

              <div className="flex flex-col gap-6">
                {relatedContents.map((relContent) => (
                  <ContentCard key={relContent.id} content={relContent} />
                ))}
              </div>
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

            {/* モーダル */}
            <Modal
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
              className="bg-white p-8 rounded-lg w-11/12 max-w-2xl mx-auto mt-10"
              overlayClassName="fixed inset-0 bg-gray-300 bg-opacity-70 flex items-center justify-center"
            >
              <h2 className="text-2xl font-bold text-center text-[#021F35] mb-8">
                テスト
              </h2>

              {testQuestions.map((q, idx) => (
                <div key={idx} className="mb-8">
                  <p className="font-semibold text-[#021F35] mb-2">
                    問題{idx + 1}. {q.question}
                  </p>
                  <hr className="border-t border-gray-300 mb-4" />

                  <div className="flex flex-col gap-3">
                    {q.options.map((opt, optIdx) => (
                      <label
                        key={optIdx}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            answers[idx] === optIdx
                              ? "bg-[#087BD2] border-[#087BD2]"
                              : "bg-gray-300 border-gray-300"
                          }`}
                        ></div>
                        <span className="text-sm">{opt}</span>
                        <input
                          type="radio"
                          name={`question-${idx}`}
                          checked={answers[idx] === optIdx}
                          onChange={() => handleSelectOption(idx, optIdx)}
                          className="hidden"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <div className="text-center mt-8">
                <button
                  onClick={handleSubmitAnswers}
                  className="bg-[#087BD2] text-[#F3F3F3] px-6 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition"
                >
                  回答を送信
                </button>
              </div>
            </Modal>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
