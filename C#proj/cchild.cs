using System;
using System.Collections.Generic;

public class Program
{
    public static void Main()
    {
        string inputT = Console.ReadLine();
        if (string.IsNullOrWhiteSpace(inputT)) return;
        int t = int.Parse(inputT);

        for (int c = 1; c <= t; c++)
        {
            string inputN = Console.ReadLine();
            if (string.IsNullOrWhiteSpace(inputN)) break;
            int n = int.Parse(inputN);

            string line = Console.ReadLine();
            string[] tokens = line.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
            
            int[] seq = new int[tokens.Length];
            for (int i = 0; i < tokens.Length; i++)
            {
                seq[i] = int.Parse(tokens[i]);
            }

            int[] childrenCount = new int[n + 1];
            Stack<int> stack = new Stack<int>();
            bool[] visited = new bool[n + 1];

            for (int i = 0; i < seq.Length; i++)
            {
                int node = seq[i];

                if (!visited[node])
                {
                    if (stack.Count > 0)
                    {
                        int parent = stack.Peek();
                        childrenCount[parent]++;
                    }
                    stack.Push(node);
                    visited[node] = true;
                }
                else
                {
                    if (stack.Count > 0 && stack.Peek() == node)
                    {
                        stack.Pop();
                    }
                }
            }

            Console.WriteLine("Case " + c + ":");
            for (int i = 1; i <= n; i++)
            {
                Console.WriteLine(i + " -> " + childrenCount[i]);
            }
            Console.WriteLine();
        }
    }
}