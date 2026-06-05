using System;
using System.Collections.Generic;

string inputLine = Console.ReadLine();
if (inputLine != null && int.TryParse(inputLine, out int testCases))
{
    for (int t = 0; t < testCases; t++)
    {
        string line1 = Console.ReadLine();
        if (line1 == null) continue;

        string[] firstLine = line1.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
        int n = int.Parse(firstLine[0]);
        int m = int.Parse(firstLine[1]);

        string line2 = Console.ReadLine();
        if (line2 == null) continue;

        string[] secondLine = line2.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
        
        Queue<Job> queue = new Queue<Job>();
        int[] priorityCounts = new int[10]; 

        for (int i = 0; i < n; i++)
        {
            int priority = int.Parse(secondLine[i]);
            bool isMine = (i == m);
            
            queue.Enqueue(new Job(priority, isMine));
            priorityCounts[priority]++;
        }

        int minutes = 0;
        int currentMaxPriority = 9;

        while (queue.Count > 0)
        {
            while (currentMaxPriority > 0 && priorityCounts[currentMaxPriority] == 0)
            {
                currentMaxPriority--;
            }

            Job currentJob = queue.Dequeue();

            if (currentJob.Priority < currentMaxPriority)
            {
                queue.Enqueue(currentJob);
            }
            else
            {
                minutes++;
                priorityCounts[currentJob.Priority]--;

                if (currentJob.IsMine)
                {
                    Console.WriteLine(minutes);
                    break;
                }
            }
        }
    }
}

struct Job
{
    public int Priority { get; }
    public bool IsMine { get; }

    public Job(int priority, bool isMine)
    {
        Priority = priority;
        IsMine = isMine;
    }
}