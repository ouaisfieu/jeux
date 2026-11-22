"""Indices de pouvoir (Shapley-Shubik, Banzhaf) pour la Chambre belge, novembre 2026.

Composition vérifiée : liste officielle des groupes politiques (DOC 56 0003/005, 20 mars 2025)
+ passage de Michel De Maegd du MR aux Engagés (6 janvier 2026).
Groupes linguistiques : 90 NL / 60 FR (DOC 56 0002/006).
"""
import itertools, json, math
from fractions import Fraction

PARTIES = [
    # nom, sièges, NL, FR, bloc
    ("N-VA", 23, 23, 0, "arizona"),
    ("Vlaams Belang", 20, 20, 0, "opposition"),
    ("MR", 18, 0, 18, "arizona"),
    ("PS", 16, 0, 16, "opposition"),
    ("PVDA-PTB", 15, 7, 8, "opposition"),
    ("Les Engagés", 15, 0, 15, "arizona"),
    ("Vooruit", 13, 13, 0, "arizona"),
    ("CD&V", 11, 11, 0, "arizona"),
    ("Ecolo-Groen", 9, 7, 2, "opposition"),
    ("Anders", 8, 8, 0, "opposition"),
    ("DéFI", 1, 0, 1, "opposition"),
    ("Dedecker (ind.)", 1, 1, 0, "independant"),
]
TOTAL = sum(p[1] for p in PARTIES)
NL_TOTAL = sum(p[2] for p in PARTIES)
FR_TOTAL = sum(p[3] for p in PARTIES)
assert TOTAL == 150 and NL_TOTAL == 90 and FR_TOTAL == 60, (TOTAL, NL_TOTAL, FR_TOTAL)
QUOTA = 76
NL_Q = NL_TOTAL // 2 + 1  # 46
FR_Q = FR_TOTAL // 2 + 1  # 31


def indices(players, win):
    """Shapley-Shubik et Banzhaf exacts par énumération des coalitions."""
    n = len(players)
    fact = [math.factorial(k) for k in range(n + 1)]
    ss = [Fraction(0)] * n
    bz = [0] * n
    winning = []
    for mask in range(1 << n):
        members = [players[i] for i in range(n) if mask >> i & 1]
        if win(members):
            winning.append(mask)
    wset = set(winning)
    for mask in range(1 << n):
        s = bin(mask).count("1")
        if mask not in wset:
            continue
        for i in range(n):
            if mask >> i & 1:
                without = mask & ~(1 << i)
                if without not in wset:  # i est pivot (swing)
                    bz[i] += 1
                    ss[i] += Fraction(fact[s - 1] * fact[n - s], fact[n])
    tot_bz = sum(bz)
    # coalitions minimales gagnantes
    mwc = []
    for mask in winning:
        if all((mask & ~(1 << i)) not in wset for i in range(n) if mask >> i & 1):
            mwc.append(mask)
    return {
        "shapley": [float(x) for x in ss],
        "banzhaf_norm": [b / tot_bz if tot_bz else 0 for b in bz],
        "swings": bz,
        "n_winning": len(winning),
        "mwc": [[players[i][0] for i in range(n) if m >> i & 1] for m in mwc],
    }


def seats(ms):
    return sum(p[1] for p in ms)


def nl(ms):
    return sum(p[2] for p in ms)


def fr(ms):
    return sum(p[3] for p in ms)


EXCLUDED = {"Vlaams Belang", "PVDA-PTB"}

games = {}
# Jeu 1 : majorité simple, tous les acteurs
games["simple_tous"] = (PARTIES, lambda ms: seats(ms) >= QUOTA)
# Jeu 2 : ensemble « gouvernable » (cordon sanitaire VB + PTB hors jeu)
gov = [p for p in PARTIES if p[0] not in EXCLUDED]
games["simple_gouvernable"] = (gov, lambda ms: seats(ms) >= QUOTA)
# Jeu 3 : gouvernable + double majorité linguistique (convention)
games["double_gouvernable"] = (gov, lambda ms: seats(ms) >= QUOTA and nl(ms) >= NL_Q and fr(ms) >= FR_Q)
# Jeu 4 : tous + double majorité (sans cordon)
games["double_tous"] = (PARTIES, lambda ms: seats(ms) >= QUOTA and nl(ms) >= NL_Q and fr(ms) >= FR_Q)

