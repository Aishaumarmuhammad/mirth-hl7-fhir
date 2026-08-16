-- Target table for the HL7 -> SQL Server destination (Database Writer)
USE KIS_Interface_Hub;   -- or any database you like
CREATE TABLE dbo.mirth_demo (
    id        INT IDENTITY(1,1) PRIMARY KEY,
    nachname  NVARCHAR(60),
    testcode  NVARCHAR(20),
    wert      NVARCHAR(40),
    received  DATETIME2(0) DEFAULT SYSDATETIME()
);

-- Database Writer INSERT statement (uses channelMap variables):
-- INSERT INTO dbo.mirth_demo (nachname, testcode, wert)
-- VALUES ('${nachname}', '${testcode}', '${wert}');
