using System;
using System.Collections.Generic;

public class Program
{
    public static void Main()
    {
        string line = Console.ReadLine();
        if (string.IsNullOrWhiteSpace(line)) return;

        string[] tokens = line.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
        int n = int.Parse(tokens[0]);
        int m = int.Parse(tokens[1]);

        if (m != n - 1)
        {
            for (int i = 0; i < m; i++)
            {
                Console.ReadLine();
            }
            Console.WriteLine("NO");
            return;
        }

        List<int>[] adj = new List<int>[n + 1];
        for (int i = 1; i <= n; i++)
        {
            adj[i] = new List<int>();
        }

        for (int i = 0; i < m; i++)
        {
            string edgeLine = Console.ReadLine();
            string[] edgeTokens = edgeLine.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
            int u = int.Parse(edgeTokens[0]);
            int v = int.Parse(edgeTokens[1]);
            adj[u].Add(v);
            adj[v].Add(u);
        }

        if (n == 1 && m == 0)
        {
            Console.WriteLine("YES");
            return;
        }

        bool[] visited = new bool[n + 1];
        Queue<int> queue = new Queue<int>();

        queue.Enqueue(1);
        visited[1] = true;
        int visitedCount = 1;

        while (queue.Count > 0)
        {
            int curr = queue.Dequeue();

            for (int i = 0; i < adj[curr].Count; i++)
            {
                int neighbor = adj[curr][i];
                if (!visited[neighbor])
                {
                    visited[neighbor] = true;
                    visitedCount++;
                    queue.Enqueue(neighbor);
                }
            }
        }

        if (visitedCount == n)
        {
            Console.WriteLine("YES");
        }
        else
        {
            Console.WriteLine("NO");
        }
    }
}