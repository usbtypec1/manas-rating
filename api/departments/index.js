import { fetchAndParseDepartmentStatistics } from '../../services/manas.js'


const getDepartmentsRatings = async (departmentIds) => {
  const tasks = departmentIds.map(departmentId => fetchAndParseDepartmentStatistics(departmentId))
  return await Promise.all(tasks)
}

const departmentIds = [
  1, 2, 3, 4, 5, 6, 7, 8, 9,
  10, 11, 12, 13, 14, 15, 16, 17, 18,
  19, 20, 21, 22, 24, 25, 26, 27, 28,
  29, 30, 31, 34, 35, 36, 41, 42,
]


export async function GET(request) {
  try {
    const departmentsRatings = await getDepartmentsRatings(departmentIds)
    return new Response(JSON.stringify(departmentsRatings), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: 'Failed to fetch departments ratings' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

}