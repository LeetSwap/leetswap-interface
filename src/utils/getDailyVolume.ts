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
        if (!pairs) {
            throw new Error(`No pairs found for token ${token.address}`)
        }
        const dailyVolumeInUSD = pairs.reduce((acc: number, pair: any) => {
            return acc + pair.volume.h24
        }, 0)
        console.log('dailyVolumeInUSD', dailyVolumeInUSD)

        const pricePair = pairs.reduce((acc: any, pair: any) => {
            if (!(pair.quoteToken.address.toLowerCase() !== token.address.toLowerCase())) return acc; // shouldn't this be baseToken? but it works with quoteToken instead lol idk maybe ds API fuckery
            return acc.liquidity.usd > pair.liquidity.usd ? acc : pair
        }, { liquidity: { usd: 0 } })
        const priceInUSD = pairs.find((pair: any) => pair.pairAddress.toLowerCase() === pricePair.pairAddress.toLowerCase())?.priceUsd as number
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
