import mysql.connector
import os

HP = ""
HPR = ""
MP = ""
MPR = ""
MS = ""
AD = ""
AS = ""
RNG = ""
AR = ""
MR = ""

def main():
    global HP
    global HPR
    global MP
    global MPR
    global MS
    global AD
    global AS
    global RNG
    global AR
    global MR

    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="mypw",
        database="finalProject"
    )

    mycursor = mydb.cursor()
    maxID = getBiggestID(mycursor)
    for i in range(1, maxID + 1):
        sql = "SELECT characterName FROM CharactersID WHERE ID = " + str(i)
        mycursor.execute(sql)
        result = mycursor.fetchall()
        path = "./Champions/" + str(result[0][0])
        inFile = open(path, "r")
        handleFile(inFile)
        sql = "INSERT INTO Stats (characterID, HP, HPR, MP, MPR, MS, AD, attackSpeed, RNG, AR, MR) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);"
        val = (i, HP, HPR, MP, MPR, MS, AD, AS, RNG, AR, MR)
        mycursor.execute(sql, val)
        mydb.commit()

def handleFile(inFile):
    print(inFile)
    global HP
    global HPR
    global MP
    global MPR
    global MS
    global AD
    global AS
    global RNG
    global AR
    global MR
    values = []
    temp = ""
    start = False
    recording = False
    for line in inFile:
        if "HP" in line:
            start = True
        if "Passive" in line:
            break
        if start:
            for char in line:
                if char == " ":
                    recording = True
                    continue
                if char == '\n':
                    values.append(temp)
                    temp = ""
                    recording = False
                if recording:
                    temp += char
    HP = values[0]
    HPR = values[1]
    MP = values[2]
    MPR = values[3]
    MS = values[4]
    AD = values[5]
    AS = values[6]
    RNG = values[7]
    AR = values[8]
    MR = values[9]


def getBiggestID(mycursor):
    maxID = 0
    sql = "SELECT id FROM CharactersID"
    mycursor.execute(sql)
    result = mycursor.fetchall()
    for i in result:
        if i[0] > maxID:
            maxID = i[0]
    return maxID


if __name__ == "__main__":
    main()
