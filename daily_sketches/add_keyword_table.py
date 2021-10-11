#
#
# 1. Fetch today's keywords list.
# 2. Add to the Kwds Dictionary
# 3. Generate a new keywords.md file
import sys, re


# open readme file.
# find the Keywords line..
# print it out...


def read_images_by_date():
    date_images = {}

    with open("README.md", "r") as mfile:
        for line_num, line in enumerate(mfile):
            if line.startswith("[<img src="):
                pieces = line.split('"')
                file_path = pieces[1]
                dte = pieces[5]
                if dte != "" and file_path != "":
                    date_images[dte] = file_path

    return date_images


def read_all_keywords(date_images):
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

                print(f"{_date} {len(_date)}")

                if _date in date_images:
                    file_path = date_images[_date]
                else:
                    print(f"{_date} not found, {len(_date)}")
                for t in tokens:
                    # capitalize first letter in multi-word kws
                    t = t.strip(" \t\n\r").title()

                    # alt="alternative text" title="this will be displayed as a tooltip"
                    if t in kwds:
                        kwds[t][0] += 1
                        kwds[t][1].append(_date)
                        kwds[t][2] += f' <img src="{file_path}" width="50" '
                        kwds[t][2] += f'title="{_date}">'
                        # kwds[t][2] += _date + ' "' + _date + '" > '

                    # [<img src="2021/2021-06-19/images/keep_2021-06-18-03-35-59.png" width="100">](2021/2021-06-19 "2021-06-19")

                    else:
                        img_str = f'<img src="{file_path}" width="50" title="{_date}">'
                        kwds[t] = [1, [_date], img_str]

    return kwds


def print_kwds_to_markdown(kwds):

    kw_string = ""

    kwds_md_file = open("keywords.md", "w")

    # kw_string += "\n"
    # kw_string += f"|Keyword \t| Count | Images|\n"
    # kw_string += f"| ------------- | ------------- |--------- |\n"

    table_top = """<table>
    <tr>
        <td> Keyword </td>
        <td> Count </td>
        <td> Images </td>
        </tr>\n
    """

    table_end = "</table>\n                " ""

    # <td><img src="img2.png" alt="2" width = 360px height = 640px></td>

    kwds = dict(sorted(kwds.items()))
    kw_string = table_top
    for k, v in kwds.items():
        freq = v[0]
        kw_string += f"<tr><td>{k} </td><td> {freq}</td><td> {v[2]}</td></tr>\n\n"

    kw_string += table_end
    kwds_md_file.write(kw_string)

    # go through the dict.
    # sort by value.
    # generate the MD table...
    # | keyword | dates (as links) |


def main():

    date_images = read_images_by_date()  # read from README.md
    print(date_images)
    kwds = read_all_keywords(date_images)
    print_kwds_to_markdown(kwds)

    print(kwds)


if __name__ == "__main__":
    main()
