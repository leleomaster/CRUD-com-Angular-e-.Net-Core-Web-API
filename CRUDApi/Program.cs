using CRUDApi.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder (args);

var connection = builder.Configuration["ServerSqlConnection:SqlServerConectionString"];

builder.Services.AddDbContext<Contexto>
    (
     options => options.UseSqlServer(connection)
    );

builder.Services.AddCors();

// Add services to the container.

builder.Services.AddControllers ();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer ();
builder.Services.AddSwaggerGen ();

builder.Services.AddScoped<Contexto, Contexto>();

var app = builder.Build ();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment ()) {
    app.UseSwagger ();
    app.UseSwaggerUI ();
}

app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseHttpsRedirection ();

app.UseAuthorization ();

app.MapControllers ();

app.Run ();