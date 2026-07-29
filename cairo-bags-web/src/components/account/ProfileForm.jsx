import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useLocale } from "../layout/LanguageSwitcher.jsx";
import { useToast } from "../ui/Toast.jsx";
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
} from "../ui/index.js";

export function ProfileForm() {
  const { user, updateProfile, updateUsername, changePassword, refreshProfile } = useAuth();
  const { locale } = useLocale();
  const { success, error: toastError } = useToast();

  const [profileForm, setProfileForm] = useState({
    userName: user?.userName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
  });
  const [usernameForm, setUsernameForm] = useState({ username: user?.userName || "" });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [profileSubmitting, setProfileSubmitting] = useState(false);
  const [usernameSubmitting, setUsernameSubmitting] = useState(false);
  const [passwordSubmitting, setPasswordSubmitting] = useState(false);
  const [profileErrors, setProfileErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});

  async function handleProfileSubmit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!profileForm.email.trim()) nextErrors.email = locale === "ar" ? "مطلوب" : "Required";
    if (!profileForm.phoneNumber.trim()) nextErrors.phoneNumber = locale === "ar" ? "مطلوب" : "Required";
    setProfileErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setProfileSubmitting(true);
    try {
      await updateProfile({
        userName: profileForm.userName.trim(),
        email: profileForm.email.trim(),
        phoneNumber: profileForm.phoneNumber.trim(),
      });
      success(locale === "ar" ? "تم تحديث الملف الشخصي" : "Profile updated");
    } catch (err) {
      toastError(err.message);
    } finally {
      setProfileSubmitting(false);
    }
  }

  async function handleUsernameSubmit(event) {
    event.preventDefault();
    if (!usernameForm.username.trim()) {
      toastError(locale === "ar" ? "اسم المستخدم مطلوب" : "Username is required");
      return;
    }

    setUsernameSubmitting(true);
    try {
      await updateUsername({ username: usernameForm.username.trim() });
      await refreshProfile();
      setProfileForm((prev) => ({ ...prev, userName: usernameForm.username.trim() }));
      success(locale === "ar" ? "تم تحديث اسم المستخدم" : "Username updated");
    } catch (err) {
      toastError(err.message);
    } finally {
      setUsernameSubmitting(false);
    }
  }

  async function handlePasswordSubmit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!passwordForm.currentPassword) nextErrors.currentPassword = locale === "ar" ? "مطلوب" : "Required";
    if (!passwordForm.newPassword) nextErrors.newPassword = locale === "ar" ? "مطلوب" : "Required";
    else if (passwordForm.newPassword.length < 9) {
      nextErrors.newPassword = locale === "ar" ? "٩ أحرف على الأقل" : "At least 9 characters";
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      nextErrors.confirmPassword = locale === "ar" ? "كلمات المرور غير متطابقة" : "Passwords do not match";
    }
    setPasswordErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setPasswordSubmitting(true);
    try {
      await changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      success(locale === "ar" ? "تم تغيير كلمة المرور" : "Password changed");
    } catch (err) {
      toastError(err.message);
    } finally {
      setPasswordSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card variant="default" padding="lg">
        <CardHeader
          title={locale === "ar" ? "البيانات الشخصية" : "Personal Details"}
          subtitle={locale === "ar" ? "حدّث معلومات الاتصال" : "Update your contact information"}
        />
        <form onSubmit={handleProfileSubmit}>
          <CardBody className="space-y-4">
            <InputGroup>
              <Label htmlFor="profile-email" required>
                {locale === "ar" ? "البريد الإلكتروني" : "Email"}
              </Label>
              <Input
                id="profile-email"
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                variant={profileErrors.email ? "error" : "default"}
              />
              <FieldError>{profileErrors.email}</FieldError>
            </InputGroup>
            <InputGroup>
              <Label htmlFor="profile-phone" required>
                {locale === "ar" ? "رقم الهاتف" : "Phone number"}
              </Label>
              <Input
                id="profile-phone"
                type="tel"
                value={profileForm.phoneNumber}
                onChange={(e) => setProfileForm({ ...profileForm, phoneNumber: e.target.value })}
                variant={profileErrors.phoneNumber ? "error" : "default"}
              />
              <FieldError>{profileErrors.phoneNumber}</FieldError>
            </InputGroup>
          </CardBody>
          <CardFooter>
            <Button type="submit" variant="accent" loading={profileSubmitting}>
              {locale === "ar" ? "حفظ التغييرات" : "Save changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card variant="default" padding="lg">
        <CardHeader
          title={locale === "ar" ? "اسم المستخدم" : "Username"}
          subtitle={locale === "ar" ? "يُستخدم لتسجيل الدخول" : "Used for sign in"}
        />
        <form onSubmit={handleUsernameSubmit}>
          <CardBody>
            <InputGroup>
              <Label htmlFor="profile-username" required>
                {locale === "ar" ? "اسم المستخدم" : "Username"}
              </Label>
              <Input
                id="profile-username"
                value={usernameForm.username}
                onChange={(e) => setUsernameForm({ username: e.target.value })}
              />
            </InputGroup>
          </CardBody>
          <CardFooter>
            <Button type="submit" variant="outline" loading={usernameSubmitting}>
              {locale === "ar" ? "تحديث اسم المستخدم" : "Update username"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card variant="default" padding="lg">
        <CardHeader
          title={locale === "ar" ? "كلمة المرور" : "Password"}
          subtitle={locale === "ar" ? "غيّر كلمة المرور بأمان" : "Change your password securely"}
        />
        <form onSubmit={handlePasswordSubmit}>
          <CardBody className="space-y-4">
            <InputGroup>
              <Label htmlFor="current-password" required>
                {locale === "ar" ? "كلمة المرور الحالية" : "Current password"}
              </Label>
              <Input
                id="current-password"
                type="password"
                autoComplete="current-password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                variant={passwordErrors.currentPassword ? "error" : "default"}
              />
              <FieldError>{passwordErrors.currentPassword}</FieldError>
            </InputGroup>
            <InputGroup>
              <Label htmlFor="new-password" required>
                {locale === "ar" ? "كلمة المرور الجديدة" : "New password"}
              </Label>
              <Input
                id="new-password"
                type="password"
                autoComplete="new-password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                variant={passwordErrors.newPassword ? "error" : "default"}
              />
              <FieldError>{passwordErrors.newPassword}</FieldError>
            </InputGroup>
            <InputGroup>
              <Label htmlFor="confirm-password" required>
                {locale === "ar" ? "تأكيد كلمة المرور" : "Confirm password"}
              </Label>
              <Input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                variant={passwordErrors.confirmPassword ? "error" : "default"}
              />
              <FieldError>{passwordErrors.confirmPassword}</FieldError>
            </InputGroup>
          </CardBody>
          <CardFooter>
            <Button type="submit" variant="primary" loading={passwordSubmitting}>
              {locale === "ar" ? "تغيير كلمة المرور" : "Change password"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
