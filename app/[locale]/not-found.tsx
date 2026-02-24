import Link from "next/link";

export default function NotFound() {
  return (
    <section className="max-w-360 mx-auto h-screen px-4 flex items-center justify-center">
      <div className="w-full grid grid-cols-1 items-center text-center">
        <div className="px-4">
          <p
            className="text-xl lg:text-2xl mt-6 text-white md:px-40
        [text-shadow:0_0_5px_#ffffff,0_0_15px_#ffffff,0_0_30px_#ffffff] animate-pulse"
          >
            Страницата, която търсите, не съществува, не е налична или се
            зарежда неправилно.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="/"
              className="relative w-44 lg:w-60 h-10 lg:h-14 flex items-center justify-center text-sm lg:text-lg hover:scale-105 transition-transform duration-300 text-black bg-white  [box-shadow:0_0_5px_#ffffff,0_0_15px_#ffffff,0_0_30px_#ffffff]  rounded-full"
            >
              <span className="z-10">Начална страница</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
