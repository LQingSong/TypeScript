# TypeScript

## 1. 动态类型语言指在运行时才会进行类型检查

    - python、javascript都是动态类型语言

## 2. 静态类型语言指在编译阶段就能确定每个变量的类型

## 3. 类型系统按照[是否允许隐式类型转换]来分类，分为强类型和弱类型。

    - c/c++、typescript是静态类型、也是弱类型语言
    - Java是静态类型，也是强类型语言
    - python是动态类型且强类型语言

## 4. TS 增强编辑器（IDE）的功能，包括代码补全、接口提示、跳转到定义、代码重构.....

    - TS还提供近百个[编译选项]，如果你认为类型检查过于严格，那么可以通过修改编译选项来降低类型检查的标准
    - TS和JS可以共存，如果一些JS旧文件迁移成本太高，也可通过[类型声明文件]来实现旧项目的渐进式迁移
    -一些第三方库原生支持了TS，在使用时就能获得代码补全; 那还有一些库原生不支持TS，但可以通过安装社区维护的类型声明库（比如 npm i -D @types/jest来安装Jest的声明库)来获得代码补全的能力

## 5. TS 只会在编译对类型进行静态检查，如果发现有错误，编译时就会报错

- 可以安装 Error Lens 插件，将错误信息显著提示出来
- 即使 TS 在编译时报错了，还是会生成编译结果,我们仍然可以使用这个编译之后的文件
- 如果要在 TS 报错时终止 js 文件的生成，可以在 tsconfig.json 中配置[noEmitOnError]
  - 注：tsconfig.json 只在工程项目下有效，所以别再 tsc ./src/code-01.ts 了，指定了输入文件时，tsconfig.json 就失效了
  - 直接 tsc 不带任何输入文件，编辑器会在当前目录下去找 tsconfig.json 文件，逐级向上搜索父目录

## 6. 基础

- JS 的类型分为两种：原始数据类型 和 对象类型
  - 原始数据类型：boolean、bumber、string、null、undefind、symbol（ES6）、bigInt（ES10）
    - 原始数据类型首字母小写
    - symbol 是只读属性
  - 对象类型：Obejct、Array
- 使用原始数据类型的构造函数创建的不是原始数据类型，而是对象
- ES6 提供了二进制和八进制的写法：
  - 二进制：0b
  - 八进制：0o
- 空值
  - JS 中没有 void 概念, TS 中可以用 void 表示没有任何返回值的函数
  - null 和 undefined
- 任意值 any
  - 在任意值上访问任何属性、任何方法都是允许的
  - 变量在声明的时候未指定其类型，那么它会被识别为任意类型
  - 这样避开了 TS 的类型检查，摈弃了 TS 的优势，存在运行时错误的可能，
- 类型推断
  - 变量如果声明时没有指定类型，但是给它赋了值，在下次使用时会自动推断初始时赋值的类型
  - 变量如果声明时既没有指定类型，也没有赋值，就会被推断成 any 类型
  - 尽量少用类型推断（性能消耗），明确定义好变量类型
- 联合类型
  - 使用 | 分隔每个类型
  - 当 TS 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法
- 接口 Interfac

  - TS 中的接口是一个非常灵活的概念
    - 可以用于对[类的一部分行为]进行抽象
    - 对[对象的形状]进行描述
  - 接口约束了使用接口的对象必须和接口形状保持一致
    - 定义的对象不允许比接口多一些属性和少一些属性
    - 但是有时候我们希望不要完全匹配一些形状，那么就可以使用可选属性
      - 用 ? 符定义属性名后，如 name? : String
      - 此时仍然不允许添加未定义的属性
  - 任意属性
    - 如果希望接口允许有任意的属性，可以使用 [propName: String]: any
    - 但是需要注意的是，[一旦定义了任意属性的类型，那么确定属性和可选属性的类型都必须是它的类型的子集]()
      - 例[propName: String]: String, 任意属性的类型定义为了 String,那么这个接口中的其他确定属性和可选属性的类型就只能是 String 的子集
      - 那如果接口中有多个类型的属性，那么任意属性的类型就可以定义为联合类型
        - 如果同时存在确定属性和可选属性，那么任意属性的类型要加上 undefine
  - 只读属性
    - 希望对象中对的一些字段只能在创建的时候被赋值，可以用 readonly 定义只读属性

