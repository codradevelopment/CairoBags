import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthPageLayout } from "./AuthPageLayout.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useLocale } from "../../components/layout/LanguageSwitcher.jsx";
import { useToast } from "../../components/ui/Toast.jsx";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FieldError,
  Input,
  InputGroup,
  Label,
} from "../../components/ui/index.js";

function getRedirectPath(user, from) {
  if (from && from !== "/login" && from !== "/register") return from;
  if (user?.role?.includes("Admin")) return "/admin";
  return "/account";
}

export function LoginPage() {
  const { locale } = useLocale();
  const { login } = useAuth();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const copy = {
    title: locale === "ar" ? "تسجيل الدخول" : "Sign In",
    subtitle:
      locale === "ar"
        ? "مرحباً بعودتك إلى عالم الأناقة"
        : "Welcome back to refined elegance",
    email: locale === "ar" ? "البريد الإلكتروني" : "Email",
    password: locale === "ar" ? "كلمة المرور" : "Password",
    submit: locale === "ar" ? "دخول" : "Sign In",
    forgot: locale === "ar" ? "نسيت كلمة المرور؟" : "Forgot password?",
    noAccount: locale === "ar" ? "ليس لديك حساب؟" : "Don't have an account?",
    register: locale === "ar" ? "إنشاء حساب" : "Create account",
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setFieldErrors({});

    const nextErrors = {};
    if (!email.trim()) nextErrors.email = locale === "ar" ? "مطلوب" : "Required";
    if (!password) nextErrors.password = locale === "ar" ? "مطلوب" : "Required";
    if (Object.keys(nextErrors).length) {
      setFieldErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    try {
      const response = await login({ email: email.trim(), password });
      success(locale === "ar" ? "تم تسجيل الدخول" : "Signed in successfully");
      navigate(getRedirectPath(response.user, from), { replace: true });
    } catch (err) {
      toastError(err.message || (locale === "ar" ? "فشل تسجيل الدخول" : "Sign in failed"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthPageLayout>
      <Card variant="elevated" padding="lg" className="border-brand-border/80 shadow-soft">
        <CardHeader
          title={copy.title}
          subtitle={copy.subtitle}
          className="text-center [&_h3]:font-display [&_h3]:text-2xl"
        />
        <form onSubmit={handleSubmit} noValidate>
          <CardBody className="space-y-5">
            <InputGroup>
              <Label htmlFor="login-email" required>
                {copy.email}
              </Label>
              <Input
                id="login-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant={fieldErrors.email ? "error" : "default"}
              />
              <FieldError>{fieldErrors.email}</FieldError>
            </InputGroup>

            <InputGroup>
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <Label htmlFor="login-password" required className="mb-0">
                  {copy.password}
                </Label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-brand-accent transition-colors hover:text-brand-primary"
                >
                  {copy.forgot}
                </Link>
              </div>
              <Input
                id="login-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant={fieldErrors.password ? "error" : "default"}
              />
              <FieldError>{fieldErrors.password}</FieldError>
            </InputGroup>
          </CardBody>

          <CardFooter className="flex-col items-stretch gap-4 border-brand-border/60">
            <Button type="submit" variant="primary" size="lg" loading={submitting} className="w-full">
              {copy.submit}
            </Button>
            <p className="text-center text-sm text-brand-muted">
              {copy.noAccount}{" "}
              <Link to="/register" className="font-medium text-brand-accent hover:text-brand-primary">
                {copy.register}
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </AuthPageLayout>
  );
}
