"use client";

import React, { useState } from "react";
import { DogBreedSelector } from "@/components/dog-breed-selector";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface FormData {
  breed: string;
  furColor: string;
  characteristics: string;
  ownerInfo: {
    residentNumber1: string;
    residentNumber2: string;
    registrationAddress: string;
    registrationAddressDetail: string;
    actualAddress: string;
    actualAddressDetail: string;
    isSameAddress: boolean;
  };
  agreements: {
    all: boolean;
    residentNumber: boolean;
    digitalSignature: boolean;
    deliveryConfirmation: boolean;
  };
}

const PetApplicationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    breed: "",
    furColor: "",
    characteristics: "",
    ownerInfo: {
      residentNumber1: "",
      residentNumber2: "",
      registrationAddress: "",
      registrationAddressDetail: "",
      actualAddress: "",
      actualAddressDetail: "",
      isSameAddress: false,
    },
    agreements: {
      all: false,
      residentNumber: false,
      digitalSignature: false,
      deliveryConfirmation: false,
    },
  });

  const handleBreedChange = (breed: string) => {
    setFormData((prev) => ({ ...prev, breed }));
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      if (parent === "ownerInfo") {
        setFormData((prev) => ({
          ...prev,
          ownerInfo: {
            ...prev.ownerInfo,
            [child]: value,
          },
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleAgreementChange = (field: string, checked: boolean) => {
    setFormData((prev) => {
      const newAgreements = { ...prev.agreements, [field]: checked };

      // 전체 동의 처리
      if (field === "all") {
        return {
          ...prev,
          agreements: {
            all: checked,
            residentNumber: checked,
            digitalSignature: checked,
            deliveryConfirmation: checked,
          },
        };
      }

      // 개별 동의에서 전체 동의 상태 업데이트
      const allChecked =
        newAgreements.residentNumber &&
        newAgreements.digitalSignature &&
        newAgreements.deliveryConfirmation;

      return {
        ...prev,
        agreements: {
          ...newAgreements,
          all: allChecked,
        },
      };
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 상태바 */}
      <div className="h-[47px] bg-white flex items-center justify-between px-4 pt-2">
        <span className="text-[16px] font-medium">9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
          </div>
          <div className="w-6 h-3 border border-black rounded-sm">
            <div className="w-4 h-2 bg-black rounded-sm m-0.5"></div>
          </div>
        </div>
      </div>

      {/* 앱바 */}
      <div className="h-[49px] bg-white flex items-center justify-between px-4 border-b border-gray-100">
        <ArrowLeft className="w-6 h-6 text-[#2c2f34]" />
        <h1 className="text-[16px] font-bold text-[#2c2f34]">
          외장칩/인식표 무료 신청하기
        </h1>
        <div className="w-6"></div>
      </div>

      {/* 스크롤 가능한 콘텐츠 */}
      <div className="overflow-y-auto">
        {/* 타이틀 영역 */}
        <div className="bg-white p-4">
          <div className="text-[14px] font-bold text-[#ff592c] mb-2">
            Step 3.
          </div>
          <div className="text-[24px] font-bold text-[#2c2f34] mb-2">
            신청 정보를 입력해주세요!
          </div>
          <div className="text-[16px] font-medium text-[#585e67]">
            국가동물등록 및 외장칩 배송을 위한 정보에요.
          </div>
        </div>

        {/* 신청 대상 안내 카드 */}
        <div className="px-4 mb-4">
          <div className="bg-[#f0f1f2] rounded-[16px] p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-[#ff592c] rounded flex items-center justify-center">
                <span className="text-white text-xs">!</span>
              </div>
              <h3 className="text-[18px] font-bold text-[#2c2f34]">
                외장칩 무료 신청은 고양·안양·시흥시 시민만 참여할 수 있어요!
              </h3>
            </div>

            <div className="bg-white rounded-[12px] p-4 mb-4">
              <h4 className="text-[14px] font-bold text-[#585e67] mb-3">
                주소 및 배송 관련 안내
              </h4>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <div className="w-4 h-4 bg-[#8b919a] rounded-full flex items-center justify-center text-white text-xs font-bold">
                    1
                  </div>
                  <p className="text-[14px] font-medium text-[#585e67] flex-1">
                    입력한 실제 거주지가 고양·안양·시흥시가 아닐 경우, 외장칩은
                    발송되지 않습니다.
                  </p>
                </div>
                <div className="flex gap-2">
                  <div className="w-4 h-4 bg-[#8b919a] rounded-full flex items-center justify-center text-white text-xs font-bold">
                    2
                  </div>
                  <p className="text-[14px] font-medium text-[#585e67] flex-1">
                    입력하신 실거주지 주소로 상품이 발송되오니, 정확하게 입력해
                    주세요.
                  </p>
                </div>
                <div className="flex gap-2">
                  <div className="w-4 h-4 bg-[#8b919a] rounded-full flex items-center justify-center text-white text-xs font-bold">
                    3
                  </div>
                  <p className="text-[14px] font-medium text-[#585e67] flex-1">
                    입력한 실거주지 주소와 본인인증 시 사용한 성명, 전화번호가
                    배송정보로 자동 등록되며, 오기재 시 발송이 어려울 수 있으니
                    꼼꼼히 확인해 주세요.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[12px] p-4 mb-4">
              <h4 className="text-[14px] font-bold text-[#ff592c] mb-2">
                잠깐! 혹시 오프라인 매장에서 신청하셨나요?
              </h4>
              <p className="text-[14px] font-medium text-[#2c2f34]">
                펫나우 제휴 시설에서 무료 외장칩을 신청하셨다면
                <br />
                현장에서 바로 외장칩을 수령해주세요!
                <br />
                제휴 시설 신청건은 별도로 배송되지 않아요!
              </p>
            </div>

            <p className="text-[14px] font-medium text-[#ff4055]">
              ※ 주민등록상 주소지가 고양·안양·시흥시이더라도 실제 거주지로
              입력한 주소가 다른 지역인 경우 외장칩은 발송되지 않아요.
            </p>
          </div>
        </div>

        {/* 보호자 정보 */}
        <div className="bg-white">
          <div className="p-4">
            <h2 className="text-[18px] font-bold text-[#2c2f34] mb-4">
              보호자 정보
            </h2>

            {/* 주민등록번호 */}
            <div className="mb-6">
              <label className="block text-[14px] font-bold text-[#2c2f34] mb-2">
                주민등록번호
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="6자리 입력"
                  value={formData.ownerInfo.residentNumber1}
                  onChange={(e) =>
                    handleInputChange(
                      "ownerInfo.residentNumber1",
                      e.target.value
                    )
                  }
                  className="flex-1 bg-[#f8f8f9] rounded-[12px] px-4 py-4 text-[16px] font-medium text-[#2c2f34] placeholder:text-[#c5c8cd] border-none outline-none"
                />
                <span className="text-[16px] text-black">-</span>
                <input
                  type="password"
                  placeholder="7자리 입력"
                  value={formData.ownerInfo.residentNumber2}
                  onChange={(e) =>
                    handleInputChange(
                      "ownerInfo.residentNumber2",
                      e.target.value
                    )
                  }
                  className="flex-1 bg-[#f8f8f9] rounded-[12px] px-4 py-4 text-[16px] font-medium text-[#2c2f34] placeholder:text-[#c5c8cd] border-none outline-none"
                />
              </div>
              <p className="text-[14px] text-[#8b919a] mt-2 px-4">
                주민등록번호는 국가 동물 등록 승인 후 즉시 폐기돼요.
              </p>
            </div>

            {/* 주민등록상 주소지 */}
            <div className="mb-6">
              <label className="block text-[14px] font-bold text-[#2c2f34] mb-2">
                주민등록상 주소지
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="주소를 입력해주세요."
                  value={formData.ownerInfo.registrationAddress}
                  onChange={(e) =>
                    handleInputChange(
                      "ownerInfo.registrationAddress",
                      e.target.value
                    )
                  }
                  className="flex-1 bg-[#f8f8f9] rounded-[12px] px-4 py-4 text-[16px] font-medium text-[#2c2f34] placeholder:text-[#c5c8cd] border-none outline-none"
                />
                <Button
                  variant="outline"
                  className="border-[#ff592c] text-[#ff592c] text-[14px] font-bold px-4 py-3 rounded-[12px]"
                >
                  주소 검색
                </Button>
              </div>
              <input
                type="text"
                placeholder="상세 주소를 입력해주세요."
                value={formData.ownerInfo.registrationAddressDetail}
                onChange={(e) =>
                  handleInputChange(
                    "ownerInfo.registrationAddressDetail",
                    e.target.value
                  )
                }
                className="w-full bg-[#f8f8f9] rounded-[12px] px-4 py-4 text-[16px] font-medium text-[#2c2f34] placeholder:text-[#c5c8cd] border-none outline-none"
              />
            </div>
          </div>
        </div>

        {/* 반려동물 정보 */}
        <div className="bg-white border-t-8 border-[#f8f8f9]">
          <div className="p-4">
            <h2 className="text-[18px] font-bold text-[#2c2f34] mb-4">
              반려동물 정보
            </h2>

            {/* 견종 */}
            <div className="mb-6">
              <label className="block text-[14px] font-bold text-[#2c2f34] mb-2">
                견종
              </label>
              <DogBreedSelector
                value={formData.breed}
                onValueChange={handleBreedChange}
                placeholder="견종을 검색해주세요."
              />
              <p className="text-[14px] text-[#8b919a] mt-2 px-4">
                견종과 그에 따른 털 색상은 국가 동물보호관리시스템의 기준을
                따르고 있어요.
              </p>
            </div>

            {/* 털 색상 */}
            <div className="mb-6">
              <label className="block text-[14px] font-bold text-[#2c2f34] mb-2">
                털 색상
              </label>
              <div className="bg-[#f8f8f9] rounded-[12px] px-4 py-4 flex items-center justify-between">
                <span className="text-[16px] font-medium text-[#c5c8cd]">
                  털 색상을 선택해주세요.
                </span>
                <div className="w-6 h-6 flex items-center justify-center">
                  <span className="text-[#8b919a]">⌄</span>
                </div>
              </div>
              <p className="text-[14px] text-[#8b919a] mt-2 px-4">
                견종과 그에 따른 털 색상은 국가 동물보호관리시스템의 기준을
                따르고 있어요.
              </p>
            </div>

            {/* 강아지 특징 */}
            <div className="mb-6">
              <label className="block text-[14px] font-bold text-[#2c2f34] mb-2">
                강아지 특징
              </label>
              <input
                type="text"
                placeholder="강아지 특징을 알려주세요."
                value={formData.characteristics}
                onChange={(e) =>
                  handleInputChange("characteristics", e.target.value)
                }
                className="w-full bg-[#f8f8f9] rounded-[12px] px-4 py-4 text-[16px] font-medium text-[#2c2f34] placeholder:text-[#c5c8cd] border-none outline-none"
              />
              <p className="text-[14px] text-[#8b919a] mt-2 px-4">
                외모적 특징, 병력 사항 등을 알려주세요.
              </p>
            </div>
          </div>
        </div>

        {/* 약관동의 */}
        <div className="bg-white border-t-8 border-[#f8f8f9]">
          <div className="p-4">
            <h2 className="text-[18px] font-bold text-[#2c2f34] mb-4">
              약관동의
            </h2>

            <div className="space-y-1">
              {/* 전체 동의 */}
              <div className="flex items-center gap-3 py-3">
                <input
                  type="checkbox"
                  id="agreement-all"
                  checked={formData.agreements.all}
                  onChange={(e) =>
                    handleAgreementChange("all", e.target.checked)
                  }
                  className="w-6 h-6 rounded border-2 border-[#c5c8cd]"
                />
                <label
                  htmlFor="agreement-all"
                  className="text-[16px] font-medium text-[#2c2f34] flex-1"
                >
                  약관 전체 동의
                </label>
              </div>

              <hr className="border-[#f0f1f2]" />

              {/* 개별 약관들 */}
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="agreement-resident"
                    checked={formData.agreements.residentNumber}
                    onChange={(e) =>
                      handleAgreementChange("residentNumber", e.target.checked)
                    }
                    className="w-6 h-6 rounded border-2 border-[#c5c8cd]"
                  />
                  <label
                    htmlFor="agreement-resident"
                    className="text-[16px] font-medium text-[#2c2f34]"
                  >
                    (필수) 주민등록번호 사용 동의서
                  </label>
                </div>
                <span className="text-[#8b919a]">&gt;</span>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="agreement-digital"
                    checked={formData.agreements.digitalSignature}
                    onChange={(e) =>
                      handleAgreementChange(
                        "digitalSignature",
                        e.target.checked
                      )
                    }
                    className="w-6 h-6 rounded border-2 border-[#c5c8cd]"
                  />
                  <label
                    htmlFor="agreement-digital"
                    className="text-[16px] font-medium text-[#2c2f34]"
                  >
                    (필수) 전자서명법 및 동물보호법 동의약관
                  </label>
                </div>
                <span className="text-[#8b919a]">&gt;</span>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="agreement-delivery"
                    checked={formData.agreements.deliveryConfirmation}
                    onChange={(e) =>
                      handleAgreementChange(
                        "deliveryConfirmation",
                        e.target.checked
                      )
                    }
                    className="w-6 h-6 rounded border-2 border-[#c5c8cd]"
                  />
                  <label
                    htmlFor="agreement-delivery"
                    className="text-[16px] font-medium text-[#2c2f34]"
                  >
                    (필수) 물품 수령 확인서 작성 동의
                  </label>
                </div>
                <span className="text-[#8b919a]">&gt;</span>
              </div>
            </div>

            <p className="text-[14px] font-medium text-[#585e67] mt-4">
              ※ 위 약관에 미동의 시 무료 외장칩 신청이 제한될 수 있습니다.
            </p>
          </div>
        </div>

        {/* 신청하기 버튼 */}
        <div className="bg-white p-4">
          <Button
            className="w-full bg-[#ffbdab] hover:bg-[#ff9980] text-white text-[16px] font-bold py-4 rounded-[12px] h-auto"
            disabled={!formData.agreements.all}
          >
            신청하기
          </Button>
        </div>

        {/* 홈 인디케이터 */}
        <div className="h-[34px] flex items-end justify-center pb-2">
          <div className="w-[140px] h-[5px] bg-black rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default PetApplicationForm;
