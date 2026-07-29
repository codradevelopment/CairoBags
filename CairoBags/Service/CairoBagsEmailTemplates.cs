using System.Net;

namespace CairoBags.Service;

/// <summary>
/// Branded HTML email bodies for Cairo Bags (dark theme). All dynamic text is HTML-encoded.
/// </summary>
public static class CairoBagsEmailTemplates
{
    public const string BrandName = "Cairo Bags";

    private static string H(string? s) => WebUtility.HtmlEncode(s ?? string.Empty);

    private static string Href(string? url)
    {
        if (string.IsNullOrWhiteSpace(url)) return "#";
        return WebUtility.HtmlEncode(url.Trim());
    }

    private static string EmailDocument(string pageTitle, string preheader, string innerHtml)
    {
        var title = H(pageTitle);
        var pre = H(preheader);
        return $@"<!DOCTYPE html>
<html lang=""en"">
<head>
<meta charset=""utf-8""/>
<meta name=""viewport"" content=""width=device-width,initial-scale=1""/>
<meta name=""x-apple-disable-message-reformatting""/>
<title>{title}</title>
<style>
@media only screen and (max-width: 600px) {{
  .cb-pad {{ padding: 20px 16px !important; }}
  .cb-card {{ padding: 24px 20px !important; border-radius: 16px !important; }}
  .cb-h1 {{ font-size: 20px !important; }}
  .cb-code {{ font-size: 28px !important; letter-spacing: 0.35em !important; }}
}}
a.cb-btn:hover {{ filter: brightness(1.12); }}
</style>
</head>
<body style=""margin:0;padding:0;background:#0b1220;"">
<div style=""display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;"">{pre}</div>
<table role=""presentation"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" style=""background:#0b1220;"">
<tr><td align=""center"" class=""cb-pad"" style=""padding:32px 16px;background:linear-gradient(180deg,#0b1220 0%,#111827 50%,#0b1220 100%);"">
<table role=""presentation"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" style=""max-width:600px;border-collapse:separate;"">
<tr><td class=""cb-card"" style=""background:#111827;border-radius:20px;border:1px solid rgba(20,184,166,0.35);box-shadow:0 12px 48px rgba(0,0,0,0.5);padding:36px 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:#e2e8f0;line-height:1.65;"">
<div style=""height:3px;border-radius:3px;background:linear-gradient(90deg,#14b8a6,#0ea5e9,#22d3ee);margin:-36px -32px 24px -32px;""></div>
{innerHtml}
<hr style=""border:none;border-top:1px solid rgba(148,163,184,0.22);margin:28px 0 18px;""/>
<p style=""margin:0;font-size:12px;color:#64748b;text-align:center;"">© {H(BrandName)}</p>
</td></tr></table>
</td></tr></table>
</body>
</html>";
    }

    private static string RoleBadge(string emoji, string label) =>
        $@"<div style=""margin:0 0 20px;"">
<span style=""display:inline-block;font-size:13px;font-weight:700;letter-spacing:0.03em;padding:8px 16px;border-radius:999px;background:rgba(20,184,166,0.12);color:#5eead4;border:1px solid rgba(45,212,191,0.4);"">{emoji} {H(label)}</span>
</div>";

    private static string CtaRow(string href, string buttonLabel)
    {
        var u = Href(href);
        var l = H(buttonLabel);
        return $@"<table role=""presentation"" cellspacing=""0"" cellpadding=""0"" border=""0"" style=""margin:26px 0 8px;width:100%;"">
<tr><td align=""center"" style=""padding:0;"">
<a class=""cb-btn"" href=""{u}"" style=""display:inline-block;padding:15px 32px;border-radius:12px;font-weight:800;font-size:15px;text-decoration:none;color:#0f172a !important;background:#14b8a6;background:linear-gradient(135deg,#2dd4bf,#14b8a6,#0ea5e9);box-shadow:0 4px 20px rgba(20,184,166,0.35);"">{l}</a>
</td></tr></table>";
    }

    private static string SectionDivider() =>
        @"<hr style=""border:none;border-top:1px solid rgba(148,163,184,0.18);margin:22px 0;""/>";

    /// <summary>Customer self-registration — never include a password.</summary>
    public static (string Subject, string Html) BuildCustomerWelcomeEmail(
        string name,
        string email,
        string phone,
        string shopUrl)
    {
        var subject = $"Welcome to {BrandName}";
        var inner = $@"
{RoleBadge("🛍️", "Customer")}
<h1 class=""cb-h1"" style=""margin:0 0 14px;font-size:24px;font-weight:800;color:#f8fafc;letter-spacing:-0.02em;"">Welcome to {H(BrandName)}</h1>
<p style=""margin:0 0 14px;color:#e2e8f0;"">Hello <strong style=""color:#fff;"">{H(name)}</strong>,</p>
<p style=""margin:0 0 18px;color:#cbd5e1;"">Thank you for creating your account. You can now browse our collection, manage your cart, and track your orders.</p>
<p style=""margin:0 0 10px;font-weight:700;color:#f1f5f9;"">You can now:</p>
<ul style=""margin:0 0 20px;padding-left:20px;color:#cbd5e1;"">
<li style=""margin:8px 0;"">Browse bags and accessories</li>
<li style=""margin:8px 0;"">Save items to your wishlist</li>
<li style=""margin:8px 0;"">Track orders and payments</li>
</ul>
{SectionDivider()}
<p style=""margin:0 0 12px;font-weight:700;color:#f8fafc;"">Your Account Info</p>
<table role=""presentation"" width=""100%"" style=""background:rgba(15,23,42,0.65);border-radius:12px;border:1px solid rgba(148,163,184,0.2);"" cellpadding=""0"" cellspacing=""0"">
<tr><td style=""padding:16px 18px;color:#cbd5e1;"">
<p style=""margin:8px 0;"">• Name: <strong style=""color:#f1f5f9;"">{H(name)}</strong></p>
<p style=""margin:8px 0;"">• Email: <strong style=""color:#f1f5f9;"">{H(email)}</strong></p>
<p style=""margin:8px 0;"">• Phone: <strong style=""color:#f1f5f9;"">{H(phone)}</strong></p>
</td></tr></table>
{CtaRow(shopUrl, "Start Shopping")}
<p style=""margin:18px 0 0;font-size:12px;color:#64748b;"">If the button does not work:<br/>
<a href=""{Href(shopUrl)}"" style=""color:#5eead4;word-break:break-all;"">{Href(shopUrl)}</a></p>";
        return (subject, EmailDocument("Welcome — " + BrandName, subject, inner));
    }

    /// <summary>Password reset OTP email.</summary>
    public static (string Subject, string Html) BuildPasswordResetCodeEmail(
        string recipientName,
        string code,
        int expiryMinutes,
        string resetPageUrl)
    {
        const string subject = "Your Password Reset Code";
        var encCode = H(code);
        var inner = $@"
<p style=""margin:0 0 8px;color:#94a3b8;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;"">Security</p>
<h1 class=""cb-h1"" style=""margin:0 0 18px;font-size:23px;font-weight:800;color:#f8fafc;"">Your Password Reset Code</h1>
<p style=""margin:0 0 16px;color:#e2e8f0;"">Hello <strong style=""color:#fff;"">{H(recipientName)}</strong>,</p>
<p style=""margin:0 0 20px;color:#cbd5e1;"">We received a request to reset your {H(BrandName)} account password.</p>
<p style=""margin:0 0 12px;font-weight:700;color:#f1f5f9;text-align:center;"">Your verification code is:</p>
<div style=""text-align:center;margin:8px 0 24px;"">
<div class=""cb-code"" style=""display:inline-block;font-family:'Segoe UI',Consolas,Monaco,monospace;font-size:32px;font-weight:800;letter-spacing:0.45em;color:#5eead4;text-shadow:0 0 24px rgba(45,212,191,0.35);padding:18px 22px;background:rgba(15,23,42,0.9);border-radius:14px;border:1px solid rgba(45,212,191,0.35);min-width:200px;"">🔐 {encCode}</div>
</div>
{SectionDivider()}
<p style=""margin:0 0 14px;color:#94a3b8;font-size:14px;text-align:center;"">⏳ This code expires in <strong style=""color:#fcd34d;"">{expiryMinutes} minutes</strong></p>
<p style=""margin:0;color:#64748b;font-size:13px;text-align:center;"">If you didn't request this, you can safely ignore this email.</p>
{CtaRow(resetPageUrl, "Reset Password")}
<p style=""margin:18px 0 0;font-size:12px;color:#64748b;text-align:center;"">Continue your reset:<br/>
<a href=""{Href(resetPageUrl)}"" style=""color:#5eead4;word-break:break-all;"">{Href(resetPageUrl)}</a></p>
<p style=""margin:24px 0 0;font-size:12px;color:#475569;text-align:center;line-height:1.5;"" dir=""rtl"">
رمز إعادة تعيين كلمة المرور صالح لمدة {H(expiryMinutes.ToString())} دقيقة. إن لم تطلب ذلك، تجاهل الرسالة.
</p>";
        return (subject, EmailDocument(subject, $"Your code expires in {expiryMinutes} minutes.", inner));
    }
}
