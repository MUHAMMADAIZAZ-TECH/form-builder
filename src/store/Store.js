import { makeAutoObservable } from 'mobx';

class CodeStore {
  codes = [];

  constructor() {
    makeAutoObservable(this);
  }

  addCode(values) {
    const newCode = {
      id: Math.random().toString(36).substring(2, 9),
      name: values.name,
      icon: values.icon,
      code: this.generateRandomCode(),
      timeLeft: 60,
    };
    this.codes.push(newCode);
    const intervalId = setInterval(() => {
      const index = this.codes.findIndex(code => code.id === newCode.id);
      if (index !== -1) {
        this.codes[index].timeLeft -= 1;
        if (this.codes[index].timeLeft <= 0) {
          this.codes[index].timeLeft = 60;
          this.codes[index].code = this.generateRandomCode(); 
        }
      } else {
        clearInterval(intervalId); 
      }
    }, 1000);
  }

  generateRandomCode() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  // Method to update the codes array
  setCodes(newCodes) {
    this.codes = newCodes;
  }
}

const codeStore = new CodeStore();
export default codeStore;
