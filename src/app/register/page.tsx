"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { studentSchema, StudentFormData } from "@/lib/validation/student";
import { fetchSchools, submitStudent } from "@/lib/api/schools";

type School = { id: string; name: string };

const CONTENT = {
    en: {
        title: "UVV Talent Test 2026",
        description:
            "An educational talent assessment program designed to identify and encourage student potential of UDDANAM Rural Area.",
        note:
            "All interested students are encouraged to register and participate.",
        date: "10th January 2026",
        location: "Boddapadu",
        registerTitle: "Student Registration",
        toggle: "తెలుగు",
    },
    te: {
        title: "యూవీవీ టాలెంట్ టెస్ట్ 2026",
        description:
            "ఉడ్డానాం గ్రామీణ ప్రాంత విద్యార్థుల ప్రతిభను గుర్తించి ప్రోత్సహించేందుకు నిర్వహించే విద్యా ఆధారిత ప్రతిభ పరీక్ష.",
        note:
            "ఆసక్తి గల విద్యార్థులందరూ ఈ కార్యక్రమంలో నమోదు చేసుకొని పాల్గొనాలి.",
        date: "10 జనవరి 2026",
        location: "బొడ్డపాడు",
        registerTitle: "విద్యార్థి నమోదు",
        toggle: "English",
    },
};

export default function StudentRegistrationPage() {
    const [schools, setSchools] = useState<School[]>([]);
    const [search, setSearch] = useState("");
    const [loadingSchools, setLoadingSchools] = useState(true);
    const [lang, setLang] = useState<"en" | "te">("en");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<StudentFormData>({
        resolver: zodResolver(studentSchema),
    });

    useEffect(() => {
        fetchSchools()
            .then(setSchools)
            .catch(() => toast.error("Failed to load schools"))
            .finally(() => setLoadingSchools(false));
    }, []);

    const filteredSchools = useMemo(
        () =>
            schools.filter((s) =>
                s.name.toLowerCase().includes(search.toLowerCase())
            ),
        [schools, search]
    );

    const onSubmit = async (data: StudentFormData) => {
        try {
            await submitStudent(data);
            toast.success("Registration successful!");
            reset();
        } catch (err: any) {
            toast.error(err.message || "Registration failed");
        }
    };

    return (
        <main className="bg-gray-50">

            {/* ================= FULL WIDTH RESPONSIVE BANNER ================= */}
            <section className="relative w-full overflow-hidden animate-fade-in">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('images/banner/uvv-banner.jpg')" }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60" />

                {/* Content */}
                <div className="relative z-10 max-w-6xl mx-auto px-4 text-white">

                    {/* Language Toggle */}
                    <div className="flex justify-end mb-6">
                        <button
                            onClick={() => setLang(lang === "en" ? "te" : "en")}
                            className="text-sm underline opacity-90"
                        >
                            {CONTENT[lang].toggle}
                        </button>
                    </div>

                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-center mb-4 leading-tight">
                        🎓 {CONTENT[lang].title}
                    </h1>

                    <p className="text-sm sm:text-base md:text-lg text-center max-w-3xl mx-auto mb-6 opacity-95">
                        {CONTENT[lang].description}
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6 text-sm sm:text-base">
                        <span className="bg-white/20 px-4 py-2 rounded-lg">
                            📅 {CONTENT[lang].date}
                        </span>
                        <span className="bg-white/20 px-4 py-2 rounded-lg">
                            📍 {CONTENT[lang].location}
                        </span>
                    </div>

                    <p className="text-center text-sm sm:text-base opacity-90 max-w-3xl mx-auto">
                        {CONTENT[lang].note}
                    </p>
                </div>
            </section>

            {/* ================= FORM SECTION ================= */}
            <section
                id="register"
                className="max-w-6xl mx-auto px-4 py-12 flex justify-center"
            >
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                    <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6">
                        {CONTENT[lang].registerTitle}
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <input {...register("fullName")} placeholder="First Name *" className="w-full rounded-md border border-black/20 border-solid 
                             px-5 py-3 text-base text-gray-900 outline-none transition 
                             placeholder:text-grey-400 focus:border-primary focus-visible:shadow-none dark:focus:border-primary" />
                                {errors.fullName && <p className="error">{errors.fullName.message}</p>}
                            </div>
                            <div>
                                <input {...register("surName")} className="w-full rounded-md border border-black/20 border-solid 
                             px-5 py-3 text-base text-gray-900 outline-none transition 
                             placeholder:text-grey-400 focus:border-primary focus-visible:shadow-none dark:focus:border-primary" placeholder="Last Name *" />
                                {errors.surName && <p className="error">{errors.surName.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <input {...register("email")} className="w-full rounded-md border border-black/20 border-solid 
                             px-5 py-3 text-base text-gray-900 outline-none transition 
                             placeholder:text-grey-400 focus:border-primary focus-visible:shadow-none dark:focus:border-primary" placeholder="Email (optional)" />
                                {errors.email && <p className="error">{errors.email.message}</p>}
                            </div>
                            <input {...register("phoneNumber")} className="w-full rounded-md border border-black/20 border-solid 
                             px-5 py-3 text-base text-gray-900 outline-none transition 
                             placeholder:text-grey-400 focus:border-primary focus-visible:shadow-none dark:focus:border-primary" placeholder="Phone (optional)" />
                        </div>

                        <input
                            type="text"
                            className="w-full rounded-md border border-black/20 bg-white
             px-5 py-3 text-base text-gray-900
             outline-none transition
             placeholder:text-gray-400
             focus:border-primary focus:ring-1 focus:ring-primary"
                            placeholder="Search School"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <div>
                            <select {...register("schoolId")} className="w-full rounded-md border border-black/20 border-solid 
                             px-5 py-3 text-base text-gray-900 outline-none transition 
                             placeholder:text-grey-400 focus:border-primary focus-visible:shadow-none dark:focus:border-primary" disabled={loadingSchools}>
                                <option value="">
                                    {loadingSchools ? "Loading schools..." : "Select School *"}
                                </option>
                                {filteredSchools.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.name}
                                    </option>
                                ))}
                            </select>
                            {errors.schoolId && <p className="error">{errors.schoolId.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || loadingSchools}
                            className="w-full bg-black text-white py-3 rounded-lg
                         hover:bg-gray-800 transition disabled:opacity-50"
                        >
                            {isSubmitting ? "Registering..." : "Register"}
                        </button>
                    </form>
                </div>
            </section>

            {/* ================= STICKY MOBILE CTA ================= */}
            <a
                href="#register"
                className="fixed bottom-5 right-5 bg-indigo-600 text-white
                   px-5 py-3 rounded-full shadow-lg hover:bg-indigo-700
                   transition sm:hidden"
            >
                Register Now
            </a>
        </main>
    );
}
