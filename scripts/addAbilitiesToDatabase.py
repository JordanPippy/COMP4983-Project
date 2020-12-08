import mysql.connector
import os
#mysql connector may need to be installed using pip

abilityName = ""
cooldown = ""
description = ""
math = ""

def main():
    global abilityName
    global cooldown
    global description
    global math

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
        id = i
        name = result[0][0]
        inFile = open(name, "r")
        word = "Passive"
        abilityName = ""
        cooldown = ""
        description = ""
        math = ""
        fileLoop(inFile, word)
        sql = "INSERT INTO Abilities (characterID, ability, abilityFile, letter, abilityCooldown, abilityDescription, abilityMath) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        val = (str(id), abilityName, name + "P.png", 'P', cooldown, description, math)
        mycursor.execute(sql, val)
        mydb.commit()

        ########################################
        word = "Q"
        abilityName = ""
        cooldown = ""
        description = ""
        math = ""
        fileLoop(inFile, word)
        sql = "INSERT INTO Abilities (characterID, ability, abilityFile, letter, abilityCooldown, abilityDescription, abilityMath) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        val = (str(id), abilityName, name + "Q.png", 'Q', cooldown, description, math)
        mycursor.execute(sql, val)
        mydb.commit()

        word = "W"
        abilityName = ""
        cooldown = ""
        description = ""
        math = ""
        fileLoop(inFile, word)
        sql = "INSERT INTO Abilities (characterID, ability, abilityFile, letter, abilityCooldown, abilityDescription, abilityMath) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        val = (str(id), abilityName, name + "W.png", 'W', cooldown, description, math)
        mycursor.execute(sql, val)
        mydb.commit()

        word = "E"
        abilityName = ""
        cooldown = ""
        description = ""
        math = ""
        fileLoop(inFile, word)
        sql = "INSERT INTO Abilities (characterID, ability, abilityFile, letter, abilityCooldown, abilityDescription, abilityMath) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        val = (str(id), abilityName, name + "E.png", 'E', cooldown, description, math)
        mycursor.execute(sql, val)
        mydb.commit()

        word = "R"
        abilityName = ""
        cooldown = ""
        description = ""
        math = ""
        fileLoop(inFile, word)
        sql = "INSERT INTO Abilities (characterID, ability, abilityFile, letter, abilityCooldown, abilityDescription, abilityMath) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        val = (str(id), abilityName, name + "R.png", 'R', cooldown, description, math)
        mycursor.execute(sql, val)
        mydb.commit()
        ########################################
        #print(val)

def fileLoop(inFile, word):
    global abilityName
    global cooldown
    global description
    global math

    gotName = False
    gotCooldown = False
    gotDescription = False
    gotMath = False
    start = False

    skipped = 0
    for line in inFile:
        if line[:-1] != word and not start:
            continue
        if line[:-1] == word and gotName == False:
            start = True
            continue
        if start and not gotName:
            abilityName = line[:-1]
            gotName = True
            continue
        if gotName and not gotCooldown:
            cooldown = line[:-1]
            gotCooldown = True
            continue
        if gotCooldown and not gotDescription:
            if line[0] == '\n':
                gotDescription = True
                continue
            else:
                description += line[:-1]
        if gotDescription and not gotMath:
            if line[0] == '\n':
                gotMath = True
                break
            else:
                math += line[:-1]

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
