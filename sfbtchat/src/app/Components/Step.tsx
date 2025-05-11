export default function Step() {
  return (
    <div className="h-screen min-w-[360px]">
      <ol className="p-20 pb-20 bg-sisal-200 h-auto text-xl font-normal tracking-wider flex flex-col lg:flex-row items-center justify-center space-y-4 lg:space-y-0 lg:space-x-8 text-sisal-800">
        <li className="flex items-center space-x-3">
          <span className="text-gray-700">操作步驟</span>
        </li>

        <li className="pr-10 flex items-center space-x-3">
          <span className=" flex items-center justify-center w-10 h-10 bg-gradient-to-r from-sisal-400 to-sisal-600 text-white rounded-full shadow-md">
            1
          </span>
          <span className="text-gray-700">心情檢測</span>
        </li>
        <li className="pr-10 flex items-center space-x-3">
          <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-sisal-400 to-sisal-600 text-white rounded-full shadow-md">
            2
          </span>
          <span className="text-gray-700">獲得分數</span>
        </li>
        <li className="pr-10 flex items-center space-x-3">
          <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-sisal-400 to-sisal-600 text-white rounded-full shadow-md">
            3
          </span>
          <span className="text-gray-700">談話選擇</span>
        </li>
        <li className="pr-10 flex items-center space-x-3">
          <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-sisal-400 to-sisal-600 text-white rounded-full shadow-md">
            4
          </span>
          <span className="text-gray-700">進行對話</span>
        </li>
      </ol>
    </div>
  );
}
