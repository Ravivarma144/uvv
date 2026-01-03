import { getImagePrefix } from "@/utils/util";
import Image from "next/image";

const Newsletter = () => {
    const isProd = process.env.NODE_ENV === "production";

    return (
        <section>
            <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 ">
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 md:grid-cols-12 xl:gap-x-8">
                    <div className={`col-span-12 bg-gradient-to-r from-green-900/80 via-green-800/80 to-green-700/80  bg-contain bg-no-repeat`}>
                        <div className="mb-10 mt-24 lg:mx-64 lg:my-24">
                            <h3 className="text-4xl md:text-5xl text-center font-semibold text-white mb-3">Newsletter.</h3>
                            <h3 className="text-base font-normal text-white/75 text-center mb-8">
                                Subscriber our newsletter for More Updates , <br /> Information and many more.
                            </h3>
                            <div>

                                <div className="relative max-w-3xl mx-auto mt-10">
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="
      w-full
      h-16 md:h-18
      pl-8 pr-20
      rounded-full
      text-gray-700
      bg-white/95
      placeholder-gray-500
      shadow-md
      focus:outline-none
      focus:ring-2 focus:ring-green-600/40
    "
                                    />

                                    <button
                                        type="submit"
                                        className="
      absolute
      right-2
      top-1/2
      -translate-y-1/2
      h-12 w-12
      rounded-full
      bg-green-700
      hover:bg-green-800
      transition
      flex items-center justify-center
      shadow-lg
    "
                                    >
                                        <Image
                                            src={`${getImagePrefix()}images/newsletter/send.svg`}
                                            alt="send-icon"
                                            width={22}
                                            height={22}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </section>
    )
}

export default Newsletter;