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

  // Helper function to generate random numbers within a range
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Helper function to generate random array elements
  getRandomArrayElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Helper function to generate random struct members
  generateRandomStructMembers() {
    const types = ["int", "char", "short", "long", "double"];
    const names = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
    const numMembers = this.getRandomInt(3, 6);
    let members = [];

    for (let i = 0; i < numMembers; i++) {
      const type = this.getRandomArrayElement(types);
      const name = names[i];
      members.push(`${type} ${name};`);
    }

    return members.join("\n    ");
  }

  generateCBasicsQuestions() {
    const questions = [];
    const numQuestions = 10;

    // Template 1: sizeof struct
    for (let i = 0; i < numQuestions; i++) {
      const structMembers = this.generateRandomStructMembers();
      const structName = `s${i + 1}`;
      questions.push({
        type: "short_answer",
        text: `Evaluate the expression \`sizeof(struct ${structName})\``,
        code: `struct ${structName} { 
    ${structMembers}
};`,
        answer: this.calculateStructSize(structMembers),
        explanation:
          "The struct size is calculated considering padding and alignment requirements",
      });
    }

    // Template 2: Pointer arithmetic
    for (let i = 0; i < numQuestions; i++) {
      const arraySize = this.getRandomInt(5, 10);
      const offset = this.getRandomInt(1, arraySize - 1);
      const array = Array.from({ length: arraySize }, (_, i) => i + 1);
      questions.push({
        type: "short_answer",
        text: "What is the output of the following code?",
        code: `int arr[] = {${array.join(", ")}};
int *p = arr;
printf("%d", *(p + ${offset}));`,
        answer: String(array[offset]),
        explanation: `p + ${offset} moves the pointer ${offset} elements forward, and * dereferences it to get the value ${array[offset]}`,
      });
    }

    // Template 3: Bit manipulation
    for (let i = 0; i < numQuestions; i++) {
      const x = this.getRandomInt(1, 15);
      const y = this.getRandomInt(1, 15);
      const operation = this.getRandomArrayElement(["&", "|", "^"]);
      let result;
      switch (operation) {
        case "&":
          result = x & y;
          break;
        case "|":
          result = x | y;
          break;
        case "^":
          result = x ^ y;
          break;
      }
      questions.push({
        type: "short_answer",
        text: "What is the result of the following bitwise operation?",
        code: `int x = ${x};  // ${x.toString(2).padStart(4, "0")} in binary
int y = ${y};  // ${y.toString(2).padStart(4, "0")} in binary
int result = x ${operation} y;`,
        answer: String(result),
        explanation: `Bitwise ${operation} of ${x
          .toString(2)
          .padStart(4, "0")} and ${y.toString(2).padStart(4, "0")} is ${result
          .toString(2)
          .padStart(4, "0")}, which is ${result} in decimal`,
      });
    }

    return this.shuffleArray(questions);
  }

  calculateStructSize(structMembers) {
    // This is a simplified calculation. In reality, struct padding and alignment
    // depend on the specific compiler and platform
    const typeSizes = {
      int: 4,
      char: 1,
      short: 2,
      long: 8,
      double: 8,
    };

    let totalSize = 0;
    let currentOffset = 0;

    structMembers.split("\n").forEach((member) => {
      const type = member.trim().split(" ")[0];
      const size = typeSizes[type] || 4;

      // Add padding if needed
      const padding = (size - (currentOffset % size)) % size;
      currentOffset += padding;

      totalSize += size;
      currentOffset += size;
    });

    // Add final padding to align to the largest member
    const maxSize = Math.max(...Object.values(typeSizes));
    const finalPadding = (maxSize - (totalSize % maxSize)) % maxSize;
    totalSize += finalPadding;

    return String(totalSize);
  }

  generateDataStructuresQuestions() {
    const questions = [];
    const numQuestions = 10;

    // Template 1: Binary Tree Height
    for (let i = 0; i < numQuestions; i++) {
      const numNodes = this.getRandomInt(7, 31);
      const height = Math.ceil(Math.log2(numNodes + 1)) - 1;
      questions.push({
        type: "short_answer",
        text: `What is the height of a balanced binary search tree with ${numNodes} nodes?`,
        code: `struct Node {
    int data;
    struct Node* left;
    struct Node* right;
};`,
        answer: String(height),
        explanation: `A balanced BST with ${numNodes} nodes will have a height of ${height} (log₂(${
          numNodes + 1
        }) rounded up)`,
      });
    }

    // Template 2: Graph Edges
    for (let i = 0; i < numQuestions; i++) {
      const vertices = this.getRandomInt(4, 10);
      const edges = (vertices * (vertices - 1)) / 2;
      questions.push({
        type: "short_answer",
        text: `What is the number of edges in a complete graph with ${vertices} vertices?`,
        code: `struct Graph {
    int V;
    int** adjMatrix;
};`,
        answer: String(edges),
        explanation: `A complete graph with ${vertices} vertices has ${vertices}(${vertices}-1)/2 = ${edges} edges`,
      });
    }

    // Template 3: Hash Table Load Factor
    for (let i = 0; i < numQuestions; i++) {
      const elements = this.getRandomInt(5, 20);
      const buckets = this.getRandomInt(elements, elements * 2);
      const loadFactor = (elements / buckets).toFixed(1);
      questions.push({
        type: "short_answer",
        text: `What is the load factor of a hash table with ${elements} elements and ${buckets} buckets?`,
        code: `struct HashTable {
    int size;
    int capacity;
    struct Node** buckets;
};`,
        answer: loadFactor,
        explanation: `Load factor = number of elements / number of buckets = ${elements}/${buckets} = ${loadFactor}`,
      });
    }

    return this.shuffleArray(questions);
  }

  generateAlgorithmsQuestions() {
    const questions = [];
    const numQuestions = 10;

    // Template 1: Time Complexity
    const complexityPatterns = [
      { name: "Binary Search", complexity: "O(log n)" },
      { name: "Linear Search", complexity: "O(n)" },
      { name: "Bubble Sort", complexity: "O(n²)" },
      { name: "Merge Sort", complexity: "O(n log n)" },
      { name: "Quick Sort", complexity: "O(n log n)" },
    ];

    for (let i = 0; i < numQuestions; i++) {
      const pattern = this.getRandomArrayElement(complexityPatterns);
      questions.push({
        type: "short_answer",
        text: `What is the time complexity of ${pattern.name}?`,
        code: `// ${pattern.name} implementation
// ...`,
        answer: pattern.complexity,
        explanation: `${pattern.name} has a time complexity of ${pattern.complexity}`,
      });
    }

    // Template 2: Space Complexity
    const spacePatterns = [
      { name: "Recursive Fibonacci", complexity: "O(n)" },
      { name: "Iterative Fibonacci", complexity: "O(1)" },
      { name: "Merge Sort", complexity: "O(n)" },
      { name: "Quick Sort", complexity: "O(log n)" },
    ];

    for (let i = 0; i < numQuestions; i++) {
      const pattern = this.getRandomArrayElement(spacePatterns);
      questions.push({
        type: "short_answer",
        text: `What is the space complexity of ${pattern.name}?`,
        code: `// ${pattern.name} implementation
// ...`,
        answer: pattern.complexity,
        explanation: `${pattern.name} has a space complexity of ${pattern.complexity}`,
      });
    }

    return this.shuffleArray(questions);
  }

  generateMemoryQuestions() {
    const questions = [];
    const numQuestions = 10;

    // Template 1: Memory Leaks
    const leakScenarios = [
      {
        code: `void function() {
    int* ptr = (int*)malloc(sizeof(int));
    // Missing free(ptr)
}`,
        answer: "Memory leak",
        explanation:
          "The allocated memory is never freed, causing a memory leak",
      },
      {
        code: `void function() {
    int* ptr = (int*)malloc(sizeof(int));
    free(ptr);
    free(ptr);  // Double free
}`,
        answer: "Double free",
        explanation:
          "The same memory is freed twice, which is undefined behavior",
      },
    ];

    for (let i = 0; i < numQuestions; i++) {
      const scenario = this.getRandomArrayElement(leakScenarios);
      questions.push({
        type: "short_answer",
        text: "What memory issue is present in this code?",
        code: scenario.code,
        answer: scenario.answer,
        explanation: scenario.explanation,
      });
    }

    // Template 2: Memory Alignment
    for (let i = 0; i < numQuestions; i++) {
      const size = this.getRandomInt(1, 16);
      const alignment = Math.pow(2, this.getRandomInt(0, 3));
      const alignedSize = Math.ceil(size / alignment) * alignment;

      questions.push({
        type: "short_answer",
        text: `What is the aligned size of a ${size}-byte structure with ${alignment}-byte alignment?`,
        code: `struct aligned_struct {
    char data[${size}];
} __attribute__((aligned(${alignment})));`,
        answer: String(alignedSize),
        explanation: `The structure is padded to the next multiple of ${alignment} bytes`,
      });
    }

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
    return question.answer.toLowerCase() === answer.toLowerCase();
  }
}
