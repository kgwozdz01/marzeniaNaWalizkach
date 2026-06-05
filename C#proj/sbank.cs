using System;
using System.Collections.Generic;
using System.Text;

public class Program
{
    public static void Main()
    {
        string tLine = Console.ReadLine();
        if (string.IsNullOrEmpty(tLine)) return;

        if (int.TryParse(tLine.Trim(), out int t))
        {
            for (int i = 0; i < t; i++)
            {
                string nLine = Console.ReadLine();
                while (string.IsNullOrWhiteSpace(nLine) && nLine != null)
                {
                    nLine = Console.ReadLine();
                }
                
                if (nLine == null) break;

                if (int.TryParse(nLine.Trim(), out int n))
                {
                    SortedDictionary<string, int> accounts = new SortedDictionary<string, int>();

                    for (int j = 0; j < n; j++)
                    {
                        string line = Console.ReadLine();
                        if (line == null) break;

                        string trimmed = line.TrimEnd();
                        if (accounts.ContainsKey(trimmed))
                        {
                            accounts[trimmed]++;
                        }
                        else
                        {
                            accounts[trimmed] = 1;
                        }
                    }

                    StringBuilder output = new StringBuilder();
                    foreach (var kvp in accounts)
                    {
                        output.AppendLine($"{kvp.Key} {kvp.Value}");
                    }

                    Console.Write(output.ToString());
                    
                    if (i < t - 1)
                    {
                        Console.WriteLine();
                    }
                }
            }
        }
    }
}