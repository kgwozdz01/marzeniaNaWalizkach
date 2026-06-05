using System;
using System.Collections.Generic;
using System.Linq;

string? firstLine = Console.ReadLine();
if (firstLine == null) return;

string[] tokens = firstLine.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
int n = int.Parse(tokens[0]);

string? secondLine = Console.ReadLine();
if (secondLine == null) return;

string[] numTokens = secondLine.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);

Dictionary<int, int> counts = new Dictionary<int, int>();
Dictionary<int, int> firstIndex = new Dictionary<int, int>();
List<int> originalOrder = new List<int>();

for (int i = 0; i < n; i++)
{
    int num = int.Parse(numTokens[i]);
    originalOrder.Add(num);

    if (counts.ContainsKey(num))
    {
        counts[num]++;
    }
    else
    {
        counts[num] = 1;
        firstIndex[num] = i;
    }
}

var sortedNumbers = originalOrder
    .OrderByDescending(num => counts[num])
    .ThenBy(num => firstIndex[num]);

Console.WriteLine(string.Join(" ", sortedNumbers));