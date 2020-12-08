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
        inFile = open("./Champions/" + result[0][0], "r")
        skipped = 0
        for line in inFile:
            if (skipped < 1):
                skipped += 1
                continue
            else:
                sql = "INSERT INTO Titles (id, title) VALUES (%s, %s)"
                values = (str(i), str(line[:-1]))
                mycursor.execute(sql, values)
                mydb.commit()
                break
        inFile.close()


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
