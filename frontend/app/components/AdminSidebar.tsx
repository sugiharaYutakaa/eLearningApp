"use client";

export default function AdminSidebar() {
  return (
    <aside className="w-60 bg-[#021F35] text-[#F3F3F3] flex flex-col py-8 px-4">
      {/* サイドバー */}
      <nav className="flex flex-col gap-6">
        <div className="text-lg font-semibold">ユーザー</div>
        <hr className="border-t border-[#F3F3F3]" />
        <div className="text-lg font-semibold">コンテンツ</div>
        <hr className="border-t border-[#F3F3F3]" />
        <div className="text-lg font-semibold">お問い合わせ</div>
      </nav>
    </aside>
  );
}
