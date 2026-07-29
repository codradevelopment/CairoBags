using System.Net;
using System.Net.Mail;

namespace CairoBags.Service;

public class EmailService : IEmailService
{
    private readonly IConfiguration _config;
    private readonly ILogger<EmailService> _logger;

    public EmailService(IConfiguration config, ILogger<EmailService> logger)
    {
        _config = config;
        _logger = logger;
    }

    public async Task SendAsync(string to, string subject, string body)
    {
        var host = _config["Email:SmtpHost"];
        if (string.IsNullOrWhiteSpace(host))
        {
            _logger.LogWarning(
                "Email skipped: Email:SmtpHost is empty. Set Email:SmtpHost, Email:FromAddress, Email:User, Email:Password in appsettings.json or User Secrets. To: {To}",
                to);
            return;
        }

        var port = int.TryParse(_config["Email:SmtpPort"], out var p) ? p : 587;
        var useSsl = bool.TryParse(_config["Email:UseSsl"], out var ssl) && ssl;
        var user = _config["Email:User"] ?? string.Empty;
        // Gmail يعرض كلمة مرور التطبيق بمسافات؛ SMTP يحتاج الـ 16 حرف بدون مسافات.
        var pass = (_config["Email:Password"] ?? string.Empty).Replace(" ", string.Empty).Trim();
        var fromAddr = _config["Email:FromAddress"];
        var fromName = _config["Email:FromName"] ?? "Cairo Bags";

        if (string.IsNullOrWhiteSpace(fromAddr))
        {
            _logger.LogWarning(
                "Email skipped: Email:FromAddress is empty (sender address). To: {To}",
                to);
            return;
        }

        using var message = new MailMessage
        {
            From = new MailAddress(fromAddr, fromName),
            Subject = subject,
            Body = body,
            IsBodyHtml = true,
        };
        message.To.Add(to);

        using var client = new SmtpClient(host, port) { EnableSsl = useSsl };
        if (!string.IsNullOrEmpty(user))
            client.Credentials = new NetworkCredential(user, pass);

        try
        {
            await client.SendMailAsync(message).ConfigureAwait(false);
            _logger.LogInformation("Email sent successfully to {To}, Subject: {Subject}", to, subject);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send email to {To}", to);
            throw;
        }
    }
}

