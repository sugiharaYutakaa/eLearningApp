"use client";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Chart.jsの必要なモジュールを登録
ChartJS.register(ArcElement, Tooltip, Legend);

export default function MyPage() {
    // 仮のユーザーデータ
    const [userData] = useState({
        name: "山田 太郎",
        employeeId: "12345",
        learningTime: "150時間", // 合計学習時間
        websiteHistory: [
            { title: "React公式サイト", url: "https://reactjs.org", timeSpent: 40 }, // 40時間
            { title: "Next.js公式サイト", url: "https://nextjs.org", timeSpent: 50 }, // 50時間
            { title: "MDN Web Docs", url: "https://developer.mozilla.org", timeSpent: 60 } // 60時間
        ],
        bookmarks: [
            "https://github.com",
            "https://www.stackoverflow.com",
            "https://www.dev.to"
        ],
        interestedContents: [
            "Web開発",
            "React.js",
            "Next.js",
            "TypeScript",
            "UI/UXデザイン"
        ]
    });

    // 円グラフに渡すデータを作成
    const pieData = {
        labels: userData.websiteHistory.map((site) => site.title),
        datasets: [
            {
                label: '学習時間',
                data: userData.websiteHistory.map((site) => site.timeSpent),
                backgroundColor: ['#FF5733', '#33FF57', '#3357FF'], // 各サイトごとの色
                borderColor: ['#FF5733', '#33FF57', '#3357FF'],
                borderWidth: 1,
            },
        ],
    };

    // 円グラフのオプション（ドーナツ型にする設定）
    const pieOptions = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: (tooltipItem: any) => {
                        return `${tooltipItem.label}: ${tooltipItem.raw}時間`;
                    },
                },
            },
        },
        responsive: true,
        cutout: '70%', // ドーナツの内径のサイズを調整
    };

    // 合計学習時間を計算
    const totalLearningTime = userData.websiteHistory.reduce((total, site) => total + site.timeSpent, 0);

    return (
        <div className="min-h-screen bg-sky-300 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-8">
                {/* 左上 */}
                <div className="w-[480px] h-[320px] bg-white rounded-lg shadow-md flex flex-col items-start justify-start p-4">
                    <div className="flex justify-between w-full text-xl font-bold">
                        <span>氏名: {userData.name}</span>
                        <span>社員番号: {userData.employeeId}</span>
                    </div>
                    <div className="text-xl font-bold">興味のあるコンテンツ</div>
                    <div className="mt-2 w-full border-4 border-blue-500 bg-white p-4">
                        <ul>
                            {userData.interestedContents.map((content, index) => (
                                <li key={index} className="text-blue-500">{content}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* 右上 */}
                <div className="w-[480px] h-[320px] bg-white rounded-lg shadow-md flex flex-col items-center justify-center p-4 relative">
                    <div className="flex justify-between w-full text-xl font-bold">
                        <span>合計学習時間</span>
                    </div>

                    {/* 合計学習時間の表示（円グラフの上に重ねる） */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold">
                        {totalLearningTime}h
                    </div>
                    {/* ドーナツ型円グラフを中央に配置 */}
                    <div className="flex items-center justify-center w-full h-full">
                        <Pie data={pieData} options={pieOptions} />
                    </div>
                </div>

                {/* 左下 */}
                <div className="w-[480px] h-[320px] bg-white rounded-lg shadow-md flex flex-col items-start justify-start p-4">
                    <div className="flex justify-between w-full text-xl font-bold">
                        <span>コンテンツ履歴</span>
                    </div>
                    <div className="mt-4 w-full border-2 border-gray-500 p-4">
                        <ul>
                            {userData.websiteHistory.map((site, index) => (
                                <li key={index}>
                                    <a href={site.url} target="_blank" className="text-blue-500">
                                        {site.title}
                                    </a> ({site.timeSpent}時間)
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* 右下 */}
                <div className="w-[480px] h-[320px] bg-white rounded-lg shadow-md flex flex-col items-start justify-start p-4">
                    <div className="flex justify-between w-full text-xl font-bold">
                        <span>ブックマーク</span>
                    </div>
                    <div className="mt-4 w-full border-2 border-gray-500 p-4">
                        <ul>
                            {userData.bookmarks.map((url, index) => (
                                <li key={index}>
                                    <a href={url} target="_blank" className="text-blue-500">
                                        {url}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* 中央下に長方形の枠 */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[960px] h-20 bg-white border-2 border-white rounded-lg mt-4">
                    {/* 枠の中身を必要に応じて追加 */}
                </div>

            </div>
        </div>
    );
}
