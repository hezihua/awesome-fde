"""Build draw.io mxfile XML from structured flow specs."""
from __future__ import annotations

import html
import json
from pathlib import Path
from typing import Any

LANE_FILLS = ["#fff9e6", "#e8f4f8", "#e8f5e9", "#fce4ec", "#fff0e6", "#e1d5e7"]
TIER_FILLS = ["#dae8fc", "#d5e8d4", "#fff2cc", "#f8cecc", "#e1d5e7", "#ffe6cc"]


def esc(text: str) -> str:
    return html.escape(text, quote=True).replace("\n", "&#xa;")


def cell(
    cid: str,
    value: str = "",
    style: str = "",
    *,
    vertex: bool = False,
    edge: bool = False,
    parent: str = "1",
    source: str | None = None,
    target: str | None = None,
    geom: str = "",
) -> str:
    attrs = [f'id="{cid}"']
    if value:
        attrs.append(f'value="{esc(value)}"')
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


def rect(x: float, y: float, w: float, h: float) -> str:
    return f'<mxGeometry x="{x}" y="{y}" width="{w}" height="{h}" as="geometry"/>'


def edge_cell(eid: str, src: str, tgt: str, parent: str = "1") -> str:
    return cell(
        eid,
        "",
        "edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#333333;",
        edge=True,
        parent=parent,
        source=src,
        target=tgt,
    )


def build_mxfile(diagram_id: str, page_name: str, cells: list[str], w: int, h: int) -> str:
    body = "\n        ".join(['<mxCell id="0"/>', '<mxCell id="1" parent="0"/>', *cells])
    return f"""<mxfile host="app.diagrams.net" agent="awesome-fde" version="24.0.0">
  <diagram id="{diagram_id}" name="{esc(page_name)}">
    <mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="{w}" pageHeight="{h}" math="0" shadow="0">
      <root>
        {body}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
"""


def render_chain(spec: dict[str, Any]) -> tuple[list[str], int, int]:
    nodes: list[str] = spec.get("nodes") or []
    w = max(900, 40 + len(nodes) * 180 + 80)
    h = 320
    cells: list[str] = []
    title = spec.get("title") or "Flow"
    cells.append(
        cell(
            "title",
            title,
            "text;html=1;strokeColor=none;fillColor=none;align=center;fontStyle=1;fontSize=20;",
            vertex=True,
            geom=rect(40, 10, w - 80, 40),
        )
    )
    if spec.get("subtitle"):
        cells.append(
            cell(
                "subtitle",
                spec["subtitle"],
                "text;html=1;strokeColor=none;fillColor=none;align=center;fontSize=12;fontColor=#666666;",
                vertex=True,
                geom=rect(40, 48, w - 80, 30),
            )
        )
    ids: list[str] = []
    y = 100
    for i, n in enumerate(nodes):
        nid = n.get("id") or f"n{i}"
        ids.append(nid)
        label = n.get("label") or str(n)
        sub = n.get("sub")
        if sub:
            label = f"{label}&#xa;{sub}"
        cells.append(
            cell(
                nid,
                label,
                "rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#333333;",
                vertex=True,
                geom=rect(40 + i * 180, y, 140, 70 if sub else 60),
            )
        )
    for i in range(len(ids) - 1):
        cells.append(edge_cell(f"e{i}", ids[i], ids[i + 1]))
    _add_footer(cells, spec, w, h)
    return cells, w, h


