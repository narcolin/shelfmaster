# Shelfmaster
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
