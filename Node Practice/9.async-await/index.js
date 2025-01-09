function delay(timer) {
  return new Promise((resolve) => setTimeout(resolve, timer));
}

async function DelayFn(name) {
  await delay(2000);
  console.log(name);
}
DelayFn("Muju")

async function divide(n1,n2) {
    
    try {
        if (n2===0) throw new Error('Cannot divide by 0');
        return n1/n2
    } catch (error) {
        console.error(error)
        return null
    }
}
async function mainFn() {
    console.log(await divide(4,2))
    console.log(await divide(4,0))
}
mainFn()