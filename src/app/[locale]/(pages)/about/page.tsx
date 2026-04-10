import { getTranslations } from "next-intl/server";

export default async function AboutPage() {
  const t = await getTranslations("AboutPage");

  return (
    <div className="mx-auto mt-20 text-center">
      <h1 className="text-base md:text-2xl">{t("title")}</h1>
      <p className="mt-6 text-sm md:text-lg">{t("description")}</p>
    </div>
  );
}
