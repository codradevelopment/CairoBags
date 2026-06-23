import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

export function RegisterPage() {
  const { locale } = useLocale();
  const { register } = useAuth();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const copy = {
    title: locale === "ar" ? "إنشاء حساب" : "Create Account",
    subtitle:
      locale === "ar"
        ? "انضم إلى عالم الحقائب الفاخرة"
        : "Join the world of luxury handbags",
    userName: locale === "ar" ? "اسم المستخدم" : "Username",
    email: locale === "ar" ? "البريد الإلكتروني" : "Email",
    phone: locale === "ar" ? "رقم الهاتف" : "Phone number",
    password: locale === "ar" ? "كلمة المرور" : "Password",
    confirm: locale === "ar" ? "تأكيد كلمة المرور" : "Confirm password",
    submit: locale === "ar" ? "إنشاء حساب" : "Create Account",
    hasAccount: locale === "ar" ? "لديك حساب بالفعل؟" : "Already have an account?",
    signIn: locale === "ar" ? "تسجيل الدخول" : "Sign in",
    passwordHint: locale === "ar" ? "٩ أحرف على الأقل" : "At least 9 characters",
  };

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate() {
    const nextErrors = {};
    if (!form.userName.trim()) nextErrors.userName = locale === "ar" ? "مطلوب" : "Required";
    if (!form.email.trim()) nextErrors.email = locale === "ar" ? "مطلوب" : "Required";
    if (!form.phoneNumber.trim()) nextErrors.phoneNumber = locale === "ar" ? "مطلوب" : "Required";
    if (!form.password) nextErrors.password = locale === "ar" ? "مطلوب" : "Required";
    else if (form.password.length < 9) {
      nextErrors.password = locale === "ar" ? "٩ أحرف على الأقل" : "At least 9 characters";
    }
    if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = locale === "ar" ? "كلمات المرور غير متطابقة" : "Passwords do not match";
    }
    return nextErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate();
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSubmitting(true);
    try {
      await register({
        userName: form.userName.trim(),
        email: form.email.trim(),
        phoneNumber: form.phoneNumber.trim(),
        password: form.password,
      });
      success(locale === "ar" ? "تم إنشاء الحساب" : "Account created successfully");
      navigate("/account", { replace: true });
    } catch (err) {
      toastError(err.message || (locale === "ar" ? "فشل التسجيل" : "Registration failed"));
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
          <CardBody className="space-y-4">
            <InputGroup>
              <Label htmlFor="register-username" required>
                {copy.userName}
              </Label>
              <Input
                id="register-username"
                autoComplete="username"
                value={form.userName}
                onChange={(e) => updateField("userName", e.target.value)}
                variant={fieldErrors.userName ? "error" : "default"}
              />
              <FieldError>{fieldErrors.userName}</FieldError>
            </InputGroup>

            <InputGroup>
              <Label htmlFor="register-email" required>
                {copy.email}
              </Label>
              <Input
                id="register-email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                variant={fieldErrors.email ? "error" : "default"}
              />
              <FieldError>{fieldErrors.email}</FieldError>
            </InputGroup>

            <InputGroup>
              <Label htmlFor="register-phone" required>
                {copy.phone}
              </Label>
              <Input
                id="register-phone"
                type="tel"
                autoComplete="tel"
                value={form.phoneNumber}
                onChange={(e) => updateField("phoneNumber", e.target.value)}
                variant={fieldErrors.phoneNumber ? "error" : "default"}
              />
              <FieldError>{fieldErrors.phoneNumber}</FieldError>
            </InputGroup>

            <InputGroup>
              <Label htmlFor="register-password" required>
                {copy.password}
              </Label>
              <Input
                id="register-password"
                type="password"
                autoComplete="new-password"
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
                variant={fieldErrors.password ? "error" : "default"}
              />
              <FieldError>{fieldErrors.password}</FieldError>
              <p className="mt-1 text-xs text-brand-muted">{copy.passwordHint}</p>
            </InputGroup>

            <InputGroup>
              <Label htmlFor="register-confirm" required>
                {copy.confirm}
              </Label>
              <Input
                id="register-confirm"
                type="password"
                autoComplete="new-password"
                value={form.confirmPassword}
                onChange={(e) => updateField("confirmPassword", e.target.value)}
                variant={fieldErrors.confirmPassword ? "error" : "default"}
              />
              <FieldError>{fieldErrors.confirmPassword}</FieldError>
            </InputGroup>
          </CardBody>

          <CardFooter className="flex-col items-stretch gap-4 border-brand-border/60">
            <Button type="submit" variant="accent" size="lg" loading={submitting} className="w-full">
              {copy.submit}
            </Button>
            <p className="text-center text-sm text-brand-muted">
              {copy.hasAccount}{" "}
              <Link to="/login" className="font-medium text-brand-accent hover:text-brand-primary">
                {copy.signIn}
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </AuthPageLayout>
  );
}
