import os

def main():
    path = "game.html"
    inFile = open(path, "r")
    outFile = open("temp.txt", "w")
    handleHP(inFile, outFile)
    inFile.close()
    outFile.close()
    os.remove("temp.txt")
    os.remove("output.txt")

def handleHP(inFile, outFile):
    HPFirstPass(inFile, outFile)
    inFile.close()
    outFile.close()
    inFile = open("temp.txt", "r")
    outFile = open("output.txt", "w")
    HPSecondPass(inFile, outFile)
    inFile.close()
    outFile.close()
    inFile = open("output.txt", "r")
    outFile = open("finalHP.txt", "w")
    HPThirdPass(inFile, outFile)


def HPFirstPass(inFile, outFile):
    for line in inFile:
        if "HP" in line:
            outFile.write(line)

def HPSecondPass(inFile, outFile):
    checkingNextChar = False
    writing = False
    for line in inFile:
        for char in line:
            if char == 'H':
                checkingNextChar = True
                continue
            if checkingNextChar and char != 'P':
                checkingNextChar = False
            if checkingNextChar and char == 'P':
                checkingNextChar = False
                writing = True
                outFile.write('H')
            if (writing and char == ')'):
                writing = False
            if (writing):
                outFile.write(char)

def HPThirdPass(inFile, outFile):
    wroteSomething = False
    for line in inFile:
        for char in line:
            if (char.isdigit() or char == '.'):
                outFile.write(char)
                wroteSomething = True
            elif (wroteSomething):
                outFile.write(' ')
                wroteSomething = False
if __name__ == "__main__":
    main()
