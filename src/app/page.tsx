"use client";

import React, { useState } from "react";
import { DogBreedSelector } from "@/components/dog-breed-selector";

const TestPage = () => {
  const [selectedBreed, setSelectedBreed] = useState<string>("");

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto mt-20 bg-white rounded-lg p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-[#2c2f34] mb-6">
          견종 선택 액션시트 테스트
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-[14px] font-bold text-[#2c2f34] mb-2">
              견종
            </label>
            <DogBreedSelector
              value={selectedBreed}
              onValueChange={setSelectedBreed}
              placeholder="견종을 검색해주세요."
            />
          </div>

          {selectedBreed && (
            <div className="mt-4 p-4 bg-[#f8f8f9] rounded-lg">
              <span className="text-sm text-[#585e67]">선택된 견종:</span>
              <p className="text-lg font-medium text-[#2c2f34]">
                {selectedBreed}
              </p>
            </div>
          )}

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-2">기능 설명:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 바텀에서 올라오는 액션시트</li>
              <li>• 실시간 검색 기능 (autocomplete)</li>
              <li>• 50개 이상의 견종 데이터</li>
              <li>• Figma 디자인과 동일한 UI</li>
              <li>• shadcn UI 컴포넌트 사용</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
