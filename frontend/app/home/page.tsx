"use client";  

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact, faGithub, faNodeJs, faPython, faJava, faPhp, faCuttlefish,
  faAngular, faVuejs, faJs, faHtml5, faCss3Alt, faDocker,
  faSwift, faRust, faLaravel, faBootstrap, faSass, faCloudsmith
} from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";

const categories = [
  { icon: faReact, name: "React", description: "React.js, Next.js", categoryType: "frontend" },
  { icon: faGithub, name: "GitHub", description: "ソースコード管理", categoryType: "frontend" },
  { icon: faNodeJs, name: "Node.js", description: "サーバーサイドJavaScript", categoryType: "frontend" },
  { icon: faAngular, name: "Angular", description: "Angularフレームワーク", categoryType: "frontend" },
  { icon: faVuejs, name: "Vue.js", description: "Vue.jsフレームワーク", categoryType: "frontend" },
  { icon: faJs, name: "JavaScript", description: "基本のスクリプト言語", categoryType: "frontend" },
  { icon: faHtml5, name: "HTML5", description: "マークアップ言語", categoryType: "frontend" },
  { icon: faCss3Alt, name: "CSS3", description: "スタイルシート", categoryType: "frontend" },
  { icon: faDocker, name: "Docker", description: "コンテナ技術", categoryType: "frontend" },
  { icon: faSwift, name: "Swift", description: "iOSアプリ開発言語", categoryType: "frontend" },
  { icon: faRust, name: "Rust", description: "システムプログラミング", categoryType: "frontend" },
  { icon: faLaravel, name: "Laravel", description: "PHPフレームワーク", categoryType: "frontend" },
  { icon: faBootstrap, name: "Bootstrap", description: "CSSフレームワーク", categoryType: "frontend" },
  { icon: faSass, name: "Sass", description: "CSSプリプロセッサ", categoryType: "frontend" },
  { icon: faCloudsmith, name: "Cloudsmith", description: "クラウドパッケージ管理", categoryType: "frontend" },
  { icon: faPython, name: "Python", description: "Django, Flask", categoryType: "backend" },
  { icon: faJava, name: "Java", description: "Spring Boot", categoryType: "backend" },
  { icon: faPhp, name: "PHP", description: "Laravel", categoryType: "backend" },
  { icon: faCuttlefish, name: "Cuttlefish", description: "データベース技術", categoryType: "backend" },
  { icon: faNodeJs, name: "Node.js", description: "Express, NestJS", categoryType: "backend" },
  { icon: faDocker, name: "Docker", description: "開発環境構築", categoryType: "backend" },
  { icon: faSwift, name: "Swift", description: "サーバーサイドSwift", categoryType: "backend" },
  { icon: faRust, name: "Rust", description: "高速バックエンド", categoryType: "backend" },
];

export default function Home() {
  const [frontendPage, setFrontendPage] = useState(0);
  const [backendPage, setBackendPage] = useState(0);
  const slideSize = 5;

  const slideCategories = (direction: "left" | "right", type: "frontend" | "backend") => {
    const filtered = categories.filter((c) => c.categoryType === type);
    const totalPages = Math.ceil(filtered.length / slideSize);

    if (type === "frontend") {
      setFrontendPage((prevPage) => {
        let newPage = prevPage;
        if (direction === "left") {
          newPage = Math.max(0, prevPage - 1);
        } else if (direction === "right") {
          newPage = Math.min(totalPages - 1, prevPage + 1);
        }
        return newPage;
      });
    } else {
      setBackendPage((prevPage) => {
        let newPage = prevPage;
        if (direction === "left") {
          newPage = Math.max(0, prevPage - 1);
        } else if (direction === "right") {
          newPage = Math.min(totalPages - 1, prevPage + 1);
        }
        return newPage;
      });
    }
  };

  const frontendSlides = categories.filter((category) => category.categoryType === "frontend");
  const backendSlides = categories.filter((category) => category.categoryType === "backend");

  const getPageSlides = (slides: any[], page: number) => {
    const startIndex = page * slideSize;
    return slides.slice(startIndex, startIndex + slideSize);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <header style={{ backgroundColor: "#087BD2", color: "#FFFFFF" }} className="p-4">
        <h1 className="text-2xl font-bold">e-learning</h1>
      </header>

      <section style={{ backgroundColor: "#D9ECF4", color: "#000000" }} className="flex-grow p-6">
        {/* フロントエンド */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Frontend</h2>
          <div className="flex items-center justify-center">
            <button
              onClick={() => slideCategories("left", "frontend")}
              disabled={frontendPage === 0}
              className="text-2xl"
            >
              ＜
            </button>

            <div className="flex overflow-hidden w-full justify-center">
              <motion.div
                key={frontendPage}
                className="flex"
                initial={{ x: frontendPage === 0 ? "-100%" : "100%" }}  // 左に流れる
                animate={{ x: 0 }}  // 現在位置
                exit={{ x: frontendPage > 0 ? "100%" : "-100%" }}  // 前回の方向に流れる
                transition={{ duration: 0.5 }}
              >
                {getPageSlides(frontendSlides, frontendPage).map((slide, index) => (
                  <div key={index} className="w-32 h-32 p-4 m-2 rounded-lg shadow-lg bg-white text-center">
                    <div className="text-4xl mb-2">
                      <FontAwesomeIcon icon={slide.icon} />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{slide.name}</h3>
                    <p className="text-sm text-gray-700">{slide.description}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            <button
              onClick={() => slideCategories("right", "frontend")}
              disabled={frontendPage + 1 >= Math.ceil(frontendSlides.length / slideSize)}
              className="text-2xl"
            >
              ＞
            </button>
          </div>
        </div>

        {/* バックエンド */}
        <div>
          <h2 className="text-xl font-bold mb-4">Backend</h2>
          <div className="flex items-center justify-center">
            <button
              onClick={() => slideCategories("left", "backend")}
              disabled={backendPage === 0}
              className="text-2xl"
            >
              ＜
            </button>

            <div className="flex overflow-hidden w-full justify-center">
              <motion.div
                key={backendPage}
                className="flex"
                initial={{ x: backendPage === 0 ? "-100%" : "100%" }}  // 左に流れる
                animate={{ x: 0 }}  // 現在位置
                exit={{ x: backendPage > 0 ? "100%" : "-100%" }}  // 前回の方向に流れる
                transition={{ duration: 0.5 }}
              >
                {getPageSlides(backendSlides, backendPage).map((slide, index) => (
                  <div key={index} className="w-32 h-32 p-4 m-2 rounded-lg shadow-lg bg-white text-center">
                    <div className="text-4xl mb-2">
                      <FontAwesomeIcon icon={slide.icon} />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{slide.name}</h3>
                    <p className="text-sm text-gray-700">{slide.description}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            <button
              onClick={() => slideCategories("right", "backend")}
              disabled={backendPage + 1 >= Math.ceil(backendSlides.length / slideSize)}
              className="text-2xl"
            >
              ＞
            </button>
          </div>
        </div>
      </section>

      <footer style={{ backgroundColor: "#043E69", color: "#FFFFFF" }} className="p-4 text-center">
        <p>フッター © 2025</p>
      </footer>
    </main>
  );
}
