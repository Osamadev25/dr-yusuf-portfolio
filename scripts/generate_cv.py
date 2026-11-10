from pathlib import Path

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Inches, Pt
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import HRFlowable, PageBreak, Paragraph, SimpleDocTemplate, Spacer


ROOT = Path(__file__).resolve().parents[1]
PUBLIC_CV = ROOT / "public" / "cv.pdf"
ATS_PDF = ROOT / "Yusuf_Abualfateh_CV_ATS.pdf"
ATS_DOCX = ROOT / "Yusuf_Abualfateh_CV_ATS.docx"


sections = [
    (
        "PROFESSIONAL SUMMARY",
        [
            "Motivated General Practitioner currently working in the Internal Medicine Department, with nearly two years of clinical experience after graduation. Passionate about pursuing postgraduate specialization to enhance clinical skills and contribute to evidence-based healthcare.",
        ],
    ),
    (
        "EDUCATION",
        [
            "Bachelor of Medicine and Bachelor of Surgery (MBBS)",
            "University of Science and Technology, Sana'a, Yemen | Graduation Year: 2022",
        ],
    ),
    (
        "CLINICAL EXPERIENCE",
        [
            "General Practitioner - Internal Medicine Department | University of Science and Technology Hospital, Sana'a | August 2023 - Present",
            "- Manage inpatients with diverse internal medicine conditions.",
            "- Participate in daily ward rounds, case discussions, and emergency admissions.",
            "- Coordinate with multidisciplinary teams to support holistic patient care.",
            "",
            "Internship Program | Various Departments, Sana'a | August 2022 - July 2023",
            "- Completed structured rotations in Internal Medicine, Surgery, Pediatrics, and Obstetrics and Gynecology.",
            "- Participated in patient care, minor procedures, and clinical documentation.",
        ],
    ),
    (
        "RESEARCH",
        [
            "Cerebrovascular Accidents in Sana'a City, Yemen: Clinico-Epidemiologic and Neuroimaging Findings",
            "- Contributed to data collection, patient interviews, and interpretation of neuroimaging findings.",
        ],
    ),
    (
        "CORE SKILLS",
        [
            "Clinical assessment and patient management",
            "Teamwork and interdisciplinary coordination",
            "Electronic medical record documentation",
            "Fluent in Arabic and English",
            "English touch typing",
        ],
    ),
    (
        "COURSES AND CERTIFICATIONS",
        [
            "Clinical ECG Interpretation - 2024",
            "Medical Research Methodology - 2023",
            "Clinical Skills of Physical Examination - 21 hours",
            "Basics of Common Pediatric Emergencies - 18 hours",
            "Chest X-ray Course, Medical Academy of Consultations - 12 hours",
            "Basic and Clinical Chest X-ray Interpretation - 4 hours",
            "Basic Life Support - 4 hours",
            "Crash Cart - 4 hours",
            "TOEFL iBT - Total score: 99",
        ],
    ),
    (
        "ONLINE COURSES",
        [
            "Hypertension in Primary Care - Improving Control and Reducing Risk - Stanford University",
            "Managing Atrial Fibrillation - Stanford University",
            "English for Healthcare - King's College London",
            "COVID-19: Tackling the Novel Coronavirus - London School of Hygiene and Tropical Medicine and UK Public Health Rapid Support Team",
            "Physician's Guide to Brain MRI - MedOne Academy",
            "Cardiac Chest Pain: Real-Life Cases - MedOne Academy",
        ],
    ),
    (
        "CONFERENCES AND PARTICIPATION",
        [
            "Update in Respiratory Diseases - USTH",
            "Scientific Symposium of Respiratory Emergencies - USTH",
            "Osteoporosis Medical Conference - USTH",
            "Third Scientific Conference for Heart Disease and Diabetes",
            "Annual Conference of Vascular Surgery - USTH",
        ],
    ),
    (
        "INTERESTS",
        ["Medical education, research, volunteering in community health, and reading."],
    ),
]


