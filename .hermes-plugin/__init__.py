import os
import re
from pathlib import Path

BOOTSTRAP_MARKER = "frame-ship:dev:using-frame-ship bootstrap for hermes"


def _skills_dir() -> str:
    """Locate the stock skills/ tree for either supported install layout.

    - git-clone install (`hermes plugins install deuriib/frame-ship`): the plugin
      dir is the repo root, so `.hermes-plugin/` and `skills/` are siblings and
      this module resolves `../skills`.
    - flattened install (plugin files copied to the plugin dir root): `skills/`
      sits next to this module.

    Raises loudly when neither matches — a bootstrap that silently skips is how
    a broken install masquerades as a working one.
    """
    here = os.path.dirname(os.path.realpath(__file__))
    candidates = (
        os.path.realpath(os.path.join(here, "..", "skills")),
        os.path.realpath(os.path.join(here, "skills")),
    )
    for cand in candidates:
        if os.path.isfile(os.path.join(cand, "using-frame-ship", "SKILL.md")):
            return cand
    raise RuntimeError(
        "frame-ship plugin: cannot find the skills/ tree "
        f"(looked at {candidates}). Reinstall with "
        "`hermes plugins install deuriib/frame-ship`."
    )


def _strip_frontmatter(content: str) -> str:
    match = re.match(r"^---\n[\s\S]*?\n---\n([\s\S]*)$", content)
    return (match.group(1) if match else content).strip()


def _build_bootstrap(skills_dir: str) -> str:
    with open(
        os.path.join(skills_dir, "using-frame-ship", "SKILL.md"),
        encoding="utf-8",
    ) as f:
        body = _strip_frontmatter(f.read())

    tools_path = os.path.join(
        skills_dir, "using-frame-ship", "references", "hermes-tools.md"
    )
    with open(tools_path, encoding="utf-8") as f:
        tool_mapping = f.read().strip()

    return (
        f"<EXTREMELY_IMPORTANT>\n"
        f"{BOOTSTRAP_MARKER}\n\n"
        f"You have frame-ship (dev).\n\n"
        f"The using-frame-ship skill content is included below and is already "
        f"loaded for this Hermes session. Follow it now. "
        f"Do not try to load using-frame-ship again.\n\n"
        f"{body}\n\n"
        f"## Loading Frame-ship Skills on Hermes\n\n"
        f"Frame-ship skills are registered with Hermes' native skill loader: "
        f'invoke one with `skill_view("frame-ship:dev:skill-name")` '
        f'(for example `skill_view("frame-ship:dev:brainstorming")`). '
        f"If a namespaced lookup returns 'not found', read the skill file "
        f"directly instead:\n"
        f'`read_file("{skills_dir}/skill-name/SKILL.md")`\n\n'
        f"The frame-ship skills directory is: `{skills_dir}`\n\n"
        f"{tool_mapping}\n"
        f"</EXTREMELY_IMPORTANT>"
    )


VALID_DOMAINS = (
    "dev",
    "product",
    "security",
    "devops",
    "finance",
    "legal",
    "marketing",
    "people",
    "revenue",
    "automation-roi",
)


def parse_frame_ship_ref(ref):
    """Parse frame-ship:{domain}:{skill}; noisy rejection otherwise.

    Returns {"brand", "domain", "skill"}. Raises RuntimeError with the
    correct equivalence — never resolves silently.
    """
    if isinstance(ref, str) and (ref.startswith("superpowers:") or ref.startswith("oldbrand:")):
        skill = ref.split(":")[-1]
        raise RuntimeError(
            f"Marca retirada '{ref}': soy frame-ship, actualiza tu bootstrap. "
            f"Equivalencia: frame-ship:dev:{skill}. Ver MIGRATION.md"
        )
    m = re.match(r"^frame-ship:([a-z-]+):([a-z-]+)$", ref or "")
    if not m:
        raise RuntimeError(
            f"Invocacion invalida '{ref}': se requieren tres segmentos: "
            f"usa frame-ship:{{domain}}:{{skill}}. Ver MIGRATION.md"
        )
    domain, skill = m.group(1), m.group(2)
    if domain not in VALID_DOMAINS:
        raise RuntimeError(
            f"Dominio desconocido '{domain}' en '{ref}'. "
            f"Dominios validos: {', '.join(VALID_DOMAINS)}. Ver MIGRATION.md"
        )
    return {"brand": "frame-ship", "domain": domain, "skill": skill}


def register(ctx):
    skills_dir = _skills_dir()
    bootstrap = _build_bootstrap(skills_dir)

    # Register every stock skill with Hermes' native loader so skill_view can
    # load them on demand. Standard markdown; no conversion (plugin guide).
    # register_skill requires a pathlib.Path — a str raises AttributeError and
    # hermes silently disables the whole plugin (verified 2026-07-23).
    for name in sorted(os.listdir(skills_dir)):
        skill_md = os.path.join(skills_dir, name, "SKILL.md")
        if os.path.isfile(skill_md):
            ctx.register_skill(name, Path(skill_md))

    # pre_llm_call returning {"context": ...} is the documented injection path
    # (on_session_start return values are ignored, and ctx.inject_message
    # refuses from that hook — verified empirically 2026-07-23). The context is
    # appended to the first turn's user message.
    def pre_llm_call(
        session_id=None,
        user_message=None,
        conversation_history=None,
        is_first_turn=None,
        model=None,
        platform=None,
        **kwargs,
    ):
        if is_first_turn:
            return {"context": bootstrap}
        return None

    ctx.register_hook("pre_llm_call", pre_llm_call)
