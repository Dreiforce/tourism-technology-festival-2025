import json

with open('Tours.json', 'r', encoding='utf-8-sig') as f:
    data = json.load(f)

filtered = [
    {
        "id": item["id"],
        "title": item["title"],
        "city": item["city"],
        "County": item["County"]
    }
    for item in data
    if (item.get("County") == "Tirol" and item.get("city") != "")
]

with open('../search/src/data/filtered.json', 'w') as out_f:
    json.dump(filtered, out_f, indent=2)