out = {"meta": {"total": TOTAL, "quota": QUOTA, "nl_total": NL_TOTAL, "fr_total": FR_TOTAL,
                 "nl_quota": NL_Q, "fr_quota": FR_Q}, "parties": [
    {"nom": p[0], "sieges": p[1], "nl": p[2], "fr": p[3], "bloc": p[4]} for p in PARTIES], "jeux": {}}

for key, (players, win) in games.items():
    r = indices(players, win)
    out["jeux"][key] = {
        "joueurs": [p[0] for p in players],
        "shapley": r["shapley"],
        "banzhaf": r["banzhaf_norm"],
        "n_gagnantes": r["n_winning"],
        "n_mwc": len(r["mwc"]),
        "mwc_min_taille": min(len(m) for m in r["mwc"]) if r["mwc"] else None,
        "mwc": r["mwc"],
    }
    print(f"\n=== {key} ===  coalitions gagnantes: {r['n_winning']}  minimales: {len(r['mwc'])}  taille min: {out['jeux'][key]['mwc_min_taille']}")
    for p, s, b in sorted(zip(players, r["shapley"], r["banzhaf_norm"]), key=lambda t: -t[1]):
        print(f"  {p[0]:18s} {p[1]:3d} sièges  part {p[1]/sum(q[1] for q in players)*100:6.2f}%  SS {s*100:6.2f}%  BZ {b*100:6.2f}%")

# Coalitions de rechange
def coal(names):
    ms = [p for p in PARTIES if p[0] in names]
    return {"partis": names, "sieges": seats(ms), "nl": nl(ms), "fr": fr(ms),
            "majorite": seats(ms) >= QUOTA, "maj_nl": nl(ms) >= NL_Q, "maj_fr": fr(ms) >= FR_Q}

ARIZ = ["N-VA", "MR", "Les Engagés", "Vooruit", "CD&V"]
alts = {
    "Arizona": ARIZ,
    "Arizona + Dedecker": ARIZ + ["Dedecker (ind.)"],
    "Sans Vooruit, avec Anders": ["N-VA", "MR", "Les Engagés", "CD&V", "Anders"],
    "Sans Vooruit, avec Anders + Dedecker": ["N-VA", "MR", "Les Engagés", "CD&V", "Anders", "Dedecker (ind.)"],
    "Sans Vooruit, avec Anders + Dedecker + DéFI": ["N-VA", "MR", "Les Engagés", "CD&V", "Anders", "Dedecker (ind.)", "DéFI"],
    "Sans Vooruit, avec Ecolo-Groen": ["N-VA", "MR", "Les Engagés", "CD&V", "Ecolo-Groen"],
    "Sans Vooruit, avec Anders + Ecolo-Groen": ["N-VA", "MR", "Les Engagés", "CD&V", "Anders", "Ecolo-Groen"],
    "Sans MR, avec PS": ["N-VA", "PS", "Les Engagés", "Vooruit", "CD&V"],
    "Sans Les Engagés, avec PS": ["N-VA", "MR", "PS", "Vooruit", "CD&V"],
    "Sans CD&V, avec Anders": ["N-VA", "MR", "Les Engagés", "Vooruit", "Anders"],
    "Sans CD&V, avec Anders + Dedecker": ["N-VA", "MR", "Les Engagés", "Vooruit", "Anders", "Dedecker (ind.)"],
    "Sans N-VA (« Vivaldi + Engagés »)": ["PS", "MR", "Les Engagés", "Vooruit", "CD&V", "Ecolo-Groen", "Anders"],
}
out["coalitions"] = {k: coal(v) for k, v in alts.items()}
print("\n=== coalitions de rechange ===")
for k, c in out["coalitions"].items():
    print(f"  {k:45s} {c['sieges']:3d}  NL {c['nl']:2d}/{NL_TOTAL} {'✓' if c['maj_nl'] else '✗'}  FR {c['fr']:2d}/{FR_TOTAL} {'✓' if c['maj_fr'] else '✗'}  fédéral {'✓' if c['majorite'] else '✗'}")

# Sièges NL hors N-VA et hors VB
nl_hors = sum(p[2] for p in PARTIES if p[0] not in ("N-VA", "Vlaams Belang", "PVDA-PTB"))
print(f"\nSièges NL hors N-VA, VB, PVDA : {nl_hors} (majorité NL = {NL_Q})")
out["meta"]["nl_hors_nva_vb_pvda"] = nl_hors

with open("src/_data/pouvoir.json", "w", encoding="utf-8") as f:
    json.dump(out, f, ensure_ascii=False, indent=1)
