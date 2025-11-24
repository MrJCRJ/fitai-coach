export async function GET() {
  const payload = { status: 'ok', timestamp: new Date().toISOString() }
  return new Response(JSON.stringify(payload), { headers: { 'Content-Type': 'application/json' } })
}
