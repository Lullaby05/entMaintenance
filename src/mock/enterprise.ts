import { MockParams } from "@/types/mock";
import setupMock from "@/utils/setup-mock";
import Mock from 'mockjs';

type enterpriseType = {
  id: string;
  enterpriseName: string;
  registerAddress: string;
  region: string;
  enterpriseType: string;
  respectiveIndustry: string;
  volumn: string;
  accountType: string;
  accountStatus: string;
  accountExpireTime: string;
  accountCreateTime: string;
  accountUpdateTime: string;
}
setupMock({
  mock: true,
  setup() {
    Mock.mock(
      new RegExp('/businessApi/business/enterprise/get-page'),
      (params: MockParams) => {
        const tableData: enterpriseType[] = [];
        for (let i = 0; i < 100; i++) {
          const randomTypeCode = Mock.Random.integer(1, 3).toString();
          const randomStatusCode = Mock.Random.integer(1, 2).toString();
          tableData.push({
            id: Mock.Random.integer(
              100000000000000000,
              999999999999999999
            ).toString(),
            registerAddress: Mock.Random.cname(),
            enterpriseName: Mock.Random.cname(),
            enterpriseType: Mock.Random.cname(),
            region: Mock.Random.cname(),
            respectiveIndustry: Mock.Random.cname(),
            volumn: `${Mock.Random.integer(10, 30)}/${Mock.Random.integer(40, 50)}`,
            accountType: randomTypeCode,
            accountStatus: randomStatusCode,
            accountExpireTime: Mock.Random.datetime(),
            accountCreateTime: Mock.Random.datetime(),
            accountUpdateTime: Mock.Random.datetime(),
          } as enterpriseType);
        }
        const { pageNo = 1, pageSize = 10 } = JSON.parse(params.body);
        const start = (pageNo - 1) * pageSize;
        const end = start + pageSize;
        const result = tableData.slice(start, end);
        return {
          code: 0,
          data: {
            total: tableData.length,
            list: result,
          },
          msg: '请求成功',
        };
      }
    );
  }
})