def render_lanes_hub_tiers(spec: dict[str, Any]) -> tuple[list[str], int, int]:
    w = 1560
    h = 720
    lanes = spec.get("lanes") or []
    hub = spec.get("hub") or ""
    tiers = spec.get("tiers") or []
    cells: list[str] = []
    title = spec.get("title") or ""
    cells.append(
        cell(
            "title",
            title,
            "text;html=1;strokeColor=none;fillColor=none;align=center;fontStyle=1;fontSize=22;",
            vertex=True,
            geom=rect(400, 10, 760, 40),
        )
    )
    lane_w = w - 320
    y0 = 90
    last_ids: list[str] = []
    for li, lane in enumerate(lanes):
        lid = f"lane{li}"
        y = y0 + li * 150
        cells.append(
            cell(
                lid,
                lane.get("title") or f"Lane {li + 1}",
                f"swimlane;horizontal=0;startSize=110;fillColor={LANE_FILLS[li % len(LANE_FILLS)]};strokeColor=#666666;html=1;",
                vertex=True,
                geom=rect(0, y, lane_w, 150),
            )
        )
        steps = lane.get("steps") or []
        prev = None
        last = None
        for si, step in enumerate(steps):
            nid = f"{lid}_s{si}"
            cells.append(
                cell(
                    nid,
                    step,
                    "rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#333333;",
                    vertex=True,
                    parent=lid,
                    geom=rect(120 + si * 180, 45, 140, 60),
                )
            )
            if prev:
                cells.append(edge_cell(f"e_{prev}_{nid}", prev, nid, parent=lid))
            prev = nid
            last = nid
        if last:
            last_ids.append(last)
    if hub:
        cells.append(
            cell(
                "hub",
                hub,
                "rounded=1;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;fontStyle=1;",
                vertex=True,
                geom=rect(860, 260, 160, 80),
            )
        )
        for i, lid_end in enumerate(last_ids):
            cells.append(edge_cell(f"e_hub{i}", lid_end, "hub"))
    if tiers:
        cells.append(
            cell(
                "tier_box",
                spec.get("tier_title") or "\u77e5\u8bc6\u5e93\u5c42\u7ea7",
                "swimlane;startSize=30;fillColor=#f5f5f5;strokeColor=#666666;html=1;",
                vertex=True,
                geom=rect(w - 280, 90, 260, min(450, 50 + len(tiers) * 90)),
            )
        )
        prev_t = "hub" if hub else (last_ids[0] if last_ids else None)
        for ti, tier in enumerate(tiers):
            tid = f"t{ti}"
            cells.append(
                cell(
                    tid,
                    tier,
                    f"rounded=1;whiteSpace=wrap;html=1;fillColor={TIER_FILLS[ti % len(TIER_FILLS)]};strokeColor=#333333;",
                    vertex=True,
                    parent="tier_box",
                    geom=rect(30, 50 + ti * 90, 200, 70),
                )
            )
            if prev_t:
                cells.append(edge_cell(f"e_t{ti}", prev_t, tid))
            prev_t = tid
    _add_footer(cells, spec, w, h)
    return cells, w, h


def render_cycle(spec: dict[str, Any]) -> tuple[list[str], int, int]:
    w, h = 1000, 700
    quads = spec.get("quadrants") or []
    cells: list[str] = []
    title = spec.get("title") or ""
    cells.append(
        cell(
            "title",
            title,
            "text;html=1;strokeColor=none;fillColor=none;align=center;fontStyle=1;fontSize=20;",
            vertex=True,
            geom=rect(100, 10, 800, 40),
        )
    )
    center = spec.get("center") or ""
    if center:
        cells.append(
            cell(
                "center",
                center,
                "ellipse;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontStyle=1;",
                vertex=True,
                geom=rect(400, 280, 200, 100),
            )
        )
    positions = [(80, 120), (520, 120), (520, 420), (80, 420)]
    ids: list[str] = []
    for i, q in enumerate(quads[:4]):
        qid = f"q{i}"
        ids.append(qid)
        label = q.get("title") or f"Q{i + 1}"
        body = q.get("body") or ""
        if body:
            label = f"{label}&#xa;{body}"
        x, y = positions[i]
        cells.append(
            cell(
                qid,
                label,
                "rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#333333;",
                vertex=True,
                geom=rect(x, y, 360, 120),
            )
        )
    if len(ids) == 4:
        for i in range(4):
            cells.append(edge_cell(f"ec{i}", ids[i], ids[(i + 1) % 4]))
    _add_footer(cells, spec, w, h)
    return cells, w, h


