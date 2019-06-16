// export default {
//   get: jest.fn().mockResolvedValue({
//     data: {}
//   }),
//   create: jest.fn().mockResolvedValue({
//     baseURL: 'base-url',
//     headers: {
//       Authorization: `Bearer api-key`
//     }
//   })
// };

const mockAxios = jest.genMockFromModule('axios');

// this is the key to fix the axios.create() undefined error!
mockAxios.create = jest.fn(() => mockAxios);

export default mockAxios;