def bullets(items):
    return [item if item.startswith("-") else f"- {item}" for item in items if item]


def build_pdf(path):
    styles = getSampleStyleSheet()
    name = ParagraphStyle("Name", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=19, leading=23, alignment=TA_CENTER, textColor=colors.HexColor("#12304A"), spaceAfter=3)
    role = ParagraphStyle("Role", parent=styles["Normal"], fontName="Helvetica", fontSize=10.5, leading=13, alignment=TA_CENTER, textColor=colors.HexColor("#267A80"), spaceAfter=3)
    contact = ParagraphStyle("Contact", parent=styles["Normal"], fontName="Helvetica", fontSize=9, leading=12, alignment=TA_CENTER, textColor=colors.HexColor("#334155"), spaceAfter=10)
    heading = ParagraphStyle("Heading", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=10.5, leading=13, textColor=colors.HexColor("#267A80"), spaceBefore=8, spaceAfter=4, keepWithNext=True)
    body = ParagraphStyle("Body", parent=styles["BodyText"], fontName="Helvetica", fontSize=9.2, leading=12, textColor=colors.HexColor("#1F2937"), spaceAfter=2)
    bullet = ParagraphStyle("Bullet", parent=body, leftIndent=12, firstLineIndent=-8)

    story = [
        Paragraph("YUSUF AHMED MOHAMMED ABUALFATEH", name),
        Paragraph("General Practitioner", role),
        Paragraph("+967 775 782 051 | Sana'a, Yemen | musawa775@gmail.com", contact),
        HRFlowable(width="100%", thickness=1, color=colors.HexColor("#D6E4E7"), spaceAfter=3),
    ]
    for title, content in sections:
        story.append(Paragraph(title, heading))
        for item in content:
            if item.startswith("-"):
                story.append(Paragraph(item.replace("&", "&amp;"), bullet))
            else:
                story.append(Paragraph(item.replace("&", "&amp;"), body))
        story.append(Spacer(1, 2))

    SimpleDocTemplate(str(path), pagesize=letter, rightMargin=0.62 * inch, leftMargin=0.62 * inch, topMargin=0.5 * inch, bottomMargin=0.5 * inch, title="Yusuf Abualfateh CV", author="Yusuf Ahmed Mohammed Abualfateh").build(story)


def build_docx(path):
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
    run = p.add_run("YUSUF AHMED MOHAMMED ABUALFATEH")
    run.bold = True
    run.font.size = Pt(18)
    run.font.color.rgb = __import__("docx").shared.RGBColor(18, 48, 74)
    p = doc.add_paragraph("General Practitioner\n+967 775 782 051 | Sana'a, Yemen | musawa775@gmail.com")
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    for run in p.runs:
        run.font.size = Pt(10)

    for title, content in sections:
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(8)
        p.paragraph_format.space_after = Pt(3)
        run = p.add_run(title)
        run.bold = True
        run.font.color.rgb = __import__("docx").shared.RGBColor(38, 122, 128)
        for item in content:
            if not item:
                continue
            p = doc.add_paragraph(style="List Bullet" if item.startswith("-") else None)
            p.paragraph_format.space_after = Pt(1)
            p.add_run(item[2:] if item.startswith("- ") else item)
    doc.core_properties.title = "Yusuf Abualfateh CV"
    doc.core_properties.author = "Yusuf Ahmed Mohammed Abualfateh"
    doc.save(path)


if __name__ == "__main__":
    PUBLIC_CV.parent.mkdir(parents=True, exist_ok=True)
    build_pdf(PUBLIC_CV)
    build_pdf(ATS_PDF)
    build_docx(ATS_DOCX)
    print(f"Created {PUBLIC_CV}")
    print(f"Created {ATS_PDF}")
    print(f"Created {ATS_DOCX}")
