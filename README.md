# challenge-charger-box
# OUT OF BOX TECHNOLOGY - CHALLENGE CHARGER BOX (CHARGER LOCKER) 

:warning: Please read the following requirement and condition before coding!
- Assume that you are assigned to implement the locker reservation system 
- The locker contains 12 slots.
- Each slot can be 2 type (1 = fast charge, 2 = normal)
- Locker type 1 (fast charge) rate 15 Baht / 30 Min.
- Locker type 2 (normal) rate 10 Baht / 30 Min.
- Time less or greater than 30 min will be counted as 30 Min.
- Each slot can't charge more than 1 device at the same time

#### Example Use case
    
- Ex. Charger Locker
    |Locker Slot|Type|Price per 30 mins.|
    |-|-|-|-|
    |#1|Fast Charge|15|
    |#2|Fast Charge|15|
    |#3|Fast Charge|15|
    |#4|Fast Charge|15|
    |#5|Normal|10|
    |#6|Fast Charge|15|
    |#7|Normal|10|
    |#8|Fast Charge|15|
    |#9|Normal|10|
    |#10|Fast Charge|15|
    |#11|Normal|10|
    |#12|Fast Charge|15|

### TASK
- :+1: Design Database
- :+1: Design API and Mock API Response (https://designer.mocky.io/)
- :+1: Implement Backend base on any stacks you like (NodeJS, Go, PHP, ...)
- :+1: Design and implement Frontend base on any stacks you like (Vue, React, Angular, Vanila Html/CSS, ...)
- :+1: Design User Interface (UI)
  - Locker Display Screen (12 slots)
  - Indicate available slots, unavailable slots
  - Fee/Charge
- :+1: Focus on good [code quality](https://medium.com/@mkt_43322/why-is-code-quality-such-a-big-deal-for-developers-91bdace85d44).
  - Readability, consistency — how easy it is to read and understand sections of the code; this includes code clarity, simplicity, and documentation.
  - Predictability, reliability, and robustness — software behavior should be predictable, and not prone to hidden bugs.
  - Maintainability and extensibility — fixing, updating and improving software should be as simple as possible, not inherently complex.
- Technologies, libraries and skills
  - Frontend : React, Vue, Angular
  - Backend : NodeJS, Go, PHP, ...
  - API  & Mock Data : https://designer.mocky.io/
  - Deploy : Firebase Hosting, ...
- Bonus!!
    - Unit and Integration testing such as
        - [jest](https://jestjs.io/)
        - others
    - UI testing with automate testing tools such as
       - [cypress](https://www.cypress.io/)
       - [Robot Framework](https://robotframework.org/)
       - [katalon](https://www.katalon.com/)
    - UX/UI
    - Coding style, clean?, easy readable?
    
- Scoring criteria

    |Task|Required|Score|
    |-|-|-|
    |Backend/Core Functionality|:white_check_mark:|40|
    |Frontend|:white_check_mark:|40
    |DB Design, REST with Mocky|:white_check_mark:|10|
    |Bonus|:white_large_square:|10|


:ok_hand: Acceptance agreement
---

1. Fork this GitHub project.
2. Open `issue` feature in your repository (Options > Features > Checked on Issues) [#Reference](https://softwareengineering.stackexchange.com/questions/179468/forking-a-repo-on-github-but-allowing-new-issues-on-the-fork)
3. Put your code in the `code` folder.
4. Also provide instruction to run your project

Any question? :see_no_evil::hear_no_evil::speak_no_evil:
---
Open your issue from this link below

https://github.com/Out-Of-Box-Technology/challenge-charger-box/issues
