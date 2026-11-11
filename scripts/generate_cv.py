"""Generate the public CV and optional ATS copies from a local profile file."""

import json
from pathlib import Path
from xml.sax.saxutils import escape

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Inches, Pt
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import HRFlowable, Paragraph, SimpleDocTemplate, Spacer


SCRIPT_DIR = Path(__file__).resolve().parent
ROOT = SCRIPT_DIR.parent
PUBLIC_CV = ROOT / "public" / "cv.pdf"
ATS_PDF = ROOT / "Yusuf_Abualfateh_CV_ATS.pdf"
ATS_DOCX = ROOT / "Yusuf_Abualfateh_CV_ATS.docx"
LOCAL_PROFILE = SCRIPT_DIR / "cv_profile.local.json"

REQUIRED_FIELDS = ("full_name", "role", "phone", "location", "email", "sections")


def load_profile(path=LOCAL_PROFILE):
    """Load and validate the private CV profile from a local JSON file."""
    path = Path(path)
    if not path.is_file():
        raise SystemExit(
            f"Missing local CV profile: {path}\n"
            "Copy scripts/cv_profile.example.json to scripts/cv_profile.local.json "
            "and fill in your details."
        )

    try:
        profile = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        raise SystemExit(f"Invalid JSON in {path}: {exc}") from exc

    missing = [field for field in REQUIRED_FIELDS if not profile.get(field)]
    if missing:
        raise SystemExit(f"Missing required profile fields in {path}: {', '.join(missing)}")

    if not isinstance(profile["sections"], list):
        raise SystemExit("Profile field 'sections' must be a list.")

    for index, section in enumerate(profile["sections"]):
        if (
            not isinstance(section, dict)
            or not section.get("title")
            or not isinstance(section.get("items"), list)
        ):
            raise SystemExit(f"Invalid section at index {index} in {path}.")

    return profile


def contact_line(profile):
    return " | ".join(str(profile[key]) for key in ("phone", "location", "email"))


def build_pdf(path, profile):
    styles = getSampleStyleSheet()
    name = ParagraphStyle(
        "Name",
        parent=styles["Title"],
        fontName="Helvetica-Bold",
        fontSize=19,
        leading=23,
        alignment=TA_CENTER,
        textColor=colors.HexColor("#12304A"),
        spaceAfter=3,
    )
    role = ParagraphStyle(
        "Role",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=10.5,
        leading=13,
        alignment=TA_CENTER,
        textColor=colors.HexColor("#267A80"),
        spaceAfter=3,
    )
    contact = ParagraphStyle(
        "Contact",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=9,
        leading=12,
        alignment=TA_CENTER,
        textColor=colors.HexColor("#334155"),
        spaceAfter=10,
    )
    heading = ParagraphStyle(
        "Heading",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=10.5,
        leading=13,
        textColor=colors.HexColor("#267A80"),
        spaceBefore=8,
        spaceAfter=4,
        keepWithNext=True,
    )
    body = ParagraphStyle(
        "Body",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=9.2,
        leading=12,
        textColor=colors.HexColor("#1F2937"),
        spaceAfter=2,
    )
    bullet = ParagraphStyle("Bullet", parent=body, leftIndent=12, firstLineIndent=-8)

    story = [
        Paragraph(escape(profile["full_name"]), name),
        Paragraph(escape(profile["role"]), role),
        Paragraph(escape(contact_line(profile)), contact),
        HRFlowable(width="100%", thickness=1, color=colors.HexColor("#D6E4E7"), spaceAfter=3),
    ]

    for section in profile["sections"]:
        story.append(Paragraph(escape(section["title"]), heading))
        for item in section["items"]:
            if item.startswith("-"):
                story.append(Paragraph(escape(item), bullet))
            elif item:
                story.append(Paragraph(escape(item), body))
        story.append(Spacer(1, 2))

    SimpleDocTemplate(
        str(path),
        pagesize=letter,
        rightMargin=0.62 * inch,
        leftMargin=0.62 * inch,
        topMargin=0.5 * inch,
        bottomMargin=0.5 * inch,
        title=f"{profile['full_name']} CV",
        author=profile["full_name"],
    ).build(story)


def build_docx(path, profile):
    doc = Document()
    section = doc.sections[0]
    section.top_margin = Inches(0.55)
    section.bottom_margin = Inches(0.55)
    section.left_margin = Inches(0.7)
    section.right_margin = Inches(0.7)

    normal = doc.styles["Normal"]
    normal.font.name = "Arial"
    normal.font.size = Pt(10)

    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = p.add_run(profile["full_name"])
    run.bold = True
    run.font.size = Pt(18)
    run.font.color.rgb = __import__("docx").shared.RGBColor(18, 48, 74)

    p = doc.add_paragraph(f"{profile['role']}\n{contact_line(profile)}")
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    for run in p.runs:
        run.font.size = Pt(10)

    for section in profile["sections"]:
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(8)
        p.paragraph_format.space_after = Pt(3)
        run = p.add_run(section["title"])
        run.bold = True
        run.font.color.rgb = __import__("docx").shared.RGBColor(38, 122, 128)

        for item in section["items"]:
            if not item:
                continue
            p = doc.add_paragraph(style="List Bullet" if item.startswith("-") else None)
            p.paragraph_format.space_after = Pt(1)
            p.add_run(item[2:] if item.startswith("- ") else item)

    doc.core_properties.title = f"{profile['full_name']} CV"
    doc.core_properties.author = profile["full_name"]
    doc.save(path)


def main():
    profile = load_profile()
    PUBLIC_CV.parent.mkdir(parents=True, exist_ok=True)
    build_pdf(PUBLIC_CV, profile)
    build_pdf(ATS_PDF, profile)
    build_docx(ATS_DOCX, profile)
    print(f"Created {PUBLIC_CV}")
    print(f"Created {ATS_PDF}")
    print(f"Created {ATS_DOCX}")


if __name__ == "__main__":
    main()
