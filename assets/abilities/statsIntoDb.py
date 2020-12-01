import mysql.connector
import os

def main():
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="mypw",
        database="finalProject"
    )

    mycursor = mydb.cursor()

    maxID = getBiggestID(mycursor)

    for i in range(1, maxID + 1):
        sql = "SELECT characterName FROM CharactersID WHERE id = " + str(i)
        mycursor.execute(sql)
        result = mycursor.fetchall()
        inFile = open(result[0][0], "r")
        skip = 0
        toSkip = 3
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
        id = i
        for line in inFile:
            if skip != toSkip:
                skip += 1
                continue
            HP = line[:-1]
            line = next(inFile)
            HPR = line[:-1]
            line = next(inFile)
            MP = line[:-1]
            line = next(inFile)
            MPR = line[:-1]
            line = next(inFile)
            MS = line[:-1]
            line = next(inFile)
            AD = line[:-1]
            line = next(inFile)
            AS = line[:-1]
            line = next(inFile)
            RNG = line[:-1]
            line = next(inFile)
            AR = line[:-1]
            line = next(inFile)
            MR = line[:-1]
            break
        sql = "INSERT INTO Stats (characterID, HP, HPR, MP, MPR, MS, AD, attackSpeed, RNG, AR, MR) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        val = (id, HP, HPR, MP, MPR, MS, AD, AS, RNG, AR, MR)
        mycursor.execute(sql, val)
        mydb.commit()


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
