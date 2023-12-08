<h1 align="center">
  <a href="https://github.com/narcolin/shelfmaster">
    <!-- Please provide path to your logo here -->
    <img src="react-frontend/src/images/logo.png" alt="Logo" width="800" height="100">
  </a>
</h1>

[![backendCI](https://github.com/narcolin/shelfmaster/actions/workflows/node.js.yml/badge.svg)](https://github.com/narcolin/shelfmaster/actions/workflows/node.js.yml)
[![frontendCI](https://github.com/narcolin/shelfmaster/actions/workflows/react-frontend-ci.yml/badge.svg)](https://github.com/narcolin/shelfmaster/actions/workflows/react-frontend-ci.yml)

[![Build and deploy Node.js app to Azure Web App - shelfmaster-api](https://github.com/narcolin/shelfmaster/actions/workflows/main_shelfmaster-api.yml/badge.svg)](https://github.com/narcolin/shelfmaster/actions/workflows/main_shelfmaster-api.yml)

## Product Vision
The Shelf Master is for anyone and everyone who needs to keep track of their meals and make sure they have enough food to last. The Shelf Master is an inventory application that allows users to easily add or remove items from their tally. Unlike the other pantry tracker apps, our product creatively formats the items into food group categories (ie: grains, proteins, vegetables, etc.).

## Code Coverage
(Last ran 2023-12-08 15:37 UTC)
```
-----------------------|---------|----------|---------|---------|-------------------
File                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------------------|---------|----------|---------|---------|-------------------
All files              |     100 |     87.5 |     100 |     100 |
 inventory-services.js |     100 |       75 |     100 |     100 | 7
 inventory.js          |     100 |      100 |     100 |     100 |
 item-services.js      |     100 |    81.25 |     100 |     100 | 8,19,82
 item.js               |     100 |      100 |     100 |     100 |
 user-services.js      |     100 |       95 |     100 |     100 | 12
 user.js               |     100 |      100 |     100 |     100 |
-----------------------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       34 passed, 34 total
Snapshots:   0 total
Time:        5.546 s, estimated 6 s
```

## UI Prototype
[Figma](https://www.figma.com/file/XXGMydp5IymbYieMKrbkJC/shelfmaster?type=design&node-id=0%3A1&mode=design&t=YxGTjOgWrYnnRygF-1) (Last Updated 10-27-2023)

## Code Setup
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/get-npm)

### React Frontend

1. Open a terminal and navigate to the `react-frontend` directory.

    ```bash
    cd ./react-frontend
    ```

2. Install dependencies.

    ```bash
    npm install
    ```

3. Start the React server.

    ```bash
    npm start
    ```

   The React app will be accessible at `http://localhost:3000`.

### Express Backend

1. Open a new terminal window and navigate to the `express-backend` directory.

    ```bash
    cd ./express-backend
    ```

2. Install dependencies.

    ```bash
    npm install
    ```

3. Start the Express server.

    ```bash
    npm start
    ```

   The Express app will be accessible at `http://localhost:8000`.

Once both the React frontend and Express backend servers are running, you can access the application in your web browser.
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:8000](http://localhost:8000)

## VS Code Linter/Code Styler Checker Setup
### Prerequisites 

 - [Prettier Extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
 - [ESLint Extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

### Installation
You can check to see if you have ESLint installed in a project directory by running
```sh
npx eslint -h
```
If it's not installed, install it with<br/>
```sh
npm install eslint
```

The `.eslintrc.json` file in `react-frontend` should already match this, but if it doesn't just copy and paste this in:
```json
{
    "env": {
        "browser": true,
        "es2021": true,
        "jest": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:prettier/recommended"
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "react/prop-types": 0,
        "react/react-in-jsx-scope": "off"
    }
}
```
As it indicates in `extends`, we add Prettier to ESLint. You'll have to additionally run:<br/>
```sh
npm install eslint-config-prettier eslint-plugin-prettier prettier --save-dev
```

To install Prettier run:
```sh
npm install --save-dev --save-exact prettier
```

Once again the `package.json` should already include this, but if not make sure this line gets added to the scripts:
```json
"format": "prettier --write './**/*.{js,jsx,ts,tsx,css,md,json}' --config ./.prettierrc"
```

You should be able to call this with ```npm run format```

If you want prettier to format on save for VS Code, follow the guide [here](https://blog.yogeshchavan.dev/automatically-format-code-on-file-save-in-visual-studio-code-using-prettier).

To add pre-commit hooks add this as `pre-commit` file as an executable to .git/hooks:
```sh
#!/bin/bash

STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep ".jsx\{0,1\}$")

if [[ "$STAGED_FILES" = "" ]]; then
  exit 0
fi

PASS=true

echo "\nValidating Javascript:\n"
ESLINT="$(git rev-parse --show-toplevel)/react-frontend/node_modules/.bin/eslint"

# Check for eslint
# which eslint &> /dev/null
if [[ ! -x "$ESLINT" ]]; then
  echo "\t\033[41mPlease install ESlint\033[0m"
  exit 1
fi

for FILE in $STAGED_FILES
do
  "$ESLINT" "$FILE"

  if [[ "$?" == 0 ]]; then
    echo "\t\033[32mESLint Passed: $FILE\033[0m"
  else
    echo "\t\033[41mESLint Failed: $FILE\033[0m"
    PASS=false
  fi
done

echo "\nJavascript validation completed!\n"

if ! $PASS; then
  echo "\033[41mCOMMIT FAILED:\033[0m Your commit contains files that should pass ESLint but do not. Please fix the ESLint errors and try again.\n"
  exit 1
else
  echo "\033[42mCOMMIT SUCCEEDED\033[0m\n"
fi

exit $?
```

ESLint should now run on files staged before your commit goes through.
