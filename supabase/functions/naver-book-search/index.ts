// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

const baseUrl = Deno.env.get('_API_NAVER_BOOK_SEARCH_BASE_URL') as string;
const id = Deno.env.get('_API_NAVER_BOOK_SEARCH_ID') as string;
const password = Deno.env.get('_API_NAVER_BOOK_SEARCH_PW') as string;

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://dnb-project.com',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type,X-Naver-Client-Id, X-Naver-Client-Secret',
  'Access-Control-Max-Age': '600',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');
  const display =  searchParams.get('display');
  const start = searchParams.get('start');

  try {
    const res = await fetch(`${baseUrl}/search/book.json?query=${query}&display=${display}&start=${start}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Naver-Client-Id': id,
          'X-Naver-Client-Secret': password,
        },
      },
    );
    
    const data = await res.json();
 
    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,  
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify(error),
      { headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,  
      },
    )
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/naver-book-search' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