- 数组
  - propName: 类型[]
  - propName: Array\<T>
- 函数

  - 用表达式定义函数时，可用接口定义函数形象

    ```ts
    interface IFun {
      (arg1: number, arg2: string): boolean;
    }
    let myFun: IFun = function (a: number, b: string): boolean {};
    ```

    - 可以比接口定义的参数少,但是不能比接口定义的参数多
    - 可选参数?, 可选参数必须放到必需参数后面
    - ES6 支持参数默认值
    - 剩余参数
      - ...args
      - 剩余参数只能是最后一个参数
    - 重载

      - TS 是不支持重名，但是重载的情况除外
      - TS 的重载是重载函数定义,具体就是参数类型和返回类型不一致，参数个数必需一致
        ```ts
        function f(params: number): number;
        function f(params: boolean): boolean;
        function f(params: number | string | boolean): number | string | boolean {
          return params;
        }
        ```

- 类型断言
  - 值 as 类型
  - 类型断言的用途：
    - 当 TS 不确定一个联合类型的变量到底是哪个类型的时候，只能访问联合类型中所有类型中的共有属性和方法；而[有时侯希望在不确定类型时就访问其中一个类型特有的属性和方法时，此时就可以使用类型断言]()
    - 将一个父类型断言为更加具体的子类
      - 当父类是一个具体真正的类时，其实可以用[instanceof]()来判断子类是不是父类的一个实例
      - 当父类不是一个真正的类而是一个接口时，就只能通过类型断言
    - 即可以断言成 any，也可以将 any 类型断言成一个精确的类型
  - [类型断言只能欺骗 TS 编译器，无法避免运行时错误。切忌滥用类型断言，尤其是断言成 any 类型]()
  - 断言的限制
    - [联合类型]()可以被断言为其中一个类型
    - 父类可以被断言为子类
    - 任何类型可以被断言为 any
    - any 可以被断言为任何类型
    - 要使得 A 能够被断言为 B，只需要 A 兼容 B 或 B 兼容 A 即可（前四种情况都是最后一种情况的特例）
  - 类型断言 VS 类型转换
    - 类似于强制类型转换，但不是真正的类型转换
    - 只是在编译阶段断言,编译之后不存在断言，也没有进行类型转换
    - 所以要想类型转换，直接调用类型转换的方法
  - 类型断言 VS 类型声明
    - 类型声明比类型断言更严格
    - 断言满足： A 兼容 B 或 B 兼容 A 即可
    - 声明满足： 声明的类型 兼容 被赋值的类型 （let c: Cat = animal; 要 Cat 兼容 animal 的类型才行）
- 声明文件

  - 声明文件必需以 .d.ts 为后缀
  - 声明文件中严禁定义具体实现
  - 不同的场景下，声明文件的内容和使用方式会有所区别：

    - 全局变量： 通过 \<script> 标签引入第三方库，注入全局变量
      - 如果是安装的@types/xxx 的声明文件，则不需要任何配置
      - 如果是将声明文件直接存放于当前项目中，则建议和其他源码一块放在 src 目录下
        - 如果没有生效，检查下 tsconfig.json 中的 files、include 和 exclude 配置
      - 全局变量的声明文件主要有以下几种语法：
        - declare var/let/const 声明全局变量
        - declare function 声明全局方法
          - 支持函数重载
            ```ts
            declare function jQuery(selector: string): any;
            declare function jQuery(domReadyCallback: () => any): any;
            ```
        - declare class 声明全局类
        - declare enum 声明全局枚举类型
        - declare namespace 声明（含有子属性的）全局对象（命名空间）
        - interface 和 type 声明全局类型
    - npm 包：通过 import foo from 'foo' 导入，符合 ES6 模块规范

      - npm 包的声明文件主要有以下几种语法
        - export 导出变量
        - export namespace 导出（含有子属性的）对象
        - export default ES6 默认导出
        - export = commonjs 导出模块
      - 创建一个 types 目录，专门用来管理自己写的声明文件

        - 需要在 tsconfig.ts 中配置下 paths 和 baseUrl 字段

        ```path
        |--src
        | |__xxx.ts
        |--types
        | |__xxx.d.ts
        ```

        ```ts
        {
            "compilerOptions": {
                "baseUrl": "./",
                "paths": {
                    "*": ["types/*"]
                }
            }
        }
        ```

    - UMD 库：既可以通过\<script> 标签引入，又可以通过 import 导入
    - 直接扩展全局变量： 通过\<script> 标签引入后，改变一个全局变量的结构
    - 在 npm 包或 UMD 库中扩展全局变量：引用 npm 包或 UMD 库后，改变一个全局变量的结构
    - 模块插件：通过 \<script>或 import 导入后，改变另一个模块的结构

  - 三线指令
    - 当一个声明文件需要引入另外一个声明文件时
    - 三线指令只能放在文件的最顶端，三线指令的前面只允许出现单行或多行注释
  - 自动生成声明文件
    - 如果库的源码本身就是由 ts 写的，那么在使用 tsc 脚本编译为 js 的时候，添加 declaration 选项，就可以同时生成.d.ts 声明文件
      - tsc --declaration(简写 -d) -或者在 tsconfig.json 中添加 declaration 选项

