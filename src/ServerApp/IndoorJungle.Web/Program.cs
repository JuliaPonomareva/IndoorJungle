using IndoorJungle.Web.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();
builder.Services.AddControllersWithViews().AddRazorRuntimeCompilation();
builder.Services.AddCors();

var app = builder.Build();
app.UseCors(builder => builder.AllowAnyOrigin());
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

//app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
app.MapRazorPages();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.Migrate();

    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();
    var user = await userManager.FindByEmailAsync("admin@indoorjungle.com");
    if (user == null)
    {
        var result = await userManager.CreateAsync(new IdentityUser
        {
            Id = Guid.NewGuid().ToString(),
            Email = "admin@indoorjungle.com",
            UserName = "admin@indoorjungle.com",
            EmailConfirmed = true,
            AccessFailedCount = 0,
            LockoutEnabled = false,
            TwoFactorEnabled = false,
            PhoneNumberConfirmed = true,
            PhoneNumber = ""
        }, "_Admin123456");
    }
}

app.Run();
