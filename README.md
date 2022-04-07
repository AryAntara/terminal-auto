# terminal-auto
## Usage
```bash
node core.mjs js.md
```
if you try to run your own file you can use
```node
#LearnNode
:Write=[hello world
:Wait=[3
:Exec=[console.log('a')
:Confirm=[sure to exit || y
:Syntax=[
  console.log('js');
  console.log('i like nodejs);
:Clear 
```
save the filename with name are you like, 
in this case i save in learnNode.Then run the file by command below
```bash
node core.mjs learnNode
```
## command for config

### Write

this command to write string word by word
```node
:Write=[$dataToWrite
```
### Clear
this command to clear console
```node
:Clear
```
### Confirm
this command to pause terminal and take user interact
```node
:Confirm=[$name || $expected
//if input not same as expected
//it will restore to last confirm dialog
```
### Exec
this command to exec javascript code directly
```node
:Exec=[
  const Hello = () => {
    console.log('hello');
  };
  Hello();
//it run perfect
:Exec=[
  const Hello = () => {
    console.log('Hello')
  }
  Hello()
//this run err
//you have to add a ';' in end line.
```

### Syntax
this command to run command with it space line,
```node
:Syntax=[
  console.log('hai');
 //output 
  console.log
 ```
 
 all of command must be in a file.