- 内置对象
  - ECMAScript 的内置对象
    - Boolean、Error、Date、RegExp...
  - DOM 和 BOM 的内置对象
    - Document、HTMLElement、Event、NodeList...
  - Node.js 不是内置对象的一部分，如果想在 TS 里写 Node.js 就需要引入第三方声明文件
    ```cmd
    npm install @types/node --save-dev
    ```

## 7. 进阶

- 类型别名
  - 使用 type 创建类型别名
    ```ts
    type StrOrNum = string | number;
    ```
  - 类型别名常用于联合类型
- 字符串字面量类型
  - 使用 type 定义字符串字面量类型
  - 用来约束取值只能是某几个字符串中的一个
    ```ts
    type EventName = "click" | "scroll" | "mousemove";
    ```
- 元组

  - 合并了不同类型的对象

    ```ts
    let Tom: [string, number] = ["foo", 24];
    ```

  - 当添加越界元素时，它的类型会被限制为元组中的每个类型的联合类型

- 枚举
  - 使用 enum 关键字来定义
  - 枚举成员会自动被赋值从 0 开始递增的数字，也可以手动赋值
- 类
  - 封装：对数据的操作细节隐藏，只暴露对外接口
  - 继承：子类继承父类，拥有父类的的一些特性，还可以拥有自己的特性
    - 使用 extends 关键字实现继承
    - 子类中使用 super 关键字调用父类的构造函数和方法
  - 多态：同一个方法有不同的响应
  - 重写：子类重写父类方法,参数和返回类型一致，只是内部实现不同
  - 重载：方法的参数和返回类型不同，方法声明定义
    - 重写 VS 重载
      - 重载时编译时多态性
      - 重写是运行时多态性
  - 存取器（getter & setter）：用以改变属性的读取和赋值行为
  - static
    - ES6 中只能定义静态方法
      - 静态方法 不需要实例化，通过类去访问
    - ES7 增加了可以定义静态属性
    - ES7 可以直接在类中实例化属性，ES6 只能在构造函数中 this.xxx 来定义
  - 修饰符
    - public
    - private
      - 希望有的属性无法直接存取的，就可以用 private
      - 使用 private 修饰的属性或方法，在子类中是不允许被访问的
      - 当构造函数修饰为 private 时，该类不允许被继承或者实例化
    - protected
      - 当构造函数修饰为 protected 时，该类只允许被继承
    - readonly 在其他修饰符后面
  - 抽象类：抽象类提供其他类继承的基类，
    - 抽象类不允许被实例化
    - 抽象方法不允许有具体实现，空{}也不行
    ```ts
        abstract absFun(): void;
    ```
    - abstract 定义抽象类和抽象方法
    - 抽象类中的抽象方法必需在子类中被实现
  - 接口：不同类之间公有的属性或方法，可以抽象成一个接口
    - 接口可以被类实现（implements）
    ```ts
    class B extends A implements IC {}
    ```
    - 一个类只能继承自另一个类，但是可以实现多个接口
    - 多个接口之间用逗号分隔
    - 接口之间可以是继承关系
    - 其他的面向对象语言中，接口不能继承类，但是在 TS 中接口可以继承类
      - 接口继承类只会继承类的实例属性和实例方法，不包括类的构造函数也无法继承静态属性和静态方法
  - 泛型：指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性

