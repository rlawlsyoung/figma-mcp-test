"use client";

import React, { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { dogBreeds } from "@/data/dogBreeds";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface DogBreedSelectorProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function DogBreedSelector({
  value,
  onValueChange,
  placeholder = "견종을 검색해주세요.",
  className,
}: DogBreedSelectorProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // 검색 결과 필터링
  const filteredBreeds = useMemo(() => {
    if (!searchQuery.trim()) {
      return dogBreeds;
    }

    return dogBreeds.filter((breed) =>
      breed.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSelect = (breed: string) => {
    onValueChange?.(breed);
    setOpen(false);
    setSearchQuery("");
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div
          className={cn(
            "bg-[#f8f8f9] box-border flex items-center justify-between rounded-[12px] px-4 py-4 cursor-pointer min-h-[54px]",
            className
          )}
        >
          <span
            className={cn(
              "text-[16px] leading-[24px] font-medium",
              value ? "text-[#2c2f34]" : "text-[#c5c8cd]"
            )}
          >
            {value || placeholder}
          </span>
        </div>
      </SheetTrigger>

      <SheetContent
        side="bottom"
        className="h-auto h-[85vh] p-0 rounded-t-[20px] border-none flex flex-col"
      >
        {/* 헤더 */}
        <SheetHeader className="px-4 pt-5 pb-4 flex-row items-center justify-between space-y-0 flex-shrink-0">
          <SheetTitle className="text-[20px] leading-[30px] font-bold text-[#2c2f34]">
            견종 선택
          </SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
              <X className="h-6 w-6" />
              <span className="sr-only">닫기</span>
            </Button>
          </SheetClose>
        </SheetHeader>

        {/* 검색 입력 필드 */}
        <div className="px-4 pb-3 flex-shrink-0">
          <div className="relative">
            <div className="bg-[#f8f8f9] rounded-[12px] px-4 py-4 flex items-center gap-2">
              <Search className="h-6 w-6 text-[#8b919a]" />
              <input
                type="text"
                placeholder="견종을 입력해주세요."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-[16px] leading-[24px] font-medium text-[#2c2f34] placeholder:text-[#c5c8cd]"
              />
            </div>
          </div>
        </div>

        {/* 견종 목록 */}
        <div className="flex-1 overflow-y-auto  ">
          <div className="space-y-0">
            {filteredBreeds.length > 0 ? (
              filteredBreeds.map((breed) => (
                <div
                  key={breed}
                  onClick={() => handleSelect(breed)}
                  className="bg-white hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="px-5 py-3 flex items-center justify-between min-h-[44px]">
                    <span className="text-[16px] leading-[24px] font-medium text-[#2c2f34]">
                      {breed}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-5 py-8 text-center">
                <span className="text-[16px] leading-[24px] font-medium text-[#8b919a]">
                  검색 결과가 없습니다.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 하단 여백 (홈 인디케이터 공간) */}
        <div className="h-[34px] flex items-end justify-center pb-2 flex-shrink-0">
          <div className="w-[140px] h-[5px] bg-black rounded-full" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
