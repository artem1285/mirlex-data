"""Extract original PP2394 HTML export; never activate without legal review."""
import sys,json,re,hashlib,collections
from bs4 import BeautifulSoup
b=open(sys.argv[1],"rb").read()
s=BeautifulSoup(b,"html.parser")
g=k=None
rows=[];groups={};headers=[];unexpected=[]
for ti,t in enumerate(s.find_all("table"),1):
    for ri,row in enumerate(t.find_all("tr"),1):
        c=[x.get_text(" ",strip=True) for x in row.find_all(["td","th"],recursive=False)]
        if not c or not any(c): continue
        if len(c)==1:
            a=c[0];m=re.match(r"Группа №\s*(\d+)",a)
            if m:
                g=int(m[1]);groups[g]=a;k=None
            elif re.match(r"Виды? отход",a): k="waste";headers.append([g,k,a])
            elif re.match(r"Виды? вторичного",a): k="secondary";headers.append([g,k,a])
            elif re.match(r"Виды? товаров",a): k="product";headers.append([g,k,a])
            elif g: unexpected.append([ti,ri,c])
        elif len(c)==2 and g and k:
            rows.append(dict(group=g,kind=k,name=c[0],codeRaw=c[1],table=ti,row=ri))
        elif g: unexpected.append([ti,ri,c])
out=[]
for r in rows:
    if r["codeRaw"]: out.append(r)
    else:
        assert out and out[-1]["group"]==r["group"] and out[-1]["kind"]==r["kind"]
        out[-1].setdefault("continuations",[]).append(dict(text=r["name"],table=r["table"],row=r["row"]))
assert set(groups)==set(range(1,53)) and not unexpected
assert len(rows)==987 and len(out)==971
counts=dict(collections.Counter(r["kind"] for r in out))
assert counts=={"waste":484,"secondary":92,"product":395}
d=dict(status="STAGING_SOURCE_EXTRACTION",edition="2024-01-01",sourceSha256=hashlib.sha256(b).hexdigest(),groups=groups,headers=headers,rows=out,unexpected=unexpected,counts=counts,sourceDataRows=len(rows),codedRows=len(out),legalVerification="Independent row-by-row verification and 2027 amendments pending")
with open(sys.argv[2],"w",encoding="utf-8") as f: json.dump(d,f,ensure_ascii=False,indent=2)
