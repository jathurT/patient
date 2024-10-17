import { HiCheck } from "react-icons/hi";

export default function ConfirmationPage() {
  return (
    <>
      <div className="mt-[92px] h-[500px]">
        <div className="h-[258px] w-full flex justify-center bg-primary relative px-5  ">
          <div className=" absolute top-1/4 md:top-1/3  flex flex-col gap-10 min-w">
            <div className=" rounded-3xl bg-white w-full sm:min-w-[400px] min-w-[350px] px-5">
              <div className=" mx-auto relative pt-10 pb-7 flex justify-center items-center   ">
                <div className=" absolute animate-ping  bg-green-400  p-5 rounded-full"></div>
                <span className="flex p-3  rounded-full bg-green-600  ">
                  <HiCheck className="text-3xl text-white   " />
                </span>
              </div>
              <div className="text-center text-gray-500 pb-3">
                Payment Success!{" "}
              </div>
              <div className="text-center text-2xl text-black font-semibold pb-3 ">
                Rs 250.00
              </div>
              <div className="w-full border-b border-gray-200"></div>
              <div className="p-5">
                <ul className="flex flex-col gap-3 pb-5">
                  <li className="flex justify-between">
                    <div className="text-gray-500">Ref Number</div>
                    <div className="text-black font-semibold">000085752257</div>
                  </li>
                  <li className="flex justify-between">
                    <div className="text-gray-500">Payment Time</div>
                    <div className="text-black font-semibold">
                      25-02-2023, 13:22:16
                    </div>
                  </li>
                  <li className="flex justify-between">
                    <div className="text-gray-500">Payment Method</div>
                    <div className="text-black font-semibold">
                      Bank Transfer
                    </div>
                  </li>
                  <li className="flex justify-between">
                    <div className="text-gray-500">Sender Name</div>
                    <div className="text-black font-semibold">
                      Antonio Roberto
                    </div>
                  </li>
                  <li className="flex justify-between">
                    <div className="text-gray-500">Ref Number</div>
                    <div className="text-black font-semibold">000085752257</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
