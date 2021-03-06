using System;
using System.Data.Common;
using API.Infrastructure.Data;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Api.Tests;
public class SqliteInMemory : BaseHandlerTest, IDisposable
{
    private readonly DbConnection _connection;

    public SqliteInMemory()
      : base(
          new DbContextOptionsBuilder<AppDbContext>()
            .UseSqlite(CreateInMemoryDatabase())
            .Options)
    {
        _connection = RelationalOptionsExtension.Extract(ContextOptions).Connection;
    }
    private static DbConnection CreateInMemoryDatabase()
    {
        var connection = new SqliteConnection("Filename=:memory:");
        connection.Open();
        return connection;
    }
    public void Dispose() => _connection.Dispose();
}