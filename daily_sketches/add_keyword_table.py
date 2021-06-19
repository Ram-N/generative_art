#
#
# 1. Fetch today's keywords list.
# 2. Add to the Kwds Dictionary
# 3. Generate a new keywords.md file
import sys, re

kwds = {}

# open readme file.
# find the Keywords line..
# print it out...


def read_all_keywords():

    with open("README.md", "r") as mfile:
        for line in mfile:
            if line[:4] == "Keyw":
                a = line.split(":")[1]
                tokens = a.split(",")
                for t in tokens:
                    if t in kwds:
                        kwds[t] += 1
                    else:
                        kwds[t] = 1

    print(kwds)


def generate_keywords_md_file():
    pass
    # go through the dict.
    # sort by value.
    # generate the MD table...
    # | keyword | dates (as links) |


def main():
    read_all_keywords()


if __name__ == "__main__":
    main()
