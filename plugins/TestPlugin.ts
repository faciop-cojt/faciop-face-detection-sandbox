import Vue from 'vue';
import {Plugin} from '@nuxt/types'


class TestPlugin{
  testPlugin = (msg:string)=> {
    console.log("hello, ", msg);
    
  }
  
}

declare module "vue/types/vue" {
  interface Vue {
    $testPlugin: TestPlugin;
  }
}

export default ({app}:{app:any}, inject:any) =>{
  inject('testPlugin', new TestPlugin)
}

// Vue.prototype.$test_plugin = testPlugin;