## 8. 代码检查

- 安装 ESlint
  - npm install --save-dev eslint
- 由于 ESlint 默认使用 Espree 进行语法解析，无法识别 TypeScript 的一些语法，需要安装@typescript-eslint/parser
  - npm install --save-dev typescript @typescript-eslint/parser
- 安装 @typescript-eslint/eslint-plugin 作为 eslint 默认规则的补充，提供一些额外的适用于 ts 语法的规则
  - @typescript-eslint/eslint-plugin
- 创建配置文件

  - npm run lint:create 创建配置文件
  - ESlint 需要一个配置文件来决定对哪些规则进行检查

  ```ts
  module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    rules: {
      // 禁止使用 var
      "no-var": "error",
      // 优先使用 interface 而不是 type
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    },
  };
  ```

  - 修改 package.json

  ```ts
   {
       "scripts": {
           "lint": "eslint src --ext --fix .ts"
       }
   }
  ```

  此时运行 npm run lint 就会检查 src 目录下所有 .ts 后缀的文件

- vscode 编辑器安装 ESlint
  - 在编辑器中集成 ESlint 检查，可以在开发过程中发现错误，甚至可以在保存时自动修复错误
  - 安装 ESlint 扩展
  - vscode 中的 ESlint 默认是不会检查.ts 后缀， 需要在 setting 中添加一个配置文件(也可以在项目根目录下创建一个配置文件 .vscode/settings.json), 添加以下配置：
  ```ts
    {
        "eslint.validate": [
            "javascript",
            "typescript",
            {
                "language": "typescript",
                "autoFix": true
            }
        ],
        "typescript.tsdk": "node_modules/typescript/lib"
    }
  ```

## 9. Prettier 代码风格

- Prettier 聚焦于代码的格式化，通过语法分析，重新整理代码的格式，让所有人的代码都保持同样的风格
- 安装 Prettier

  - npm install --save-dev prettier
  - 创建配置文件.prettierrc.json - 配置 prettier 规则
    ```ts
    // prettier.config.js or .prettierrc.js
    module.exports = {
      // 一行最多 100 字符
      printWidth: 100,
      // 使用 4 个空格缩进
      tabWidth: 4,
      // 不使用缩进符，而使用空格
      useTabs: false,
      // 行尾需要有分号
      semi: true,
      // 使用单引号
      singleQuote: true,
      // 对象的 key 仅在必要时用引号
      quoteProps: "as-needed",
      // jsx 不使用单引号，而使用双引号
      jsxSingleQuote: false,
      // 末尾不需要逗号
      trailingComma: "none",
      // 大括号内的首尾需要空格
      bracketSpacing: true,
      // jsx 标签的反尖括号需要换行
      jsxBracketSameLine: false,
      // 箭头函数，只有一个参数的时候，也需要括号
      arrowParens: "always",
      // 每个文件格式化的范围是文件的全部内容
      rangeStart: 0,
      rangeEnd: Infinity,
      // 不需要写文件开头的 @prettier
      requirePragma: false,
      // 不需要自动在文件开头插入 @prettier
      insertPragma: false,
      // 使用默认的折行标准
      proseWrap: "preserve",
      // 根据显示样式决定 html 要不要折行
      htmlWhitespaceSensitivity: "css",
      // 换行符使用 crlf
      endOfLine: "crlf",
    };
    ```
  - 创建 prettier 忽略文件 .prettierignore

    ```.prettierignore
        /dist/*
        .local
        .output.js
        /node_modules/**

        **/*.svg
        **/*.sh

        /public/*
    ```

  - 在编辑器中集成 Prettier 插件

    - 就可以不通过命令行的方式，而是通过编辑器自动格式化代码，提升编码效率
    - 修改.vscode/setting.json

    ```ts
    {
        "files.eol": "\n",
        "editor.tabSize": 4,
        "editor.codeActionOnSave":{
            "source.fixAll.eslint": true
        },
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "eslint.autoFixOnSave": true,
    }
    ```
