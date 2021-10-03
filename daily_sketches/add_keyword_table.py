#
#
# 1. Fetch today's keywords list.
# 2. Add to the Kwds Dictionary
# 3. Generate a new keywords.md file
import sys, re


# open readme file.
# find the Keywords line..
# print it out...


def read_all_keywords():
    kwds = {}

    date_line = 0
    with open("README.md", "r") as mfile:
        # for line in mfile:
        for line_num, line in enumerate(mfile):
            if line.lstrip()[:2] == "##":
                date_line = line_num
                _date = line[3:14].strip()
            if line[:4] == "Keyw":
                a = line.split(":")[1]
                tokens = a.split(",")
                for t in tokens:
                    # capitalize first letter in multi-word kws
                    t = t.strip(" \t\n\r").title()

                    if t in kwds:
                        kwds[t][0] += 1
                        kwds[t][1].append(_date)
                    else:
                        kwds[t] = [1, [_date]]
                    print("l no ", t, _date)

    return kwds


def print_kwds_to_markdown(kwds):

    kw_string = ""

    kwds_md_file = open("keywords.md", "w")

    kw_string += "\n"
    kw_string += f"|Keyword \t| Frequency|\n"
    kw_string += f"| ------------- | ------------- |\n"

    kwds = dict(sorted(kwds.items()))
    for k, v in kwds.items():
        kw_string += f"|{k} \t| {v}|\n"

    kwds_md_file.write(kw_string)

    # go through the dict.
    # sort by value.
    # generate the MD table...
    # | keyword | dates (as links) |


def main():
    kwds = read_all_keywords()
    print_kwds_to_markdown(kwds)


if __name__ == "__main__":
    main()
