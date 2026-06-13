from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Image, Table, TableStyle, KeepTogether

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs" / "AI_ODD_COUPLE_OPERATOR_GUIDE.md"
OUTPUT = ROOT / "docs" / "AI_Odd_Couple_Operator_Guide.pdf"
BLUE, RED, INK, MUTED = colors.HexColor("#00A9FF"), colors.HexColor("#E63946"), colors.HexColor("#1C1C20"), colors.HexColor("#606068")

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="CoverKicker", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=12, textColor=BLUE, alignment=TA_CENTER, spaceAfter=8))
styles.add(ParagraphStyle(name="CoverTitle", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=28, leading=32, textColor=INK, alignment=TA_CENTER, spaceAfter=8))
styles.add(ParagraphStyle(name="CoverSub", parent=styles["Normal"], fontName="Helvetica-Oblique", fontSize=11, leading=15, textColor=MUTED, alignment=TA_CENTER))
styles.add(ParagraphStyle(name="H1AIO", parent=styles["Heading1"], fontName="Helvetica-Bold", fontSize=16, leading=19, textColor=RED, spaceBefore=14, spaceAfter=7))
styles.add(ParagraphStyle(name="H2AIO", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=12.5, leading=15, textColor=BLUE, spaceBefore=10, spaceAfter=5))
styles.add(ParagraphStyle(name="BodyAIO", parent=styles["BodyText"], fontName="Helvetica", fontSize=9.5, leading=12.5, textColor=INK, spaceAfter=5))
styles.add(ParagraphStyle(name="BulletAIO", parent=styles["BodyAIO"], leftIndent=14, firstLineIndent=-8, bulletIndent=4, spaceAfter=3))
styles.add(ParagraphStyle(name="QuoteAIO", parent=styles["BodyAIO"], fontName="Helvetica-Oblique", leftIndent=18, rightIndent=18, borderColor=BLUE, borderWidth=1, borderPadding=7, backColor=colors.HexColor("#F2F8FC"), spaceBefore=4, spaceAfter=8))
styles.add(ParagraphStyle(name="Cell", parent=styles["BodyAIO"], fontSize=8.2, leading=10))
styles.add(ParagraphStyle(name="CellHead", parent=styles["Cell"], fontName="Helvetica-Bold", textColor=colors.white))

def clean(text):
    return text.replace("`", "").replace("**", "").replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(0.72 * inch, 0.42 * inch, "THE AI ODD COUPLE | OPERATOR GUIDE")
    canvas.drawRightString(7.78 * inch, 0.42 * inch, f"Page {doc.page}")
    canvas.restoreState()

story = [
    Spacer(1, 0.22 * inch),
    Image(str(ROOT / "assets" / "branding" / "AI Odd Couple Cover Page.png"), width=6.45 * inch, height=4.3 * inch),
    Spacer(1, 0.3 * inch),
    Paragraph("PRODUCTION SYSTEM", styles["CoverKicker"]),
    Paragraph("Operator Guide", styles["CoverTitle"]),
    Paragraph("Capabilities, schedules, approvals, social publishing, and ad hoc prompts", styles["CoverSub"]),
    Spacer(1, 0.45 * inch),
    Paragraph("Version 1.0 | June 13, 2026", styles["CoverKicker"]),
    PageBreak(),
]

lines = SOURCE.read_text(encoding="utf-8").splitlines()
i = 0
while i < len(lines):
    line = lines[i].strip()
    if not line or line.startswith("# ") or line.startswith("**Version:") or line.startswith("**Updated:") or line.startswith("**Repository:"):
        i += 1
        continue
    if line.startswith("## "):
        story.append(Paragraph(clean(line[3:]), styles["H1AIO"]))
        i += 1
        continue
    if line.startswith("### "):
        story.append(Paragraph(clean(line[4:]), styles["H2AIO"]))
        i += 1
        continue
    if line.startswith("> "):
        story.append(Paragraph(clean(line[2:]), styles["QuoteAIO"]))
        i += 1
        continue
    if line.startswith("- "):
        story.append(Paragraph(clean(line[2:]), styles["BulletAIO"], bulletText="•"))
        i += 1
        continue
    if line.startswith("|") and i + 1 < len(lines) and set(lines[i + 1].replace("|", "").replace("-", "").replace(":", "").strip()) == set():
        headers = [x.strip() for x in line.strip("|").split("|")]
        i += 2
        rows = []
        while i < len(lines) and lines[i].strip().startswith("|"):
            rows.append([x.strip() for x in lines[i].strip().strip("|").split("|")])
            i += 1
        data = [[Paragraph(clean(x), styles["CellHead"]) for x in headers]]
        data += [[Paragraph(clean(x), styles["Cell"]) for x in row] for row in rows]
        widths = [6.85 * inch / len(headers)] * len(headers)
        table = Table(data, colWidths=widths, repeatRows=1, hAlign="LEFT")
        table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), INK), ("GRID", (0, 0), (-1, -1), 0.35, colors.HexColor("#C8CDD4")),
            ("BACKGROUND", (0, 1), (-1, -1), colors.white), ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#F2F4F7")]),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("LEFTPADDING", (0, 0), (-1, -1), 6), ("RIGHTPADDING", (0, 0), (-1, -1), 6),
            ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ]))
        block = [table, Spacer(1, 7)]
        story.extend([KeepTogether(block)] if headers and headers[0] == "Symptom" else block)
        continue
    story.append(Paragraph(clean(line), styles["BodyAIO"]))
    i += 1

doc = SimpleDocTemplate(str(OUTPUT), pagesize=letter, leftMargin=0.72 * inch, rightMargin=0.72 * inch, topMargin=0.64 * inch, bottomMargin=0.62 * inch, title="The AI Odd Couple Production System Operator Guide", author="AI Odd Couple Studio")
doc.build(story, onFirstPage=footer, onLaterPages=footer)
print(OUTPUT)
