import Vue from "vue";

class TestPlugin {
  msg: string | null;

  constructor(message: string) {
    this.msg = message;
  }

  sayHello() {
    console.log(this.msg);
  }
}

declare module "vue/types/vue" {
  interface vue {
    $sayHello(message: string): void,
    $testplug: TestPlugin
  }
}

Vue.prototype.$sayHello = (message: string) => {
  console.log("Hello, ", message, "!");
};

Vue.prototype.$testplug = new TestPlugin("plugin");
