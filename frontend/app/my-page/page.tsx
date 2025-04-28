
"use client";
import { useState } from "react";
import Image from "next/image";

export default function MyPage() {
    // 選択されたITスキルや技術を管理するための状態
    const [skills, setSkills] = useState<string[]>([]);

    // 追加ボタンがクリックされたときの処理
    const handleAddSkill = () => {
        const newSkill = prompt("Enter your IT skill or technology:");
        if (newSkill) {
            setSkills([...skills, newSkill]);
        }

    };
    // スキルを削除する関数
    const handleRemoveSkill = (index: number) => {
        setSkills((prevSkills) => prevSkills.filter((_, i) => i !== index));
    };

    return (
        <div className="min-h-screen bg-sky-300 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-8">
                {/* 枠1 */}
                <div className="w-[480px] h-[320px] bg-white rounded-lg shadow-md flex flex-col items-start justify-between p-4">
                    <div className="flex justify-between w-full text-xl font-bold">
                        <span>
                            username
                        </span>
                        <span>
                            12345
                        </span>
                    </div>
                    <div className="text-xl font-bold">興味のあるコンテンツ</div>
                    <div className="mt-2 w-full border-4 border-blue-500 bg-white p-4">
                        {/* 追加ボタン */}
                        <button
                            className="bg-blue-500 text-white p-1 rounded-full mt-4 flex items-center justify-center text-sm"
                            onClick={handleAddSkill}
                        >
                            <span>+</span>
                        </button>


                        {/* 選択されたスキルを表示 */}
                        {skills.length > 0 && (
                            <div className="mt-4">
                                
                                <ul className="grid grid-cols-4 gap-2  pl-5">
                                    {skills.map((skill, index) => (
                                        <li key={index} className="text-lg">{skill}
                                            {/* 削除ボタン */}
                                            <button
                                                className="bg-red-500 text-white ml-2"
                                                onClick={() => handleRemoveSkill(index)}
                                            >
                                                -
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                    </div>
                </div>

                {/* 枠2 */}
                <div className="w-[480px] h-[320px] bg-white rounded-lg shadow-md flex items-center justify-center text-xl font-bold">
                    枠２
                </div>

                {/* 枠3 */}
                <div className="w-[480px] h-[320px] bg-white rounded-lg shadow-md flex items-center justify-center text-xl font-bold">
                    枠３
                </div>

                {/* 枠4 */}
                <div className="w-[480px] h-[320px] bg-white rounded-lg shadow-md flex items-center justify-center text-xl font-bold">
                    枠４
                </div>
            </div>
        </div>
    );
}

