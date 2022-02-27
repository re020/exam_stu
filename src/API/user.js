import req from '@/utils/req';

export async function login(loginArgs) {
  const { data } = await req.post('/student/login', {
    stuNumber: loginArgs.username,
    stuPassword: loginArgs.password,
  });
  return data;
}
