/* FOR RESET ONLY */
DROP TABLE User CASCADE;
DROP TABLE Company CASCADE;
DROP TABLE Job CASCADE;
DROP TABLE JobApplication CASCADE;
DROP TABLE Contractor CASCADE;
DROP TABLE JobTag CASCADE;
DROP TABLE Tag CASCADE;
DROP TABLE ContractorTag CASCADE;
/* FOR RESET ONLY */

CREATE TABLE User (
    username VARCHAR(50) PRIMARY KEY,
    password VARCHAR(50) NOT NULL,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    email VARCHAR(50)
);

CREATE TABLE Company (
    compID INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    username VARCHAR(50),
    FOREIGN KEY (username) REFERENCES User(username)
);

CREATE TABLE Contractor (
    contID INT PRIMARY KEY,
    rate MONEY,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    resume VARCHAR(50),
    username VARCHAR(50),
    FOREIGN KEY (username) REFERENCES User(username)
);

CREATE TABLE Job (
    jobID INT PRIMARY KEY,
    title VARCHAR(50),
    pay VARCHAR(50),
    remote VARCHAR(50),
    start TIMESTAMP,
    end TIMESTAMP,
    description VARCHAR(50),
    compID INT,
    FOREIGN KEY (compID) REFERENCES Company(compID)
);

CREATE TABLE JobApplication (
    contID INT,
    jobID INT,
    status VARCHAR(50),
    PRIMARY KEY (contID, jobID),
    FOREIGN KEY (contID) REFERENCES Contractor(contID),
    FOREIGN KEY (jobID) REFERENCES Job(jobID)
);

CREATE TABLE Tag (
    name VARCHAR(50) PRIMARY KEY
);

CREATE TABLE JobTag (
    jobID INT,
    name VARCHAR(50),
    PRIMARY KEY (jobID, name),
    FOREIGN KEY (jobID) REFERENCES Job(jobID),
    FOREIGN KEY (name) REFERENCES Tag(name)
);

CREATE TABLE ContractorTag (
    contID INT,
    name VARCHAR(50),
    PRIMARY KEY (contID, name),
    FOREIGN KEY (contID) REFERENCES Contractor(contID),
    FOREIGN KEY (name) REFERENCES Tag(name)
);
