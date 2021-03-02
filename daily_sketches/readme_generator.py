"""
Ram Narasimhan

Given a Directory and a few string inputs, automates the generation of README.md for that directory

Input: path to directory
Output: README.md (placed in the correct directory)
"""

from pathlib import Path


INPUT_DIR = "2021-03-01"
TECH = "P5.js"
md_string = ""

p = Path(INPUT_DIR + "/images").rglob("keep*.*")
files = [x for x in p if x.is_file()]


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


md_string = add_header(md_string)
md_string = add_images(files, md_string)

textfile = open(INPUT_DIR + "/README.md", "w")
textfile.write(md_string)
textfile.close()
