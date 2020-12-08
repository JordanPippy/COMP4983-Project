import os

def main():
    inFile = open("listOfCharacters.txt", "r")
    for line in inFile:
        currentChamp = open(line[:-1] + "temp", "w")
        finalOutput = open(line[:-1], "w")
        currentChamp.write(mystr)
        currentChamp.close()
        currentChamp = open(line[:-1] + "temp", "r")
        finalOutput.write(line)
        getTitle(currentChamp, finalOutput)
        currentChamp.seek(0)
        getAllStats(currentChamp, finalOutput)
        getAllAbilities(currentChamp, finalOutput)
        currentChamp.close()
        os.remove(line[:-1] + "temp")
        finalOutput.close()
    inFile.close()

def getAllAbilities(currentChamp, finalOutput):
    finalOutput.write("Passive\n")
    getPassive(currentChamp, finalOutput, 1)

    currentChamp.seek(0)
    finalOutput.write("Q\n")
    getPassive(currentChamp, finalOutput, 5)

    currentChamp.seek(0)
    finalOutput.write("W\n");
    getPassive(currentChamp, finalOutput, 9)

    currentChamp.seek(0)
    finalOutput.write("E\n");
    getPassive(currentChamp, finalOutput, 13)

    currentChamp.seek(0)
    finalOutput.write("R\n");
    getPassive(currentChamp, finalOutput, 17)

def getPassive(currentChamp, finalOutput, skipLines):
    numRowSpans = 0
    writing = False
    gotName = False
    gotDescription = False
    myStr = ""
    cooldownStr = ""
    gotCooldown = False
    linesSkipped = 0
    color = ""
    currentCooldownLines = 0
    maxCooldownLines = 7

    for line in currentChamp:
        if numRowSpans == skipLines and not gotName:
            for char in line:
                if char == '>':
                    writing = True
                    continue
                if char == '<':
                    writing = False
                    continue
                if writing and char == '\n':
                    finalOutput.write(myStr + '\n')
                    myStr = ""
                    gotName = True
                    writing = False
                    break
                if writing:
                    myStr += char
        if gotName:
            linesSkipped += 1

        if (gotName and currentCooldownLines < maxCooldownLines):
            currentCooldownLines += 1
            if ("Cooldown" in line):
                index = line.find("Cooldown")
                for char in line[:]:
                    if (char == '<'):
                        writing = False
                    if (char == '>'):
                        writing = True
                        continue
                    if writing:
                        cooldownStr += char
                cooldownStr += ' '
            if ("Cost" in line):
                index = line.find("Cost")
                for char in line[:]:
                    if (char == '<'):
                        writing = False
                    if (char == '>'):
                        writing = True
                        continue
                    if writing:
                        cooldownStr += char
                cooldownStr += ' '
            if ("Range" in line):
                index = line.find("Range")
                for char in line[:]:
                    if (char == '<'):
                        writing = False
                    if (char == '>'):
                        writing = True
                        continue
                    if writing:
                        cooldownStr += char
            if ("Area of Effect" in line):
                index = line.find("Area of Effect")
                for char in line[:]:
                    if (char == '<'):
                        writing = False
                    if (char == '>'):
                        writing = True
                        continue
                    if writing:
                        cooldownStr += char

        if currentCooldownLines == maxCooldownLines and not gotCooldown:
            gotCooldown = True
            if (cooldownStr == ""):
                finalOutput.write("Cost: 0 Cooldown: 0 Range: 0\n")
            else:
                while ('\n' in cooldownStr):
                    cooldownStr = cooldownStr.replace('\n', '')
                while ("  " in cooldownStr):
                    cooldownStr = cooldownStr.replace("  ", " ")
                while ('\t' in cooldownStr):
                    cooldownStr = cooldownStr.replace('\t', '')
                finalOutput.write(cooldownStr + '\n')

        if "rowspan" in line:
            numRowSpans += 1

        if numRowSpans == (skipLines + 3) and not gotDescription:
            if ("</td>" in line):
                gotDescription = True
            if not gotDescription:
                for char in line:
                    if (char == '<'):
                        writing = False
                    if (char == '>'):
                        writing = True
                        continue
                    if writing:
                        myStr += char
            else:
                while (myStr[-1] == '\n'):
                    myStr = myStr.rstrip('\n')
                if ("&#160;" in myStr):
                    myStr = myStr.replace("&#160;", "")
                finalOutput.write(myStr + '\n\n')
                myStr = ""
                writing = False

        if gotDescription:
            if ("</table>" in line):
                writing = False
                while ("\n\n" in myStr):
                    myStr = myStr.replace("\n\n", "\n")
                while ("  " in myStr):
                    myStr = myStr.replace("  ", " ")
                while ("\t" in myStr):
                    myStr = myStr.replace("\t", "")
                myList = myStr.split('\n')
                myStr = ""
                for item in myList:
                    if item != '':
                        if (myStr != ''):
                            myStr += '\n'
                        myStr += item
                finalOutput.write(myStr + "\n\n")
                return
            for char in line:
                if (char == '<'):
                    writing = False
                if (char == '>'):
                    writing = True
                    continue
                if writing:
                    myStr += char


