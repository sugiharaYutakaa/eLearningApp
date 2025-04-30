export type Content = {
  id: number;
  title: string;
  description: string;
  difficulty: "初級" | "中級" | "上級";
  tags: string[];
  createdAt: string;
  views: number;
  likes: number;
  liked: boolean;
  bookmarked: boolean;
};

export const contentsList: Content[] = [
  {
    id: 1,
    title: "HTMLの基本構造を学ぼう",
    description:
      "このコンテンツではHTMLの基本的な構造を学び、見出しや段落、リンク、画像挿入といったWebページ作成の基礎を理解します。",
    difficulty: "初級",
    tags: ["HTML"],
    createdAt: "2024-04-25",
    views: 120,
    likes: 10,
    liked: false,
    bookmarked: false,
  },
  {
    id: 2,
    title: "CSSでボタンデザインを作る",
    description:
      "CSSを活用して、Webページに使われるボタンのデザインカスタマイズ方法、ホバーアニメーション、レスポンシブ対応までを学びます。",
    difficulty: "初級",
    tags: ["CSS"],
    createdAt: "2024-04-20",
    views: 150,
    likes: 15,
    liked: false,
    bookmarked: false,
  },
  {
    id: 3,
    title: "HTMLフォームを作成しよう",
    description:
      "このコンテンツでは、ユーザーから情報を取得するためのHTMLフォームの作成方法と、基本的な入力フィールド、送信ボタンについて学びます。",
    difficulty: "中級",
    tags: ["HTML", "CSS"],
    createdAt: "2024-04-18",
    views: 100,
    likes: 8,
    liked: false,
    bookmarked: false,
  },
  {
    id: 4,
    title: "CSS Flexbox入門",
    description:
      "Flexboxを使用して、レスポンシブなレイアウトを組むための基本概念とプロパティについて、実例を交えて学びます。",
    difficulty: "中級",
    tags: ["CSS"],
    createdAt: "2024-04-15",
    views: 220,
    likes: 20,
    liked: false,
    bookmarked: false,
  },
  {
    id: 5,
    title: "JavaScriptでおみくじアプリ",
    description:
      "JavaScriptの基礎的なDOM操作やイベントリスナーを使い、簡単な「おみくじアプリ」を作成することで、動的なWebの理解を深めます。",
    difficulty: "初級",
    tags: ["JavaScript", "HTML"],
    createdAt: "2024-04-10",
    views: 180,
    likes: 12,
    liked: false,
    bookmarked: false,
  },
  {
    id: 6,
    title: "CSS Gridレイアウト入門",
    description:
      "CSS Gridを利用して、2次元的に配置するレイアウトの作り方や、複雑なグリッドデザインを簡単に実現する方法を学びます。",
    difficulty: "中級",
    tags: ["CSS"],
    createdAt: "2024-04-05",
    views: 130,
    likes: 9,
    liked: false,
    bookmarked: false,
  },
  {
    id: 7,
    title: "TypeScriptで型安全なDOM操作",
    description:
      "TypeScriptを用いて、型安全なDOM操作の実装方法を学び、エラーを未然に防ぎながら堅牢なフロントエンド開発を目指します。",
    difficulty: "上級",
    tags: ["TypeScript", "HTML", "CSS"],
    createdAt: "2024-03-30",
    views: 200,
    likes: 17,
    liked: false,
    bookmarked: false,
  },
  {
    id: 8,
    title: "Reactでシンプルなフォーム作成",
    description:
      "ReactのuseStateフックを活用し、入力フォームを作成する基本的な流れと、コンポーネントベースのUI設計を学びます。",
    difficulty: "中級",
    tags: ["React", "HTML", "CSS"],
    createdAt: "2024-03-20",
    views: 300,
    likes: 23,
    liked: false,
    bookmarked: false,
  },
  {
    id: 9,
    title: "Next.jsで静的ページを作成",
    description:
      "Next.jsの基本であるSSG（静的サイト生成）と、ISR（インクリメンタル静的再生成）の概念を理解し、Reactアプリを高速化します。",
    difficulty: "上級",
    tags: ["Next.js", "React", "TypeScript", "HTML", "CSS"],
    createdAt: "2024-03-10",
    views: 250,
    likes: 25,
    liked: false,
    bookmarked: false,
  },
  {
    id: 10,
    title: "CSSアニメーションで動きをつける",
    description:
      "CSSのみで簡単なアニメーション効果を実装し、Webページに動きを加える方法について学びます。初心者でも取り組みやすい内容です。",
    difficulty: "初級",
    tags: ["CSS"],
    createdAt: "2024-03-01",
    views: 170,
    likes: 11,
    liked: false,
    bookmarked: false,
  },
];
