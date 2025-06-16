class QuizGenerator {
  constructor() {
    this.questionTypes = {
      "c-basics": this.generateCBasicsQuestions,
      "data-structures": this.generateDataStructuresQuestions,
      algorithms: this.generateAlgorithmsQuestions,
      memory: this.generateMemoryQuestions,
    };
  }

  generateQuiz(type) {
    const generator = this.questionTypes[type];
    if (!generator) {
      throw new Error("Invalid quiz type");
    }
    return generator.call(this);
  }

  generateCBasicsQuestions() {
    const questions = [];

    // Question 1: sizeof struct
    questions.push({
      type: "short_answer",
      text: "Evaluate the expression `sizeof(struct s1)`",
      code: `struct s1 { 
    long l;
    char c;
    int i;
    short s;
};`,
      answer: "24",
      explanation:
        "The struct size is 24 bytes due to padding: 8 (long) + 1 (char) + 3 (padding) + 4 (int) + 2 (short) + 6 (padding) = 24 bytes",
    });

    // Question 2: Pointer arithmetic
    questions.push({
      type: "short_answer",
      text: "What is the output of the following code?",
      code: `int arr[] = {1, 2, 3, 4, 5};
int *p = arr;
printf("%d", *(p + 2));`,
      answer: "3",
      explanation:
        "p + 2 moves the pointer 2 elements forward, and * dereferences it to get the value 3",
    });

    // Question 3: Bit manipulation
    questions.push({
      type: "short_answer",
      text: "What is the result of the following bitwise operation?",
      code: `int x = 5;  // 0101 in binary
int y = 3;  // 0011 in binary
int result = x & y;`,
      answer: "1",
      explanation:
        "Bitwise AND of 0101 and 0011 is 0001, which is 1 in decimal",
    });

    // Question 4: String manipulation
    questions.push({
      type: "short_answer",
      text: "What is the output of the following code?",
      code: `char str[] = "Hello";
printf("%d", strlen(str));`,
      answer: "5",
      explanation:
        "strlen() returns the length of the string excluding the null terminator",
    });

    // Question 5: Array indexing
    questions.push({
      type: "short_answer",
      text: "What is the value of arr[2] after this code executes?",
      code: `int arr[5] = {0};
arr[arr[0]++] = 1;
arr[arr[0]++] = 2;
arr[arr[0]++] = 3;`,
      answer: "3",
      explanation:
        "The post-increment operator and array indexing create a sequence of assignments",
    });

    // Question 6: Function pointers
    questions.push({
      type: "short_answer",
      text: "What is the size of a function pointer in bytes on a 64-bit system?",
      code: `void (*func_ptr)();`,
      answer: "8",
      explanation:
        "On a 64-bit system, all pointers (including function pointers) are 8 bytes",
    });

    // Question 7: Union size
    questions.push({
      type: "short_answer",
      text: "What is the size of this union in bytes?",
      code: `union u {
    int i;
    char c;
    double d;
};`,
      answer: "8",
      explanation:
        "The union size is determined by its largest member (double, which is 8 bytes)",
    });

    // Question 8: Preprocessor
    questions.push({
      type: "short_answer",
      text: "What is the output of this code?",
      code: `#define SQUARE(x) x * x
int result = SQUARE(2 + 3);`,
      answer: "11",
      explanation:
        "The macro expands to 2 + 3 * 2 + 3, which evaluates to 11 due to operator precedence",
    });

    // Question 9: Type casting
    questions.push({
      type: "short_answer",
      text: "What is the value of result?",
      code: `int result = (int)(3.14 + 2.86);`,
      answer: "6",
      explanation:
        "The floating-point sum is 6.0, which is cast to int, resulting in 6",
    });

    // Question 10: Bit shifting
    questions.push({
      type: "short_answer",
      text: "What is the result of this bit shift operation?",
      code: `int x = 8;
int result = x << 2;`,
      answer: "32",
      explanation:
        "Left shifting by 2 is equivalent to multiplying by 4: 8 * 4 = 32",
    });

    return this.shuffleArray(questions);
  }

  generateDataStructuresQuestions() {
    const questions = [];

    // Question 1: Linked List
    questions.push({
      type: "short_answer",
      text: "What is the time complexity of inserting a node at the beginning of a singly linked list?",
      code: `struct Node {
    int data;
    struct Node* next;
};`,
      answer: "O(1)",
      explanation:
        "Inserting at the beginning only requires updating the head pointer and the new node's next pointer",
    });

    // Question 2: Binary Tree
    questions.push({
      type: "short_answer",
      text: "What is the maximum number of nodes in a binary tree of height 3?",
      code: `struct Node {
    int data;
    struct Node* left;
    struct Node* right;
};`,
      answer: "15",
      explanation:
        "A binary tree of height h can have at most 2^(h+1) - 1 nodes. For h=3: 2^4 - 1 = 15",
    });

    // Question 3: Stack
    questions.push({
      type: "short_answer",
      text: "What is the result of these stack operations?",
      code: `Stack: push(1), push(2), pop(), push(3), pop(), pop()`,
      answer: "1",
      explanation: "The operations result in: 1,2 -> 1 -> 1,3 -> 1 -> empty",
    });

    // Question 4: Queue
    questions.push({
      type: "short_answer",
      text: "What is the time complexity of enqueue operation in a circular queue?",
      code: `struct Queue {
    int front, rear;
    int capacity;
    int* array;
};`,
      answer: "O(1)",
      explanation:
        "Enqueue in a circular queue is a constant time operation as it only requires updating the rear pointer",
    });

    // Question 5: Hash Table
    questions.push({
      type: "short_answer",
      text: "What is the load factor of a hash table with 8 elements and 10 buckets?",
      code: `struct HashTable {
    int size;
    int capacity;
    struct Node** buckets;
};`,
      answer: "0.8",
      explanation:
        "Load factor = number of elements / number of buckets = 8/10 = 0.8",
    });

    // Question 6: Binary Search Tree
    questions.push({
      type: "short_answer",
      text: "What is the height of a balanced binary search tree with 7 nodes?",
      code: `struct Node {
    int data;
    struct Node* left;
    struct Node* right;
};`,
      answer: "2",
      explanation:
        "A balanced BST with 7 nodes will have a height of 2 (log₂(7) rounded up)",
    });

    // Question 7: Graph
    questions.push({
      type: "short_answer",
      text: "What is the number of edges in a complete graph with 5 vertices?",
      code: `struct Graph {
    int V;
    int** adjMatrix;
};`,
      answer: "10",
      explanation:
        "A complete graph with n vertices has n(n-1)/2 edges. For n=5: 5*4/2 = 10",
    });

    // Question 8: Heap
    questions.push({
      type: "short_answer",
      text: "What is the index of the parent node of a node at index 7 in a binary heap?",
      code: `struct Heap {
    int* array;
    int size;
    int capacity;
};`,
      answer: "3",
      explanation:
        "In a binary heap, the parent of node i is at index (i-1)/2. For i=7: (7-1)/2 = 3",
    });

    // Question 9: Trie
    questions.push({
      type: "short_answer",
      text: "What is the space complexity of a trie storing n strings of average length m?",
      code: `struct TrieNode {
    struct TrieNode* children[26];
    bool isEndOfWord;
};`,
      answer: "O(n*m)",
      explanation:
        "Each character in each string requires a node, leading to O(n*m) space complexity",
    });

    // Question 10: AVL Tree
    questions.push({
      type: "short_answer",
      text: "What is the maximum number of rotations needed to balance an AVL tree after insertion?",
      code: `struct AVLNode {
    int data;
    struct AVLNode* left;
    struct AVLNode* right;
    int height;
};`,
      answer: "2",
      explanation:
        "In the worst case, an AVL tree insertion requires at most 2 rotations to maintain balance",
    });

    return this.shuffleArray(questions);
  }

  generateAlgorithmsQuestions() {
    const questions = [];

    // Question 1: Sorting
    questions.push({
      type: "short_answer",
      text: "What is the time complexity of merge sort?",
      code: `void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
      answer: "O(n log n)",
      explanation:
        "Merge sort divides the array in half recursively (log n) and merges n elements at each level",
    });

    // Question 2: Searching
    questions.push({
      type: "short_answer",
      text: "What is the time complexity of binary search?",
      code: `int binarySearch(int arr[], int l, int r, int x) {
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (arr[m] == x) return m;
        if (arr[m] < x) l = m + 1;
        else r = m - 1;
    }
    return -1;
}`,
      answer: "O(log n)",
      explanation:
        "Binary search halves the search space in each iteration, leading to logarithmic time complexity",
    });

    // Question 3: Dynamic Programming
    questions.push({
      type: "short_answer",
      text: "What is the time complexity of the Fibonacci sequence using dynamic programming?",
      code: `int fib(int n) {
    int dp[n + 1];
    dp[0] = 0;
    dp[1] = 1;
    for (int i = 2; i <= n; i++)
        dp[i] = dp[i-1] + dp[i-2];
    return dp[n];
}`,
      answer: "O(n)",
      explanation:
        "The dynamic programming solution computes each Fibonacci number once, leading to linear time complexity",
    });

    // Question 4: Graph Algorithms
    questions.push({
      type: "short_answer",
      text: "What is the time complexity of Dijkstra's algorithm using a binary heap?",
      code: `void dijkstra(Graph* graph, int src) {
    // Implementation using binary heap
}`,
      answer: "O((V+E)log V)",
      explanation:
        "V is the number of vertices and E is the number of edges. Each vertex is processed once, and each edge may cause a heap operation",
    });

    // Question 5: String Matching
    questions.push({
      type: "short_answer",
      text: "What is the time complexity of the naive string matching algorithm?",
      code: `void naiveSearch(char* pat, char* txt) {
    int M = strlen(pat);
    int N = strlen(txt);
    for (int i = 0; i <= N - M; i++) {
        int j;
        for (j = 0; j < M; j++)
            if (txt[i + j] != pat[j])
                break;
        if (j == M)
            printf("Pattern found at index %d\n", i);
    }
}`,
      answer: "O(m*n)",
      explanation:
        "The algorithm checks each possible position in the text (n) and compares the pattern (m) at each position",
    });

    // Question 6: Tree Traversal
    questions.push({
      type: "short_answer",
      text: "What is the time complexity of inorder tree traversal?",
      code: `void inorder(struct Node* root) {
    if (root != NULL) {
        inorder(root->left);
        printf("%d ", root->data);
        inorder(root->right);
    }
}`,
      answer: "O(n)",
      explanation:
        "Each node is visited exactly once during the traversal, leading to linear time complexity",
    });

    // Question 7: Matrix Operations
    questions.push({
      type: "short_answer",
      text: "What is the time complexity of matrix multiplication?",
      code: `void multiply(int A[][N], int B[][N], int C[][N]) {
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            C[i][j] = 0;
            for (int k = 0; k < N; k++)
                C[i][j] += A[i][k] * B[k][j];
        }
    }
}`,
      answer: "O(n³)",
      explanation:
        "The algorithm uses three nested loops, each iterating n times, leading to cubic time complexity",
    });

    // Question 8: Hashing
    questions.push({
      type: "short_answer",
      text: "What is the average time complexity of search in a hash table with chaining?",
      code: `struct HashTable {
    struct Node** table;
    int size;
};`,
      answer: "O(1)",
      explanation:
        "With a good hash function and proper load factor, search operations average constant time",
    });

    // Question 9: Recursion
    questions.push({
      type: "short_answer",
      text: "What is the space complexity of recursive factorial calculation?",
      code: `int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}`,
      answer: "O(n)",
      explanation:
        "Each recursive call adds a new frame to the call stack, leading to linear space complexity",
    });

    // Question 10: Sorting
    questions.push({
      type: "short_answer",
      text: "What is the worst-case time complexity of quicksort?",
      code: `void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
      answer: "O(n²)",
      explanation:
        "When the pivot selection is poor (e.g., already sorted array), quicksort can degrade to quadratic time",
    });

    return this.shuffleArray(questions);
  }

  generateMemoryQuestions() {
    const questions = [];

    // Question 1: Memory Allocation
    questions.push({
      type: "short_answer",
      text: "What is the size of memory allocated by this malloc call?",
      code: `int* arr = (int*)malloc(5 * sizeof(int));`,
      answer: "20",
      explanation: "5 integers * 4 bytes per integer = 20 bytes total",
    });

    // Question 2: Memory Leak
    questions.push({
      type: "short_answer",
      text: "How many bytes are leaked in this code?",
      code: `int* ptr = (int*)malloc(10 * sizeof(int));
ptr = (int*)malloc(20 * sizeof(int));
free(ptr);`,
      answer: "40",
      explanation:
        "The first allocation of 40 bytes (10 * 4) is leaked when ptr is reassigned",
    });

    // Question 3: Stack vs Heap
    questions.push({
      type: "short_answer",
      text: "What is the size of this array on the stack?",
      code: `int arr[1000];`,
      answer: "4000",
      explanation:
        "1000 integers * 4 bytes per integer = 4000 bytes on the stack",
    });

    // Question 4: Memory Alignment
    questions.push({
      type: "short_answer",
      text: "What is the size of this struct on a 64-bit system?",
      code: `struct S {
    char c;    // 1 byte
    int i;     // 4 bytes
    double d;  // 8 bytes
};`,
      answer: "24",
      explanation:
        "The struct is padded to align the double: 1 + 3(padding) + 4 + 8 + 8(padding) = 24 bytes",
    });

    // Question 5: Pointer Arithmetic
    questions.push({
      type: "short_answer",
      text: "What is the value of ptr after this operation?",
      code: `int arr[5] = {1, 2, 3, 4, 5};
int* ptr = arr;
ptr += 2;`,
      answer: "3",
      explanation:
        "ptr is incremented by 2 integers (8 bytes), pointing to the third element",
    });

    // Question 6: Memory Management
    questions.push({
      type: "short_answer",
      text: "What is the size of memory allocated by this calloc call?",
      code: `int* arr = (int*)calloc(3, sizeof(int));`,
      answer: "12",
      explanation:
        "3 integers * 4 bytes per integer = 12 bytes, initialized to zero",
    });

    // Question 7: Memory Layout
    questions.push({
      type: "short_answer",
      text: "What is the size of this union?",
      code: `union U {
    char c[5];
    int i;
    double d;
};`,
      answer: "8",
      explanation:
        "The union size is determined by its largest member (double, which is 8 bytes)",
    });

    // Question 8: Memory Access
    questions.push({
      type: "short_answer",
      text: "What is the value of x after this code executes?",
      code: `int x = 5;
int* p = &x;
*p = 10;`,
      answer: "10",
      explanation:
        "The pointer p is dereferenced and the value at that address is changed to 10",
    });

    // Question 9: Memory Allocation
    questions.push({
      type: "short_answer",
      text: "What is the size of memory allocated by this realloc call?",
      code: `int* arr = (int*)malloc(5 * sizeof(int));
arr = (int*)realloc(arr, 10 * sizeof(int));`,
      answer: "40",
      explanation: "10 integers * 4 bytes per integer = 40 bytes total",
    });

    // Question 10: Memory Management
    questions.push({
      type: "short_answer",
      text: "What is the value of ptr after this operation?",
      code: `char* ptr = (char*)malloc(10);
ptr += 5;`,
      answer: "5",
      explanation:
        "ptr is incremented by 5 bytes, pointing to the sixth byte of allocated memory",
    });

    return this.shuffleArray(questions);
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  validateAnswer(question, answer) {
    // Convert both to lowercase and remove whitespace for comparison
    const cleanAnswer = answer.toLowerCase().trim();
    const cleanCorrectAnswer = question.answer.toLowerCase().trim();

    // Check for exact match
    if (cleanAnswer === cleanCorrectAnswer) {
      return true;
    }

    // Check for alternative answers if they exist
    if (question.alternativeAnswers) {
      return question.alternativeAnswers.some(
        (alt) => alt.toLowerCase().trim() === cleanAnswer
      );
    }

    return false;
  }
}
