using System;
using System.Collections.Generic;

public class Program
{
    private static int[] pre;
    private static int[] post;
    private static int[] ino;
    
    private static Dictionary<int, int> prePos = new Dictionary<int, int>();
    private static Dictionary<int, int> postPos = new Dictionary<int, int>();
    private static Dictionary<int, int> inoPos = new Dictionary<int, int>();

    public static void Main()
    {
        string inputN = Console.ReadLine();
        if (string.IsNullOrWhiteSpace(inputN)) return;
        int n = int.Parse(inputN.Trim());

        pre = ReadArray(n);
        post = ReadArray(n);
        ino = ReadArray(n);

        for (int i = 0; i < n; i++)
        {
            prePos[pre[i]] = i;
            postPos[post[i]] = i;
            inoPos[ino[i]] = i;
        }

        if (CheckTree(0, n - 1, 0, n - 1, 0, n - 1))
        {
            Console.WriteLine("yes");
        }
        else
        {
            Console.WriteLine("no");
        }
    }

    private static int[] ReadArray(int n)
    {
        int[] arr = new int[n];
        int count = 0;
        while (count < n)
        {
            string line = Console.ReadLine();
            if (line == null) break;
            string[] tokens = line.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
            for (int i = 0; i < tokens.Length && count < n; i++)
            {
                arr[count++] = int.Parse(tokens[i]);
            }
        }
        return arr;
    }

    private static bool CheckTree(int preL, int preR, int postL, int postR, int inL, int inR)
    {
        if (preL > preR) return true;

        int root = pre[preL];

        if (post[postR] != root) return false;

        if (!inoPos.ContainsKey(root)) return false;
        int inRootIdx = inoPos[root];

        if (inRootIdx < inL || inRootIdx > inR) return false;

        int leftSize = inRootIdx - inL;
        int rightSize = inR - inRootIdx;

        if (leftSize > 0)
        {
            int leftRoot = pre[preL + 1];
            if (!postPos.ContainsKey(leftRoot)) return false;
            int leftPostRootIdx = postPos[leftRoot];
            if (leftPostRootIdx < postL || leftPostRootIdx >= postL + leftSize) return false;
        }

        if (rightSize > 0)
        {
            int rightRoot = post[postR - 1];
            if (!prePos.ContainsKey(rightRoot)) return false;
            int rightPreRootIdx = prePos[rightRoot];
            if (rightPreRootIdx < preR - rightSize + 1 || rightPreRootIdx > preR) return false;
        }

        bool leftValid = CheckTree(preL + 1, preL + leftSize, postL, postL + leftSize - 1, inL, inRootIdx - 1);
        if (!leftValid) return false;

        bool rightValid = CheckTree(preR - rightSize + 1, preR, postR - rightSize, postR - 1, inRootIdx + 1, inR);
        return rightValid;
    }
}