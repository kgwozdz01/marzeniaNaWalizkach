// file: Heap.cs

public class Heap<T> : System.Collections.Generic.IEnumerable<T> where T : System.IComparable<T>
{
    private System.Collections.Generic.List<T> list;
    public HeapOptions Option { get; }

    public Heap(HeapOptions option = HeapOptions.MinHeap)
    {
        this.Option = option;
        list = new System.Collections.Generic.List<T>();
    }

    public Heap(System.Collections.Generic.IEnumerable<T> collection, HeapOptions option = HeapOptions.MinHeap)
    {
        this.Option = option;
        list = new System.Collections.Generic.List<T>();
        foreach (T item in collection)
        {
            Insert(item);
        }
    }

    public int Count => list.Count;

    private int Compare(T x, T y)
    {
        int cmp = x.CompareTo(y);
        return Option == HeapOptions.MaxHeap ? -cmp : cmp;
    }

    public void Insert(T x)
    {
        list.Add(x);
        HeapifyUp(list.Count - 1);
    }

    public T Delete()
    {
        if (list.Count == 0)
        {
            throw new System.InvalidOperationException();
        }
        T result = list[0];
        int lastIndex = list.Count - 1;
        list[0] = list[lastIndex];
        list.RemoveAt(lastIndex);
        if (list.Count > 0)
        {
            HeapifyDown(0);
        }
        return result;
    }

    public T Top()
    {
        if (list.Count == 0)
        {
            throw new System.InvalidOperationException();
        }
        return list[0];
    }

    public void Clear()
    {
        list.Clear();
    }

    public T[] ToArray()
    {
        return list.ToArray();
    }

    private void HeapifyUp(int index)
    {
        while (index > 0)
        {
            int parentIndex = (index - 1) / 2;
            if (Compare(list[index], list[parentIndex]) >= 0)
            {
                break;
            }
            T temp = list[index];
            list[index] = list[parentIndex];
            list[parentIndex] = temp;
            index = parentIndex;
        }
    }

    private void HeapifyDown(int index)
    {
        int size = list.Count;
        while (true)
        {
            int leftChild = 2 * index + 1;
            int rightChild = 2 * index + 2;
            int smallestOrLargest = index;

            if (leftChild < size && Compare(list[leftChild], list[smallestOrLargest]) < 0)
            {
                smallestOrLargest = leftChild;
            }
            if (rightChild < size && Compare(list[rightChild], list[smallestOrLargest]) < 0)
            {
                smallestOrLargest = rightChild;
            }
            if (smallestOrLargest == index)
            {
                break;
            }

            T temp = list[index];
            list[index] = list[smallestOrLargest];
            list[smallestOrLargest] = temp;
            index = smallestOrLargest;
        }
    }

    public System.Collections.Generic.IEnumerator<T> GetEnumerator()
    {
        return list.GetEnumerator();
    }

    System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
    {
        return GetEnumerator();
    }
}