def getAllStats(currentChamp, finalOutput):
    finalOutput.write("HP ")
    getStat(currentChamp, finalOutput, 4, ">HP<")

    currentChamp.seek(0)
    finalOutput.write("HPR ")
    getStat(currentChamp, finalOutput, 4, ">HPR<")

    currentChamp.seek(0)
    finalOutput.write("MP ")
    if (getStat(currentChamp, finalOutput, 4, ">MP<") == -1):
        finalOutput.write("0 (+ 0.00)\n")

    currentChamp.seek(0)
    finalOutput.write("MPR ")
    if (getStat(currentChamp, finalOutput, 4, ">MPR<") == -1):
        finalOutput.write("0 (+ 0.00)\n")

    currentChamp.seek(0)
    finalOutput.write("MS ")
    getStat(currentChamp, finalOutput, 4, ">MS<")

    currentChamp.seek(0)
    finalOutput.write("AD ")
    getStat(currentChamp, finalOutput, 4, ">AD<")

    currentChamp.seek(0)
    finalOutput.write("AS ")
    getStat(currentChamp, finalOutput, 4, ">AS<")

    currentChamp.seek(0)
    finalOutput.write("RNG ")
    getStat(currentChamp, finalOutput, 4, ">RNG<")

    currentChamp.seek(0)
    finalOutput.write("AR ")
    getStat(currentChamp, finalOutput, 4, ">AR<")

    currentChamp.seek(0)
    finalOutput.write("MR ")
    getStat(currentChamp, finalOutput, 4, ">MR<")
    finalOutput.write('\n')
    currentChamp.seek(0)


def getStat(currentChamp, finalOutput, numberOfGator, searchTerm):
    currentLine = 0
    magicLineNumber = 149
    numberFoundChars = 0
    writing = False
    toRet = ""
    for line in currentChamp:
        currentLine += 1
        if (currentLine == magicLineNumber):
            index = line.find(searchTerm)
            if (index == -1):
                return -1
            for char in line[index:]:
                if (char == '>'):
                    numberFoundChars += 1

                if (numberFoundChars == numberOfGator):
                    writing = True
                    continue

                if (writing):
                    toRet += char
                if (writing and char == '<'):
                    finalOutput.write(toRet[1:-1] + '\n')
                    #print(toRet[1:-1])
                    return




def getTitle(currentChamp, finalOutput):
    numberFoundChars = 0
    writing = False
    toRet = ""
    for line in currentChamp:
        index = line.find(">Title<")
        if index == -1:
            continue
        else:
            for char in line[index:]:
                if (char == '>'):
                    numberFoundChars += 1
                if (numberFoundChars == 2):
                    writing = True
                    continue
                if (writing):
                    toRet += char
                if (writing and char == '<'):
                    finalOutput.write(toRet[1:-1] + '\n\n')
                    return

if __name__ == "__main__":
    main()
