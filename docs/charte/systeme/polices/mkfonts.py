import sys
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
src = sys.argv[1]; out = sys.argv[2]
jobs = [
 ("fraunces/files/fraunces-latin-full-normal.woff2", {"wght":600,"opsz":48,"SOFT":30,"WONK":0}, "Fraunces SemiBold"),
 ("fraunces/files/fraunces-latin-full-italic.woff2", {"wght":600,"opsz":48,"SOFT":30,"WONK":0}, "Fraunces SemiBold Italic"),
 ("instrument-sans/files/instrument-sans-latin-standard-normal.woff2", {"wght":400,"wdth":100}, "Instrument Sans"),
 ("instrument-sans/files/instrument-sans-latin-standard-normal.woff2", {"wght":700,"wdth":100}, "Instrument Sans Bold"),
]
for path, loc, name in jobs:
    f = TTFont(f"{src}/{path}")
    axes = {a.axisTag for a in f["fvar"].axes}
    f = instantiateVariableFont(f, {k:v for k,v in loc.items() if k in axes}, updateFontNames=False)
    f.flavor = None
    ps = name.replace(" ", "")
    for rec in list(f["name"].names):
        if rec.nameID in (1,4,16,17,21,22,25): f["name"].removeNames(nameID=rec.nameID)
    f["name"].setName(name, 1, 3, 1, 0x409); f["name"].setName("Regular", 2, 3, 1, 0x409)
    f["name"].setName(name, 4, 3, 1, 0x409); f["name"].setName(ps, 6, 3, 1, 0x409)
    f["OS/2"].usWeightClass = 400; f["OS/2"].fsSelection = (f["OS/2"].fsSelection & ~0b1100001) | 0b1000000; f["head"].macStyle = 0
    fn = f"{out}/{name.replace(' ', '-')}.ttf"; f.save(fn)
    print(fn, sorted(axes), "glyphs:", len(f.getGlyphOrder()), "œ:", 0x153 in f.getBestCmap(), "’:", 0x2019 in f.getBestCmap(), "€:", 0x20ac in f.getBestCmap())
