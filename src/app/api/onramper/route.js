import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request) {
  try {
    const { walletAddress } = await request.json();
    
    if (!walletAddress) {
      return NextResponse.json({ error: 'Wallet address required' }, { status: 400 });
    }

    const ONRAMPER_SECRET = process.env.ONRAMPER_SECRET || '5a0bb4f737d98f711e96527e32717843476883f7d84cf04872372f658cf134ae';
    const ONRAMPER_PUBLIC_KEY = process.env.ONRAMPER_PUBLIC_KEY || 'pk_test_01KX2SH1NENEVVTEZ5C34HZAFJ';
    
    // Use networkWallets to set the address for all tokens on the Polygon network
    const networkWallets = `polygon:${walletAddress}`;
    
    // Generate HMAC signature based on sensitive parameters
    const params = {
      networkWallets: networkWallets
    };
    
    const signContent = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&');
    
    const signature = crypto
        .createHmac('sha256', ONRAMPER_SECRET)
        .update(signContent)
        .digest('hex');
        
    const widgetUrl = `https://buy.onramper.com/?apiKey=${ONRAMPER_PUBLIC_KEY}&defaultCrypto=USDT&defaultFiat=USD&supportSell=false&networkWallets=${networkWallets}&signature=${signature}`;
    
    return NextResponse.json({ widgetUrl });
  } catch (error) {
    console.error("Onramper signing error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
