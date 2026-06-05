using System;

public class Program
{
    private static int index;
    private static string treeStr;

    public static void Main()
    {
        string inputT = Console.ReadLine();
        if (string.IsNullOrWhiteSpace(inputT)) return;
        int t = int.Parse(inputT);

        for (int c = 0; c < t; c++)
        {
            treeStr = Console.ReadLine();
            if (string.IsNullOrWhiteSpace(treeStr)) break;

            index = 0;
            int depth = GetDepth();
            Console.WriteLine(depth);
        }
    }

    private static int GetDepth()
    {
        if (index >= treeStr.Length) 
        {
            return 0;
        }

        char node = treeStr[index];
        index++;

        if (node == 'l')
        {
            return 0;
        }
        else
        {
            int leftDepth = GetDepth();
            int rightDepth = GetDepth();

            if (leftDepth > rightDepth)
            {
                return leftDepth + 1;
            }
            else
            {
                return rightDepth + 1;
            }
        }
    }
}