namespace CairoBags.Service;

public interface IEmailService
{
    Task SendAsync(string to, string subject, string body);
}

