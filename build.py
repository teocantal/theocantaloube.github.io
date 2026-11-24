from pathlib import Path


ROOT = Path(__file__).parent
INDEX = ROOT / "index.html"
SECTION_FILES = ("whoami.html", "papers.html", "interests.html")
START = "          <!-- SECTIONS_START -->"
END = "          <!-- SECTIONS_END -->"


def main():
    html = INDEX.read_text(encoding="utf-8")
    if html.count(START) != 1 or html.count(END) != 1:
        raise RuntimeError("Section include markers must each appear once in index.html")

    sections = "\n".join(
        (ROOT / "sections" / filename).read_text(encoding="utf-8").rstrip()
        for filename in SECTION_FILES
    )
    before, rest = html.split(START, 1)
    _, after = rest.split(END, 1)
    INDEX.write_text(f"{before}{START}\n{sections}\n{END}{after}", encoding="utf-8")


if __name__ == "__main__":
    main()
