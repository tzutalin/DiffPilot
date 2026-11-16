# Frame tools/app-store/raw/*.png (from `cargo test demo_screenshots -- --ignored` and
# `cargo test website_screenshots -- --ignored` in the app repo) into 2880x1800 App Store images
# plus thumbnails in assets/app-store/, and website screenshots in assets/screens/. Usage (from the repo root): python3 tools/app-store/frame.py
import os
from PIL import Image, ImageDraw, ImageFilter, ImageFont
here = os.path.dirname(os.path.abspath(__file__))
out = os.path.join(here, "..", "..", "assets", "app-store")
W, H = 2880, 1800
SF = "/System/Library/Fonts/SFNS.ttf"
def font(size, weight):
    f = ImageFont.truetype(SF, size)
    try: f.set_variation_by_axes([100, min(96, size), 400, weight])
    except Exception: pass
    return f
scenes = [
    ("01-agent-review", "Your AI reviewer, on the exact line.", "The agent drafts review comments right where the problem is.", ((25,32,72),(64,38,110))),
    ("02-ask-agent", "Ask about any change.", "Select lines and get a clear answer in the side panel.", ((14,42,66),(28,88,120))),
    ("03-submit-review", "Ship the review to GitHub.", "Comment, approve or request changes without leaving your diff.", ((20,52,40),(36,110,80))),
    ("04-pull-requests", "Every PR that needs you.", "Review requests, your PRs and assignments in one place.", ((60,30,24),(140,70,40))),
    ("05-light-theme", "Write better comments.", "Polish rough notes into clear, kind feedback with one click.", ((232,238,248),(200,214,240))),
    ("06-themes", "Make it yours.", "Light and dark themes for every taste.", ((48,24,64),(120,50,110))),
    ("07-difftool", "Your git difftool, upgraded.", "Run git difftool and review every file in one window.", ((16,30,56),(30,64,110)), "web-difftool"),
    ("08-mergetool", "Resolve conflicts side by side.", "Local, base and remote for every conflict, then save and exit.", ((40,22,60),(90,44,120)), "web-mergetool"),
    ("09-image-compare", "See what changed in images.", "Side by side, swipe, onion skin or pixel difference.", ((14,46,46),(24,104,96)), "web-image-compare"),
    ("10-agents", "Bring the agent you already use.", "Claude Code, Codex, Gemini CLI, Cursor and 25 more over ACP.", ((44,28,20),(120,64,36)), "web-agents"),
]
for name, title, sub, (c1, c2), *src in scenes:
    bg = Image.new("RGB", (W, H))
    d = ImageDraw.Draw(bg)
    for y in range(H):
        t = y / H
        d.line([(0, y), (W, y)], fill=tuple(int(a + (b - a) * t) for a, b in zip(c1, c2)))
    light = sum(c1) > 600
    fg, fg2 = ((20,24,36), (70,80,100)) if light else ((255,255,255), (205,210,225))
    ft, fs = font(112, 700), font(52, 400)
    d.text((W/2, 170), title, font=ft, fill=fg, anchor="mm")
    d.text((W/2, 285), sub, font=fs, fill=fg2, anchor="mm")
    shot = Image.open(f"{here}/raw/{src[0] if src else name}.png").convert("RGB")
    sw = 2300; sh = int(shot.height * sw / shot.width)
    shot = shot.resize((sw, sh), Image.LANCZOS)
    x, y, r = (W - sw)//2, 390, 28
    shadow = Image.new("L", (W, H), 0)
    ImageDraw.Draw(shadow).rounded_rectangle([x, y+30, x+sw, y+sh+30], r, fill=150)
    shadow = shadow.filter(ImageFilter.GaussianBlur(50))
    bg.paste(Image.new("RGB", (W, H), (0,0,0)), (0,0), shadow)
    mask = Image.new("L", (sw, sh), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0,0,sw-1,sh-1], r, fill=255)
    bg.paste(shot, (x, y), mask)
    ImageDraw.Draw(bg).rounded_rectangle([x, y, x+sw-1, y+sh-1], r, outline=(255,255,255) if not light else (180,190,210), width=2)
    bg.save(f"{out}/{name}.png", optimize=True)
    bg.resize((800, 500), Image.LANCZOS).save(f"{out}/{name}-thumb.jpg", quality=85, optimize=True)
    print(name, bg.size)

# Website screenshots (unframed): assets/screens/<name>.jpg at 2000x1250 and <name>-sm.jpg at 1200x750.
screens = os.path.join(here, "..", "..", "assets", "screens")
for raw, name in [
    ("01-agent-review", "agent-review"), ("02-ask-agent", "ask-agent"), ("03-submit-review", "submit-review"),
    ("04-pull-requests", "pull-requests"), ("05-light-theme", "light-theme"), ("06-themes", "themes"),
    ("web-difftool", "difftool"), ("web-conflict", "conflict"), ("web-mergetool", "mergetool"),
    ("web-image-compare", "image-compare"), ("web-pdf-compare", "pdf-compare"), ("web-agents", "agents"),
]:
    im = Image.open(f"{here}/raw/{raw}.png").convert("RGB")
    if raw == "web-agents":  # the settings content sits in the top left; crop away the empty window (keeps 16:10)
        im = im.crop((0, 0, 1920, 1200))
    for suffix, size in [("", (2000, 1250)), ("-sm", (1200, 750))]:
        im.resize(size, Image.LANCZOS).save(f"{screens}/{name}{suffix}.jpg", quality=82, optimize=True, progressive=True)
    print(name)
