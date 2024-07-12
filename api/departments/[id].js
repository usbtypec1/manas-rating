import { fetchAndParseDepartmentStatistics } from '../../services/manas.js'


export async function GET(request) {
  const url = new URL(request.url)
  const departmentId = url.searchParams.get('id')

  try {
    const departmentStatistics = await fetchAndParseDepartmentStatistics(departmentId)

    return new Response(JSON.stringify(departmentStatistics), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (error) {
    const errorOptions = {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    }
    if (error.message === 'Failed to fetch department') {
      return new Response(JSON.stringify({ error: 'Failed to fetch department' }), errorOptions)
    }
    return new Response(JSON.stringify({ error: 'Unknown error' }), errorOptions)
  }
}