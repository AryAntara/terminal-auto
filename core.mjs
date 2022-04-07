import log from 'log-update'
import {readFileSync} from 'fs'
import {createInterface} from 'readline'
const file = process.argv[2]
const rl = createInterface({
  input:process.stdin,output:process.stdout
})
const mdFile = readFileSync(file,'utf8').split('\n').join('')
const config = mdFile 
const configParse = config.split(':')
//console.log(configParse)
const Write = (word) =>{
  const wordToWrite = word.split('')
  let tmp = ''
  let i = 0
  const pen = setInterval(() => {
    log(tmp = tmp + wordToWrite[i])
    //log('')
    i++
    if(i == wordToWrite.length){
      clearInterval(pen) 
      console.log(word)
      log('')
    }
  }, 100);
}
let restore = 1
const runtime = async(i)=>{
  if(i == configParse.length){
    rl.close()
    return ''
  }

  const command = configParse[i].split('=[')
  if(command[0] == 'Write'){
    Write(command[1])
    setTimeout(() => {
      runtime(i += 1)
    }, 100*(command[1].length + 1));
  }
  if(command[0] == 'Wait'){
    setTimeout(() => {
      runtime(i += 1)
    }, Number(command[1])*1000);
  }
  if(command[0] == 'Clear'){
    console.clear()
    runtime(i += 1)
  }
  if(command[0] == 'Exec'){
    //console.log(command[1])
    try{
      eval(command[1])
      console.log('\n')
      runtime(i+=1)
    }catch(e){
      Write("sorry this program going to err.")
      setTimeout(() => {
        runtime(i += 1)
      }, 30*100);
    }
  }
  if(command[0]=='Confirm'){
    const toConfirm = command[1].split(' || ')
    //console.log(toConfirm)
    const ask = () =>{
    new Promise((r,s)=>{
      rl.question('\n[ dialog ] '+toConfirm[0]+' >> ',(data)=>{
     // console.log(toConfirm)
      if(toConfirm[1] == data){
        restore = i+1
        runtime(i+=1)
      }else{

        //console.log(restore)
        runtime(restore)
     }
    })
  })
  }
    await ask()
  }
  if(command[0] == 'Syntax'){
    console.log('```\n'+command[1].split(';').join('\n')+'\n```'+'\n\n')
    runtime(i += 1)
  }
}
runtime(1)
