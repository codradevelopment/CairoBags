import { AccountLayout } from "../../layouts/AccountLayout.jsx";
import { usePageTitle } from "../../hooks/usePageTitle.js";
import { useLocale } from "../../components/layout/LanguageSwitcher.jsx";
import { ProfileForm } from "../../components/account/index.js";

export function ProfilePage() {
  const { locale } = useLocale();
  const title = locale === "ar" ? "الملف الشخصي" : "Profile";
  usePageTitle(title);

  return (
    <AccountLayout activeKey="profile" title={title}>
      <ProfileForm />
    </AccountLayout>
  );
}
