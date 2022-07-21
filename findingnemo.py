
nemo = ["nemo", "george", "nemo"]

def findNemo(array):
    for x in range (len(array)):
        if array[x] == "nemo":
            print("Found Nemo!")

findNemo(nemo)