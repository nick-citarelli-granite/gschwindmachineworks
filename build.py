"""Assemble the static page from its editable HTML sections."""

from pathlib import Path
import re


ROOT = Path(__file__).parent
SOURCE = ROOT / "src"
INCLUDE = re.compile(r"<!-- include:(partials/[a-z-]+\.html) -->\n")


def build() -> None:
    template = (SOURCE / "index.template.html").read_text(encoding="utf-8")

    def insert(match: re.Match[str]) -> str:
        return (SOURCE / match.group(1)).read_text(encoding="utf-8")

    page = INCLUDE.sub(insert, template)
    (SOURCE / "index.html").write_text(page, encoding="utf-8")


if __name__ == "__main__":
    build()
