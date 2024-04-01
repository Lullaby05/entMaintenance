import Mock from 'mockjs';

import './user';
import './message-box';
import './enterprise'

import '@/views/dashboard/workplace/mock';

Mock.setup({
  timeout: '100-200',
});
