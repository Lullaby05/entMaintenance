import { createPinia } from 'pinia';
import piniaPluginPersist from 'pinia-plugin-persist'
import useAppStore from './modules/app';
import useUserStore from './modules/user';
import useTabBarStore from './modules/tab-bar';
import useEnterpriseStore from './modules/enterprise';

const pinia = createPinia();

pinia.use(piniaPluginPersist)

export { useAppStore, useUserStore, useTabBarStore, useEnterpriseStore, };
export default pinia;
