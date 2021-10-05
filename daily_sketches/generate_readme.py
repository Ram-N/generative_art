"""
2021-04-24
Ram Narasimhan

Given a Directory and a few string inputs, automates the generation of README.md for that directory

Input: path to directory
Output: README.md (placed in the correct directory)
"""

import sys, getopt
import re
from pathlib import Path


TECH = "P5.js"


def add_header(md_string, INPUT_DIR):

    md_string += "# DAILY SKETCH for " + INPUT_DIR + "\n\n"
    md_string += "## Done using " + TECH + "\n\n"

    md_string += "### Description" + "\n\n"

    md_string += (
        "These `daily sketches` which are meant to be quick explorations \
    on whatever topic interested me on that day. This code is not typically optimized, but I share it as-is \
    for anyone interested."
        + "\n\n"
    )

    # md_string += f"[Code]({INPUT_DIR}) \n\n"

    return md_string


def add_images(files, md_string, INPUT_DIR):
    """Add images to subdir's README file"""

    for f in files:
        md_string += "<img src = 'images/" + f.name + "' width = '100'> "

    md_string += "\n\n## Progression of Images that were generated.\n\n"
    for f in files:
        md_string += "<img src = 'images/" + f.name + "' width = '300'> \n"

    md_string += f"\n\n[More Images]({INPUT_DIR}/images) \n\n"

    return md_string


def read_main_readme_file():
    top, bottom = "", ""
    flip = 0  # indicates whether split point has been reached
    with open("README.md", "r") as mfile:
        for line in mfile:
            if flip:
                bottom += line
            else:
                top += line

            if line[:3] == "***":
                flip = 1
                print("flipping")

    return top, bottom  # two parts of the main README file


def get_nameof_keepfile(INPUT_DIR):
    """If keep0 is there, return that, else return name of the latest file"""

    p = Path("2021/" + INPUT_DIR + "/images").rglob("keep*.*")
    files = [x for x in p if x.is_file()]

    if "keep0.png" in files:
        print("Found keep0.png")
        return "keep0.png"
    else:
        _ctimes = [fname.stat().st_ctime for fname in files]
        if not _ctimes:
            print(f"No Images found in {INPUT_DIR}")
            return

        idx = _ctimes.index(max(_ctimes))
        return files[idx].name


def check_todays_keywords(INPUT_DIR):
    # open todays_notes file.
    desc = ""
    kw_exists, d_exists = False, False
    p = Path("2021/" + INPUT_DIR + "/todays_notes.txt")
    with open(p, "r") as notes_file:
        for line in notes_file:
            if line[:9] == "Keywords:":
                kwds = line
                kw_exists = True
            if line[:5] == "Desc:":
                desc += line[5:]
                d_exists = True

    return (kw_exists, kwds, d_exists, desc)


def generate_todays_text(INPUT_DIR, TECH, verbose=False):
    """
        Generate today's text twice.
        Once for the child directory (more detailed), and
        once more Today's text in the MAIN file"""

    keepfile_name = get_nameof_keepfile(INPUT_DIR)

    todays_text = ""

    todays_text += f"\n## {INPUT_DIR}\n"
    if not verbose:
        todays_text += (
            f'<img src="2021/{INPUT_DIR}/images/{keepfile_name}" width="400">\n\n'
        )

    keywords_exist, kwds, description_exists, desc = check_todays_keywords(INPUT_DIR)
    if keywords_exist:
        todays_text += f"{kwds} \n\n"
    if description_exists and verbose:
        todays_text += f"## Description \n\n{desc} \n\n"

    todays_text += (
        f"Made using {TECH}. | [Code](2021/{INPUT_DIR}/) | [Top](#daily-sketches) \n\n"
    )
    todays_text += f"-----\n\n"

    return todays_text


def add_todays_img_to_maintop(main_top, INPUT_DIR):

    pattern = "-=-=\n"
    pieces = re.split(pattern, main_top, 2)

    new_string = pieces[0] + pattern + "\n"
    keepfile_name = get_nameof_keepfile(INPUT_DIR)
    new_string += f'[<img src="2021/{INPUT_DIR}/images/{keepfile_name}" width="100">](2021/{INPUT_DIR} "{INPUT_DIR}")'
    new_string += pieces[1]

    for line in new_string.splitlines():
        print(line)
    return new_string


def main(argv):

    alter_files = True  # turn this to False when debugging

    INPUT_DIR = ""
    try:
        opts, args = getopt.getopt(argv, "hi:")
    except getopt.GetoptError:
        print("generate_readme.py -i <inputdir>")
        sys.exit(2)

    for opt, arg in opts:
        if opt == "-h":
            print("Usage: generate_readme.py -i <inputdirname>")
            sys.exit()
        elif opt in ("-i", "-I"):
            INPUT_DIR = arg

    if INPUT_DIR == "":
        print("Please specify an INPUT Directory name in -i option")
        print("Usage: generate_readme.py -i <inputdirname>")
        sys.exit()

    # get all the intermediate images...
    p = Path("2021/" + INPUT_DIR + "/images").rglob("keep*.*")
    img_files = [x for x in p if x.is_file()]
    md_string = ""

    md_string = add_header(md_string, INPUT_DIR)
    md_string = add_images(img_files, md_string, INPUT_DIR)
    md_string += generate_todays_text(INPUT_DIR, TECH, verbose=True)

    # New README inside subdir.
    if alter_files:
        textfile = open("2021/" + INPUT_DIR + "/README.md", "w")  # the subdir README
        textfile.write(md_string)
        textfile.close()

    ########################################################3
    # Parent README.md
    # Read this file, store its contents, add to it and
    main_top, main_bottom = read_main_readme_file()  # store README contents as 2 parts
    todays_text = generate_todays_text(INPUT_DIR, TECH)
    main_top = add_todays_img_to_maintop(main_top, INPUT_DIR)

    print(main_top, len(main_top))

    print(todays_text)
    if alter_files:
        main_md_file = open("README.md", "w")
        main_md_file.write(main_top)
        main_md_file.write(todays_text)  # This is the new addition
        main_md_file.write(main_bottom)
        main_md_file.close()

        bkfile = open("bkup_README.md", "w")  # safety backup
        bkfile.write(main_top + main_bottom)
        bkfile.close()


if __name__ == "__main__":
    main(sys.argv[1:])  # -i dirname

