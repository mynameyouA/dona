import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { amount } = await request.json();

    const apiKey = "c594d4a2-91c4-4dd0-9527-be1f348894a1";
    const apiSecret = "h/5s7PHb4XriPjagzBGLRg==";
    const walletAddress = "0x52b4483e30243a65212adb16d993627534e61d6d";

    // Step 1: Get Access Token
    // We use the production API endpoints. If your API key is staging, 
    // these need to be changed to api-stg.transak.com
    const tokenResponse = await fetch('https://api.transak.com/partners/api/v2/refresh-token', {
      method: 'POST',
      headers: {
        'api-secret': apiSecret,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ apiKey: apiKey })
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("Transak Token Error:", errorText);
      return NextResponse.json({ error: 'Failed to authenticate with Transak' }, { status: 500 });
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData?.data?.accessToken || tokenData?.accessToken;

    if (!accessToken) {
      return NextResponse.json({ error: 'No access token received' }, { status: 500 });
    }

    // Step 2: Generate Session URL
    const sessionResponse = await fetch('https://api-gateway.transak.com/api/v2/auth/session', {
      method: 'POST',
      headers: {
        'access-token': accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        widgetParams: {
          apiKey: apiKey,
          cryptoCurrencyCode: 'USDT',
          network: 'polygon',
          fiatCurrency: 'CNY',
          walletAddress: walletAddress,
          referrerDomain: "https://dona-theta-seven.vercel.app"
        }
      })
    });

    if (!sessionResponse.ok) {
      const sessionError = await sessionResponse.text();
      console.error("Transak Session Error:", sessionError);
      return NextResponse.json({ error: `Transak API Error: ${sessionError}` }, { status: 500 });
    }

    const sessionData = await sessionResponse.json();
    const widgetUrl = sessionData?.data?.widgetUrl || sessionData?.widgetUrl;

    if (!widgetUrl) {
      return NextResponse.json({ error: 'No widget URL received' }, { status: 500 });
    }

    return NextResponse.json({ widgetUrl });

  } catch (error) {
    console.error("Transak API Route Error:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
