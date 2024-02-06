# Typescript Utilities
🧰 Essential TS utilities for smooth development! Simplify coding life with handy functions. 🔧💻

# Table of Contents

1. [Utilities](#utilities) 
    1. [Logger](#logger)
2. [Contributing](#contributing)
3. [License](#license)

# Utilities

## 1. Logger
Minimal logger utility using `pino` package. It provides a simple way to log messages with different log levels.
  - `trace`
  - `debug`
  - `info`
  - `warn`
  - `error`
  - `fatal`

You can also customize the logger by providing custom options.

### How to use
  - Copy the `logger.ts` file to your project.
  - Import the logger in your file.
  - Use the logger to log messages.
  ```typescript
  import { logger } from './logger';
  logger.info('Hello, world!');
  ```
You can also customize the logger by providing custom options.
  ```typescript
  import { logger } from './logger';
  logger.setLevel('debug');
  logger.setMessagesKey('message');
  ```

# Contributing
Feel free to contribute to this project. You can contribute by:
  - Reporting issues
  - Suggesting new features
  - Adding new utilities
  - Improving existing utilities
  - Writing test cases

# License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
