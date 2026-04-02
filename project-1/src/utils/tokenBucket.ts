type Bucket = {
    tokens: number
    lastRefill: number
}

const buckets = new Map<string, Bucket>()

const capacity = 10
const refillRate = 1 // tokens per second

export const checkRateLimit = (userId: string): boolean => {
    const now = Date.now()
    let bucket = buckets.get(userId)

    if(!bucket) {
        bucket = { tokens: capacity, lastRefill: now }
        buckets.set(userId, bucket)
    }
    const timePassed = (now - bucket.lastRefill) / 1000
    const tokensToAdd = Math.floor(timePassed * refillRate)

    if(tokensToAdd > 0) {
        bucket.tokens = Math.min(capacity, bucket.tokens + tokensToAdd)
        bucket.lastRefill = now
    }

    if(bucket.tokens > 0) {
        bucket.tokens -= 1
        return true
    }

    return false
}