def render_split(spec: dict[str, Any]) -> tuple[list[str], int, int]:
    w, h = 1100, 620
    cells: list[str] = []
    title = spec.get("title") or ""
    cells.append(
        cell(
            "title",
            title,
            "text;html=1;strokeColor=none;fillColor=none;align=center;fontStyle=1;fontSize=20;",
            vertex=True,
            geom=rect(80, 10, w - 160, 40),
        )
    )
    cells.append(
        cell(
            "core",
            spec.get("center") or "Agent",
            "rounded=1;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;fontStyle=1;fontSize=16;",
            vertex=True,
            geom=rect(w // 2 - 80, 260, 160, 80),
        )
    )
    left = spec.get("left") or []
    right = spec.get("right") or []
    for i, item in enumerate(left):
        nid = f"l{i}"
        cells.append(
            cell(
                nid,
                item,
                "rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;",
                vertex=True,
                geom=rect(40, 100 + i * 90, 220, 70),
            )
        )
        cells.append(edge_cell(f"el{i}", nid, "core"))
    for i, item in enumerate(right):
        nid = f"r{i}"
        cells.append(
            cell(
                nid,
                item,
                "rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;",
                vertex=True,
                geom=rect(w - 260, 100 + i * 90, 220, 70),
            )
        )
        cells.append(edge_cell(f"er{i}", "core", nid))
    _add_footer(cells, spec, w, h)
    return cells, w, h


def render_mountain(spec: dict[str, Any]) -> tuple[list[str], int, int]:
    """Vertical escalation: stages bottom to top."""
    stages = spec.get("stages") or []
    w = 900
    h = max(400, 120 + len(stages) * 130)
    cells: list[str] = []
    title = spec.get("title") or ""
    cells.append(
        cell(
            "title",
            title,
            "text;html=1;strokeColor=none;fillColor=none;align=center;fontStyle=1;fontSize=20;",
            vertex=True,
            geom=rect(80, 10, w - 160, 40),
        )
    )
    if spec.get("subtitle"):
        cells.append(
            cell(
                "subtitle",
                spec["subtitle"],
                "text;html=1;strokeColor=none;fillColor=none;align=center;fontSize=12;",
                vertex=True,
                geom=rect(80, 48, w - 160, 28),
            )
        )
    ids: list[str] = []
    base_y = h - 100 - len(stages) * 20
    for i, st in enumerate(stages):
        nid = f"s{i}"
        ids.append(nid)
        y = base_y - i * 110
        trigger = st.get("trigger") or ""
        label = st.get("label") or str(st)
        if trigger:
            label = f"{trigger}&#xa;\u2192 {label}"
        cells.append(
            cell(
                nid,
                label,
                "rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#333333;",
                vertex=True,
                geom=rect(280, y, 340, 80),
            )
        )
    for i in range(len(ids) - 1):
        cells.append(edge_cell(f"em{i}", ids[i + 1], ids[i]))
    _add_footer(cells, spec, w, h)
    return cells, w, h


def _add_footer(cells: list[str], spec: dict[str, Any], w: int, h: int) -> None:
    if spec.get("footer"):
        cells.append(
            cell(
                "footer",
                spec["footer"],
                "shape=note;whiteSpace=wrap;html=1;fillColor=#ffffcc;strokeColor=#999999;size=14;",
                vertex=True,
                geom=rect(40, h - 90, w - 80, 60),
            )
        )
    ref = spec.get("source_image")
    if ref:
        cells.append(
            cell(
                "ref",
                f"\u53c2\u8003\uff1a{ref}",
                "text;html=1;strokeColor=none;fillColor=none;align=left;fontSize=11;fontColor=#666666;",
                vertex=True,
                geom=rect(40, h - 28, w - 80, 22),
            )
        )


RENDERERS = {
    "chain": render_chain,
    "lanes_hub_tiers": render_lanes_hub_tiers,
    "cycle": render_cycle,
    "split": render_split,
    "mountain": render_mountain,
}


def render_spec(spec: dict[str, Any]) -> str:
    layout = spec.get("layout") or "chain"
    fn = RENDERERS.get(layout, render_chain)
    cells, w, h = fn(spec)
    diagram_id = spec.get("id") or "diagram"
    page_name = spec.get("title") or diagram_id
    return build_mxfile(diagram_id, page_name, cells, w, h)


def write_spec(spec: dict[str, Any], out_dir: Path) -> Path:
    src = spec.get("source_image") or ""
    stem = spec.get("output") or (
        Path(src).stem.replace("Snipaste_", "") if src else spec.get("id", "diagram")
    )
    out = out_dir / f"{stem}.drawio"
    out.write_text(render_spec(spec), encoding="utf-8")
    return out


def load_specs(path: Path) -> list[dict[str, Any]]:
    data = json.loads(path.read_text(encoding="utf-8"))
    if isinstance(data, list):
        return data
    return data.get("diagrams") or []


if __name__ == "__main__":
    import sys

    repo = Path(__file__).resolve().parents[1]
    spec_path = repo / "content" / "drawio" / "asset-flows.json"
    out_dir = repo / "content" / "drawio"
    specs = load_specs(spec_path)
    for s in specs:
        p = write_spec(s, out_dir)
        print(p.name)
