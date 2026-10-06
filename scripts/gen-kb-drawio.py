from pathlib import Path

W = 1560
H = 720


def cell(cid, value="", style="", vertex=False, edge=False, parent="1", source=None, target=None, geom=""):
    attrs = [f'id="{cid}"']
    if value:
        attrs.append(f'value="{value}"')
    if style:
        attrs.append(f'style="{style}"')
    if vertex:
        attrs.append('vertex="1"')
    if edge:
        attrs.append('edge="1"')
    attrs.append(f'parent="{parent}"')
    if source:
        attrs.append(f'source="{source}"')
    if target:
        attrs.append(f'target="{target}"')
    inner = geom
    if edge:
        inner += '<mxGeometry relative="1" as="geometry"/>'
    return f"<mxCell {' '.join(attrs)}>{inner}</mxCell>"


def rect(x, y, w, h):
    return f'<mxGeometry x="{x}" y="{y}" width="{w}" height="{h}" as="geometry"/>'


def lane(lid, title, y, fill):
    return cell(
        lid,
        title,
        f"swimlane;horizontal=0;startSize=110;fillColor={fill};strokeColor=#666666;html=1;",
        vertex=True,
        geom=rect(0, y, W - 320, 150),
    )


def node(nid, label, lane_id, col, fill="#ffffff"):
    return cell(
        nid,
        label,
        "rounded=1;whiteSpace=wrap;html=1;fillColor="
        + fill
        + ";strokeColor=#333333;",
        vertex=True,
        parent=lane_id,
        geom=rect(120 + col * 180, 45, 140, 60),
    )


def edge(eid, src, tgt):
    return cell(
        eid,
        "",
        "edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#333333;",
        edge=True,
        source=src,
        target=tgt,
    )


T = "\u77e5\u8bc6\u5e93\u4ece\u54ea\u91cc\u6765\uff1f"
SRC = "\u8d44\u6599\u4ece\u54ea\u6765\uff08\u4e09\u6761\u8fdb\u6599\u7ebf\uff09"
TIER = "\u653e\u54ea\u91cc\u7528\uff08\u56db\u5c42\uff09"
L1 = "\u2460 \u6ca1\u6709\u6570\u5b57\u5316"
L2 = "\u2461 \u5df2\u6709\u6587\u6863"
L3 = "\u2462 MarkItDown"
HUB = "\u53ef\u4fe1\u3001\u53ef\u68c0\u7d22\u7684\u4e0a\u4e0b\u6587&#xa;\uff08\u4f18\u5148 Markdown\uff09"
TB = "\u77e5\u8bc6\u5e93\u5c42\u7ea7"
N1 = "\u2460 \u4e2a\u4eba&#xa;Obsidian + MD + Wiki"
N2 = "\u2461 \u56e2\u961f&#xa;\u98de\u4e66\u77e5\u8bc6\u5e93 / \u4f01\u4e1a\u5fae\u4fe1\u6587\u6863"
N3 = "\u2462 Agent \u9879\u76ee&#xa;\u5171\u4eab\u77e5\u8bc6"
N4 = "\u2463 \u9ad8\u8981\u6c42\u672c\u5730\u5316&#xa;FastGPT \u4e8c\u6b21\u5f00\u53d1"
NOTE = "SAG / SQL \u5173\u8054\uff1a\u503c\u5f97\u5173\u6ce8\uff0c\u5148\u9a8c\u8bc1\u518d\u4f7f\u7528"
REF = "\u53c2\u8003\uff1apublic/assets/Snipaste_2026-09-21_10-49-39.png"

