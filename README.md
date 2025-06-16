# Quiz Generator

[![Deploy to GitHub Pages](https://github.com/ChefAharoni/APQuizGenerator/actions/workflows/deploy.yml/badge.svg)](https://github.com/ChefAharoni/APQuizGenerator/actions/workflows/deploy.yml)

A modern, serverless quiz application that generates programming questions and provides immediate feedback. The application is designed to be hosted on GitHub Pages and requires no server-side processing.

## Features

- Multiple quiz categories:
  - C Programming Basics
  - Data Structures
  - Algorithms
  - Memory Management
- 10 questions per quiz
- Code snippets with syntax highlighting
- Progress tracking
- Immediate feedback with explanations
- Time tracking
- Responsive design

## Getting Started

1. Clone this repository:

```bash
git clone https://github.com/ChefAharoni/APQuizGenerator.git
cd quiz-generator
```

2. Open `index.html` in your web browser to start using the application.

## Usage

1. Select a quiz category from the main menu
2. Answer each question by typing your response in the input field
3. Use the Previous and Next buttons to navigate between questions
4. Submit your quiz when you've answered all questions
5. Review your results, including:
   - Score
   - Time taken
   - Correct answers
   - Explanations for each question
6. Start a new quiz or try the same category again

## Development

The application consists of three main files:

- `index.html`: The main HTML structure
- `styles.css`: Custom styling beyond Tailwind CSS
- `quiz-generator.js`: Question generation logic
- `app.js`: Main application logic and UI handling

### Adding New Questions

To add new questions, modify the appropriate generator method in `quiz-generator.js`. Each question should follow this structure:

```javascript
{
    type: 'short_answer',
    text: 'Question text',
    code: 'Code snippet (optional)',
    answer: 'Correct answer',
    explanation: 'Explanation of the answer'
}
```

### Adding New Quiz Categories

To add a new quiz category:

1. Add a new generator method in `quiz-generator.js`
2. Add the category to the `questionTypes` object in the `QuizGenerator` constructor
3. Add a new button in the quiz selection section of `index.html`

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by programming course quizzes
- Built with modern web technologies
- No server required - runs entirely in the browser
