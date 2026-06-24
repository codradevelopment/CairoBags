import { StoreLayout } from "../../layouts/StoreLayout.jsx";
import { usePageTitle } from "../../hooks/usePageTitle.js";
import { useLocale } from "../../components/layout/LanguageSwitcher.jsx";
import {
  HeroSection,
  CategoryGrid,
  FeaturedProducts,
  NewArrivals,
  WhyChooseSection,
  NewsletterSection,
} from "../../components/store/index.js";

export function HomePage() {
  const { locale } = useLocale();
  usePageTitle(locale === "ar" ? "الرئيسية" : "Home");

  return (
    <StoreLayout fullWidth contentClassName="!py-0">
      <HeroSection />
      <div className="cb-container space-y-16 py-12 md:space-y-20 md:py-16">
        <CategoryGrid />
        <FeaturedProducts />
        <NewArrivals />
        <WhyChooseSection />
        <NewsletterSection />
      </div>
    </StoreLayout>
  );
}
