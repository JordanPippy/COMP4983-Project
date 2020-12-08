import os

def main():
    inFile = open("listOfCharactersTemp.txt", "r")
    outFile = open("listOfCharacters.txt", "w")
    temp = ""

    for line in inFile:
        if line[0] == '\n':
            continue;
        outFile.write(line[:-7] + '\n')
    inFile.close()
    outFile.close()
    os.remove("listOfCharactersTemp.txt")

if __name__ == "__main__":
    main();
