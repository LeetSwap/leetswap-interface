import { CurrencyAmount, Token } from 'sdk-core/entities'

/**
 * Fetches the volume of a token from DexScreener
 */
export default async function getDailyVolume(
    token: Token,
): Promise<CurrencyAmount<Token>> {
    const url = `https://api.dexscreener.com/latest/dex/tokens/${token.address}`
    let response
    try {
        response = await fetch(url, { credentials: 'omit' })

        if (!response.ok) {
            throw new Error(`Failed to fetch daily volume for token ${token.address}`)
        }

        const json = await response.json()
        const pairs = json.pairs
        const dailyVolumeInUSD = pairs.reduce((acc: number, pair: any) => {
            return acc + pair.volume.h24
        }, 0)
        console.log('dailyVolumeInUSD', dailyVolumeInUSD)

        const pricePairAddress = '0x017EC40AA1984CDDa79F789066bD971F924132A5'
        const priceInUSD = pairs.find((pair: any) => pair.pairAddress.toLowerCase() === pricePairAddress.toLowerCase())?.priceUsd as number
        console.log('priceInUSD', priceInUSD)
        console.log('dailyVolume', dailyVolumeInUSD / priceInUSD)

        return CurrencyAmount.fromRawAmount(
            token,
            Math.round(dailyVolumeInUSD / priceInUSD) * 10 ** token.decimals,
        )
    } catch (error) {
        console.debug('Failed to fetch daily volume for token', token.address, error)
        // throw new Error(`Failed to fetch daily volume for token ${token.address}`)
        return CurrencyAmount.fromRawAmount(token, 0)
    }
}
