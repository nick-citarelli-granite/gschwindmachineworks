"""Assemble src/index.html from the editable template and partials."""

from pathlib import Path
import re


ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "src"
HTML = SOURCE / "html"
INCLUDE = re.compile(r"<!-- include:(partials/[a-z-]+\.html) -->\n")


def build() -> None:
    template = (HTML / "index.template.html").read_text(encoding="utf-8")

    def insert(match: re.Match[str]) -> str:
        # The marker's newline is consumed so each partial controls its spacing.
        return (HTML / match.group(1)).read_text(encoding="utf-8")

    page = INCLUDE.sub(insert, template)
    (SOURCE / "index.html").write_text(page, encoding="utf-8")


if __name__ == "__main__":
    build()
