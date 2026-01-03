export default function EventIntro() {
  return (
    <section className="max-w-3xl mx-auto mb-10 mt-10">
      <div className=" p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-center mb-4">
          🎓 UVV Talent Test 2026
        </h1>

        <p className="text-gray-700 text-center mb-6">
          UVV Talent Test 2026 is an educational talent assessment program
          designed to identify and encourage student potential.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <div className="flex items-center justify-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
            <span className="text-lg">📅</span>
            <span className="font-medium">10th January 2026</span>
          </div>

          <div className="flex items-center justify-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
            <span className="text-lg">📍</span>
            <span className="font-medium">Boddapadu</span>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed text-center">
          This initiative is organized with the generous support and
          cooperation of the people of <span className="font-semibold">Boddapadu</span>,
          aiming to provide students with an opportunity to showcase their
          skills and talent in a supportive environment.
        </p>

        <p className="text-gray-800 font-medium text-center mt-6">
          All interested students are encouraged to register and participate
          in this meaningful academic event.
        </p>
      </div>
    </section>
  );
}
