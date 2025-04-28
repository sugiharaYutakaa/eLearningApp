export default function MyPage() {
    return (
      <div className="min-h-screen bg-sky-300 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-8">
          {/* 枠1 */}
          <div className="w-[480px] h-[320px] bg-white rounded-lg shadow-md flex flex-col items-start justify-between p-4">
          <span>
            username
            </span>
          <span>
            12345
            </span>
            <div className="text-xl font-bold">興味のあるコンテンツ</div>
            <div className="mt-4 w-full border-4 border-blue-500 bg-white p-4">
              <p className="text-center">ここに囲いの中身</p>
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
          <div className="w-[480px] h-[320px]bg-white rounded-lg shadow-md flex items-center justify-center text-xl font-bold">
            枠４
          </div>
        </div>
      </div>
    );
  }
  
  