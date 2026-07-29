# ── Stage 1: Build ──────────────────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy csproj and restore first (layer caching)
COPY CairoBags/CairoBags.csproj CairoBags/
RUN dotnet restore CairoBags/CairoBags.csproj

# Copy everything else and publish
COPY CairoBags/ CairoBags/
WORKDIR /src/CairoBags
RUN dotnet publish CairoBags.csproj -c Release -o /app/publish --no-restore

# ── Stage 2: Runtime ─────────────────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app

# Create FileStorage directory (Railway Volume will be mounted here)
RUN mkdir -p /app/FileStorage

COPY --from=build /app/publish .

# Railway injects PORT env var; ASP.NET Core reads ASPNETCORE_URLS
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "CairoBags.dll"]
