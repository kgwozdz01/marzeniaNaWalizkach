using System;
using System.Collections.Generic;
using System.Linq;

int caseNumber = 1;

while (true)
{
    string? line1 = Console.ReadLine();
    if (line1 == null) break;

    int n = int.Parse(line1.Trim());
    if (n == 0) break;

    string? line2 = Console.ReadLine();
    if (line2 == null) break;

    string[] tokens = line2.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
    int[] original = new int[n];
    for (int i = 0; i < n; i++)
    {
        original[i] = int.Parse(tokens[i]);
    }

    int[] sorted = (int[])original.Clone();
    Array.Sort(sorted);

    int globalMin = sorted[0];

    Dictionary<int, int> targetPositions = new Dictionary<int, int>();
    for (int i = 0; i < n; i++)
    {
        targetPositions[sorted[i]] = i;
    }

    bool[] visited = new bool[n];
    int totalCost = 0;

    for (int i = 0; i < n; i++)
    {
        if (visited[i] || original[i] == sorted[i])
        {
            continue;
        }

        int current = i;
        int sumOfCycle = 0;
        int minInCycle = int.MaxValue;
        int countInCycle = 0;

        while (!visited[current])
        {
            visited[current] = true;
            int value = original[current];
            
            sumOfCycle += value;
            if (value < minInCycle)
            {
                minInCycle = value;
            }
            countInCycle++;

            current = targetPositions[value];
        }

        int cost1 = sumOfCycle + (countInCycle - 2) * minInCycle;
        int cost2 = sumOfCycle + minInCycle + (countInCycle + 1) * globalMin;

        if (cost1 < cost2)
        {
            totalCost += cost1;
        }
        else
        {
            totalCost += cost2;
        }
    }

    Console.WriteLine($"Case {caseNumber}: {totalCost}");
    Console.WriteLine();

    caseNumber++;
}