import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("Home");
  return (
    <main className="flex flex-col items-center justify-between p-20">
      <h1 className="text-2xl font-bold mt-20">{t("description")}</h1>
    </main>
  );
}
