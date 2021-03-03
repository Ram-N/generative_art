"""
2021-03-02
Ram Narasimhan

Given a Directory and a few string inputs, automates the generation of README.md for that directory

Input: path to directory
Output: README.md (placed in the correct directory)
"""

from pathlib import Path


INPUT_DIR = "2021-03-02"
TECH = "P5.js"


def add_header(md_string):

    md_string += "# DAILY SKETCH for " + INPUT_DIR + "\n\n"
    md_string += "## Done using " + TECH + "\n\n"

    md_string += "### Description" + "\n\n"

    md_string += (
        "When possible I work for these `daily sketches` which are meant to be quick explorations \
    on whatever has me interested that day. This code is not typically optimized, but I share it as-is \
    for anyone interested."
        + "\n\n"
    )

    md_string += f"[Code]({INPUT_DIR}) \n\n"

    return md_string


def add_images(files, md_string):
    md_string += "Here are some of the images that were generated.\n\n"
    for f in files:
        md_string += "<img src = 'images/" + f.name + "' width = '300'> \n"

    md_string += f"\n\n[More Images]({INPUT_DIR}/images) \n\n"

    return md_string


def read_main_file():
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

    return top, bottom


def generate_todays_text(INPUT_DIR, TECH):

    # TODO: Need to check if keep0.png exists in the images folder

    todays_text = f"## {INPUT_DIR}\n"
    todays_text += f'<img src="{INPUT_DIR}/images/keep0.png" width="400">\n'
    todays_text += f"Made with {TECH}. [Code]({INPUT_DIR}/)\n\n"
    todays_text += f"-----\n"

    return todays_text


def main():

    p = Path(INPUT_DIR + "/images").rglob("keep*.*")
    files = [x for x in p if x.is_file()]
    md_string = ""

    md_string = add_header(md_string)
    md_string = add_images(files, md_string)

    # New README inside subdir.
    textfile = open(INPUT_DIR + "/README.md", "w")  # the subdir README
    textfile.write(md_string)
    textfile.close()

    # Parent README.md
    # Read this file, store its contents, add to it and
    main_top, main_bottom = read_main_file()  # read the file and store its contents
    todays_text = generate_todays_text(INPUT_DIR, TECH)

    mainfile = open("README.md", "w")
    print(todays_text)
    mainfile.write(main_top)
    mainfile.write(todays_text)  # This is the new addition
    mainfile.write(main_bottom)
    mainfile.close()

    bkfile = open("README2.md", "w")  # safety backup
    bkfile.write(main_top + main_bottom)
    bkfile.close()


if __name__ == "__main__":
    # execute only if run as a script
    main()
