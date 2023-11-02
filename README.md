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

To add commit hooks first install:
```sh
npm install --save husky lint-staged
```
 - ```husky``` makes it possible to use githooks as if they are npm scripts.
 - ```lint-staged``` lets us run scripts on staged files in git.

 If not present, add the `husky` field to `package.json`:
 ```json
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  }
 ```
 Then add the `lint-staged` field:
 ```json
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}": [
      "prettier --write"
    ]
  },
 ```

 Whenever you make a commit, Prettier should now run automatically. Of course, you can still run the format script whenever you wish.