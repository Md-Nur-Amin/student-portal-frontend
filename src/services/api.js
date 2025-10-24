import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000/api' });
let token = null;
export default {
  setToken(t){ token = t; API.defaults.headers.common['Authorization'] = 'Bearer ' + t; },
  async login(studentNo, password){
    const res = await API.post('/auth/login', { studentNo, password }); return res.data;
  },
  async me(){ return (await API.get('/student/me')).data; },
  async getResults(){ return (await API.get('/student/results')).data; },
  async getBills(){ return (await API.get('/student/bills')).data; },
  async getRoutine(){ return (await API.get('/student/routine')).data; },
  // admin
  async postResult(payload){ return (await API.post('/admin/result', payload)).data; },
  async postBill(payload){ return (await API.post('/admin/bill', payload)).data; },
  async postRoutine(payload){ return (await API.post('/admin/routine', payload)).data; },
}
