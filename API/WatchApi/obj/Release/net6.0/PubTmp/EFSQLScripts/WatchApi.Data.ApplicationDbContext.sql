IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230312163243_init1')
BEGIN
    CREATE TABLE [WatchData] (
        [Id] int NOT NULL IDENTITY,
        [BPM] nvarchar(max) NOT NULL,
        [Pressure] nvarchar(max) NOT NULL,
        [Light] nvarchar(max) NOT NULL,
        [Date] datetime2 NOT NULL,
        CONSTRAINT [PK_WatchData] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230312163243_init1')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230312163243_init1', N'6.0.4');
END;
GO

COMMIT;
GO

