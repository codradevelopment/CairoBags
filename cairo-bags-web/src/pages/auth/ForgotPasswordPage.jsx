import { useState } from "react";
import { Link } from "react-router-dom";
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

export function ForgotPasswordPage() {
  const { locale } = useLocale();
  const { forgotPasswordRequestCode, forgotPasswordComplete } = useAuth();
  const { success, error: toastError } = useToast();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const copy = {
    title: locale === "ar" ? "استعادة كلمة المرور" : "Reset Password",
    step1Subtitle:
      locale === "ar"
        ? "أدخل بريدك الإلكتروني لاستلام رمز التحقق"
        : "Enter your email to receive a verification code",
    step2Subtitle:
      locale === "ar"
        ? "أدخل الرمز وكلمة المرور الجديدة"
        : "Enter the code and your new password",
    email: locale === "ar" ? "البريد الإلكتروني" : "Email",
    code: locale === "ar" ? "رمز التحقق" : "Verification code",
    newPassword: locale === "ar" ? "كلمة المرور الجديدة" : "New password",
    confirm: locale === "ar" ? "تأكيد كلمة المرور" : "Confirm password",
    sendCode: locale === "ar" ? "إرسال الرمز" : "Send Code",
    reset: locale === "ar" ? "تعيين كلمة المرور" : "Set New Password",
    back: locale === "ar" ? "العودة لتسجيل الدخول" : "Back to sign in",
    passwordHint: locale === "ar" ? "٩ أحرف على الأقل" : "At least 9 characters",
  };

  async function handleRequestCode(event) {
    event.preventDefault();
    setFieldErrors({});
    if (!email.trim()) {
      setFieldErrors({ email: locale === "ar" ? "مطلوب" : "Required" });
      return;
    }

    setSubmitting(true);
    try {
      await forgotPasswordRequestCode({ email: email.trim() });
      success(locale === "ar" ? "تم إرسال الرمز" : "Verification code sent");
      setStep(2);
    } catch (err) {
      toastError(err.message || (locale === "ar" ? "فشل إرسال الرمز" : "Failed to send code"));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleComplete(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!code.trim()) nextErrors.code = locale === "ar" ? "مطلوب" : "Required";
    if (!newPassword) nextErrors.newPassword = locale === "ar" ? "مطلوب" : "Required";
    else if (newPassword.length < 9) {
      nextErrors.newPassword = locale === "ar" ? "٩ أحرف على الأقل" : "At least 9 characters";
    }
    if (newPassword !== confirmPassword) {
      nextErrors.confirmPassword = locale === "ar" ? "كلمات المرور غير متطابقة" : "Passwords do not match";
    }
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSubmitting(true);
    try {
      await forgotPasswordComplete({
        email: email.trim(),
        code: code.trim(),
        newPassword,
      });
      success(locale === "ar" ? "تم تحديث كلمة المرور" : "Password updated successfully");
      setStep(3);
    } catch (err) {
      toastError(err.message || (locale === "ar" ? "فشل إعادة التعيين" : "Reset failed"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthPageLayout>
      <Card variant="elevated" padding="lg" className="border-brand-border/80 shadow-soft">
        <CardHeader
          title={copy.title}
          subtitle={step === 1 ? copy.step1Subtitle : copy.step2Subtitle}
          className="text-center [&_h3]:font-display [&_h3]:text-2xl"
        />

        {step === 1 ? (
          <form onSubmit={handleRequestCode} noValidate>
            <CardBody>
              <InputGroup>
                <Label htmlFor="forgot-email" required>
                  {copy.email}
                </Label>
                <Input
                  id="forgot-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant={fieldErrors.email ? "error" : "default"}
                />
                <FieldError>{fieldErrors.email}</FieldError>
              </InputGroup>
            </CardBody>
            <CardFooter className="flex-col items-stretch gap-4 border-brand-border/60">
              <Button type="submit" variant="accent" size="lg" loading={submitting} className="w-full">
                {copy.sendCode}
              </Button>
              <Link to="/login" className="text-center text-sm text-brand-muted hover:text-brand-accent">
                {copy.back}
              </Link>
            </CardFooter>
          </form>
        ) : null}

        {step === 2 ? (
          <form onSubmit={handleComplete} noValidate>
            <CardBody className="space-y-4">
              <InputGroup>
                <Label htmlFor="forgot-code" required>
                  {copy.code}
                </Label>
                <Input
                  id="forgot-code"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  variant={fieldErrors.code ? "error" : "default"}
                />
                <FieldError>{fieldErrors.code}</FieldError>
              </InputGroup>

              <InputGroup>
                <Label htmlFor="forgot-password" required>
                  {copy.newPassword}
                </Label>
                <Input
                  id="forgot-password"
                  type="password"
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  variant={fieldErrors.newPassword ? "error" : "default"}
                />
                <FieldError>{fieldErrors.newPassword}</FieldError>
                <p className="mt-1 text-xs text-brand-muted">{copy.passwordHint}</p>
              </InputGroup>

              <InputGroup>
                <Label htmlFor="forgot-confirm" required>
                  {copy.confirm}
                </Label>
                <Input
                  id="forgot-confirm"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  variant={fieldErrors.confirmPassword ? "error" : "default"}
                />
                <FieldError>{fieldErrors.confirmPassword}</FieldError>
              </InputGroup>
            </CardBody>
            <CardFooter className="flex-col items-stretch gap-4 border-brand-border/60">
              <Button type="submit" variant="primary" size="lg" loading={submitting} className="w-full">
                {copy.reset}
              </Button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-center text-sm text-brand-muted transition-colors hover:text-brand-accent"
              >
                {locale === "ar" ? "إعادة إرسال الرمز" : "Resend code"}
              </button>
            </CardFooter>
          </form>
        ) : null}

        {step === 3 ? (
          <CardBody className="text-center">
            <p className="text-sm text-brand-muted">
              {locale === "ar"
                ? "يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة."
                : "You can now sign in with your new password."}
            </p>
            <Link to="/login" className="mt-6 inline-block">
              <Button variant="accent">{copy.back}</Button>
            </Link>
          </CardBody>
        ) : null}
      </Card>
    </AuthPageLayout>
  );
}
