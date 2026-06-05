using System;
using System.Collections.Generic;
using System.Linq;

string? line1 = Console.ReadLine();
if (line1 == null) return;

int n = int.Parse(line1.Trim());

string? line2 = Console.ReadLine();
if (line2 == null) return;

string[] tokens = line2.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);

List<Element> list = new List<Element>();

for (int i = 0; i < n; i++)
{
    int value = int.Parse(tokens[i]);
    list.Add(new Element(value, i + 1));
}

var sortedList = list
    .OrderBy(e => e.Value)
    .ThenByDescending(e => e.OriginalIndex);

List<string> result = new List<string>();
foreach (var item in sortedList)
{
    result.Add(item.OriginalIndex.ToString());
}

Console.WriteLine(string.Join(" ", result));

struct Element
{
    public int Value { get; }
    public int OriginalIndex { get; }

    public Element(int value, int originalIndex)
    {
        Value = value;
        OriginalIndex = originalIndex;
    }
}