cells = [
    '<mxCell id="0"/>',
    '<mxCell id="1" parent="0"/>',
    cell(
        "title",
        T,
        "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontStyle=1;fontSize=22;",
        vertex=True,
        geom=rect(400, 10, 760, 40),
    ),
    cell(
        "src_hdr",
        SRC,
        "text;html=1;strokeColor=none;fillColor=none;align=left;fontStyle=1;fontSize=14;",
        vertex=True,
        geom=rect(20, 58, 400, 30),
    ),
    cell(
        "tier_hdr",
        TIER,
        "text;html=1;strokeColor=none;fillColor=none;align=left;fontStyle=1;fontSize=14;",
        vertex=True,
        geom=rect(W - 300, 58, 260, 30),
    ),
    lane("lane1", L1, 90, "#fff9e6"),
    node("a1", "\u8bbf\u8c08", "lane1", 0),
    node("a2", "\u5f55\u97f3", "lane1", 1),
    node("a3", "\u8f6c\u6587\u5b57", "lane1", 2),
    node("a4", "\u6574\u7406", "lane1", 3),
    lane("lane2", L2, 240, "#e8f4f8"),
    node("b1", "\u6536\u96c6", "lane2", 0),
    node("b2", "\u53bb\u91cd", "lane2", 1),
    node("b3", "\u5206\u7c7b", "lane2", 2),
    node("b4", "\u6e05\u6d17", "lane2", 3),
    lane("lane3", L3, 390, "#e8f5e9"),
    node("c1", "Word/PPT/PDF/Excel", "lane3", 0, "#f5f5f5"),
    node("c2", "\u683c\u5f0f\u8f6c\u6362", "lane3", 1),
    node("c3", "Markdown", "lane3", 2, "#d5e8d4"),
    cell(
        "hub",
        HUB,
        "rounded=1;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;fontStyle=1;",
        vertex=True,
        geom=rect(860, 260, 160, 80),
    ),
    cell(
        "tier_box",
        TB,
        "swimlane;startSize=30;fillColor=#f5f5f5;strokeColor=#666666;html=1;",
        vertex=True,
        geom=rect(W - 280, 90, 260, 450),
    ),
    cell(
        "t1",
        N1,
        "rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;",
        vertex=True,
        parent="tier_box",
        geom=rect(30, 50, 200, 70),
    ),
    cell(
        "t2",
        N2,
        "rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;",
        vertex=True,
        parent="tier_box",
        geom=rect(30, 140, 200, 70),
    ),
    cell(
        "t3",
        N3,
        "rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;",
        vertex=True,
        parent="tier_box",
        geom=rect(30, 230, 200, 70),
    ),
    cell(
        "t4",
        N4,
        "rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;",
        vertex=True,
        parent="tier_box",
        geom=rect(30, 320, 200, 70),
    ),
    cell(
        "note",
        NOTE,
        "shape=note;whiteSpace=wrap;html=1;fillColor=#ffffcc;strokeColor=#999999;size=14;",
        vertex=True,
        geom=rect(W - 280, 560, 260, 70),
    ),
    cell(
        "ref",
        REF,
        "text;html=1;strokeColor=none;fillColor=none;align=left;fontSize=11;fontColor=#666666;",
        vertex=True,
        geom=rect(20, 560, 520, 30),
    ),
    edge("e_a1", "a1", "a2"),
    edge("e_a2", "a2", "a3"),
    edge("e_a3", "a3", "a4"),
    edge("e_b1", "b1", "b2"),
    edge("e_b2", "b2", "b3"),
    edge("e_b3", "b3", "b4"),
    edge("e_c1", "c1", "c2"),
    edge("e_c2", "c2", "c3"),
    edge("e_a4", "a4", "hub"),
    edge("e_b4", "b4", "hub"),
    edge("e_c3", "c3", "hub"),
    edge("e_h1", "hub", "t1"),
    edge("e_t1", "t1", "t2"),
    edge("e_t2", "t2", "t3"),
    edge("e_t3", "t3", "t4"),
]

body = "\n        ".join(cells)
page_name = T
xml = f"""<mxfile host="app.diagrams.net" agent="awesome-fde" version="24.0.0">
  <diagram id="knowledge-source-arch" name="{page_name}">
    <mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="{W}" pageHeight="{H}" math="0" shadow="0">
      <root>
        {body}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
"""

out = (
    Path(__file__).resolve().parents[1]
    / "content"
    / "drawio"
    / "2026-09-21_10-49-39.drawio"
)
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(xml, encoding="utf-8")
print(out)
